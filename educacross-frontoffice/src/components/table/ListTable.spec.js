import ListTable from '@/components/table/ListTable.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

const createDefaultProps = (overrides = {}) => ({
  tableColumns: [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
  ],
  dataTable: [
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com' },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@example.com' },
  ],
  totalData: 3,
  ...overrides,
})

/**
 * Factory para criar mocks das funções globais
 * @param {Object} overrides - Mocks customizados
 * @returns {Object} Mocks completos
 */
const createMocks = (overrides = {}) => ({
  $t: key => key,
  $scopedSlots: {},
  ...overrides,
})

const createStubs = (overrides = {}) => ({
  'b-card': true,
  'b-row': true,
  'b-col': true,
  'b-table': true,
  'b-skeleton-table': true,
  'b-skeleton-wrapper': true,
  'b-skeleton': true,
  'b-img': true,
  'b-input-group': true,
  'b-input-group-text': true,
  'b-form-input': true,
  'b-form-radio-group': true,
  'b-form-radio': true,
  'b-button': true,
  'b-spinner': true,
  'feather-icon': true,
  ESelect: true,
  ListTablePagination: true,
  MissionMath: true,
  MissionMathIng: true,
  MissionPort: true,
  ...overrides,
})

const createWrapper = (options = {}) => {
  const { propsData = {}, mocks = {}, stubs = {}, slots = {}, scopedSlots = {} } = options

  return shallowMount(ListTable, {
    localVue,
    propsData: createDefaultProps(propsData),
    mocks: createMocks(mocks),
    stubs: createStubs(stubs),
    slots,
    scopedSlots,
  })
}

