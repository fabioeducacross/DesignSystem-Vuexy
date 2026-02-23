export default {
  namespaced: true,
  state: {
    studentsOrigin: [],
    studentsDestination: [],
    transferedStudents: [],
    showOnlyRegularStudentsOrigin: false,
    showOnlyRegularStudentsDestination: false,
  },
  mutations: {
    reset(state) {
      state.studentsOrigin = []
      state.studentsDestination = []
      state.transferedStudents = []
      state.showOnlyRegularStudentsOrigin = false
      state.showOnlyRegularStudentsDestination = false
    },
    studentsOrigin(state, studentsOrigin) {
      state.studentsOrigin = studentsOrigin
    },
    studentsDestination(state, studentsDestination) {
      state.studentsDestination = studentsDestination
    },
    transferedStudents(state, transferedStudents) {
      state.transferedStudents = transferedStudents
    },
    showOnlyRegularStudentsOrigin(state, showOnlyRegularStudentsOrigin) {
      state.showOnlyRegularStudentsOrigin = showOnlyRegularStudentsOrigin
    },
    showOnlyRegularStudentsDestination(state, showOnlyRegularStudentsDestination) {
      state.showOnlyRegularStudentsDestination = showOnlyRegularStudentsDestination
    },
  },
  getters: {
    studentsOrigin(state) {
      return state.studentsOrigin
    },
    studentsDestination(state) {
      return state.studentsDestination
    },
    transferedStudents(state) {
      return state.transferedStudents
    },
    showOnlyRegularStudentsOrigin(state) {
      return state.showOnlyRegularStudentsOrigin
    },
    showOnlyRegularStudentsDestination(state) {
      return state.showOnlyRegularStudentsDestination
    },
  },
}
