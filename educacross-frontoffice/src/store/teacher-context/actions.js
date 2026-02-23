/*= ========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

const actions = {
  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme({ commit }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  UpdateTeacherClass({ commit }, val) {
    commit('UPDATE_GLOBAL_TEACHER_CLASS', val)
  },

  UpdateSubjectsByEducationSystemId({ commit }, val) {
    commit('UPDATE_CHANGE_SUBJECTS_BY_EDUCATION_SYSTEM_ID', val)
  },

  UpdatePdfLoadPercentage({ commit }, val) {
    commit('UPDATE_PDF_LOAD_PERCENTAGE', val)
  },

  UpdatesuggestGuide({ commit }, val) {
    commit('UPDATE_SUGGEST_GUIDE', val)
  },

  SetsuggestGuideId({ commit }, val) {
    commit('SET_SUGGEST_GUIDE_ID', val)
  },

  UpdatesuggestGuideActivities({ commit }, val) {
    commit('GET_SUGGEST_GUIDE_ACTIVITIES', val)
  },

  UpdateSuggestGuideActivitiesRemoved({ commit }, val) {
    commit('UPDATE_SUGGEST_GUIDE_ACTIVITIES_REMOVED', val)
  },

  UpdatesuggestGuideActivitiesUsedForSuggestion({ commit }, val) {
    commit('UPDATE_SUGGEST_GUIDE_ACTIVITIES_USED_FOR_SUGGESTION', val)
  },

  resetTeacherContext({ commit }) {
    commit('RESET_TEACHER_CONTEXT')
  },
}

export default actions
