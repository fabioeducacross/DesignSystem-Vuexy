/**
 * Persistent Cache Module
 * 
 * Gerencia cache persistente em disco (JSON)
 */

import { readFile, writeFile, access } from 'fs/promises';
import { join } from 'path';
import { Component } from '../types/component.js';
import { logger } from '../utils/logger.js';

export interface CacheMetadata {
  version: string;
  timestamp: string;
  totalComponents: number;
  categories: number;
}

export interface PersistedCache {
  version: string;
  timestamp: string;
  totalComponents: number;
  categories: number;
  components: Component[];
}

/**
 * Persistent Cache Manager
 */
export class PersistentCache {
  private cachePath: string;
  
  constructor(cacheDir: string) {
    this.cachePath = join(cacheDir, 'component-cache.json');
  }
  
  /**
   * Verifica se cache existe
   */
  async exists(): Promise<boolean> {
    try {
      logger.debug('Checking cache file', { path: this.cachePath });
      await access(this.cachePath);
      logger.debug('Cache file exists');
      return true;
    } catch (error) {
      logger.debug('Cache file not found', { path: this.cachePath, error: String(error) });
      return false;
    }
  }
  
  /**
   * Carrega cache do disco
   */
  async load(): Promise<Component[]> {
    try {
      logger.info('Loading cache from disk', { path: this.cachePath });
      
      const data = await readFile(this.cachePath, 'utf-8');
      const cache: PersistedCache = JSON.parse(data);
      
      logger.info('Cache loaded successfully', {
        components: cache.components.length,
        timestamp: cache.timestamp
      });
      
      return cache.components;
    } catch (error) {
      logger.warn('Failed to load cache from disk', error);
      return [];
    }
  }
  
  /**
   * Salva cache no disco
   */
  async save(components: Component[]): Promise<void> {
    try {
      const categories = new Set(components.map(c => c.category)).size;
      
      const cache: PersistedCache = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        totalComponents: components.length,
        categories,
        components
      };
      
      await writeFile(this.cachePath, JSON.stringify(cache, null, 2));
      
      logger.info('Cache saved to disk', {
        path: this.cachePath,
        components: components.length,
        size: `${(JSON.stringify(cache).length / 1024).toFixed(1)} KB`
      });
    } catch (error) {
      logger.error('Failed to save cache to disk', error);
    }
  }
  
  /**
   * Obtém metadados do cache sem carregar componentes
   */
  async getMetadata(): Promise<CacheMetadata | null> {
    try {
      const data = await readFile(this.cachePath, 'utf-8');
      const cache = JSON.parse(data);
      
      return {
        version: cache.version,
        timestamp: cache.timestamp,
        totalComponents: cache.totalComponents,
        categories: cache.categories
      };
    } catch {
      return null;
    }
  }
}
