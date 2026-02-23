const defaultState = () => {
  return {
    loading: true,
    loadingCards: true,
    cards: [],
    data: [],
    total: 0,
    params: { Search: '', OrderBy: null, Page: 1, PageSize: 10, Ascending: 'true' },
    applyId: 0,
    seriesIds: [],
    institutionSeries: [],
    institutionSeriesLoading: true,
    institutionName: '',
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    loading(state, value) {
      state.loading = value
    },
    loadingCards(state, value) {
      state.loadingCards = value
    },
    cards(state, value) {
      state.cards = value
    },
    data: (state, value) => {
      state.data = value
    },
    total: (state, value) => {
      state.total = value
    },
    params: (state, value) => {
      Object.assign(state.params, value)
    },
    applyId: (state, value) => {
      state.applyId = value
    },
    seriesIds: (state, value) => {
      state.seriesIds = value
    },
    institutionSeries: (state, value) => {
      state.institutionSeries = value
    },
    institutionSeriesLoading: (state, value) => {
      state.institutionSeriesLoading = value
    },
    institutionName: (state, value) => {
      state.institutionName = value
    },
    reset: state => {
      Object.assign(state, defaultState())
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    loadingCards(state) {
      return state.loadingCards
    },
    cards(state) {
      return state.cards
    },
    data(state) {
      return state.data
    },
    total(state) {
      return state.total
    },
    params(state) {
      return state.params
    },
    applyId(state) {
      return state.applyId
    },
    seriesIds(state) {
      return state.seriesIds
    },
    institutionSeries(state) {
      return state.institutionSeries
    },
    institutionSeriesLoading(state) {
      return state.institutionSeriesLoading
    },
    institutionName(state) {
      return state.institutionName
    },
  },
}
