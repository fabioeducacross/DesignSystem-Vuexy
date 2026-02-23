import axiosIns from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    subjectId: null,
    evaluationId: null,
    studentId: null,
    classId: null,
    loading: true,
    header: {
      updatedAt: '',
    },
    cards: {
      studentName: '',
      totalQuestions: 0,
      hits: 0,
      classPerformance: 0,
      performance: 0,
      totalTime: 0,
      classAverageTime: 0,
    },
    filters: {
      educationalOrganizationId: null,
    },
    cardsComp: {
      knowledgeAxes: [
        {
          knowledgeAxisName: '',
          descriptors: [''],
        },
      ],
    },
    tableStrongWeak: {
      descriptorsStrong: [],
      descriptorsToImprove: [],
    },
    feedback: {
      questions: [],
    },
  },
  getters: {
    subjectId(state) {
      return state.subjectId
    },
    evaluationId(state) {
      return state.evaluationId
    },
    studentId(state) {
      return state.studentId
    },
    header(state) {
      return state.header
    },
    cards(state) {
      return state.cards
    },
    filters(state) {
      return state.filters
    },
    cardsComp(state) {
      return state.cardsComp
    },
    tableStrongWeak(state) {
      return state.tableStrongWeak
    },
    feedback(state) {
      return state.feedback
    },
    studentName(state) {
      return state.cards.studentName
    },
    loading(state) {
      return state.loading
    },
    classId(state) {
      return state.classId
    },
  },
  mutations: {
    subjectId(state, data) {
      state.subjectId = data
    },
    evaluationId(state, data) {
      state.evaluationId = data
    },
    studentId(state, data) {
      state.studentId = data
    },
    header(state, data) {
      state.header = data
    },
    cards(state, data) {
      // state.cards = data
      Object.assign(state.cards, data)
    },
    filters(state, data) {
      state.filters = data
    },
    cardsComp(state, data) {
      // state.cardsComp = data
      Object.assign(state.cardsComp, data)
    },
    tableStrongWeak(state, data) {
      // state.tableStrongWeak = data
      Object.assign(state.tableStrongWeak, data)
    },
    feedback(state, data) {
      state.feedback = data
    },
    loading(state, data) {
      state.loading = data
    },
    classId(state, data) {
      state.classId = data
    },
    reset(state) {
      Object.assign(state.cards, {
        totalQuestions: 0,
        hits: 0,
        classPerformance: 0,
        performance: 0,
        totalTime: 0,
        classAverageTime: 0,
        studentName: '',
      })
      Object.assign(state.cardsComp, {
        knowledgeAxes: [
          {
            knowledgeAxisName: '',
            descriptors: [''],
          },
        ],
      })
      Object.assign(state.tableStrongWeak, {
        descriptorsStrong: [],
        descriptorsToImprove: [],
      })

      state.feedback = {
        questions: [],
      }
    },
  },
  actions: {
    async fetchData({ rootGetters, commit }) {
      const evaluationId = rootGetters['EvaluationTCTStudentsDetail/evaluationId']
      const studentId = rootGetters['EvaluationTCTStudentsDetail/studentId']
      const classId = rootGetters['EvaluationTCTStudentsDetail/classId']
      const { educationalOrganizationId } = rootGetters['EvaluationTCTStudentsDetail/filters']

      const subjectId = rootGetters['evaluations/subjectId']

      if (!subjectId) {
        return
      }

      commit('loading', true)

      const res = await axiosIns.get(`v1/evaluations/${evaluationId}/student`, {
        params: {
          subjectId,
          classId,
          studentId,
          educationalOrganizationId,
        },
      })

      commit('loading', false)

      if (res.status !== 200) {
        // commit('reset')
        return
      }

      const { data } = res

      const cards = {
        studentName: data.studentName,
        totalQuestions: data.totalQuestions,
        hits: data.hits,
        classPerformance: data.classPerformance,
        performance: data.performance,
        totalTime: data.totalTime,
        classAverageTime: data.classAverageTime,
      }

      commit('cards', cards)

      const cardsComp = {
        knowledgeAxes: data.knowledgeAxes,
      }

      commit('cardsComp', cardsComp)

      const tableStrongWeak = {
        descriptorsStrong: data.descriptorsStrong,
        descriptorsToImprove: data.descriptorsToImprove,
      }

      commit('tableStrongWeak', tableStrongWeak)

      const feedback = {
        questions: data.questions,
      }

      commit('feedback', feedback)
    },
  },
}
