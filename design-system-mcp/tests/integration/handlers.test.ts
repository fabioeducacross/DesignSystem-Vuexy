/**
 * Integration Tests - Tool Handlers
 * 
 * Testa handlers das tools MCP com componentes mockados.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { componentCache } from '../src/cache/memory-cache.js';
import { searchIndex } from '../src/search/index.js';
import { Component } from '../src/types/component.js';

// Mock components
const mockComponents: Component[] = [
  {
    name: 'Button',
    category: 'Forms',
    priority: 'P0',
    metadata: {
      title: 'Educacross Components V2/Forms/Button',
      description: 'Primary button component',
      tags: ['interactive', 'form', 'action']
    },
    stories: [
      { name: 'Default', args: {}, parameters: {} },
      { name: 'Primary', args: { variant: 'primary' }, parameters: {} }
    ],
    props: [
      { 
        name: 'variant', 
        type: 'string', 
        required: false, 
        default: 'default',
        description: 'Button variant'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false
      }
    ],
    events: [
      { name: 'click', description: 'Emitted on click' }
    ],
    slots: [],
    paths: {
      storyFile: '/stories/Button.stories.js',
      vueFile: '/components/Button.vue',
      storybookUrl: 'http://localhost:6006/?path=/story/button--default'
    },
    stats: {
      storiesCount: 2,
      propsCount: 2,
      eventsCount: 1,
      slotsCount: 0
    }
  },
  {
    name: 'Input',
    category: 'Forms',
    priority: 'P1',
    metadata: {
      title: 'Educacross Components V2/Forms/Input',
      description: 'Text input component',
      tags: ['form', 'input', 'text']
    },
    stories: [
      { name: 'Default', args: {}, parameters: {} }
    ],
    props: [
      { name: 'value', type: 'string', required: false },
      { name: 'placeholder', type: 'string', required: false }
    ],
    events: [
      { name: 'input', description: 'Emitted on input change' }
    ],
    slots: [],
    paths: {
      storyFile: '/stories/Input.stories.js',
      vueFile: '/components/Input.vue',
      storybookUrl: 'http://localhost:6006/?path=/story/input--default'
    },
    stats: {
      storiesCount: 1,
      propsCount: 2,
      eventsCount: 1,
      slotsCount: 0
    }
  },
  {
    name: 'Card',
    category: 'Layout',
    priority: 'P2',
    metadata: {
      title: 'Educacross Components V2/Layout/Card',
      description: 'Card container',
      tags: ['container', 'layout']
    },
    stories: [
      { name: 'Default', args: {}, parameters: {} }
    ],
    props: [],
    events: [],
    slots: [
      { name: 'default', description: 'Card content' }
    ],
    paths: {
      storyFile: '/stories/Card.stories.js',
      storybookUrl: 'http://localhost:6006/?path=/story/card--default'
    },
    stats: {
      storiesCount: 1,
      propsCount: 0,
      eventsCount: 0,
      slotsCount: 1
    }
  }
];

describe('Tool Handlers - Integration', () => {
  beforeEach(() => {
    // Limpar cache e index
    componentCache.clear();
    searchIndex.clear();
    
    // Popular com mocks
    for (const component of mockComponents) {
      componentCache.set(component.name, component);
      searchIndex.addComponent(component);
    }
  });
  
  describe('listComponents', () => {
    it('should list all components without filters', () => {
      const components = componentCache.values();
      
      expect(components).toHaveLength(3);
      expect(components.map(c => c.name)).toEqual(['Button', 'Input', 'Card']);
    });
    
    it('should filter by category', () => {
      const components = componentCache.getByCategory('Forms');
      
      expect(components).toHaveLength(2);
      expect(components.map(c => c.name)).toEqual(['Button', 'Input']);
    });
    
    it('should filter by priority', () => {
      const components = componentCache.getByPriority('P0');
      
      expect(components).toHaveLength(1);
      expect(components[0].name).toBe('Button');
    });
    
    it('should filter by tags', () => {
      const components = componentCache.getByTag('form');
      
      expect(components).toHaveLength(2);
      expect(components.map(c => c.name).sort()).toEqual(['Button', 'Input']);
    });
    
    it('should paginate results', () => {
      const components = componentCache.values();
      const page1 = components.slice(0, 2);
      const page2 = components.slice(2, 4);
      
      expect(page1).toHaveLength(2);
      expect(page2).toHaveLength(1);
    });
  });
  
  describe('getComponent', () => {
    it('should get component by name', () => {
      const component = componentCache.getByName('Button');
      
      expect(component).toBeDefined();
      expect(component?.name).toBe('Button');
      expect(component?.category).toBe('Forms');
    });
    
    it('should return undefined for non-existent component', () => {
      const component = componentCache.getByName('NonExistent');
      
      expect(component).toBeUndefined();
    });
  });
  
  describe('searchComponents', () => {
    it('should search by component name', () => {
      const results = searchIndex.search('button');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].component.name).toBe('Button');
      expect(results[0].matchedTerms).toContain('button');
    });
    
    it('should search by description', () => {
      const results = searchIndex.search('primary');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].component.name).toBe('Button');
    });
    
    it('should search by tags', () => {
      const results = searchIndex.search('layout');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].component.name).toBe('Card');
    });
    
    it('should return empty for no matches', () => {
      const results = searchIndex.search('nonexistent');
      
      expect(results).toHaveLength(0);
    });
    
    it('should score results by relevance', () => {
      const results = searchIndex.search('form');
      
      expect(results.length).toBeGreaterThan(0);
      
      // Verificar que scores são válidos
      results.forEach(r => {
        expect(r.score).toBeGreaterThan(0);
        expect(r.score).toBeLessThanOrEqual(1);
      });
      
      // Resultados devem estar ordenados por score
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
      }
    });
  });
  
  describe('getStats', () => {
    it('should compute correct stats', () => {
      const components = componentCache.values();
      const cacheStats = componentCache.getStats();
      
      expect(components).toHaveLength(3);
      expect(cacheStats.itemsCount).toBe(3);
      
      // Contar por categoria
      const byCategory: Record<string, number> = {};
      components.forEach(c => {
        byCategory[c.category] = (byCategory[c.category] || 0) + 1;
      });
      
      expect(byCategory['Forms']).toBe(2);
      expect(byCategory['Layout']).toBe(1);
      
      // Contar por prioridade
      const p0Count = components.filter(c => c.priority === 'P0').length;
      const p1Count = components.filter(c => c.priority === 'P1').length;
      const p2Count = components.filter(c => c.priority === 'P2').length;
      
      expect(p0Count).toBe(1);
      expect(p1Count).toBe(1);
      expect(p2Count).toBe(1);
    });
    
    it('should track top tags', () => {
      const components = componentCache.values();
      const tagCounts: Record<string, number> = {};
      
      components.forEach(c => {
        c.metadata.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });
      
      expect(tagCounts['form']).toBe(2);
      expect(tagCounts['layout']).toBe(1);
      expect(tagCounts['interactive']).toBe(1);
    });
  });
  
  describe('getComponentsByCategory', () => {
    it('should get components by category', () => {
      const components = componentCache.getByCategory('Forms');
      
      expect(components).toHaveLength(2);
      expect(components.every(c => c.category === 'Forms')).toBe(true);
    });
    
    it('should return empty array for non-existent category', () => {
      const components = componentCache.getByCategory('NonExistent');
      
      expect(components).toHaveLength(0);
    });
  });
  
  describe('Cache Stats', () => {
    it('should track cache hits and misses', () => {
      // Miss
      componentCache.get('NonExistent');
      
      // Hit
      componentCache.get('Button');
      componentCache.get('Button');
      
      const stats = componentCache.getStats();
      
      expect(stats.totalHits).toBe(2);
      expect(stats.totalMisses).toBe(1);
      expect(stats.hitRate).toBeCloseTo(2 / 3);
    });
    
    it('should track top items', () => {
      // Acessar Button 3x
      componentCache.get('Button');
      componentCache.get('Button');
      componentCache.get('Button');
      
      // Acessar Input 1x
      componentCache.get('Input');
      
      const stats = componentCache.getStats();
      
      expect(stats.topItems[0].key).toBe('Button');
      expect(stats.topItems[0].hits).toBe(3);
    });
  });
  
  describe('Search Index Stats', () => {
    it('should provide index statistics', () => {
      const stats = searchIndex.getStats();
      
      expect(stats.totalDocuments).toBe(3);
      expect(stats.totalTokens).toBeGreaterThan(0);
      expect(stats.averageTokensPerDocument).toBeGreaterThan(0);
    });
  });
});
