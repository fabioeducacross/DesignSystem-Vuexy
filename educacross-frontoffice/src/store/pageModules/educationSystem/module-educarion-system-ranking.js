export default {
  namespaced: true,
  state: {
    ranking: {
      ranking: [],
    },

    month: null,
    loading: true,
    excelLoading: false,
    educationSystemName: '',
  },
  mutations: {
    ranking(state, payload) {
      state.ranking = payload
    },
    period(state, payload) {
      state.period = payload
    },
    month(state, payload) {
      state.month = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    excelLoading(state, payload) {
      state.excelLoading = payload
    },
    educationSystemName(state, payload) {
      state.educationSystemName = payload
    },
    reset(state) {
      state.ranking = {
        ranking: [],
      }
      state.period = null
      state.month = null
      state.loading = true
      state.educationSystemName = ''
    },
  },
  getters: {
    ranking(state) {
      return state.ranking
    },
    period(state) {
      return state.period
    },
    month(state) {
      return state.month
    },
    loading(state) {
      return state.loading
    },
    excelLoading(state) {
      return state.excelLoading
    },
    educationSystemName(state) {
      return state.educationSystemName
    },
  },
}
