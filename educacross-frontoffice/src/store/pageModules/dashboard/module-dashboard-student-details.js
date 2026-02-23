const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

const defaultStudentDetailsModal = () => {
  return {
    name: '',
    imagelUrl: '',
    challengesDone: 0,
    attempts: 0,
    activityAttempt: [],
  }
}

export default {
  namespaced: true,
  state: {
    subjectModules: [],

    className: '',
    institutionName: '',
    institutionId: null,
    serieId: null,
    studentId: null,
    activityId: null,
    studentDetailsModal: defaultStudentDetailsModal(),
    loading: true,
    loadingDashboard: true,
    loadingSubjectModules: true,
    loadingStudentDetailsModal: false,
    dashboard: {},
    params: defaultParams(),
    dataTable: [],
    totalData: 0,
    studentName: '',
  },
  mutations: {
    institutionId(state, payload) {
      state.institutionId = payload
    },

    serieId(state, payload) {
      state.serieId = payload
    },
    loadingSubjectModules(state, payload) {
      state.loadingSubjectModules = payload
    },
    subjectModules(state, payload) {
      state.subjectModules = payload
    },

    className(state, payload) {
      state.className = payload
    },

    studentId(state, payload) {
      state.studentId = payload
    },
    activityId(state, payload) {
      state.activityId = payload
    },
    studentDetailsModal(state, payload) {
      // Object.assign(state.studentDetailsModal, payload)
      state.studentDetailsModal = payload
    },

    loading(state, payload) {
      state.loading = payload
    },
    loadingDashboard(state, payload) {
      state.loadingDashboard = payload
    },
    loadingStudentDetailsModal(state, payload) {
      state.loadingStudentDetailsModal = payload
    },
    dashboard(state, payload) {
      state.dashboard = payload
    },
    reset(state) {
      state.institutionId = null
      state.className = ''
      state.institutionName = ''
      state.serieId = null
      state.studentId = null
      state.activityId = null
      state.studentDetailsModal = defaultStudentDetailsModal()
      state.loading = true
      state.loadingDashboard = true
      state.loadingSubjectModules = true
      state.loadingStudentDetailsModal = false
      state.dashboard = {}
      state.params = defaultParams()
      state.dataTable = []
      state.totalData = 0
      state.studentName = ''
    },
    dataTable(state, payload) {
      state.dataTable = payload
    },
    totalData(state, payload) {
      state.totalData = payload
    },

    studentName(state, payload) {
      state.studentName = payload
    },
    institutionName(state, payload) {
      state.institutionName = payload
    },
  },
  getters: {
    subjectModules(state) {
      return state.subjectModules
    },

    institutionId(state) {
      return state.institutionId
    },
    serieId(state) {
      return state.serieId
    },

    className(state) {
      return state.className
    },
    studentId(state) {
      return state.studentId
    },

    institutionName(state) {
      return state.institutionName
    },

    loading(state) {
      return state.loading
    },
    loadingDashboard(state) {
      return state.loadingDashboard
    },
    loadingStudentDetailsModal(state) {
      return state.loadingStudentDetailsModal
    },
    studentDetailsModal(state) {
      return state.studentDetailsModal
    },
    dashboard(state) {
      return state.dashboard
    },
    dataTable(state) {
      return state.dataTable
    },
    totalData(state) {
      return state.totalData
    },
    studentName(state) {
      return state.studentName
    },
  },
}
