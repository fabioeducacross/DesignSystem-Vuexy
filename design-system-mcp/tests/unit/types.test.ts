/**
 * Type Definitions Tests
 * 
 * Validação básica dos tipos TypeScript criados
 */

import { describe, it, expect } from 'vitest';
import { 
  Component, 
  ComponentPriority,
  ComponentCategory,
  isComponent,
  computeComponentStats 
} from '../src/types/component.js';
import { StoryMetadata, isStoryMetadata } from '../src/types/story.js';
import { VueComponent, isVueComponent, detectVModel } from '../src/types/vue.js';
import { MCP_TOOLS, MCPErrorCode, createMCPError } from '../src/types/mcp.js';

describe('Component Types', () => {
  it('deveria criar um Component válido', () => {
    const component: Component = {
      name: 'TestButton',
      category: 'Actions',
      priority: 'P1',
      paths: {
        story: 'src/stories/TestButton.stories.js',
        component: 'src/components/TestButton.vue'
      },
      metadata: {
        title: 'Components/Actions/TestButton',
        tags: ['autodocs'],
        description: 'A test button'
      },
      stories: [],
      vue: {
        props: [],
        events: [],
        slots: []
      },
      stats: {
        storiesCount: 0,
        propsCount: 0,
        eventsCount: 0,
        slotsCount: 0
      },
      parsedAt: new Date()
    };
    
    expect(isComponent(component)).toBe(true);
    expect(component.name).toBe('TestButton');
    expect(component.category).toBe('Actions');
  });
  
  it('deveria computar stats corretamente', () => {
    const component: Partial<Component> = {
      stories: [
        { name: 'Default' },
        { name: 'Variant' }
      ],
      vue: {
        props: [
          { name: 'label', type: 'string', required: true }
        ],
        events: [
          { name: 'click' }
        ],
        slots: []
      }
    };
    
    const stats = computeComponentStats(component);
    
    expect(stats.storiesCount).toBe(2);
    expect(stats.propsCount).toBe(1);
    expect(stats.eventsCount).toBe(1);
    expect(stats.slotsCount).toBe(0);
  });
});

describe('Story Types', () => {
  it('deveria validar StoryMetadata', () => {
    const story: StoryMetadata = {
      name: 'Default',
      args: { label: 'Click me' }
    };
    
    expect(isStoryMetadata(story)).toBe(true);
    expect(story.name).toBe('Default');
  });
});

describe('Vue Types', () => {
  it('deveria validar VueComponent', () => {
    const vue: VueComponent = {
      props: [
        { name: 'modelValue', type: 'string', required: false, isVModel: true }
      ],
      events: [
        { name: 'update:modelValue', isVModelUpdate: true }
      ],
      slots: []
    };
    
    expect(isVueComponent(vue)).toBe(true);
  });
  
  it('deveria detectar v-model', () => {
    const vue: VueComponent = {
      props: [
        { name: 'modelValue', type: 'string', required: false, isVModel: true }
      ],
      events: [
        { name: 'update:modelValue', isVModelUpdate: true }
      ],
      slots: []
    };
    
    const vmodel = detectVModel(vue);
    
    expect(vmodel).not.toBeNull();
    expect(vmodel?.propName).toBe('modelValue');
    expect(vmodel?.eventName).toBe('update:modelValue');
  });
});

describe('MCP Types', () => {
  it('deveria ter 5 tools definidas', () => {
    expect(MCP_TOOLS).toHaveLength(5);
    expect(MCP_TOOLS[0].name).toBe('listComponents');
    expect(MCP_TOOLS[1].name).toBe('getComponent');
    expect(MCP_TOOLS[2].name).toBe('searchComponents');
    expect(MCP_TOOLS[3].name).toBe('getStats');
    expect(MCP_TOOLS[4].name).toBe('getComponentsByCategory');
  });
  
  it('deveria criar erro MCP', () => {
    const error = createMCPError(
      MCPErrorCode.COMPONENT_NOT_FOUND,
      'Component not found',
      { name: 'TestButton' }
    );
    
    expect(error.code).toBe(MCPErrorCode.COMPONENT_NOT_FOUND);
    expect(error.message).toBe('Component not found');
    expect(error.data).toEqual({ name: 'TestButton' });
  });
});
