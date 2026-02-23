import { getGuidesPlusInstitutionOverviewClasses } from '@/services/teacher-context/guides/Guides.Service.js'
import useFilters from '@/store/filters/useFilters'

const { serie, period, institution, subject } = useFilters()

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
    institutionName: '',
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
    institutionName(state, payload) {
      state.institutionName = payload
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
    institutionName(state) {
      return state.institutionName
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

      getGuidesPlusInstitutionOverviewClasses({
        SubjectId: subject.value.id,
        InstitutionId: institution.value.id,
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
          commit('institutionName', data.institutionName)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
  },
}
