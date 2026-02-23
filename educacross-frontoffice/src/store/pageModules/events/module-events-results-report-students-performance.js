import { getEventResultsReportClassAbilities } from '@/services/shared/events/Events.Service.js'
import useFilters from '@/store/filters/useFilters'

const { classe } = useFilters()

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
      state.knowledgeAxes = []
      state.loadingKnowledgeAxes = true
      state.loadingEducationalOrganization = true
      state.selectedKnowledgeAxes = { id: null, name: 'Todas' }
      state.educationalOrganizationsLabels = []
      state.selectedEducationalOrganization = null
    },
  },
  actions: {
    async fetch({ commit, rootGetters, state }) {
      commit('setLoading', true)

      const eventId = rootGetters['events/eventId']
      const params = {
        ClassId: classe.value.ClassId,
        SerieId: rootGetters['events/serieId'],
        EducationalOrganizationId: rootGetters['events/selectedEducationalOrganizationLabel'].id,
        KnowledgeAxisId: rootGetters['events/selectedKnowledgeAxes'].id,
        ...state.params,
      }

      getEventResultsReportClassAbilities(eventId, params)
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
