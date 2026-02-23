import {
  getEventIndividualReportStudentsDashboard,
  getEventResultReportStudents,
} from '@/services/shared/events/Events.Service.js'
import store from '@/store'

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

const defaultCards = () => {
  return {
    lastUpdatedAt: '',
    perfomance: 0,
    students: 0,
    studentsStarted: 0,
    time: 0,
  }
}

export default {
  namespaced: true,
  state: {
    cards: defaultCards(),
    data: [],
    total: 0,
    params: defaultParams(),
    loading: true,
    cardsLoading: true,
  },
  mutations: {
    setCardsData(state, data) {
      state.cards = Object.assign(defaultCards(), data)
    },
    setData(state, data) {
      state.data = data
    },
    setTotal(state, total) {
      state.total = total
    },

    setLoading(state, loading) {
      state.loading = loading
    },

    setCardsLoading(state, loading) {
      state.cardsLoading = loading
    },

    setParams(state, params) {
      Object.assign(state.params, params)
    },
    reset(state) {
      state.data = []
      state.total = 0
      state.params = defaultParams()
      state.loading = true
    },
  },
  actions: {
    async fetch({ commit, rootGetters, state }) {
      commit('setLoading', true)

      const eventId = rootGetters['events/eventId']
      const params = {
        SerieId: rootGetters['events/serieId'],
        ClassId: rootGetters['events/classId'],
        InstitutionId: rootGetters['events/institutionId'],
        ...state.params,
      }

      getEventResultReportStudents(eventId, params)
        .then(({ data }) => {
          commit('setData', data.data)
          commit('setTotal', data.total)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fetchDashboard({ commit, rootGetters }) {
      commit('setCardsLoading', true)

      const eventId = rootGetters['events/eventId']
      const params = {
        SerieId: rootGetters['events/serieId'],
        ClassId: rootGetters['events/classId'],
        InstitutionId: rootGetters['events/institutionId'],
      }

      getEventIndividualReportStudentsDashboard(eventId, params)
        .then(({ data }) => {
          commit('setCardsData', data)
          store.commit('events/setLastUpdate', data.lastUpdatedAt)
        })
        .finally(() => {
          commit('setCardsLoading', false)
        })
    },
    resetData({ commit }) {
      commit('setParams', defaultParams())
    },
  },
  getters: {
    cards(state) {
      return state.cards
    },
    data(state) {
      return state.data
    },
    total(state) {
      return state.total
    },
    loading(state) {
      return state.loading
    },
    cardsLoading(state) {
      return state.cardsLoading
    },
  },
}
