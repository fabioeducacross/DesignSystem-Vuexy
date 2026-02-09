/**
 * Component Metadata Schema
 * 
 * Schema completo para representar um componente do Design System,
 * incluindo metadados extraídos de .stories.js e .vue SFC
 */

import { StoryMetadata } from './story.js';
import { VueComponent } from './vue.js';

/**
 * Prioridade do componente no Design System
 */
export type ComponentPriority = 'P0' | 'P1' | 'P2';

/**
 * Categoria do componente seguindo estrutura Educacross
 */
export type ComponentCategory =
  | 'Actions'
  | 'Cards'
  | 'DataDisplay'
  | 'Forms'
  | 'Layout'
  | 'Modals'
  | 'Navigation'
  | 'Feedback'
  | 'Content'
  | 'Typography'
  | 'Media'
  | 'Tables'
  | 'Charts'
  | 'Other';

/**
 * Caminhos para os arquivos do componente
 */
export interface ComponentPaths {
  /** Caminho relativo para o arquivo .stories.js */
  story: string;
  
  /** Caminho relativo para o arquivo .vue (source component) */
  component: string;
  
  /** URL do Storybook para o componente (se disponível) */
  storybookUrl?: string;
}

/**
 * Metadados extraídos do arquivo .stories.js
 */
export interface ComponentMetadata {
  /** Title do Storybook (ex: "Educacross Components V2/DataDisplay/ProgressBar") */
  title: string;
  
  /** Descrição do componente (extraída de JSDoc ou args) */
  description?: string;
  
  /** Tags do Storybook (autodocs, responsive, etc) */
  tags: string[];
  
  /** Data da última modificação do arquivo .stories.js */
  lastModified?: Date;
}

/**
 * Estatísticas do componente
 */
export interface ComponentStats {
  /** Número total de stories */
  storiesCount: number;
  
  /** Número de props */
  propsCount: number;
  
  /** Número de events */
  eventsCount: number;
  
  /** Número de slots */
  slotsCount: number;
  
  /** Tamanho do arquivo .vue em bytes */
  fileSize?: number;
}

/**
 * Representação completa de um componente do Design System
 */
export interface Component {
  // === Identificação ===
  
  /** Nome do componente (ex: "ProgressBar") */
  name: string;
  
  /** Categoria do componente */
  category: ComponentCategory;
  
  /** Prioridade no Design System */
  priority: ComponentPriority;
  
  // === Localização ===
  
  /** Caminhos para arquivos relacionados */
  paths: ComponentPaths;
  
  // === Metadados ===
  
  /** Metadados extraídos do .stories.js */
  metadata: ComponentMetadata;
  
  /** Stories disponíveis no Storybook */
  stories: StoryMetadata[];
  
  /** Metadados extraídos do .vue SFC */
  vue: VueComponent;
  
  /** Estatísticas computadas */
  stats: ComponentStats;
  
  // === Cache ===
  
  /** Timestamp do último parse (para invalidação de cache) */
  parsedAt: Date;
  
  /** Hash do conteúdo dos arquivos (para detectar mudanças) */
  contentHash?: string;
}

/**
 * Resultado de busca de componentes
 */
export interface ComponentSearchResult {
  /** Componente encontrado */
  component: Component;
  
  /** Score de relevância (0-1) */
  score: number;
  
  /** Campos que geraram o match */
  matchedFields: string[];
}

/**
 * Filtros para listagem de componentes
 */
export interface ComponentFilters {
  /** Filtrar por categoria */
  category?: ComponentCategory;
  
  /** Filtrar por prioridade */
  priority?: ComponentPriority;
  
  /** Filtrar por tags (AND logic) */
  tags?: string[];
  
  /** Buscar por texto (busca em name, description, tags) */
  query?: string;
  
  /** Apenas componentes com props obrigatórios */
  hasRequiredProps?: boolean;
  
  /** Apenas componentes com eventos */
  hasEvents?: boolean;
  
  /** Apenas componentes com slots */
  hasSlots?: boolean;
}

/**
 * Opções de paginação
 */
export interface PaginationOptions {
  /** Número da página (1-based) */
  page?: number;
  
  /** Itens por página */
  limit?: number;
  
  /** Campo para ordenação */
  sortBy?: keyof Component | 'storiesCount' | 'propsCount';
  
  /** Ordem de classificação */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Resultado paginado de componentes
 */
export interface ComponentListResult {
  /** Componentes da página atual */
  components: Component[];
  
  /** Número total de componentes (sem paginação) */
  total: number;
  
  /** Página atual */
  page: number;
  
  /** Total de páginas */
  totalPages: number;
  
  /** Tem próxima página? */
  hasNext: boolean;
  
  /** Tem página anterior? */
  hasPrevious: boolean;
}

/**
 * Type guard para verificar se um objeto é um Component válido
 */
export function isComponent(obj: unknown): obj is Component {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const c = obj as Component;
  return (
    typeof c.name === 'string' &&
    typeof c.category === 'string' &&
    (c.priority === 'P0' || c.priority === 'P1' || c.priority === 'P2') &&
    typeof c.paths === 'object' &&
    typeof c.metadata === 'object' &&
    Array.isArray(c.stories) &&
    typeof c.vue === 'object'
  );
}

/**
 * Helper para criar ComponentStats a partir de um Component
 */
export function computeComponentStats(component: Partial<Component>): ComponentStats {
  return {
    storiesCount: component.stories?.length ?? 0,
    propsCount: component.vue?.props?.length ?? 0,
    eventsCount: component.vue?.events?.length ?? 0,
    slotsCount: component.vue?.slots?.length ?? 0,
    fileSize: undefined
  };
}
