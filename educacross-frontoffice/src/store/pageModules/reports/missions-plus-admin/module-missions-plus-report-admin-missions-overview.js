import {
  getGuidesPlusInstitutionOverviewClass,
  getGuidesPlusInstitutionOverviewClassGuides,
} from '@/services/teacher-context/guides/Guides.Service.js'
import useFilters from '@/store/filters/useFilters'

const { classe, period, subject } = useFilters()

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: 'expirationTime',
    Page: 1,
    PageSize: 10,
    Ascending: 'false',
  }
}

export default {
  namespaced: true,
  state: {
    loading: true,
    loadingCards: true,
    cards: {},
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
    fetch({ commit, state }) {
      commit('loading', true)

      getGuidesPlusInstitutionOverviewClassGuides(classe.value.id, {
        SubjectId: subject.value.id,
        Month: period.value.id,
        ...state.params,
      })
        .then(({ data }) => {
          commit(
            'data',
            data.data.map(item => ({
              ...item,
              progress: item.report?.progress || 0,
              performance: item.report?.performance || 0,
              time: item.report?.time || 0,
            })),
          )
          commit('total', data.total)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
    fetchCards({ commit }) {
      commit('loadingCards', true)
      getGuidesPlusInstitutionOverviewClass(classe.value.id, {
        SubjectId: subject.value.id,
        Month: period.value.id,
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
