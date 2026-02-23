jest.mock('@/store', () => ({
  getters: {},
  commit: jest.fn(),
  dispatch: jest.fn(),
}))
jest.mock('@/store/filters/useFilters', () =>
  jest.fn(() => ({
    serie: { value: { id: 1 } },
    subject: { value: { id: 2 } },
    educationSystemId: { value: 3 },
    networkGroup: { value: { id: 4 } },
  })),
)
const mockTableInstance = {
  resetPage: jest.fn(),
  loading: { value: false },
}

jest.mock('@/store/table/useTable.js', () => jest.fn(() => mockTableInstance))
jest.mock(
  '@/views/pages/admin-context/reports/educationSystem/components/useEducationSystemAdminDashboard',
  () =>
    jest.fn(() => ({
      fetchDashboardData: jest.fn(),
    })),
)

const Vue = require('vue')

describe('useEducationSystemInstitutions', () => {
  let store
  let useTable
  let useEducationSystemAdminDashboard
  let useEducationSystemInstitutions

  beforeEach(() => {
    mockTableInstance.resetPage.mockClear()
    mockTableInstance.loading.value = false
    store = require('@/store')
    useTable = require('@/store/table/useTable.js')
    useEducationSystemAdminDashboard = require('@/views/pages/admin-context/reports/educationSystem/components/useEducationSystemAdminDashboard')
    useEducationSystemInstitutions =
      require('../useEducationSystemInstitutions').useEducationSystemInstitutions
  })

  it('should return the correct moduleName', () => {
    const { moduleName } = useEducationSystemInstitutions()
    expect(moduleName).toBe('educationSystemNetworkInstitutions')
  })

  it('should get and set cards', () => {
    Object.defineProperty(store.getters, 'educationSystemNetworkInstitutions/cards', {
      configurable: true,
      get: () => 'cardsValue',
    })
    const { cards } = useEducationSystemInstitutions()
    expect(cards.value).toBe('cardsValue')
    cards.value = 'newCardsValue'
    expect(store.commit).toHaveBeenCalledWith(
      'educationSystemNetworkInstitutions/cards',
      'newCardsValue',
    )
  })

  it('should get and set educationSystemName', () => {
    Object.defineProperty(store.getters, 'educationSystemNetworkInstitutions/educationSystemName', {
      configurable: true,
      get: () => 'nameValue',
    })
    const { educationSystemName } = useEducationSystemInstitutions()
    expect(educationSystemName.value).toBe('nameValue')
    educationSystemName.value = 'newNameValue'
    expect(store.commit).toHaveBeenCalledWith(
      'educationSystemNetworkInstitutions/educationSystemName',
      'newNameValue',
    )
  })

  it('should get and set groups', () => {
    Object.defineProperty(store.getters, 'educationSystemNetworkInstitutions/groups', {
      configurable: true,
      get: () => [{ id: 1 }],
    })
    const { groups } = useEducationSystemInstitutions()
    expect(groups.value).toEqual([{ id: 1 }])
    const newGroups = [{ id: 2 }]
    groups.value = newGroups
    expect(store.commit).toHaveBeenCalledWith(
      'educationSystemNetworkInstitutions/groups',
      newGroups,
    )
  })

  it('should call fetch and set loading', () => {
    const { fetch } = useEducationSystemInstitutions()
    fetch()
    expect(mockTableInstance.loading.value).toBe(true)
    expect(store.dispatch).toHaveBeenCalledWith('educationSystemNetworkInstitutions/fetch')
  })

  it('should call resetAndfetch', () => {
    const { resetAndfetch } = useEducationSystemInstitutions()
    resetAndfetch()
    const useEducationSystemAdminDashboardInstance =
      useEducationSystemAdminDashboard.mock.results[0]?.value
    expect(useEducationSystemAdminDashboardInstance).toBeDefined()
    expect(mockTableInstance.resetPage).toHaveBeenCalled()
    expect(useEducationSystemAdminDashboardInstance.fetchDashboardData).toHaveBeenCalledWith({
      SubjectId: 2,
      EducationSystemId: 3,
      SerieId: 1,
      NetworkGroupId: 4,
    })
    expect(store.dispatch).toHaveBeenCalledWith('educationSystemNetworkInstitutions/fetch')
  })
})