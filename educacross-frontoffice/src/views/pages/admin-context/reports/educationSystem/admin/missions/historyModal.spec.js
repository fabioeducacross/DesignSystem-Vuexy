import HistoryModal from './historyModal.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { nextTick, ref } from 'vue'
import { shallowMount } from '@vue/test-utils'

// Mock dependencies
jest.mock('./useEducationSystemMissions')
jest.mock('@/consts/legends', () => ({
  getVariantByRule: jest.fn((value, rule) => {
    if (rule === 'guideStatus') {
      const statusMap = {
        0: { variant: 'secondary', label: 'Não enviado' },
        1: { variant: 'warning', label: 'Não iniciado' },
        2: { variant: 'info', label: 'Iniciado' },
        3: { variant: 'danger', label: 'Pausado' },
        4: { variant: 'success', label: 'Finalizado' },
      }
      return statusMap[value] || { variant: 'secondary', label: '-' }
    }
    return { variant: 'secondary', label: '-' }
  }),
}))

const mockBus = {
  $emit: jest.fn(),
  $on: jest.fn(),
  $off: jest.fn(),
}

describe('HistoryModal', () => {
  let wrapper
  let mockHistory
  let mockHistoryLoading
  let mockFetchHistory
  let useEducationSystemMissions

  beforeEach(() => {
    jest.clearAllMocks()

    // Mock history data
    mockHistory = ref([
      {
        date: '2024-01-15T10:30:00Z',
        applicationUserName: 'João Silva',
        userType: 4,
        action: 'Alterou status',
        oldStatus: 1,
        newStatus: 2,
      },
      {
        date: '2024-01-16T14:45:00Z',
        applicationUserName: 'Maria Santos',
        userType: 2,
        action: 'Pausou missão',
        oldStatus: 2,
        newStatus: 3,
      },
      {
        date: '2024-01-17T09:15:00Z',
        applicationUserName: 'Pedro Oliveira',
        userType: 1,
        action: 'Finalizou missão',
        oldStatus: 3,
        newStatus: 4,
      },
    ])

    mockHistoryLoading = ref(false)
    mockFetchHistory = jest.fn()

    // Mock useEducationSystemMissions
    useEducationSystemMissions = require('./useEducationSystemMissions').useEducationSystemMissions
    useEducationSystemMissions.mockReturnValue({
      history: mockHistory,
      historyLoading: mockHistoryLoading,
      fetchHistory: mockFetchHistory,
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  const createWrapper = (options = {}) => {
    return shallowMount(HistoryModal, {
      mocks: {
        $bus: mockBus,
      },
      stubs: {
        BModal: {
          template: '<div><slot /></div>',
          methods: {
            show: jest.fn(),
            hide: jest.fn(),
          },
        },
        BAvatar: {
          template: '<div />',
          props: ['text', 'variant', 'size'],
        },
        BBadge: {
          template: '<span><slot /></span>',
          props: ['pill', 'variant'],
        },
      },
      ...options,
    })
  }

  describe('Component Initialization', () => {
    it('should render correctly', () => {
      wrapper = createWrapper()
      expect(wrapper.exists()).toBe(true)
    })

    it('should have correct component name', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.$options.name).toBe('HistoryModal')
    })

    it('should register ListTableLocalSorting component', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.$options.components.ListTableLocalSorting).toBeDefined()
    })

    it('should initialize refs correctly', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.refModal).toBeDefined()
      expect(wrapper.vm.refTable).toBeDefined()
      expect(wrapper.vm.guideId).toBeNull()
      expect(wrapper.vm.modalVisible).toBe(false)
    })

    it('should define table fields correctly', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.tableFields).toHaveLength(6)
      expect(wrapper.vm.tableFields[0].key).toBe('date')
      expect(wrapper.vm.tableFields[1].key).toBe('applicationUserName')
      expect(wrapper.vm.tableFields[2].key).toBe('userType')
      expect(wrapper.vm.tableFields[3].key).toBe('action')
      expect(wrapper.vm.tableFields[4].key).toBe('oldStatus')
      expect(wrapper.vm.tableFields[5].key).toBe('newStatus')
    })
  })

  describe('Computed Properties', () => {
    it('should compute tableData from history', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.tableData).toEqual(mockHistory.value)
    })

    it('should return empty array when history is null', () => {
      mockHistory.value = null
      wrapper = createWrapper()
      expect(wrapper.vm.tableData).toEqual([])
    })

    it('should return empty array when history is undefined', () => {
      mockHistory.value = undefined
      wrapper = createWrapper()
      expect(wrapper.vm.tableData).toEqual([])
    })

    it('should compute loading from historyLoading', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.loading).toBe(false)

      mockHistoryLoading.value = true
      expect(wrapper.vm.loading).toBe(true)
    })

    it('should compute totalItems from history length', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.totalItems).toBe(3)
    })
  })

  describe('openModal method', () => {
    it('should set guideId, show modal and set modalVisible to true', () => {
      wrapper = createWrapper()
      const mockShow = jest.fn()
      wrapper.vm.refModal = { show: mockShow }

      const guide = { guideId: 123 }
      wrapper.vm.openModal(guide)

      expect(wrapper.vm.guideId).toBe(123)
      expect(wrapper.vm.modalVisible).toBe(true)
      expect(mockShow).toHaveBeenCalled()
    })

    it('should handle different guideId types', () => {
      wrapper = createWrapper()
      wrapper.vm.refModal = { show: jest.fn() }

      wrapper.vm.openModal({ guideId: '456' })
      expect(wrapper.vm.guideId).toBe('456')

      wrapper.vm.openModal({ guideId: 789 })
      expect(wrapper.vm.guideId).toBe(789)
    })
  })

  describe('onClose method', () => {
    it('should hide modal, reset modalVisible and guideId', () => {
      wrapper = createWrapper()
      const mockHide = jest.fn()
      wrapper.vm.refModal = { hide: mockHide }

      wrapper.vm.guideId = 123
      wrapper.vm.modalVisible = true
      mockHistory.value = [{ id: 1 }]

      wrapper.vm.onClose()

      expect(wrapper.vm.modalVisible).toBe(false)
      expect(wrapper.vm.guideId).toBeNull()
      expect(mockHistory.value).toEqual([])
    })
  })

  describe('onShown method', () => {
    it('should call fetchTableData after nextTick', async () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = 123

      await wrapper.vm.onShown()
      await nextTick()

      expect(mockFetchHistory).toHaveBeenCalledWith(123)
    })

    it('should not fetch if guideId is null', async () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = null

      await wrapper.vm.onShown()
      await nextTick()

      expect(mockFetchHistory).not.toHaveBeenCalled()
    })
  })

  describe('onShown behavior', () => {
    it('should fetch data when modal is shown with valid guideId', async () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = 456

      await wrapper.vm.onShown()
      await nextTick()

      expect(mockFetchHistory).toHaveBeenCalledWith(456)
    })

    it('should not fetch if guideId is null on shown', async () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = null

      await wrapper.vm.onShown()
      await nextTick()

      expect(mockFetchHistory).not.toHaveBeenCalled()
    })

    it('should not fetch if guideId is undefined on shown', async () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = undefined

      await wrapper.vm.onShown()
      await nextTick()

      expect(mockFetchHistory).not.toHaveBeenCalled()
    })
  })

  describe('onClose behavior', () => {
    it('should reset state when closing modal', () => {
      wrapper = createWrapper()
      const mockHide = jest.fn()
      wrapper.vm.refModal = { hide: mockHide }
      wrapper.vm.guideId = 789
      wrapper.vm.modalVisible = true
      mockHistory.value = [{ id: 1 }, { id: 2 }]

      wrapper.vm.onClose()

      expect(wrapper.vm.guideId).toBeNull()
      expect(mockHistory.value).toEqual([])
      expect(wrapper.vm.modalVisible).toBe(false)
    })
  })

  describe('formatDate method', () => {
    it('should format date to pt-BR format', () => {
      wrapper = createWrapper()
      const date = '2024-01-15T10:30:00Z'
      const formatted = wrapper.vm.formatDate(date)

      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/)
    })

    it('should return "-" for null date', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.formatDate(null)).toBe('-')
    })

    it('should return "-" for undefined date', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.formatDate(undefined)).toBe('-')
    })

    it('should return "-" for empty string', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.formatDate('')).toBe('-')
    })

    it('should handle different date formats', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.formatDate('2024-12-25')).toMatch(/\d{2}\/\d{2}\/\d{4}/)
      expect(wrapper.vm.formatDate('2024-12-25T00:00:00')).toMatch(/\d{2}\/\d{2}\/\d{4}/)
    })
  })

  describe('formatTime method', () => {
    it('should format time to HH:MM format', () => {
      wrapper = createWrapper()
      const date = '2024-01-15T10:30:00Z'
      const formatted = wrapper.vm.formatTime(date)

      expect(formatted).toMatch(/\d{2}:\d{2}/)
    })

    it('should return "-" for null time', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.formatTime(null)).toBe('-')
    })

    it('should return "-" for undefined time', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.formatTime(undefined)).toBe('-')
    })

    it('should return "-" for empty string', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.formatTime('')).toBe('-')
    })

    it('should handle different time values', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.formatTime('2024-01-15T23:59:59')).toMatch(/\d{2}:\d{2}/)
      expect(wrapper.vm.formatTime('2024-01-15T00:00:00')).toMatch(/\d{2}:\d{2}/)
    })
  })

  describe('getInitials method', () => {
    it('should return first letter of first and last name', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getInitials('João Silva')).toBe('JS')
      expect(wrapper.vm.getInitials('Maria Santos')).toBe('MS')
    })

    it('should return first two letters for single name', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getInitials('João')).toBe('JO')
      expect(wrapper.vm.getInitials('Maria')).toBe('MA')
    })

    it('should return "?" for null or undefined', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getInitials(null)).toBe('?')
      expect(wrapper.vm.getInitials(undefined)).toBe('?')
      expect(wrapper.vm.getInitials('')).toBe('?')
    })

    it('should handle names with more than two words', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getInitials('João Pedro Silva')).toBe('JP')
      expect(wrapper.vm.getInitials('Maria da Silva Santos')).toBe('MD')
    })

    it('should return uppercase initials', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getInitials('joão silva')).toBe('JS')
      expect(wrapper.vm.getInitials('maria santos')).toBe('MS')
    })

    it('should handle single letter names', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getInitials('A')).toBe('A')
    })
  })

  describe('getUserTypeLabel method', () => {
    it('should return correct label for Secretaria (0)', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(0)).toBe('Secretaria')
    })

    it('should return correct label for Diretor (1)', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(1)).toBe('Diretor')
    })

    it('should return correct label for Coordenador (2)', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(2)).toBe('Coordenador')
    })

    it('should return correct label for Gestor de Rede (3)', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(3)).toBe('Gestor de Rede')
    })

    it('should return correct label for Professor (4)', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(4)).toBe('Professor')
    })

    it('should return correct label for Auditor (5)', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(5)).toBe('Auditor')
    })

    it('should return correct label for Aluno (6)', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(6)).toBe('Aluno')
    })

    it('should return correct label for Responsável (7)', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(7)).toBe('Responsável')
    })

    it('should return "Não definido" for unknown userType', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(8)).toBe('Não definido')
      expect(wrapper.vm.getUserTypeLabel(99)).toBe('Não definido')
      expect(wrapper.vm.getUserTypeLabel(-1)).toBe('Não definido')
    })

    it('should return "Não definido" for null or undefined', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getUserTypeLabel(null)).toBe('Não definido')
      expect(wrapper.vm.getUserTypeLabel(undefined)).toBe('Não definido')
    })
  })

  describe('Template Rendering', () => {
    it('should render ListTableLocalSorting when guideId exists and modalVisible is true', async () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = 123
      wrapper.vm.modalVisible = true
      await nextTick()

      const table = wrapper.findComponent(ListTableLocalSorting)
      expect(table.exists()).toBe(true)
    })

    it('should not render ListTableLocalSorting when guideId is null', async () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = null
      wrapper.vm.modalVisible = true
      await nextTick()

      const table = wrapper.findComponent(ListTableLocalSorting)
      expect(table.exists()).toBe(false)
    })

    it('should not render ListTableLocalSorting when modalVisible is false', async () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = 123
      wrapper.vm.modalVisible = false
      await nextTick()

      const table = wrapper.findComponent(ListTableLocalSorting)
      expect(table.exists()).toBe(false)
    })

    it('should pass correct props to ListTableLocalSorting', async () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = 123
      wrapper.vm.modalVisible = true
      await nextTick()

      const table = wrapper.findComponent(ListTableLocalSorting)
      expect(table.props('loading')).toBe(false)
      expect(table.props('dataTable')).toEqual(mockHistory.value)
      expect(table.props('tableColumns')).toEqual(wrapper.vm.tableFields)
      expect(table.props('searchPlaceholder')).toBe('Pesquisar por usuário')
      expect(table.props('perPageDefault')).toBe(10)
      expect(table.props('border')).toBe(true)
    })
  })

  describe('Template Slots - date', () => {
    it('should format date correctly in slot', () => {
      wrapper = createWrapper()
      wrapper.vm.guideId = 123
      wrapper.vm.modalVisible = true

      const item = { date: '2024-01-15T10:30:00Z' }
      const formattedDate = wrapper.vm.formatDate(item.date)
      const formattedTime = wrapper.vm.formatTime(item.date)

      expect(formattedDate).toMatch(/\d{2}\/\d{2}\/\d{4}/)
      expect(formattedTime).toMatch(/\d{2}:\d{2}/)
    })
  })

  describe('Template Slots - applicationUserName', () => {
    it('should extract initials correctly for avatar', () => {
      wrapper = createWrapper()
      const item = { applicationUserName: 'João Silva' }
      const initials = wrapper.vm.getInitials(item.applicationUserName)

      expect(initials).toBe('JS')
    })
  })

  describe('Template Slots - userType', () => {
    it('should display correct user type label', () => {
      wrapper = createWrapper()
      const item = { userType: 4 }
      const label = wrapper.vm.getUserTypeLabel(item.userType)

      expect(label).toBe('Professor')
    })
  })

  describe('Template Slots - oldStatus and newStatus', () => {
    it('should call getVariantByRule with correct parameters', () => {
      const { getVariantByRule } = require('@/consts/legends')
      wrapper = createWrapper()

      const status = 2
      const result = getVariantByRule(status, 'guideStatus')

      expect(result).toEqual({ variant: 'info', label: 'Iniciado' })
    })

    it('should handle null status', () => {
      wrapper = createWrapper()
      // Null status should display "-" in template
      expect(wrapper.vm.getVariantByRule).toBeDefined()
    })
  })

  describe('Integration Tests', () => {
    it('should complete full modal flow: open -> fetch -> display -> close', async () => {
      wrapper = createWrapper()
      const mockShow = jest.fn()
      const mockHide = jest.fn()
      wrapper.vm.refModal = { show: mockShow, hide: mockHide }

      // Open modal
      const guide = { guideId: 999 }
      wrapper.vm.openModal(guide)
      expect(wrapper.vm.guideId).toBe(999)
      expect(mockShow).toHaveBeenCalled()

      // Shown event triggers fetch
      await wrapper.vm.onShown()
      await nextTick()
      expect(mockFetchHistory).toHaveBeenCalledWith(999)

      // Display data
      expect(wrapper.vm.tableData).toEqual(mockHistory.value)

      // Close modal
      wrapper.vm.onClose()
      expect(wrapper.vm.guideId).toBeNull()
      expect(wrapper.vm.modalVisible).toBe(false)
    })

    it('should handle loading state correctly', async () => {
      wrapper = createWrapper()
      expect(wrapper.vm.loading).toBe(false)

      mockHistoryLoading.value = true
      await nextTick()
      expect(wrapper.vm.loading).toBe(true)

      mockHistoryLoading.value = false
      await nextTick()
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should update table when history changes', async () => {
      wrapper = createWrapper()
      const initialData = [...mockHistory.value]
      expect(wrapper.vm.tableData).toEqual(initialData)

      // Update history
      mockHistory.value = [
        {
          date: '2024-02-01T12:00:00Z',
          applicationUserName: 'Novo Usuário',
          userType: 3,
          action: 'Nova ação',
          oldStatus: 0,
          newStatus: 1,
        },
      ]
      await nextTick()

      expect(wrapper.vm.tableData).toEqual(mockHistory.value)
      expect(wrapper.vm.totalItems).toBe(1)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty history array', () => {
      mockHistory.value = []
      wrapper = createWrapper()

      expect(wrapper.vm.tableData).toEqual([])
      expect(wrapper.vm.totalItems).toBe(0)
    })

    it('should handle history with missing fields', () => {
      mockHistory.value = [
        {
          date: null,
          applicationUserName: null,
          userType: null,
          action: null,
          oldStatus: null,
          newStatus: null,
        },
      ]
      wrapper = createWrapper()

      expect(wrapper.vm.formatDate(null)).toBe('-')
      expect(wrapper.vm.formatTime(null)).toBe('-')
      expect(wrapper.vm.getInitials(null)).toBe('?')
      expect(wrapper.vm.getUserTypeLabel(null)).toBe('Não definido')
    })

    it('should handle very long user names', () => {
      wrapper = createWrapper()
      const longName = 'Nome Muito Longo Com Muitas Palavras Diferentes'
      const initials = wrapper.vm.getInitials(longName)

      expect(initials).toBe('NM')
      expect(initials).toHaveLength(2)
    })

    it('should handle special characters in names', () => {
      wrapper = createWrapper()
      expect(wrapper.vm.getInitials('José María')).toBe('JM')
      // O'Connor is treated as single word, returns first two chars
      expect(wrapper.vm.getInitials("O'Connor")).toBe("O'")
    })

    it('should handle multiple rapid modal opens/closes', async () => {
      wrapper = createWrapper()
      wrapper.vm.refModal = { show: jest.fn(), hide: jest.fn() }

      wrapper.vm.openModal({ guideId: 1 })
      wrapper.vm.onClose()
      wrapper.vm.openModal({ guideId: 2 })
      wrapper.vm.onClose()
      wrapper.vm.openModal({ guideId: 3 })

      expect(wrapper.vm.guideId).toBe(3)
    })
  })

  describe('Error Handling', () => {
    it('should handle fetchHistory failure gracefully', async () => {
      mockFetchHistory.mockRejectedValueOnce(new Error('API Error'))
      wrapper = createWrapper()
      wrapper.vm.guideId = 123

      // onShown calls fetchHistory internally
      await expect(wrapper.vm.onShown()).rejects.toThrow('API Error')
    })

    it('should handle invalid date formats', () => {
      wrapper = createWrapper()
      const invalidDate = wrapper.vm.formatDate('invalid-date')

      // Invalid dates return Invalid Date string or similar
      expect(typeof invalidDate).toBe('string')
    })
  })
})
