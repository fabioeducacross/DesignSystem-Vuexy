// Desestruturar serviços mockados e store para facilitar o acesso
import router from '@/router'
import {
  getMissionsRanking,
  getMissionsRankingExportExcel,
} from '@/services/shared/ranking/Ranking.Service'
import { getGuidePlusReportClassRounds } from '@/services/teacher-context/guides/Guides.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { useMissionPlusRanking } from '@/views/reports/missionPlus/classe-report/ranking/useMissionPlusRanking.js'
import { saveAs } from 'file-saver'
import { computed, toRef } from 'vue'

// Mock de módulos externos
// Mock do Vue Router
jest.mock('@/router', () => ({
  currentRoute: {
    params: {
      guideId: 'mock-guide-id',
    },
  },
}))

// Mock dos Serviços de API
jest.mock('@/services/shared/ranking/Ranking.Service', () => ({
  getMissionsRanking: jest.fn(),
  getMissionsRankingExportExcel: jest.fn(),
}))

jest.mock('@/services/teacher-context/guides/Guides.Service', () => ({
  getGuidePlusReportClassRounds: jest.fn(),
}))

// Mock do Vuex Store
jest.mock('@/store', () => ({
  getters: {}, // Será definido dinamicamente no beforeEach
  commit: jest.fn(),
}))

// *** CORREÇÃO AQUI: Importe `ref` DENTRO da função de fábrica do mock ***
jest.mock('@/store/filters/useFilters', () => {
  // Importe ref aqui, dentro do escopo da função da fábrica do mock
  const { ref } = require('vue') // Use 'require' para garantir que seja carregado no momento certo
  return {
    __esModule: true,
    default: jest.fn(() => ({
      classe: ref({
        // 'ref' agora está acessível aqui
        ClassId: 1,
        SerieId: 10,
        Name: 'Mock Class',
        SerieName: 'Mock Serie',
      }),
      subject: ref({
        // 'ref' agora está acessível aqui
        id: 100,
      }),
    })),
  }
})

// Mock de utilitários
jest.mock('@/utils/utils', () => ({
  sanitizeString: jest.fn(str => str.replace(/[^a-zA-Z0-9.-]/g, '_')), // Mock simples para sanitizar
}))

// Mock do file-saver
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}))

describe('useMissionPlusRanking', () => {
  const MODULE_NAME = 'rankingMissionsModule'
  let mockStoreGetters
  let createHook
  let hook

  beforeEach(() => {
    jest.clearAllMocks() // Limpa os mocks antes de cada teste

    // Inicializa os getters mockados do store
    mockStoreGetters = {
      [`${MODULE_NAME}/total`]: 0,
      [`${MODULE_NAME}/loading`]: false,
      [`${MODULE_NAME}/title`]: {
        subjectId: 0,
        status: 0,
        startDate: '',
        endDate: '',
        title: '',
        className: '',
        serieName: '',
      },
      [`${MODULE_NAME}/dataTable`]: [],
      [`${MODULE_NAME}/rounds`]: [],
      [`${MODULE_NAME}/loadingTable`]: false,
      [`${MODULE_NAME}/excelLoading`]: false,
      [`${MODULE_NAME}/subjectId`]: 0,
    }

    // Define dinamicamente os getters do store para o teste
    Object.defineProperty(store, 'getters', {
      get: () => mockStoreGetters,
    })

    // Função auxiliar para criar o hook com os mocks atuais
    createHook = () => useMissionPlusRanking()

    // Chama o hook para obter seus valores de retorno
    hook = createHook()
  })

  // --- Testes de Propriedades Computadas ---
  describe('propriedades computadas', () => {
    it('total deve obter e commitar para o store', () => {
      expect(hook.total.value).toBe(0) // Inicial
      mockStoreGetters[`${MODULE_NAME}/total`] = 10
      hook = createHook()
      expect(hook.total.value).toBe(10) // Após atualização do getter

      hook.total.value = 20 // Define via hook
      expect(store.commit).toHaveBeenCalledWith(`${MODULE_NAME}/total`, 20)
    })

    it('loading deve obter e commitar para o store', () => {
      expect(hook.loading.value).toBe(false)
      mockStoreGetters[`${MODULE_NAME}/loading`] = true
      hook = createHook()
      expect(hook.loading.value).toBe(true)

      hook.loading.value = false
      expect(store.commit).toHaveBeenCalledWith(`${MODULE_NAME}/loading`, false)
    })

    it('title deve obter e commitar para o store', () => {
      const initialTitle = {
        title: 'Initial Title',
      }
      mockStoreGetters[`${MODULE_NAME}/title`] = initialTitle
      hook = createHook()
      expect(hook.title.value).toEqual(initialTitle)

      const newTitle = {
        title: 'New Title',
      }
      hook.title.value = newTitle
      expect(store.commit).toHaveBeenCalledWith(`${MODULE_NAME}/title`, newTitle)
    })

    it('dataTable deve obter e commitar para o store', () => {
      const initialData = [
        {
          id: 1,
        },
      ]
      mockStoreGetters[`${MODULE_NAME}/dataTable`] = initialData
      hook = createHook()
      expect(hook.dataTable.value).toEqual(initialData)

      const newData = [
        {
          id: 2,
        },
      ]
      hook.dataTable.value = newData
      expect(store.commit).toHaveBeenCalledWith(`${MODULE_NAME}/dataTable`, newData)
    })

    it('rounds deve obter e commitar para o store', () => {
      const initialRounds = [
        {
          round: 'A',
        },
      ]
      mockStoreGetters[`${MODULE_NAME}/rounds`] = initialRounds
      hook = createHook()
      expect(hook.rounds.value).toEqual(initialRounds)

      const newRounds = [
        {
          round: 'B',
        },
      ]
    })
  })
})