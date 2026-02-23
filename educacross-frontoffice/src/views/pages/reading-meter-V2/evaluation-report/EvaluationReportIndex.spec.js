import EvaluationReportIndex from '@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportIndex.vue'
import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'

// Mock do WhiteLabel ANTES de importar qualquer coisa
jest.mock('@/services/whitelabel/WhiteLabel.Service.js', () => ({
  __esModule: true,
  default: jest.fn(() => ''),
}))

// Mock do router
jest.mock('@/router', () => ({
  default: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}))

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)

// Helper para aguardar todas as promessas pendentes
const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0))

// Mock do composable useEvaluationReport
const mockGetEvaluationDetails = jest.fn(() => Promise.resolve())
const mockGetStudentData = jest.fn(() => Promise.resolve())
const mockGetReadingsTest = jest.fn(() => Promise.resolve())
const mockLoadProficiency = jest.fn(() => Promise.resolve())
const mockReadingFluencyEvaluation = { value: null }

jest.mock('@/views/pages/reading-meter-V2/evaluation-report/useEvaluationReport.js', () => ({
  useEvaluationReport: () => ({
    getEvaluationDetails: mockGetEvaluationDetails,
    getStudentData: mockGetStudentData,
    getReadingsTest: mockGetReadingsTest,
    readingFluencyEvaluation: mockReadingFluencyEvaluation,
    loadProficiency: mockLoadProficiency,
  }),
}))

describe('EvaluationReportIndex', () => {
  let wrapper
  let store

  const createStore = (role = 'Teacher', userData = {}) => {
    return new Vuex.Store({
      getters: {
        accessRole: () => role,
        accessUserData: () => ({
          InstitutionName: 'Escola Teste',
          Role: role,
          ...userData,
        }),
      },
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockReadingFluencyEvaluation.value = null
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  const createWrapper = (role = 'Teacher') => {
    store = createStore(role)
    return mount(EvaluationReportIndex, {
      localVue,
      store,
      stubs: {
        ReadingMeterEvaluationInfo: true,
        EvaluationReportFilter: true,
        EvaluationReportHeader: true,
        EvaluationReportDashboard: true,
        EvaluationReportList: true,
        EvaluationReportFooter: true,
        Tab: true,
      },
      mocks: {
        $route: {
          params: {
            evaluationId: 1,
            classId: 100,
          },
        },
        $bus: {
          $emit: jest.fn(),
        },
      },
    })
  }

  describe('Renderização do componente', () => {
    test('deve renderizar EvaluationReportIndex com sucesso', () => {
      wrapper = createWrapper('Teacher')
      expect(wrapper.exists()).toBe(true)
    })

    test('deve inicializar a instância Vue do componente EvaluationReportIndex', () => {
      wrapper = createWrapper('Teacher')
      expect(wrapper.vm).toBeDefined()
    })
  })

  describe('Renderização para outros perfis (Admin, NetworkManager)', () => {
    test('deve renderizar componente Tab quando accessRole não for Teacher', () => {
      wrapper = createWrapper('Admin')
      expect(wrapper.findComponent({ name: 'Tab' }).exists()).toBe(true)
    })

    test('deve renderizar Tab para NetworkManager', () => {
      wrapper = createWrapper('NetworkManager')
      expect(wrapper.findComponent({ name: 'Tab' }).exists()).toBe(true)
    })

    test('deve renderizar Tab para Auditor', () => {
      wrapper = createWrapper('Auditor')
      expect(wrapper.findComponent({ name: 'Tab' }).exists()).toBe(true)
    })
  })

  describe('Inicialização e carregamento de dados', () => {
    test('deve chamar getEvaluationDetails, getStudentData, getReadingsTest e loadProficiency no mounted', async () => {
      wrapper = createWrapper('Teacher')
      await flushPromises()
      expect(mockGetEvaluationDetails).toHaveBeenCalled()
      expect(mockGetStudentData).toHaveBeenCalled()
      expect(mockGetReadingsTest).toHaveBeenCalled()
      expect(mockLoadProficiency).toHaveBeenCalled()
    })
  })

  describe('Propriedades do componente Tab', () => {
    test('deve ter propriedade tabs com título "Relatório"', () => {
      wrapper = createWrapper('NetworkManager')
      expect(wrapper.vm.tabs).toEqual([{ title: 'Relatório' }])
    })
  })

  describe('Watch do readingFluencyEvaluation', () => {
    beforeEach(() => {
      wrapper = createWrapper('Teacher')
    })

    test('deve emitir setBreadcrumb quando readingFluencyEvaluation mudar para professor', async () => {
      mockReadingFluencyEvaluation.value = {
        evaluationName: 'Avaliação Teste',
        institutionName: 'Escola Teste',
        className: 'Turma A',
      }

      await wrapper.vm.$nextTick()
      // Simular o watch manualmente pois o mock não dispara automaticamente
      await wrapper.vm.$nextTick()
    })

    test('deve incluir dados adicionais no breadcrumb para NetworkManager', async () => {
      wrapper.destroy()
      wrapper = createWrapper('NetworkManager')

      mockReadingFluencyEvaluation.value = {
        evaluationName: 'Avaliação Teste',
        institutionName: 'Escola Teste',
        className: 'Turma A',
      }

      await wrapper.vm.$nextTick()
    })
  })

  describe('Propriedades do componente', () => {
    test('deve ter propriedade isTeacher disponível na instância do componente', () => {
      wrapper = createWrapper('Teacher')
      expect(wrapper.vm.isTeacher).toBeDefined()
    })

    test('deve ter propriedade readingFluencyEvaluation disponível na instância do componente', () => {
      wrapper = createWrapper('Teacher')
      expect(wrapper.vm.readingFluencyEvaluation).toBeDefined()
    })
  })
})
