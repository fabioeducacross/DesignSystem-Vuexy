#!/usr/bin/env node
/**
 * Design System MCP Server
 * 
 * Entry point do servidor MCP que expõe metadados dos 111 componentes
 * documentados no Storybook do Design System Educacross.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  ListToolsRequestSchema, 
  CallToolRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';

import { loadConfig, validateConfig } from './config/index.js';
import { resolvePaths, validatePaths } from './utils/paths.js';
import { logger, Timer } from './utils/logger.js';
import { 
  MCP_SERVER_NAME, 
  MCP_SERVER_VERSION, 
  MCP_TOOLS,
  createMCPError,
  MCPErrorCode
} from './types/mcp.js';
import { ComponentLoader } from './loader/component-loader.js';
import { componentCache } from './cache/memory-cache.js';
import { createCacheInvalidator } from './cache/invalidator.js';
import { PersistentCache } from './cache/persistent-cache.js';
import { searchIndex } from './search/index.js';
import { ComponentFilters } from './types/component.js';
import { join } from 'path';

/**
 * Estado do sistema
 */
let isInitialized = false;
let invalidator: any = null;

/**
 * Inicializa cache e search index com componentes
 */
async function initializeSystem(resolved: any) {
  if (isInitialized) {
    logger.debug('System already initialized');
    return;
  }
  
  const timer = new Timer('System initialization');
  logger.info('Initializing system...');
  
  // Tentar carregar do cache persistente primeiro
  const cacheDir = join(resolved.root, 'data');  // root já é DesignSystem-Vuexy/design-system-mcp
  const persistentCache = new PersistentCache(cacheDir);
  
  logger.debug('Checking persistent cache', { cacheDir });
  
  let components: any[] = [];
  
  if (await persistentCache.exists()) {
    logger.info('Loading from persistent cache...');
    const cachedComponents = await persistentCache.load();
    
    if (cachedComponents.length > 0) {
      components = cachedComponents;
      logger.info(`Loaded ${components.length} components from cache`);
    } else {
      logger.warn('Cached file empty, loading from source');
    }
  }
  
  // Se cache não existir ou estiver vazio, carregar da fonte
  if (components.length === 0) {
    logger.info('Loading from source files...');
    
    const loader = new ComponentLoader({
      storiesPath: resolved.stories,
      componentsPath: resolved.components,
      storybookBaseUrl: 'http://localhost:6006'
    });
    
    const result = await loader.loadAll();
    
    if (result.errors.length > 0) {
      logger.warn(`${result.errors.length} errors during loading:`, result.errors);
    }
    
    components = result.components;
    
    // Salvar cache para próxima vez
    if (components.length > 0) {
      await persistentCache.save(components);
    }
  }
  
  // Popular cache em memória e search index
  for (const component of components) {
    componentCache.set(component.name, component);
    searchIndex.addComponent(component);
  }
  
  logger.info('System initialized', {
    components: components.length,
    elapsed: timer.end()
  });
  
  // Iniciar cache invalidator
  invalidator = createCacheInvalidator(componentCache, [
    `${resolved.stories}/**/*.stories.js`,
    `${resolved.components}/**/*.vue`
  ]);
  
  invalidator.start();
  
  isInitialized = true;
}

/**
 * Inicializa e inicia o servidor MCP
 */
