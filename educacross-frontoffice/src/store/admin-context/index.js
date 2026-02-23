export default {
  state: {
    subjectSelected: 0,
    monthSelected: -1,
    pdfLoadPercent: 0,
  },
  getters: {
    GET_SUBJECT_SELECTED: state => state.subjectSelected,
    GET_MONTH_SELECTED: state => state.monthSelected,
    GET_ADMIN_PDF_LOAD_PERCENT: state => state.pdfLoadPercent,
  },
  mutations: {
    UPDATE_SUBJECT_SELECTED(state, val) {
      state.subjectSelected = val
    },
    UPDATE_MONTH_SELECTED(state, val) {
      state.monthSelected = val
    },
    UPDATE_PDF_LOAD_PERCENTAGE(state, val) {
      state.pdfLoadPercent = val
    },
  },
  actions: {
    SET_SUBJECT_SELECTED({ commit }, state) {
      commit('UPDATE_SUBJECT_SELECTED', state)
    },
    SET_MONTH_SELECTED({ commit }, state) {
      commit('UPDATE_MONTH_SELECTED', state)
    },
    UpdatePdfLoadPercentage({ commit }, val) {
      commit('UPDATE_PDF_LOAD_PERCENTAGE', val)
    },
  },
}
