// Mock useTable first to handle top-level execution in the module
jest.mock('@/store/table/useTable.js', () => {
  const dataTable = { value: [] }
  const loading = { value: false }
  const resetPage = jest.fn()

  const useTableMock = () => ({
    dataTable,
    loading,
    resetPage,
  })

  // Expose for assertions
  useTableMock.dataTable = dataTable
  useTableMock.loading = loading

  return useTableMock
})

// Mock Service
jest.mock('@/services/teacher-context/educationSystem/EducationSystem.Service', () => ({
  getEducationSystemMissionBooks: jest.fn(),
  getEducationSystemBookDetails: jest.fn(),
}))

// Mock Store
const mockGetters = {
  'educationSystemMissions/unity': { id: 1 },
  'educationSystemMissions/status': { key: 1 },
}

jest.mock('@/store', () => ({
  getters: mockGetters,
  commit: jest.fn(),
}))

// Mock useFilters
jest.mock('@/store/filters/useFilters', () => () => ({
  book: { value: { id: 1 } },
  educationSystemId: { value: 1 },
  classe: { value: { ClassId: 1 } },
  subject: { value: {} },
  subjects: { value: [] },
}))

const {
  getEducationSystemMissionBooks,
} = require('@/services/teacher-context/educationSystem/EducationSystem.Service')
const useTable = require('@/store/table/useTable.js')

// Import the module under test AFTER mocks are set up
const { useEducationSystemMissions } = require('./useEducationSystemMissions')

describe('useEducationSystemMissions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useTable.dataTable.value = [] // Reset dataTable
  })

  describe('fetchBooks', () => {
    it('should sort missions by unityId and then by name', async () => {
      const { fetch } = useEducationSystemMissions()

      const unsortedData = [
        { unityId: 2, name: 'Mission B' },
        { unityId: 1, name: 'Mission C' },
        { unityId: 2, name: 'Mission A' },
        { unityId: 1, name: 'Mission D' },
        { unityId: 10, name: 'Mission E' },
      ]

      getEducationSystemMissionBooks.mockResolvedValue({ data: unsortedData })

      await fetch()

      // Expected order:
      // unityId 1, Name C
      // unityId 1, Name D
      // unityId 2, Name A
      // unityId 2, Name B
      // unityId 10, Name E

      expect(useTable.dataTable.value).toHaveLength(5)
      expect(useTable.dataTable.value[0]).toEqual({ unityId: 1, name: 'Mission C' })
      expect(useTable.dataTable.value[1]).toEqual({ unityId: 1, name: 'Mission D' })
      expect(useTable.dataTable.value[2]).toEqual({ unityId: 2, name: 'Mission A' })
      expect(useTable.dataTable.value[3]).toEqual({ unityId: 2, name: 'Mission B' })
      expect(useTable.dataTable.value[4]).toEqual({ unityId: 10, name: 'Mission E' })
    })

    it('should handle numeric string sorting in names correctly', async () => {
      const { fetch } = useEducationSystemMissions()

      const unsortedData = [
        { unityId: 1, name: 'Mission 10' },
        { unityId: 1, name: 'Mission 2' },
      ]

      getEducationSystemMissionBooks.mockResolvedValue({ data: unsortedData })

      await fetch()

      expect(useTable.dataTable.value).toHaveLength(2)
      expect(useTable.dataTable.value[0]).toEqual({ unityId: 1, name: 'Mission 2' })
      expect(useTable.dataTable.value[1]).toEqual({ unityId: 1, name: 'Mission 10' })
    })
  })
})
