/**
 * Story Parser Tests
 */

import { describe, it, expect } from 'vitest';
import { parseStoryCode } from '../src/parsers/story-parser.js';

describe('Story Parser', () => {
  it('deveria extrair export default básico', () => {
    const code = `
export default {
  title: 'Components/Button',
  tags: ['autodocs', 'responsive']
};

export const Default = {
  args: { label: 'Click me' }
};
    `.trim();
    
    const result = parseStoryCode(code, 'test.stories.js');
    
    expect(result.default.title).toBe('Components/Button');
    expect(result.default.tags).toEqual(['autodocs', 'responsive']);
    expect(result.stories).toHaveLength(1);
    expect(result.stories[0].name).toBe('Default');
    expect(result.stories[0].args).toEqual({ label: 'Click me' });
  });
  
  it('deveria extrair argTypes', () => {
    const code = `
export default {
  title: 'Components/Button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary']
    },
    size: {
      control: { type: 'number' }
    }
  }
};
    `.trim();
    
    const result = parseStoryCode(code, 'test.stories.js');
    
    expect(result.default.argTypes).toBeDefined();
    expect(result.default.argTypes?.variant).toBeDefined();
    expect(result.default.argTypes?.size).toBeDefined();
  });
  
  it('deveria extrair múltiplas stories', () => {
    const code = `
export default {
  title: 'Components/Button'
};

export const Default = {
  args: { label: 'Default' }
};

export const Primary = {
  args: { label: 'Primary', variant: 'primary' }
};

export const Large = {
  args: { size: 'lg' }
};
    `.trim();
    
    const result = parseStoryCode(code, 'test.stories.js');
    
    expect(result.stories).toHaveLength(3);
    expect(result.stories.map(s => s.name)).toEqual(['Default', 'Primary', 'Large']);
  });
  
  it('deveria lidar com args aninhados', () => {
    const code = `
export default {
  title: 'Test'
};

export const Nested = {
  args: {
    user: {
      name: 'John',
      age: 30,
      active: true
    },
    items: ['a', 'b', 'c']
  }
};
    `.trim();
    
    const result = parseStoryCode(code, 'test.stories.js');
    
    expect(result.stories[0].args?.user).toEqual({
      name: 'John',
      age: 30,
      active: true
    });
    expect(result.stories[0].args?.items).toEqual(['a', 'b', 'c']);
  });
  
  it('deveria extrair parameters', () => {
    const code = `
export default {
  title: 'Test',
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark'
    }
  }
};
    `.trim();
    
    const result = parseStoryCode(code, 'test.stories.js');
    
    expect(result.default.parameters).toBeDefined();
    expect(result.default.parameters?.layout).toBe('centered');
  });
  
  it('deveria retornar erro se não houver export default', () => {
    const code = `
export const Default = {
  args: { label: 'Test' }
};
    `.trim();
    
    const result = parseStoryCode(code, 'test.stories.js');
    
    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveLength(1);
    expect(result.errors![0].message).toContain('No export default');
  });
  
  it('deveria ignorar valores complexos', () => {
    const code = `
export default {
  title: 'Test'
};

export const WithFunction = {
  args: {
    label: 'Test',
    onClick: () => console.log('clicked'),
    complex: Symbol('test')
  }
};
    `.trim();
    
    const result = parseStoryCode(code, 'test.stories.js');
    
    expect(result.stories[0].args?.label).toBe('Test');
    expect(result.stories[0].args?.onClick).toBe('<complex value>');
    expect(result.stories[0].args?.complex).toBe('<complex value>');
  });
  
  it('deveria extrair tags de stories individuais', () => {
    const code = `
export default {
  title: 'Test'
};

export const Interactive = {
  tags: ['play-function', 'test'],
  args: { label: 'Test' }
};
    `.trim();
    
    const result = parseStoryCode(code, 'test.stories.js');
    
    expect(result.stories[0].tags).toEqual(['play-function', 'test']);
  });
});
