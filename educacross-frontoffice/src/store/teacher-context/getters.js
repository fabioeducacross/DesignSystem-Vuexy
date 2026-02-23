/*= ========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

// added so later we can keep breakpoint in sync automatically using this config file
// import tailwindConfig from "../../tailwind.config"

const getters = {
  // COMPONENT
  // vx-autosuggest
  // starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  windowBreakPoint: state => {
    // This should be same as tailwind. So, it stays in sync with tailwind utility classes
    if (state.windowWidth >= 1200) return 'xl'
    if (state.windowWidth >= 992) return 'lg'
    if (state.windowWidth >= 768) return 'md'
    if (state.windowWidth >= 576) return 'sm'
    return 'xs'
  },

  scrollbarTag: state => (state.is_touch_device ? 'div' : 'VuePerfectScrollbar'),

  GET_GLOBAL_SUBJECT_ID: state => state.subjectId,

  GET_TEACHER_CLASS: state => state.teacherClass,

  GET_GLOBAL_CLASS_ID: state => state.classId,

  GET_PDF_LOAD_PERCENT: state => state.pdfLoadPercent,

  GET_SUGGEST_GUIDE: state => state.suggestGuide,

  GET_SUGGEST_GUIDE_STEP: state => state.suggestGuide.step,

  GET_SUGGEST_GUIDE_ID: state => state.suggestGuide.id,

  GET_SUGGEST_GUIDE_ACTIVITIES: state => state.suggestGuide.activities,

  GET_SUGGEST_GUIDE_ACTIVITIES_REMOVED: state => state.suggestGuide.activitiesRemoved,

  GET_SUGGEST_GUIDE_ACTIVITIES_USED_FOR_SUGGEST: state =>
    state.suggestGuide.activitiesUsedForRecommendation,
}

export default getters
