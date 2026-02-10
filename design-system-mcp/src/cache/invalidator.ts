/**
 * Cache Invalidator
 * 
 * Monitora mudanças em arquivos e invalida cache automaticamente.
 * Usa chokidar para file watching.
 */

import chokidar, { FSWatcher } from 'chokidar';
import { basename } from 'path';
import { ComponentCache } from './memory-cache.js';
import { logger } from '../utils/logger.js';

/**
 * Configuração do invalidator
 */
export interface InvalidatorConfig {
  /** Paths para monitorar (glob patterns) */
  watchPaths: string[];
  
  /** Cache a ser invalidado */
  cache: ComponentCache;
  
  /** Debounce delay em ms */
  debounceDelay?: number;
  
  /** Callback após invalidação */
  onInvalidate?: (filepath: string, componentName: string) => void;
}

/**
 * Gerencia invalidação automática de cache via file watching
 */
export class CacheInvalidator {
  private watcher: FSWatcher | null = null;
  private config: InvalidatorConfig;
  private debounceTimers = new Map<string, NodeJS.Timeout>();
  
  constructor(config: InvalidatorConfig) {
    this.config = {
      ...config,
      debounceDelay: config.debounceDelay ?? 500 // 500ms default
    };
  }
  
  /**
   * Inicia file watching
   */
  start(): void {
    if (this.watcher) {
      logger.warn('Invalidator already started');
      return;
    }
    
    logger.info('Starting cache invalidator', {
      paths: this.config.watchPaths
    });
    
    this.watcher = chokidar.watch(this.config.watchPaths, {
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 100
      }
    });
    
    this.watcher
      .on('change', (filepath) => this.handleChange(filepath))
      .on('unlink', (filepath) => this.handleDelete(filepath))
      .on('error', (error) => {
        logger.error('File watcher error:', error);
      });
    
    logger.info('Cache invalidator started');
  }
  
  /**
   * Para file watching
   */
  async stop(): Promise<void> {
    if (!this.watcher) {
      return;
    }
    
    logger.info('Stopping cache invalidator');
    
    // Cancelar timers pendentes
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();
    
    await this.watcher.close();
    this.watcher = null;
    
    logger.info('Cache invalidator stopped');
  }
  
  /**
   * Handler para mudanças em arquivos
   */
  private handleChange(filepath: string): void {
    // Debounce para evitar múltiplas invalidações rápidas
    const existingTimer = this.debounceTimers.get(filepath);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    
    const timer = setTimeout(() => {
      this.invalidateFile(filepath);
      this.debounceTimers.delete(filepath);
    }, this.config.debounceDelay);
    
    this.debounceTimers.set(filepath, timer);
  }
  
  /**
   * Handler para arquivos deletados
   */
  private handleDelete(filepath: string): void {
    logger.info(`File deleted: ${filepath}`);
    this.invalidateFile(filepath);
  }
  
  /**
   * Invalida cache para um arquivo específico
   */
  private invalidateFile(filepath: string): void {
    const componentName = this.getComponentNameFromPath(filepath);
    
    if (this.config.cache.has(componentName)) {
      this.config.cache.delete(componentName);
      logger.info(`Cache invalidated: ${componentName} (${filepath})`);
      
      // Callback
      if (this.config.onInvalidate) {
        this.config.onInvalidate(filepath, componentName);
      }
    }
  }
  
  /**
   * Extrai nome do componente de um filepath
   */
  private getComponentNameFromPath(filepath: string): string {
    const filename = basename(filepath);
    
    // Remove extensão .stories.js ou .vue
    return filename
      .replace('.stories.js', '')
      .replace('.vue', '');
  }
  
  /**
   * Adiciona paths para monitorar
   */
  addPaths(paths: string[]): void {
    if (!this.watcher) {
      logger.warn('Cannot add paths: invalidator not started');
      return;
    }
    
    this.watcher.add(paths);
    logger.info('Added paths to watcher', { paths });
  }
  
  /**
   * Remove paths do monitoramento
   */
  removePaths(paths: string[]): void {
    if (!this.watcher) {
      return;
    }
    
    this.watcher.unwatch(paths);
    logger.info('Removed paths from watcher', { paths });
  }
}

/**
 * Factory para criar invalidator com configuração padrão
 */
export function createCacheInvalidator(
  cache: ComponentCache,
  watchPaths: string[]
): CacheInvalidator {
  return new CacheInvalidator({
    cache,
    watchPaths
  });
}
