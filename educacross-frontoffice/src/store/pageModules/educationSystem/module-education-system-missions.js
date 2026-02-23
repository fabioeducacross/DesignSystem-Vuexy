export default {
  namespaced: true,
  state: {
    loadingDetails: true,
    unitys: [],
    unity: null,
    bookName: '',
    subjectId: null,
    educationSystemName: '',
    status: null,
    history: [],
    historyLoading: false,
  },
  mutations: {
    reset(state) {
      state.loadingDetails = true
      state.unitys = []
      state.unity = null
      state.bookName = ''
      state.subjectId = null
      state.educationSystemName = ''
    },
    loadingDetails(state, payload) {
      state.loadingDetails = payload
    },
    unitys(state, payload) {
      state.unitys = payload
    },
    unity(state, payload) {
      state.unity = payload
    },
    bookName(state, payload) {
      state.bookName = payload
    },

    subjectId(state, payload) {
      state.subjectId = payload
    },
    educationSystemName(state, payload) {
      state.educationSystemName = payload
    },
    status(state, payload) {
      state.status = payload
    },
    history(state, payload) {
      state.history = payload
    },
    historyLoading(state, payload) {
      state.historyLoading = payload
    },
  },
  getters: {
    loadingDetails(state) {
      return state.loadingDetails
    },
    unitys(state) {
      return state.unitys
    },
    unity(state) {
      return state.unity
    },
    bookName(state) {
      return state.bookName
    },

    subjectId(state) {
      return state.subjectId
    },
    educationSystemName(state) {
      return state.educationSystemName
    },
    status(state) {
      return state.status
    },
    history(state) {
      return state.history
    },
    historyLoading(state) {
      return state.historyLoading
    },
  },
}
