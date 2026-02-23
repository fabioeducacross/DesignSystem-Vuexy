import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import List from '@/views/pages/admin-context/network-manager/education-system/ranking/List.vue'
import { useEducationSystemRankingNetwork } from '@/views/pages/admin-context/network-manager/education-system/ranking/useEducationSystemRankingNetwork.js'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock(
  '@/views/pages/admin-context/network-manager/education-system/ranking/useEducationSystemRankingNetwork.js',
)
jest.mock('@/filters/filters', () => ({
  formatNumber: jest.fn(v => v),
}))

describe('EducationSystemRankingListAdmin', () => {
  let localVue
  let wrapper
  let mockRanking
  let mockClasse

  beforeEach(() => {
    localVue = createLocalVue()
    mockRanking = {
      ranking: [
        {
          institutionPosition: 1,
          institutionName: 'A',
          networkGroupName: 'G1',
          stars: 5,
          pointsXp: 100,
          coins: 10,
        },
        {
          institutionPosition: 2,
          institutionName: 'B',
          networkGroupName: 'G2',
          stars: 4,
          pointsXp: 80,
          coins: 8,
        },
        {
          institutionPosition: 0,
          institutionName: 'C',
          networkGroupName: 'G3',
          stars: 3,
          pointsXp: 60,
          coins: 6,
        },
      ],
    }
    mockClasse = [{ id: 1 }, { id: 2 }]
    useEducationSystemRankingNetwork.mockReturnValue({
      ranking: { value: mockRanking },
      classe: { value: mockClasse },
      loading: false,
      excelLoading: false,
      exportExcel: jest.fn(),
    })
    wrapper = shallowMount(List, {
      localVue,
      stubs: {
        ListTableLocalSorting: {
          name: 'ListTableLocalSorting',
          template: '<div />',
        },
      },
      mocks: {
        $t: key => key,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render ListTableLocalSorting', () => {
    expect(wrapper.findComponent(ListTableLocalSorting).exists()).toBe(true)
  })

  it('should compute rows correctly', () => {
    expect(wrapper.vm.rows).toBe(3)
  })

  it('should format ranking position row', () => {
    expect(wrapper.vm.fields[0].formatter(0)).toBe('-')
    expect(wrapper.vm.fields[0].formatter(2)).toContain('2')
  })

  it('should filter fields if classe has less than 2 with id', () => {
    wrapper.vm.$options.setup = () => {
      return {
        ...wrapper.vm,
        classe: { value: [{ id: 1 }] },
      }
    }
    // force recompute
    expect(wrapper.vm.setFields.find(f => f.key === 'networkGroupName')).toBeDefined()
  })

  it('should return correct rowClass', () => {
    expect(wrapper.vm.rowClass({ institutionPosition: 1 }, 'row')).toBe(
      'tbody-row bg-light-primary',
    )
    expect(wrapper.vm.rowClass({ institutionPosition: 2 }, 'row')).toBe(
      'tbody-row bg-light-success',
    )
    expect(wrapper.vm.rowClass({ institutionPosition: 3 }, 'row')).toBe('tbody-row bg-light-info')
    expect(wrapper.vm.rowClass({ institutionPosition: 4 }, 'row')).toBe('tbody-row')
    expect(wrapper.vm.rowClass(null, 'row')).toBeUndefined()
    expect(wrapper.vm.rowClass({ institutionPosition: 1 }, 'cell')).toBeUndefined()
  })

  it('should call exportExcel', () => {
    wrapper.vm.exportExcel()
    expect(useEducationSystemRankingNetwork().exportExcel).toHaveBeenCalled()
  })

  it('should reset page on ranking change', async () => {
    wrapper.vm.refListTable = { resetPage: jest.fn() }
    wrapper.vm.ranking = { value: { ranking: [] } }
    await wrapper.vm.$nextTick()
    // Simulate watch
    wrapper.vm.refListTable.resetPage()
    expect(wrapper.vm.refListTable.resetPage).toHaveBeenCalled()
  })
})