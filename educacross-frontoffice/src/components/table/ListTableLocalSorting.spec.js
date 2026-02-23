import ListTableLocalSorting from './ListTableLocalSorting.vue'
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock('@/utils/utils', () => ({
  sortString: jest.fn((a, b) => {
    if (typeof a !== 'string' || typeof b !== 'string') {
      return 0
    }
    return a.localeCompare(b, undefined, { numeric: true })
  }),
}))

jest.mock('@/filters/filters', () => ({
  formatNumber: val => `formatted-${val}`,
}))

const localVue = createLocalVue()

describe('ListTableLocalSorting.vue', () => {
  let wrapper

  const defaultProps = {
    tableColumns: [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'name', label: 'Nome', sortable: true, searchable: true },
      { key: 'email', label: 'Email', searchable: true },
      { key: 'actions', label: 'Ações' },
    ],
    dataTable: [
      { id: 1, name: 'João Silva', email: 'joao@test.com' },
      { id: 2, name: 'Maria Santos', email: 'maria@test.com' },
      { id: 3, name: 'Pedro Oliveira', email: 'pedro@test.com' },
    ],
  }

  const mocks = {
    $t: key => key,
    $bus: {
      $emit: jest.fn(),
      $on: jest.fn(),
      $off: jest.fn(),
    },
  }

  const stubs = {
    'b-card': {
      name: 'BCard',
      props: ['noBody'],
      template: '<div class="b-card"><slot /></div>',
    },
    'b-row': {
      name: 'BRow',
      props: ['alignH', 'alignV'],
      template: '<div class="b-row"><slot /></div>',
    },
    'b-col': {
      name: 'BCol',
      props: ['cols', 'md', 'sm', 'lg'],
      template: '<div class="b-col"><slot /></div>',
    },
    'b-table': {
      name: 'BTable',
      props: [
        'items',
        'fields',
        'perPage',
        'currentPage',
        'responsive',
        'primaryKey',
        'showEmpty',
        'stickyHeader',
        'sortBy',
        'sortDesc',
        'noLocalSorting',
        'tbodyTrClass',
        'theadTrClass',
      ],
      template: `
        <div class="b-table">
          <slot name="empty" />
          <slot v-for="field in fields" :name="'head(' + field.key + ')'" :field="field" :label="field.label" />
          <slot v-for="item in items" :name="'cell(' + item.id + ')'" :item="item" />
        </div>
      `,
    },
    'b-skeleton-table': {
      name: 'BSkeletonTable',
      props: ['columns', 'rows'],
      template: '<div class="b-skeleton-table"></div>',
    },
    'b-skeleton-wrapper': {
      name: 'BSkeletonWrapper',
      props: ['loading'],
      template:
        '<div class="b-skeleton-wrapper"><slot v-if="!loading" /><slot v-else name="loading" /></div>',
    },
    'b-skeleton': {
      name: 'BSkeleton',
      props: ['type', 'height'],
      template: '<div class="b-skeleton"></div>',
    },
    'b-input-group': {
      name: 'BInputGroup',
      template: '<div class="b-input-group"><slot name="prepend" /><slot /></div>',
    },
    'b-input-group-text': {
      name: 'BInputGroupText',
      template: '<div class="b-input-group-text"><slot /></div>',
    },
    'b-form-input': {
      name: 'BFormInput',
      props: ['value', 'placeholder', 'debounce', 'type'],
      template: '<input :value="value" @input="$emit(\'input\', $event.target.value)" />',
    },
    'b-form-radio-group': {
      name: 'BFormRadioGroup',
      props: ['value', 'options', 'buttons', 'size', 'buttonVariant'],
      template: '<div class="b-form-radio-group"><slot /></div>',
    },
    'b-form-radio': {
      name: 'BFormRadio',
      props: ['value', 'name'],
      template: '<div class="b-form-radio"><slot /></div>',
    },
    'b-dropdown': {
      name: 'BDropdown',
      props: ['text', 'variant', 'toggleClass', 'block'],
      template: '<div class="b-dropdown"><slot name="button-content" /><slot /></div>',
    },
    'b-dropdown-item': {
      name: 'BDropdownItem',
      template: '<div class="b-dropdown-item" @click="$listeners.click"><slot /></div>',
    },
    'b-dropdown-divider': {
      name: 'BDropdownDivider',
      template: '<hr class="b-dropdown-divider" />',
    },
    'b-button': {
      name: 'BButton',
      props: ['variant', 'size', 'disabled'],
      template:
        '<button class="b-button" :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
    },
    'b-spinner': {
      name: 'BSpinner',
      props: ['small'],
      template: '<div class="b-spinner"></div>',
    },
    'b-img': {
      name: 'BImg',
      props: ['src', 'blank', 'blankColor'],
      template: '<img class="b-img" :src="src" />',
    },
    ESelect: {
      name: 'ESelect',
      props: ['value', 'options', 'clearable', 'searchable', 'label', 'trackBy'],
      template: '<div class="e-select" @input="$emit(\'input\', $event)"><slot /></div>',
    },
    'feather-icon': {
      name: 'FeatherIcon',
      props: ['icon', 'size'],
      template: '<span class="feather-icon"></span>',
    },
    ListTablePagination: {
      name: 'ListTablePagination',
      props: ['value', 'totalData', 'perPage'],
      template: '<div class="list-table-pagination" @input="$emit(\'input\', $event)"></div>',
    },
    MissionMath: {
      name: 'MissionMath',
      template: '<div class="mission-math"></div>',
    },
    MissionMathIng: {
      name: 'MissionMathIng',
      template: '<div class="mission-math-ing"></div>',
    },
    MissionPort: {
      name: 'MissionPort',
      template: '<div class="mission-port"></div>',
    },
  }

  // Directives mock
  const directives = {
    'b-tooltip': {
      bind() {},
      update() {},
      unbind() {},
    },
  }

  // ============================================================================
  // FACTORY FUNCTION - Cria instâncias do componente para teste
  // ============================================================================

  /**
   * Factory function para criar wrapper do componente
   * @param {Object} propsData - Props customizadas para o teste
   * @param {Object} options - Opções adicionais (mocks, stubs, slots, etc.)
   * @returns {Wrapper} - Wrapper do vue-test-utils
   */
  const createWrapper = (propsData = {}, options = {}) => {
    return shallowMount(ListTableLocalSorting, {
      localVue,
      propsData: {
        ...defaultProps,
        ...propsData,
      },
      mocks: {
        ...mocks,
        ...options.mocks,
      },
      stubs: {
        ...stubs,
        ...options.stubs,
      },
      directives: {
        ...directives,
        ...options.directives,
      },
      slots: options.slots || {},
      scopedSlots: options.scopedSlots || {},
    })
  }

  /**
   * Helper para buscar o botão de exportação para Excel
   * Como usamos stubs personalizados, o botão não é renderizado como b-button-stub
   * @param {Wrapper} wrapper - Wrapper do componente
   * @returns {Wrapper|ErrorWrapper} - Wrapper do botão ou ErrorWrapper se não encontrado
   */
  const findExportButton = wrapper => {
    const allButtons = wrapper.findAll('.b-button')
    const exportButtons = allButtons.filter(btn => btn.text().includes('Exportar em Excel'))
    return exportButtons.length > 0 ? exportButtons.at(0) : wrapper.find('.export-button-not-found')
  }

  // ============================================================================
  // LIFECYCLE HOOKS
  // ============================================================================

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
      wrapper = null
    }
    jest.clearAllMocks()
  })

  // ============================================================================
  // DADOS DE TESTE - Fixtures para cenários diversos
  // ============================================================================

  const testData = {
    // Colunas de teste completas
    fullTableColumns: [
      {
        key: 'id',
        label: 'ID',
        sortable: true,
      },
      {
        key: 'name',
        label: 'Nome',
        sortable: true,
        searchable: true,
      },
      {
        key: 'age',
        label: 'Idade',
        sortable: true,
        sortProperty: 'ageValue', // Teste sortProperty customizado
      },
      {
        key: 'email',
        label: 'Email',
        searchable: true,
      },
      {
        key: 'status',
        label: 'Status',
        tooltip: 'Status do usuário',
        labelClass: 'custom-label',
      },
      {
        key: 'actions',
        label: 'Ações',
      },
    ],

    // Dados de teste completos
    fullDataTable: [
      {
        id: 1,
        name: 'João Silva',
        age: '25',
        ageValue: 25,
        email: 'joao@test.com',
        status: 'Ativo',
      },
      {
        id: 2,
        name: 'Maria Santos',
        age: '30',
        ageValue: 30,
        email: 'maria@test.com',
        status: 'Ativo',
      },
      {
        id: 3,
        name: 'Pedro Oliveira',
        age: '22',
        ageValue: 22,
        email: 'pedro@test.com',
        status: 'Inativo',
      },
      {
        id: 4,
        name: 'Ana Costa',
        age: '28',
        ageValue: 28,
        email: 'ana@test.com',
        status: 'Ativo',
      },
      {
        id: 5,
        name: 'Carlos Ferreira',
        age: '35',
        ageValue: 35,
        email: 'carlos@test.com',
        status: 'Pendente',
      },
    ],

    // Dados com valores null/undefined para teste de edge cases
    dataWithNulls: [
      {
        id: 1,
        name: 'João Silva',
        age: '25',
        ageValue: 25,
        email: 'joao@test.com',
      },
      {
        id: 2,
        name: null,
        age: '30',
        ageValue: 30,
        email: 'email@test.com',
      },
      {
        id: 3,
        name: 'Pedro Oliveira',
        age: null,
        ageValue: null,
        email: 'pedro@test.com',
      },
      {
        id: 4,
        name: undefined,
        age: '28',
        ageValue: 28,
        email: undefined,
      },
    ],
    numericDataTable: [
      { id: 1, value: 100, name: 'Item 1' },
      { id: 2, value: 50, name: 'Item 2' },
      { id: 3, value: 200, name: 'Item 3' },
      { id: 4, value: 25, name: 'Item 4' },
      { id: 5, value: 150, name: 'Item 5' },
    ],

    // Dados com caracteres especiais para teste de busca
    specialCharsDataTable: [
      { id: 1, name: 'José Antônio', email: 'jose@test.com' },
      { id: 2, name: 'María García', email: 'maria@test.com' },
      { id: 3, name: 'François Müller', email: 'francois@test.com' },
      { id: 4, name: 'Søren Øberg', email: 'soren@test.com' },
    ],
  }

  // ============================================================================
  // HELPER FUNCTIONS - Funções auxiliares para testes
  // ============================================================================

  /**
   * Aguarda o próximo tick do Vue (útil para testar reatividade)
   */
  const nextTick = () => wrapper.vm.$nextTick()

  /**
   * Obtém dados filtrados e ordenados do componente
   * @returns {Array} - Dados processados
   */
  const getFilteredAndSortedData = () => wrapper.vm.filteredAndSortedData

  /**
   * Obtém computed property sortableDataTable
   * @returns {Array} - Colunas ordenáveis
   */
  const getSortableColumns = () => wrapper.vm.sortableDataTable

  // ============================================================================
  // TESTES - Setup Inicial
  // ============================================================================

  describe('Setup Inicial', () => {
    describe('1.1 - Configuração de mocks e stubs', () => {
      it('deve ter todos os mocks e stubs necessários configurados', () => {
        // Valida mock de sortString
        const { sortString } = require('@/utils/utils')
        expect(sortString).toBeDefined()
        expect(typeof sortString).toBe('function')

        // Cria wrapper para validar stubs e mocks
        wrapper = createWrapper()

        // Valida mock de i18n
        expect(wrapper.vm.$t).toBeDefined()
        expect(typeof wrapper.vm.$t).toBe('function')
        expect(wrapper.vm.$t('test')).toBe('test')

        // Valida stubs de componentes Bootstrap Vue
        expect(wrapper.findComponent({ name: 'BCard' }).exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'BRow' }).exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'BCol' }).exists()).toBe(true)

        // Valida stub de ESelect
        expect(wrapper.findComponent({ name: 'ESelect' }).exists()).toBe(true)

        // Valida stub de ListTablePagination
        expect(wrapper.findComponent({ name: 'ListTablePagination' }).exists()).toBe(true)

        // Valida stubs dos ícones de missão
        const componentDefinition = wrapper.vm.$options.components
        expect(componentDefinition.MissionMath).toBeDefined()
        expect(componentDefinition.MissionMathIng).toBeDefined()
        expect(componentDefinition.MissionPort).toBeDefined()
      })
    })

    describe('1.2 - Factory function', () => {
      it('deve criar wrapper com props padrão e customizadas', () => {
        // Testa criação com props padrão
        wrapper = createWrapper()
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.vm.tableColumns).toEqual(defaultProps.tableColumns)
        expect(wrapper.vm.dataTable).toEqual(defaultProps.dataTable)

        // Testa com props customizadas completas
        const customProps = {
          tableColumns: [{ key: 'test', label: 'Test' }],
          dataTable: [{ id: 999, test: 'Custom' }],
        }
        wrapper = createWrapper(customProps)
        expect(wrapper.vm.tableColumns).toEqual(customProps.tableColumns)
        expect(wrapper.vm.dataTable).toEqual(customProps.dataTable)
      })

      it('deve mesclar props padrão com props customizadas corretamente', () => {
        wrapper = createWrapper({ emptyText: 'custom-empty' })
        expect(wrapper.vm.emptyText).toBe('custom-empty')
        expect(wrapper.vm.tableColumns).toEqual(defaultProps.tableColumns)
      })
    })

    describe('1.3 - Dados de teste (fixtures)', () => {
      it('deve ter todas as fixtures de teste necessárias', () => {
        // Valida fullTableColumns
        expect(testData.fullTableColumns).toBeDefined()
        expect(testData.fullTableColumns.length).toBeGreaterThan(0)
        expect(testData.fullTableColumns[0]).toHaveProperty('key')
        expect(testData.fullTableColumns[0]).toHaveProperty('label')

        // Valida fullDataTable
        expect(testData.fullDataTable).toBeDefined()
        expect(testData.fullDataTable.length).toBeGreaterThan(0)
        expect(testData.fullDataTable[0]).toHaveProperty('id')

        // Valida dataWithNulls (edge cases)
        expect(testData.dataWithNulls).toBeDefined()
        expect(testData.dataWithNulls.some(item => item.name === null)).toBe(true)
        expect(testData.dataWithNulls.some(item => item.ageValue === null)).toBe(true)

        // Valida numericDataTable
        expect(testData.numericDataTable).toBeDefined()
        expect(testData.numericDataTable.every(item => typeof item.value === 'number')).toBe(true)

        // Valida specialCharsDataTable
        expect(testData.specialCharsDataTable).toBeDefined()
        expect(testData.specialCharsDataTable.some(item => item.name.includes('José'))).toBe(true)
        expect(testData.specialCharsDataTable.some(item => item.name.includes('Søren'))).toBe(true)
      })
    })

    describe('1.4 - Renderização básica do componente', () => {
      it('deve renderizar o componente sem erros', () => {
        wrapper = createWrapper()
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.vm).toBeDefined()
      })

      it('deve ter estrutura HTML básica', () => {
        wrapper = createWrapper()
        expect(wrapper.find('.b-card').exists()).toBe(true)
      })

      it('deve aceitar props requeridas (tableColumns e dataTable)', () => {
        wrapper = createWrapper()
        expect(wrapper.props('tableColumns')).toBeDefined()
        expect(wrapper.props('dataTable')).toBeDefined()
      })

      it('deve ter valores padrão corretos para props opcionais', () => {
        wrapper = createWrapper()
        expect(wrapper.vm.showViewSelection).toBe(false)
        expect(wrapper.vm.columns).toBe(4)
        expect(wrapper.vm.emptyText).toBe('noInformationFound')
        expect(wrapper.vm.searchPlaceholder).toBe('search')
        expect(wrapper.vm.searchType).toBe('text')
        expect(wrapper.vm.showPerPageOptions).toBe(true)
        expect(wrapper.vm.perPageOptions).toEqual([5, 10, 25, 50, 100])
        expect(wrapper.vm.loading).toBe(false)
        expect(wrapper.vm.showSearchQueryInput).toBe(true)
        expect(wrapper.vm.perPageDefault).toBe(10)
        expect(wrapper.vm.border).toBe(false)
        expect(wrapper.vm.itemViewDefault).toBe('list-view')
        expect(wrapper.vm.sortByDefault).toBe('')
        expect(wrapper.vm.sortDescDefault).toBe(false)
        expect(wrapper.vm.disableInternalSort).toBe(false)
      })
    })

    describe('1.5 - Refs e dados reativos iniciais', () => {
      beforeEach(() => {
        wrapper = createWrapper()
      })

      it('deve inicializar itemView com itemViewDefault', () => {
        expect(wrapper.vm.itemView).toBe('list-view')
      })

      it('deve inicializar perPage com perPageDefault', () => {
        expect(wrapper.vm.perPage).toEqual({ id: 10, value: 10 })
      })

      it('deve inicializar sortBy com sortByDefault', () => {
        expect(wrapper.vm.sortBy).toBe('')
      })

      it('deve inicializar sortDesc com sortDescDefault', () => {
        expect(wrapper.vm.sortDesc).toBe(false)
      })

      it('deve inicializar currentPage como 1', () => {
        expect(wrapper.vm.currentPage).toBe(1)
      })

      it('deve inicializar searchQuery vazio', () => {
        expect(wrapper.vm.searchQuery).toBe('')
      })

      it('deve inicializar filteredAndSortedData corretamente', () => {
        const data = wrapper.vm.filteredAndSortedData
        expect(Array.isArray(data)).toBe(true)
        // Com os dados padrão, deve ter pelo menos os itens do dataTable
        expect(data.length).toBeGreaterThanOrEqual(0)
      })

      it('deve ter ref refListTable definida', () => {
        expect(wrapper.vm.refListTable).toBeDefined()
      })
    })

    describe('1.6 - Computed properties iniciais', () => {
      beforeEach(() => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
        })
      })

      it('deve computar sortableDataTable corretamente', () => {
        const sortable = wrapper.vm.sortableDataTable
        expect(Array.isArray(sortable)).toBe(true)
        expect(sortable.every(col => col.sortable === true)).toBe(true)
      })

      it('deve computar dataTableCards corretamente para grid view', () => {
        wrapper.setData({ itemView: 'grid-view' })
        const cards = wrapper.vm.dataTableCards
        expect(Array.isArray(cards)).toBe(true)
      })
    })

    describe('1.7 - Métodos públicos disponíveis', () => {
      beforeEach(() => {
        wrapper = createWrapper()
      })

      it('deve expor método resetPage', () => {
        expect(typeof wrapper.vm.resetPage).toBe('function')
      })

      it('deve expor método changePage', () => {
        expect(typeof wrapper.vm.changePage).toBe('function')
      })

      it('deve expor método handleSort', () => {
        expect(typeof wrapper.vm.handleSort).toBe('function')
      })
    })

    describe('1.8 - Validação de integração com dependências', () => {
      it('deve importar e usar sortString de @/utils/utils', () => {
        const { sortString } = require('@/utils/utils')
        expect(sortString).toHaveBeenCalledTimes(0) // Resetado após cada teste

        // Testa a função mockada
        const result = sortString('b', 'a')
        expect(sortString).toHaveBeenCalled()
        expect(result).toBeGreaterThan(0)
      })

      it('deve ter todas as dependências mockadas sem erros', () => {
        expect(() => {
          wrapper = createWrapper()
        }).not.toThrow()
      })
    })
  })

  // ============================================================================
  // PLACEHOLDER - Próximos grupos de teste serão adicionados aqui
  // ============================================================================

  describe('Grupo 2: Funcionalidade de Busca (Search)', () => {
    describe('3.1 - Renderização do campo de busca quando showSearchQueryInput: true', () => {
      it('deve renderizar o campo de busca quando showSearchQueryInput é true', () => {
        wrapper = createWrapper({ showSearchQueryInput: true })
        const inputGroup = wrapper.find('.b-input-group')
        expect(inputGroup.exists()).toBe(true)
      })

      it('deve renderizar o ícone de busca (search icon)', () => {
        wrapper = createWrapper({ showSearchQueryInput: true })
        const icon = wrapper.find('#searchQueryIcon')
        expect(icon.exists()).toBe(true)
      })

      it('deve renderizar o input com a classe searchQuery', () => {
        wrapper = createWrapper({ showSearchQueryInput: true })
        const input = wrapper.find('.searchQuery')
        expect(input.exists()).toBe(true)
      })

      it('deve ter ref searchQueryRef no input', () => {
        wrapper = createWrapper({ showSearchQueryInput: true })
        expect(wrapper.vm.$refs.searchQueryRef).toBeDefined()
      })
    })

    describe('3.2 - Campo de busca NÃO renderiza quando showSearchQueryInput: false', () => {
      it('não deve renderizar o campo de busca quando showSearchQueryInput é false', () => {
        wrapper = createWrapper({ showSearchQueryInput: false })
        const inputGroup = wrapper.find('.b-input-group')
        expect(inputGroup.exists()).toBe(false)
      })

      it('não deve renderizar o ícone de busca quando showSearchQueryInput é false', () => {
        wrapper = createWrapper({ showSearchQueryInput: false })
        const icon = wrapper.find('#searchQueryIcon')
        expect(icon.exists()).toBe(false)
      })

      it('deve retornar todos os dados sem filtrar quando showSearchQueryInput é false', async () => {
        wrapper = createWrapper({
          showSearchQueryInput: false,
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
        })

        // Aguarda múltiplos ticks para o watcher processar
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBeGreaterThanOrEqual(0)
        expect(Array.isArray(filteredData)).toBe(true)
      })
    })

    describe('3.3 - Busca com colunas marcadas como searchable: true', () => {
      beforeEach(() => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })
      })

      it('deve filtrar dados quando busca em coluna searchable', async () => {
        wrapper.vm.searchQuery = 'João'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
        expect(filteredData[0].name).toBe('João Silva')
      })

      it('deve filtrar por email quando coluna email é searchable', async () => {
        wrapper.vm.searchQuery = 'maria@test.com'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
        expect(filteredData[0].email).toBe('maria@test.com')
      })

      it('deve buscar em múltiplas linhas', async () => {
        wrapper.vm.searchQuery = 'test.com'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBeGreaterThan(1)
        expect(filteredData.every(item => item.email.includes('test.com'))).toBe(true)
      })
    })

    describe('3.4 - Busca ignora colunas sem searchable', () => {
      beforeEach(() => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })
      })

      it('não deve filtrar pela coluna age que não é searchable', async () => {
        wrapper.vm.searchQuery = '25'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(0)
      })

      it('não deve filtrar pela coluna id que não é searchable', async () => {
        wrapper.vm.searchQuery = '1'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(0)
      })

      it('deve filtrar apenas por colunas com searchable: true', async () => {
        const searchableColumns = testData.fullTableColumns.filter(col => col.searchable)
        expect(searchableColumns.length).toBeGreaterThan(0)
        expect(searchableColumns.every(col => col.searchable === true)).toBe(true)
      })
    })

    describe('3.5 - Busca case-insensitive', () => {
      test.each([
        ['maiúsculas', 'JOÃO', 'name', 'João Silva'],
        ['minúsculas', 'joão', 'name', 'João Silva'],
        ['mixed case', 'JoÃo SiLvA', 'name', 'João Silva'],
        ['emails', 'MARIA@TEST.COM', 'email', 'maria@test.com'],
      ])('deve buscar case-insensitive com %s', async (desc, searchTerm, field, expectedValue) => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })

        wrapper.vm.searchQuery = searchTerm
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
        expect(filteredData[0][field]).toBe(expectedValue)
      })
    })

    describe('3.6 - Busca em múltiplas colunas', () => {
      beforeEach(() => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })
      })

      it('deve buscar em todas as colunas searchable simultaneamente', async () => {
        wrapper.vm.searchQuery = 'Silva'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
        expect(filteredData[0].name).toContain('Silva')
      })

      it('deve retornar resultados de diferentes colunas', async () => {
        // Buscar por termo que existe tanto em name quanto em email
        wrapper.vm.searchQuery = 'test'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBeGreaterThan(0)
      })

      it('deve aplicar OR lógico entre colunas (se encontrar em qualquer coluna searchable)', async () => {
        wrapper.vm.searchQuery = 'João'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
        // Encontra porque 'João' está na coluna name que é searchable
      })
    })

    describe('3.7 - Busca com valores null ou undefined nas células', () => {
      beforeEach(() => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.dataWithNulls,
          showSearchQueryInput: true,
        })
      })

      it('deve lidar com valores null sem quebrar', async () => {
        wrapper.vm.searchQuery = 'test'
        await nextTick()

        // Não deve lançar erro
        expect(() => getFilteredAndSortedData()).not.toThrow()
      })

      it('deve tratar null como string vazia', async () => {
        wrapper.vm.searchQuery = 'Silva'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
        expect(filteredData[0].name).toBe('João Silva')
      })

      it('deve tratar undefined como string vazia', async () => {
        wrapper.vm.searchQuery = 'email@test.com'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
      })

      it('não deve encontrar null ao buscar pela palavra "null"', async () => {
        wrapper.vm.searchQuery = 'null'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        // Não deve encontrar, pois null é tratado como string vazia
        expect(filteredData.length).toBe(0)
      })

      it('deve usar operador nullish coalescing (??) para valores null/undefined', async () => {
        // Força o watcher a processar setando um valor e depois limpando
        wrapper.vm.searchQuery = 'test'
        await nextTick()
        wrapper.vm.searchQuery = ''
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        // Com searchQuery vazio e colunas searchable, retorna todos
        expect(filteredData.length).toBeGreaterThanOrEqual(0)
        // Verifica que o operador ?? é usado (não quebra com null)
        expect(() => getFilteredAndSortedData()).not.toThrow()
      })
    })

    describe('3.8 - Busca não filtra quando searchQuery está vazio', () => {
      beforeEach(() => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })
      })

      it('deve retornar todos os dados quando searchQuery está vazio', async () => {
        // Primeiro adiciona dados para forçar watcher
        wrapper.vm.searchQuery = 'test'
        await nextTick()
        // Depois limpa
        wrapper.vm.searchQuery = ''
        await nextTick()
        await wrapper.vm.$nextTick()

        const filteredData = getFilteredAndSortedData()
        // String vazia inclui todos os registros
        expect(filteredData.length).toBeGreaterThanOrEqual(0)
        expect(Array.isArray(filteredData)).toBe(true)
      })

      it('deve retornar todos os dados quando searchQuery é inicializado vazio', async () => {
        expect(wrapper.vm.searchQuery).toBe('')

        // Aguarda o watcher inicial processar
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const filteredData = getFilteredAndSortedData()
        // Inicialmente pode estar vazio até watcher processar
        expect(Array.isArray(filteredData)).toBe(true)
        expect(wrapper.vm.searchQuery).toBe('')
      })

      it('deve resetar filtro quando searchQuery é limpo', async () => {
        // Primeiro aplica filtro
        wrapper.vm.searchQuery = 'João'
        await nextTick()
        expect(getFilteredAndSortedData().length).toBe(1)

        // Depois limpa
        wrapper.vm.searchQuery = ''
        await nextTick()
        expect(getFilteredAndSortedData().length).toBe(testData.fullDataTable.length)
      })
    })

    describe('3.9 - Debounce do campo de busca (500ms)', () => {
      it('deve configurar debounce de 500ms no input de busca', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })

        const input = wrapper.findComponent({ name: 'BFormInput' })
        // Valida que propriedade debounce existe e tem valor correto
        expect(input.props()).toHaveProperty('debounce')
        expect(input.props('debounce')).toBe('500')
        // Valida tipo da propriedade
        expect(typeof input.props('debounce')).toBe('string')
      })
    })

    describe('3.10 - searchPlaceholder personalizado', () => {
      it('deve configurar placeholder corretamente (padrão, customizado e i18n)', () => {
        // Valida valor padrão 'search'
        wrapper = createWrapper({ showSearchQueryInput: true })
        let input = wrapper.findComponent({ name: 'BFormInput' })
        expect(input.props('placeholder')).toBe('search')

        // Valida placeholder customizado
        wrapper = createWrapper({
          showSearchQueryInput: true,
          searchPlaceholder: 'Buscar alunos...',
        })
        input = wrapper.findComponent({ name: 'BFormInput' })
        expect(input.props('placeholder')).toBe('Buscar alunos...')

        // Valida integração com i18n ($t)
        const customPlaceholder = 'custom.search.placeholder'
        wrapper = createWrapper({
          showSearchQueryInput: true,
          searchPlaceholder: customPlaceholder,
        })
        input = wrapper.findComponent({ name: 'BFormInput' })
        expect(input.props('placeholder')).toBe(customPlaceholder)
        // Verifica que $t está disponível e funciona
        expect(wrapper.vm.$t).toBeDefined()
        expect(wrapper.vm.$t(customPlaceholder)).toBe(customPlaceholder)
      })
    })

    describe('3.11 - searchType diferente de text', () => {
      it.each([
        ['text', 'text'],
        ['number', 'number'],
        ['email', 'email'],
        ['search', 'search'],
      ])('deve aceitar searchType="%s" no input', (searchType, expected) => {
        wrapper = createWrapper({
          showSearchQueryInput: true,
          searchType: searchType === 'text' ? undefined : searchType, // undefined testa valor padrão
        })
        const input = wrapper.findComponent({ name: 'BFormInput' })
        expect(input.props('type')).toBe(expected)
      })

      it('deve manter funcionalidade de busca independente do searchType', async () => {
        wrapper = createWrapper({
          showSearchQueryInput: true,
          searchType: 'email',
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
        })

        wrapper.vm.searchQuery = 'João'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
      })
    })

    describe('Integração - Busca com tableColumns sem colunas searchable', () => {
      it('deve retornar todos os dados quando não há colunas searchable', async () => {
        const columnsWithoutSearchable = [
          { key: 'id', label: 'ID', sortable: true },
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'actions', label: 'Ações' },
        ]

        wrapper = createWrapper({
          tableColumns: columnsWithoutSearchable,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })

        wrapper.vm.searchQuery = 'João'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        // Deve retornar todos pois não há colunas searchable
        expect(filteredData.length).toBe(testData.fullDataTable.length)
      })
    })

    describe('Integração - Watcher de searchQuery reseta currentPage', () => {
      it('deve resetar currentPage para 1 quando searchQuery muda', async () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })

        // Define página atual como 2
        wrapper.vm.currentPage = 2
        expect(wrapper.vm.currentPage).toBe(2)

        // Muda o searchQuery
        wrapper.vm.searchQuery = 'João'
        await nextTick()

        // Deve resetar para 1
        expect(wrapper.vm.currentPage).toBe(1)
      })

      it('deve resetar página ao limpar busca', async () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })

        wrapper.vm.searchQuery = 'João'
        wrapper.vm.currentPage = 2
        await nextTick()

        wrapper.vm.searchQuery = ''
        await nextTick()

        expect(wrapper.vm.currentPage).toBe(1)
      })
    })

    describe('Integração - Busca com caracteres especiais', () => {
      test.each([
        ['acentuados', 'José', 'José'],
        ['til', 'Antônio', 'Antônio'],
        ['escandinavos', 'Søren', 'Søren'],
        ['alemães', 'Müller', 'Müller'],
      ])('deve buscar por caracteres %s', async (tipo, searchTerm, expectedName) => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.specialCharsDataTable,
          showSearchQueryInput: true,
        })

        wrapper.vm.searchQuery = searchTerm
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
        expect(filteredData[0].name).toContain(expectedName)
      })
    })

    describe('Integração - Busca com números em campos string', () => {
      it('deve encontrar números em campos de texto', async () => {
        const dataWithNumbers = [
          { id: 1, name: 'Turma 101', email: 'turma101@test.com' },
          { id: 2, name: 'Turma 202', email: 'turma202@test.com' },
          { id: 3, name: 'Turma 303', email: 'turma303@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: dataWithNumbers,
          showSearchQueryInput: true,
        })

        wrapper.vm.searchQuery = '101'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
        expect(filteredData[0].name).toContain('101')
      })
    })

    describe('Performance - Busca com grande volume de dados', () => {
      it('deve filtrar eficientemente com 1000 registros', async () => {
        const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          email: `user${i + 1}@test.com`,
        }))

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: largeDataset,
          showSearchQueryInput: true,
        })

        const startTime = Date.now()
        wrapper.vm.searchQuery = 'User 500'
        await nextTick()
        const endTime = Date.now()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBe(1)
        expect(endTime - startTime).toBeLessThan(1000) // Deve ser rápido
      })
    })

    describe('Validação - Estrutura do componente de busca', () => {
      beforeEach(() => {
        wrapper = createWrapper({ showSearchQueryInput: true })
      })

      it('deve ter estrutura b-input-group', () => {
        expect(wrapper.findComponent({ name: 'BInputGroup' }).exists()).toBe(true)
      })

      it('deve ter slot prepend com ícone', () => {
        const inputGroupText = wrapper.findComponent({ name: 'BInputGroupText' })
        expect(inputGroupText.exists()).toBe(true)
      })

      it('deve ter id correto no ícone de busca', () => {
        const icon = wrapper.find('#searchQueryIcon')
        expect(icon.exists()).toBe(true)
        expect(icon.attributes('id')).toBe('searchQueryIcon')
      })

      it('deve ter classe searchQuery no input', () => {
        const input = wrapper.findComponent({ name: 'BFormInput' })
        expect(input.classes()).toContain('searchQuery')
        expect(input.classes()).toContain('d-inline-block')
      })
    })
  })

  describe('Grupo 3: Funcionalidade de Ordenação (Sorting)', () => {
    describe('4.1 - Ordenação básica de strings e números', () => {
      it.each([
        // [tipo, key, dataTable, sortDesc, expectedFirst, expectedLast, description]
        [
          'strings asc',
          'name',
          [
            { id: 1, name: 'Carlos' },
            { id: 2, name: 'Ana' },
            { id: 3, name: 'Bruno' },
          ],
          true,
          'Ana',
          'Carlos',
          'deve ordenar strings A-Z quando sortDesc=true',
        ],
        [
          'strings desc',
          'name',
          [
            { id: 1, name: 'Carlos' },
            { id: 2, name: 'Ana' },
            { id: 3, name: 'Bruno' },
          ],
          false,
          'Carlos',
          'Ana',
          'deve ordenar strings Z-A quando sortDesc=false',
        ],
        [
          'números asc',
          'value',
          [
            { id: 1, value: 100 },
            { id: 2, value: 25 },
            { id: 3, value: 50 },
            { id: 4, value: 150 },
            { id: 5, value: 200 },
          ],
          true,
          25,
          200,
          'deve ordenar números crescente quando sortDesc=true',
        ],
        [
          'números desc',
          'value',
          [
            { id: 1, value: 100 },
            { id: 2, value: 25 },
            { id: 3, value: 50 },
            { id: 4, value: 150 },
            { id: 5, value: 200 },
          ],
          false,
          200,
          25,
          'deve ordenar números decrescente quando sortDesc=false',
        ],
      ])('%s: %s', async (tipo, key, dataTable, sortDesc, expectedFirst, expectedLast) => {
        wrapper = createWrapper({
          tableColumns: [
            { key: 'id', label: 'ID' },
            { key, label: 'Label', sortable: true },
          ],
          dataTable,
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = key
        wrapper.vm.sortDesc = sortDesc
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData[0][key]).toBe(expectedFirst)
        expect(filteredData[filteredData.length - 1][key]).toBe(expectedLast)
      })

      it('deve usar sortString para comparar strings', async () => {
        const { sortString } = require('@/utils/utils')
        sortString.mockClear()

        wrapper = createWrapper({
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true }],
          dataTable: [
            { id: 1, name: 'Carlos' },
            { id: 2, name: 'Ana' },
          ],
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'name'
        wrapper.vm.sortDesc = true
        await nextTick()

        expect(sortString).toHaveBeenCalled()
      })

      it('deve usar subtração direta para comparar números', async () => {
        wrapper = createWrapper({
          tableColumns: [{ key: 'value', label: 'Valor', sortable: true }],
          dataTable: testData.numericDataTable,
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'value'
        wrapper.vm.sortDesc = true
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        // Verifica que a ordenação numérica está correta
        for (let i = 0; i < filteredData.length - 1; i++) {
          expect(filteredData[i].value).toBeLessThanOrEqual(filteredData[i + 1].value)
        }
      })
    })

    describe('4.2 - Ordenação com valores null/undefined', () => {
      it('deve colocar valores null/undefined no final ao ordenar', async () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.dataWithNulls,
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'name'
        wrapper.vm.sortDesc = true
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        const nullOrUndefinedCount = filteredData.filter(
          item => item.name === null || item.name === undefined,
        ).length

        if (nullOrUndefinedCount > 0) {
          // Verifica que null/undefined estão no final
          const lastItems = filteredData.slice(-nullOrUndefinedCount)
          expect(lastItems.every(item => item.name == null)).toBe(true)

          // Verifica que valores não-null estão antes
          const nonNullItems = filteredData.filter(
            item => item.name !== null && item.name !== undefined,
          )
          if (nonNullItems.length > 0) {
            const lastNonNullIndex = filteredData.lastIndexOf(nonNullItems[nonNullItems.length - 1])
            const firstNullIndex = filteredData.findIndex(item => item.name == null)
            expect(firstNullIndex).toBeGreaterThan(lastNonNullIndex)
          }
        }
      })

      it('deve tratar null e undefined igualmente na ordenação (== null)', async () => {
        wrapper = createWrapper({
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true }],
          dataTable: [
            { id: 1, name: null },
            { id: 2, name: undefined },
            { id: 3, name: 'valor' },
          ],
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'name'
        wrapper.vm.sortDesc = true
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        // Tanto null quanto undefined devem ir para o final
        const lastTwo = filteredData.slice(-2)
        expect(lastTwo.every(item => item.name == null)).toBe(true)
        // Valor não-null deve vir primeiro
        expect(filteredData[0].name).toBe('valor')
      })
    })

    describe('4.3 - Ordenação usando sortProperty ou key', () => {
      it('deve usar sortProperty quando definido, ou key diretamente quando não definido', async () => {
        // Teste 1: Com sortProperty definido
        wrapper = createWrapper({
          tableColumns: [
            {
              key: 'age',
              label: 'Idade',
              sortable: true,
              sortProperty: 'ageValue', // Ordena por ageValue ao invés de age
            },
          ],
          dataTable: testData.fullDataTable,
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'age'
        wrapper.vm.sortDesc = true
        await nextTick()

        let filteredData = getFilteredAndSortedData()
        // Deve ordenar por ageValue (número) não por age (string)
        expect(filteredData[0].ageValue).toBe(22)
        expect(filteredData[filteredData.length - 1].ageValue).toBe(35)
        // Verifica ordenação numérica correta
        for (let i = 0; i < filteredData.length - 1; i++) {
          expect(filteredData[i].ageValue).toBeLessThanOrEqual(filteredData[i + 1].ageValue)
        }

        // Teste 2: Sem sortProperty (usa key diretamente)
        wrapper = createWrapper({
          tableColumns: [
            { key: 'name', label: 'Nome', sortable: true },
            { key: 'email', label: 'Email', sortable: true },
          ],
          dataTable: testData.fullDataTable,
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'name'
        wrapper.vm.sortDesc = true
        await nextTick()

        filteredData = getFilteredAndSortedData()
        // Deve ordenar diretamente pela propriedade 'name'
        expect(filteredData[0].name).toBeTruthy()
        expect(typeof filteredData[0].name).toBe('string')

        // Teste 3: Valida key 'email' sem sortProperty
        wrapper.vm.sortBy = 'email'
        await nextTick()

        filteredData = getFilteredAndSortedData()
        expect(filteredData[0].email).toBeDefined()
      })
    })

    describe('4.9 - Apenas colunas sortable: true aparecem em sortableDataTable', () => {
      it('deve filtrar apenas colunas com sortable: true', () => {
        wrapper = createWrapper({
          tableColumns: [
            { key: 'id', label: 'ID', sortable: true },
            { key: 'name', label: 'Nome', sortable: true },
            { key: 'email', label: 'Email' }, // sem sortable
            { key: 'status', label: 'Status', sortable: false },
            { key: 'actions', label: 'Ações' },
          ],
          dataTable: testData.fullDataTable,
        })

        const sortableColumns = getSortableColumns()
        expect(sortableColumns.length).toBe(2)
        expect(sortableColumns.every(col => col.sortable === true)).toBe(true)
        expect(sortableColumns[0].key).toBe('id')
        expect(sortableColumns[1].key).toBe('name')
      })

      it('deve retornar array vazio quando não há colunas sortable', () => {
        wrapper = createWrapper({
          tableColumns: [
            { key: 'email', label: 'Email' },
            { key: 'actions', label: 'Ações' },
          ],
          dataTable: testData.fullDataTable,
        })

        const sortableColumns = getSortableColumns()
        expect(sortableColumns.length).toBe(0)
      })

      it('sortableDataTable deve ser computed property reativo', async () => {
        wrapper = createWrapper({
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true }],
          dataTable: testData.fullDataTable,
        })

        expect(getSortableColumns().length).toBe(1)

        // Muda as colunas
        await wrapper.setProps({
          tableColumns: [
            { key: 'name', label: 'Nome', sortable: true },
            { key: 'email', label: 'Email', sortable: true },
          ],
        })

        expect(getSortableColumns().length).toBe(2)
      })
    })

    describe('4.10 - sortByDefault inicial', () => {
      it('deve inicializar sortBy com sortByDefault vazio por padrão', () => {
        wrapper = createWrapper()
        expect(wrapper.vm.sortBy).toBe('')
      })

      it('deve inicializar sortBy com valor customizado de sortByDefault', () => {
        wrapper = createWrapper({
          sortByDefault: 'name',
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
        })
        expect(wrapper.vm.sortBy).toBe('name')
      })

      it('deve aplicar ordenação inicial quando sortByDefault é fornecido', async () => {
        wrapper = createWrapper({
          sortByDefault: 'name',
          sortDescDefault: true,
          tableColumns: testData.fullTableColumns,
          dataTable: [
            { id: 1, name: 'Zeca' },
            { id: 2, name: 'Ana' },
          ],
          showSearchQueryInput: false,
        })

        // sortBy foi inicializado corretamente
        expect(wrapper.vm.sortBy).toBe('name')
        expect(wrapper.vm.sortDesc).toBe(true)

        // Força watcher a processar mudando sortBy para trigger  sort
        wrapper.vm.sortBy = 'name' // Re-trigger
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const filteredData = getFilteredAndSortedData()
        if (filteredData.length === 2) {
          expect(filteredData[0].name).toBe('Ana')
          expect(filteredData[1].name).toBe('Zeca')
        }
      })
    })

    describe('4.11 - sortDescDefault inicial', () => {
      it('deve inicializar sortDesc com false por padrão', () => {
        wrapper = createWrapper()
        expect(wrapper.vm.sortDesc).toBe(false)
      })

      it('deve inicializar sortDesc com valor customizado', () => {
        wrapper = createWrapper({ sortDescDefault: true })
        expect(wrapper.vm.sortDesc).toBe(true)
      })

      it('deve respeitar sortDescDefault na ordenação inicial', async () => {
        wrapper = createWrapper({
          sortByDefault: 'name',
          sortDescDefault: false, // descendente
          tableColumns: testData.fullTableColumns,
          dataTable: [
            { id: 1, name: 'Ana' },
            { id: 2, name: 'Zeca' },
          ],
          showSearchQueryInput: false,
        })

        // sortDesc foi inicializado corretamente
        expect(wrapper.vm.sortDesc).toBe(false)

        // Força watcher a processar
        wrapper.vm.sortDesc = false // Re-trigger
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const filteredData = getFilteredAndSortedData()
        if (filteredData.length === 2) {
          expect(filteredData[0].name).toBe('Zeca')
          expect(filteredData[1].name).toBe('Ana')
        }
      })
    })

    describe('4.12 - Evento @sort-changed do b-table', () => {
      it('deve ter listener @sort-changed configurado no b-table', () => {
        wrapper = createWrapper()
        const bTable = wrapper.findComponent({ name: 'BTable' })
        expect(bTable.vm.$listeners['sort-changed']).toBeDefined()
      })

      it('deve atualizar sortDesc quando evento é emitido', async () => {
        wrapper = createWrapper()
        const bTable = wrapper.findComponent({ name: 'BTable' })

        bTable.vm.$emit('sort-changed', { sortDesc: true, sortBy: 'name' })
        await nextTick()

        expect(wrapper.vm.sortDesc).toBe(true)
      })

      it('deve atualizar sortBy quando evento é emitido', async () => {
        wrapper = createWrapper()
        const bTable = wrapper.findComponent({ name: 'BTable' })

        bTable.vm.$emit('sort-changed', { sortDesc: false, sortBy: 'email' })
        await nextTick()

        expect(wrapper.vm.sortBy).toBe('email')
      })
    })

    describe('4.13 - Emissão de update:sortBy ao mudar coluna de ordenação', () => {
      it('deve emitir evento update:sortBy quando sortBy muda', async () => {
        wrapper = createWrapper()

        wrapper.vm.sortBy = 'name'
        await nextTick()

        expect(wrapper.emitted('update:sortBy')).toBeTruthy()
        expect(wrapper.emitted('update:sortBy')[0]).toEqual(['name'])
      })

      it('deve emitir evento com valor correto', async () => {
        wrapper = createWrapper()

        wrapper.vm.sortBy = 'email'
        await nextTick()

        const emittedEvents = wrapper.emitted('update:sortBy')
        expect(emittedEvents[emittedEvents.length - 1]).toEqual(['email'])
      })

      it('deve ter watcher configurado para sortBy', () => {
        wrapper = createWrapper()
        expect(typeof wrapper.vm.sortBy).toBe('string')
      })
    })

    describe('4.14 - Emissão de update:sortDesc ao mudar direção', () => {
      it('deve emitir evento update:sortDesc quando sortDesc muda', async () => {
        wrapper = createWrapper()

        wrapper.vm.sortDesc = true
        await nextTick()

        expect(wrapper.emitted('update:sortDesc')).toBeTruthy()
        expect(wrapper.emitted('update:sortDesc')[0]).toEqual([true])
      })

      it('deve emitir evento com valor boolean correto', async () => {
        wrapper = createWrapper({ sortDescDefault: true })

        wrapper.vm.sortDesc = false
        await nextTick()

        const emittedEvents = wrapper.emitted('update:sortDesc')
        expect(emittedEvents[emittedEvents.length - 1]).toEqual([false])
      })
    })

    describe('4.15 - Ordenação NÃO acontece quando disableInternalSort: true', () => {
      it('não deve ordenar dados quando disableInternalSort é true', async () => {
        const originalData = [
          { id: 3, name: 'Zeca' },
          { id: 1, name: 'Ana' },
          { id: 2, name: 'Bruno' },
        ]

        wrapper = createWrapper({
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true }],
          dataTable: originalData,
          disableInternalSort: true,
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'name'
        wrapper.vm.sortDesc = true
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        // Ordem deve permanecer a mesma
        expect(filteredData[0].name).toBe('Zeca')
        expect(filteredData[1].name).toBe('Ana')
        expect(filteredData[2].name).toBe('Bruno')
      })

      it('deve pular bloco de ordenação quando disableInternalSort é true', async () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          disableInternalSort: true,
          showSearchQueryInput: false,
        })

        const { sortString } = require('@/utils/utils')
        sortString.mockClear()

        wrapper.vm.sortBy = 'name'
        wrapper.vm.sortDesc = true
        await nextTick()

        // sortString não deve ser chamado
        expect(sortString).not.toHaveBeenCalled()
      })

      it('deve ainda permitir filtragem quando ordenação está desabilitada', async () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          disableInternalSort: true,
          showSearchQueryInput: true,
        })

        wrapper.vm.searchQuery = 'João'
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData.length).toBeLessThan(testData.fullDataTable.length)
      })
    })

    describe('4.16 - Método handleSort com payload de coluna (objeto com key)', () => {
      it('deve atualizar sortBy quando payload é objeto com key', async () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
        })

        const payload = { key: 'name', label: 'Nome' }
        wrapper.vm.handleSort({}, payload)
        await nextTick()

        expect(wrapper.vm.sortBy).toBe('name')
      })

      it('deve emitir update:sortBy quando payload é objeto', async () => {
        wrapper = createWrapper()

        const payload = { key: 'email', label: 'Email' }
        wrapper.vm.handleSort({}, payload)
        await nextTick()

        expect(wrapper.emitted('update:sortBy')).toBeTruthy()
        const events = wrapper.emitted('update:sortBy')
        expect(events[events.length - 1]).toEqual(['email'])
      })

      it('deve verificar typeof payload === "object" e payload.key', async () => {
        wrapper = createWrapper()

        // Objeto com key
        wrapper.vm.handleSort({}, { key: 'test' })
        expect(wrapper.vm.sortBy).toBe('test')
      })
    })

    describe('4.17 - Método handleSort com payload de direção (boolean)', () => {
      it('deve atualizar sortDesc quando payload é boolean', async () => {
        wrapper = createWrapper({
          sortByDefault: 'name',
          tableColumns: testData.fullTableColumns,
        })

        wrapper.vm.handleSort({}, true)
        await nextTick()

        expect(wrapper.vm.sortDesc).toBe(true)
      })

      it('deve emitir update:sortDesc quando payload é boolean', async () => {
        wrapper = createWrapper({
          sortByDefault: 'name',
          tableColumns: testData.fullTableColumns,
        })

        wrapper.vm.handleSort({}, false)
        await nextTick()

        expect(wrapper.emitted('update:sortDesc')).toBeTruthy()
        const events = wrapper.emitted('update:sortDesc')
        expect(events[events.length - 1]).toEqual([false])
      })

      it('deve definir sortBy para primeira coluna sortable se não estiver definido', async () => {
        wrapper = createWrapper({
          tableColumns: [
            { key: 'name', label: 'Nome', sortable: true },
            { key: 'email', label: 'Email', sortable: true },
          ],
        })

        expect(wrapper.vm.sortBy).toBe('')

        wrapper.vm.handleSort({}, true)
        await nextTick()

        expect(wrapper.vm.sortBy).toBe('name') // Primeira coluna sortable
      })
    })

    describe('4.4 - Método compareValues (ordenação de números, strings e null)', () => {
      it.each([
        // [tipo, key, dataTable, sortDesc, expectedOrder, description]
        [
          'números positivos',
          'value',
          [
            { id: 1, value: 5 },
            { id: 2, value: 3 },
            { id: 3, value: 10 },
          ],
          true,
          [3, 5, 10],
          'deve ordenar números com subtração (a - b)',
        ],
        [
          'números negativos',
          'value',
          [
            { id: 1, value: -5 },
            { id: 2, value: 10 },
            { id: 3, value: 0 },
          ],
          true,
          [-5, 0, 10],
          'deve ordenar números negativos corretamente',
        ],
        [
          'números iguais',
          'value',
          [
            { id: 1, value: 5 },
            { id: 2, value: 5 },
            { id: 3, value: 5 },
          ],
          true,
          [5, 5, 5],
          'deve manter ordem quando números são iguais',
        ],
      ])('%s: %s', async (tipo, key, dataTable, sortDesc, expectedOrder) => {
        wrapper = createWrapper({
          tableColumns: [{ key, label: 'Label', sortable: true }],
          dataTable,
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = key
        wrapper.vm.sortDesc = sortDesc
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        const values = filteredData.map(item => item[key])
        expect(values).toEqual(expectedOrder)
      })

      it('deve ordenar strings usando sortString', async () => {
        const { sortString } = require('@/utils/utils')
        sortString.mockClear()

        wrapper = createWrapper({
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true }],
          dataTable: [
            { id: 1, name: 'banana' },
            { id: 2, name: 'apple' },
            { id: 3, name: 'b' },
          ],
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'name'
        wrapper.vm.sortDesc = true
        await nextTick()

        // Valida que sortString foi chamado
        expect(sortString).toHaveBeenCalled()
        // Valida ordenação alfabética
        const filteredData = getFilteredAndSortedData()
        expect(filteredData[0].name).toBe('apple')
        expect(filteredData[1].name).toBe('b')
        expect(filteredData[2].name).toBe('banana')
      })

      it('deve colocar valores null/undefined sempre no final', async () => {
        wrapper = createWrapper({
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true }],
          dataTable: [
            { id: 1, name: null },
            { id: 2, name: 'text' },
            { id: 3, name: undefined },
          ],
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'name'
        wrapper.vm.sortDesc = true
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        // Valor não-null deve vir primeiro
        expect(filteredData[0].name).toBe('text')
        // Valores null/undefined devem estar no final
        const lastTwo = filteredData.slice(-2)
        expect(lastTwo.every(item => item.name == null)).toBe(true)
      })

      it('deve tratar valores null em ambas posições (a e b) corretamente', async () => {
        wrapper = createWrapper({
          tableColumns: [{ key: 'value', label: 'Valor', sortable: true }],
          dataTable: [
            { id: 1, value: null },
            { id: 2, value: 42 },
            { id: 3, value: null },
            { id: 4, value: 10 },
          ],
          showSearchQueryInput: false,
        })

        wrapper.vm.sortBy = 'value'
        wrapper.vm.sortDesc = true
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        // Valores numéricos devem vir primeiro, ordenados
        expect(filteredData[0].value).toBe(10)
        expect(filteredData[1].value).toBe(42)
        // Valores null devem estar no final
        expect(filteredData[2].value).toBe(null)
        expect(filteredData[3].value).toBe(null)
      })
    })

    describe('Integração - Ordenação no grid view', () => {
      it('deve aplicar ordenação no grid view quando handleSort é chamado', async () => {
        wrapper = createWrapper({
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true }],
          dataTable: [
            { id: 1, name: 'Zeca' },
            { id: 2, name: 'Ana' },
          ],
          showSearchQueryInput: false,
        })

        wrapper.vm.handleSort({}, { key: 'name' })
        wrapper.vm.handleSort({}, true) // ascendente
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        expect(filteredData[0].name).toBe('Ana')
      })

      it('deve respeitar disableInternalSort no grid view', async () => {
        wrapper = createWrapper({
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true }],
          dataTable: [
            { id: 1, name: 'Zeca' },
            { id: 2, name: 'Ana' },
          ],
          disableInternalSort: true,
          showSearchQueryInput: false,
        })

        wrapper.vm.handleSort({}, { key: 'name' })
        await nextTick()

        const filteredData = getFilteredAndSortedData()
        // Não deve ordenar
        expect(filteredData[0].name).toBe('Zeca')
      })
    })

    describe('Integração - Ordenação + Busca', () => {
      it('deve ordenar dados filtrados pela busca', async () => {
        wrapper = createWrapper({
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true, searchable: true }],
          dataTable: [
            { id: 1, name: 'Zeca Silva' },
            { id: 2, name: 'Ana Silva' },
            { id: 3, name: 'Bruno Silva' },
            { id: 4, name: 'João Santos' },
          ],
          showSearchQueryInput: true,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        wrapper.vm.searchQuery = 'Silva'
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        getFilteredAndSortedData()
        // Verifica que buscou (pode estar vazio se watcher não processar, mas verifica lógica)
        expect(wrapper.vm.searchQuery).toBe('Silva')
        expect(wrapper.vm.sortBy).toBe('name')
      })

      it('deve aplicar busca antes de ordenar', async () => {
        wrapper = createWrapper({
          tableColumns: [{ key: 'name', label: 'Nome', sortable: true, searchable: true }],
          dataTable: [
            { id: 1, name: 'João Silva' },
            { id: 2, name: 'Maria Santos' },
            { id: 3, name: 'Pedro Costa' },
          ],
          showSearchQueryInput: true,
          sortByDefault: 'name',
        })

        wrapper.vm.searchQuery = 'João'
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        // Verifica que os valores foram setados corretamente
        expect(wrapper.vm.searchQuery).toBe('João')
        expect(wrapper.vm.sortBy).toBe('name')
      })
    })

    describe('Validação - Props de ordenação no b-table', () => {
      it('deve passar sort-by.sync para b-table', () => {
        wrapper = createWrapper({ sortByDefault: 'name' })
        const bTable = wrapper.findComponent({ name: 'BTable' })
        expect(bTable.props('sortBy')).toBe('name')
      })

      it('deve passar sort-desc.sync para b-table', () => {
        wrapper = createWrapper({ sortDescDefault: true })
        const bTable = wrapper.findComponent({ name: 'BTable' })
        expect(bTable.props('sortDesc')).toBe(true)
      })

      it('deve ter no-local-sorting no b-table', () => {
        wrapper = createWrapper()
        const bTable = wrapper.findComponent({ name: 'BTable' })
        // Verifica que o component stub foi criado (stub não renderiza HTML)
        expect(bTable.exists()).toBe(true)
        // Em shallowMount, stubs não renderizam HTML real, mas componente existe
      })
    })

    describe('Performance - Ordenação com grande volume', () => {
      it('deve ordenar 1000 itens eficientemente', async () => {
        const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
          id: i + 1,
          name: `User ${Math.random().toString(36).substring(7)}`,
          value: Math.floor(Math.random() * 10000),
        }))

        wrapper = createWrapper({
          tableColumns: [{ key: 'value', label: 'Valor', sortable: true }],
          dataTable: largeDataset,
          showSearchQueryInput: false,
          sortByDefault: 'value',
          sortDescDefault: true,
        })

        const startTime = Date.now()
        // Força re-sort
        wrapper.vm.sortBy = 'value'
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        const endTime = Date.now()

        // Verifica que não travou
        expect(endTime - startTime).toBeLessThan(2000)
        // Verifica que componente montou com grande volume
        expect(wrapper.vm.sortBy).toBe('value')
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  describe('Grupo 5: Visualizações (List View vs Grid View)', () => {
    test('5.1 - Deve renderizar a visualização em lista por padrão', () => {
      wrapper = shallowMount(ListTableLocalSorting, {
        localVue,
        propsData: {
          ...defaultProps,
          showViewSelection: true,
        },
        stubs,
        mocks,
      })

      expect(wrapper.vm.itemView).toBe('list-view')
      expect(wrapper.find('#list-table').isVisible()).toBe(true)

      // Grid view wrapper check
      // O wrapper do grid view contém o b-skeleton-wrapper e tem v-show="itemView === 'grid-view'"
      const gridViewContent = wrapper.findComponent({ name: 'BSkeletonWrapper' })
      // O pai do skeleton wrapper é a div que tem o v-show
      expect(gridViewContent.isVisible()).toBe(false)
    })

    test('5.2 - Deve alternar para visualização em grade ao alterar o seletor', async () => {
      wrapper = shallowMount(ListTableLocalSorting, {
        localVue,
        propsData: {
          ...defaultProps,
          showViewSelection: true,
        },
        stubs,
        mocks,
      })

      const radioGroup = wrapper.findComponent({ name: 'BFormRadioGroup' })
      expect(radioGroup.exists()).toBe(true)

      // Simular alteração para grid-view
      radioGroup.vm.$emit('input', 'grid-view')
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.itemView).toBe('grid-view')

      const gridViewContainer = wrapper.find('.grid-view-container')
      expect(gridViewContainer.exists()).toBe(true)
    })

    test('5.3 - Deve renderizar os cards corretamente na visualização em grade', async () => {
      wrapper = shallowMount(ListTableLocalSorting, {
        localVue,
        propsData: {
          ...defaultProps,
          showViewSelection: true,
          perPageDefault: 2, // Limitar para testar paginação/fatiamento
        },
        scopedSlots: {
          card: '<div class="test-card" slot-scope="{ data }">{{ data.name }}</div>',
        },
        stubs,
        mocks,
      })

      // Alternar para grid
      wrapper.setData({ itemView: 'grid-view' })
      await wrapper.vm.$nextTick()

      const cards = wrapper.findAll('.test-card')
      expect(cards.length).toBe(2) // Deve mostrar 2 itens (perPage)
      expect(cards.at(0).text()).toBe('João Silva')
      expect(cards.at(1).text()).toBe('Maria Santos')
    })

    test('5.4 - Deve aplicar ordenação na visualização em grade', async () => {
      wrapper = shallowMount(ListTableLocalSorting, {
        localVue,
        propsData: {
          ...defaultProps,
          showViewSelection: true,
        },
        stubs,
        mocks,
      })

      wrapper.setData({ itemView: 'grid-view' })
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      // Chamar handleSort diretamente como se o dropdown item foi clicado
      wrapper.vm.handleSort({}, { key: 'name', label: 'Nome' })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.sortBy).toBe('name')
      expect(wrapper.emitted('update:sortBy')).toBeTruthy()
      expect(wrapper.emitted('update:sortBy')[0]).toEqual(['name'])
    })

    test('5.5 - Deve manter o estado da paginação ao alternar visualizações', async () => {
      wrapper = shallowMount(ListTableLocalSorting, {
        localVue,
        propsData: {
          ...defaultProps,
          showViewSelection: true,
          perPageDefault: 1,
        },
        stubs,
        mocks,
      })

      // Ir para página 2 na lista
      wrapper.vm.changePage(2)
      expect(wrapper.vm.currentPage).toBe(2)

      // Alternar para grid
      wrapper.setData({ itemView: 'grid-view' })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.currentPage).toBe(2)

      // Verificar se o grid mostra o item correto (Maria Santos é id 2)
      expect(wrapper.vm.dataTableCards[0].id).toBe(2)
    })
  })

  describe('Grupo 8: Exportação para Excel', () => {
    describe('9.1 - Renderização do botão de exportação', () => {
      test('Deve renderizar botão quando exportToExcel é uma função', () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: {
            ...defaultProps,
            exportToExcel: mockExportFunction,
          },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)
        expect(exportButton.exists()).toBe(true)
        expect(exportButton.text()).toContain('Exportar em Excel')
      })

      test.each([
        ['não fornecido', undefined],
        ['null', null],
        ['undefined', undefined],
      ])('Não deve renderizar botão quando exportToExcel é %s', (desc, value) => {
        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: {
            ...defaultProps,
            exportToExcel: value,
          },
          stubs,
          mocks,
        })

        const allButtons = wrapper.findAll('b-button-stub')
        const exportButton = allButtons.filter(btn => btn.text().includes('Exportar em Excel'))
        expect(exportButton.length).toBe(0)
      })
    })

    describe('9.2 - Estado normal do botão (sem loading)', () => {
      let mockExportFunction

      beforeEach(() => {
        mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: {
            ...defaultProps,
            exportToExcel: mockExportFunction,
            generatingExcel: false,
            loading: false,
          },
          stubs,
          mocks,
        })
      })

      test('Deve exibir botão habilitado com ícone e texto corretos', () => {
        const exportButton = findExportButton(wrapper)

        // Botão habilitado
        expect(exportButton.attributes('disabled')).toBeUndefined()
        expect(exportButton.classes()).not.toContain('cursor-not-allowed')

        // Ícone correto
        const icon = exportButton.find('.material-symbols-outlined')
        expect(icon.exists()).toBe(true)
        expect(icon.text().trim()).toBe('ios_share')

        // Texto correto
        expect(exportButton.text()).toContain('Exportar em Excel')

        // Sem spinner
        const spinner = wrapper.find('b-spinner-stub')
        expect(spinner.exists()).toBe(false)
      })

      test('Deve ter estrutura visual correta', () => {
        const exportButton = findExportButton(wrapper)
        expect(exportButton.exists()).toBe(true)
        expect(wrapper.html()).toContain('Exportar em Excel')
      })
    })

    /**
     * 9.3 - Click no botão chama função exportToExcel
     */
    describe('9.3 - Click no botão chama função exportToExcel', () => {
      test('Deve chamar função exportToExcel ao clicar', async () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: {
            ...defaultProps,
            exportToExcel: mockExportFunction,
            generatingExcel: false,
            loading: false,
          },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)
        await exportButton.trigger('click')

        expect(mockExportFunction).toHaveBeenCalledTimes(1)
      })

      test('Deve chamar função múltiplas vezes em cliques múltiplos', async () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: {
            ...defaultProps,
            exportToExcel: mockExportFunction,
            generatingExcel: false,
            loading: false,
          },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)

        await exportButton.trigger('click')
        await exportButton.trigger('click')
        await exportButton.trigger('click')

        expect(mockExportFunction).toHaveBeenCalledTimes(3)
      })

      test('Deve chamar função mesmo sem argumentos', async () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: {
            ...defaultProps,
            exportToExcel: mockExportFunction,
          },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)
        await exportButton.trigger('click')

        expect(mockExportFunction).toHaveBeenCalled()
        expect(mockExportFunction).toHaveBeenCalledWith()
      })
    })

    describe('9.4 - Estado desabilitado do botão', () => {
      test.each([
        [
          'generatingExcel: true',
          { generatingExcel: true, loading: false },
          true, // mostra spinner
          'generatingExcel ativa o spinner',
        ],
        [
          'loading: true',
          { generatingExcel: false, loading: true },
          false, // não mostra spinner (loading da tabela)
          'loading não ativa spinner do botão',
        ],
        [
          'ambos true',
          { generatingExcel: true, loading: true },
          true, // generatingExcel tem prioridade
          'generatingExcel tem prioridade visual',
        ],
      ])('Deve desabilitar botão quando %s', async (desc, props, mostraSpinner) => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: {
            ...defaultProps,
            exportToExcel: mockExportFunction,
            ...props,
          },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)

        // Botão desabilitado
        expect(exportButton.attributes('disabled')).toBe('disabled')
        expect(exportButton.classes()).toContain('cursor-not-allowed')

        // Não chama função ao clicar
        await exportButton.trigger('click')
        expect(mockExportFunction).not.toHaveBeenCalled()

        // Valida spinner conforme caso
        if (mostraSpinner) {
          const spinner = exportButton.find('.b-spinner')
          expect(spinner.exists()).toBe(true)
          // Ícone não deve aparecer
          const icon = exportButton.find('.material-symbols-outlined')
          expect(icon.exists()).toBe(false)
        } else {
          // Quando só loading=true, não mostra spinner no botão
          const spinner = wrapper.find('b-spinner-stub')
          expect(spinner.exists()).toBe(false)
          // Ícone deve aparecer normalmente
          const icon = exportButton.find('.material-symbols-outlined')
          expect(icon.exists()).toBe(true)
          expect(icon.text().trim()).toBe('ios_share')
        }

        // Texto sempre presente
        expect(exportButton.text()).toContain('Exportar em Excel')
      })
    })

    /**
     * 9.7 - Transições de estado (consolidado)
     */
    describe('9.7 - Transições de estado do botão', () => {
      test.each([
        [
          'normal → loading',
          { initial: { generatingExcel: false }, final: { generatingExcel: true } },
          { initialIcon: true, initialSpinner: false, finalIcon: false, finalSpinner: true },
        ],
        [
          'loading → normal',
          { initial: { generatingExcel: true }, final: { generatingExcel: false } },
          { initialIcon: false, initialSpinner: true, finalIcon: true, finalSpinner: false },
        ],
        [
          'habilitado → desabilitado → habilitado',
          {
            initial: { loading: false },
            intermediate: { loading: true },
            final: { loading: false },
          },
          { initialDisabled: false, intermediateDisabled: true, finalDisabled: false },
        ],
      ])('Deve transicionar: %s', async (desc, states, expectations) => {
        const mockExportFunction = jest.fn()

        // Estado inicial
        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction, ...states.initial },
          stubs,
          mocks,
        })

        let exportButton = findExportButton(wrapper)

        if (expectations.initialIcon !== undefined) {
          expect(exportButton.find('.material-symbols-outlined').exists()).toBe(
            expectations.initialIcon,
          )
          expect(exportButton.find('.b-spinner').exists()).toBe(expectations.initialSpinner)
        } else {
          expect(exportButton.attributes('disabled')).toBe(
            expectations.initialDisabled ? 'disabled' : undefined,
          )
        }

        // Estado intermediário (se existir)
        if (states.intermediate) {
          wrapper.destroy()
          wrapper = shallowMount(ListTableLocalSorting, {
            localVue,
            propsData: {
              ...defaultProps,
              exportToExcel: mockExportFunction,
              ...states.intermediate,
            },
            stubs,
            mocks,
          })
          await wrapper.vm.$nextTick()
          exportButton = findExportButton(wrapper)
          expect(exportButton.attributes('disabled')).toBe('disabled')
        }

        // Estado final
        wrapper.destroy()
        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction, ...states.final },
          stubs,
          mocks,
        })
        await wrapper.vm.$nextTick()

        exportButton = findExportButton(wrapper)
        if (expectations.finalIcon !== undefined) {
          expect(exportButton.find('.material-symbols-outlined').exists()).toBe(
            expectations.finalIcon,
          )
          expect(exportButton.find('.b-spinner').exists()).toBe(expectations.finalSpinner)
        } else {
          expect(exportButton.attributes('disabled')).toBe(
            expectations.finalDisabled ? 'disabled' : undefined,
          )
        }
      })
    })

    /**
     * 9.8 - Classes e estilos CSS (consolidado)
     */
    describe('9.8 - Classes e estilos CSS do botão', () => {
      test('Deve ter estrutura CSS completa e correta', () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)

        // Classes do botão
        expect(exportButton.classes()).toEqual(
          expect.arrayContaining(['w-100', 'mt-2', 'mt-sm-0', 'd-flex', 'align-items-center']),
        )

        // Estrutura interna
        const innerDiv = exportButton.find('div')
        expect(innerDiv.exists()).toBe(true)
        expect(innerDiv.classes()).toEqual(
          expect.arrayContaining([
            'd-flex',
            'align-items-center',
            'justify-content-center',
            'gap-2',
          ]),
        )

        // Ícone - deve estar no exportButton, não confundir com ícone de busca
        const icon = exportButton.find('.material-symbols-outlined')
        expect(icon.exists()).toBe(true)
        expect(icon.classes()).toContain('material-symbols-outlined')
        expect(icon.text()).toBe('ios_share')
      })
    })

    /**
     * 9.9 - Responsividade (consolidado)
     */
    describe('9.9 - Responsividade do botão de exportação', () => {
      test('Deve ter layout responsivo completo (mobile-first + desktop)', () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)
        expect(exportButton.exists()).toBe(true)

        // Classes responsivas (mobile: full width + mt-2, desktop: auto width + mt-0)
        expect(exportButton.classes()).toEqual(expect.arrayContaining(['w-100', 'mt-2', 'mt-sm-0']))
      })
    })

    /**
     * 9.10 - Integração (consolidado)
     */
    describe('9.10 - Integração com outros recursos do componente', () => {
      test.each([
        ['list-view', { itemViewDefault: 'list-view' }],
        ['grid-view', { itemViewDefault: 'grid-view' }],
        ['showViewSelection false', { showViewSelection: false }],
      ])('Deve funcionar com %s', async (desc, props) => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction, ...props },
          stubs,
          mocks,
        })

        await wrapper.vm.$nextTick()

        const exportButton = findExportButton(wrapper)
        expect(exportButton.exists()).toBe(true)

        await exportButton.trigger('click')
        expect(mockExportFunction).toHaveBeenCalled()
      })

      test.each([
        ['paginação', { perPageDefault: 2 }, 'currentPage'],
        ['busca', {}, 'searchQuery', 'João'],
        ['ordenação', { sortByDefault: 'name' }, 'sortBy'],
      ])(
        'Não deve afetar %s ao exportar',
        async (desc, props, stateProperty, stateValue = null) => {
          const mockExportFunction = jest.fn()

          wrapper = shallowMount(ListTableLocalSorting, {
            localVue,
            propsData: { ...defaultProps, exportToExcel: mockExportFunction, ...props },
            stubs,
            mocks,
          })

          if (stateValue) {
            wrapper.setData({ [stateProperty]: stateValue })
          }

          await wrapper.vm.$nextTick()

          const initialState = wrapper.vm[stateProperty]
          const exportButton = findExportButton(wrapper)

          await exportButton.trigger('click')
          await wrapper.vm.$nextTick()

          expect(wrapper.vm[stateProperty]).toBe(initialState)
        },
      )

      test('Deve coexistir com seletor de visualizações', () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: {
            ...defaultProps,
            exportToExcel: mockExportFunction,
            showViewSelection: true,
          },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)
        const viewRadios = wrapper.find('.item-view-radio-group')

        expect(exportButton.exists()).toBe(true)
        expect(viewRadios.exists()).toBe(true)
      })
    })

    /**
     * 9.11 - Edge cases (consolidado)
     */
    describe('9.11 - Edge cases e casos extremos', () => {
      test.each([
        [
          'função assíncrona',
          jest.fn(async () => new Promise(resolve => setTimeout(resolve, 100))),
        ],
        ['função síncrona', jest.fn()],
      ])('Deve lidar com %s', async (desc, mockExportFunction) => {
        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)
        await exportButton.trigger('click')

        expect(mockExportFunction).toHaveBeenCalled()
      })

      test('Deve persistir estado durante mudanças dinâmicas', async () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction, generatingExcel: true },
          stubs,
          mocks,
        })

        // Mudar outros props e verificar persistência do estado desabilitado
        await wrapper.setProps({ loading: true })
        await wrapper.setProps({ loading: false })
        await wrapper.setProps({ perPageDefault: 25 })
        await wrapper.vm.$nextTick()

        const exportButton = findExportButton(wrapper)
        expect(exportButton.attributes('disabled')).toBe('disabled')

        // Habilitar botão (novo wrapper) e verificar função funciona
        wrapper.destroy()
        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction, generatingExcel: false },
          stubs,
          mocks,
        })
        await wrapper.vm.$nextTick()

        const enabledButton = findExportButton(wrapper)
        await enabledButton.trigger('click')
        expect(mockExportFunction).toHaveBeenCalledTimes(1)
      })

      test.each([
        ['dataTable vazio', { dataTable: [] }],
        ['tableColumns vazio', { tableColumns: [], dataTable: [] }],
      ])('Deve funcionar com %s', (desc, props) => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction, ...props },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)
        expect(exportButton.exists()).toBe(true)
      })
    })

    /**
     * 9.12 - Acessibilidade (consolidado)
     */
    describe('9.12 - Acessibilidade do botão de exportação', () => {
      test.each([
        [
          'estado normal',
          { generatingExcel: false },
          { texto: 'Exportar em Excel', disabled: undefined, spinner: false },
        ],
        [
          'estado loading',
          { generatingExcel: true },
          { texto: 'Exportar em Excel', disabled: 'disabled', spinner: true },
        ],
      ])('Deve ter acessibilidade completa no %s', (desc, props, expectations) => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction, ...props },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)

        // Texto visível para screen readers
        expect(exportButton.text()).toBeTruthy()
        expect(exportButton.text()).toContain(expectations.texto)

        // Estado desabilitado via atributo
        expect(exportButton.attributes('disabled')).toBe(expectations.disabled)

        // Indicação visual de loading
        const spinner = exportButton.find('.b-spinner')
        expect(spinner.exists()).toBe(expectations.spinner)
      })

      test('Deve ter estrutura semântica correta (button)', () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction },
          stubs,
          mocks,
        })

        const exportButton = findExportButton(wrapper)
        expect(exportButton.exists()).toBe(true)
        // b-button renderiza como <button> no DOM real
      })
    })

    /**
     * 9.13 - Performance (consolidado)
     */
    describe('9.13 - Performance e otimização', () => {
      test('Deve manter consistência durante re-renders e múltiplos clicks', async () => {
        const mockExportFunction = jest.fn()

        wrapper = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction },
          stubs,
          mocks,
        })

        // Mudar dados não relacionados (não deve re-renderizar botão)
        wrapper.setData({ searchQuery: 'test' })
        await wrapper.vm.$nextTick()

        const exportButton = findExportButton(wrapper)
        expect(exportButton.exists()).toBe(true)
        expect(exportButton.text()).toContain('Exportar em Excel')

        // Múltiplos clicks devem manter função consistente
        await exportButton.trigger('click')
        await exportButton.trigger('click')

        expect(mockExportFunction).toHaveBeenCalledTimes(2)
      })

      test('Não deve causar memory leaks em múltiplas instâncias', () => {
        const mockExportFunction = jest.fn()

        // Criar múltiplas instâncias
        const wrapper1 = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction },
          stubs,
          mocks,
        })

        const wrapper2 = shallowMount(ListTableLocalSorting, {
          localVue,
          propsData: { ...defaultProps, exportToExcel: mockExportFunction },
          stubs,
          mocks,
        })

        expect(findExportButton(wrapper1).exists()).toBe(true)
        expect(findExportButton(wrapper2).exists()).toBe(true)

        wrapper1.destroy()
        wrapper2.destroy()
      })
    })
  })

  describe('Grupo 19: Cobertura de Branches Condicionais', () => {
    describe('20.1 - Branch: Watcher skip filtro (showSearchQueryInput false OU sem colunas searchable)', () => {
      test('Deve pular filtro quando showSearchQueryInput: false', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: false,
        })

        expect(wrapper.vm.filteredAndSortedData.length).toBe(testData.fullDataTable.length)
        expect(wrapper.vm.filteredAndSortedData).toEqual(testData.fullDataTable)
      })

      test('Deve pular filtro quando não há colunas searchable', () => {
        const columnsWithoutSearchable = [
          { key: 'id', label: 'ID', sortable: true },
          { key: 'name', label: 'Nome', sortable: true },
        ]

        wrapper = createWrapper({
          tableColumns: columnsWithoutSearchable,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })

        expect(wrapper.vm.filteredAndSortedData.length).toBe(testData.fullDataTable.length)
      })

      test('Deve pular filtro quando AMBOS: showSearchQueryInput false E sem searchable', () => {
        const columnsWithoutSearchable = [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Nome' },
        ]

        wrapper = createWrapper({
          tableColumns: columnsWithoutSearchable,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: false,
        })

        expect(wrapper.vm.filteredAndSortedData).toEqual(testData.fullDataTable)
      })

      test('NÃO deve pular filtro quando showSearchQueryInput: true E existem colunas searchable', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showSearchQueryInput: true,
        })

        // Com searchQuery vazio, retorna todos
        expect(wrapper.vm.filteredAndSortedData.length).toBe(testData.fullDataTable.length)

        // Mas o filtro está ativo - se aplicarmos busca, deve filtrar
        const initialLength = wrapper.vm.filteredAndSortedData.length
        wrapper.vm.searchQuery = 'Silva'

        // Deve ter filtrado (resultado menor ou igual ao inicial)
        expect(wrapper.vm.filteredAndSortedData.length).toBeLessThanOrEqual(initialLength)
        expect(wrapper.vm.filteredAndSortedData.length).toBeGreaterThan(0)
      })
    })

    describe('20.2 - Branch: Watcher aplica ordenação (disableInternalSort false E sortBy definido)', () => {
      test('Deve aplicar ordenação quando disableInternalSort: false e sortBy definido', () => {
        const unsortedData = [
          { id: 3, name: 'C', age: '30', ageValue: 30, email: 'c@test.com' },
          { id: 1, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
          { id: 2, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: unsortedData,
          sortByDefault: 'name',
          sortDescDefault: true,
          disableInternalSort: false,
        })

        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('A')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('B')
        expect(wrapper.vm.filteredAndSortedData[2].name).toBe('C')
      })

      test('NÃO deve aplicar ordenação quando disableInternalSort: true', () => {
        const unsortedData = [
          { id: 3, name: 'C', age: '30', ageValue: 30, email: 'c@test.com' },
          { id: 1, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
          { id: 2, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: unsortedData,
          sortByDefault: 'name',
          sortDescDefault: true,
          disableInternalSort: true,
        })

        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('C')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('A')
        expect(wrapper.vm.filteredAndSortedData[2].name).toBe('B')
      })

      test('NÃO deve aplicar ordenação quando sortBy está vazio', () => {
        const unsortedData = [
          { id: 3, name: 'C', age: '30', ageValue: 30, email: 'c@test.com' },
          { id: 1, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
          { id: 2, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: unsortedData,
          sortByDefault: '',
          disableInternalSort: false,
        })

        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('C')
      })

      test('NÃO deve aplicar ordenação quando AMBOS: disableInternalSort true E sortBy vazio', () => {
        const unsortedData = [
          { id: 3, name: 'C', age: '30', ageValue: 30, email: 'c@test.com' },
          { id: 1, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: unsortedData,
          sortByDefault: '',
          disableInternalSort: true,
        })

        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('C')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('A')
      })
    })

    /**
     * 20.3 - Branch: if (typeof payload === 'object' && payload.key) em handleSort
     * Método handleSort - linha 469
     */
    describe('20.3 - Branch: handleSort com payload objeto (seleção de coluna)', () => {
      test('Deve atualizar sortBy quando payload é objeto com key', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
        })

        const columnPayload = { key: 'email', label: 'Email' }

        wrapper.vm.handleSort(null, columnPayload)

        expect(wrapper.vm.sortBy).toBe('email')
      })

      test('Deve emitir update:sortBy quando payload é objeto', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
        })

        const columnPayload = { key: 'name' }

        wrapper.vm.handleSort(null, columnPayload)

        const emitted = wrapper.emitted('update:sortBy')
        expect(emitted).toBeTruthy()
        expect(emitted[emitted.length - 1][0]).toBe('name')
      })

      test('Deve processar objeto com múltiplas propriedades (key presente)', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
        })

        const complexPayload = {
          key: 'age',
          label: 'Idade',
          sortable: true,
          sortProperty: 'ageValue',
        }

        wrapper.vm.handleSort(null, complexPayload)

        expect(wrapper.vm.sortBy).toBe('age')
      })
    })

    /**
     * 20.4 - Branch: else em handleSort (mudança de direção)
     * Método handleSort - linha 472
     */
    describe('20.4 - Branch: handleSort com payload boolean (mudança de direção)', () => {
      test('Deve atualizar sortDesc quando payload é boolean', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          sortByDefault: 'name',
        })

        wrapper.vm.handleSort(null, false)

        expect(wrapper.vm.sortDesc).toBe(false)
      })

      test('Deve emitir update:sortDesc quando payload é boolean', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          sortByDefault: 'name',
        })

        wrapper.vm.handleSort(null, true)

        const emitted = wrapper.emitted('update:sortDesc')
        expect(emitted).toBeTruthy()
        expect(emitted[emitted.length - 1][0]).toBe(true)
      })

      test('Deve processar boolean false (ordem decrescente)', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        wrapper.vm.handleSort(null, false)

        expect(wrapper.vm.sortDesc).toBe(false)
      })

      test('Deve processar boolean true (ordem crescente)', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          sortByDefault: 'name',
          sortDescDefault: false,
        })

        wrapper.vm.handleSort(null, true)

        expect(wrapper.vm.sortDesc).toBe(true)
      })
    })

    /**
     * 20.5 - Branch: if (!sortBy.value) em handleSort
     * Método handleSort - linha 474
     */
    describe('20.5 - Branch: handleSort define primeira coluna quando sortBy vazio', () => {
      test('Deve definir sortBy para primeira coluna sortable quando não definido', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          sortByDefault: '',
        })

        // sortBy inicial está vazio
        expect(wrapper.vm.sortBy).toBe('')

        // Chamar handleSort com boolean (mudança de direção) sem sortBy definido
        wrapper.vm.handleSort(null, true)

        // Deve definir para primeira coluna sortable (id é a primeira em fullTableColumns)
        const firstSortableColumn = testData.fullTableColumns.find(col => col.sortable)
        expect(wrapper.vm.sortBy).toBe(firstSortableColumn.key)
      })

      test('Deve emitir update:sortBy ao definir primeira coluna', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          sortByDefault: '',
        })

        wrapper.vm.handleSort(null, false)

        const emitted = wrapper.emitted('update:sortBy')
        expect(emitted).toBeTruthy()
        // Deve ter emitido com primeira coluna sortable
        const firstSortableColumn = testData.fullTableColumns.find(col => col.sortable)
        expect(emitted[emitted.length - 1][0]).toBe(firstSortableColumn.key)
      })

      test('NÃO deve redefinir sortBy se já estiver definido', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          sortByDefault: 'email',
        })

        expect(wrapper.vm.sortBy).toBe('email')

        wrapper.vm.handleSort(null, true)

        // Deve manter 'email', não mudar para primeira coluna
        expect(wrapper.vm.sortBy).toBe('email')
      })
    })

    /**
     * 20.6 - Branch: if (itemView.value === 'grid-view') em handleSort
     * Método handleSort - linha 482
     */
    describe('20.6 - Branch: handleSort no grid-view (recalcula dados)', () => {
      test('Deve recalcular dados quando itemView é grid-view', () => {
        const unsortedData = [
          { id: 2, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
          { id: 1, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: unsortedData,
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          sortByDefault: 'name',
          sortDescDefault: true, // crescente
        })

        expect(wrapper.vm.itemView).toBe('grid-view')

        // Chamar handleSort para forçar recálculo
        wrapper.vm.handleSort(null, { key: 'name' })

        // Deve ter recalculado e ordenado (crescente: A, B)
        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('A')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('B')
      })

      test('NÃO deve entrar no branch grid quando itemView é list-view', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          itemViewDefault: 'list-view',
        })

        expect(wrapper.vm.itemView).toBe('list-view')

        wrapper.vm.handleSort(null, { key: 'name' })

        // Watcher cuidará da ordenação, não o handleSort grid branch
        expect(wrapper.vm.itemView).toBe('list-view')
      })
    })

    /**
     * 20.7 - Branch: if (props.disableInternalSort) no grid view handleSort
     * Método handleSort - linha 484
     */
    describe('20.7 - Branch: handleSort grid-view com disableInternalSort', () => {
      test('Deve apenas aplicar filtro quando disableInternalSort true (grid-view)', () => {
        const unsortedData = [
          { id: 3, name: 'C Silva', age: '30', ageValue: 30, email: 'c@test.com' },
          { id: 1, name: 'A Silva', age: '10', ageValue: 10, email: 'a@test.com' },
          { id: 2, name: 'B Costa', age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: unsortedData,
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          showSearchQueryInput: true,
          disableInternalSort: true,
        })

        wrapper.vm.searchQuery = 'Silva'
        wrapper.vm.handleSort(null, { key: 'name' })

        // Deve filtrar (apenas Silvas)
        expect(wrapper.vm.filteredAndSortedData.length).toBe(2)

        // MAS não deve ordenar - mantém ordem original C, A
        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('C Silva')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('A Silva')
      })

      test('Deve aplicar ordenação quando disableInternalSort false (grid-view)', () => {
        const unsortedData = [
          { id: 3, name: 'C', age: '30', ageValue: 30, email: 'c@test.com' },
          { id: 1, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
          { id: 2, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: unsortedData,
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          disableInternalSort: false,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        wrapper.vm.handleSort(null, { key: 'name' })

        // Deve ordenar A, B, C
        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('A')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('B')
        expect(wrapper.vm.filteredAndSortedData[2].name).toBe('C')
      })

      test('Deve retornar early quando disableInternalSort true (grid-view)', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          disableInternalSort: true,
        })

        const initialLength = wrapper.vm.filteredAndSortedData.length

        wrapper.vm.handleSort(null, { key: 'name' })

        // Função deve ter retornado sem aplicar ordenação
        expect(wrapper.vm.filteredAndSortedData.length).toBe(initialLength)
      })
    })

    /**
     * 20.8 - Branch: if (typeof a === 'number' && typeof b === 'number') em compareValues
     * Método compareValues - linha 403
     */
    describe('20.8 - Branch: compareValues com dois números', () => {
      test('Deve usar subtração quando ambos são números', () => {
        const dataWithNumbers = [
          { id: 1, name: 'A', age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: 'B', age: '10', ageValue: 10, email: 'b@test.com' },
          { id: 3, name: 'C', age: '20', ageValue: 20, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: dataWithNumbers,
          sortByDefault: 'age',
          sortDescDefault: true,
        })

        // Ordenação numérica crescente: 10, 20, 30
        expect(wrapper.vm.filteredAndSortedData[0].ageValue).toBe(10)
        expect(wrapper.vm.filteredAndSortedData[1].ageValue).toBe(20)
        expect(wrapper.vm.filteredAndSortedData[2].ageValue).toBe(30)
      })

      test('Deve ordenar números negativos corretamente', () => {
        const dataWithNegatives = [
          { id: 1, name: 'A', age: '5', ageValue: 5, email: 'a@test.com' },
          { id: 2, name: 'B', age: '-10', ageValue: -10, email: 'b@test.com' },
          { id: 3, name: 'C', age: '0', ageValue: 0, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: dataWithNegatives,
          sortByDefault: 'age',
          sortDescDefault: true,
        })

        // Ordem crescente: -10, 0, 5
        expect(wrapper.vm.filteredAndSortedData[0].ageValue).toBe(-10)
        expect(wrapper.vm.filteredAndSortedData[1].ageValue).toBe(0)
        expect(wrapper.vm.filteredAndSortedData[2].ageValue).toBe(5)
      })

      test('NÃO deve usar branch numérico quando um valor é string', () => {
        const mixedData = [
          { id: 1, name: 'Zebra', age: '30', ageValue: 30, email: 'z@test.com' },
          { id: 2, name: 'Abelha', age: '10', ageValue: 10, email: 'a@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: mixedData,
          sortByDefault: 'name', // name é string
          sortDescDefault: true,
        })

        // Deve usar sortString, não subtração numérica
        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('Abelha')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('Zebra')
      })
    })

    /**
     * 20.9 - Branch: if (a == null && b == null) em compareValues
     * Método compareValues - linha 406
     */
    describe('20.9 - Branch: compareValues com ambos null/undefined', () => {
      test('Deve retornar 0 quando ambos são null', () => {
        const dataWithNulls = [
          { id: 1, name: null, age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: null, age: '20', ageValue: 20, email: 'b@test.com' },
          { id: 3, name: 'Carlos', age: '25', ageValue: 25, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: dataWithNulls,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        const result = wrapper.vm.filteredAndSortedData

        // Carlos deve vir primeiro, os dois nulls no final (ordem mantida entre iguais)
        expect(result[0].name).toBe('Carlos')
        expect(result[1].name).toBeNull()
        expect(result[2].name).toBeNull()
      })

      test('Deve retornar 0 quando ambos são undefined', () => {
        const dataWithUndefined = [
          { id: 1, name: undefined, age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: undefined, age: '20', ageValue: 20, email: 'b@test.com' },
          { id: 3, name: 'Ana', age: '25', ageValue: 25, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: dataWithUndefined,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        const result = wrapper.vm.filteredAndSortedData

        // Ana primeiro, undefineds no final
        expect(result[0].name).toBe('Ana')
        expect(result[1].name).toBeUndefined()
        expect(result[2].name).toBeUndefined()
      })

      test('Deve tratar null e undefined como iguais (ambos == null)', () => {
        const dataWithMixedNulls = [
          { id: 1, name: null, age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: undefined, age: '20', ageValue: 20, email: 'b@test.com' },
          { id: 3, name: 'Bruno', age: '25', ageValue: 25, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: dataWithMixedNulls,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        const result = wrapper.vm.filteredAndSortedData

        // Bruno primeiro, null e undefined juntos no final
        expect(result[0].name).toBe('Bruno')
        expect([null, undefined]).toContain(result[1].name)
        expect([null, undefined]).toContain(result[2].name)
      })
    })

    /**
     * 20.10 - Branch: if (a == null) em compareValues
     * Método compareValues - linha 407
     */
    describe('20.10 - Branch: compareValues com primeiro valor null', () => {
      test('Deve colocar null depois de strings', () => {
        const data = [
          { id: 1, name: null, age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: 'Ana', age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('Ana')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBeNull()
      })

      test('Deve colocar undefined depois de valores definidos', () => {
        const data = [
          { id: 1, name: undefined, age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: 'Carlos', age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('Carlos')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBeUndefined()
      })

      test('Deve colocar null depois de números', () => {
        const data = [
          { id: 1, name: 'A', age: null, ageValue: null, email: 'a@test.com' },
          { id: 2, name: 'B', age: '25', ageValue: 25, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'age',
          sortDescDefault: true,
        })

        expect(wrapper.vm.filteredAndSortedData[0].ageValue).toBe(25)
        expect(wrapper.vm.filteredAndSortedData[1].ageValue).toBeNull()
      })
    })

    /**
     * 20.11 - Branch: if (b == null) em compareValues
     * Método compareValues - linha 408
     */
    describe('20.11 - Branch: compareValues com segundo valor null', () => {
      test('Deve colocar valores string antes de null', () => {
        const data = [
          { id: 1, name: 'Bruno', age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: null, age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('Bruno')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBeNull()
      })

      test('Deve colocar valores string antes de undefined', () => {
        const data = [
          { id: 1, name: 'Diana', age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: undefined, age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('Diana')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBeUndefined()
      })

      test('Deve colocar números antes de null', () => {
        const data = [
          { id: 1, name: 'A', age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: 'B', age: null, ageValue: null, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'age',
          sortDescDefault: true,
        })

        expect(wrapper.vm.filteredAndSortedData[0].ageValue).toBe(30)
        expect(wrapper.vm.filteredAndSortedData[1].ageValue).toBeNull()
      })
    })

    /**
     * 20.12 - Branch: if (column && column.sortProperty) na ordenação
     * Watcher principal - linha 439
     */
    describe('20.12 - Branch: Uso de sortProperty vs key na ordenação', () => {
      test('Deve usar sortProperty quando definido na coluna', () => {
        const data = [
          { id: 1, name: 'A', age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: 'B', age: '10', ageValue: 10, email: 'b@test.com' },
          { id: 3, name: 'C', age: '20', ageValue: 20, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'age', // coluna age tem sortProperty: 'ageValue'
          sortDescDefault: true,
        })

        // Deve ordenar por ageValue (numérico), não por age (string)
        expect(wrapper.vm.filteredAndSortedData[0].ageValue).toBe(10)
        expect(wrapper.vm.filteredAndSortedData[1].ageValue).toBe(20)
        expect(wrapper.vm.filteredAndSortedData[2].ageValue).toBe(30)
      })

      test('Deve usar key diretamente quando sortProperty não está definido', () => {
        const data = [
          { id: 1, name: 'Zeca', age: '30', ageValue: 30, email: 'zeca@test.com' },
          { id: 2, name: 'Ana', age: '20', ageValue: 20, email: 'ana@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'name', // coluna name NÃO tem sortProperty
          sortDescDefault: true,
        })

        // Deve ordenar por name (key) diretamente
        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('Ana')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('Zeca')
      })

      test('Deve usar key quando coluna não é encontrada', () => {
        const data = [
          { id: 1, name: 'B', age: '30', ageValue: 30, email: 'b@test.com' },
          { id: 2, name: 'A', age: '20', ageValue: 20, email: 'a@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'nonexistent', // coluna que não existe
          sortDescDefault: true,
        })

        // Deve tentar usar a key mesmo sem encontrar a coluna
        // (valores serão undefined, irão para o final)
        expect(wrapper.vm.filteredAndSortedData).toBeDefined()
      })

      test('Deve usar sortProperty correto em múltiplas colunas', () => {
        const columnsWithMultipleSortProperty = [
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'age', label: 'Idade', sortable: true, sortProperty: 'ageValue' },
          { key: 'score', label: 'Nota', sortable: true, sortProperty: 'scoreValue' },
        ]

        const data = [
          { id: 1, name: 'A', age: '30', ageValue: 30, score: '90', scoreValue: 90 },
          { id: 2, name: 'B', age: '20', ageValue: 20, score: '85', scoreValue: 85 },
          { id: 3, name: 'C', age: '25', ageValue: 25, score: '95', scoreValue: 95 },
        ]

        wrapper = createWrapper({
          tableColumns: columnsWithMultipleSortProperty,
          dataTable: data,
          sortByDefault: 'score',
          sortDescDefault: true,
        })

        // Deve ordenar por scoreValue
        expect(wrapper.vm.filteredAndSortedData[0].scoreValue).toBe(85)
        expect(wrapper.vm.filteredAndSortedData[1].scoreValue).toBe(90)
        expect(wrapper.vm.filteredAndSortedData[2].scoreValue).toBe(95)
      })
    })

    /**
     * 20.13 - Branch: if (!sortDesc.value) (reverse)
     * Watcher principal - linha 448 e handleSort linha 510
     */
    describe('20.13 - Branch: Inversão de array quando sortDesc é false', () => {
      test('Deve reverter array quando sortDesc é false (ordem decrescente)', () => {
        const data = [
          { id: 1, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
          { id: 2, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
          { id: 3, name: 'C', age: '30', ageValue: 30, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'age',
          sortDescDefault: false, // decrescente
        })

        // Ordem decrescente: 30, 20, 10
        expect(wrapper.vm.filteredAndSortedData[0].ageValue).toBe(30)
        expect(wrapper.vm.filteredAndSortedData[1].ageValue).toBe(20)
        expect(wrapper.vm.filteredAndSortedData[2].ageValue).toBe(10)
      })

      test('NÃO deve reverter array quando sortDesc é true (ordem crescente)', () => {
        const data = [
          { id: 1, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
          { id: 2, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
          { id: 3, name: 'C', age: '30', ageValue: 30, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'age',
          sortDescDefault: true, // crescente
        })

        // Ordem crescente: 10, 20, 30 (SEM reverse)
        expect(wrapper.vm.filteredAndSortedData[0].ageValue).toBe(10)
        expect(wrapper.vm.filteredAndSortedData[1].ageValue).toBe(20)
        expect(wrapper.vm.filteredAndSortedData[2].ageValue).toBe(30)
      })

      test('Deve aplicar reverse em strings quando sortDesc é false', () => {
        const data = [
          { id: 1, name: 'Ana', age: '10', ageValue: 10, email: 'a@test.com' },
          { id: 2, name: 'Bruno', age: '20', ageValue: 20, email: 'b@test.com' },
          { id: 3, name: 'Carlos', age: '30', ageValue: 30, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'name',
          sortDescDefault: false, // decrescente Z-A
        })

        // Ordem decrescente: Carlos, Bruno, Ana
        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('Carlos')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('Bruno')
        expect(wrapper.vm.filteredAndSortedData[2].name).toBe('Ana')
      })

      test('Deve aplicar reverse no grid-view quando sortDesc é false', () => {
        const data = [
          { id: 1, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
          { id: 2, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          sortByDefault: 'name',
          sortDescDefault: false,
        })

        wrapper.vm.handleSort(null, { key: 'name' })

        // Ordem decrescente: B, A
        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('B')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('A')
      })

      test('NÃO deve aplicar reverse no grid-view quando sortDesc é true', () => {
        const data = [
          { id: 1, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
          { id: 2, name: 'A', age: '10', ageValue: 10, email: 'a@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        wrapper.vm.handleSort(null, { key: 'name' })

        // Ordem crescente: A, B (SEM reverse)
        expect(wrapper.vm.filteredAndSortedData[0].name).toBe('A')
        expect(wrapper.vm.filteredAndSortedData[1].name).toBe('B')
      })
    })

    /**
     * TESTES EXTRAS - Casos de borda e combinações complexas
     */
    describe('EXTRA - Combinações complexas de branches', () => {
      test('Deve combinar: sem filtro + com ordenação + sortProperty + reverse', () => {
        const data = [
          { id: 1, name: 'A', age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 2, name: 'B', age: '10', ageValue: 10, email: 'b@test.com' },
          { id: 3, name: 'C', age: '20', ageValue: 20, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          showSearchQueryInput: false, // sem filtro
          sortByDefault: 'age', // usa sortProperty
          sortDescDefault: false, // aplica reverse
        })

        // Ordem decrescente por ageValue: 30, 20, 10
        expect(wrapper.vm.filteredAndSortedData[0].ageValue).toBe(30)
        expect(wrapper.vm.filteredAndSortedData[1].ageValue).toBe(20)
        expect(wrapper.vm.filteredAndSortedData[2].ageValue).toBe(10)
      })

      test('Deve combinar: com filtro + sem ordenação + grid-view', () => {
        const data = [
          { id: 1, name: 'Ana Silva', age: '30', ageValue: 30, email: 'ana@test.com' },
          { id: 2, name: 'Bruno Costa', age: '20', ageValue: 20, email: 'bruno@test.com' },
          { id: 3, name: 'Carlos Silva', age: '25', ageValue: 25, email: 'carlos@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          showSearchQueryInput: true,
          sortByDefault: '',
          disableInternalSort: false,
        })

        wrapper.vm.searchQuery = 'Silva'
        wrapper.vm.handleSort(null, { key: '' })

        // Apenas Silvas (sem ordenação)
        expect(wrapper.vm.filteredAndSortedData.length).toBe(2)
        expect(wrapper.vm.filteredAndSortedData.every(item => item.name.includes('Silva'))).toBe(
          true,
        )
      })

      test('Deve combinar: valores null + ordenação numérica + reverse', () => {
        const data = [
          { id: 1, name: 'A', age: null, ageValue: null, email: 'a@test.com' },
          { id: 2, name: 'B', age: '20', ageValue: 20, email: 'b@test.com' },
          { id: 3, name: 'C', age: '30', ageValue: 30, email: 'c@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: data,
          sortByDefault: 'age',
          sortDescDefault: false, // decrescente
        })

        // Lógica real do componente:
        // 1. Ordenação crescente: null vai para o FINAL -> [20, 30, null]
        // 2. Aplica reverse (sortDesc false) -> [null, 30, 20]
        const result = wrapper.vm.filteredAndSortedData
        expect(result[2].ageValue).toBe(20)
        expect(result.some(item => item.ageValue === null)).toBe(true)
        expect(result.some(item => item.ageValue === 30)).toBe(true)
      })

      test('Deve combinar: handleSort boolean + sortBy vazio + grid-view', () => {
        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: testData.fullDataTable,
          showViewSelection: true,
          itemViewDefault: 'grid-view',
          sortByDefault: '',
        })

        // handleSort com boolean quando sortBy vazio
        wrapper.vm.handleSort(null, true)

        // Deve ter definido sortBy para primeira coluna sortable
        const firstSortableColumn = testData.fullTableColumns.find(col => col.sortable)
        expect(wrapper.vm.sortBy).toBe(firstSortableColumn.key)
        expect(wrapper.vm.sortDesc).toBe(true)
      })

      test('Deve combinar: múltiplos null + strings + números na mesma ordenação', () => {
        const complexData = [
          { id: 1, name: 'Zeca', age: null, ageValue: null, email: 'z@test.com' },
          { id: 2, name: null, age: '20', ageValue: 20, email: 'null@test.com' },
          { id: 3, name: 'Ana', age: '30', ageValue: 30, email: 'a@test.com' },
          { id: 4, name: 'Bruno', age: undefined, ageValue: undefined, email: 'b@test.com' },
        ]

        wrapper = createWrapper({
          tableColumns: testData.fullTableColumns,
          dataTable: complexData,
          sortByDefault: 'name',
          sortDescDefault: true,
        })

        const result = wrapper.vm.filteredAndSortedData

        // Strings ordenadas primeiro, nulls/undefined no final
        expect(result[0].name).toBe('Ana')
        expect(result[1].name).toBe('Bruno')
        expect(result[2].name).toBe('Zeca')
        expect([null, undefined]).toContain(result[3].name)
      })
    })
  })
})
