import EvaluationReportFilter from '@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportFilter.vue'
import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'

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

// Mock do store
jest.mock('@/store', () => ({
  default: {
    getters: {},
    dispatch: jest.fn(),
    commit: jest.fn(),
  },
}))

const localVue = createLocalVue()
localVue.use(BootstrapVue)

// Mock do composable useEvaluationReport
const mockGetStudentData = jest.fn()
const mockTest = { value: null }
const mockProficiency = { value: null }
const mockTestOptions = { value: [] }

jest.mock('@/views/pages/reading-meter-V2/evaluation-report/useEvaluationReport.js', () => ({
  useEvaluationReport: () => ({
    test: mockTest,
    proficiency: mockProficiency,
    testOptions: mockTestOptions,
    getStudentData: mockGetStudentData,
  }),
}))

describe('EvaluationReportFilter', () => {
  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
    mockTest.value = null
    mockProficiency.value = null
    mockTestOptions.value = [
      { id: 1, name: 'Teste 1', type: 1 },
      { id: 2, name: 'Teste 2', type: 2 },
    ]

    wrapper = mount(EvaluationReportFilter, {
      localVue,
      stubs: {
        ESelect: true,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('Renderização do componente', () => {
    test('deve renderizar BCard contendo exatamente 2 BFormGroup', () => {
      expect(wrapper.findComponent({ name: 'BCard' }).exists()).toBe(true)
      expect(wrapper.findAllComponents({ name: 'BFormGroup' })).toHaveLength(2)
    })

    test('deve renderizar primeiro BFormGroup com label "Teste"', () => {
      const formGroups = wrapper.findAllComponents({ name: 'BFormGroup' })
      expect(formGroups.at(0).props('label')).toBe('Teste')
    })

    test('deve renderizar segundo BFormGroup com label "Proficiência Leitora"', () => {
      const formGroups = wrapper.findAllComponents({ name: 'BFormGroup' })
      expect(formGroups.at(1).props('label')).toBe('Proficiência Leitora')
    })

    test('deve renderizar exatamente 2 componentes ESelect (um para cada filtro)', () => {
      expect(wrapper.findAll('eselect-stub')).toHaveLength(2)
    })

    test('deve renderizar ambos comboboxes ESelect habilitados (sem atributo disabled) para professores na listagem de alunos', () => {
      const selects = wrapper.findAll('eselect-stub')
      expect(selects.at(0).attributes('disabled')).toBeUndefined()
      expect(selects.at(1).attributes('disabled')).toBeUndefined()
    })
  })

  describe('Opções de Proficiência', () => {
    test('deve inicializar com as opções de proficiência corretas', () => {
      const proficiencyOptions = wrapper.vm.proficiencyOptions
      expect(proficiencyOptions).toHaveLength(6)
      expect(proficiencyOptions[0]).toEqual({ name: 'Todas proficiências', id: null })
      expect(proficiencyOptions[1]).toEqual({ name: 'Abaixo do básico', id: 1 })
      expect(proficiencyOptions[2]).toEqual({ name: 'Básico', id: 2 })
      expect(proficiencyOptions[3]).toEqual({ name: 'Adequado', id: 3 })
      expect(proficiencyOptions[4]).toEqual({ name: 'Avançado', id: 4 })
      expect(proficiencyOptions[5]).toEqual({ name: 'Não finalizado', id: '0' })
    })

    test('deve inicializar com "Todas proficiências" selecionada', () => {
      expect(mockProficiency.value).toEqual({ name: 'Todas proficiências', id: null })
    })
  })

  describe('Ícones dos testes', () => {
    test('deve retornar ícone de lista para tipo 1', () => {
      const result = wrapper.vm.setIcon(1)
      expect(result).toEqual({ icon: 'format_list_numbered', class: 'bg-list' })
    })

    test('deve retornar ícone de livro para tipo 2', () => {
      const result = wrapper.vm.setIcon(2)
      expect(result).toEqual({ icon: 'book_6', class: 'bg-book' })
    })

    test('deve retornar vazio para tipo não mapeado', () => {
      const result = wrapper.vm.setIcon(3)
      expect(result).toEqual({ icon: '', class: '' })
    })
  })

  describe('Mudanças de filtro', () => {
    test('deve chamar getStudentData quando evento @change do ESelect de teste for emitido', async () => {
      const testSelect = wrapper.findAll('eselect-stub').at(0)
      await testSelect.vm.$emit('change')
      expect(mockGetStudentData).toHaveBeenCalledTimes(1)
    })

    test('deve chamar getStudentData quando evento @change do ESelect de proficiência for emitido', async () => {
      const proficiencySelect = wrapper.findAll('eselect-stub').at(1)
      await proficiencySelect.vm.$emit('change')
      expect(mockGetStudentData).toHaveBeenCalledTimes(1)
    })
  })

  describe('Integração com store', () => {
    test('deve passar options do composable testOptions para ESelect de teste', () => {
      const testSelect = wrapper.findAll('eselect-stub').at(0)
      expect(testSelect.attributes('options')).toBeDefined()
    })

    test('deve configurar label="name" no ESelect de teste para exibição', () => {
      const testSelect = wrapper.findAll('eselect-stub').at(0)
      expect(testSelect.attributes('label')).toBe('name')
    })

    test('deve configurar label="name" no ESelect de proficiência para exibição', () => {
      const proficiencySelect = wrapper.findAll('eselect-stub').at(1)
      expect(proficiencySelect.attributes('label')).toBe('name')
    })
  })
})