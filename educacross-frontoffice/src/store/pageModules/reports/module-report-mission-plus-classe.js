export default {
  namespaced: true,
  state: {
    loading: false,
    tableStrongWeak: {
      descriptorsStrong: [],
      descriptorsToImprove: [],
    },
    cards: {
      progress: 0,
      performance: 0,
      totalTime: 0,
      challengesDone: 0,
    },
    title: {
      subjectId: 0,
      status: 0,
      startDate: '',
      endDate: '',
      title: '',
      className: '',
      serieName: '',
    },
    rounds: [],
  },
  mutations: {
    reset(state) {
      state.loading = true
      state.tableStrongWeak = {
        descriptorsStrong: [],
        descriptorsToImprove: [],
      }
      state.cards = {
        progress: 0,
        performance: 0,
        totalTime: 0,
        challengesDone: 0,
      }
      state.title = {
        subjectId: [],
        status: 0,
        startDate: '',
        endDate: '',
        title: '',
        className: '',
        serieName: '',
      }
    },
    loading(state, payload) {
      state.loading = payload
    },
    cards(state, payload) {
      state.cards = payload
    },
    title(state, payload) {
      state.title = payload
    },
    tableStrongWeak(state, payload) {
      state.tableStrongWeak = payload
    },
    subjectId(state, payload) {
      state.title.subjectId = payload
    },
    rounds(state, payload) {
      state.rounds = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    cards(state) {
      return state.cards
    },
    title(state) {
      return state.title
    },
    tableStrongWeak(state) {
      return state.tableStrongWeak
    },
    subjectId(state) {
      return state.title.subjectId
    },
    rounds(state) {
      return state.rounds
    },
  },
}