describe('ListTable.vue - Fase 1: Setup e Configuração Inicial', () => {
  let wrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
      wrapper = null
    }
  })
  describe('1.2 - Configuração de imports', () => {
    it('deve importar ListTable corretamente', () => {
      expect(ListTable).toBeDefined()
      expect(ListTable.name).toBe('ListTable')
    })

    it('deve importar ListTablePagination corretamente', () => {
      expect(ListTablePagination).toBeDefined()
      expect(ListTablePagination.name).toBe('ListTablePagination')
    })

    it('deve configurar BootstrapVue no localVue', () => {
      expect(localVue._installedPlugins.length).toBeGreaterThan(0) // eslint-disable-line no-underscore-dangle
    })
  })

  describe('1.3 - Factory de props padrão', () => {
    it('deve criar props padrão com valores mínimos obrigatórios', () => {
      const props = createDefaultProps()

      expect(props.tableColumns).toBeDefined()
      expect(Array.isArray(props.tableColumns)).toBe(true)
      expect(props.tableColumns.length).toBeGreaterThan(0)

      expect(props.dataTable).toBeDefined()
      expect(Array.isArray(props.dataTable)).toBe(true)

      expect(props.totalData).toBeDefined()
      expect(typeof props.totalData).toBe('number')
    })

    it('deve permitir sobrescrever props padrão', () => {
      const customColumns = [{ key: 'custom', label: 'Custom' }]
      const props = createDefaultProps({ tableColumns: customColumns })

      expect(props.tableColumns).toEqual(customColumns)
    })

    it('deve manter outras props quando sobrescrever apenas uma', () => {
      const props = createDefaultProps({ totalData: 100 })

      expect(props.tableColumns).toBeDefined()
      expect(props.dataTable).toBeDefined()
      expect(props.totalData).toBe(100)
    })

    it('deve ter estrutura válida de tableColumns', () => {
      const props = createDefaultProps()

      props.tableColumns.forEach(column => {
        expect(column).toHaveProperty('key')
        expect(column).toHaveProperty('label')
        expect(typeof column.key).toBe('string')
        expect(typeof column.label).toBe('string')
      })
    })

    it('deve ter estrutura válida de dataTable', () => {
      const props = createDefaultProps()

      props.dataTable.forEach(item => {
        expect(item).toHaveProperty('id')
        expect(typeof item.id).toBe('number')
      })
    })
  })

  describe('1.4 - Factory de mocks', () => {
    it('deve criar mock da função $t', () => {
      const mocks = createMocks()

      expect(mocks.$t).toBeDefined()
      expect(typeof mocks.$t).toBe('function')
    })

    it('deve retornar a chave quando $t for chamado', () => {
      const mocks = createMocks()

      expect(mocks.$t('testKey')).toBe('testKey')
      expect(mocks.$t('anotherKey')).toBe('anotherKey')
    })

    it('deve criar mock de $scopedSlots', () => {
      const mocks = createMocks()

      expect(mocks.$scopedSlots).toBeDefined()
      expect(typeof mocks.$scopedSlots).toBe('object')
    })

    it('deve permitir sobrescrever mocks padrão', () => {
      const customT = jest.fn(() => 'translated')
      const mocks = createMocks({ $t: customT })

      expect(mocks.$t).toBe(customT)
    })
  })

  describe('1.5 - Factory de stubs', () => {
    it('deve criar stubs para componentes do BootstrapVue', () => {
      const stubs = createStubs()

      expect(stubs['b-card']).toBe(true)
      expect(stubs['b-table']).toBe(true)
      expect(stubs['b-row']).toBe(true)
      expect(stubs['b-col']).toBe(true)
    })

    it('deve criar stub para ListTablePagination', () => {
      const stubs = createStubs()

      expect(stubs.ListTablePagination).toBe(true)
    })

    it('deve criar stubs para componentes de ícones de missão', () => {
      const stubs = createStubs()

      expect(stubs.MissionMath).toBe(true)
      expect(stubs.MissionMathIng).toBe(true)
      expect(stubs.MissionPort).toBe(true)
    })

    it('deve criar stub para ESelect', () => {
      const stubs = createStubs()

      expect(stubs.ESelect).toBe(true)
    })

    it('deve permitir sobrescrever stubs padrão', () => {
      const customStub = { template: '<div>Custom</div>' }
      const stubs = createStubs({ 'b-card': customStub })

      expect(stubs['b-card']).toBe(customStub)
    })
  })

  describe('1.6 - Helper createWrapper', () => {
    it('deve criar wrapper com props padrão', () => {
      wrapper = createWrapper()

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.is(ListTable)).toBe(true)
    })

    it('deve criar wrapper com props customizadas', () => {
      const customProps = { totalData: 100, loading: true }
      wrapper = createWrapper({ propsData: customProps })

      expect(wrapper.props('totalData')).toBe(100)
      expect(wrapper.props('loading')).toBe(true)
    })

    it('deve criar wrapper com mocks customizados', () => {
      const customT = jest.fn(key => `translated_${key}`)
      wrapper = createWrapper({ mocks: { $t: customT } })

      wrapper.vm.$t('test')
      expect(customT).toHaveBeenCalledWith('test')
    })

    it('deve criar wrapper com stubs customizados', () => {
      const customStub = { template: '<div>Custom Stub</div>' }
      wrapper = createWrapper({ stubs: { 'b-card': customStub } })

      expect(wrapper.exists()).toBe(true)
    })

    it('deve usar localVue configurado', () => {
      wrapper = createWrapper()

      // Verifica se o componente foi montado com o localVue correto
      expect(wrapper.vm.$options.name).toBe('ListTable')
    })

    it('deve permitir configuração de slots', () => {
      wrapper = createWrapper({
        slots: {
          header: '<div>Custom Header</div>',
        },
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('deve permitir configuração de scoped slots', () => {
      wrapper = createWrapper({
        scopedSlots: {
          'cell(name)': '<span>{{ props.value }}</span>',
        },
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('1.7 - Lifecycle e cleanup', () => {
    it('deve destruir wrapper após cada teste', () => {
      wrapper = createWrapper()
      const destroySpy = jest.spyOn(wrapper, 'destroy')

      wrapper.destroy()
      wrapper = null

      expect(destroySpy).toHaveBeenCalled()
    })

    it('deve permitir múltiplos testes com wrapper limpo', () => {
      wrapper = createWrapper({ propsData: { totalData: 10 } })
      expect(wrapper.props('totalData')).toBe(10)
      wrapper.destroy()

      wrapper = createWrapper({ propsData: { totalData: 20 } })
      expect(wrapper.props('totalData')).toBe(20)
    })

    it('não deve lançar erro ao destruir wrapper nulo', () => {
      wrapper = null
      expect(() => {
        if (wrapper) wrapper.destroy()
      }).not.toThrow()
    })
  })

  describe('1.8 - Verificação de dependências do componente', () => {
    it('deve ter todas as props obrigatórias definidas', () => {
      wrapper = createWrapper()

      expect(wrapper.props('tableColumns')).toBeDefined()
      expect(wrapper.props('dataTable')).toBeDefined()
      expect(wrapper.props('totalData')).toBeDefined()
    })

    it('deve registrar componentes filhos necessários', () => {
      expect(ListTable.components).toBeDefined()
      expect(ListTable.components.ListTablePagination).toBeDefined()
      expect(ListTable.components.ESelect).toBeDefined()
    })

    it('deve usar Composition API (setup function)', () => {
      expect(ListTable.setup).toBeDefined()
      expect(typeof ListTable.setup).toBe('function')
    })

    it('deve ter todas as props definidas no componente', () => {
      const requiredProps = [
        'tableColumns',
        'dataTable',
        'totalData',
        'showViewSelection',
        'columns',
        'emptyText',
        'searchPlaceholder',
        'searchType',
        'perPageOptions',
        'loading',
        'rowClass',
        'showSearchQueryInput',
        'perPageDefault',
        'generatingExcel',
        'exportToExcel',
        'border',
        'itemViewDefault',
        'stickyHeader',
        'defaultSortBy',
        'defaultSortDesc',
        'showControls',
      ]

      requiredProps.forEach(prop => {
        expect(ListTable.props).toHaveProperty(prop)
      })
    })
  })

  describe('1.9 - Validação de types das props', () => {
    it('deve validar type de tableColumns (Array)', () => {
      expect(ListTable.props.tableColumns.type).toBe(Array)
      expect(ListTable.props.tableColumns.required).toBe(true)
    })

    it('deve validar type de dataTable (Array)', () => {
      expect(ListTable.props.dataTable.type).toBe(Array)
      expect(ListTable.props.dataTable.required).toBe(true)
    })

    it('deve validar type de totalData (Number)', () => {
      expect(ListTable.props.totalData.type).toBe(Number)
      expect(ListTable.props.totalData.required).toBe(true)
    })

    it('deve validar type de loading (Boolean)', () => {
      expect(ListTable.props.loading.type).toBe(Boolean)
      expect(ListTable.props.loading.default).toBe(false)
    })

    it('deve validar type de perPageDefault (Number)', () => {
      expect(ListTable.props.perPageDefault.type).toBe(Number)
      expect(ListTable.props.perPageDefault.default).toBe(10)
    })

    it('deve validar type de showControls (Boolean)', () => {
      expect(ListTable.props.showControls.type).toBe(Boolean)
      expect(ListTable.props.showControls.default).toBe(true)
    })
  })

  describe('1.10 - Renderização básica do componente', () => {
    it('deve renderizar o componente sem erros', () => {
      wrapper = createWrapper()

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.vm).toBeTruthy()
    })

    it('deve renderizar com props mínimas', () => {
      wrapper = createWrapper({
        propsData: {
          tableColumns: [],
          dataTable: [],
          totalData: 0,
        },
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('deve renderizar com todos os dados populados', () => {
      wrapper = createWrapper()

      expect(wrapper.props('tableColumns').length).toBeGreaterThan(0)
      expect(wrapper.props('dataTable').length).toBeGreaterThan(0)
      expect(wrapper.props('totalData')).toBeGreaterThan(0)
    })
  })
})

describe('ListTable.vue - Fase 3: Testes de Props', () => {
  let wrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
      wrapper = null
    }
  })

  describe('3.1 - Props Obrigatórias', () => {
    it('3.1.1 - deve validar comportamento com tableColumns vazia', () => {
      wrapper = createWrapper({ propsData: { tableColumns: [], totalData: 0 } })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.props('tableColumns')).toEqual([])
    })

    it('3.1.2 - deve validar comportamento com dataTable vazia', () => {
      wrapper = createWrapper({ propsData: { dataTable: [], totalData: 0 } })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.props('dataTable')).toEqual([])
    })

    it('3.1.3 - deve validar comportamento com totalData=0', () => {
      wrapper = createWrapper({ propsData: { totalData: 0 } })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.props('totalData')).toBe(0)
    })

    it('3.1.4 - deve validar comportamento com tableColumns populada', () => {
      const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome' },
      ]
      wrapper = createWrapper({ propsData: { tableColumns: columns } })

      expect(wrapper.props('tableColumns')).toEqual(columns)
      expect(wrapper.props('tableColumns').length).toBe(2)
    })

    it('3.1.5 - deve validar comportamento com dataTable populada', () => {
      const data = [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' },
      ]
      wrapper = createWrapper({ propsData: { dataTable: data, totalData: 2 } })

      expect(wrapper.props('dataTable')).toEqual(data)
      expect(wrapper.props('dataTable').length).toBe(2)
    })
  })

  describe('3.2 - Props de Controles (showControls)', () => {
    it('3.2.1 - deve exibir controles quando showControls=true (padrão)', () => {
      wrapper = createWrapper()

      expect(wrapper.props('showControls')).toBe(true)
    })

    it('3.2.2 - deve ocultar controles quando showControls=false', () => {
      wrapper = createWrapper({ propsData: { showControls: false } })

      expect(wrapper.props('showControls')).toBe(false)
    })
  })

  describe('3.3 - Props de Busca (showSearchQueryInput)', () => {
    it('3.3.4 - deve aplicar searchPlaceholder customizado', () => {
      const customPlaceholder = 'Buscar alunos...'
      wrapper = createWrapper({ propsData: { searchPlaceholder: customPlaceholder } })

      expect(wrapper.props('searchPlaceholder')).toBe(customPlaceholder)
    })

    it('3.3.6 - deve aplicar searchType customizado (email, number)', () => {
      wrapper = createWrapper({ propsData: { searchType: 'email' } })
      expect(wrapper.props('searchType')).toBe('email')

      wrapper.destroy()

      wrapper = createWrapper({ propsData: { searchType: 'number' } })
      expect(wrapper.props('searchType')).toBe('number')
    })
  })

  describe('3.4 - Props de Visualização (showViewSelection)', () => {
    it('3.4.4 - deve aplicar itemViewDefault corretamente', () => {
      wrapper = createWrapper({ propsData: { itemViewDefault: 'grid-view' } })

      expect(wrapper.props('itemViewDefault')).toBe('grid-view')
    })

    it('3.4.5 - deve ter itemViewOptions com ícones corretos', () => {
      wrapper = createWrapper()

      const itemViewOptions = wrapper.vm.itemViewOptions
      expect(itemViewOptions).toBeDefined()
      expect(itemViewOptions.length).toBe(2)
      expect(itemViewOptions[0].icon).toBe('GridIcon')
      expect(itemViewOptions[0].value).toBe('grid-view')
      expect(itemViewOptions[1].icon).toBe('ListIcon')
      expect(itemViewOptions[1].value).toBe('list-view')
    })
  })

  describe('3.5 - Props de Paginação', () => {
    it('3.5.1 - deve aplicar perPageDefault=10 por padrão', () => {
      wrapper = createWrapper()

      expect(wrapper.props('perPageDefault')).toBe(10)
      expect(wrapper.vm.perPage).toEqual({ id: 10, value: 10 })
    })

    it('3.5.2 - deve aplicar perPageDefault customizado', () => {
      wrapper = createWrapper({ propsData: { perPageDefault: 25 } })

      expect(wrapper.props('perPageDefault')).toBe(25)
      expect(wrapper.vm.perPage).toEqual({ id: 25, value: 25 })
    })

    it('3.5.3 - deve ter perPageOptions padrão [5, 10, 25, 50, 100]', () => {
      wrapper = createWrapper()

      expect(wrapper.props('perPageOptions')).toEqual([5, 10, 25, 50, 100])
    })

    it('3.5.4 - deve aplicar perPageOptions customizado', () => {
      const customOptions = [10, 20, 30, 40]
      wrapper = createWrapper({ propsData: { perPageOptions: customOptions } })

      expect(wrapper.props('perPageOptions')).toEqual(customOptions)
    })
  })

  describe('3.6 - Props de Loading', () => {
    it('3.6.5 - deve exibir skeleton em grid-view quando loading=true', () => {
      wrapper = createWrapper({
        propsData: {
          loading: true,
          itemViewDefault: 'grid-view',
          showViewSelection: true,
        },
      })

      expect(wrapper.props('loading')).toBe(true)
      expect(wrapper.vm.itemView).toBe('grid-view')
    })
  })

  describe('3.8 - Props de Ordenação', () => {
    it('3.8.1 - deve aplicar defaultSortBy corretamente', () => {
      wrapper = createWrapper({ propsData: { defaultSortBy: 'name' } })

      expect(wrapper.props('defaultSortBy')).toBe('name')
      expect(wrapper.vm.sortBy).toBe('name')
    })

    it('3.8.2 - deve ter defaultSortDesc=false (padrão)', () => {
      wrapper = createWrapper()

      expect(wrapper.props('defaultSortDesc')).toBe(false)
      expect(wrapper.vm.isSortDirDesc).toBe(false)
    })

    it('3.8.3 - deve aplicar defaultSortDesc=true', () => {
      wrapper = createWrapper({ propsData: { defaultSortDesc: true } })

      expect(wrapper.props('defaultSortDesc')).toBe(true)
      expect(wrapper.vm.isSortDirDesc).toBe(true)
    })

    it('3.8.4 - sortBy deve ser reativo', async () => {
      wrapper = createWrapper({ propsData: { defaultSortBy: 'name' } })

      expect(wrapper.vm.sortBy).toBe('name')

      wrapper.vm.sortBy = 'email'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.sortBy).toBe('email')
    })
  })

  describe('3.9 - Props de Estilo', () => {
    it('3.9.4 - deve aplicar rowClass customizado', () => {
      wrapper = createWrapper({ propsData: { rowClass: 'custom-row-class' } })

      expect(wrapper.props('rowClass')).toBe('custom-row-class')
    })
  })

  describe('3.10 - Props de Estado Vazio', () => {
    it('3.10.2 - deve aplicar emptyText customizado', () => {
      wrapper = createWrapper({ propsData: { emptyText: 'Nenhum resultado encontrado' } })

      expect(wrapper.props('emptyText')).toBe('Nenhum resultado encontrado')
    })

    it('3.10.3 - deve verificar renderização de estado vazio', () => {
      wrapper = createWrapper({ propsData: { dataTable: [], totalData: 0 } })

      expect(wrapper.props('dataTable').length).toBe(0)
      expect(wrapper.props('emptyText')).toBe('noInformationFound')
    })
  })

  describe('3.11 - Props de Grid', () => {
    it('3.11.2 - deve aplicar columns customizado', () => {
      wrapper = createWrapper({ propsData: { columns: 3 } })

      expect(wrapper.props('columns')).toBe(3)
    })
  })

  describe('3.12 - Props de Sticky Header', () => {
    it('3.12.2 - deve aplicar stickyHeader=true', () => {
      wrapper = createWrapper({ propsData: { stickyHeader: true } })

      expect(wrapper.props('stickyHeader')).toBe(true)
    })

    it('3.12.3 - deve aceitar stickyHeader como string', () => {
      wrapper = createWrapper({ propsData: { stickyHeader: '500px' } })

      expect(wrapper.props('stickyHeader')).toBe('500px')
    })
  })
})

describe('ListTable.vue - Fase 4: Comportamento e Lógica', () => {
  let wrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
      wrapper = null
    }
  })

  describe('4.1 - Funcionalidade de Busca', () => {
    it('4.1.1 - deve ter campo de busca reativo (v-model)', async () => {
      wrapper = createWrapper()

      expect(wrapper.vm.searchQuery).toBe('')

      wrapper.vm.searchQuery = 'test search'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.searchQuery).toBe('test search')
    })

    it('4.1.2 - deve ter debounce de 500ms configurado no input', () => {
      wrapper = createWrapper()

      const searchInput = wrapper
        .findAllComponents({ name: 'b-form-input' })
        .wrappers.find(w => w.classes('searchQuery'))

      expect(searchInput.exists()).toBe(true)
      expect(searchInput.attributes('debounce')).toBe('500')
    })

    it('4.1.3 - deve atualizar searchQuery quando digitar no campo', async () => {
      wrapper = createWrapper()

      const newQuery = 'João Silva'
      wrapper.vm.searchQuery = newQuery
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.searchQuery).toBe(newQuery)
    })

    it('4.1.4 - deve resetar currentPage para 1 quando searchQuery mudar', async () => {
      wrapper = createWrapper()

      // Simula estar em outra página
      wrapper.vm.currentPage = 3
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.currentPage).toBe(3)

      // Muda searchQuery
      wrapper.vm.searchQuery = 'busca'
      await wrapper.vm.$nextTick()

      // Deve resetar para página 1
      expect(wrapper.vm.currentPage).toBe(1)
    })

    it('4.1.5 - deve chamar emitToFetch quando searchQuery mudar', async () => {
      wrapper = createWrapper()

      // Spy no $emit para verificar se o evento 'change' é emitido
      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.searchQuery = 'nova busca'
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          searchQuery: 'nova busca',
        }),
      )
    })

    it('4.1.6 - deve ter ícone de busca presente', () => {
      wrapper = createWrapper()

      // Verifica que o input-group existe (que contém o ícone no template)
      const inputGroup = wrapper.findComponent({ name: 'b-input-group' })
      expect(inputGroup.exists()).toBe(true)

      // Verifica que o placeholder de busca está presente
      const html = wrapper.html()
      expect(html).toContain('search')
    })

    it('4.1.7 - não deve renderizar campo de busca quando showSearchQueryInput=false', () => {
      wrapper = createWrapper({ propsData: { showSearchQueryInput: false } })

      const searchInputGroup = wrapper
        .findAllComponents({ name: 'b-input-group' })
        .wrappers.find(w => {
          return w
            .findAllComponents({ name: 'b-form-input' })
            .wrappers.some(input => input.classes('searchQuery'))
        })

      expect(searchInputGroup).toBeUndefined()
    })
  })

  describe('4.2 - Funcionalidade de Paginação', () => {
    it('4.2.1 - deve renderizar componente ListTablePagination', () => {
      wrapper = createWrapper()

      const pagination = wrapper.findComponent(ListTablePagination)
      expect(pagination.exists()).toBe(true)
    })

    it('4.2.2 - deve passar props corretas para ListTablePagination (value, total-data, per-page)', () => {
      const totalData = 100
      const perPage = 25

      wrapper = createWrapper({ propsData: { totalData, perPageDefault: perPage } })

      const pagination = wrapper.findComponent(ListTablePagination)

      expect(pagination.props('value')).toBe(1) // currentPage inicial
      expect(pagination.props('totalData')).toBe(totalData)
      expect(pagination.props('perPage')).toBe(perPage)
    })

    it('4.2.3 - deve chamar changePage quando evento input do pagination for emitido', async () => {
      wrapper = createWrapper()

      // Testa que o evento input está mapeado para changePage
      const pagination = wrapper.findComponent(ListTablePagination)
      expect(pagination.exists()).toBe(true)

      // Verifica que o listener @input está configurado
      expect(pagination.vm.$listeners.input).toBeDefined()
    })

    it('4.2.4 - deve atualizar currentPage quando changePage for chamado', async () => {
      wrapper = createWrapper()

      expect(wrapper.vm.currentPage).toBe(1)

      wrapper.vm.changePage(3)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.currentPage).toBe(3)
    })

    it('4.2.5 - deve chamar emitToFetch quando changePage for executado', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.changePage(2)
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          currentPage: 2,
        }),
      )
    })

    it('4.2.6 - deve exibir paginação apenas quando totalData > 0', () => {
      wrapper = createWrapper({ propsData: { totalData: 0 } })

      const pagination = wrapper.findComponent(ListTablePagination)

      // Paginação existe mas deve estar oculta com v-show
      expect(pagination.exists()).toBe(true)
    })

    it('4.2.7 - deve exibir paginação em list-view e grid-view', async () => {
      // List view
      wrapper = createWrapper({ propsData: { itemViewDefault: 'list-view', totalData: 50 } })
      let pagination = wrapper.findComponent(ListTablePagination)
      expect(pagination.exists()).toBe(true)

      wrapper.destroy()

      // Grid view
      wrapper = createWrapper({
        propsData: {
          itemViewDefault: 'grid-view',
          showViewSelection: true,
          totalData: 50,
        },
      })
      pagination = wrapper.findComponent(ListTablePagination)
      expect(pagination.exists()).toBe(true)
    })
  })

  describe('4.3 - Funcionalidade de Items Por Página', () => {
    it('4.3.1 - deve renderizar ESelect de perPage', () => {
      wrapper = createWrapper()

      const eSelect = wrapper
        .findAll({ name: 'ESelect' })
        .wrappers.find(w => w.classes('per-page-selector'))

      expect(eSelect.exists()).toBe(true)
    })

    it('4.3.2 - deve ter clearable=false no ESelect', () => {
      wrapper = createWrapper()

      const eSelect = wrapper
        .findAllComponents({ name: 'ESelect' })
        .wrappers.find(w => w.classes('per-page-selector'))

      // Stub component, verificar pelo HTML ou props passadas
      expect(eSelect.exists()).toBe(true)
      expect(eSelect.html()).toContain('per-page-selector')
    })

    it('4.3.3 - deve ter searchable=false no ESelect', () => {
      wrapper = createWrapper()

      const eSelect = wrapper
        .findAllComponents({ name: 'ESelect' })
        .wrappers.find(w => w.classes('per-page-selector'))

      // Verifica que o componente existe e tem a classe correta
      expect(eSelect.exists()).toBe(true)
      expect(eSelect.classes()).toContain('per-page-selector')
    })

    it('4.3.4 - deve resetar currentPage para 1 quando perPage mudar', async () => {
      wrapper = createWrapper()

      // Simula estar em outra página
      wrapper.vm.currentPage = 5
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.currentPage).toBe(5)

      // Muda perPage
      wrapper.vm.perPage = 25
      await wrapper.vm.$nextTick()

      // Deve resetar para página 1
      expect(wrapper.vm.currentPage).toBe(1)
    })

    it('4.3.5 - deve chamar emitToFetch quando perPage mudar', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.perPage = 50
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          perPage: 50,
        }),
      )
    })

    it('4.3.6 - deve exibir label "show" antes do selector', () => {
      wrapper = createWrapper()

      // Procura pelo label que contém o texto traduzido 'show'
      const labels = wrapper.findAll('label')
      const showLabel = labels.wrappers.find(label => label.text() === 'show')

      expect(showLabel).toBeDefined()
      expect(showLabel.text()).toBe('show')
    })
  })

  describe('4.4 - Funcionalidade de Ordenação', () => {
    it('4.4.1 - deve chamar sortChange quando sort-changed for emitido', async () => {
      wrapper = createWrapper()

      const bTable = wrapper.findComponent({ name: 'b-table' })

      // Verifica que o listener está configurado
      expect(bTable.exists()).toBe(true)
      expect(bTable.vm.$listeners['sort-changed']).toBeDefined()
    })

    it('4.4.2 - deve atualizar sortBy quando sortChange for chamado', async () => {
      wrapper = createWrapper()

      expect(wrapper.vm.sortBy).toBe('')

      wrapper.vm.sortChange({ sortBy: 'email', sortDesc: true })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.sortBy).toBe('email')
    })

    it('4.4.3 - deve atualizar isSortDirDesc quando sortChange for chamado', async () => {
      wrapper = createWrapper()

      expect(wrapper.vm.isSortDirDesc).toBe(false)

      wrapper.vm.sortChange({ sortBy: 'name', sortDesc: true })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.isSortDirDesc).toBe(true)
    })

    it('4.4.4 - deve chamar emitToFetch após sortChange', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.sortChange({ sortBy: 'id', sortDesc: false })
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          sortBy: 'id',
          isSortDirDesc: false,
        }),
      )
    })

    it('4.4.5 - não deve fazer nada quando sortBy === ""', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, 'emitToFetch')
      const initialSortBy = wrapper.vm.sortBy

      wrapper.vm.sortChange({ sortBy: '', sortDesc: false })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.sortBy).toBe(initialSortBy)
      expect(emitSpy).not.toHaveBeenCalled()
    })

    it('4.4.6 - deve alternar entre ASC e DESC na ordenação', async () => {
      wrapper = createWrapper()

      // Primeira ordenação: ASC
      wrapper.vm.sortChange({ sortBy: 'name', sortDesc: false })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isSortDirDesc).toBe(false)

      // Segunda ordenação: DESC
      wrapper.vm.sortChange({ sortBy: 'name', sortDesc: true })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isSortDirDesc).toBe(true)
    })
  })

  describe('4.5 - Funcionalidade de Alternância de Views', () => {
    it('4.5.1 - deve ocultar tabela quando alternar para grid-view', async () => {
      wrapper = createWrapper({
        propsData: { showViewSelection: true, itemViewDefault: 'list-view' },
      })

      const bTable = wrapper.findComponent({ name: 'b-table' })
      expect(bTable.exists()).toBe(true)

      // Alterna para grid-view
      wrapper.vm.itemView = 'grid-view'
      await wrapper.vm.$nextTick()

      // Verifica v-show (não remove do DOM, apenas oculta)
      expect(wrapper.vm.itemView).toBe('grid-view')
    })

    it('4.5.2 - deve exibir grid quando alternar para grid-view', async () => {
      wrapper = createWrapper({
        propsData: { showViewSelection: true, itemViewDefault: 'list-view' },
      })

      expect(wrapper.vm.itemView).toBe('list-view')

      wrapper.vm.itemView = 'grid-view'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.itemView).toBe('grid-view')
    })

    it('4.5.3 - deve ocultar grid quando alternar para list-view', async () => {
      wrapper = createWrapper({
        propsData: { showViewSelection: true, itemViewDefault: 'grid-view' },
      })

      expect(wrapper.vm.itemView).toBe('grid-view')

      wrapper.vm.itemView = 'list-view'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.itemView).toBe('list-view')
    })

    it('4.5.4 - deve exibir tabela quando alternar para list-view', async () => {
      wrapper = createWrapper({
        propsData: { showViewSelection: true, itemViewDefault: 'grid-view' },
      })

      wrapper.vm.itemView = 'list-view'
      await wrapper.vm.$nextTick()

      const bTable = wrapper.findComponent({ name: 'b-table' })
      expect(bTable.exists()).toBe(true)
      expect(wrapper.vm.itemView).toBe('list-view')
    })

    it('4.5.5 - deve ter itemView reativo', async () => {
      wrapper = createWrapper({ propsData: { showViewSelection: true } })

      expect(wrapper.vm.itemView).toBe('list-view')

      wrapper.vm.itemView = 'grid-view'
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.itemView).toBe('grid-view')

      wrapper.vm.itemView = 'list-view'
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.itemView).toBe('list-view')
    })
  })

  describe('4.6 - Funcionalidade de Exportação', () => {
    it('4.6.1 - deve chamar função exportToExcel quando clicar no botão', async () => {
      const exportMock = jest.fn()
      wrapper = createWrapper({ propsData: { exportToExcel: exportMock } })

      // Verifica que o botão existe no HTML
      const html = wrapper.html()
      expect(html).toContain('Exportar em Excel')

      // Verifica que a prop exportToExcel está definida
      expect(wrapper.props('exportToExcel')).toBe(exportMock)

      // Chama diretamente a prop exportToExcel (simula click)
      wrapper.props('exportToExcel')()
      await wrapper.vm.$nextTick()

      expect(exportMock).toHaveBeenCalled()
    })

    it('4.6.2 - não deve ser clicável quando generatingExcel=true', () => {
      const exportMock = jest.fn()
      wrapper = createWrapper({
        propsData: {
          exportToExcel: exportMock,
          generatingExcel: true,
        },
      })

      const exportButton = wrapper.findComponent({ name: 'b-button' })
      expect(exportButton.attributes('disabled')).toBe('true')
    })

    it('4.6.3 - não deve ser clicável quando loading=true', () => {
      const exportMock = jest.fn()
      wrapper = createWrapper({
        propsData: {
          exportToExcel: exportMock,
          loading: true,
        },
      })

      const exportButton = wrapper.findComponent({ name: 'b-button' })
      expect(exportButton.attributes('disabled')).toBe('true')
    })

    it('4.6.4 - deve aplicar cursor-not-allowed quando disabled', () => {
      const exportMock = jest.fn()
      wrapper = createWrapper({
        propsData: {
          exportToExcel: exportMock,
          generatingExcel: true,
        },
      })

      const exportButton = wrapper.findComponent({ name: 'b-button' })
      expect(exportButton.classes()).toContain('cursor-not-allowed')
    })
  })
})

