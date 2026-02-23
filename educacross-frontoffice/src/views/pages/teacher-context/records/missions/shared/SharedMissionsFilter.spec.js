import store from '@/store'
import SharedMissionsFilter from '@/views/pages/teacher-context/records/missions/shared/SharedMissionsFilter.vue'
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'

jest.mock('@/store/filters/useFilters', () => ({
  __esModule: true,
  default: () => ({
    subject: jest.fn(() => ({ value: { id: 1, name: 'Português' } }))(),
  }),
}))

jest.mock('@/store', () => ({
  commit: jest.fn(),
  dispatch: jest.fn(),
  getters: {
    'sharedMissionsModule/sharedTypeOptions': [
      { name: 'Todos', id: 0 },
      { name: 'Somente Eu', id: 1 },
      { name: 'Minha Escola', id: 2 },
      { name: 'Minha Rede Escolar', id: 3 },
    ],
    'sharedMissionsModule/selectedMissionType': { id: 1, name: 'Minha Escola' },
    'sharedMissionsModule/schoolYearOptions': [
      { name: 'Todos', id: null },
      { id: 1, name: '1º Ano' },
    ],
    'sharedMissionsModule/selectedSchoolYear': { name: 'Todos', id: null },
    'sharedMissionsModule/loadingSchoolYearData': false,
  },
}))

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('SharedMissionsFilter.vue', () => {
  let wrapper
  const { subject } = require('@/store/filters/useFilters').default()

  const createWrapper = () => {
    return shallowMount(SharedMissionsFilter, {
      localVue,
      stubs: {
        SelectSubject: true,
        ESelect: true,
      },
      provide: {
        subject,
      },
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('Renderização', () => {
    it('deve renderizar o componente com sucesso', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('deve renderizar o seletor de disciplina (SelectSubject)', () => {
      expect(wrapper.find('selectsubject-stub').exists()).toBe(true)
    })

    it('deve renderizar 2 seletores ESelect (Tipo e Ano Escolar)', () => {
      expect(wrapper.findAll('eselect-stub').length).toBe(2)
    })

    it('deve passar as opções corretas para o seletor de tipo de compartilhamento', () => {
      const typeSelect = wrapper.findAll('eselect-stub').at(0)
      const expectedOptions = store.getters['sharedMissionsModule/sharedTypeOptions']
      expect(typeSelect.props('options')).toEqual(expectedOptions)
    })

    it('deve passar as opções corretas para o seletor de ano escolar', () => {
      const schoolYearSelect = wrapper.findAll('eselect-stub').at(1)
      const expectedOptions = store.getters['sharedMissionsModule/schoolYearOptions']
      expect(schoolYearSelect.props('options')).toEqual(expectedOptions)
    })

    it('deve indicar o estado de carregamento no seletor de ano escolar', async () => {
      store.getters['sharedMissionsModule/loadingSchoolYearData'] = true
      wrapper = createWrapper()

      const schoolYearSelect = wrapper.findAll('eselect-stub').at(1)
      expect(schoolYearSelect.props('loading')).toBe(true)
      expect(schoolYearSelect.props('disabled')).toBe(true)
    })
  })

  describe('Interação e Eventos', () => {
    it('deve chamar a mutation "setSelectedMissionType" ao alterar o tipo de compartilhamento', async () => {
      const typeSelect = wrapper.findAll('eselect-stub').at(0)
      const newType = { id: 2, name: 'Minha Rede' }

      await typeSelect.vm.$emit('input', newType)

      expect(store.commit).toHaveBeenCalledWith(
        'sharedMissionsModule/setSelectedMissionType',
        newType,
      )
    })

    it('deve chamar a mutation "setSelectedSchoolYear" ao alterar o ano escolar', async () => {
      const schoolYearSelect = wrapper.findAll('eselect-stub').at(1)
      const newSchoolYear = { id: 1, name: '1º Ano' }

      await schoolYearSelect.vm.$emit('input', newSchoolYear)

      expect(store.commit).toHaveBeenCalledWith(
        'sharedMissionsModule/setSelectedSchoolYear',
        newSchoolYear,
      )
    })
  })
})
