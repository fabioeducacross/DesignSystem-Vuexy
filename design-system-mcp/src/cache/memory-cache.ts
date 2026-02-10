/**
 * Memory Cache
 * 
 * Cache in-memory para componentes parseados com TTL e estatísticas.
 * Usa Map para O(1) lookups.
 */

import { Component } from '../types/component.js';
import { logger } from '../utils/logger.js';

/**
 * Entrada no cache com metadados
 */
interface CacheEntry<T> {
  /** Valor armazenado */
  value: T;
  
  /** Timestamp de inserção */
  insertedAt: Date;
  
  /** Timestamp de último acesso */
  lastAccessedAt: Date;
  
  /** Contador de hits */
  hits: number;
  
  /** TTL em segundos (0 = sem expiração) */
  ttl: number;
}

/**
 * Estatísticas do cache
 */
export interface CacheStats {
  /** Total de itens no cache */
  itemsCount: number;
  
  /** Total de hits */
  totalHits: number;
  
  /** Total de misses */
  totalMisses: number;
  
  /** Hit rate (0-1) */
  hitRate: number;
  
  /** Uso estimado de memória em bytes */
  memoryUsage: number;
  
  /** Itens mais acessados */
  topItems: Array<{
    key: string;
    hits: number;
    lastAccessed: Date;
  }>;
}

/**
 * Cache genérico em memória
 */
export class MemoryCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private hits = 0;
  private misses = 0;
  private defaultTTL: number;
  
  constructor(defaultTTL: number = 3600) {
    this.defaultTTL = defaultTTL; // 1 hora padrão
  }
  
  /**
   * Adiciona ou atualiza item no cache
   */
  set(key: string, value: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      value,
      insertedAt: new Date(),
      lastAccessedAt: new Date(),
      hits: 0,
      ttl: ttl ?? this.defaultTTL
    };
    
    this.cache.set(key, entry);
    logger.debug(`Cache SET: ${key}`);
  }
  
  /**
   * Obtém item do cache (ou undefined se não existir/expirado)
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.misses++;
      logger.debug(`Cache MISS: ${key}`);
      return undefined;
    }
    
    // Verificar expiração
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.misses++;
      logger.debug(`Cache EXPIRED: ${key}`);
      return undefined;
    }
    
    // Atualizar stats
    entry.lastAccessedAt = new Date();
    entry.hits++;
    this.hits++;
    
    logger.debug(`Cache HIT: ${key} (hits: ${entry.hits})`);
    return entry.value;
  }
  
  /**
   * Verifica se key existe no cache (sem contar como hit)
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
  
  /**
   * Remove item do cache
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      logger.debug(`Cache DELETE: ${key}`);
    }
    return deleted;
  }
  
  /**
   * Limpa todo o cache
   */
  clear(): void {
    const count = this.cache.size;
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
    logger.info(`Cache cleared: ${count} items removed`);
  }
  
  /**
   * Remove itens expirados
   */
  prune(): number {
    let pruned = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
        pruned++;
      }
    }
    
    if (pruned > 0) {
      logger.info(`Cache pruned: ${pruned} expired items removed`);
    }
    
    return pruned;
  }
  
  /**
   * Obtém estatísticas do cache
   */
  getStats(): CacheStats {
    const total = this.hits + this.misses;
    const hitRate = total > 0 ? this.hits / total : 0;
    
    // Calcular top items
    const topItems = Array.from(this.cache.entries())
      .map(([key, entry]) => ({
        key,
        hits: entry.hits,
        lastAccessed: entry.lastAccessedAt
      }))
      .sort((a, b) => b.hits - a.hits)
      .slice(0, 10);
    
    // Estimativa de memória (rough approximation)
    const memoryUsage = this.estimateMemoryUsage();
    
    return {
      itemsCount: this.cache.size,
      totalHits: this.hits,
      totalMisses: this.misses,
      hitRate,
      memoryUsage,
      topItems
    };
  }
  
  /**
   * Obtém todas as keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }
  
  /**
   * Obtém todos os valores (sem verificação de expiração)
   */
  values(): T[] {
    return Array.from(this.cache.values()).map(entry => entry.value);
  }
  
  /**
   * Obtém tamanho atual do cache
   */
  get size(): number {
    return this.cache.size;
  }
  
  /**
   * Verifica se entry está expirado
   */
  private isExpired(entry: CacheEntry<T>): boolean {
    if (entry.ttl === 0) return false; // Sem expiração
    
    const now = Date.now();
    const insertedAt = entry.insertedAt.getTime();
    const ageInSeconds = (now - insertedAt) / 1000;
    
    return ageInSeconds > entry.ttl;
  }
  
  /**
   * Estima uso de memória (rough approximation)
   */
  private estimateMemoryUsage(): number {
    let total = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      // Key string
      total += key.length * 2; // UTF-16
      
      // Entry overhead (timestamps, counters)
      total += 64;
      
      // Value (rough estimate via JSON)
      try {
        const json = JSON.stringify(entry.value);
        total += json.length * 2;
      } catch {
        total += 1024; // Fallback estimate
      }
    }
    
    return total;
  }
}

/**
 * Cache especializado para componentes
 */
export class ComponentCache extends MemoryCache<Component> {
  /**
   * Obtém componente por nome
   */
  getByName(name: string): Component | undefined {
    return this.get(name);
  }
  
  /**
   * Obtém componentes por categoria
   */
  getByCategory(category: string): Component[] {
    return this.values().filter(c => c.category === category);
  }
  
  /**
   * Obtém componentes por prioridade
   */
  getByPriority(priority: 'P0' | 'P1' | 'P2'): Component[] {
    return this.values().filter(c => c.priority === priority);
  }
  
  /**
   * Obtém componentes por tag
   */
  getByTag(tag: string): Component[] {
    return this.values().filter(c => 
      c.metadata.tags.includes(tag)
    );
  }
  
  /**
   * Busca componentes por query textual
   */
  search(query: string): Component[] {
    const lowerQuery = query.toLowerCase();
    
    return this.values().filter(c => {
      const searchText = [
        c.name,
        c.category,
        c.metadata.title,
        c.metadata.description || '',
        ...c.metadata.tags
      ].join(' ').toLowerCase();
      
      return searchText.includes(lowerQuery);
    });
  }
}

/**
 * Instância global do cache de componentes
 */
export const componentCache = new ComponentCache();
