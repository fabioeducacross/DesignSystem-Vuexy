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
    networkGroup: [],

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
    schoolYear: {},
  },
  mutations: {
    networkGroup(state, payload) {
      state.networkGroup = payload
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
      state.networkGroup = []
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
    params(state, params) {
      Object.assign(state.params, params)
    },
    schoolYear(state, payload) {
      state.schoolYear = payload
    },
  },
  getters: {
    networkGroup(state) {
      return state.networkGroup
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
    schoolYear(state) {
      return state.schoolYear
    },
    params(state) {
      return state.params
    },
  },
}
