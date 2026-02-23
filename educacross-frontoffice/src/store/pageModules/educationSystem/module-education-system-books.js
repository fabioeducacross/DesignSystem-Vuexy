export default {
  namespaced: true,
  state: {
    educationSystemName: '',
    books: [],
    loading: true,
    onlyInProgress: false,
  },
  mutations: {
    educationSystemName(state, payload) {
      state.educationSystemName = payload
    },
    books(state, payload) {
      state.books = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    onlyInProgress(state, payload) {
      state.onlyInProgress = payload
    },
  },
  getters: {
    educationSystemName(state) {
      return state.educationSystemName
    },
    books(state) {
      return state.books
    },
    loading(state) {
      return state.loading
    },
    onlyInProgress(state) {
      return state.onlyInProgress
    },
  },
}
