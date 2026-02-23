const defaultParams = () => {
  return {
    OrderBy: null,
    Ascending: 'true',
  }
}

const defaultFilters = () => [[], [], [], [], []]

export default {
  namespaced: true,
  state: {
    classId: null,
    bookId: null,
    onlyName: null,
    loading: true,
    params: defaultParams(),
    dataTable: [],
    totalData: 0,
    bookDetails: {},
    filters: defaultFilters(),
    filtersOptions: [[], [], [], [], []],
    filterByEnabled: [null],
    checkedItems: [],
    pageSize: 12,
    currentPage: 1,
    selectAll: false,
    search: '',
  },
  mutations: {
    bookId(state, payload) {
      state.bookId = payload
    },
    onlyName(state, payload) {
      state.onlyName = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    reset(state) {
      state.networkGroup = {
        id: null,
        name: 'Todos',
      }
      state.city = {
        id: null,
        name: 'Todos',
      }
      state.month = {
        id: null,
        name: 'Todo o período',
      }
    },
    bookDetails(state, payload) {
      state.bookDetails = payload
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
    filters(state, data) {
      Object.assign(state.filters, data)
    },
    filterByEnabled(state, payload) {
      // keep the last item selected by the user
      const lastIndex = payload.length - 1
      payload = [payload[lastIndex]]

      state.filterByEnabled = payload
    },
    checkedItems(state, payload) {
      state.checkedItems = payload
    },
    pageSize(state, payload) {
      state.pageSize = payload
    },
    currentPage(state, payload) {
      state.currentPage = payload
    },
    selectAll(state, payload) {
      state.selectAll = payload
    },
    filtersOptions(state, payload) {
      state.filtersOptions = payload
    },
    search(state, payload) {
      state.search = payload
    },
  },
  getters: {
    onlyName(state) {
      return state.onlyName
    },
    loading(state) {
      return state.loading
    },
    dataTable(state) {
      return state.dataTable
    },
    totalData(state) {
      return state.totalData
    },
    bookDetails(state) {
      return state.bookDetails
    },
    filters(state) {
      return state.filters
    },
    filterByEnabled(state) {
      return state.filterByEnabled
    },
    checkedItems(state) {
      return state.checkedItems
    },
    pageSize(state) {
      return state.pageSize
    },
    currentPage(state) {
      return state.currentPage
    },
    selectAll(state) {
      return state.selectAll
    },
    params(state) {
      return state.params
    },
    filtersOptions(state) {
      return state.filtersOptions
    },
    search(state) {
      return state.search
    },
  },
}
