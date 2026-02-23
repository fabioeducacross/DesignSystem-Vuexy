import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getEducationSystemSeriesLabel } from '@/services/shared/educationSystem/EducationSystem.Service'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import useFilters from '@/store/filters/useFilters'
import Filters from '@/views/pages/admin-context/network-manager/education-system/schools/institutions/Filters.vue'
import { useEducationSystemInstitutions } from '@/views/pages/admin-context/network-manager/education-system/schools/institutions/useEducationSystemInstitutions.js'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock('@/services/shared/educationSystem/EducationSystem.Service')
jest.mock('@/services/shared/network-groups/NetworkGroups.Service')
jest.mock('@/store/filters/useFilters', () =>
  jest.fn(() => ({
    classe: {},
    subject: {},
    period: {},
    parentModule: {},
    childModule: {},
  })),
)
jest.mock(
  '@/views/pages/admin-context/network-manager/education-system/schools/institutions/useEducationSystemInstitutions.js',
  () => ({
    useEducationSystemInstitutions: jest.fn(),
  }),
)
jest.mock(
  '@/views/pages/admin-context/reports/educationSystem/components/useEducationSystemAdminDashboard',
  () => jest.fn(() => ({ fetchDashboardData: jest.fn() })),
)
jest.mock('@/store/table/useTable.js', () => () => ({
  loading: false,
  dataTable: [],
  reset: jest.fn(),
}))

const VueGlobal = require('vue')

const localVue = createLocalVue()

describe('Filters.vue', () => {
  let wrapper
  let Filters
  let mockResetAndfetch
  let mockClasse
  let mockSubject
  let mockSerie
  let mockEducationSystemId
  let mockNetworkGroup
  let mockFetchNetworkGroups
  let mockNetworkGroupsRef
  let mockNetworkLoadingRef

  beforeEach(() => {
    mockResetAndfetch = jest.fn()
    mockClasse = { value: [] }
    mockSubject = { value: { id: 1 } }
    mockSerie = { value: { id: 1, name: 'Serie 1' } }
    mockEducationSystemId = { value: 1 }
    mockNetworkGroup = { value: { id: 1, name: 'Group 1' } }
    mockNetworkGroupsRef = [
      { id: 1, name: 'Group 1' },
      { id: 2, name: 'Group 2' },
    ]
    mockNetworkLoadingRef = { value: false }
    mockFetchNetworkGroups = jest.fn(() => Promise.resolve())

    const {
      useEducationSystemInstitutions,
    } = require('@/views/pages/admin-context/network-manager/education-system/schools/institutions/useEducationSystemInstitutions.js')
    useEducationSystemInstitutions.mockReturnValue({
      resetAndfetch: mockResetAndfetch,
      classe: mockClasse,
      networkGroups: mockNetworkGroupsRef,
      networkGroup: mockNetworkGroup,
      networkLoading: mockNetworkLoadingRef,
      fetchNetworkGroups: mockFetchNetworkGroups,
    })
    useFilters.mockReturnValue({
      subject: mockSubject,
      serie: mockSerie,
      educationSystemId: mockEducationSystemId,
      networkGroup: mockNetworkGroup,
    })
    getEducationSystemSeriesLabel.mockResolvedValue({
      data: [{ id: 1, name: 'Serie 1' }],
    })
    getNetworkGroups.mockResolvedValue({
      data: [{ id: 1, name: 'Group 1' }],
    })
    Filters =
      require('@/views/pages/admin-context/network-manager/education-system/schools/institutions/Filters.vue').default
    wrapper = shallowMount(Filters, {
      localVue,
      stubs: {
        ESelect: {
          name: 'ESelectStub',
          props: ['options'],
          template: '<div data-test="e-select"></div>',
        },
        SelectSubject: {
          name: 'SelectSubjectStub',
          template: '<div data-test="select-subject"></div>',
        },
      },
      mocks: {
        $t: x => x,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders SelectSubject and ESelect components', () => {
    expect(wrapper.find('[data-test="select-subject"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-test="e-select"]').length).toBeGreaterThan(0)
  })

  it('calls fetchSeries and resetAndfetch on subject change', async () => {
    mockSubject.value.id = 2
    await wrapper.vm.$nextTick()
    expect(mockResetAndfetch).toHaveBeenCalled()
  })

  it('calls setSerie and resetAndfetch when serie is changed', async () => {
    wrapper.vm.setSerie({ id: 2, name: 'Serie 2' })
    expect(mockSerie.value).toEqual({ id: 2, name: 'Serie 2' })
    expect(mockResetAndfetch).toHaveBeenCalled()
  })

  it('fetches series and sets default if needed', async () => {
    mockSubject.value.id = 2
    await wrapper.vm.$nextTick()
    await Promise.resolve()
    await wrapper.vm.$nextTick()
    expect(getEducationSystemSeriesLabel).toHaveBeenCalled()
    expect(wrapper.vm.series.length).toBeGreaterThan(0)
    expect(mockSerie.value).toEqual({ id: 1, name: 'Serie 1' })
  })

  it('calls setNetworkGroup and resetAndfetch when network group is changed', () => {
    wrapper.vm.setNetworkGroup({ id: 2, name: 'Group 2' })
    expect(mockNetworkGroup.value).toEqual({ id: 2, name: 'Group 2' })
    expect(mockResetAndfetch).toHaveBeenCalled()
  })

  it('showGroups returns true if more than one group', () => {
    expect(wrapper.vm.showGroups([{ id: 1 }, { id: 2 }])).toBe(true)
    expect(wrapper.vm.showGroups([{ id: 1 }])).toBe(false)
  })

  it('networkGroups and series are initialized with default values', async () => {
    await wrapper.vm.$nextTick()
    const networkGroups = Array.isArray(wrapper.vm.networkGroups)
      ? wrapper.vm.networkGroups
      : wrapper.vm.networkGroups?.value || []
    expect(networkGroups.length).toBeGreaterThan(0)
    expect(wrapper.vm.series.length).toBeGreaterThan(0)
  })
})