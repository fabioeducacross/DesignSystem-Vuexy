import ListTable from '@/components/table/ListTable.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import { getMissionsByClass } from '@/services/shared/missions/Missions.Service'
import { getMonthList } from '@/utils/date.js'
import ClassesMissions from '@/views/pages/admin-context/reports/missions/ClassesMissions.vue'
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock('@/router', () => ({
  push: jest.fn(),
  currentRoute: {
    params: {
      classId: '123',
      institutionId: '456',
    },
  },
}))

jest.mock('@/store', () => ({
  __esModule: true,
  default: {
    getters: {
      accessRole: 'Manager',
    },
    state: {
      adminContext: {
        monthSelected: 3,
      },
    },
  },
}))

const mockUseFilters = {
  classe: { value: { ClassId: '123' } },
  institution: { value: { id: '456' } },
  subject: { value: { id: 1, name: 'Matemática' } },
}

jest.mock('@/store/filters/useFilters', () => ({
  __esModule: true,
  default: jest.fn(() => mockUseFilters),
}))

jest.mock('@/services/shared/missions/Missions.Service', () => ({
  getMissionsByClass: jest.fn(),
}))

jest.mock('@/utils/date.js', () => ({
  getMonthList: jest.fn(() => [
    { id: 1, name: 'Janeiro' },
    { id: 2, name: 'Fevereiro' },
    { id: 3, name: 'Março' },
    { id: 4, name: 'Abril' },
  ]),
}))

const mockSessionStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
})

const localVue = createLocalVue()

