import ListTable from '@/components/table/ListTable.vue'
import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import router from '@/router'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getMissions } from '@/services/shared/missions/Missions.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service'
import { getMonthList } from '@/utils/date.js'
import ListMissions from '@/views/pages/admin-context/reports/missions/ListMissions.vue'
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock('@/router', () => ({
  push: jest.fn(),
}))

jest.mock('@/store', () => ({
  __esModule: true,
  default: {
    getters: {
      accessRole: 'Manager',
    },
    commit: jest.fn(),
  },
}))

const mockUseFilters = {
  subject: { value: { id: 1, name: 'Matemática' } },
  subjects: { value: [] },
}

jest.mock('@/store/filters/useFilters', () => ({
  __esModule: true,
  default: jest.fn(() => mockUseFilters),
}))

jest.mock('@/services/shared/missions/Missions.Service', () => ({
  getMissions: jest.fn(),
}))

jest.mock('@/services/shared/classes/Classes.service', () => ({
  getClassesV2Label: jest.fn(),
}))

jest.mock('@/services/shared/institution/Institutions.Service', () => ({
  getInstitutions: jest.fn(),
}))

jest.mock('@/services/shared/serie/Serie.Service', () => ({
  getSeries: jest.fn(),
}))

jest.mock('@/utils/date.js', () => ({
  getMonthList: jest.fn(() => [
    { id: 1, name: 'Janeiro' },
    { id: 2, name: 'Fevereiro' },
    { id: 3, name: 'Março' },
  ]),
}))

Object.defineProperty(window, 'sessionStorage', {
  value: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
})

const localVue = createLocalVue()

