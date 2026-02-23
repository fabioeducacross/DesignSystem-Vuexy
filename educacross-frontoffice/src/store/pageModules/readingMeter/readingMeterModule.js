import {
  fetchBookLibrary,
  fetchBookLibraryReport,
  fetchReadingDetails,
  fetchReadings,
  fetchReadingsTest,
  fetchReadingsTestReport,
} from '@/services/shared/readingMeter/readingMeter.service'
import useFilters from '@/store/filters/useFilters.js'

const defaultState = () => {
  return {
    loading: true,
    loadingReport: true,
    schoolYear: null,
    status: {
      id: null,
      text: 'Todos os status',
    },
    proficiency: {
      id: null,
      text: 'Todos os níveis de proficiência',
    },
    test: {
      id: null,
      name: 'Todos os testes',
    },
    typeTest: {},
    params: {
      Search: '',
      OrderBy: null,
      Page: 1,
      PageSize: 10,
      Ascending: 'true',
      ClassId: null,
    },

    filter: {
      readingMaterial: null,
      periode: null,
    },

    pagination: {
      totalData: 1,
    },
    students: [],
    readings: [],
    readingsTest: [],
    readingsTestReport: {},
    readingFluencyEvaluation: {},
    readingDetail: {
      report: {
        accuracy: {
          correctWords: 0,
          pronuncedWords: 0,
        },
        referenceWords: [],
        transcription: [],
      },
      indicators: [],
    },
    libraryBooks: [],
    libraryBooksParams: {
      Search: '',
      OrderBy: null,
      Page: 1,
      PageSize: 10,
      Ascending: 'true',
      ClassId: null,
    },
    libraryBooksTotal: 0,
    libraryBookStudentsData: {
      students: [],
    },
    libraryBookStudentsParams: {
      bookId: null,
    },
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    loading(state, value) {
      state.loading = value
    },
    loadingReport(state, value) {
      state.loadingReport = value
    },
    readings(state, value) {
      state.readings = value
    },
    readingDetail(state, value) {
      state.readingDetail = value
    },
    readingsTest(state, value) {
      state.readingsTest = value
    },
    readingsTestReport(state, value) {
      state.readingsTestReport = value
    },
    readingFluencyEvaluation(state, value) {
      state.readingFluencyEvaluation = value
    },
    test(state, value) {
      state.test = value
    },
    typeTest(state, value) {
      state.typeTest = value
    },
    students(state, value) {
      state.students = value
    },
    setSchoolYear(state, schoolYear) {
      state.schoolYear = schoolYear
    },
    setStatus(state, status) {
      state.status = status
    },
    setProficiency(state, proficiency) {
      state.proficiency = proficiency
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },
    reset(state) {
      Object.assign(state, defaultState())
    },
    pagination(state, data) {
      Object.assign(state.pagination, data)
    },
    libraryBooks(state, data) {
      state.libraryBooks = data
    },
    libraryBooksParams(state, data) {
      state.libraryBooksParams = data
    },
    libraryBooksTotal(state, data) {
      state.libraryBooksTotal = data
    },
    libraryBookStudentsData(state, data) {
      Object.assign(state.libraryBookStudentsData, data)
    },
    libraryBookStudentsParams(state, data) {
      Object.assign(state.libraryBookStudentsParams, data)
    },
  },
  getters: {
    readings(state) {
      return state.readings
    },
    readingsTest(state) {
      return state.readingsTest
    },
    readingsTestReport(state) {
      return state.readingsTestReport
    },
    test: state => state.test,
    typeTest: state => state.typeTest,
    students: state => state.students,
    schoolYear: state => state.schoolYear,
    status: state => state.status,
    proficiency: state => state.proficiency,
    loading: state => state.loading,
    loadingReport: state => state.loadingReport,
    readingDetail(state) {
      return state.readingDetail
    },
    readingFluencyEvaluation(state) {
      return state.readingFluencyEvaluation
    },
    params(state) {
      return state.params
    },
    pagination(state) {
      return state.pagination
    },
    libraryBooks(state) {
      return state.libraryBooks
    },
    libraryBooksParams(state) {
      return state.libraryBooksParams
    },
    libraryBooksTotal(state) {
      return state.libraryBooksTotal
    },
    libraryBookStudentsData(state) {
      return state.libraryBookStudentsData
    },
    libraryBookStudentsParams(state) {
      return state.libraryBookStudentsParams
    },
  },
  actions: {
    async fetchData({ commit, getters }) {
      const { classe } = useFilters()
      commit('loading', true)
      const params = {
        SerieId: getters.schoolYear?.id,
        Status: getters.status?.id,
        ...getters.params,
      }

      params.ClassId = classe.value.ClassId
      const res = await fetchReadings(params)

      const { status, data } = res

      if (status !== 200) return

      const { total } = data

      commit('readings', data.data)
      commit('pagination', { totalData: total })

      commit('loading', false)
    },

    async fetchDataTest({ commit, getters }, { testId, classId }) {
      commit('loading', true)

      const res = await fetchReadingsTest(testId, {
        Proficiency: getters.proficiency?.id,
        classId,
        ...getters.params,
      })

      const { status, data } = res

      if (status !== 200) return

      const { total } = data

      commit('readingsTest', data.data)
      commit('pagination', { totalData: total })

      commit('loading', false)
    },
    async fetchDataTestReport({ commit }, { testId, classId }) {
      commit('loadingReport', true)

      const res = await fetchReadingsTestReport(testId, {
        classId,
      })

      const { status, data } = res

      if (status !== 200) return

      commit('readingsTestReport', data)

      commit('loadingReport', false)
    },
    async fetchReadingDetails({ commit }, { testId, classId, studentId, readingDate }) {
      commit('loading', true)

      const res = await fetchReadingDetails({ testId, classId, studentId, readingDate })

      const { status, data } = res

      if (status !== 200) return

      commit('readingDetail', data)
      commit('loading', false)
    },
    async fetchBookLibrary({ commit, getters }) {
      const { classe } = useFilters()

      commit('loading', true)

      const params = getters.libraryBooksParams
      const classId = classe.value.ClassId

      const res = await fetchBookLibrary({ ...params, classId })

      const { status, data } = res

      if (status !== 200) return

      commit('libraryBooks', data.data)
      commit('libraryBooksTotal', data.total)

      commit('loading', false)
    },
    async fetchBookStudents({ commit, getters }, bookId) {
      const { classe } = useFilters()
      commit('loading', true)

      const params = getters.libraryBookStudentsParams
      const classId = classe.value.ClassId

      const res = await fetchBookLibraryReport({ ...params, classId, bookId })

      const { data } = res

      commit('libraryBookStudentsData', data)

      commit('loading', false)
    },
  },
}
