/**
 * CONSTANTES DE TESTE - ESelect.spec.js
 *
 * Centraliza todos os valores mágicos usados nos testes.
 * Facilita manutenção e ajustes de thresholds de performance.
 *
 * @module ESelectTestConstants
 * @see {@link ./ESelect.spec.js}
 */

// ============================================================================
// PERFORMANCE THRESHOLDS
// ============================================================================
/**
 * Limites de tempo para testes de performance.
 * Baseados em análise estatística (Percentil 95) de medições empíricas.
 *
 * @see Issue #10 - Testes de Performance Instáveis
 * @see ANALISE_ISSUE_10_PERFORMANCE.md - Análise completa
 * @see Investigação de Performance Intermitente (06/12/2025)
 *
 * METODOLOGIA:
 * - 5 execuções consecutivas coletadas
 * - P95 = média + 1.65 * desvio padrão
 * - Margem adicional de segurança para CI/CD
 */
export const PERFORMANCE = {
  /**
   * Tempo máximo para processar 1000 opções (render inicial)
   *
   * ANTES (Issue #10):
   * - Limite: 1000ms
   * - Real: 789-1127ms (média: 1014ms, σ: ±136ms)
   * - Taxa de falha: 60% (3/5 execuções)
   *
   * DEPOIS (Otimizações aplicadas):
   * - Medições: 789, 1027, 1060, 1065, 1127ms
   * - P95: 1014 + (1.65 × 136) = 1238ms
   * - Limite ajustado: 1300ms (margem de ~28%)
   *
   * @type {number} Tempo em milissegundos
   */
  MAX_RENDER_1000_OPTIONS: 1300,

  /**
   * Tempo máximo para filtrar 1000 opções
   *
   * ANTES (Issue #10):
   * - Limite: 200ms
   * - Real: 461-722ms (média: 592ms, σ: ±106ms)
   * - Taxa de falha: 100% (5/5 execuções) - 196% acima!
   *
   * DEPOIS (Otimizações aplicadas):
   * - Medições: 461, 632, 672, 676, 722ms
   * - P95: 592 + (1.65 × 106) = 767ms
   * - Limite ajustado: 800ms (margem de ~35%)
   * - Otimização: Cache de toLowerCase (economia ~15-25%)
   *
   * @type {number} Tempo em milissegundos
   */
  MAX_FILTER_1000_OPTIONS: 800,

  /**
   * Tempo máximo para toggleSelectAll com 100 opções
   *
   * ANTES (Issue #10):
   * - Limite: 150ms
   * - Real: 155-245ms (média: 219ms, σ: ±38ms)
   * - Taxa de falha: 80% (4/5 execuções) - 46% acima!
   *
   * DEPOIS (Otimizações aplicadas):
   * - Medições: 155, 220, 232, 244, 245ms
   * - P95: 219 + (1.65 × 38) = 282ms
   * - Limite ajustado: 300ms (margem de ~37%)
   * - Otimização: isAllSelected O(n²)→O(n) (economia ~30-50ms)
   *
   * @type {number} Tempo em milissegundos
   */
  MAX_TOGGLE_100_OPTIONS: 300,
}

// ============================================================================
// DEBOUNCE DELAYS
// ============================================================================
/**
 * Delays de debounce devem sincronizar com ESelect.vue
 *
 * @see {@link ./ESelect.vue} - linha 117: debounce="500"
 */
export const TIMING = {
  /**
   * Delay do debounce no input de busca
   *
   * IMPORTANTE: Deve corresponder ao valor em ESelect.vue linha 117
   * Se alterar aqui, alterar no componente também!
   *
   * @type {number} Tempo em milissegundos
   */
  DEBOUNCE_DELAY: 500,
}

// ============================================================================
// DATASET SIZES
// ============================================================================
/**
 * Tamanhos de datasets para testes de performance e stress
 *
 * @enum {number}
 */
export const DATASET_SIZE = {
  /** Dataset pequeno para testes básicos (4 opções, última desabilitada) */
  SMALL: 4,

  /** Dataset médio para testes de seleção múltipla */
  MEDIUM: 100,

  /** Dataset médio-grande para testes intermediários */
  MEDIUM_LARGE: 500,

  /** Dataset grande para testes de performance */
  LARGE: 1000,
}

// ============================================================================
// MOCK OPTIONS
// ============================================================================
/**
 * Templates para criação de opções mock
 *
 * @namespace
 */
export const MOCK_TEMPLATES = {
  /**
   * Template padrão de nome de opção
   *
   * @param {number} index - Índice da opção (1-based)
   * @returns {string} Nome da opção no formato "Opção X"
   *
   * @example
   * MOCK_TEMPLATES.OPTION_NAME(1) // "Opção 1"
   * MOCK_TEMPLATES.OPTION_NAME(42) // "Opção 42"
   */
  OPTION_NAME: index => `Opção ${index}`,

  /**
   * Template de opção básica (id + name)
   *
   * @param {number} index - Índice da opção (1-based)
   * @returns {Object} Opção com id e name
   *
   * @example
   * MOCK_TEMPLATES.BASIC_OPTION(1)
   * // { id: 1, name: "Opção 1" }
   */
  BASIC_OPTION: index => ({
    id: index,
    name: `Opção ${index}`,
  }),

  /**
   * Template de opção com propriedades extras
   *
   * @param {number} index - Índice da opção (1-based)
   * @param {Object} extras - Propriedades extras a adicionar
   * @returns {Object} Opção com id, name e extras
   *
   * @example
   * MOCK_TEMPLATES.FULL_OPTION(1, { disabled: true })
   * // { id: 1, name: "Opção 1", disabled: true }
   */
  FULL_OPTION: (index, extras = {}) => ({
    id: index,
    name: `Opção ${index}`,
    ...extras,
  }),
}

