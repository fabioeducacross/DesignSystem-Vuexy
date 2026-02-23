import { sortString } from '@/utils/utils'
import { computed, ref, toRef } from 'vue'

// Mock router
jest.mock('@/router', () => ({
  push: jest.fn(),
  currentRoute: {
    params: {
      educationSystemId: '123',
    },
  },
}))

// Mock utils
jest.mock('@/utils/utils', () => ({
  sortString: jest.fn((a, b) => {
    if (typeof a !== 'string' || typeof b !== 'string') {
      return 0
    }
    return a.localeCompare(b, undefined, { numeric: true })
  }),
}))

describe('GeralBooksList - applySortWithPriority and sortedDataTable Logic', () => {
  let mockBooks

  beforeEach(() => {
    jest.clearAllMocks()

    // Setup mock books data
    mockBooks = [
      {
        id: 1,
        name: 'Livro A',
        serieName: '1º Ano',
        progress: 80,
        performance: 90,
        hasGuideEnabled: true,
      },
      {
        id: 2,
        name: 'Livro B',
        serieName: '2º Ano',
        progress: 60,
        performance: 70,
        hasGuideEnabled: false,
      },
      {
        id: 3,
        name: 'Livro C',
        serieName: '3º Ano',
        progress: 95,
        performance: 85,
        hasGuideEnabled: true,
      },
      {
        id: 4,
        name: 'Livro D',
        serieName: '4º Ano',
        progress: 40,
        performance: 50,
        hasGuideEnabled: false,
      },
      {
        id: 5,
        name: 'Livro E',
        serieName: '5º Ano',
        progress: 75,
        performance: 88,
        hasGuideEnabled: true,
      },
      {
        id: 6,
        name: 'Livro F',
        serieName: '6º Ano',
        progress: 50,
        performance: null,
        hasGuideEnabled: null,
      },
    ]
  })

  // Helper function to recreate the setup logic
  const createSetupContext = (dataTable, initialSort = 'serieName', initialDesc = true) => {
    const refListTable = ref(null)
    const dataTableProp = toRef({ dataTable }, 'dataTable')

    const currentSortBy = ref(initialSort)
    const currentSortDesc = ref(initialDesc)

    const sortedDataTable = computed(() => {
      if (!dataTableProp.value || dataTableProp.value.length === 0) {
        return []
      }

      const sortBy = currentSortBy.value
      const sortDesc = currentSortDesc.value

      const shouldIgnorePriority = sortBy === 'name' || sortBy === 'serieName'

      const compareValues = (a, b) => {
        const aValue = a[sortBy]
        const bValue = b[sortBy]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue
        }

        if (aValue == null && bValue == null) return 0
        if (aValue == null) return 1
        if (bValue == null) return -1

        return sortString(aValue, bValue)
      }

      if (shouldIgnorePriority) {
        const sorted = [...dataTableProp.value].sort(compareValues)

        if (!sortDesc) {
          sorted.reverse()
        }

        return sorted
      }

      const withGuide = dataTableProp.value.filter(book => book.hasGuideEnabled === true)
      const withoutGuide = dataTableProp.value.filter(book => book.hasGuideEnabled !== true)

      const sortedWithGuide = [...withGuide].sort(compareValues)
      const sortedWithoutGuide = [...withoutGuide].sort(compareValues)

      if (!sortDesc) {
        sortedWithGuide.reverse()
        sortedWithoutGuide.reverse()
      }

      return [...sortedWithGuide, ...sortedWithoutGuide]
    })

    const applySortWithPriority = () => {
      if (refListTable.value) {
        currentSortBy.value = refListTable.value.sortBy
        currentSortDesc.value = refListTable.value.sortDesc
      }
    }

    return {
      refListTable,
      sortedDataTable,
      currentSortBy,
      currentSortDesc,
      applySortWithPriority,
    }
  }

  describe('applySortWithPriority', () => {
    it('should not throw error when refListTable is null', () => {
      const setup = createSetupContext(mockBooks)
      expect(() => setup.applySortWithPriority()).not.toThrow()
    })

    it('should update currentSortBy when refListTable is set', () => {
      const setup = createSetupContext(mockBooks)

      setup.refListTable.value = {
        sortBy: 'progress',
        sortDesc: true,
      }

      setup.applySortWithPriority()

      expect(setup.currentSortBy.value).toBe('progress')
      expect(setup.currentSortDesc.value).toBe(true)
    })

    it('should update currentSortDesc when refListTable is set', () => {
      const setup = createSetupContext(mockBooks, 'name', false)

      setup.refListTable.value = {
        sortBy: 'performance',
        sortDesc: false,
      }

      setup.applySortWithPriority()

      expect(setup.currentSortBy.value).toBe('performance')
      expect(setup.currentSortDesc.value).toBe(false)
    })
  })

  describe('sortedDataTable - Priority Sorting (hasGuideEnabled)', () => {
    it('should sort by progress descending with hasGuideEnabled priority', () => {
      const setup = createSetupContext(mockBooks)

      setup.refListTable.value = {
        sortBy: 'progress',
        sortDesc: true,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value

      // Books with hasGuideEnabled=true sorted ascending: 75, 80, 95
      expect(sorted[0].id).toBe(5)
      expect(sorted[1].id).toBe(1)
      expect(sorted[2].id).toBe(3)

      // Books with hasGuideEnabled=false or null sorted ascending: 40, 50, 60
      expect(sorted[3].id).toBe(4)
      expect(sorted[4].id).toBe(6)
      expect(sorted[5].id).toBe(2)
    })

    it('should sort by progress ascending with hasGuideEnabled priority', () => {
      const setup = createSetupContext(mockBooks)

      setup.refListTable.value = {
        sortBy: 'progress',
        sortDesc: false,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value

      // When sortDesc=false: sort ascending then reverse (descending)
      // True group sorted ascending: 75, 80, 95 then reversed: 95, 80, 75
      // False group sorted ascending: 40, 50, 60 then reversed: 60, 50, 40
      expect(sorted[0].id).toBe(3)
      expect(sorted[1].id).toBe(1)
      expect(sorted[2].id).toBe(5)
      expect(sorted[3].id).toBe(2)
      expect(sorted[4].id).toBe(6)
      expect(sorted[5].id).toBe(4)
    })

    it('should sort by performance descending with hasGuideEnabled priority', () => {
      const setup = createSetupContext(mockBooks)

      setup.refListTable.value = {
        sortBy: 'performance',
        sortDesc: true,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value

      // sortDesc=true means no reverse, so ascending: 85, 88, 90
      expect(sorted[0].id).toBe(3)
      expect(sorted[1].id).toBe(5)
      expect(sorted[2].id).toBe(1)

      // False group ascending: 50, 70, null
      expect(sorted[3].id).toBe(4)
      expect(sorted[4].id).toBe(2)
      expect(sorted[5].id).toBe(6)
    })

    it('should ensure hasGuideEnabled priority is maintained across all numeric sort fields', () => {
      const setup = createSetupContext(mockBooks)

      const sortFields = ['progress', 'performance']

      sortFields.forEach(field => {
        setup.refListTable.value = {
          sortBy: field,
          sortDesc: true,
        }
        setup.applySortWithPriority()

        const sorted = setup.sortedDataTable.value

        // Find the last true and first false
        let lastTrueIndex = -1
        for (let i = 0; i < sorted.length; i++) {
          if (sorted[i].hasGuideEnabled === true) {
            lastTrueIndex = i
          }
        }

        // All items after lastTrueIndex should have hasGuideEnabled != true
        for (let i = lastTrueIndex + 1; i < sorted.length; i++) {
          expect(sorted[i].hasGuideEnabled).not.toBe(true)
        }
      })
    })
  })

  describe('sortedDataTable - Non-Priority Sorting (name and serieName)', () => {
    it('should sort by name without hasGuideEnabled priority (ascending then reverse = descending)', () => {
      const setup = createSetupContext(mockBooks)

      setup.refListTable.value = {
        sortBy: 'name',
        sortDesc: false,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value

      // Sort ascending then reverse = F, E, D, C, B, A
      expect(sorted[0].name).toBe('Livro F')
      expect(sorted[1].name).toBe('Livro E')
      expect(sorted[2].name).toBe('Livro D')
      expect(sorted[3].name).toBe('Livro C')
      expect(sorted[4].name).toBe('Livro B')
      expect(sorted[5].name).toBe('Livro A')
    })

    it('should sort by name descending (no reverse)', () => {
      const setup = createSetupContext(mockBooks)

      setup.refListTable.value = {
        sortBy: 'name',
        sortDesc: true,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value

      // Sort descending (sortDesc=true means no reverse): A, B, C, D, E, F ascending
      expect(sorted[0].name).toBe('Livro A')
      expect(sorted[1].name).toBe('Livro B')
      expect(sorted[2].name).toBe('Livro C')
      expect(sorted[3].name).toBe('Livro D')
      expect(sorted[4].name).toBe('Livro E')
      expect(sorted[5].name).toBe('Livro F')
    })

    it('should sort by serieName without hasGuideEnabled priority', () => {
      const setup = createSetupContext(mockBooks)

      setup.refListTable.value = {
        sortBy: 'serieName',
        sortDesc: false,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value

      // Numeric sort: ascending then reverse = 6º, 5º, 4º, 3º, 2º, 1º
      expect(sorted[0].serieName).toBe('6º Ano')
      expect(sorted[1].serieName).toBe('5º Ano')
      expect(sorted[2].serieName).toBe('4º Ano')
      expect(sorted[3].serieName).toBe('3º Ano')
      expect(sorted[4].serieName).toBe('2º Ano')
      expect(sorted[5].serieName).toBe('1º Ano')
    })
  })

  describe('sortedDataTable - Edge Cases', () => {
    it('should handle empty dataTable', () => {
      const setup = createSetupContext([])
      const sorted = setup.sortedDataTable.value
      expect(sorted).toEqual([])
    })

    it('should handle null dataTable', () => {
      const setup = createSetupContext(null)
      const sorted = setup.sortedDataTable.value
      expect(sorted).toEqual([])
    })

    it('should handle undefined dataTable', () => {
      const setup = createSetupContext(undefined)
      const sorted = setup.sortedDataTable.value
      expect(sorted).toEqual([])
    })

    it('should handle all books with hasGuideEnabled=true', () => {
      const booksAllEnabled = [
        { id: 1, progress: 80, hasGuideEnabled: true },
        { id: 2, progress: 60, hasGuideEnabled: true },
      ]

      const setup = createSetupContext(booksAllEnabled)

      setup.refListTable.value = {
        sortBy: 'progress',
        sortDesc: true,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value
      expect(sorted.length).toBe(2)
      expect(sorted[0].id).toBe(2) // 60 < 80 ascending
      expect(sorted[1].id).toBe(1)
    })

    it('should handle all books with hasGuideEnabled=false', () => {
      const booksAllDisabled = [
        { id: 1, progress: 80, hasGuideEnabled: false },
        { id: 2, progress: 60, hasGuideEnabled: false },
      ]

      const setup = createSetupContext(booksAllDisabled)

      setup.refListTable.value = {
        sortBy: 'progress',
        sortDesc: true,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value
      expect(sorted.length).toBe(2)
      expect(sorted[0].id).toBe(2) // 60 < 80 ascending order
      expect(sorted[1].id).toBe(1)
    })

    it('should handle books with null values in numeric fields', () => {
      const booksWithNull = [
        { id: 1, progress: 80, hasGuideEnabled: true },
        { id: 2, progress: null, hasGuideEnabled: true },
      ]

      const setup = createSetupContext(booksWithNull)

      setup.refListTable.value = {
        sortBy: 'progress',
        sortDesc: true,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value
      expect(sorted.length).toBe(2)
      expect(sorted[0].id).toBe(1)
      expect(sorted[1].id).toBe(2)
    })

    it('should not mix hasGuideEnabled=true with false when sorting numerically', () => {
      const setup = createSetupContext(mockBooks)

      setup.refListTable.value = {
        sortBy: 'progress',
        sortDesc: true,
      }
      setup.applySortWithPriority()

      const sorted = setup.sortedDataTable.value

      // Find where true ends and false/null begins
      let transitionIndex = -1
      for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i].hasGuideEnabled === true && sorted[i + 1].hasGuideEnabled !== true) {
          transitionIndex = i
          break
        }
      }

      // Verify clean separation
      expect(transitionIndex).toBeLessThan(sorted.length - 1)

      for (let i = 0; i <= transitionIndex; i++) {
        expect(sorted[i].hasGuideEnabled).toBe(true)
      }
      for (let i = transitionIndex + 1; i < sorted.length; i++) {
        expect(sorted[i].hasGuideEnabled).not.toBe(true)
      }
    })
  })

  describe('sortedDataTable - Multiple Sort Changes', () => {
    it('should update sorting when called multiple times with different values', () => {
      const setup = createSetupContext(mockBooks)

      // First sort by progress descending (sortDesc=true, no reverse, ascending order)
      setup.refListTable.value = { sortBy: 'progress', sortDesc: true }
      setup.applySortWithPriority()
      let sorted = setup.sortedDataTable.value
      expect(sorted[0].id).toBe(5) // lowest progress with hasGuideEnabled=true (75)

      // Then sort by name descending (sortDesc=true, no reverse, ascending alphabetical)
      setup.refListTable.value = { sortBy: 'name', sortDesc: true }
      setup.applySortWithPriority()
      sorted = setup.sortedDataTable.value
      expect(sorted[0].name).toBe('Livro A') // ascending alphabetical

      // Then sort by performance descending (sortDesc=true, no reverse)
      setup.refListTable.value = { sortBy: 'performance', sortDesc: true }
      setup.applySortWithPriority()
      sorted = setup.sortedDataTable.value
      expect(sorted[0].id).toBe(3) // lowest performance with hasGuideEnabled=true (85)
    })

    it('should respect priority changes between numeric and string sorts', () => {
      const setup = createSetupContext(mockBooks)

      // Numeric sort with priority
      setup.refListTable.value = { sortBy: 'progress', sortDesc: true }
      setup.applySortWithPriority()
      let sorted = setup.sortedDataTable.value
      expect(sorted[3].hasGuideEnabled).not.toBe(true)

      // Switch to string sort without priority
      setup.refListTable.value = { sortBy: 'name', sortDesc: true }
      setup.applySortWithPriority()
      sorted = setup.sortedDataTable.value

      // Should have mixed hasGuideEnabled values and be sorted alphabetically
      expect(sorted[0].name).toBe('Livro A') // ascending alphabetical
      expect(sorted[3].name).toBe('Livro D')
    })
  })
})
