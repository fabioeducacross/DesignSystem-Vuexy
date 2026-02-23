import {
  getClasseOverview,
  getInstitutionOverview,
  getNetworkOverview,
} from '@/services/shared/readingMeter/readingMeter.service.js'
import useFilters from '@/store/filters/useFilters.js'

export default {
  namespaced: true,
  state: {
    networkGroup: {
      id: null,
      name: 'Todos os grupos de escolas',
    },
    city: [],
    institution: {
      id: null,
      name: 'Todas as escolas',
    },
    schoolYear: { id: null, name: 'Todos os anos' },
    classes: {
      id: null,
      name: 'Todas as turmas',
    },
    loading: true,
    data: {},
  },
  mutations: {
    networkGroup(state, payload) {
      state.networkGroup = payload
    },
    city(state, payload) {
      state.city = payload || []
    },
    institution(state, payload) {
      state.institution = payload
    },
    schoolYear(state, payload) {
      state.schoolYear = payload
    },
    classes(state, payload) {
      state.classes = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    data(state, payload) {
      state.data = payload
    },
  },
  getters: {
    networkGroup(state) {
      return state.networkGroup
    },
    city(state) {
      return state.city
    },
    institution(state) {
      return state.institution
    },
    schoolYear(state) {
      return state.schoolYear
    },
    classes(state) {
      return state.classes
    },
    loading(state) {
      return state.loading
    },
    data(state) {
      return state.data
    },
  },
  actions: {
    fetchClasse({ commit }) {
      const { classe } = useFilters()

      commit('loading', true)

      getClasseOverview(classe.value.ClassId)
        .then(({ data }) => {
          commit('data', data)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
    fetchNetwork({ commit, state }) {
      commit('loading', true)

      getNetworkOverview({
        NetworkGroupId: state.networkGroup.id,
        CitiesIds: state.city.map(city => city.id),
        InstitutionId: state.institution.id,
        SerieId: state.schoolYear.id,
      })
        .then(({ data }) => {
          commit('data', data)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
    fetchInstituion({ commit, state }) {
      commit('loading', true)

      getInstitutionOverview({
        SerieId: state.schoolYear.id,
        ClassId: state.classes.ClassId,
      })
        .then(({ data }) => {
          commit('data', data)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
  },
}
