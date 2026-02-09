/**
 * Story Metadata Schema
 * 
 * Tipos para representar stories do Storybook extraídas de arquivos .stories.js
 */

/**
 * Tipo de controle do Storybook
 */
export type ControlType = 
  | 'text' 
  | 'number' 
  | 'boolean' 
  | 'select' 
  | 'radio' 
  | 'color' 
  | 'date' 
  | 'object' 
  | 'array'
  | 'file';

/**
 * Definição de argType do Storybook
 */
export interface ArgType {
  /** Tipo de controle */
  control?: ControlType | { type: ControlType; [key: string]: unknown };
  
  /** Opções para select/radio */
  options?: string[] | number[];
  
  /** Descrição do argumento */
  description?: string;
  
  /** Valor padrão */
  defaultValue?: unknown;
  
  /** Tabela de informações adicionais */
  table?: {
    type?: { summary: string };
    defaultValue?: { summary: string };
    category?: string;
  };
}

/**
 * Mapeamento de argTypes do export default
 */
export interface ArgTypes {
  [argName: string]: ArgType;
}

/**
 * Parâmetros de uma story
 */
export interface StoryParameters {
  /** Configurações de viewport */
  viewport?: {
    defaultViewport?: string;
    viewports?: Record<string, unknown>;
  };
  
  /** Configurações de backgrounds */
  backgrounds?: {
    default?: string;
    values?: Array<{ name: string; value: string }>;
  };
  
  /** Layout da story */
  layout?: 'centered' | 'fullscreen' | 'padded';
  
  /** Documentação inline */
  docs?: {
    description?: {
      story?: string;
    };
  };
  
  /** Parâmetros customizados */
  [key: string]: unknown;
}

/**
 * Decorators aplicados a uma story
 */
export type StoryDecorator = (story: () => string, context: unknown) => string;

/**
 * Play function para interações automáticas
 */
export type PlayFunction = (context: { canvasElement: HTMLElement }) => Promise<void>;

/**
 * Metadados de uma story individual
 */
export interface StoryMetadata {
  /** Nome da story (ex: "Default", "WithLabel", "Variants") */
  name: string;
  
  /** Argumentos padrão da story */
  args?: Record<string, unknown>;
  
  /** Parâmetros específicos da story */
  parameters?: StoryParameters;
  
  /** Função render customizada (como string) */
  render?: string;
  
  /** Decorators aplicados */
  decorators?: StoryDecorator[];
  
  /** Play function (para testes de interação) */
  play?: PlayFunction;
  
  /** Tags específicas da story */
  tags?: string[];
}

/**
 * Export default de um arquivo .stories.js
 */
export interface StoryFileDefault {
  /** Title hierárquico do Storybook */
  title: string;
  
  /** Tags globais (ex: ['autodocs']) */
  tags?: string[];
  
  /** ArgTypes definidos no export default */
  argTypes?: ArgTypes;
  
  /** Argumentos globais aplicados a todas as stories */
  args?: Record<string, unknown>;
  
  /** Parâmetros globais */
  parameters?: StoryParameters;
  
  /** Decorators globais */
  decorators?: StoryDecorator[];
  
  /** Component (referência ao componente Vue) */
  component?: unknown;
  
  /** Subcomponents relacionados */
  subcomponents?: Record<string, unknown>;
}

/**
 * Representação completa de um arquivo .stories.js parseado
 */
export interface ParsedStoryFile {
  /** Conteúdo do export default */
  default: StoryFileDefault;
  
  /** Stories exportadas (named exports) */
  stories: StoryMetadata[];
  
  /** Caminho do arquivo */
  filepath: string;
  
  /** Timestamp do parse */
  parsedAt: Date;
  
  /** Erros encontrados durante o parse */
  errors?: Array<{
    message: string;
    line?: number;
    column?: number;
  }>;
}

/**
 * Configuração para extração de stories
 */
export interface StoryParserOptions {
  /** Incluir função render como string? */
  includeRenderFunction?: boolean;
  
  /** Extrair decorators? */
  extractDecorators?: boolean;
  
  /** Extrair play functions? */
  extractPlayFunctions?: boolean;
  
  /** Limitar profundidade de objetos aninhados */
  maxDepth?: number;
}

/**
 * Estatísticas de um arquivo de stories
 */
export interface StoryFileStats {
  /** Número total de stories */
  totalStories: number;
  
  /** Stories com play functions (interativas) */
  interactiveStories: number;
  
  /** ArgTypes únicos */
  uniqueArgTypes: number;
  
  /** Tags únicas */
  uniqueTags: string[];
  
  /** Tem documentação inline? */
  hasDocumentation: boolean;
}

/**
 * Helper para extrair estatísticas de um ParsedStoryFile
 */
export function computeStoryFileStats(parsed: ParsedStoryFile): StoryFileStats {
  const allTags = new Set<string>();
  
  if (parsed.default.tags) {
    parsed.default.tags.forEach(t => allTags.add(t));
  }
  
  parsed.stories.forEach(story => {
    if (story.tags) {
      story.tags.forEach(t => allTags.add(t));
    }
  });
  
  return {
    totalStories: parsed.stories.length,
    interactiveStories: parsed.stories.filter(s => s.play !== undefined).length,
    uniqueArgTypes: Object.keys(parsed.default.argTypes || {}).length,
    uniqueTags: Array.from(allTags),
    hasDocumentation: Boolean(
      parsed.default.parameters?.docs?.description || 
      parsed.stories.some(s => s.parameters?.docs?.description)
    )
  };
}

/**
 * Type guard para StoryMetadata
 */
export function isStoryMetadata(obj: unknown): obj is StoryMetadata {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const s = obj as StoryMetadata;
  return typeof s.name === 'string';
}
