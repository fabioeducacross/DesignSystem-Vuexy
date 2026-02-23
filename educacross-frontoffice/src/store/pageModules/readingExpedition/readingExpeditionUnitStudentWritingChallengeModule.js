import { getWritingChallenge } from '@/services/shared/reading-expedition/reading-expedition.service.js'

export default {
  namespaced: true,
  state: {
    loading: true,
    data: [],
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    data(state, payload) {
      state.data = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    data(state) {
      return state.data
    },
  },
  actions: {
    async fetch({ commit, rootGetters }) {
      commit('loading', true)
      const studentId = rootGetters['readingExpeditionUnitStudentModule/studentId']
      const stage = rootGetters['ReadingExpeditionModule/unitId']
      const { data } = await getWritingChallenge(studentId, { Stage: stage })

      commit('ReadingExpeditionModule/studentName', data.studentName, { root: true })
      commit('data', data.proposal)
      commit('loading', false)
    },
    reset({ commit }) {
      commit('data', [])
      commit('loading', true)
    },
  },
}
