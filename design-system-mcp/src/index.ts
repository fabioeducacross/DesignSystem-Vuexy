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
import { logger } from './utils/logger.js';
import { 
  MCP_SERVER_NAME, 
  MCP_SERVER_VERSION, 
  MCP_PROTOCOL_VERSION,
  MCP_TOOLS 
} from './types/mcp.js';

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
    
    // 3. Inicializar MCP Server
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
    
    // 4. Registrar handlers
    
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
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        logger.error(`Error executing tool ${name}:`, error);
        throw error;
      }
    });
    
    // 5. Conectar transport (stdio)
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
// Tool Handlers (Stubs - serão implementados nas próximas fases)
// ============================================================================

async function handleListComponents(args: unknown) {
  logger.warn('listComponents not yet implemented');
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          components: [],
          total: 0,
          page: 1,
          totalPages: 0,
          message: 'Implementation pending - Phase 2'
        })
      }
    ]
  };
}

async function handleGetComponent(args: unknown) {
  logger.warn('getComponent not yet implemented');
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          component: null,
          error: 'Implementation pending - Phase 2'
        })
      }
    ]
  };
}

async function handleSearchComponents(args: unknown) {
  logger.warn('searchComponents not yet implemented');
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          results: [],
          total: 0,
          processedQuery: '',
          message: 'Implementation pending - Phase 2'
        })
      }
    ]
  };
}

async function handleGetStats(args: unknown) {
  logger.warn('getStats not yet implemented');
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          totalComponents: 0,
          totalStories: 0,
          categoryCounts: {},
          priorityCounts: {},
          topTags: [],
          message: 'Implementation pending - Phase 2'
        })
      }
    ]
  };
}

async function handleGetComponentsByCategory(args: unknown) {
  logger.warn('getComponentsByCategory not yet implemented');
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          category: '',
          components: [],
          total: 0,
          message: 'Implementation pending - Phase 2'
        })
      }
    ]
  };
}

// ============================================================================
// Start Server
// ============================================================================

main();
