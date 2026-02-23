// Import after mocks
import useFilters from '@/store/filters/useFilters'
import { sortString } from '@/utils/utils'
import List from '@/views/pages/teacher-context/educationSystem/books/List.vue'
import {useEducationSystemBooks} from '@/views/pages/teacher-context/educationSystem/books/useEducationSystemBooks'
import { ref } from 'vue'

// Mock $bus
const mockBus = {
  $emit: jest.fn(),
  $on: jest.fn(),
  $off: jest.fn(),
}

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  })),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}))

// Mock dependencies first
jest.mock('@/store/filters/useFilters', () =>
  jest.fn(() => ({
    educationSystemId: { value: '123' },
    subject: { value: { id: 'math' } },
    classe: { value: { ClassId: '456' } },
  })),
)
jest.mock('@/views/pages/teacher-context/educationSystem/books/useEducationSystemBooks')
jest.mock('@/router', () => ({
  push: jest.fn(),
}))
jest.mock('@/utils/utils', () => ({
  sortString: jest.fn((a, b) => {
    if (typeof a !== 'string' || typeof b !== 'string') {
      return 0
    }
    return a.localeCompare(b, undefined, { numeric: true })
  }),
}))

// Mock getCurrentInstance
jest.mock('vue', () => {
  const actual = jest.requireActual('vue')
  return {
    ...actual,
    getCurrentInstance: jest.fn(() => ({
      proxy: {
        $bus: mockBus,
      },
    })),
  }
})

