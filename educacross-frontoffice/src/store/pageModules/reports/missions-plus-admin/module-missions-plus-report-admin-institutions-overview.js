import { getGuidesPlusInstitutionOverviewInstitutions } from '@/services/teacher-context/guides/Guides.Service.js'
import useFilters from '@/store/filters/useFilters'

const { serie, period, networkGroup, subject } = useFilters()

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
    loading: true,
    cards: {},
    data: [],
    total: 0,
    params: defaultParams(),
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
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
      if (!subject.value.id) {
        commit('loading', false)
        commit('data', [])
        commit('total', 0)
        commit('cards', {
          progress: 0,
          performance: 0,
          totalGuides: 0,
        })
        return
      }

      getGuidesPlusInstitutionOverviewInstitutions({
        SubjectId: subject.value.id,
        NetworkGroupId: networkGroup.value?.id,
        SerieId: serie.value.id,
        Month: period.value.id,
        ...state.params,
      })
        .then(({ data }) => {
          commit('data', data.report?.data || [])
          commit('total', data.report?.total || 0)
          commit('cards', {
            progress: data.progress,
            performance: data.performance,
            totalGuides: data.totalGuides,
          })
        })
        .finally(() => {
          commit('loading', false)
        })
    },
  },
}
