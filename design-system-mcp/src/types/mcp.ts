/**
 * MCP Protocol Types
 * 
 * Tipos específicos para integração com Model Context Protocol
 */

import { Component, ComponentFilters, PaginationOptions } from './component.js';

/**
 * Versão do protocolo MCP suportada
 */
export const MCP_PROTOCOL_VERSION = '1.0.0';

/**
 * Versão do servidor MCP
 */
export const MCP_SERVER_VERSION = '1.0.0';

/**
 * Nome do servidor MCP
 */
export const MCP_SERVER_NAME = 'design-system-mcp';

/**
 * Capabilities do servidor MCP
 */
export interface MCPServerCapabilities {
  /** Suporta tools */
  tools: boolean;
  
  /** Suporta resources */
  resources?: boolean;
  
  /** Suporta prompts */
  prompts?: boolean;
}

/**
 * Informações do servidor MCP
 */
export interface MCPServerInfo {
  /** Nome do servidor */
  name: string;
  
  /** Versão do servidor */
  version: string;
  
  /** Versão do protocolo */
  protocolVersion: string;
  
  /** Capabilities suportadas */
  capabilities: MCPServerCapabilities;
}

// ============================================================================
// Tool: listComponents
// ============================================================================

/**
 * Input para a tool listComponents
 */
export interface ListComponentsInput {
  /** Filtrar por categoria */
  category?: string;
  
  /** Filtrar por prioridade */
  priority?: 'P0' | 'P1' | 'P2';
  
  /** Filtrar por tags */
  tags?: string[];
  
  /** Paginação */
  page?: number;
  limit?: number;
  
  /** Ordenação */
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Output da tool listComponents
 */
export interface ListComponentsOutput {
  /** Lista de componentes */
  components: Component[];
  
  /** Total de componentes (sem paginação) */
  total: number;
  
  /** Página atual */
  page: number;
  
  /** Total de páginas */
  totalPages: number;
}

// ============================================================================
// Tool: getComponent
// ============================================================================

/**
 * Input para a tool getComponent
 */
export interface GetComponentInput {
  /** Nome do componente (case-sensitive) */
  name: string;
  
  /** Incluir metadados completos? */
  includeFullMetadata?: boolean;
}

/**
 * Output da tool getComponent
 */
export interface GetComponentOutput {
  /** Componente encontrado */
  component: Component | null;
  
  /** Mensagem de erro se não encontrado */
  error?: string;
}

// ============================================================================
// Tool: searchComponents
// ============================================================================

/**
 * Input para a tool searchComponents
 */
export interface SearchComponentsInput {
  /** Query de busca (texto livre) */
  query: string;
  
  /** Limite de resultados */
  limit?: number;
  
  /** Filtros adicionais */
  filters?: ComponentFilters;
  
  /** Score mínimo (0-1) */
  minScore?: number;
}

/**
 * Output da tool searchComponents
 */
export interface SearchComponentsOutput {
  /** Resultados encontrados */
  results: Array<{
    component: Component;
    score: number;
    matchedFields: string[];
  }>;
  
  /** Total de matches */
  total: number;
  
  /** Query processada */
  processedQuery: string;
}

// ============================================================================
// Tool: getStats
// ============================================================================

/**
 * Output da tool getStats
 */
export interface GetStatsOutput {
  /** Total de componentes */
  totalComponents: number;
  
  /** Total de stories */
  totalStories: number;
  
  /** Componentes por categoria */
  categoryCounts: Record<string, number>;
  
  /** Componentes por prioridade */
  priorityCounts: Record<string, number>;
  
  /** Tags mais usadas */
  topTags: Array<{ tag: string; count: number }>;
  
  /** Componente mais complexo */
  mostComplexComponent?: {
    name: string;
    propsCount: number;
    eventsCount: number;
  };
  
  /** Cache stats */
  cache?: {
    hitRate: number;
    itemsCount: number;
    memoryUsage: number;
  };
}

// ============================================================================
// Tool: getComponentsByCategory
// ============================================================================

/**
 * Input para a tool getComponentsByCategory
 */
export interface GetComponentsByCategoryInput {
  /** Categoria alvo */
  category: string;
  
