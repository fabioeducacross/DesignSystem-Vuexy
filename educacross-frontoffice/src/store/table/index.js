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
    loading: true,
    params: defaultParams(),
    data: [],
    totalData: 0,
    tableRef: null,
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    data(state, payload) {
      state.data = payload
    },
    totalData(state, payload) {
      state.totalData = payload
    },
    params(state, params) {
      Object.assign(state.params, params)
    },
    tableRef(state, payload) {
      state.tableRef = payload
    },
    reset(state) {
      state.data = []
      state.totalData = 0
      state.loading = true
      state.params = defaultParams()
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    data(state) {
      return state.data
    },
    totalData(state) {
      return state.totalData
    },
    params(state) {
      return state.params
    },
    tableRef(state) {
      return state.tableRef
    },
  },
  actions: {},
}
