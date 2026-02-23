const defaultStatus = { key: null, label: 'Todos os status' }

const defaultParams = () => ({
  Search: '',
  OrderBy: null,
  Page: 1,
  PageSize: 10,
  Ascending: 'true',
})

export default {
  namespaced: true,
  state: {
    selectedData: {
      value: [],
      batchAction: 1,
    },
    totalUsers: 0,
    availableLicenses: 0,
    status: defaultStatus,
    coordinators: [],
    params: defaultParams(),
    loading: true,
    pagination: {
      totalPages: 0,
      total: 0,
    },
  },
  mutations: {
    reset(state) {
      state.availableLicenses = 0
      state.selectedData = {
        value: [],
        batchAction: 1,
      }
      state.status = defaultStatus
      state.coordinators = []
      state.params = defaultParams()
      state.loading = true
      state.pagination = {
        totalPages: 0,
        total: 0,
      }
    },
    status(state, status) {
      state.status = status
    },
    selectedData(state, selectedData) {
      state.selectedData = selectedData
    },
    availableLicenses(state, availableLicenses) {
      state.availableLicenses = availableLicenses
    },
    totalUsers(state, totalUsers) {
      state.totalUsers = totalUsers
    },
    coordinators(state, coordinators) {
      state.coordinators = coordinators
    },
    params(state, params) {
      state.params = params
    },
    loading(state, loading) {
      state.loading = loading
    },
    pagination(state, pagination) {
      state.pagination = pagination
    },
  },
  getters: {
    selectedData(state) {
      return state.selectedData
    },
    status(state) {
      return state.status
    },
    coordinators(state) {
      return state.coordinators
    },
    params(state) {
      return state.params
    },
    loading(state) {
      return state.loading
    },
    availableLicenses(state) {
      return state.availableLicenses
    },
    totalUsers(state) {
      return state.totalUsers
    },
    pagination(state) {
      return state.pagination
    },
  },
}
