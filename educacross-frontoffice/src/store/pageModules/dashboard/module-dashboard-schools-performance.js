import { getNetworkManagerPerformance } from '@/services/shared/reports/Report.service'

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: 'institutionName',
    Page: 1,
    PageSize: 10,
    Ascending: true,
  }
}
export default {
  namespaced: true,
  state: {
    networkGroup: [],
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
    networkGroup(state, payload) {
      state.networkGroup = payload
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
      state.dashboard = payload
    },
    reset(state) {
      state.city = []
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
      state.networkGroup = []
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
    networkGroup(state) {
      return state.networkGroup
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
      return state.dashboard || {}
    },
    dataTable(state) {
      return state.dataTable
    },
    totalData(state) {
      return state.totalData
    },
    params(state) {
      return state.params
    },
  },
  actions: {
    fetch({ commit, state }) {
      commit('loading', true)
      commit('loadingDashboard', true)

      getNetworkManagerPerformance({
        NetworkGroupsIds: state.networkGroup.map(item => item.id),
        SerieId: state.schoolYear.id,
        Month: state.month.id,
        ...state.params,
      })
        .then(({ data }) => {
          commit('dashboard', {
            challengesDone: data.challengesDone,
            totalTime: data.totalTime,
            performance: data.performance,
          })
          commit('dataTable', data.institutions.data)
          commit('totalData', data.institutions.total)
        })
        .finally(() => {
          commit('loading', false)
          commit('loadingDashboard', false)
        })
    },
  },
}
