import {
  fetchReadingsEvaluation,
  fetchReadingsEvaluationStudents,
  fetchReadingsEvaluationDetail,
  fetchReadingsEvaluationProficiency,
} from '@/services/shared/readingMeterEvaluation/readingMeterEvaluation.service'

const defaultState = () => {
  return {
    loading: true,
    status: {
      id: null,
      text: 'Todos os status',
    },
    progress: {
      id: null,
      text: 'Todos os progressos',
    },
    omitAudited: false,
    proficiency: {
      id: null,
      text: 'Todas proficiências',
    },
    exerciseType: {
      types: [1, 2],
      name: 'Todos os tipos de testes',
      image: null,
      variant: null,
    },
    params: {
      Search: '',
      OrderBy: null,
      Page: 1,
      PageSize: 10,
      Ascending: 'true',
      ClassId: null,
    },
    pagination: {
      totalData: 1,
    },
    readingsTest: [],
    typeTest: {
      type: '',
      name: '',
    },
    readings: [],
    readingEvaluationDetail: {
      types: [],
      evaluationName: '',
      students: [],
      testId: null,
      status: null,
      serieName: '',
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
    readings(state, value) {
      state.readings = value
    },
    typeTest(state, value) {
      state.typeTest = value
    },
    readingsTest(state, value) {
      state.readingsTest = value
    },
    readingEvaluationDetail(state, value) {
      state.readingEvaluationDetail = value
    },
    setExerciseType(state, payload) {
      state.exerciseType = payload
    },
    setProficiency(state, proficiency) {
      state.proficiency = proficiency
    },
    setOmitAudited(state, omitAudited) {
      state.omitAudited = omitAudited
    },
    setProgress(state, progress) {
      state.progress = progress
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
  },
  getters: {
    readings(state) {
      return state.readings
    },
    readingsTest(state) {
      return state.readingsTest
    },
    exerciseType(state) {
      return state.exerciseType
    },
    proficiency: state => state.proficiency,
    omitAudited: state => state.omitAudited,
    progress: state => state.progress,
    loading: state => state.loading,
    readingEvaluationDetail(state) {
      return state.readingEvaluationDetail
    },
    params(state) {
      return state.params
    },
    pagination(state) {
      return state.pagination
    },
    typeTest(state) {
      return state.typeTest
    },
  },
  actions: {
    async fetchEvaluationDetail({ commit, getters }, { evaluationId }) {
      commit('loading', true)
      const params = getters.params

      const [detailRes, studentsRes, proficiency] = await Promise.all([
        fetchReadingsEvaluationDetail(evaluationId),
        fetchReadingsEvaluationStudents(evaluationId, params),
        fetchReadingsEvaluationProficiency(),
      ])

      const total = studentsRes.data.total

      const { data } = detailRes

      const { indicators } = proficiency.data.find(item => item.serieId === data.serieId)
      const students = studentsRes.data.data

      commit('pagination', { totalData: total })

      commit('readingEvaluationDetail', {
        ...data,
        students,
        indicators,
      })

      commit('loading', false)
    },
    async fetchData({ commit, getters }) {
      commit('loading', true)

      const res = await fetchReadingsEvaluation({
        progress: getters.progress?.id,
        type: getters.exerciseType?.types.length > 1 ? '' : getters.exerciseType?.types[0],
        ...getters.params,
      })

      const { data } = res

      const { total } = data

      commit('readings', data.data)
      commit('pagination', { totalData: total })

      commit('loading', false)
    },
    async fetchEvaluationStudents({ commit, getters }, { evaluationId }) {
      commit('loading', true)

      const res = await fetchReadingsEvaluationStudents(evaluationId, {
        Proficiency: getters.proficiency?.id,
        omitAudited: getters.omitAudited,
        ReadingFluencyTestId: getters.typeTest.id,
        ...getters.params,
      })

      const { data } = res

      const { total } = data

      commit('readingEvaluationDetail', {
        ...getters.readingEvaluationDetail,
        students: data.data,
      })
      commit('pagination', { totalData: total })

      commit('loading', false)
    },
  },
}
