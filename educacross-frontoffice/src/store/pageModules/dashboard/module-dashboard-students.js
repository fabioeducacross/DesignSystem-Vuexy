const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

const defaultDashboard = () => {
  return {
    activitiesFinished: 0,
    activitiesNotFinished: 0,
    totalActivities: 0,
    totalStudents: 0,
    totalStudentsPlayed: 0,
    challengesDone: 0,
    totalTime: 0,
    performance: 0,
  }
}

export default {
  namespaced: true,
  state: {
    className: '',
    institutionName: '',
    serieId: null,
    serieName: '',
    institutionId: null,
    subjectModules: [],

    viewMode: 1,
    dashboard: defaultDashboard(),
    loading: true,
    loadingSubjectModules: true,
    params: defaultParams(),
    dataTable: [],
    totalData: 0,
  },
  mutations: {
    className(state, payload) {
      state.className = payload
    },
    institutionName(state, payload) {
      state.institutionName = payload
    },
    serieId(state, payload) {
      state.serieId = payload
    },
    serieName(state, payload) {
      state.serieName = payload
    },
    subjectModules(state, payload) {
      state.subjectModules = payload
    },
    institutionId(state, payload) {
      state.institutionId = payload
    },

    viewMode(state, payload) {
      state.viewMode = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    loadingSubjectModules(state, payload) {
      state.loadingSubjectModules = payload
    },
    dashboard(state, payload) {
      Object.assign(state.dashboard, payload)
    },
    reset(state) {
      state.loading = true
      state.classId = null
      state.className = ''
      state.serieId = null

      state.viewMode = 1
      state.dashboard = defaultDashboard()
      state.dataTable = []
    },
    dataTable(state, payload) {
      state.dataTable = payload
    },
    totalData(state, payload) {
      state.totalData = payload
    },
    params(state, params) {
      Object.assign(state.params, params)
    },
  },
  getters: {
    classId(state) {
      return state.classId
    },
    className(state) {
      return state.className
    },
    institutionName(state) {
      return state.institutionName
    },
    subject(state) {
      return state.subject
    },
    subjectId(state) {
      return state.subjectId
    },
    serieId(state) {
      return state.serieId
    },
    serieName(state) {
      return state.serieName
    },
    subjectModules(state) {
      return state.subjectModules
    },

    viewMode(state) {
      return state.viewMode
    },
    loadingSubjectModules(state) {
      return state.loadingSubjectModules
    },
    loading(state) {
      return state.loading
    },
    dashboard(state) {
      if (state.viewMode === 3) {
        return defaultDashboard()
      }
      if (state.viewMode === 2) {
        const students = state.dataTable.filter(
          item => item.totalTime !== null && item.totalTime !== undefined,
        )
        if (students.length === 0) {
          return {
            ...state.dashboard,
            performance: null,
            totalTime: null,
            totalStudents: null,
          }
        }
        const performance =
          students.reduce((total, item) => {
            return item.performance ? total + item.performance : total
          }, 0) / students.length || null

        const totalTime =
          students.reduce((total, item) => {
            return item.totalTime ? total + item.totalTime : total
          }, 0) / students.length || null

        return {
          ...state.dashboard,
          performance,
          totalTime,
          totalStudents: students.length,
        }
      }
      return state.dashboard
    },
    dataTable(state) {
      if (state.viewMode === 2) {
        return state.dataTable.filter(
          item => item.totalTime !== null && item.totalTime !== undefined,
        )
      }
      if (state.viewMode === 3) {
        return state.dataTable.filter(
          item => item.totalTime === null || item.totalTime === undefined,
        )
      }
      return state.dataTable
    },
    totalData(state) {
      return state.totalData
    },
  },
}
