import {
  getReadingFluency,
  getReadingFluencyTestResults,
} from '@/services/shared/reading-expedition/reading-expedition.service.js'
import useFilters from '@/store/filters/useFilters'
import { calcPercent } from '@/utils/number.js'

const { classe } = useFilters()

const readingDetailDefault = () => {
  return {
    report: {
      accuracy: {
        correctWords: 0,
        pronuncedWords: 0,
      },
      referenceWords: [],
      transcription: [],
    },
    indicators: [],
  }
}

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

export default {
  namespaced: true,
  state: {
    data: [],
    total: 0,
    proficiency: [],
    totalStudents: 0,
    loading: true,
    readingDetail: readingDetailDefault(),
    params: defaultParams(),
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    data(state, payload) {
      state.data = payload
    },
    total(state, payload) {
      state.total = payload
    },
    proficiency(state, payload) {
      state.proficiency = payload
    },
    totalStudents(state, payload) {
      state.totalStudents = payload
    },
    readingDetail(state, value) {
      state.readingDetail = value
    },
    params(state, params) {
      state.params = params
    },
    reset(state) {
      state.data = []
      state.proficiency = []
      state.totalStudents = 0
      state.loading = true
      state.readingDetail = readingDetailDefault()
      state.params = defaultParams()
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    data(state) {
      return state.data
    },
    total(state) {
      return state.total
    },
    proficiency(state) {
      return state.proficiency
    },
    totalStudents(state) {
      return state.totalStudents
    },
    readingDetail(state) {
      return state.readingDetail
    },
    search(state) {
      return state.params.Search
    },
  },
  actions: {
    async fetch({ commit, state, rootGetters }) {
      commit('loading', true)
      const testId = rootGetters['ReadingExpeditionModule/testId']
      if (!testId) return

      const { data } = await getReadingFluencyTestResults({
        ClassId: classe.value.ClassId,
        Stage: testId,
        ...state.params,
      })

      commit('data', data.students.data)
      commit('total', data.students.total)
      commit('proficiency', [
        {
          proficiency: 0,
          students: data.amountStudentsNotStarted,
          percentage: calcPercent(data.amountStudentsNotStarted, data.amountStudents),
        },
        {
          proficiency: 1,
          students: data.amountStudentsBellowBasic,
          percentage: calcPercent(data.amountStudentsBellowBasic, data.amountStudents),
        },
        {
          proficiency: 2,
          students: data.amountStudentsBasic,
          percentage: calcPercent(data.amountStudentsBasic, data.amountStudents),
        },
        {
          proficiency: 3,
          students: data.amountStudentsProficient,
          percentage: calcPercent(data.amountStudentsProficient, data.amountStudents),
        },
        {
          proficiency: 4,
          students: data.amountStudentsAdvenced,
          percentage: calcPercent(data.amountStudentsAdvenced, data.amountStudents),
        },
      ])
      commit('totalStudents', data.amountStudents)

      commit('loading', false)
    },

    async fetchReadingDetails({ commit }, { testId, studentId }) {
      commit('loading', true)

      const { data } = await getReadingFluency(studentId, {
        Stage: testId,
      })

      commit('ReadingExpeditionModule/studentName', data.studentName, { root: true })
      commit('readingDetail', data)
      commit('loading', false)
    },

    reset({ commit }) {
      commit('reset')
    },
  },
}
