/**
 * Vue SFC Metadata Schema
 * 
 * Tipos para representar metadados extraídos de componentes Vue Single File Components
 */

/**
 * Tipos primitivos do Vue
 */
export type VuePrimitiveType = 
  | 'String' 
  | 'Number' 
  | 'Boolean' 
  | 'Array' 
  | 'Object' 
  | 'Date' 
  | 'Function' 
  | 'Symbol';

/**
 * Validador de prop (runtime)
 */
export type VuePropValidator = (value: unknown) => boolean;

/**
 * Definição de uma prop do Vue
 */
export interface VueProp {
  /** Nome da prop */
  name: string;
  
  /** Tipo da prop (TypeScript ou runtime) */
  type: string;
  
  /** A prop é obrigatória? */
  required: boolean;
  
  /** Valor padrão */
  default?: unknown;
  
  /** Descrição extraída de JSDoc */
  description?: string;
  
  /** Validador customizado (apenas se definido) */
  validator?: string;
  
  /** É uma prop de v-model? (ex: "modelValue") */
  isVModel?: boolean;
}

/**
 * Payload de um evento Vue
 */
export interface VueEventPayload {
  /** Nome do parâmetro */
  name: string;
  
  /** Tipo do parâmetro */
  type: string;
}

/**
 * Definição de um evento Vue
 */
export interface VueEvent {
  /** Nome do evento */
  name: string;
  
  /** Payload do evento (array de parâmetros) */
  payload?: VueEventPayload[];
  
  /** Descrição extraída de JSDoc */
  description?: string;
  
  /** É um evento de v-model? (ex: "update:modelValue") */
  isVModelUpdate?: boolean;
}

/**
 * Props de um scoped slot
 */
export interface VueSlotProps {
  /** Nome da prop do slot */
  name: string;
  
  /** Tipo da prop */
  type: string;
}

/**
 * Definição de um slot Vue
 */
export interface VueSlot {
  /** Nome do slot (default, header, footer, etc) */
  name: string;
  
  /** Props do scoped slot */
  props?: VueSlotProps[];
  
  /** Descrição extraída de JSDoc ou comentário HTML */
  description?: string;
  
  /** É um slot condicional? (v-if) */
  isConditional?: boolean;
}

/**
 * Definição de um composable usado pelo componente
 */
export interface VueComposable {
  /** Nome do composable */
  name: string;
  
  /** Pacote de origem (ex: "vue", "@vueuse/core") */
  source: string;
}

/**
 * Imports do componente
 */
export interface VueImports {
  /** Imports de outros componentes */
  components?: string[];
  
  /** Imports de composables */
  composables?: VueComposable[];
  
  /** Imports de utilities */
  utilities?: string[];
}

/**
 * Script block metadata
 */
export interface VueScriptMetadata {
  /** Setup ou Options API? */
  mode: 'setup' | 'options';
  
  /** Usa TypeScript? */
  isTypeScript: boolean;
  
  /** Imports encontrados */
  imports: VueImports;
  
  /** Linhas de código (sem comentários/espaços) */
  linesOfCode?: number;
}

/**
 * Template block metadata
 */
export interface VueTemplateMetadata {
  /** Número de elementos root */
  rootElements: number;
  
  /** Usa v-if/v-else? */
  hasConditionals: boolean;
  
  /** Usa v-for? */
  hasLoops: boolean;
  
  /** Usa transitions? */
  hasTransitions: boolean;
  
  /** Número de slots usados */
  slotsUsed: number;
}

/**
 * Style block metadata
 */
export interface VueStyleMetadata {
  /** Número de blocos <style> */
  blockCount: number;
  
  /** Usa scoped styles? */
  hasScoped: boolean;
  
  /** Usa CSS modules? */
  hasModules: boolean;
  
  /** Preprocessor (scss, sass, less, stylus) */
  preprocessor?: 'scss' | 'sass' | 'less' | 'stylus';
}

/**
 * Metadados completos de um componente Vue SFC
 */
