import {
  getInstitutionOverview,
  getInstitutionOverviewClasses,
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
    schoolYear: { id: null, name: 'Todos os anos' },
    institutionId: null,
    loading: true,
    loadingCards: true,
    cards: {},
    data: [],
    total: 0,
    params: defaultParams(),
  },
  mutations: {
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
    institutionId(state, payload) {
      state.institutionId = payload
    },
  },
  getters: {
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
    institutionId(state) {
      return state.institutionId
    },
  },
  actions: {
    fetchInstituion({ commit, state }) {
      commit('loading', true)

      getInstitutionOverviewClasses({
        InstitutionId: state.institutionId,
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
    fetchInstituionCards({ commit, state }) {
      commit('loadingCards', true)
      getInstitutionOverview({
        InstitutionId: state.institutionId,
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
