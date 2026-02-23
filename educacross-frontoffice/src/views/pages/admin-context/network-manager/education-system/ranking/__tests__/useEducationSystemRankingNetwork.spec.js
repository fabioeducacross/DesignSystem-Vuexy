import * as EducationSystemService from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import store from '@/store'
import { saveAs } from 'file-saver'
import Vue from 'vue'

jest.mock('@/services/teacher-context/educationSystem/EducationSystem.Service')
jest.mock('@/store', () => ({
  getters: {},
  commit: jest.fn(),
}))
jest.mock('file-saver', () => ({ saveAs: jest.fn() }))
jest.mock('@/store/table/useTable.js', () => () => ({
  loading: false,
  dataTable: [],
  reset: jest.fn(),
}))

jest.mock('@/store/filters/useFilters', () => {
  const Vue = require('vue')
  const { ref } = require('vue')

  // Create the mock filters object
  const filters = {
    classe: ref({ id: 7, name: 'Classe' }),
    subject: ref({ id: 1 }),
    period: ref(null),
    parentModule: ref(null),
    childModule: ref(null),
    educationSystemId: ref(2),
    book: ref({ id: 3, name: 'Book' }),
    mission: ref({ id: 4 }),
    networkGroup: ref({ id: 5 }),
    serie: ref({ id: 6, name: 'Serie' }),
    month: ref({ id: 9 }),
  }

  return () => filters
})

const mockGetters = store.getters
const mockCommit = store.commit

let useEducationSystemRankingNetwork

// Get the mocked filters after jest.mock has run
const getMockFilters = () => require('@/store/filters/useFilters')()

describe('useEducationSystemRankingNetwork', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockFilters = getMockFilters()
    mockFilters.classe.value = { id: 7, name: 'Classe' }
    mockFilters.subject.value = { id: 1 }
    mockFilters.educationSystemId.value = 2
    mockFilters.book.value = { id: 3, name: 'Book' }
    mockFilters.mission.value = { id: 4 }
    mockFilters.networkGroup.value = { id: 5 }
    mockFilters.serie.value = { id: 6, name: 'Serie' }
    mockFilters.period.value = null
    mockFilters.parentModule.value = null
    mockFilters.childModule.value = null
    mockFilters.month.value = { id: 9 }
    useEducationSystemRankingNetwork =
      require('@/views/pages/admin-context/network-manager/education-system/ranking/useEducationSystemRankingNetwork').default
    mockGetters['educationSystemRankingNetworkModule/ranking'] = null
    mockGetters['educationSystemRankingNetworkModule/month'] = { id: 9 }
    mockGetters['educationSystemRankingNetworkModule/loading'] = false
    mockGetters['educationSystemRankingNetworkModule/excelLoading'] = false
    mockGetters['educationSystemRankingNetworkModule/classe'] = { id: 7, name: 'Classe' }
    mockGetters['educationSystemRankingNetworkModule/educationSystemName'] = 'EduSystem'
    mockCommit.mockImplementation((type, payload) => {
      mockGetters[type] = payload
    })
  })

  it('should expose all properties and methods', () => {
    const composable = useEducationSystemRankingNetwork()
    expect(composable).toHaveProperty('moduleName')
    expect(composable).toHaveProperty('ranking')
    expect(composable).toHaveProperty('book')
    expect(composable).toHaveProperty('mission')
    expect(composable).toHaveProperty('month')
    expect(composable).toHaveProperty('loading')
    expect(composable).toHaveProperty('excelLoading')
    expect(composable).toHaveProperty('serie')
    expect(composable).toHaveProperty('classe')
    expect(composable).toHaveProperty('bookFirstoption')
    expect(composable).toHaveProperty('missionFirstOption')
    expect(composable).toHaveProperty('monthFirstOption')
    expect(composable).toHaveProperty('fetchRanking')
    expect(composable).toHaveProperty('exportExcel')
  })

  describe('fetchRanking', () => {
    it('should not fetch if serie id is missing', async () => {
      const mockFilters = getMockFilters()
      mockFilters.serie.value.id = null
      const { fetchRanking } = useEducationSystemRankingNetwork()
      await fetchRanking()
      expect(EducationSystemService.getEducationSystemRankingNetwork).not.toHaveBeenCalled()
    })

    it('should fetch and set ranking on success', async () => {
      const mockFilters = getMockFilters()
      mockFilters.serie.value.id = 6
      const mockData = { educationSystemName: 'Test', bookName: 'BookName', ranking: [1, 2] }
      EducationSystemService.getEducationSystemRankingNetwork.mockResolvedValue({
        status: 200,
        data: mockData,
      })
      const { fetchRanking, book } = useEducationSystemRankingNetwork()
      await fetchRanking()
      expect(EducationSystemService.getEducationSystemRankingNetwork).toHaveBeenCalled()
      expect(store.commit).toHaveBeenCalledWith(
        'educationSystemRankingNetworkModule/ranking',
        mockData,
      )
      expect(store.commit).toHaveBeenCalledWith(
        'educationSystemRankingNetworkModule/educationSystemName',
        'Test',
      )
      expect(book.value.name).toBe('BookName')
    })

    it('should set empty ranking on error', async () => {
      const mockFilters = getMockFilters()
      mockFilters.serie.value.id = 6
      EducationSystemService.getEducationSystemRankingNetwork.mockResolvedValue({ status: 500 })
      const { fetchRanking } = useEducationSystemRankingNetwork()
      await fetchRanking()
      expect(store.commit).toHaveBeenCalledWith(
        'educationSystemRankingNetworkModule/educationSystemName',
        '',
      )
      expect(store.commit).toHaveBeenCalledWith('educationSystemRankingNetworkModule/ranking', {
        educationSystemName: '',
        ranking: [],
      })
    })
  })

  describe('exportExcel', () => {
    it('should not export if already loading', async () => {
      mockGetters['educationSystemRankingNetworkModule/excelLoading'] = true
      const { exportExcel } = useEducationSystemRankingNetwork()
      await exportExcel()
      expect(EducationSystemService.getEducationSystemRankingExcel).not.toHaveBeenCalled()
    })

    it('should call saveAs on success', async () => {
      mockGetters['educationSystemRankingNetworkModule/excelLoading'] = false
      const mockBlob = new Blob(['test'])
      EducationSystemService.getEducationSystemRankingExcel.mockResolvedValue({
        status: 200,
        data: mockBlob,
      })
      const { exportExcel, ranking, classe, serie } = useEducationSystemRankingNetwork()
      ranking.value = { educationSystemName: 'Edu', ranking: [], bookName: null }
      classe.value = { id: 7, name: 'Classe' }
      serie.value = { id: 6, name: 'Serie' }
      await exportExcel()
      expect(EducationSystemService.getEducationSystemRankingExcel).toHaveBeenCalled()
      expect(saveAs).toHaveBeenCalled()
    })
  })
})