export interface VueComponent {
  /** Props do componente */
  props: VueProp[];
  
  /** Eventos emitidos */
  events: VueEvent[];
  
  /** Slots disponíveis */
  slots: VueSlot[];
  
  /** Metadados do script */
  script?: VueScriptMetadata;
  
  /** Metadados do template */
  template?: VueTemplateMetadata;
  
  /** Metadados dos styles */
  styles?: VueStyleMetadata;
  
  /** Exposes (se houver defineExpose) */
  exposes?: Array<{
    name: string;
    type: string;
  }>;
}

/**
 * Resultado do parse de um arquivo .vue
 */
export interface ParsedVueFile {
  /** Componente extraído */
  component: VueComponent;
  
  /** Caminho do arquivo */
  filepath: string;
  
  /** Timestamp do parse */
  parsedAt: Date;
  
  /** Warnings (não bloqueiam o parse) - sempre presente, mesmo que vazio */
  warnings: Array<{
    message: string;
    line?: number;
    severity: 'info' | 'warning';
  }>;
  
  /** Erros críticos */
  errors?: Array<{
    message: string;
    line?: number;
    severity: 'error';
  }>;
}

/**
 * Configuração para o parser Vue
 */
export interface VueParserOptions {
  /** Extrair metadados do script? */
  extractScriptMetadata?: boolean;
  
  /** Extrair metadados do template? */
  extractTemplateMetadata?: boolean;
  
  /** Extrair metadados dos styles? */
  extractStyleMetadata?: boolean;
  
  /** Incluir apenas props obrigatórios? */
  requiredPropsOnly?: boolean;
  
  /** Extrair JSDoc descriptions? */
  extractDescriptions?: boolean;
}

/**
 * Helper para computar v-model completo
 */
export interface VModelInfo {
  /** Prop usada (default: "modelValue") */
  propName: string;
  
  /** Evento usado (default: "update:modelValue") */
  eventName: string;
  
  /** Tipo da prop */
  type: string;
  
  /** É required? */
  required: boolean;
}

/**
 * Helper para detectar v-model em um componente
 */
export function detectVModel(component: VueComponent): VModelInfo | null {
  const modelProp = component.props.find(
    p => p.name === 'modelValue' || p.isVModel
  );
  
  const modelEvent = component.events.find(
    e => e.name === 'update:modelValue' || e.isVModelUpdate
  );
  
  if (modelProp && modelEvent) {
    return {
      propName: modelProp.name,
      eventName: modelEvent.name,
      type: modelProp.type,
      required: modelProp.required
    };
  }
  
  return null;
}

/**
 * Type guard para VueComponent
 */
export function isVueComponent(obj: unknown): obj is VueComponent {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const c = obj as VueComponent;
  return (
    Array.isArray(c.props) &&
    Array.isArray(c.events) &&
    Array.isArray(c.slots)
  );
}

/**
 * Helper para contar complexidade de um componente
 */
export interface ComponentComplexity {
  /** Número total de props */
  propsCount: number;
  
  /** Props obrigatórios */
  requiredPropsCount: number;
  
  /** Eventos count */
  eventsCount: number;
  
  /** Slots count */
  slotsCount: number;
  
  /** Score de complexidade (0-100) */
  complexityScore: number;
}

export function computeComplexity(component: VueComponent): ComponentComplexity {
  const propsCount = component.props.length;
  const requiredPropsCount = component.props.filter(p => p.required).length;
  const eventsCount = component.events.length;
  const slotsCount = component.slots.length;
  
  // Score simples: pesos diferentes para cada feature
  const complexityScore = Math.min(
    100,
    (propsCount * 2) + 
    (requiredPropsCount * 3) + 
    (eventsCount * 4) + 
    (slotsCount * 5) +
    (component.script?.linesOfCode || 0) / 10
  );
  
  return {
    propsCount,
    requiredPropsCount,
    eventsCount,
    slotsCount,
    complexityScore: Math.round(complexityScore)
  };
}
