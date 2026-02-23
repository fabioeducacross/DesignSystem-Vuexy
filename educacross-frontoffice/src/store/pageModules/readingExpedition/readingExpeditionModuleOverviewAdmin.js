import {
  getReadingExpeditionOverview,
  getReadingExpeditionOverviewStudents,
} from '@/services/shared/reading-expedition/reading-expedition.service.js'
import useFilters from '@/store/filters/useFilters.js'

export default {
  namespaced: true,
  state: {
    loading: true,
    data: [],
    loadingStudents: true,
    students: [],
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    data(state, payload) {
      state.data = payload
    },
    loadingStudents(state, payload) {
      state.loadingStudents = payload
    },
    students(state, payload) {
      state.students = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    data(state) {
      return state.data || []
    },
    loadingStudents(state) {
      return state.loadingStudents
    },
    students(state) {
      return state.students || []
    },
  },
  actions: {
    fetch({ commit }) {
      const { serie, networkGroup, institution, classe } = useFilters()

      if (!serie.value) {
        commit('data', [])
        commit('loading', false)
        return
      }

      commit('loading', true)

      getReadingExpeditionOverview({
        SerieId: serie.value?.id,
        NetworkGroupId: networkGroup.value?.id,
        InstitutionId: institution.value?.id,
        ClassId: classe.value?.id,
      })
        .then(({ data }) => {
          commit('data', data)
        })
        .finally(() => {
          commit('loading', false)
        })
    },

    fetchOverviewStudents({ commit }, { stage, type, level }) {
      const { serie, classe } = useFilters()

      commit('loadingStudents', true)

      getReadingExpeditionOverviewStudents({
        SerieId: serie.value.id,
        ClassId: classe.value.ClassId,
        Stage: stage,
        Type: type,
        Level: level,
      })
        .then(({ data }) => {
          commit('students', data)
        })
        .finally(() => {
          commit('loadingStudents', false)
        })
    },
  },
}
