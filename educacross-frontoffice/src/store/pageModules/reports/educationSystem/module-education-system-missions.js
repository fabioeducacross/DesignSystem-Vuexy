export default {
  namespaced: true,
  state: {
    loadingDetails: true,
    loadingDashboard: true,
    dashboardData: {
      totalGuideProgress: 0,
      sendGuideProgress: 0,
      amountGuideSend: 0,
      totalGuide: 0,
      studentsPlayed: 0,
      performance: 0,
      totalTime: 0,
      challengesDone: 0,
      amountGuidesInProgress: 0,
      inProgressGuideProgress: 0,
    },
    unitys: [],
    unity: null,
    bookName: '',
    subjectId: null,
    educationSystemName: '',
    serieName: '',
    status: null,
    history: [],
    historyLoading: false,
  },
  mutations: {
    reset(state) {
      state.loadingDetails = true
      state.loadingDashboard = true
      state.dashboardData = {
        totalGuideProgress: 0,
        sendGuideProgress: 0,
        amountGuideSend: 0,
        totalGuide: 0,
        studentsPlayed: 0,
        performance: 0,
        totalTime: 0,
        challengesDone: 0,
        amountGuidesInProgress: 0,
        inProgressGuideProgress: 0,
      }
      state.unitys = []
      state.unity = null
      state.bookName = ''
      state.subjectId = null
      state.educationSystemName = ''
      state.serieName = ''
      state.status = null
      state.history = []
      state.historyLoading = false
    },
    loadingDetails(state, payload) {
      state.loadingDetails = payload
    },
    loadingDashboard(state, payload) {
      state.loadingDashboard = payload
    },
    dashboardData(state, payload) {
      state.dashboardData = payload
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
    serieName(state, payload) {
      state.serieName = payload
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
    loadingDashboard(state) {
      return state.loadingDashboard
    },
    dashboardData(state) {
      return state.dashboardData
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
    serieName(state) {
      return state.serieName
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