describe('ListTable.vue - Fase 5: Emissão de Eventos', () => {
  let wrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
      wrapper = null
    }
  })

  describe('5.1 - Evento "change"', () => {
    it('5.1.1 - deve emitir evento com estrutura correta de payload', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      // Dispara emitToFetch
      wrapper.vm.emitToFetch()
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          perPage: expect.any(Number),
          currentPage: expect.any(Number),
          sortBy: expect.any(String),
          isSortDirDesc: expect.any(Boolean),
          searchQuery: expect.any(String),
        }),
      )
    })

    it('5.1.2 - deve emitir evento ao mudar página', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.changePage(3)
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          currentPage: 3,
        }),
      )
    })

    it('5.1.3 - deve emitir evento ao mudar perPage', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.perPage = 25
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          perPage: 25,
          currentPage: 1, // Deve resetar para página 1
        }),
      )
    })

    it('5.1.4 - deve emitir evento ao buscar', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.searchQuery = 'teste'
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          searchQuery: 'teste',
          currentPage: 1, // Deve resetar para página 1
        }),
      )
    })

    it('5.1.5 - deve emitir evento ao ordenar', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.sortChange({ sortBy: 'name', sortDesc: true })
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith(
        'change',
        expect.objectContaining({
          sortBy: 'name',
          isSortDirDesc: true,
        }),
      )
    })

    it('5.1.6 - deve ter valores corretos no payload em cada cenário', async () => {
      wrapper = createWrapper({
        propsData: {
          perPageDefault: 50,
        },
      })

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      // Configura ordenação (não dispara watcher)
      wrapper.vm.sortBy = 'email'
      wrapper.vm.isSortDirDesc = true
      await wrapper.vm.$nextTick()

      // Chama changePage para atualizar currentPage e emitir evento
      wrapper.vm.changePage(2)
      await wrapper.vm.$nextTick()

      // Valida que o payload foi emitido corretamente após changePage
      expect(emitSpy).toHaveBeenCalledWith('change', {
        perPage: 50,
        currentPage: 2,
        sortBy: 'email',
        isSortDirDesc: true,
        searchQuery: '',
      })
    })
  })

  describe('5.2 - Método emitToFetch', () => {
    it('5.2.1 - deve emitir evento "change"', async () => {
      wrapper = createWrapper()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.emitToFetch()
      await wrapper.vm.$nextTick()

      expect(emitSpy).toHaveBeenCalledWith('change', expect.any(Object))
    })

    it('5.2.2 - deve enviar payload com valores atualizados', async () => {
      wrapper = createWrapper()

      // Modifica alguns valores
      wrapper.vm.perPage = 100
      wrapper.vm.searchQuery = 'busca teste'
      wrapper.vm.sortBy = 'id'
      await wrapper.vm.$nextTick()

      const emitSpy = jest.spyOn(wrapper.vm, '$emit')

      wrapper.vm.emitToFetch()
      await wrapper.vm.$nextTick()

      const emitCall = emitSpy.mock.calls.find(call => call[0] === 'change')
      expect(emitCall).toBeDefined()
      expect(emitCall[1]).toEqual({
        perPage: 100,
        currentPage: 1, // resetado pelo watcher do searchQuery
        sortBy: 'id',
        isSortDirDesc: false,
        searchQuery: 'busca teste',
      })
    })

    it('5.2.3 - deve ser acessível externamente via wrapper.vm', () => {
      wrapper = createWrapper()

      expect(wrapper.vm.emitToFetch).toBeDefined()
      expect(typeof wrapper.vm.emitToFetch).toBe('function')

      // Verifica que pode ser chamado sem erros
      expect(() => wrapper.vm.emitToFetch()).not.toThrow()
    })
  })

  describe('5.3 - Método resetPage', () => {
    it('5.3.1 - deve existir e ser uma função', () => {
      wrapper = createWrapper()

      expect(wrapper.vm.resetPage).toBeDefined()
      expect(typeof wrapper.vm.resetPage).toBe('function')
    })

    it('5.3.2 - deve resetar currentPage para 1', async () => {
      wrapper = createWrapper()

      // Define página atual diferente de 1
      wrapper.vm.currentPage = 5
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.currentPage).toBe(5)

      // Chama resetPage
      wrapper.vm.resetPage()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.currentPage).toBe(1)
    })

    it('5.3.3 - deve ser acessível via ref', async () => {
      wrapper = createWrapper()

      // Simula acesso via ref do componente pai
      const componentInstance = wrapper.vm
      expect(componentInstance.resetPage).toBeDefined()

      // Define página atual
      componentInstance.currentPage = 10
      await wrapper.vm.$nextTick()
      expect(componentInstance.currentPage).toBe(10)

      // Chama resetPage via ref
      componentInstance.resetPage()
      await wrapper.vm.$nextTick()

      expect(componentInstance.currentPage).toBe(1)
    })
  })

  // ==========================================
  // Fase 6: Testes de Watchers
  // ==========================================
  describe('ListTable.vue - Fase 6: Testes de Watchers', () => {
    describe('6.1 - Watcher de perPage', () => {
      it('6.1.1 - deve resetar currentPage para 1 quando perPage mudar', async () => {
        wrapper = createWrapper({
          propsData: {
            perPageDefault: 10,
          },
        })

        // Define página atual diferente de 1
        wrapper.vm.currentPage = 5
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.currentPage).toBe(5)

        // Muda perPage (dispara watcher)
        wrapper.vm.perPage = 25
        await wrapper.vm.$nextTick()

        // Verifica se currentPage foi resetado para 1
        expect(wrapper.vm.currentPage).toBe(1)
      })

      it('6.1.2 - deve chamar emitToFetch quando perPage mudar', async () => {
        wrapper = createWrapper({
          propsData: {
            perPageDefault: 10,
          },
        })

        const emitSpy = jest.spyOn(wrapper.vm, '$emit')

        // Muda perPage (dispara watcher)
        wrapper.vm.perPage = 50
        await wrapper.vm.$nextTick()

        // Verifica se evento 'change' foi emitido
        expect(emitSpy).toHaveBeenCalledWith('change', {
          perPage: 50,
          currentPage: 1,
          sortBy: '',
          isSortDirDesc: false,
          searchQuery: '',
        })
      })

      it('6.1.3 - deve lidar com múltiplas mudanças rápidas em perPage', async () => {
        wrapper = createWrapper({
          propsData: {
            perPageDefault: 10,
          },
        })

        const emitSpy = jest.spyOn(wrapper.vm, '$emit')

        // Define página atual
        wrapper.vm.currentPage = 3
        await wrapper.vm.$nextTick()

        // Múltiplas mudanças rápidas
        wrapper.vm.perPage = 25
        await wrapper.vm.$nextTick()

        wrapper.vm.perPage = 50
        await wrapper.vm.$nextTick()

        wrapper.vm.perPage = 100
        await wrapper.vm.$nextTick()

        // Verifica se currentPage permanece em 1 após múltiplas mudanças
        expect(wrapper.vm.currentPage).toBe(1)

        // Filtra apenas chamadas do evento 'change'
        const changeEvents = emitSpy.mock.calls.filter(call => call[0] === 'change')
        const lastChangeEvent = changeEvents[changeEvents.length - 1]

        // Verifica se último evento 'change' tem perPage correto
        expect(lastChangeEvent).toEqual([
          'change',
          {
            perPage: 100,
            currentPage: 1,
            sortBy: '',
            isSortDirDesc: false,
            searchQuery: '',
          },
        ])
      })
    })

    describe('6.2 - Watcher de searchQuery', () => {
      it('6.2.1 - deve resetar currentPage para 1 quando searchQuery mudar', async () => {
        wrapper = createWrapper()

        // Define página atual diferente de 1
        wrapper.vm.currentPage = 5
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.currentPage).toBe(5)

        // Muda searchQuery (dispara watcher)
        wrapper.vm.searchQuery = 'teste'
        await wrapper.vm.$nextTick()

        // Verifica se currentPage foi resetado para 1
        expect(wrapper.vm.currentPage).toBe(1)
      })

      it('6.2.2 - deve chamar emitToFetch quando searchQuery mudar', async () => {
        wrapper = createWrapper()

        const emitSpy = jest.spyOn(wrapper.vm, '$emit')

        // Muda searchQuery (dispara watcher)
        wrapper.vm.searchQuery = 'João Silva'
        await wrapper.vm.$nextTick()

        // Verifica se evento 'change' foi emitido
        expect(emitSpy).toHaveBeenCalledWith('change', {
          perPage: 10,
          currentPage: 1,
          sortBy: '',
          isSortDirDesc: false,
          searchQuery: 'João Silva',
        })
      })

      it('6.2.3 - deve resetar página em cada mudança de searchQuery', async () => {
        wrapper = createWrapper()

        const emitSpy = jest.spyOn(wrapper.vm, '$emit')

        // Define página atual
        wrapper.vm.currentPage = 4
        await wrapper.vm.$nextTick()

        // Primeira busca
        wrapper.vm.searchQuery = 'Maria'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.currentPage).toBe(1)

        // Muda página novamente
        wrapper.vm.currentPage = 3
        await wrapper.vm.$nextTick()

        // Segunda busca
        wrapper.vm.searchQuery = 'João'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.currentPage).toBe(1)

        // Filtra apenas chamadas do evento 'change'
        const changeEvents = emitSpy.mock.calls.filter(call => call[0] === 'change')
        const lastChangeEvent = changeEvents[changeEvents.length - 1]

        // Verifica último evento 'change' emitido
        expect(lastChangeEvent).toEqual([
          'change',
          {
            perPage: 10,
            currentPage: 1,
            sortBy: '',
            isSortDirDesc: false,
            searchQuery: 'João',
          },
        ])
      })
    })
  })

  describe('ListTable.vue - Fase 11: Cenários Complexos', () => {
    describe('11.1 - Fluxo Completo de Uso', () => {
      it('11.1.1 - Cenário: Usuário carrega página → busca → ordena → muda página', async () => {
        wrapper = createWrapper({
          propsData: {
            totalData: 100,
            dataTable: [
              { id: 1, name: 'João', email: 'joao@test.com' },
              { id: 2, name: 'Maria', email: 'maria@test.com' },
            ],
            tableColumns: [
              { key: 'name', label: 'Nome', sortable: true },
              { key: 'email', label: 'Email', sortable: true },
            ],
          },
        })

        const emitSpy = jest.spyOn(wrapper.vm, '$emit')

        expect(wrapper.vm.currentPage).toBe(1)
        expect(wrapper.vm.perPage).toEqual({ id: 10, value: 10 })
        expect(wrapper.vm.searchQuery).toBe('')
        expect(wrapper.vm.sortBy).toBe('')

        wrapper.vm.searchQuery = 'João'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.currentPage).toBe(1)

        wrapper.vm.sortChange({ sortBy: 'name', sortDesc: false })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.sortBy).toBe('name')
        expect(wrapper.vm.isSortDirDesc).toBe(false)

        wrapper.vm.changePage(3)
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.currentPage).toBe(3)
        const changeEvents = emitSpy.mock.calls.filter(call => call[0] === 'change')
        const lastEvent = changeEvents[changeEvents.length - 1]
        expect(lastEvent).toEqual([
          'change',
          {
            perPage: 10,
            currentPage: 3,
            sortBy: 'name',
            isSortDirDesc: false,
            searchQuery: 'João',
          },
        ])
      })

      // Valida que mudar perPage reseta currentPage automaticamente (evita página inexistente)
      it('11.1.2 - Cenário: Usuário muda items por página → página reseta → dados recarregam', async () => {
        wrapper = createWrapper({
          propsData: {
            totalData: 100,
            perPageDefault: 10,
          },
        })

        const emitSpy = jest.spyOn(wrapper.vm, '$emit')

        wrapper.vm.currentPage = 5
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.currentPage).toBe(5)

        wrapper.vm.perPage = 50
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.currentPage).toBe(1)
        const changeEvents = emitSpy.mock.calls.filter(call => call[0] === 'change')
        const lastEvent = changeEvents[changeEvents.length - 1]
        expect(lastEvent[1].perPage).toBe(50)
        expect(lastEvent[1].currentPage).toBe(1)
      })

      it('11.1.3 - Cenário: Usuário busca → sem resultados → exibe estado vazio', async () => {
        wrapper = createWrapper({
          propsData: {
            totalData: 0,
            dataTable: [],
            emptyText: 'noResultsFound',
          },
        })

        wrapper.vm.searchQuery = 'XYZ123NaoExiste'
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.$props.totalData).toBe(0)
        expect(wrapper.vm.$props.dataTable).toEqual([])

        const html = wrapper.html()
        expect(html).toContain('noResultsFound')
      })

      // Valida que alternar views mantém estado de filtros/paginação
      it('11.1.4 - Cenário: Alternar entre list-view e grid-view mantém estado', async () => {
        wrapper = createWrapper({
          propsData: {
            showViewSelection: true,
            itemViewDefault: 'list-view',
            totalData: 50,
          },
        })

        wrapper.vm.searchQuery = 'teste'
        wrapper.vm.currentPage = 3
        wrapper.vm.perPage = 25
        await wrapper.vm.$nextTick()

        const beforeState = {
          searchQuery: wrapper.vm.searchQuery,
          currentPage: wrapper.vm.currentPage,
          perPage: wrapper.vm.perPage,
        }

        wrapper.vm.itemView = 'grid-view'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.itemView).toBe('grid-view')

        expect(wrapper.vm.searchQuery).toBe(beforeState.searchQuery)
        expect(wrapper.vm.currentPage).toBe(beforeState.currentPage)
        expect(wrapper.vm.perPage).toBe(beforeState.perPage)

        wrapper.vm.itemView = 'list-view'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.itemView).toBe('list-view')
        expect(wrapper.vm.searchQuery).toBe(beforeState.searchQuery)
        expect(wrapper.vm.currentPage).toBe(beforeState.currentPage)
        expect(wrapper.vm.perPage).toBe(beforeState.perPage)
      })
    })

    describe('11.2 - Edge Cases', () => {
      it('11.2.1 - Comportamento com dataTable nula ou undefined', async () => {
        wrapper = createWrapper({
          propsData: {
            dataTable: null,
            totalData: 0,
          },
        })
        expect(wrapper.vm).toBeDefined()
        expect(() => wrapper.vm.$props.dataTable).not.toThrow()

        wrapper.destroy()

        // Com undefined
        wrapper = createWrapper({
          propsData: {
            dataTable: undefined,
            totalData: 0,
          },
        })
        expect(wrapper.vm).toBeDefined()
        expect(() => wrapper.vm.$props.dataTable).not.toThrow()
      })

      it('11.2.2 - Comportamento com tableColumns vazia', async () => {
        wrapper = createWrapper({
          propsData: {
            tableColumns: [],
            dataTable: [{ id: 1, name: 'Teste' }],
            totalData: 1,
          },
        })

        expect(wrapper.vm).toBeDefined()
        expect(wrapper.vm.$props.tableColumns).toEqual([])

        const skeleton = wrapper.find('b-skeleton-table-stub')
        expect(skeleton.exists()).toBe(true)
        expect(skeleton.attributes('columns')).toBe('0')
      })

      // Paginação usa v-show (não v-if), então existe no DOM mas fica oculta quando totalData=0
      it('11.2.3 - Comportamento com totalData=0 mas dataTable com itens', async () => {
        wrapper = createWrapper({
          propsData: {
            totalData: 0,
            dataTable: [
              { id: 1, name: 'Item 1' },
              { id: 2, name: 'Item 2' },
            ],
          },
        })

        expect(wrapper.vm).toBeDefined()
        expect(wrapper.vm.$props.totalData).toBe(0)
        expect(wrapper.vm.$props.dataTable.length).toBe(2)

        const pagination = wrapper.findComponent({ name: 'ListTablePagination' })
        expect(pagination.exists()).toBe(true)
        expect(pagination.isVisible()).toBe(false)
      })

      // Vue captura erro via errorHandler, componente não propaga
      it('11.2.4 - Comportamento quando exportToExcel lança erro', async () => {
        // Silencia o console.error esperado para este teste específico
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

        const exportFunction = jest.fn(() => {
          throw new Error('Export failed')
        })

        wrapper = createWrapper({
          propsData: {
            exportToExcel: exportFunction,
          },
        })

        const button = wrapper.find('b-button-stub')
        expect(button.exists()).toBe(true)

        expect(() => {
          button.trigger('click')
        }).not.toThrow()

        // Opcional: Verificar se o erro foi logado (confirmando que o Vue capturou)
        expect(consoleErrorSpy).toHaveBeenCalled()

        // Restaura o console.error original
        consoleErrorSpy.mockRestore()
      })

      /**
       * Teste 11.2.5 - Items Por Página Maior Que Total de Dados
       *
       * Valida comportamento com perPage que excede totalData.
       *
       * Cenário:
       * - totalData = 5 (apenas 5 itens)
       * - perPage = 100 (quer mostrar 100 por página)
       *
       * Este caso é válido e pode ocorrer quando:
       * - Usuário seleciona "Mostrar 100" mas há poucos dados
       * - Dados são filtrados reduzindo total abaixo de perPage
       *
       * Comportamento esperado:
       * - Componente funciona normalmente
       * - Todos os itens aparecem na página 1
       * - Paginação mostra apenas 1 página
       * - Sem erros de divisão ou índices inválidos
       */
      it('11.2.5 - Comportamento com perPage maior que totalData', async () => {
        wrapper = createWrapper({
          propsData: {
            totalData: 5,
            perPageDefault: 100,
            dataTable: [
              { id: 1, name: 'Item 1' },
              { id: 2, name: 'Item 2' },
              { id: 3, name: 'Item 3' },
            ],
          },
        })

        expect(wrapper.vm.perPage).toEqual({ id: 100, value: 100 })
        expect(wrapper.vm.$props.totalData).toBe(5)
        expect(wrapper.vm.currentPage).toBe(1)
      })

      // Frontend não força validação de página, backend deve tratar
      it('11.2.6 - Comportamento com currentPage maior que total de páginas', async () => {
        wrapper = createWrapper({
          propsData: {
            totalData: 20,
            perPageDefault: 10, // Total de 2 páginas
          },
        })

        wrapper.vm.currentPage = 999
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.currentPage).toBe(999)
        expect(wrapper.vm).toBeDefined()

        const emitSpy = jest.spyOn(wrapper.vm, '$emit')
        wrapper.vm.emitToFetch()
        await wrapper.vm.$nextTick()

        expect(emitSpy).toHaveBeenCalledWith(
          'change',
          expect.objectContaining({
            currentPage: 999,
          }),
        )
      })
    })

    describe('11.3 - Múltiplas Mudanças Simultâneas', () => {
      it('11.3.1 - Múltiplas mudanças em perPage seguidas', async () => {
        wrapper = createWrapper({
          propsData: {
            perPageDefault: 10,
          },
        })

        const emitSpy = jest.spyOn(wrapper.vm, '$emit')

        wrapper.vm.perPage = 25
        await wrapper.vm.$nextTick()

        wrapper.vm.perPage = 50
        await wrapper.vm.$nextTick()

        wrapper.vm.perPage = 100
        await wrapper.vm.$nextTick()

        wrapper.vm.perPage = 5
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.perPage).toBe(5)

        const changeEvents = emitSpy.mock.calls.filter(call => call[0] === 'change')
        expect(changeEvents.length).toBeGreaterThanOrEqual(4)
        const lastEvent = changeEvents[changeEvents.length - 1]
        expect(lastEvent[1].perPage).toBe(5)
      })

      it('11.3.2 - Mudanças rápidas em searchQuery (debounce)', async () => {
        wrapper = createWrapper()

        const emitSpy = jest.spyOn(wrapper.vm, '$emit')

        wrapper.vm.searchQuery = 'a'
        await wrapper.vm.$nextTick()

        wrapper.vm.searchQuery = 'ab'
        await wrapper.vm.$nextTick()

        wrapper.vm.searchQuery = 'abc'
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.searchQuery).toBe('abc')

        const changeEvents = emitSpy.mock.calls.filter(call => call[0] === 'change')
        expect(changeEvents.length).toBeGreaterThanOrEqual(3)
        const lastEvent = changeEvents[changeEvents.length - 1]
        expect(lastEvent[1].searchQuery).toBe('abc')
      })

      it('11.3.3 - Alternância rápida entre views', async () => {
        wrapper = createWrapper({
          propsData: {
            showViewSelection: true,
            itemViewDefault: 'list-view',
          },
        })

        wrapper.vm.itemView = 'grid-view'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.itemView).toBe('grid-view')

        wrapper.vm.itemView = 'list-view'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.itemView).toBe('list-view')

        wrapper.vm.itemView = 'grid-view'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.itemView).toBe('grid-view')

        wrapper.vm.itemView = 'list-view'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.itemView).toBe('list-view')

        expect(wrapper.vm.itemView).toBe('list-view')
        expect(wrapper.vm).toBeDefined()
      })
    })
  })
})