async function main() {
  try {
    // 1. Carregar configuração
    logger.info('Loading configuration...');
    const config = loadConfig();
    
    const configValidation = validateConfig(config);
    if (!configValidation.valid) {
      logger.error('Invalid configuration:', configValidation.errors);
      process.exit(1);
    }
    
    // 2. Resolver e validar paths
    logger.info('Resolving paths...');
    const resolved = resolvePaths(config.paths);
    
    const pathValidation = await validatePaths(resolved);
    if (!pathValidation.valid) {
      logger.error('Invalid paths:', pathValidation.errors);
      process.exit(1);
    }
    
    logger.info('Paths validated', {
      stories: resolved.stories,
      components: resolved.components
    });
    
    // 3. Inicializar sistema (cache + search)
    await initializeSystem(resolved);
    
    // 4. Inicializar MCP Server
    logger.info(`Starting ${MCP_SERVER_NAME} v${MCP_SERVER_VERSION}`);
    
    const server = new Server(
      {
        name: MCP_SERVER_NAME,
        version: MCP_SERVER_VERSION
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );
    
    // 5. Registrar handlers
    
    // Handler: ListTools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      logger.debug('ListTools request received');
      return {
        tools: MCP_TOOLS
      };
    });
    
    // Handler: CallTool
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      logger.info(`CallTool: ${name}`, args);
      
      try {
        switch (name) {
          case 'listComponents':
            return await handleListComponents(args);
          
          case 'getComponent':
            return await handleGetComponent(args);
          
          case 'searchComponents':
            return await handleSearchComponents(args);
          
          case 'getStats':
            return await handleGetStats(args);
          
          case 'getComponentsByCategory':
            return await handleGetComponentsByCategory(args);
          
          case 'getCacheStats':
            return await handleGetCacheStats(args);
          
          case 'getSearchIndexStats':
            return await handleGetSearchIndexStats(args);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        logger.error(`Error executing tool ${name}:`, error);
        throw error;
      }
    });
    
    // 6. Conectar transport (stdio)
    logger.info('Connecting stdio transport...');
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    logger.info('MCP Server running and ready');
  } catch (error) {
    logger.error('Fatal error during startup:', error);
    process.exit(1);
  }
}

// ============================================================================
// Tool Handlers
// ============================================================================

/**
 * listComponents - Lista componentes com paginação e filtros
 */
async function handleListComponents(args: unknown) {
  const timer = new Timer('handleListComponents');
  
  try {
    const params = args as any;
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const filters: ComponentFilters = {
      category: params?.category,
      priority: params?.priority,
      tags: params?.tags
    };
    
    logger.debug('listComponents', { page, limit, filters });
    
    // Obter componentes do cache
    let components = componentCache.values();
    
    // Aplicar filtros
    if (filters.category) {
      components = components.filter(c => c.category === filters.category);
    }
    
    if (filters.priority) {
      components = components.filter(c => c.priority === filters.priority);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      components = components.filter(c => 
        filters.tags!.some(tag => c.metadata.tags.includes(tag))
      );
    }
    
    // Paginação
    const total = components.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedComponents = components.slice(start, end);
    
    const elapsed = timer.end();
    logger.info(`listComponents completed in ${elapsed}ms`, { total, page, totalPages });
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            components: paginatedComponents,
            pagination: {
              page,
              limit,
              total,
              totalPages
            }
          }, null, 2)
        }
      ]
    };
  } catch (error) {
    logger.error('handleListComponents error:', error);
    throw createMCPError(
      MCPErrorCode.INTERNAL_ERROR,
      'Failed to list components',
      { error: String(error) }
    );
  }
}

/**
 * getComponent - Obtém detalhes de um componente específico
 */
async function handleGetComponent(args: unknown) {
  const timer = new Timer('handleGetComponent');
  
  try {
    const params = args as any;
    const name = params?.name;
    
    if (!name) {
      throw createMCPError(
        MCPErrorCode.INVALID_PARAMS,
        'Missing required parameter: name'
      );
    }
    
    logger.debug('getComponent', { name });
    
    const component = componentCache.getByName(name);
    
    if (!component) {
      throw createMCPError(
        MCPErrorCode.COMPONENT_NOT_FOUND,
        `Component not found: ${name}`
      );
    }
    
    const elapsed = timer.end();
    logger.info(`getComponent completed in ${elapsed}ms`, { name });
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ component }, null, 2)
        }
      ]
    };
  } catch (error) {
    logger.error('handleGetComponent error:', error);
    throw error;
  }
}

/**
 * searchComponents - Busca textual em componentes
 */
async function handleSearchComponents(args: unknown) {
  const timer = new Timer('handleSearchComponents');
  
  try {
    const params = args as any;
    const query = params?.query;
    const limit = params?.limit || 20;
    
    if (!query) {
      throw createMCPError(
        MCPErrorCode.INVALID_PARAMS,
        'Missing required parameter: query'
      );
    }
    
    logger.debug('searchComponents', { query, limit });
    
    // Buscar no índice
    const results = searchIndex.search(query, limit);
    
    const elapsed = timer.end();
    logger.info(`searchComponents completed in ${elapsed}ms`, { 
      query, 
      results: results.length 
    });
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            query,
            results: results.map(r => ({
              component: r.component,
              score: r.score,
              matchedTerms: r.matchedTerms,
              matchedFields: r.matchedFields
            })),
            total: results.length
          }, null, 2)
        }
      ]
    };
  } catch (error) {
    logger.error('handleSearchComponents error:', error);
    throw createMCPError(
      MCPErrorCode.INTERNAL_ERROR,
      'Failed to search components',
      { error: String(error) }
    );
  }
}

