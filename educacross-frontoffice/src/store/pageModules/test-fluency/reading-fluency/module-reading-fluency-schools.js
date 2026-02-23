import {
  getNetworkOverview,
  getNetworkOverviewInstitutions,
} from '@/services/shared/readingMeter/readingMeter.service.js'

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
    networkGroup: {
      id: null,
      name: 'Todos os grupos de escolas',
    },
    institution: {
      id: null,
      name: 'Todas as escolas',
    },
    schoolYear: { id: null, name: 'Todos os anos' },
    loading: true,
    loadingCards: true,
    cards: {},
    data: [],
    total: 0,
    params: defaultParams(),
  },
  mutations: {
    networkGroup(state, payload) {
      state.networkGroup = payload
    },
    institution(state, payload) {
      state.institution = payload
    },
    schoolYear(state, payload) {
      state.schoolYear = payload
    },

    loading(state, payload) {
      state.loading = payload
    },

    loadingCards(state, payload) {
      state.loadingCards = payload
    },
    data(state, payload) {
      state.data = payload
    },

    total(state, payload) {
      state.total = payload
    },

    cards(state, payload) {
      state.cards = payload
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },

    reset(state) {
      state.params = defaultParams()
    },
  },
  getters: {
    networkGroup(state) {
      return state.networkGroup
    },

    institution(state) {
      return state.institution
    },
    schoolYear(state) {
      return state.schoolYear
    },

    loading(state) {
      return state.loading
    },

    loadingCards(state) {
      return state.loadingCards
    },
    data(state) {
      return state.data
    },
    cards(state) {
      return state.cards
    },
    total(state) {
      return state.total
    },
  },
  actions: {
    fetchNetwork({ commit, state }) {
      commit('loading', true)

      getNetworkOverviewInstitutions({
        NetworkGroupId: state.networkGroup.id,
        InstitutionId: state.institution.id,
        SerieId: state.schoolYear.id,
        ...state.params,
      })
        .then(({ data }) => {
          commit('data', data.data)
          commit('total', data.total)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
    fetchNetworkCards({ commit, state }) {
      commit('loadingCards', true)
      getNetworkOverview({
        NetworkGroupId: state.networkGroup.id,
        InstitutionId: state.institution.id,
        SerieId: state.schoolYear.id,
      })
        .then(({ data }) => {
          commit('cards', data)
        })
        .finally(() => {
          commit('loadingCards', false)
        })
    },
  },
}
