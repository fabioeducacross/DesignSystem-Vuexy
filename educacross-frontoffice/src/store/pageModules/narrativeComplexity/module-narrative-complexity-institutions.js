import {
  getNarrativeComplexityinstitutions,
  getNarrativeComplexityinstitutionsCards,
} from '@/services/shared/narrativeComplexity/narrativeComplexity.service.js'
import useFilters from '@/store/filters/useFilters'

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

const { networkGroup, institution, serie } = useFilters()

export default {
  namespaced: true,
  state: {
    loading: true,
    loadingCards: true,
    applyId: null,
    cards: [],
    data: [],
    total: 0,
    params: defaultParams(),
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },

    loadingCards(state, payload) {
      state.loadingCards = payload
    },
    applyId(state, payload) {
      state.applyId = payload
    },
    data(state, payload) {
      state.data = payload
    },

    total(state, payload) {
      state.total = payload
    },

    cards(state, payload) {
      state.cards = payload || {}
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },

    resetParams(state) {
      state.params = defaultParams()
    },
    reset(state) {
      state.data = []
      state.total = 0
      state.params = defaultParams()
      state.loading = true
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },

    loadingCards(state) {
      return state.loadingCards
    },

    applyId(state) {
      return state.applyId
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
    fetch({ commit, state }) {
      if (!state.applyId) {
        commit('data', [])
        commit('total', 0)
        return
      }
      commit('loading', true)
      getNarrativeComplexityinstitutions({
        serieId: serie.value.id,
        NetworkGroupId: networkGroup.value.id,
        institutionId: institution.value.id,
        Apply: state.applyId,
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

    fetchCards({ commit, state }) {
      commit('loadingCards', true)
      commit('applyId', null)

      getNarrativeComplexityinstitutionsCards({
        NetworkGroupId: networkGroup.value.id,
        serieId: serie.value.id,
        institutionId: institution.value.id,
      })
        .then(({ data }) => {
          commit('cards', data)

          const firstEnabled = state.cards.find(card => card.enabled)
          commit('applyId', firstEnabled ? firstEnabled.apply : null)
        })
        .finally(() => {
          commit('loadingCards', false)
        })
    },
  },
}
