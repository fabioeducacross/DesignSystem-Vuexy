import {
  getAdminPanelAccessClasses,
  getAdminPanelAccessDashboard,
} from '@/services/shared/reports/Report.service'

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
    teacher: [],
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
    teacher(state, payload) {
      state.teacher = payload || []
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
      state.institutionId = null
      state.schoolYear = { id: null, name: 'Todos os anos' }
      state.month = {
        id: null,
        name: 'Todo o período',
      }
      state.teacher = []
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
    teacher(state) {
      return state.teacher
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
    fetchDashboardData({ commit, state }) {
      commit('loadingDashboard', true)

      getAdminPanelAccessDashboard({
        SerieId: state.schoolYear.id,
        month: state.month.id,
        InstitutionId: state.institutionId,
        TeachersIds: state.teacher.map(item => item.id),
      })
        .then(({ data }) => {
          commit('dashboard', data)
        })
        .finally(() => {
          commit('loadingDashboard', false)
        })
    },
    fetch({ commit, state }) {
      commit('loading', true)

      getAdminPanelAccessClasses({
        SerieId: state.schoolYear.id,
        Month: state.month.id,
        InstitutionId: state.institutionId,
        TeachersIds: state.teacher.map(item => item.id),

        ...state.params,
      })
        .then(({ data }) => {
          commit('dataTable', data.data)
          commit('totalData', data.total)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
  },
}