describe('EducationSystemBooksList', () => {
  let mockBooks
  let mockUseFilters
  let mockUseEducationSystemBooks

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks()

    // Mock books data
    mockBooks = ref([
      {
        id: 1,
        name: 'Book A',
        progress: 80,
        performance: 90,
        hasGuideEnabled: true,
        imageUrl: 'http://example.com/book-a.jpg',
      },
      {
        id: 2,
        name: 'Book B',
        progress: 60,
        performance: 70,
        hasGuideEnabled: false,
        imageUrl: 'http://example.com/book-b.jpg',
      },
      {
        id: 3,
        name: 'Book C',
        progress: 95,
        performance: 85,
        hasGuideEnabled: true,
        imageUrl: 'http://example.com/book-c.jpg',
      },
      {
        id: 4,
        name: 'Book D',
        progress: 40,
        performance: 50,
        hasGuideEnabled: false,
        imageUrl: 'http://example.com/book-d.jpg',
      },
    ])

    // Mock useFilters
    mockUseFilters = {
      educationSystemId: ref('123'),
      subject: ref({ id: 'math' }),
      classe: ref({ ClassId: '456' }),
    }
    useFilters.mockReturnValue(mockUseFilters)

    // Mock useEducationSystemBooks
    mockUseEducationSystemBooks = {
      books: mockBooks,
      loading: ref(false),
      apiData: ref({ books: mockBooks.value }),
      onlyInProgress: ref(false),
      fetchData: jest.fn().mockResolvedValue(undefined),
    }
    useEducationSystemBooks.mockReturnValue(mockUseEducationSystemBooks)
  })

  describe('applySortWithPriority', () => {
    it('should update currentSortBy and currentSortDesc when refListTable is defined', () => {
      const { setup } = List
      const emit = jest.fn()
      const result = setup({}, { emit })

      // Mock refListTable with sortBy and sortDesc values
      result.refListTable.value = {
        sortBy: 'progress',
        sortDesc: true,
        resetPage: jest.fn(),
      }

      // Call applySortWithPriority
      result.applySortWithPriority()

      // Verify currentSortBy and currentSortDesc were updated through sortedBooks
      const sorted = result.sortedBooks.value

      // With sortBy='progress' and sortDesc=true, books with guide should be first, sorted by progress descending
      expect(sorted[0].id).toBe(3) // Book C: hasGuideEnabled=true, progress=95
      expect(sorted[1].id).toBe(1) // Book A: hasGuideEnabled=true, progress=80
      expect(sorted[2].id).toBe(2) // Book B: hasGuideEnabled=false, progress=60
      expect(sorted[3].id).toBe(4) // Book D: hasGuideEnabled=false, progress=40
    })

    it('should not throw error when refListTable is null', () => {
      const { setup } = List
      const emit = jest.fn()
      const result = setup({}, { emit })

      // Set refListTable to null
      result.refListTable.value = null

      // Should not throw
      expect(() => result.applySortWithPriority()).not.toThrow()
    })

    it('should handle undefined refListTable', () => {
      const { setup } = List
      const emit = jest.fn()
      const result = setup({}, { emit })

      // Set refListTable to undefined
      result.refListTable.value = undefined

      // Should not throw
      expect(() => result.applySortWithPriority()).not.toThrow()
    })

    it('should update sorting when called multiple times with different values', () => {
      const { setup } = List
      const emit = jest.fn()
      const result = setup({}, { emit })

      // First sort by name ascending
      result.refListTable.value = {
        sortBy: 'name',
        sortDesc: false,
        resetPage: jest.fn(),
      }
      result.applySortWithPriority()

      let sorted = result.sortedBooks.value
      expect(sorted[0].name).toBe('Book A')
      expect(sorted[3].name).toBe('Book D')

      // Then sort by performance descending
      result.refListTable.value = {
        sortBy: 'performance',
        sortDesc: true,
        resetPage: jest.fn(),
      }
      result.applySortWithPriority()

      sorted = result.sortedBooks.value
      // With guide enabled first, sorted by performance desc
      expect(sorted[0].id).toBe(1) // Book A: hasGuideEnabled=true, performance=90
      expect(sorted[1].id).toBe(3) // Book C: hasGuideEnabled=true, performance=85
    })
  })

  describe('sortedBooks computed property', () => {
    describe('when sorting by name (no priority)', () => {
      it('should sort books alphabetically ascending when sortDesc is false', () => {
        const { setup } = List
        const emit = jest.fn()
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'name',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        expect(sorted[0].name).toBe('Book A')
        expect(sorted[1].name).toBe('Book B')
        expect(sorted[2].name).toBe('Book C')
        expect(sorted[3].name).toBe('Book D')
      })

      it('should sort books alphabetically descending when sortDesc is true', () => {
        const { setup } = List
        const emit = jest.fn()
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'name',
          sortDesc: true,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        expect(sorted[0].name).toBe('Book D')
        expect(sorted[1].name).toBe('Book C')
        expect(sorted[2].name).toBe('Book B')
        expect(sorted[3].name).toBe('Book A')
      })

      it('should use sortString for name comparison', () => {
        const { setup } = List
        const emit = jest.fn()
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'name',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // Verify sortString was called and the books are sorted by name
        expect(sortString).toHaveBeenCalled()
        // Verify the actual sort result to ensure sortString was used
        expect(sorted[0].name).toBe('Book A')
        expect(sorted[1].name).toBe('Book B')
        expect(sorted[2].name).toBe('Book C')
        expect(sorted[3].name).toBe('Book D')
      })
    })

    describe('when sorting by progress (with priority)', () => {
      it('should prioritize books with hasGuideEnabled=true, then sort by progress ascending', () => {
        const { setup } = List
        const emit = jest.fn()
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'progress',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // Books with guide enabled come first (sorted by progress ascending)
        expect(sorted[0].id).toBe(1) // Book A: hasGuideEnabled=true, progress=80
        expect(sorted[1].id).toBe(3) // Book C: hasGuideEnabled=true, progress=95

        // Books without guide enabled come after (sorted by progress ascending)
        expect(sorted[2].id).toBe(4) // Book D: hasGuideEnabled=false, progress=40
        expect(sorted[3].id).toBe(2) // Book B: hasGuideEnabled=false, progress=60
      })

      it('should prioritize books with hasGuideEnabled=true, then sort by progress descending', () => {
        const { setup } = List
        const emit = jest.fn()
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'progress',
          sortDesc: true,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // Books with guide enabled come first (sorted by progress descending)
        expect(sorted[0].id).toBe(3) // Book C: hasGuideEnabled=true, progress=95
        expect(sorted[1].id).toBe(1) // Book A: hasGuideEnabled=true, progress=80

        // Books without guide enabled come after (sorted by progress descending)
        expect(sorted[2].id).toBe(2) // Book B: hasGuideEnabled=false, progress=60
        expect(sorted[3].id).toBe(4) // Book D: hasGuideEnabled=false, progress=40
      })
    })

    describe('when sorting by performance (with priority)', () => {
      it('should prioritize books with hasGuideEnabled=true, then sort by performance ascending', () => {
        const { setup } = List
        const emit = jest.fn()
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'performance',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // Books with guide enabled come first (sorted by performance ascending)
        expect(sorted[0].id).toBe(3) // Book C: hasGuideEnabled=true, performance=85
        expect(sorted[1].id).toBe(1) // Book A: hasGuideEnabled=true, performance=90

        // Books without guide enabled come after (sorted by performance ascending)
        expect(sorted[2].id).toBe(4) // Book D: hasGuideEnabled=false, performance=50
        expect(sorted[3].id).toBe(2) // Book B: hasGuideEnabled=false, performance=70
      })

      it('should prioritize books with hasGuideEnabled=true, then sort by performance descending', () => {
        const { setup } = List
        const emit = jest.fn()
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'performance',
          sortDesc: true,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // Books with guide enabled come first (sorted by performance descending)
        expect(sorted[0].id).toBe(1) // Book A: hasGuideEnabled=true, performance=90
        expect(sorted[1].id).toBe(3) // Book C: hasGuideEnabled=true, performance=85

        // Books without guide enabled come after (sorted by performance descending)
        expect(sorted[2].id).toBe(2) // Book B: hasGuideEnabled=false, performance=70
        expect(sorted[3].id).toBe(4) // Book D: hasGuideEnabled=false, performance=50
      })
    })

    describe('edge cases', () => {
      it('should return empty array when books is null', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref(null)
        const result = setup({}, { emit })

        const sorted = result.sortedBooks.value

        expect(sorted).toEqual([])
      })

      it('should return empty array when books is undefined', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref(undefined)
        const result = setup({}, { emit })

        const sorted = result.sortedBooks.value

        expect(sorted).toEqual([])
      })

      it('should return empty array when books array is empty', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref([])
        const result = setup({}, { emit })

        const sorted = result.sortedBooks.value

        expect(sorted).toEqual([])
      })

      it('should handle books with null values in sort field', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref([
          {
            id: 1,
            name: 'Book A',
            progress: null,
            performance: 90,
            hasGuideEnabled: true,
          },
          {
            id: 2,
            name: 'Book B',
            progress: 60,
            performance: null,
            hasGuideEnabled: true,
          },
          {
            id: 3,
            name: 'Book C',
            progress: 80,
            performance: 85,
            hasGuideEnabled: true,
          },
        ])
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'progress',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // Books with null values should be sorted last within their priority group (as per compareValues logic: aValue == null returns 1)
        expect(sorted[0].id).toBe(2) // Book B: progress=60
        expect(sorted[1].id).toBe(3) // Book C: progress=80
        expect(sorted[2].id).toBe(1) // Book A: progress=null (comes last)
      })

      it('should handle books with undefined values in sort field', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref([
          {
            id: 1,
            name: 'Book A',
            progress: undefined,
            performance: 90,
            hasGuideEnabled: true,
          },
          {
            id: 2,
            name: 'Book B',
            progress: 60,
            performance: undefined,
            hasGuideEnabled: true,
          },
          {
            id: 3,
            name: 'Book C',
            progress: 80,
            performance: 85,
            hasGuideEnabled: true,
          },
        ])
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'progress',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // Books with undefined values should be sorted last within their priority group (as per compareValues logic: aValue == null returns 1)
        expect(sorted[0].id).toBe(2) // Book B: progress=60
        expect(sorted[1].id).toBe(3) // Book C: progress=80
        expect(sorted[2].id).toBe(1) // Book A: progress=undefined (comes last)
      })

      it('should handle all books with same priority group', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref([
          {
            id: 1,
            name: 'Book A',
            progress: 80,
            performance: 90,
            hasGuideEnabled: true,
          },
          {
            id: 2,
            name: 'Book B',
            progress: 60,
            performance: 70,
            hasGuideEnabled: true,
          },
          {
            id: 3,
            name: 'Book C',
            progress: 95,
            performance: 85,
            hasGuideEnabled: true,
          },
        ])
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'progress',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        expect(sorted[0].id).toBe(2) // progress=60
        expect(sorted[1].id).toBe(1) // progress=80
        expect(sorted[2].id).toBe(3) // progress=95
      })

      it('should handle all books without guide enabled', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref([
          {
            id: 1,
            name: 'Book A',
            progress: 80,
            performance: 90,
            hasGuideEnabled: false,
          },
          {
            id: 2,
            name: 'Book B',
            progress: 60,
            performance: 70,
            hasGuideEnabled: false,
          },
          {
            id: 3,
            name: 'Book C',
            progress: 95,
            performance: 85,
            hasGuideEnabled: false,
          },
        ])
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'performance',
          sortDesc: true,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        expect(sorted[0].id).toBe(1) // performance=90
        expect(sorted[1].id).toBe(3) // performance=85
        expect(sorted[2].id).toBe(2) // performance=70
      })

      it('should handle numeric string values by converting to numbers', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref([
          {
            id: 1,
            name: 'Book 1',
            progress: 80,
            performance: 90,
            hasGuideEnabled: true,
          },
          {
            id: 2,
            name: 'Book 10',
            progress: 60,
            performance: 70,
            hasGuideEnabled: true,
          },
          {
            id: 3,
            name: 'Book 2',
            progress: 95,
            performance: 85,
            hasGuideEnabled: true,
          },
        ])
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'name',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // sortString should handle numeric strings correctly
        expect(sorted[0].name).toBe('Book 1')
        expect(sorted[1].name).toBe('Book 2')
        expect(sorted[2].name).toBe('Book 10')
      })

      it('should handle books with both null values in the same sort field', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref([
          {
            id: 1,
            name: 'Book A',
            progress: null,
            performance: 90,
            hasGuideEnabled: true,
          },
          {
            id: 2,
            name: 'Book B',
            progress: null,
            performance: 70,
            hasGuideEnabled: true,
          },
          {
            id: 3,
            name: 'Book C',
            progress: 80,
            performance: 85,
            hasGuideEnabled: true,
          },
        ])
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'progress',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // First book should have a value
        expect(sorted[0].id).toBe(3) // progress=80
        // Books with null values should be at the end (order between them doesn't matter)
        expect([1, 2]).toContain(sorted[1].id)
        expect([1, 2]).toContain(sorted[2].id)
      })
    })

    describe('priority grouping behavior', () => {
      it('should maintain separate groups when sorting by progress', () => {
        const { setup } = List
        const emit = jest.fn()
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'progress',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // Verify that all books with guide enabled come before books without
        const firstWithoutGuideIndex = sorted.findIndex(book => !book.hasGuideEnabled)
        const lastWithGuideIndex = sorted.reduce(
          (lastIndex, book, index) => (book.hasGuideEnabled ? index : lastIndex),
          -1,
        )

        // Only test grouping if both groups exist
        if (firstWithoutGuideIndex !== -1 && lastWithGuideIndex !== -1) {
          expect(lastWithGuideIndex).toBeLessThan(firstWithoutGuideIndex)
        } else {
          // If one group is empty, just verify all books with guide are first
          const hasWithGuide = sorted.some(book => book.hasGuideEnabled === true)
          const hasWithoutGuide = sorted.some(book => book.hasGuideEnabled !== true)

          if (hasWithGuide && hasWithoutGuide) {
            expect(lastWithGuideIndex).toBeGreaterThanOrEqual(0)
            expect(firstWithoutGuideIndex).toBeGreaterThanOrEqual(0)
            expect(lastWithGuideIndex).toBeLessThan(firstWithoutGuideIndex)
          }
        }
      })

      it('should not apply priority grouping when sorting by name', () => {
        const { setup } = List
        const emit = jest.fn()
        mockUseEducationSystemBooks.books = ref([
          {
            id: 1,
            name: 'Alpha',
            progress: 80,
            performance: 90,
            hasGuideEnabled: false,
          },
          {
            id: 2,
            name: 'Beta',
            progress: 60,
            performance: 70,
            hasGuideEnabled: true,
          },
          {
            id: 3,
            name: 'Charlie',
            progress: 95,
            performance: 85,
            hasGuideEnabled: false,
          },
          {
            id: 4,
            name: 'Delta',
            progress: 40,
            performance: 50,
            hasGuideEnabled: true,
          },
        ])
        const result = setup({}, { emit })

        result.refListTable.value = {
          sortBy: 'name',
          sortDesc: false,
          resetPage: jest.fn(),
        }
        result.applySortWithPriority()

        const sorted = result.sortedBooks.value

        // Should be sorted alphabetically regardless of hasGuideEnabled
        expect(sorted[0].name).toBe('Alpha')
        expect(sorted[1].name).toBe('Beta')
        expect(sorted[2].name).toBe('Charlie')
        expect(sorted[3].name).toBe('Delta')
      })
    })
  })

  describe('integration with sortedBooks', () => {
    it('should update sortedBooks when applySortWithPriority is called', () => {
      const { setup } = List
      const emit = jest.fn()
      const result = setup({}, { emit })

      // Initial state (default sort)
      const initialSorted = result.sortedBooks.value
      expect(initialSorted[0].name).toBe('Book A')

      // Change sort via refListTable and apply
      result.refListTable.value = {
        sortBy: 'progress',
        sortDesc: true,
        resetPage: jest.fn(),
      }
      result.applySortWithPriority()

      const newSorted = result.sortedBooks.value

      // Should now be sorted by progress descending with priority
      expect(newSorted[0].id).toBe(3) // Book C: hasGuideEnabled=true, progress=95
      expect(newSorted[1].id).toBe(1) // Book A: hasGuideEnabled=true, progress=80
    })

    it('should reactively update when books data changes', () => {
      const { setup } = List
      const emit = jest.fn()
      const result = setup({}, { emit })

      result.refListTable.value = {
        sortBy: 'name',
        sortDesc: false,
        resetPage: jest.fn(),
      }
      result.applySortWithPriority()

      const initialLength = result.sortedBooks.value.length
      expect(initialLength).toBe(4)

      // Add a new book
      mockUseEducationSystemBooks.books.value.push({
        id: 5,
        name: 'Book E',
        progress: 75,
        performance: 80,
        hasGuideEnabled: true,
      })

      // sortedBooks should reflect the change
      const newLength = result.sortedBooks.value.length
      expect(newLength).toBe(5)
    })
  })
})
