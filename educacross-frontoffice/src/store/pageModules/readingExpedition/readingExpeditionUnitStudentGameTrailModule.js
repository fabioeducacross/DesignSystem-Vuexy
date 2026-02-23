import {
  getGamesTrailList,
  getGamesTrailListDetails,
} from '@/services/shared/reading-expedition/reading-expedition.service.js'

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

const defaultStudentDetailsModal = () => {
  return {
    name: '',
    imagelUrl: '',
    challengesDone: 0,
    attempts: 0,
    activityAttempt: [],
  }
}

export default {
  namespaced: true,
  state: {
    mission: {},
    data: [],
    total: 0,
    activityId: null,
    guide: null,
    loading: false,
    studentName: '',
    studentDetailsModal: defaultStudentDetailsModal(),
    loadingStudentDetailsModal: true,
    params: defaultParams(),
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    mission(state, payload) {
      state.mission = payload
    },
    params(state, params) {
      Object.assign(state.params, params)
    },
    data(state, payload) {
      state.data = payload
    },
    total(state, payload) {
      state.total = payload
    },

    loadingStudentDetailsModal(state, payload) {
      state.loadingStudentDetailsModal = payload
    },
    studentName(state, payload) {
      state.studentName = payload
    },
    studentDetailsModal(state, payload) {
      state.studentDetailsModal = payload
    },
    activityId(state, payload) {
      state.activityId = payload
    },
    guide(state, payload) {
      state.guide = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    mission(state) {
      return state.mission
    },
    data(state) {
      return state.data
    },
    total(state) {
      return state.total
    },
    loadingStudentDetailsModal(state) {
      return state.loadingStudentDetailsModal
    },
    studentName(state) {
      return state.studentName
    },
    studentDetailsModal(state) {
      return state.studentDetailsModal
    },
    activityId(state) {
      return state.activityId
    },
    guide(state) {
      return state.guide
    },
  },
  actions: {
    async fetchGamesTrail({ commit, getters, rootGetters }) {
      commit('loading', true)

      const studentId = rootGetters['readingExpeditionUnitStudentModule/studentId']
      const stage = rootGetters['ReadingExpeditionModule/unitId']

      const guideId = getters.guide?.id

      try {
        const res = await getGamesTrailList(studentId, { Stage: stage, guideId })

        const { data } = res
        commit('data', data || {})

        commit('ReadingExpeditionModule/studentName', data.studentName, { root: true })
      } finally {
        commit('loading', false)
      }
    },

    async fetchStudentDetails({ commit, rootGetters }, { activityId, guideId }) {
      commit('loadingStudentDetailsModal', true)

      const studentId = rootGetters['readingExpeditionUnitStudentModule/studentId']

      try {
        const res = await getGamesTrailListDetails(studentId, { guideId, activityId })

        commit('studentDetailsModal', res.data)
      } finally {
        commit('loadingStudentDetailsModal', false)
      }
    },

    reset({ commit }) {
      commit('data', [])
      commit('total', 0)
      commit('loading', true)
    },
  },
}