describe('ClassesMissions.vue', () => {
  let wrapper

  const factory = (options = {}) => {
    return shallowMount(ClassesMissions, {
      localVue,
      stubs: {
        SimpleTab: true,
        'b-card': true,
        'b-form': true,
        'b-col': true,
        'b-form-group': true,
        'b-form-radio': true,
        'b-badge': true,
        ESelect: true,
        SelectSubject: true,
        ListTable,
        ProgressBarHorizontalV2: true,
        InitialsRed: true,
        MissionStatus: true,
      },
      mocks: {
        $t: msg => msg,
        $can: jest.fn(() => true),
      },
      ...options,
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
    const store = require('@/store').default
    store.getters.accessRole = 'Manager'
    if (!store.state.adminContext) {
      store.state.adminContext = {}
    }
    store.state.adminContext.monthSelected = 3

    // Reset useFilters mock values
    mockUseFilters.classe.value = { ClassId: '123' }
    mockUseFilters.institution.value = { id: '456' }
    mockUseFilters.subject.value = { id: 1, name: 'Matemática' }

    getMissionsByClass.mockResolvedValue({
      data: {
        data: [],
        total: 0,
      },
    })

    mockSessionStorage.getItem.mockReturnValue('Turma Teste')
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
    jest.clearAllMocks()
  })

  describe('Inicialização', () => {
    it('deve inicializar filtros com valores padrão', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.filters.page).toBe(1)
      expect(wrapper.vm.filters.pageSize).toBe(10)
      expect(wrapper.vm.filters.situation).toEqual({ id: null, name: 'Todos' })
      expect(wrapper.vm.filters.month).toBeDefined()
      expect(wrapper.vm.filters.month.id).toBe(3)
      expect(wrapper.vm.filters.OrderBy).toBe(null)
      expect(wrapper.vm.filters.Ascending).toBe('true')
    })

    it('deve inicializar guideApplication com valor 1 quando tem permissão de beta features', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.guideApplication).toBe(1)
    })

    it('deve inicializar guideApplication com valor 0 quando não tem permissão de beta features', async () => {
      wrapper = factory({
        mocks: {
          $t: msg => msg,
          $can: jest.fn(() => false),
        },
      })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.guideApplication).toBe(0)
    })

    it('deve inicializar classe e institution com valores dos params da rota', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      // Valida que o componente foi inicializado corretamente com dados da rota
      expect(router.currentRoute.params.classId).toBe('123')
      expect(router.currentRoute.params.institutionId).toBe('456')
    })

    it('deve inicializar com meses do getMonthList', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(getMonthList).toHaveBeenCalled()
      expect(wrapper.vm.months.length).toBe(4)
      expect(wrapper.vm.months[0]).toEqual({ id: 1, name: 'Janeiro' })
    })

    it('deve inicializar com array de situation com 6 opções', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.situation.length).toBe(6)
      expect(wrapper.vm.situation[0]).toEqual({ id: null, name: 'Todos' })
      expect(wrapper.vm.situation[1]).toEqual({ id: 0, name: 'Não enviada' })
      expect(wrapper.vm.situation[2]).toEqual({ id: 1, name: 'Não iniciada' })
      expect(wrapper.vm.situation[3]).toEqual({ id: 2, name: 'Iniciada' })
      expect(wrapper.vm.situation[4]).toEqual({ id: 3, name: 'Finalizada' })
      expect(wrapper.vm.situation[5]).toEqual({ id: 4, name: 'Cancelada' })
    })
  })

  describe('Renderização', () => {
    it('deve renderizar ListTable com props corretas', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      const table = wrapper.findComponent(ListTable)
      expect(table.exists()).toBe(true)
      expect(table.props('loading')).toBeDefined()
      expect(table.props('dataTable')).toBeDefined()
      expect(table.props('totalData')).toBeDefined()
      expect(table.props('perPageDefault')).toBe(10)
      expect(table.props('showSearchQueryInput')).toBe(true)
    })

    it('deve renderizar colunas da tabela com estrutura completa', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      const columns = wrapper.vm.tableColumns
      expect(columns.map(c => c.key)).toEqual([
        'guideName',
        'createdBy',
        'duration',
        'students',
        'situation',
        'progress',
        'rankingEnabled',
        'actions',
      ])

      expect(columns[0]).toMatchObject({
        key: 'guideName',
        label: 'Missão',
        sortable: true,
      })

      expect(columns[3]).toMatchObject({
        key: 'students',
        label: 'Alunos',
        sortable: true,
      })

      expect(columns[4]).toMatchObject({
        key: 'situation',
        label: 'Status',
        sortable: false,
      })

      expect(columns[7]).toMatchObject({
        key: 'actions',
        label: 'Ações',
        sortable: false,
      })
    })

    it('não deve incluir institutionId nos parâmetros quando não é NetworkManager', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      await wrapper.vm.handleGetData()

      const callArgs = getMissionsByClass.mock.calls[0][1]
      expect(callArgs).not.toHaveProperty('institutionId')
    })

    it('deve renderizar radio buttons de aplicação quando tem permissão', async () => {
      wrapper = factory({
        mocks: {
          $t: msg => msg,
          $can: jest.fn((action, permission) => {
            if (action === ACTION.READ && permission === PERMISSION.GENERAL.BETA_FEATURES) {
              return true
            }
            return false
          }),
        },
      })
      await wrapper.vm.$nextTick()

      const radioButtons = wrapper.findAll('b-form-radio-stub')
      expect(radioButtons.length).toBe(2)
    })

    it('não deve renderizar radio buttons quando não tem permissão', async () => {
      wrapper = factory({
        mocks: {
          $t: msg => msg,
          $can: jest.fn(() => false),
        },
      })
      await wrapper.vm.$nextTick()

      const radioButtons = wrapper.findAll('b-form-radio-stub')
      expect(radioButtons.length).toBe(0)
    })
  })

  describe('handleGetData', () => {
    it('deve chamar getMissionsByClass com parâmetros corretos', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      await wrapper.vm.handleGetData()

      expect(getMissionsByClass).toHaveBeenCalledWith('123', {
        month: 3,
        subjectId: undefined,
        page: 1,
        PageSize: 10,
        OrderBy: null,
        Ascending: 'true',
        Application: 1,
        Situation: null,
        SubjectId: 1,
        guideName: '',
      })
    })

    it('deve incluir institutionId quando é NetworkManager', async () => {
      const store = require('@/store').default
      store.getters.accessRole = 'NetworkManager'

      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      await wrapper.vm.handleGetData()

      expect(getMissionsByClass).toHaveBeenCalledWith('123', {
        month: 3,
        subjectId: undefined,
        page: 1,
        PageSize: 10,
        OrderBy: null,
        Ascending: 'true',
        Application: 1,
        Situation: null,
        SubjectId: 1,
        guideName: '',
        institutionId: '456',
      })
    })

    it('deve incluir situation quando selecionado', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      wrapper.vm.filters.situation = { id: 2, name: 'Iniciada' }
      getMissionsByClass.mockClear()

      await wrapper.vm.handleGetData()

      expect(getMissionsByClass).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          Situation: '2',
        }),
      )
    })

    it('deve incluir guideName quando searchTerm não está vazio', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      wrapper.vm.searchTerm = 'Missão Teste'
      getMissionsByClass.mockClear()

      await wrapper.vm.handleGetData()

      expect(getMissionsByClass).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          guideName: 'Missão Teste',
        }),
      )
    })

    it('deve atualizar missionList e rows com resposta da API', async () => {
      const mockData = [
        { guideId: 1, guideName: 'Missão 1' },
        { guideId: 2, guideName: 'Missão 2' },
      ]
      getMissionsByClass.mockResolvedValueOnce({
        data: {
          data: mockData,
          total: 2,
        },
      })

      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.missionList).toEqual(mockData)
      expect(wrapper.vm.rows).toBe(2)
    })

    it('deve definir busy como false após carregar dados', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.busy).toBe(false)
    })

    it('deve definir busy como false mesmo quando API falha', async () => {
      getMissionsByClass.mockRejectedValueOnce(new Error('API Error'))

      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.busy).toBe(false)
    })
  })

  describe('changeListTable', () => {
    it('deve atualizar page e pageSize', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      wrapper.vm.changeListTable({
        currentPage: 2,
        perPage: 20,
      })

      expect(wrapper.vm.filters.page).toBe(2)
      expect(wrapper.vm.filters.pageSize).toBe(20)
    })

    it('deve chamar handleGetData após atualizar filtros', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      wrapper.vm.changeListTable({
        currentPage: 3,
        perPage: 15,
      })

      expect(getMissionsByClass).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          page: 3,
          PageSize: 15,
        }),
      )
    })

    it('deve atualizar filtros quando sortBy é fornecido', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      wrapper.vm.changeListTable({
        currentPage: 2,
        perPage: 20,
        sortBy: 'students',
        isSortDirDesc: true,
      })

      expect(wrapper.vm.filters.page).toBe(2)
      expect(wrapper.vm.filters.pageSize).toBe(20)
      expect(wrapper.vm.filters.OrderBy).toBe('students')
      expect(wrapper.vm.filters.Ascending).toBe('false')
    })

    it('deve converter isSortDirDesc: false para Ascending: true', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      wrapper.vm.changeListTable({
        currentPage: 1,
        perPage: 10,
        sortBy: 'guideName',
        isSortDirDesc: false,
      })

      expect(wrapper.vm.filters.Ascending).toBe('true')
    })

    it('deve definir OrderBy como null quando sortBy não é fornecido', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      wrapper.vm.changeListTable({
        currentPage: 1,
        perPage: 10,
        sortBy: null,
        isSortDirDesc: false,
      })

      expect(wrapper.vm.filters.OrderBy).toBe(null)
      expect(wrapper.vm.filters.Ascending).toBe('true')
    })

    it('deve incluir OrderBy e Ascending na chamada da API quando sortBy está definido', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      wrapper.vm.changeListTable({
        currentPage: 1,
        perPage: 10,
        sortBy: 'students',
        isSortDirDesc: true,
      })

      expect(getMissionsByClass).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          OrderBy: 'students',
          Ascending: 'false',
        }),
      )
    })
  })

  describe('setMonth', () => {
    it('deve atualizar filters.month', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      const newMonth = { id: 5, name: 'Maio' }
      wrapper.vm.setMonth(newMonth)

      expect(wrapper.vm.filters.month).toEqual(newMonth)
    })

    it('deve resetar page para 1', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      wrapper.vm.filters.page = 3
      wrapper.vm.setMonth({ id: 5, name: 'Maio' })

      expect(wrapper.vm.filters.page).toBe(1)
    })

    it('deve chamar handleGetData', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      wrapper.vm.setMonth({ id: 5, name: 'Maio' })

      expect(getMissionsByClass).toHaveBeenCalled()
    })
  })

  describe('setSituation', () => {
    it('deve atualizar filters.situation', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      const newSituation = { id: 2, name: 'Iniciada' }
      wrapper.vm.setSituation(newSituation)

      expect(wrapper.vm.filters.situation).toEqual(newSituation)
    })

    it('deve resetar page para 1', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      wrapper.vm.filters.page = 3
      wrapper.vm.setSituation({ id: 2, name: 'Iniciada' })

      expect(wrapper.vm.filters.page).toBe(1)
    })

    it('deve chamar handleGetData', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      getMissionsByClass.mockClear()

      wrapper.vm.setSituation({ id: 2, name: 'Iniciada' })

      expect(getMissionsByClass).toHaveBeenCalled()
    })
  })

  describe('openReport', () => {
    it('deve navegar para listReportMissionsDetail quando não é NetworkManager', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      router.push.mockClear()

      const mockItem = { guideId: 789 }
      wrapper.vm.openReport(mockItem)

      expect(router.push).toHaveBeenCalledWith({
        name: 'listReportMissionsDetail',
        params: {
          guideId: 789,
        },
      })
    })

    it('deve navegar para listReportMissionsDetailInstitution quando é NetworkManager', async () => {
      const store = require('@/store').default
      store.getters.accessRole = 'NetworkManager'

      wrapper = factory()
      await wrapper.vm.$nextTick()
      router.push.mockClear()

      const mockItem = { guideId: 789 }
      wrapper.vm.openReport(mockItem)

      expect(router.push).toHaveBeenCalledWith({
        name: 'listReportMissionsDetailInstitution',
        params: {
          guideId: 789,
          institutionId: '456',
        },
      })
    })
  })

  describe('onMounted', () => {
    it('deve chamar handleGetData ao montar o componente', async () => {
      getMissionsByClass.mockClear()

      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(getMissionsByClass).toHaveBeenCalled()
    })

    it('deve inicializar com busy true e finalizar com false', async () => {
      wrapper = factory()

      expect(wrapper.vm.busy).toBe(true)

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.busy).toBe(false)
    })
  })

  describe('Permissões e Constantes', () => {
    it('deve expor ACTION e PERMISSION', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.ACTION).toBe(ACTION)
      expect(wrapper.vm.PERMISSION).toBe(PERMISSION)
    })
  })
})
