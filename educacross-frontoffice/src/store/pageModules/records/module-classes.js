export default {
  namespaced: true,
  state: {
    selectedData: {
      value: [],
      batchAction: 1,
    },
    schoolYears: [],
    schoolYearsLoading: true,
  },
  mutations: {
    reset(state) {
      state.selectedData = {
        value: [],
        batchAction: 1,
      }
    },

    selectedData(state, selectedData) {
      state.selectedData = selectedData
    },
    schoolYears(state, schoolYears) {
      state.schoolYears = schoolYears
    },
    schoolYearsLoading(state, loading) {
      state.schoolYearsLoading = loading
    },
  },
  getters: {
    selectedData(state) {
      return state.selectedData
    },
    schoolYears(state) {
      return state.schoolYears
    },
    schoolYearsLoading(state) {
      return state.schoolYearsLoading
    },
  },
}
