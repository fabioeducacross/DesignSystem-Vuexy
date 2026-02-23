import { getReadingExpeditionUnitChallenges } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import useFilters from '@/store/filters/useFilters'

const { classe } = useFilters()

export default {
  namespaced: true,
  state: {
    challenges: [],
    proficiency: {},
    lastAccess: '',
    loading: true,
    loadingChallenges: true,
    studentId: null,
    // header
    audioFileUrl: null,
    lastAccessDate: null,
    totalSeconds: 0,
    currentProficiency: {},
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    loadingChallenges(state, payload) {
      state.loadingChallenges = payload
    },
    proficiency(state, payload) {
      state.proficiency = payload
    },
    lastAccess(state, payload) {
      state.lastAccess = payload
    },
    challenges(state, payload) {
      state.challenges = payload
    },
    audioFileUrl(state, payload) {
      state.audioFileUrl = payload
    },
    lastAccessDate(state, payload) {
      state.lastAccessDate = payload
    },
    studentId(state, payload) {
      state.studentId = payload
    },
    currentProficiency(state, payload) {
      state.currentProficiency = payload || {}
    },
    totalSeconds(state, payload) {
      state.totalSeconds = payload || 0
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    loadingChallenges(state) {
      return state.loadingChallenges
    },
    proficiency(state) {
      return state.proficiency
    },
    lastAccess(state) {
      return state.lastAccess
    },
    challenges(state) {
      return state.challenges
    },
    audioFileUrl(state) {
      return state.audioFileUrl
    },
    lastAccessDate(state) {
      return state.lastAccessDate
    },
    studentId(state) {
      return state.studentId
    },
    currentProficiency(state) {
      return state.currentProficiency
    },
    totalSeconds(state) {
      return state.totalSeconds
    },
  },
  actions: {
    async fetchChallenges({ commit, getters, rootGetters }) {
      commit('loading', true)
      commit('loadingChallenges', true)

      const studentId = getters.studentId

      const unitId = rootGetters['ReadingExpeditionModule/unitId']

      getReadingExpeditionUnitChallenges({
        Stage: unitId,
        ClassId: classe.value.ClassId,
        StudentId: studentId,
      }).then(({ data }) => {
        commit('challenges', data)
        commit('loadingChallenges', false)
      })
    },
    reset({ commit }) {
      commit('loading', true)
      commit('loadingChallenges', true)
      commit('lastAccess', '')
      commit('challenges', [])
    },
    setChallengeDetails({ commit }, payload) {
      commit('audioFileUrl', payload.audioFileUrl)
      commit('lastAccessDate', payload.lastAccessDate)
      commit('currentProficiency', payload.currentProficiency)
      commit('totalSeconds', payload.totalSeconds)
      commit('loading', false)
    },
    resetChallengeDetails({ commit }) {
      commit('audioFileUrl', null)
      commit('lastAccessDate', null)
      commit('currentProficiency', {})
      commit('totalSeconds', 0)
      commit('loading', false)
    },
  },
}
