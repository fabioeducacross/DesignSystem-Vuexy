export default {
  namespaced: true,
  state: {
    loading: false,
    tableStrongWeak: {
      descriptorsStrong: [],
      descriptorsToImprove: [],
    },
    cards: {
      progress: {
        student: 0,
        classe: 0,
      },
      performance: {
        student: 0,
        classe: 0,
      },
      totalTime: {
        student: 0,
        classe: 0,
      },
      challengesDone: 0,
    },
    studentName: '',
    missionName: '',
    subjectId: 0,
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

      state.subjectId = 0
      state.studentName = ''
      state.missionName = ''
    },
    loading(state, payload) {
      state.loading = payload
    },
    cards(state, payload) {
      state.cards = payload
    },
    tableStrongWeak(state, payload) {
      state.tableStrongWeak = payload
    },
    subjectId(state, payload) {
      state.subjectId = payload
    },
    rounds(state, payload) {
      state.rounds = payload
    },
    studentName(state, payload) {
      state.studentName = payload
    },
    missionName(state, payload) {
      state.missionName = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    cards(state) {
      return state.cards
    },
    tableStrongWeak(state) {
      return state.tableStrongWeak
    },
    subjectId(state) {
      return state.subjectId
    },
    rounds(state) {
      return state.rounds
    },
    studentName(state) {
      return state.studentName
    },
    missionName(state) {
      return state.missionName
    },
  },
}
