import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import ListTableRanking from '@/components/table/ListTableRanking.vue'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import { useMissionPlusRanking } from '@/views/reports/missionPlus/classe-report/ranking/useMissionPlusRanking.js'
import { shallowMount } from '@vue/test-utils'
import { ref } from 'vue'

// Mock the external modules
jest.mock('@/store', () => ({
  getters: {
    // We'll define specific getters in each test as needed
  },
}))

jest.mock('@/views/events/useEvents.js', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    rankingOrder: ref('defaultOrder'),
    networkGroup: ref('defaultGroup'),
  })),
}))

jest.mock('@/views/reports/missionPlus/classe-report/ranking/useMissionPlusRanking.js', () => ({
  useMissionPlusRanking: jest.fn(() => ({
    MODULE_NAME: 'missionPlusRanking',
    exportExcel: jest.fn(),
  })),
}))

describe('ListTableRanking.vue', () => {
  let wrapper
  let mockUseMissionPlusRanking
  let mockUseEvents
  let mockStoreGetters

  beforeEach(() => {
    // Reset mocks before each test
    mockUseMissionPlusRanking = {
      MODULE_NAME: 'missionPlusRanking',
      exportExcel: jest.fn(),
    }
    useMissionPlusRanking.mockReturnValue(mockUseMissionPlusRanking)

    mockUseEvents = {
      rankingOrder: ref('defaultOrder'),
      networkGroup: ref('defaultGroup'),
    }
    useEvents.mockReturnValue(mockUseEvents)

    mockStoreGetters = {
      'missionPlusRanking/loading': false,
      'missionPlusRanking/dataTable': [
        {
          classPosition: 1,
          studentName: 'Aluno Teste',
          coins: 10,
          stars: 5,
          pointsXp: 100,
          missionsPercent: 50,
          classPercent: 60,
        },
      ],
    }
    store.getters = new Proxy(
      {},
      {
        get: (target, prop) => {
          return mockStoreGetters[prop] || undefined // Return mock getter value
        },
      },
    )

    wrapper = shallowMount(ListTableRanking, {
      stubs: {
        ListTableLocalSorting: {
          name: 'ListTableLocalSorting',
          props: [
            'dataTable',
            'totalData',
            'tableColumns',
            'loading',
            'exportToExcel',
            'generatingExcel',
            'rowClass',
          ],
          render(h) {
            return h('div', this.$slots.default)
          },
        },
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // --- Component rendering and structure ---
  it('should render the ListTableLocalSorting component', () => {
    expect(wrapper.findComponent(ListTableLocalSorting).exists()).toBe(true)
  })

  it('totalData should be 5', () => {
    expect(wrapper.vm.totalData).toBe(5)
  })

  it('tableColumns should have the correct structure and properties', () => {
    const columns = wrapper.vm.tableColumns
    expect(columns).toHaveLength(5)
    expect(columns[0]).toEqual({
      key: 'position',
      label: 'Posicao na Turma',
      sortable: true,
    })
    expect(columns[1]).toEqual({
      key: 'studentName',
      label: 'Aluno',
      sortable: true,
      searchable: true,
    })
    // Check other columns for basic structure if needed
  })

  // --- Methods tests ---
  it('exportToExcel method should call exportExcel from useMissionPlusRanking', () => {
    wrapper.vm.exportToExcel()
    expect(mockUseMissionPlusRanking.exportExcel).toHaveBeenCalledTimes(1)
  })

  describe('rowClass method', () => {
    it('should return empty string if item is null or type is not "row"', () => {
      expect(wrapper.vm.rowClass(null, 'row')).toBeUndefined()
      expect(
        wrapper.vm.rowClass(
          {
            classPosition: 1,
          },
          'header',
        ),
      ).toBeUndefined()
    })

    it('should return "tbody-row bg-light-primary" for classPosition 1', () => {
      const item = {
        classPosition: 1,
      }
      expect(wrapper.vm.rowClass(item, 'row')).toBe('tbody-row bg-light-primary')
    })

    it('should return "tbody-row bg-light-success" for classPosition 2', () => {
      const item = {
        classPosition: 2,
      }
      expect(wrapper.vm.rowClass(item, 'row')).toBe('tbody-row bg-light-success')
    })

    it('should return "tbody-row bg-light-info" for classPosition 3', () => {
      const item = {
        classPosition: 3,
      }
      expect(wrapper.vm.rowClass(item, 'row')).toBe('tbody-row bg-light-info')
    })

    it('should return "tbody-row" for other classPositions', () => {
      const item = {
        classPosition: 4,
      }
      expect(wrapper.vm.rowClass(item, 'row')).toBe('tbody-row')
      const item2 = {
        classPosition: 0,
      }
      expect(wrapper.vm.rowClass(item2, 'row')).toBe('tbody-row')
    })
  })

  // --- External module integration tests ---
  it('should use values from useEvents hook', () => {
    expect(wrapper.vm.rankingOrder).toBe('defaultOrder')
    expect(wrapper.vm.networkGroup).toBe('defaultGroup')

    // Simulate a change from the useEvents mock
    mockUseEvents.rankingOrder.value = 'newOrder'
    expect(wrapper.vm.rankingOrder).toBe('newOrder')
  })

  it('should call useMissionPlusRanking and useEvents', () => {
    expect(useMissionPlusRanking).toHaveBeenCalledTimes(1)
    expect(useEvents).toHaveBeenCalledTimes(1)
  })
})
