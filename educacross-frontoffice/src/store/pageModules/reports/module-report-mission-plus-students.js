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
    loadingTable: true,
    title: {
      subjectId: 0,
      status: 0,
      startDate: '',
      endDate: '',
      title: '',
      className: '',
      serieName: '',
    },
    rounds: [],
    students: {
      data: [],
      currentPage: 0,
      pageSize: 0,
      currentPageSize: 0,
      total: 0,
      totalPages: 0,
    },
    total: 0,
    params: defaultParams(),
    selectedStudents: {
      value: [],
      batchAction: 1,
    },
    excelLoading: false,
    selectedRoundFilter: {},
  },
  mutations: {
    total(state, total) {
      state.total = total
    },
    loading(state, loading) {
      state.loading = loading
    },
    params(state, params) {
      Object.assign(state.params, params)
    },
    title(state, title) {
      state.title = title
    },
    rounds(state, rounds) {
      state.rounds = rounds
    },
    students(state, students) {
      state.students = students
    },

    reset(state) {
      state.loading = false
      state.title = {
        subjectsIds: [],
        status: 0,
        startDate: '',
        endDate: '',
        title: '',
        className: '',
        serieName: '',
      }
      state.data = []
      state.total = 0
      state.params = defaultParams()
    },
    loadingTable(state, loading) {
      state.loadingTable = loading
    },
    excelLoading: (state, loading) => {
      state.excelLoading = loading
    },
    selectedRoundFilter: (state, round) => {
      state.selectedRoundFilter = round
    },
  },
  getters: {
    total(state) {
      return state.total
    },
    loading(state) {
      return state.loading
    },
    title(state) {
      return state.title
    },
    subjectId(state) {
      return state.title.subjectsId
    },
    rounds(state) {
      return state.rounds
    },
    students(state) {
      return state.students
    },
    params(state) {
      return state.params
    },
    loadingTable(state) {
      return state.loadingTable
    },
    selectedStudents(state) {
      return state.selectedStudents
    },
    excelLoading: state => state.excelLoading,
    selectedRoundFilter: state => state.selectedRoundFilter,
  },
}
