import { getEventResultsReportInstitutionAbilities } from '@/services/shared/events/Events.Service.js'

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
    params: defaultParams(),
    loading: true,
  },
  mutations: {
    setData(state, data) {
      state.data = data
    },
    setTotal(state, total) {
      state.total = total
    },

    setLoading(state, loading) {
      state.loading = loading
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
        InstitutionId: rootGetters['events/institutionId'],
        SerieId: rootGetters['events/serieId'],
        EducationalOrganizationId: rootGetters['events/selectedEducationalOrganizationLabel'].id,
        KnowledgeAxisId: rootGetters['events/selectedKnowledgeAxes'].id,
        ...state.params,
      }

      getEventResultsReportInstitutionAbilities(eventId, params)
        .then(({ data }) => {
          commit('setData', data.data)
          commit('setTotal', data.total)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    resetData({ commit }) {
      commit('setParams', defaultParams())
    },
  },
  getters: {
    data(state) {
      return state.data
    },
    total(state) {
      return state.total
    },
    loading(state) {
      return state.loading
    },
  },
}