describe('ListMissions.vue', () => {
  let wrapper

  const factory = (options = {}) => {
    return shallowMount(ListMissions, {
      localVue,
      stubs: {
        SimpleTab: true,
        'b-card': true,
        'b-form': true,
        'b-col': true,
        'b-form-group': true,
        'b-badge': true,
        SelectSubject: true,
        ESelect: true,
        ListTable,
        ProgressBarHorizontalV2: true,
        ListInitialsTeacher: true,
      },
      mocks: {
        $t: msg => msg,
      },
      ...options,
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
    sessionStorage.setItem.mockClear()
    sessionStorage.getItem.mockClear()
    const store = require('@/store').default
    store.getters.accessRole = 'Manager'
    store.commit.mockClear()
    getMissions.mockResolvedValue({
      data: {
        data: [],
        total: 0,
      },
    })
    getClassesV2Label.mockResolvedValue({
      data: {
        data: [],
        totalPages: 1,
      },
    })
    getInstitutions.mockResolvedValue({
      data: [{ id: 1, name: 'Escola 1' }],
    })
    getSeries.mockResolvedValue({
      data: {
        data: [{ id: 1, name: '1º Ano' }],
      },
    })
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
      expect(wrapper.vm.filters.pageSize).toBe(15)
      expect(wrapper.vm.filters.serieIds).toBeNull()
      expect(wrapper.vm.filters.classIds).toBeDefined()
      expect(wrapper.vm.filters.subjectId).toBeNull()
    })

    it('deve ter MODULES_IDS corretos usando enum', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.MODULES_IDS).toEqual([
        ModulesEnum.BookMissions,
        ModulesEnum.EducacrossMissions,
        ModulesEnum.InclusionGuide,
      ])
    })

    it('deve inicializar networkManager como false quando não é NetworkManager', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.networkManager).toBe(false)
    })

    it('deve inicializar networkManager como true quando é NetworkManager', async () => {
      const store = require('@/store').default
      store.getters.accessRole = 'NetworkManager'
      wrapper = factory()
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.networkManager).toBe(true)
    })
  })

  describe('Renderização', () => {
    it('deve renderizar ListTable com props corretas', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      const table = wrapper.findComponent(ListTable)
      expect(table.exists()).toBe(true)
      expect(table.props('loading')).toBe(wrapper.vm.busy)
      expect(table.props('dataTable')).toEqual([])
      expect(table.props('totalData')).toBe(0)
    })

    it('deve renderizar colunas da tabela com estrutura completa', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      const columns = wrapper.vm.tableColumns
      expect(columns.map(c => c.key)).toEqual([
        'name',
        'serieName',
        'teachers',
        'expiratedGuides',
        'startedGuides',
        'progress',
        'actions',
      ])

      expect(columns[0]).toMatchObject({
        key: 'name',
        label: 'Turma',
        sortable: true,
        tdClass: 'font-bold',
      })

      expect(columns[2]).toMatchObject({
        key: 'teachers',
        label: 'Professores',
        sortable: false,
      })

      expect(columns[3]).toMatchObject({
        key: 'expiratedGuides',
        label: 'Missões finalizadas',
        sortable: true,
        tooltip: 'Total de missões que estão finalizadas no período filtrado.',
      })

      expect(columns[4]).toMatchObject({
        key: 'startedGuides',
        label: 'Missões Iniciadas',
        sortable: true,
        tooltip:
          'Total de missões que estão com status iniciadas e assim disponíveis para os alunos.',
      })

      expect(columns[5]).toMatchObject({
        key: 'progress',
        label: 'Progresso da turma',
        sortable: false,
        tooltip:
          'Percentual de jogadas completas dividido pela quantidade de jogos disponibilizados nas missões.',
      })

      expect(columns[6]).toMatchObject({
        key: 'actions',
        label: 'Ações',
        sortable: false,
        thStyle: { width: '90px' },
      })
    })

    it('não deve renderizar filtro de escola quando não é NetworkManager', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.networkManager).toBe(false)
      expect(wrapper.find('#school-group').exists()).toBe(false)
    })

    it('deve renderizar filtro de escola quando é NetworkManager', async () => {
      const store = require('@/store').default
      store.getters.accessRole = 'NetworkManager'
      wrapper = factory()
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.networkManager).toBe(true)
      expect(wrapper.find('#school-group').exists()).toBe(true)
    })
  })

  describe('changeListTable', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      wrapper.vm.filters.classIds = { id: 1, name: 'Turma 1' }
    })

    it('deve atualizar filtros quando sortBy é fornecido', async () => {
      wrapper.vm.changeListTable({
        currentPage: 2,
        perPage: 20,
        sortBy: 'name',
        isSortDirDesc: true,
      })

      expect(wrapper.vm.filters.page).toBe(2)
      expect(wrapper.vm.filters.pageSize).toBe(20)
      expect(wrapper.vm.filters.OrderBy).toBe('name')
      expect(wrapper.vm.filters.Ascending).toBe('false')
    })

    it('deve converter isSortDirDesc: false para Ascending: true', async () => {
      wrapper.vm.changeListTable({
        currentPage: 1,
        perPage: 15,
        sortBy: 'serieName',
        isSortDirDesc: false,
      })

      expect(wrapper.vm.filters.Ascending).toBe('true')
    })

    it('deve definir OrderBy como null quando sortBy não é fornecido', async () => {
      wrapper.vm.changeListTable({
        currentPage: 1,
        perPage: 15,
        sortBy: null,
        isSortDirDesc: false,
      })

      expect(wrapper.vm.filters.OrderBy).toBe(null)
    })
  })

  describe('openReport', () => {
    beforeEach(() => {
      sessionStorage.setItem.mockClear()
    })

    it('deve navegar para listMissionsSchoolByClass quando não é NetworkManager', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      const mockData = { id: 123, name: 'Turma Teste' }
      wrapper.vm.openReport(mockData)

      expect(router.push).toHaveBeenCalledWith({
        name: 'listMissionsSchoolByClass',
        params: {
          classId: 123,
        },
      })
    })

    it('deve navegar para listMissionsSchoolByClassInstitution quando é NetworkManager', async () => {
      const store = require('@/store').default
      store.getters.accessRole = 'NetworkManager'
      wrapper = factory()
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      wrapper.vm.selectedSchool = { id: 10, name: 'Escola Teste' }
      const mockData = { id: 123, name: 'Turma Teste' }
      wrapper.vm.openReport(mockData)

      expect(router.push).toHaveBeenCalledWith({
        name: 'listMissionsSchoolByClassInstitution',
        params: {
          classId: 123,
          institutionId: 10,
        },
      })
    })

    it('deve salvar className e SubjectFilterId no sessionStorage', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()

      const mockData = { id: 123, name: 'Turma Teste' }
      wrapper.vm.openReport(mockData)

      expect(sessionStorage.setItem).toHaveBeenCalledWith('className', 'Turma Teste')
      expect(sessionStorage.setItem).toHaveBeenCalledWith('SubjectFilterId', 1)
    })
  })

  describe('setSeriesSelecteds', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
    })

    it('deve atualizar serieIds e chamar fetchClasses', async () => {
      const mockSerie = { id: 1, name: '1º Ano' }

      await wrapper.vm.setSeriesSelecteds(mockSerie)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.filters.serieIds).toEqual(mockSerie)
      expect(wrapper.vm.busy).toBe(true)
      expect(getClassesV2Label).toHaveBeenCalled()
    })
  })

  describe('setMonth', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
    })

    it('deve fazer commit no store com month.id', async () => {
      wrapper.vm.filters.month = { id: 5, name: 'Maio' }

      await wrapper.vm.setMonth()

      const store = require('@/store').default
      expect(store.commit).toHaveBeenCalledWith('UPDATE_MONTH_SELECTED', 5)
    })
  })

  describe('handleGetData', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
    })

    it('deve retornar early se classIds for null', async () => {
      wrapper.vm.filters.classIds = null

      await wrapper.vm.handleGetData()

      expect(getMissions).not.toHaveBeenCalled()
    })

    it('deve chamar getMissions com params corretos', async () => {
      wrapper.vm.filters.classIds = { id: 1, name: 'Turma 1' }
      wrapper.vm.filters.serieIds = { id: 2, name: '1º Ano' }
      wrapper.vm.filters.month = { id: 3, name: 'Março' }

      getMissions.mockResolvedValue({
        data: {
          data: [{ id: 1, name: 'Missão 1' }],
          total: 10,
        },
      })

      await wrapper.vm.handleGetData()

      expect(getMissions).toHaveBeenCalledWith(
        expect.objectContaining({
          classIds: 1,
          serieIds: 2,
          month: 3,
          subjectId: 1,
        }),
      )
    })

    it('deve atualizar missionList e rows com response', async () => {
      wrapper.vm.filters.classIds = { id: 1, name: 'Turma 1' }
      const mockData = [{ id: 1, name: 'Missão 1' }]

      getMissions.mockResolvedValue({
        data: {
          data: mockData,
          total: 5,
        },
      })

      await wrapper.vm.handleGetData()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.missionList).toEqual(mockData)
      expect(wrapper.vm.rows).toBe(5)
      expect(wrapper.vm.busy).toBe(false)
    })

    it('deve incluir institutionId quando é NetworkManager', async () => {
      const store = require('@/store').default
      store.getters.accessRole = 'NetworkManager'
      wrapper = factory()
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      wrapper.vm.filters.classIds = { id: 1, name: 'Turma 1' }
      wrapper.vm.selectedSchool = { id: 10, name: 'Escola Teste' }

      await wrapper.vm.handleGetData()

      expect(wrapper.vm.filters.institutionId).toBe(10)
    })
  })

  describe('fetchClasses', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
    })

    it('deve adicionar "Todas as Turmas" quando page === 1', async () => {
      getClassesV2Label.mockResolvedValue({
        data: {
          data: [{ id: 1, name: 'Turma A' }],
          totalPages: 2,
        },
      })

      await wrapper.vm.fetchClasses(1)

      expect(wrapper.vm.classes[0]).toEqual({ name: 'Todas as Turmas', id: null })
      expect(wrapper.vm.filters.classIds).toEqual({ name: 'Todas as Turmas', id: null })
    })

    it('deve fazer append de classes em páginas subsequentes', async () => {
      wrapper.vm.classes = [{ name: 'Todas as Turmas', id: null }]
      wrapper.vm.classesPage = 2

      getClassesV2Label.mockResolvedValue({
        data: {
          data: [{ id: 2, name: 'Turma B' }],
          totalPages: 2,
        },
      })

      await wrapper.vm.fetchClasses()

      expect(wrapper.vm.classes.length).toBe(2)
      expect(wrapper.vm.classes[1]).toEqual({ id: 2, name: 'Turma B' })
    })

    it('deve incrementar classesPage após fetch', async () => {
      wrapper.vm.classesPage = 1

      getClassesV2Label.mockResolvedValue({
        data: {
          data: [],
          totalPages: 1,
        },
      })

      await wrapper.vm.fetchClasses()

      expect(wrapper.vm.classesPage).toBe(2)
    })

    it('deve chamar getClassesV2Label com params corretos incluindo serieIds.id', async () => {
      wrapper.vm.filters.serieIds = { id: 5, name: '2º Ano' }

      await wrapper.vm.fetchClasses()

      expect(getClassesV2Label).toHaveBeenCalledWith(
        expect.objectContaining({
          serieIds: 5,
          subjectId: 1,
          ModulesIds: expect.arrayContaining([ModulesEnum.Reports]),
        }),
      )
    })

    it('deve setar busyClasses como false após fetch', async () => {
      await wrapper.vm.fetchClasses()

      expect(wrapper.vm.busyClasses).toBe(false)
    })
  })

  describe('fetchSchoolYear', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
    })

    it('deve adicionar "Todos os anos" como primeira opção', async () => {
      getSeries.mockResolvedValue({
        data: {
          data: [{ id: 1, name: '1º Ano' }],
        },
      })

      await wrapper.vm.fetchSchoolYear()

      expect(wrapper.vm.schoolYearOptions[0]).toEqual({ name: 'Todos os anos', id: null })
    })

    it('deve auto-selecionar primeira opção se serieIds for null', async () => {
      wrapper.vm.filters.serieIds = null

      getSeries.mockResolvedValue({
        data: {
          data: [{ id: 1, name: '1º Ano' }],
        },
      })

      await wrapper.vm.fetchSchoolYear()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.filters.serieIds).toEqual({ name: 'Todos os anos', id: null })
    })

    it('deve chamar getSeries com params corretos', async () => {
      await wrapper.vm.fetchSchoolYear()

      expect(getSeries).toHaveBeenCalledWith({
        subjects: 1,
        modulesIds: expect.arrayContaining([ModulesEnum.Reports]),
      })
    })

    it('deve setar schoolYearLoading como false após fetch', async () => {
      await wrapper.vm.fetchSchoolYear()

      expect(wrapper.vm.schoolYearLoading).toBe(false)
    })

    it('deve lidar com erro sem quebrar', async () => {
      getSeries.mockRejectedValue(new Error('API Error'))

      await expect(wrapper.vm.fetchSchoolYear()).resolves.not.toThrow()
      expect(wrapper.vm.schoolYearLoading).toBe(false)
    })
  })

  describe('handleChangeSubject', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
    })

    it('deve resetar OrderBy, Ascending e serieIds', async () => {
      wrapper.vm.filters.OrderBy = 'name'
      wrapper.vm.filters.Ascending = 'true'
      wrapper.vm.filters.serieIds = { id: 1, name: '1º Ano' }

      wrapper.vm.handleChangeSubject()

      expect(wrapper.vm.filters.OrderBy).toBe(null)
      expect(wrapper.vm.filters.Ascending).toBe(null)
      expect(wrapper.vm.filters.serieIds).toBe(null)
    })

    it('deve setar busy como true', () => {
      wrapper.vm.busy = false

      wrapper.vm.handleChangeSubject()

      expect(wrapper.vm.busy).toBe(true)
    })

    it('deve chamar fetchSchoolYear', async () => {
      wrapper.vm.handleChangeSubject()
      await wrapper.vm.$nextTick()

      expect(getSeries).toHaveBeenCalled()
    })
  })

  describe('Integração com ListTable', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      wrapper.vm.filters.classIds = { id: 1, name: 'Turma 1' }
    })

    it('deve responder ao evento @change da ListTable', async () => {
      getMissions.mockResolvedValue({
        data: {
          data: [],
          total: 0,
        },
      })

      const table = wrapper.findComponent(ListTable)

      table.vm.$emit('change', {
        currentPage: 2,
        perPage: 20,
        sortBy: 'name',
        isSortDirDesc: true,
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.filters.page).toBe(2)
      expect(getMissions).toHaveBeenCalled()
    })
  })

  describe('Watches', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      wrapper.vm.loading = false
      wrapper.vm.filters.classIds = { id: 1, name: 'Turma 1' }
    })

    it('deve chamar handleGetData quando classIds mudar', async () => {
      getMissions.mockResolvedValue({
        data: {
          data: [],
          total: 0,
        },
      })

      wrapper.vm.filters.classIds = { id: 2, name: 'Turma 2' }
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      expect(getMissions).toHaveBeenCalled()
    })

    it('deve chamar handleGetData quando month mudar', async () => {
      getMissions.mockResolvedValue({
        data: {
          data: [],
          total: 0,
        },
      })

      wrapper.vm.filters.month = { id: 2, name: 'Fevereiro' }
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      expect(getMissions).toHaveBeenCalled()
    })

    it('não deve chamar handleGetData se loading for true', async () => {
      wrapper.vm.loading = true
      const handleGetDataSpy = jest.spyOn(wrapper.vm, 'handleGetData')

      wrapper.vm.filters.classIds = { id: 3, name: 'Turma 3' }
      await wrapper.vm.$nextTick()

      expect(handleGetDataSpy).not.toHaveBeenCalled()
    })
  })

  describe('onMounted', () => {
    it('deve inicializar meses e criar filtros', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(getMonthList).toHaveBeenCalled()
      expect(wrapper.vm.months.length).toBeGreaterThan(0)
    })

    it('deve chamar handleInstitution quando é NetworkManager', async () => {
      const store = require('@/store').default
      store.getters.accessRole = 'NetworkManager'
      wrapper = factory()
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(getInstitutions).toHaveBeenCalled()
      expect(wrapper.vm.networkManager).toBe(true)
    })
  })
})
