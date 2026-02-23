import { getSeries } from '@/services/shared/serie/Serie.Service'
import { getEducacrossGuide } from '@/services/teacher-context/guides/Guides.Service'

export default {
  namespaced: true,
  state: {
    serie: null,
    series: [],
    seriesParams: {
      page: 0,
      totalPages: 1,
      query: '',
      pageSize: 5,
    },
    listParams: {
      page: 1,
      total: 0,
      searchTerm: '',
      pageSize: 5,
    },
    missions: [],
    loading: true,
    loadingFilter: true,
  },
  mutations: {
    serie(state, value) {
      state.serie = value
    },
    series(state, value) {
      state.series = value
    },
    seriesParamsPage(state, value) {
      state.seriesParams.page = value
    },
    seriesParamsQuery(state, value) {
      state.seriesParams.searchTerm = value
    },
    seriesParamsTotalPages(state, value) {
      state.seriesParams.totalPages = value
    },
    page(state, value) {
      state.listParams.page = value
    },
    total(state, value) {
      state.listParams.total = value
    },
    searchTerm(state, value) {
      state.listParams.searchTerm = value
    },
    pageSize(state, value) {
      state.listParams.pageSize = value
    },
    missions(state, value) {
      state.missions = value
    },
    loading(state, value) {
      state.loading = value
    },
    loadingFilter(state, value) {
      state.loadingFilter = value
    },
  },
  getters: {
    serie(state) {
      return state.serie
    },
    seriesParamsPage(state) {
      return state.seriesParams.page
    },
    seriesParamsQuery(state) {
      return state.seriesParams.searchTerm
    },
    searchTerm(state) {
      return state.searchTerm
    },
    seriesParamsTotalPages(state) {
      return state.seriesParams.totalPages
    },
    series(state) {
      return state.series
    },
    missions(state) {
      return state.missions
    },
    loading(state) {
      return state.loading
    },
    page(state) {
      return state.listParams.page
    },
    total(state) {
      return state.listParams.total
    },
    pageSize(state) {
      return state.listParams.pageSize
    },
    loadingFilter(state) {
      return state.loadingFilter
    },
  },
  actions: {
    async fetchData({ commit, state, rootGetters }) {
      commit('loading', true)
      const subjectId = rootGetters['filters/subject']?.id
      const filters = state.listParams
      const serie = state.serie

      filters.serieId = serie.id

      const { data } = await getEducacrossGuide({
        subjectId,
        ...filters,
      })

      const guides = data.data || []
      const { total } = data

      commit('total', total)

      guides.forEach(el => {
        el.guideType = 'educacross'
      })

      commit('missions', guides)
      commit('loading', false)
    },
    async fetchSeries({ rootGetters, commit, state, dispatch }) {
      let page = state.seriesParams.page || 0
      page += 1
      commit('seriesParamsPage', page)

      const subjectId = rootGetters['filters/subject']?.id

      let series = state.series
      commit('loadingFilter', true)
      const filters = state.seriesParams

      const { data } = await getSeries({
        subjects: subjectId,
        ...filters,
      })

      const { totalPages } = data
      commit('seriesParamsTotalPages', totalPages)

      series.push(...data.data)

      if (page === 1) {
        series = [...data.data]
        series.unshift({ id: null, name: 'Todos os anos escolares' })
        commit('serie', series[0])
        dispatch('fetchData')
      }

      commit('series', series)
      commit('loadingFilter', false)
    },
  },
}