/**
 * getStats - Obtém estatísticas agregadas
 */
async function handleGetStats(_args: unknown) {
  const timer = new Timer('handleGetStats');
  
  try {
    logger.debug('getStats');
    
    const components = componentCache.values();
    
    // Contadores por categoria
    const byCategory: Record<string, number> = {};
    components.forEach(c => {
      byCategory[c.category] = (byCategory[c.category] || 0) + 1;
    });
    
    // Contadores por prioridade
    const byPriority = {
      P0: components.filter(c => c.priority === 'P0').length,
      P1: components.filter(c => c.priority === 'P1').length,
      P2: components.filter(c => c.priority === 'P2').length
    };
    
    // Top tags
    const tagCounts: Record<string, number> = {};
    components.forEach(c => {
      c.metadata.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
    
    // Stats cache
    const cacheStats = componentCache.getStats();
    
    // Stats search index
    const searchStats = searchIndex.getStats();
    
    const elapsed = timer.end();
    logger.info(`getStats completed in ${elapsed}ms`);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            totalComponents: components.length,
            totalStories: components.reduce((sum, c) => sum + c.stats.storiesCount, 0),
            categoryCounts: byCategory,
            priorityCounts: byPriority,
            topTags,
            cache: cacheStats,
            search: searchStats
          }, null, 2)
        }
      ]
    };
  } catch (error) {
    logger.error('handleGetStats error:', error);
    throw createMCPError(
      MCPErrorCode.INTERNAL_ERROR,
      'Failed to get stats',
      { error: String(error) }
    );
  }
}

/**
 * getComponentsByCategory - Obtém componentes de uma categoria
 */
async function handleGetComponentsByCategory(args: unknown) {
  const timer = new Timer('handleGetComponentsByCategory');
  
  try {
    const params = args as any;
    const category = params?.category;
    
    if (!category) {
      throw createMCPError(
        MCPErrorCode.INVALID_PARAMS,
        'Missing required parameter: category'
      );
    }
    
    logger.debug('getComponentsByCategory', { category });
    
    const components = componentCache.getByCategory(category);
    
    const elapsed = timer.end();
    logger.info(`getComponentsByCategory completed in ${elapsed}ms`, { 
      category, 
      count: components.length 
    });
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            category,
            components,
            total: components.length
          }, null, 2)
        }
      ]
    };
  } catch (error) {
    logger.error('handleGetComponentsByCategory error:', error);
    throw createMCPError(
      MCPErrorCode.INTERNAL_ERROR,
      'Failed to get components by category',
      { error: String(error) }
    );
  }
}

/**
 * getCacheStats - Obtém estatísticas do cache
 */
async function handleGetCacheStats(_args: unknown) {
  const timer = new Timer('handleGetCacheStats');
  
  try {
    const stats = componentCache.getStats();
    
    const elapsed = timer.end();
    logger.info(`getCacheStats completed in ${elapsed}ms`);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(stats, null, 2)
        }
      ]
    };
  } catch (error) {
    logger.error('handleGetCacheStats error:', error);
    throw createMCPError(
      MCPErrorCode.INTERNAL_ERROR,
      'Failed to get cache stats',
      { error: String(error) }
    );
  }
}

/**
 * getSearchIndexStats - Obtém estatísticas do índice de busca
 */
async function handleGetSearchIndexStats(_args: unknown) {
  const timer = new Timer('handleGetSearchIndexStats');
  
  try {
    const stats = searchIndex.getStats();
    
    const elapsed = timer.end();
    logger.info(`getSearchIndexStats completed in ${elapsed}ms`);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(stats, null, 2)
        }
      ]
    };
  } catch (error) {
    logger.error('handleGetSearchIndexStats error:', error);
    throw createMCPError(
      MCPErrorCode.INTERNAL_ERROR,
      'Failed to get search index stats',
      { error: String(error) }
    );
  }
}

// ============================================================================
// Start Server
// ============================================================================

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully...');
  if (invalidator) {
    await invalidator.stop();
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  if (invalidator) {
    await invalidator.stop();
  }
  process.exit(0);
});

main();