  /** Incluir subcategorias? */
  includeSubcategories?: boolean;
  
  /** Paginação */
  pagination?: PaginationOptions;
}

/**
 * Output da tool getComponentsByCategory
 */
export interface GetComponentsByCategoryOutput {
  /** Categoria consultada */
  category: string;
  
  /** Componentes encontrados */
  components: Component[];
  
  /** Total */
  total: number;
}

// ============================================================================
// MCP Tool Definitions
// ============================================================================

/**
 * Definição de uma tool MCP
 */
export interface MCPToolDefinition {
  /** Nome da tool */
  name: string;
  
  /** Descrição da tool */
  description: string;
  
  /** JSON Schema do input */
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

/**
 * Lista de todas as tools disponíveis
 */
export const MCP_TOOLS: MCPToolDefinition[] = [
  {
    name: 'listComponents',
    description: 'Lista componentes do Design System com filtros e paginação',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Filtrar por categoria' },
        priority: { 
          type: 'string', 
          enum: ['P0', 'P1', 'P2'],
          description: 'Filtrar por prioridade' 
        },
        tags: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Filtrar por tags (AND logic)' 
        },
        page: { type: 'number', minimum: 1, default: 1 },
        limit: { type: 'number', minimum: 1, maximum: 100, default: 20 },
        sortBy: { type: 'string', default: 'name' },
        sortOrder: { type: 'string', enum: ['asc', 'desc'], default: 'asc' }
      }
    }
  },
  {
    name: 'getComponent',
    description: 'Obtém metadados completos de um componente específico',
    inputSchema: {
      type: 'object',
      properties: {
        name: { 
          type: 'string', 
          description: 'Nome do componente (ex: "ProgressBar")' 
        },
        includeFullMetadata: { 
          type: 'boolean', 
          default: true,
          description: 'Incluir todos os metadados (props, events, slots)' 
        }
      },
      required: ['name']
    }
  },
  {
    name: 'searchComponents',
    description: 'Busca componentes por texto livre (nome, descrição, tags)',
    inputSchema: {
      type: 'object',
      properties: {
        query: { 
          type: 'string', 
          description: 'Query de busca' 
        },
        limit: { type: 'number', minimum: 1, maximum: 50, default: 10 },
        minScore: { 
          type: 'number', 
          minimum: 0, 
          maximum: 1, 
          default: 0.3,
          description: 'Score mínimo de relevância (0-1)' 
        }
      },
      required: ['query']
    }
  },
  {
    name: 'getStats',
    description: 'Obtém estatísticas gerais do Design System',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'getComponentsByCategory',
    description: 'Lista todos os componentes de uma categoria específica',
    inputSchema: {
      type: 'object',
      properties: {
        category: { 
          type: 'string',
          description: 'Categoria (ex: "DataDisplay", "Forms", "Modals")' 
        },
        includeSubcategories: { type: 'boolean', default: false }
      },
      required: ['category']
    }
  }
];

// ============================================================================
// Error Types
// ============================================================================

/**
 * Códigos de erro MCP
 */
export enum MCPErrorCode {
  PARSE_ERROR = -32700,
  INVALID_REQUEST = -32600,
  METHOD_NOT_FOUND = -32601,
  INVALID_PARAMS = -32602,
  INTERNAL_ERROR = -32603,
  
  // Custom errors
  COMPONENT_NOT_FOUND = -32001,
  CACHE_ERROR = -32002,
  PARSER_ERROR = -32003,
  FILE_NOT_FOUND = -32004
}

/**
 * Erro MCP formatado
 */
export interface MCPError {
  code: MCPErrorCode;
  message: string;
  data?: unknown;
}

/**
 * Helper para criar erro MCP
 */
export function createMCPError(
  code: MCPErrorCode, 
  message: string, 
  data?: unknown
): MCPError {
  return { code, message, data };
}
