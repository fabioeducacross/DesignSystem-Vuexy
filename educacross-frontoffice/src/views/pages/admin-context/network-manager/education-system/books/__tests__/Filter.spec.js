import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import Filter from '@/views/pages/admin-context/network-manager/education-system/books/Filter.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

const SelectSubjectStub = {
  name: 'SelectSubject',
  template: '<div class="select-subject-stub"></div>',
}

const flushPromises = () => new Promise(resolve => setTimeout(resolve))

jest.mock('@/store/filters/useFilters', () => {
  const { ref } = require('vue')
  return () => ({
    subject: ref({ id: 1 }),
    institution: ref({ id: 2 }),
    isAdmin: ref(true),
  })
})
jest.mock('@/router', () => ({
  currentRoute: { params: { educationSystemId: 123 } },
}))
jest.mock('@/services/network-manager-context/NetworkGroup.Service', () => ({
  getNetworkGroups: jest.fn(() =>
    Promise.resolve({ status: 200, data: [{ name: 'Group 1', id: 1 }] }),
  ),
}))
jest.mock('@/services/shared/educationSystem/EducationSystem.Service', () => ({
  getEducationSystemInstitutionsLabel: jest.fn(() =>
    Promise.resolve({ status: 200, data: [{ name: 'School 1', id: 1 }] }),
  ),
  getEducationSystemSeriesLabel: jest.fn(() =>
    Promise.resolve({ data: [{ name: 'Year 1', id: 1 }] }),
  ),
}))

const {
  getEducationSystemInstitutionsLabel,
  getEducationSystemSeriesLabel,
} = require('@/services/shared/educationSystem/EducationSystem.Service')

const { getNetworkGroups } = require('@/services/network-manager-context/NetworkGroup.Service')

describe('EducationSystemBooksFilterNetworkManager', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = shallowMount(Filter, {
      localVue,
      stubs: { ESelect, SelectSubject: SelectSubjectStub },
      mocks: {
        $t: key => key,
      },
    })
    await localVue.nextTick()
    await flushPromises()
  })

  it('renders SelectSubject and ESelect components', () => {
    expect(wrapper.findComponent(SelectSubject).exists()).toBe(true)
    expect(wrapper.findAllComponents(ESelect).length).toBeGreaterThan(0)
  })

  it('emits filters event when emitFilter is called', async () => {
    await wrapper.vm.emitFilter()
    expect(wrapper.emitted().filters).toBeTruthy()
    expect(wrapper.emitted().filters[0][0]).toHaveProperty('SerieId')
    expect(wrapper.emitted().filters[0][0]).toHaveProperty('InstitutionId')
    expect(wrapper.emitted().filters[0][0]).toHaveProperty('NetworkGroupId')
    expect(wrapper.emitted().filters[0][0]).toHaveProperty('OnlyInProgress')
  })

  it('calls changeSerie and resets selectedInstitution', async () => {
    wrapper.vm.selectedYear = { id: 1 }
    wrapper.vm.selectedInstitution = { id: 99 }
    await wrapper.vm.changeSerie()
    expect(wrapper.vm.selectedInstitution).toEqual({ name: 'Todas as escolas', id: null })
  })

  it('calls changeGroup and emits filter', async () => {
    await wrapper.vm.changeGroup()
    await flushPromises()
    expect(getEducationSystemInstitutionsLabel).toHaveBeenCalled()
    expect(wrapper.emitted().filters).toBeTruthy()
  })

  it('showGroups returns true if groupsOptions length > 1', () => {
    expect(wrapper.vm.showGroups([{ id: 1 }, { id: 2 }])).toBe(true)
    expect(wrapper.vm.showGroups([{ id: null }])).toBe(false)
  })

  it('fetchInstitutions sets institutionsOptions', async () => {
    await flushPromises()
    expect(wrapper.vm.institutionsOptions.length).toBeGreaterThan(0)
  })

  it('getSeries sets yearsOptions', async () => {
    await flushPromises()
    expect(wrapper.vm.yearsOptions.length).toBeGreaterThan(0)
    expect(getEducationSystemSeriesLabel).toHaveBeenCalled()
    expect(getNetworkGroups).toHaveBeenCalled()
  })
})