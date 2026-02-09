/**
 * Configuration Module
 * 
 * Carrega e valida configurações do .env
 */

import { config as dotenvConfig } from 'dotenv';
import { PathConfig } from '../utils/paths.js';

/**
 * Configuração global do servidor
 */
export interface ServerConfig {
  /** Configuração de paths */
  paths: PathConfig;
  
  /** Cache habilitado? */
  cacheEnabled: boolean;
  
  /** TTL do cache em segundos */
  cacheTTL: number;
  
  /** Nível de log */
  logLevel: string;
  
  /** Máximo de workers para parsing paralelo */
  maxParseWorkers: number;
}

/**
 * Carrega variáveis de ambiente do .env
 */
export function loadEnv(): void {
  dotenvConfig();
}

/**
 * Carrega configuração completa
 */
export function loadConfig(): ServerConfig {
  // Carregar .env se existir
  loadEnv();
  
  // Determinar workspace root
  const workspaceRoot = process.env.WORKSPACE_ROOT || process.cwd();
  
  return {
    paths: {
      storiesPath: process.env.STORIES_PATH || '../src/stories/educacross-components-v2',
      componentsPath: process.env.COMPONENTS_PATH || '../educacross-frontoffice/src/components',
      cacheDir: process.env.CACHE_DIR,
      workspaceRoot
    },
    cacheEnabled: process.env.CACHE_ENABLED !== 'false',
    cacheTTL: parseInt(process.env.CACHE_TTL || '3600', 10),
    logLevel: process.env.LOG_LEVEL || 'info',
    maxParseWorkers: parseInt(process.env.MAX_PARSE_WORKERS || '4', 10)
  };
}

/**
 * Valida configuração
 */
export function validateConfig(config: ServerConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (config.cacheTTL < 0) {
    errors.push('CACHE_TTL must be >= 0');
  }
  
  if (config.maxParseWorkers < 1 || config.maxParseWorkers > 16) {
    errors.push('MAX_PARSE_WORKERS must be between 1 and 16');
  }
  
  const validLogLevels = ['debug', 'info', 'warn', 'error', 'silent'];
  if (!validLogLevels.includes(config.logLevel.toLowerCase())) {
    errors.push(`LOG_LEVEL must be one of: ${validLogLevels.join(', ')}`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
