/**
 * Unit Tests - Memory Cache
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryCache, ComponentCache } from '../src/cache/memory-cache.js';
import { Component } from '../src/types/component.js';

describe('MemoryCache', () => {
  let cache: MemoryCache<string>;
  
  beforeEach(() => {
    cache = new MemoryCache<string>(3600); // 1 hora TTL
  });
  
  it('should set and get values', () => {
    cache.set('key1', 'value1');
    
    expect(cache.get('key1')).toBe('value1');
  });
  
  it('should return undefined for non-existent keys', () => {
    expect(cache.get('nonexistent')).toBeUndefined();
  });
  
  it('should check if key exists', () => {
    cache.set('key1', 'value1');
    
    expect(cache.has('key1')).toBe(true);
    expect(cache.has('nonexistent')).toBe(false);
  });
  
  it('should delete keys', () => {
    cache.set('key1', 'value1');
    
    expect(cache.has('key1')).toBe(true);
    
    cache.delete('key1');
    
    expect(cache.has('key1')).toBe(false);
  });
  
  it('should clear all entries', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    
    expect(cache.size).toBe(2);
    
    cache.clear();
    
    expect(cache.size).toBe(0);
  });
  
  it('should track hits and misses', () => {
    cache.set('key1', 'value1');
    
    cache.get('key1'); // hit
    cache.get('key1'); // hit
    cache.get('nonexistent'); // miss
    
    const stats = cache.getStats();
    
    expect(stats.totalHits).toBe(2);
    expect(stats.totalMisses).toBe(1);
    expect(stats.hitRate).toBeCloseTo(2 / 3);
  });
  
  it('should expire entries after TTL', async () => {
    const shortCache = new MemoryCache<string>(1); // 1 segundo
    
    shortCache.set('key1', 'value1');
    
    expect(shortCache.get('key1')).toBe('value1');
    
    // Esperar 1.5 segundos
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    expect(shortCache.get('key1')).toBeUndefined();
  });
  
  it('should honor 0 TTL (no expiration)', async () => {
    const noExpireCache = new MemoryCache<string>(0);
    
    noExpireCache.set('key1', 'value1');
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(noExpireCache.get('key1')).toBe('value1');
  });
  
  it('should prune expired entries', async () => {
    const shortCache = new MemoryCache<string>(1);
    
    shortCache.set('key1', 'value1');
    shortCache.set('key2', 'value2');
    
    // Esperar expiração
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const pruned = shortCache.prune();
    
    expect(pruned).toBe(2);
    expect(shortCache.size).toBe(0);
  });
  
  it('should return keys and values', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    
    const keys = cache.keys();
    const values = cache.values();
    
    expect(keys).toEqual(['key1', 'key2']);
    expect(values).toEqual(['value1', 'value2']);
  });
  
  it('should track top items by hits', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');
    
    // Acessar key1 3x
    cache.get('key1');
    cache.get('key1');
    cache.get('key1');
    
    // Acessar key2 1x
    cache.get('key2');
    
    const stats = cache.getStats();
    
    expect(stats.topItems[0].key).toBe('key1');
    expect(stats.topItems[0].hits).toBe(3);
    expect(stats.topItems[1].key).toBe('key2');
    expect(stats.topItems[1].hits).toBe(1);
  });
});

describe('ComponentCache', () => {
  let cache: ComponentCache;
  
  const mockComponent1: Component = {
    name: 'Button',
    category: 'Forms',
    priority: 'P0',
    metadata: {
      title: 'Button',
      description: 'Button component',
      tags: ['form', 'interactive']
    },
    stories: [],
    props: [],
    events: [],
    slots: [],
    paths: { storyFile: '/Button.stories.js', storybookUrl: '' },
    stats: { storiesCount: 0, propsCount: 0, eventsCount: 0, slotsCount: 0 }
  };
  
  const mockComponent2: Component = {
    name: 'Input',
    category: 'Forms',
    priority: 'P1',
    metadata: {
      title: 'Input',
      description: 'Input component',
      tags: ['form', 'text']
    },
    stories: [],
    props: [],
    events: [],
    slots: [],
    paths: { storyFile: '/Input.stories.js', storybookUrl: '' },
    stats: { storiesCount: 0, propsCount: 0, eventsCount: 0, slotsCount: 0 }
  };
  
  const mockComponent3: Component = {
    name: 'Card',
    category: 'Layout',
    priority: 'P2',
    metadata: {
      title: 'Card',
      tags: ['container']
    },
    stories: [],
    props: [],
    events: [],
    slots: [],
    paths: { storyFile: '/Card.stories.js', storybookUrl: '' },
    stats: { storiesCount: 0, propsCount: 0, eventsCount: 0, slotsCount: 0 }
  };
  
  beforeEach(() => {
    cache = new ComponentCache();
    cache.set('Button', mockComponent1);
    cache.set('Input', mockComponent2);
    cache.set('Card', mockComponent3);
  });
  
  it('should get component by name', () => {
    const component = cache.getByName('Button');
    
    expect(component).toBeDefined();
    expect(component?.name).toBe('Button');
  });
  
  it('should get components by category', () => {
    const components = cache.getByCategory('Forms');
    
    expect(components).toHaveLength(2);
    expect(components.map(c => c.name).sort()).toEqual(['Button', 'Input']);
  });
  
  it('should get components by priority', () => {
    const p0 = cache.getByPriority('P0');
    const p1 = cache.getByPriority('P1');
    const p2 = cache.getByPriority('P2');
    
    expect(p0).toHaveLength(1);
    expect(p0[0].name).toBe('Button');
    
    expect(p1).toHaveLength(1);
    expect(p1[0].name).toBe('Input');
    
    expect(p2).toHaveLength(1);
    expect(p2[0].name).toBe('Card');
  });
  
  it('should get components by tag', () => {
    const formComponents = cache.getByTag('form');
    
    expect(formComponents).toHaveLength(2);
    expect(formComponents.map(c => c.name).sort()).toEqual(['Button', 'Input']);
  });
  
  it('should search components by text', () => {
    const results = cache.search('button');
    
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Button');
  });
  
  it('should search components case-insensitively', () => {
    const results = cache.search('BUTTON');
    
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Button');
  });
  
  it('should search in multiple fields', () => {
    // Buscar por tag
    const byTag = cache.search('interactive');
    expect(byTag).toHaveLength(1);
    expect(byTag[0].name).toBe('Button');
    
    // Buscar por categoria
    const byCategory = cache.search('Forms');
    expect(byCategory).toHaveLength(2);
    
    // Buscar por descrição
    const byDescription = cache.search('container');
    expect(byDescription).toHaveLength(1);
    expect(byDescription[0].name).toBe('Card');
  });
});