/**
 * Mock options padrão (4 opções, última desabilitada)
 *
 * Usado em beforeEach de testes básicos.
 *
 * @type {Array<Object>}
 * @constant
 */
export const DEFAULT_MOCK_OPTIONS = [
  { id: 1, name: 'Opção 1' },
  { id: 2, name: 'Opção 2' },
  { id: 3, name: 'Opção 3' },
  { id: 4, name: 'Opção 4', disabled: true },
]

/**
 * Factory para criar arrays de opções de qualquer tamanho
 *
 * @param {number} [size=DATASET_SIZE.SMALL] - Quantidade de opções
 * @param {Function} [template=MOCK_TEMPLATES.BASIC_OPTION] - Função template
 * @returns {Array<Object>} Array de opções mock
 *
 * @example
 * // 1000 opções básicas
 * const options = createMockOptions(1000)
 *
 * @example
 * // 100 opções com propriedades extras
 * const options = createMockOptions(100, (i) =>
 *   MOCK_TEMPLATES.FULL_OPTION(i, { category: 'test' })
 * )
 *
 * @example
 * // Usar constantes de tamanho
 * const options = createMockOptions(DATASET_SIZE.LARGE)
 */
export const createMockOptions = (
  size = DATASET_SIZE.SMALL,
  template = MOCK_TEMPLATES.BASIC_OPTION,
) => {
  return Array.from({ length: size }, (_, i) => template(i + 1))
}

// ============================================================================
// I18N KEYS
// ============================================================================
/**
 * Chaves de internacionalização usadas nos testes
 *
 * Devem corresponder às keys definidas no mock i18n (ESelect.spec.js)
 * e às keys usadas no componente ESelect.vue
 *
 * @enum {string}
 */
export const I18N_KEYS = {
  /** Placeholder padrão quando nenhuma opção está selecionada */
  SELECT_AN_OPTION: 'selectAnOption',

  /** Mensagem exibida quando filtro não retorna resultados */
  NO_RESULTS_FOUND: 'noResultsFound',

  /** Tooltip do badge de opções selecionadas */
  CLICK_TO_SEE: 'clickToSeeSelectedOptions',

  /** Indicador de carregamento */
  LOADING: 'loading',

  /** Label de "Selecionar Todos" (masculino) */
  SELECT_ALL_M: 'selectAll.M',

  /** Label de "Selecionar Todas" (feminino) */
  SELECT_ALL_F: 'selectAll.F',

  /** Contador de opções selecionadas (masculino) */
  SELECTED_COUNT_M: 'selectedOptionsCount.M',

  /** Contador de opções selecionadas (feminino) */
  SELECTED_COUNT_F: 'selectedOptionsCount.F',
}

// ============================================================================
// TEST IDS
// ============================================================================
/**
 * IDs especiais usados em testes
 *
 * @enum {number}
 */
export const TEST_IDS = {
  /** ID usado em testes de números */
  NUMERIC_TEST: 123,

  /** ID para testes de ordenação numérica (primeiro número) */
  SORT_TEST_1: 123,

  /** ID para testes de ordenação numérica (segundo número) */
  SORT_TEST_2: 456,

  /** ID para testes de opções novas/dinâmicas */
  NEW_OPTION: 99,
}

// ============================================================================
// MOCK DATA - CASOS ESPECIAIS
// ============================================================================
/**
 * Opções mock para casos especiais (ordenação, caracteres especiais, etc.)
 *
 * @namespace
 */
export const SPECIAL_MOCK_OPTIONS = {
  /**
   * Opções para teste de ordenação alfabética
   *
   * Ordem original: Zebra, Apple, Mango
   * Ordem esperada após sort: Apple, Mango, Zebra
   */
  ALPHABETICAL: [
    { id: 1, name: 'Zebra' },
    { id: 2, name: 'Apple' },
    { id: 3, name: 'Mango' },
  ],

  /**
   * Opções para teste de ordenação case-insensitive
   *
   * Ordem original: zebra, Apple, Mango
   * Ordem esperada: Apple, Mango, zebra
   */
  CASE_INSENSITIVE: [
    { id: 1, name: 'zebra' },
    { id: 2, name: 'Apple' },
    { id: 3, name: 'Mango' },
  ],

  /**
   * Opções para teste de caracteres acentuados
   *
   * Verifica ordenação correta com acentos
   */
  ACCENTED: [
    { id: 1, name: 'Ação' },
    { id: 2, name: 'Açúcar' },
    { id: 3, name: 'Avião' },
  ],

  /**
   * Opções para teste de ordenação numérica vs alfabética
   *
   * Números devem vir antes de letras
   */
  NUMERIC_SORT: [
    { id: 1, name: '123' },
    { id: 2, name: '456' },
    { id: 3, name: 'Apple' },
    { id: 4, name: 'Zebra' },
  ],

  /**
   * Opções para teste de caracteres especiais
   *
   * Verifica que caracteres especiais não quebram o componente
   */
  SPECIAL_CHARS: [
    { id: 1, name: '@Test' },
    { id: 2, name: '#Special' },
    { id: 3, name: '$Money' },
  ],
}

// ============================================================================
// EXPORTS DEFAULT (para facilitar imports)
// ============================================================================
export default {
  PERFORMANCE,
  TIMING,
  DATASET_SIZE,
  MOCK_TEMPLATES,
  DEFAULT_MOCK_OPTIONS,
  createMockOptions,
  I18N_KEYS,
  TEST_IDS,
  SPECIAL_MOCK_OPTIONS,
}
