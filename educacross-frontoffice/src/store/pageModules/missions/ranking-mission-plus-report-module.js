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
    networkGroups: [],
    group: null,
    dataTable: [],
    total: 0,
    excelLoading: false,
    selectedRoundFilter: {},
    schoolYears: [],
    month: '',
    serieId: null,
    guideId: null,
    guideName: '',
    missions: [],
    classes: [],
    classId: null,
    classLoading: true,
    classPage: 1,
    classPageSize: 10,
    classTotalPages: 1,
  },
  mutations: {
    total(state, total) {
      state.total = total
    },
    loading(state, loading) {
      state.loading = loading
    },
    title(state, title) {
      state.title = title
    },
    rounds(state, rounds) {
      state.rounds = rounds
    },
    dataTable(state, payload) {
      state.dataTable = payload
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
    month: (state, month) => {
      state.month = month
    },
    guideId: (state, guideId) => {
      state.guideId = guideId
    },
    serieId: (state, serieId) => {
      state.serieId = serieId
    },
    networkGroups(state, groups) {
      state.networkGroups = groups
    },
    schoolYears(state, years) {
      state.schoolYears = years
    },

    missions: (state, missions) => {
      state.missions = missions
    },
    group: (state, group) => {
      state.group = group
    },
    classes: (state, classes) => {
      state.classes = classes
    },
    classLoading: (state, loading) => {
      state.classLoading = loading
    },
    classPage(state, page) {
      state.classPage = page
    },
    classPageSize(state, pageSize) {
      state.classPageSize = pageSize
    },
    classTotalPages(state, totalPages) {
      state.classTotalPages = totalPages
    },
    classId(state, classId) {
      state.classId = classId
    },
    guideName: (state, guideName) => {
      state.guideName = guideName
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
    dataTable(state) {
      return state.dataTable
    },
    loadingTable(state) {
      return state.loadingTable
    },
    guideId(state) {
      return state.guideId
    },
    serieId(state) {
      return state.serieId
    },
    missions(state) {
      return state.missions
    },
    month(state) {
      return state.month
    },
    networkGroups(state) {
      return state.networkGroups
    },
    schoolYears(state) {
      return state.schoolYears
    },
    group(state) {
      return state.group
    },
    classes(state) {
      return state.classes
    },
    classId(state) {
      return state.classId
    },
    classLoading(state) {
      return state.classLoading
    },
    classPage(state) {
      return state.classPage
    },
    classPageSize(state) {
      return state.classPageSize
    },
    classTotalPages(state) {
      return state.classTotalPages
    },
    guideName(state) {
      return state.guideName
    },
    excelLoading: state => state.excelLoading,
    selectedRoundFilter: state => state.selectedRoundFilter,
  },
}
