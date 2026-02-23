import { getInclusionGuide } from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'

const { subject } = useFilters()

export default {
  namespaced: true,
  state: {
    selectedEducationSystem: {},
    selectedSeries: { name: 'Todos', id: null },
    missions: [],
    loading: true,
    currentPage: 1,
    perPage: 5,
    search: '',
  },
  mutations: {
    selectedEducationSystem(state, data) {
      state.selectedEducationSystem = data
    },
    selectedSeries(state, data) {
      state.selectedSeries = data
    },
    missions(state, data) {
      state.missions = data
    },
    loading(state, data) {
      state.loading = data
    },
    currentPage(state, data) {
      state.currentPage = data
    },
    perPage(state, data) {
      state.perPage = data
    },
    search(state, data) {
      state.search = data
    },
  },
  getters: {
    selectedEducationSystem(state) {
      return state.selectedEducationSystem
    },
    selectedSeries(state) {
      return state.selectedSeries
    },
    missions(state) {
      const indiceInicial = (state.currentPage - 1) * state.perPage
      const indiceFinal = indiceInicial + state.perPage

      // Retorna os itens da página atual
      return state.missions
        .filter(guide => guide.serieId === state.selectedSeries.id || !state.selectedSeries.id)
        .filter(guide => {
          return (
            guide.name.toLowerCase().includes(state.search.toLowerCase()) ||
            guide.annotation.toLowerCase().includes(state.search.toLowerCase())
          )
        })
        .slice(indiceInicial, indiceFinal)
    },
    loading(state) {
      return state.loading
    },
    currentPage(state) {
      return state.currentPage
    },
    perPage(state) {
      return state.perPage
    },
    totalData(state) {
      return state.missions
        .filter(guide => guide.serieId === state.selectedSeries.id || !state.selectedSeries.id)
        .filter(
          guide =>
            guide.name.toLowerCase().includes(state.search.toLowerCase()) ||
            guide.annotation.toLowerCase().includes(state.search.toLowerCase()),
        ).length
    },
    search(state) {
      return state.search
    },
  },
  actions: {
    async fetchData({ commit }) {
      commit('loading', true)

      const response = await getInclusionGuide({
        SubjectId: subject.value.id,
      })

      const { data } = response

      commit('missions', data)
      commit('loading', false)
    },
  },
}
