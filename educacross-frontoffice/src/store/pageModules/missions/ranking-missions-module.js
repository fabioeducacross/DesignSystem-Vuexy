export default {
  namespaced: true,
  state: {
    loading: true,
    loadingTable: true,
    missionsLoading: false,
    title: {
      subjectId: 0,
      status: 0,
      startDate: '',
      endDate: '',
      title: '',
      className: '',
      serieName: '',
      serieId: null,
    },
    rounds: [],
    networkGroups: [],
    group: null,
    dataTable: [],
    total: 0,
    excelLoading: false,
    selectedRoundFilter: {},
    schoolYears: [],
    schoolYearsLoading: false,
    selectedMonth: null,
    selectedSerie: null,
    selectedGuide: null,
    guideName: '',
    missions: [],
    classes: [],
    selectedClass: null,
    classLoading: true,
    classPage: 1,
    classPageSize: 10,
    classTotalPages: 1,
    countActivities: 0,
    countStars: 0,
  },
  mutations: {
    total(state, total) {
      state.total = total
    },
    loading(state, loading) {
      state.loading = loading
    },
    title(state, title) {
      Object.assign(state.title, title)
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
    selectedMonth: (state, month) => {
      state.selectedMonth = month
    },
    selectedGuide: (state, selectedGuide) => {
      state.selectedGuide = selectedGuide
    },
    selectedSerie: (state, selectedSerie) => {
      state.selectedSerie = selectedSerie
    },
    networkGroups(state, groups) {
      state.networkGroups = groups
    },
    schoolYears(state, years) {
      state.schoolYears = years
    },
    schoolYearsLoading: (state, loading) => {
      state.schoolYearsLoading = loading
    },

    missions: (state, missions) => {
      state.missions = missions
    },
    missionsLoading: (state, loading) => {
      state.missionsLoading = loading
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
    countActivities(state, count) {
      state.countActivities = count
    },
    countStars(state, count) {
      state.countStars = count
    },
    selectedClass(state, selectedClass) {
      state.selectedClass = selectedClass
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
    selectedGuide(state) {
      return state.selectedGuide
    },
    selectedSerie(state) {
      return state.selectedSerie
    },
    missions(state) {
      return state.missions
    },
    missionsLoading(state) {
      return state.missionsLoading
    },
    selectedMonth(state) {
      return state.selectedMonth
    },
    networkGroups(state) {
      return state.networkGroups
    },
    schoolYears(state) {
      return state.schoolYears
    },
    schoolYearsLoading(state) {
      return state.schoolYearsLoading
    },
    group(state) {
      return state.group
    },
    classes(state) {
      return state.classes
    },
    selectedClass(state) {
      return state.selectedClass
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
    countActivities(state) {
      return state.countActivities
    },
    countStars(state) {
      return state.countStars
    },
    guideName(state) {
      return state.guideName
    },
    excelLoading: state => state.excelLoading,
    selectedRoundFilter: state => state.selectedRoundFilter,
  },
}
