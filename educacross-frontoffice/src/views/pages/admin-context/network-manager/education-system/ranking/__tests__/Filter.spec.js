import ExpandableFilterArea from '@/components/filter/ExpandableFilterArea.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import {
  getEducationSystemSeriesLabel,
  getEducationSystemGuidesLabel,
} from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getBooks } from '@/services/teacher-context/books/Books.service'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date'
import Filter from '@/views/pages/admin-context/network-manager/education-system/ranking/Filter.vue'
import { useEducationSystemRankingNetwork } from '@/views/pages/admin-context/network-manager/education-system/ranking/useEducationSystemRankingNetwork.js'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { ref } from 'vue'

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
  '@/views/pages/admin-context/network-manager/education-system/ranking/useEducationSystemRankingNetwork.js',
)
jest.mock('@/services/shared/educationSystem/EducationSystem.Service.js')
jest.mock('@/services/shared/network-groups/NetworkGroups.Service')
jest.mock('@/services/teacher-context/books/Books.service')
jest.mock('@/utils/date')
jest.mock('@/layouts/components/SelectSubject.vue', () => ({
  name: 'SelectSubject',
  render(h) {
    return h('div')
  },
}))
jest.mock('@/components/filter/ExpandableFilterArea.vue', () => ({
  name: 'ExpandableFilterArea',
  render(h) {
    return h('div', this.$slots.default)
  },
}))
jest.mock('@/components/selects/ESelect.vue', () => ({
  name: 'ESelect',
  props: ['value'],
  render(h) {
    return h('div', this.$slots.default)
  },
}))
jest.mock('@/store/table/useTable.js', () => () => ({
  loading: false,
  dataTable: [],
  reset: jest.fn(),
  tableRef: null,
}))

const localVue = createLocalVue()

const flushPromises = () => new Promise(resolve => setTimeout(resolve))

describe('Filter.vue', () => {
  let wrapper
  let mockFilters
  let mockRankingNetwork

  beforeEach(() => {
    mockFilters = {
      subject: ref({ id: 1 }),
      educationSystemId: ref(1),
      serie: ref({ id: 1 }),
      networkGroup: ref({ id: null, name: 'Todos os grupos de escolas' }),
    }
    mockRankingNetwork = {
      month: ref({ id: 1 }),
      monthFirstOption: { id: 1, name: 'Janeiro' },
      book: ref({ id: 1 }),
      classe: ref([]),
      mission: ref({ id: 1 }),
      bookFirstoption: { id: 1, name: 'Livro 1' },
      missionFirstOption: { id: 1, name: 'Missao 1' },
      bookPage: ref(1),
      missionPage: ref(1),
      fetchRanking: jest.fn(),
    }
    useFilters.mockReturnValue(mockFilters)
    useEducationSystemRankingNetwork.mockReturnValue(mockRankingNetwork)
    getMonthList.mockReturnValue([{ id: 2, name: 'Fevereiro' }])
    getEducationSystemSeriesLabel.mockResolvedValue({
      status: 200,
      data: [{ id: 1, name: '1o Ano' }],
    })
    getNetworkGroups.mockResolvedValue({ data: [{ id: 1, name: 'Grupo 1' }] })
    getBooks.mockResolvedValue({ data: { data: [{ id: 1, name: 'Livro 1' }], totalPages: 1 } })
    getEducationSystemGuidesLabel.mockResolvedValue({
      data: { data: [{ id: 1, name: 'Missao 1' }], totalPages: 1 },
    })
    wrapper = shallowMount(Filter, {
      localVue,
      stubs: {
        ExpandableFilterArea: { name: 'ExpandableFilterArea', template: '<div />' },
        ESelect: { name: 'ESelect', template: '<div />' },
        SelectSubject: { name: 'SelectSubject', template: '<div />' },
        'b-card': { template: '<div><slot /></div>' },
        'b-row': { template: '<div><slot /></div>' },
        'b-col': { template: '<div><slot /></div>' },
        'b-form-group': { template: '<div><slot /></div>' },
        'b-badge': { template: '<span><slot /></span>' },
        'b-link': { template: '<a><slot /></a>' },
      },
      mocks: {
        $t: key => key,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ESelect' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ExpandableFilterArea' }).exists()).toBe(true)
  })

  it('calls setSerie and fetchRanking when serie changes', async () => {
    const setSerie = wrapper.vm.setSerie
    setSerie({ id: 2, name: '2o Ano' })
    expect(mockRankingNetwork.fetchRanking).toHaveBeenCalled()
  })

  it('calls changeBook and fetchRanking when book changes', async () => {
    const changeBook = wrapper.vm.changeBook
    changeBook({ id: 2, name: 'Livro 2' })
    expect(mockRankingNetwork.fetchRanking).toHaveBeenCalled()
  })

  it('calls setNetworkGroup and fetchRanking when network group changes', () => {
    const setNetworkGroup = wrapper.vm.setNetworkGroup
    setNetworkGroup({ id: 2, name: 'Grupo 2' })
    expect(mockRankingNetwork.fetchRanking).toHaveBeenCalled()
  })

  it('calls cleanFilter and resets filters', () => {
    wrapper.vm.cleanFilter()

    expect(mockRankingNetwork.month.value).toEqual(mockRankingNetwork.monthFirstOption)
    expect(mockFilters.networkGroup.value).toEqual({ id: null, name: 'Todos os grupos de escolas' })
  })

  it('showGroups returns true if more than one group', () => {
    expect(wrapper.vm.showGroups([{ id: 1 }, { id: 2 }])).toBe(true)
    expect(wrapper.vm.showGroups([{ id: 1 }])).toBe(false)
  })

  it('fetchSeries sets serieOptions and calls fetchRanking', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.serieOptions[0]).toEqual({ id: 1, name: '1o Ano' })
    expect(mockRankingNetwork.fetchRanking).toHaveBeenCalled()
  })

  it('fetchBooks sets bookOptions', async () => {
    await wrapper.vm.fetchBooks()
    expect(wrapper.vm.bookOptions[0]).toEqual({ id: 1, name: 'Livro 1' })
  })

  it('fetchMissions sets missionOptions', async () => {
    await wrapper.vm.fetchMissions()
    await flushPromises()
    expect(getEducationSystemGuidesLabel).toHaveBeenCalled()
  })
})
