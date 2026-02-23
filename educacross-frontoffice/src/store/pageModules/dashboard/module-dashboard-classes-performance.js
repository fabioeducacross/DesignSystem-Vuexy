import { getNetworkManagerPerformanceReportClasses } from '@/services/shared/reports/Report.service'

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

export default {
  namespaced: true,
  state: {
    institutionId: null,
    schoolYear: { id: null, name: 'Todos os anos' },
    month: {
      id: null,
      name: 'Todo o período',
    },
    loading: true,
    loadingDashboard: true,
    dashboard: {},
    params: defaultParams(),
    dataTable: [],
    totalData: 0,
  },
  mutations: {
    institutionId(state, payload) {
      state.institutionId = payload
    },
    schoolYear(state, payload) {
      state.schoolYear = payload
    },
    month(state, payload) {
      state.month = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    loadingDashboard(state, payload) {
      state.loadingDashboard = payload
    },
    dashboard(state, payload) {
      state.dashboard = payload || {}
    },
    reset(state) {
      state.institutionId = null
      state.schoolYear = { id: null, name: 'Todos os anos' }
      state.month = {
        id: null,
        name: 'Todo o período',
      }
      state.loading = true
      state.loadingDashboard = true
      state.dashboard = {}
      state.params = defaultParams()
      state.dataTable = []
      state.totalData = 0
    },
    dataTable(state, payload) {
      state.dataTable = payload
    },
    totalData(state, payload) {
      state.totalData = payload
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },
  },
  getters: {
    institutionId(state) {
      return state.institutionId
    },
    schoolYear(state) {
      return state.schoolYear
    },
    month(state) {
      return state.month
    },
    loading(state) {
      return state.loading
    },
    loadingDashboard(state) {
      return state.loadingDashboard
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
  },
  actions: {
    fetch({ commit, state }) {
      commit('loading', true)
      commit('loadingDashboard', true)

      getNetworkManagerPerformanceReportClasses({
        SerieId: state.schoolYear.id,
        Month: state.month.id,
        InstitutionId: state.institutionId,

        ...state.params,
      })
        .then(({ data }) => {
          commit('dashboard', {
            challengesDone: data.challengesDone,
            totalTime: data.totalTime,
            performance: data.performance,
            institutionName: data.institutionName,
          })
          commit('dataTable', data.classes.data)
          commit('totalData', data.classes.total)
        })
        .finally(() => {
          commit('loading', false)
          commit('loadingDashboard', false)
        })
    },
  },
}
