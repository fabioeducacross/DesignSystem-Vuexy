/*= ========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
import { teacherContextConstructor } from './state'

const mutations = {
  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
    state.isVerticalNavMenuActive = value
  },
  TOGGLE_REDUCE_BUTTON(state, val) {
    state.reduceButton = val
  },
  UPDATE_MAIN_LAYOUT_TYPE(state, val) {
    state.mainLayoutType = val
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
    state.verticalNavMenuItemsMin = val
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
    state.verticalNavMenuWidth = width
  },

  // VxAutoSuggest

  UPDATE_STARRED_PAGE(state, payload) {
    // find item index in search list state
    let index = state.navbarSearchAndPinList.pages.data.findIndex(item => item.url === payload.url)

    // update the main list
    state.navbarSearchAndPinList.pages.data[index].is_bookmarked = payload.val

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(state.navbarSearchAndPinList.pages.data[index])
    } else {
      // find item index from starred pages
      index = state.starredPages.findIndex(item => item.url === payload.url)

      // remove item using index
      state.starredPages.splice(index, 1)
    }
  },

  // Navbar-Vertical

  ARRANGE_STARRED_PAGES_LIMITED(state, list) {
    const starredPagesMore = state.starredPages.slice(10)
    state.starredPages = list.concat(starredPagesMore)
  },
  ARRANGE_STARRED_PAGES_MORE(state, list) {
    let downToUp = false
    const lastItemInStarredLimited = state.starredPages[10]
    const starredPagesLimited = state.starredPages.slice(0, 10)
    state.starredPages = starredPagesLimited.concat(list)

    state.starredPages.slice(0, 10).forEach(i => {
      if (list.indexOf(i) > -1) downToUp = true
    })

    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited)
    }
  },

  // ////////////////////////////////////////////
  // UI
  // ////////////////////////////////////////////

  TOGGLE_CONTENT_OVERLAY(state, val) {
    state.bodyOverlay = val
  },
  UPDATE_PRIMARY_COLOR(state, val) {
    state.themePrimaryColor = val
  },
  UPDATE_THEME(state, val) {
    state.theme = val
  },
  UPDATE_WINDOW_WIDTH(state, width) {
    state.windowWidth = width
  },
  UPDATE_WINDOW_SCROLL_Y(state, val) {
    state.scrollY = val
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  UPDATE_GLOBAL_SUBJECT_ID(state, val) {
    state.subjectId = val
  },

  UPDATE_GLOBAL_CLASS_ID(state, val) {
    state.classId = val
  },

  UPDATE_ACCESS_TOKEN(state, val) {
    state.accessToken = val
  },
  UPDATE_ACCESS_EDUCATION_SYSTEMS(state, val) {
    state.accessEducationSystems = val
  },
  UPDATE_ACCESS_CLASSES(state, val) {
    state.accessClasses = val
  },

  UPDATE_IS_EDUCACROSS_USER(state, val) {
    state.isEducacrossUser = val
  },

  UPDATE_BACKGROUND_WHITE_LABEL_COLOR(state, val) {
    state.backgroundWhiteLabelColor = val
  },
  UPDATE_FONT_WHITE_LABEL_COLOR(state, val) {
    state.fontWhiteLabelColor = val
  },
  UPDATE_IMAGE_WHITE_LABEL(state, val) {
    state.imageWhiteLabel = val
  },
  UPDATE_CHANGE_SUBJECTS_BY_EDUCATION_SYSTEM_ID(state, val) {
    state.changeSubjectsByEducationSystemId = val
  },

  UPDATE_GLOBAL_ERROR(state, val) {
    state.globalError = val
  },
  UPDATE_GLOBAL_TEACHER_CLASS(state, val) {
    state.teacherClass = val
  },

  UPDATE_PDF_LOAD_PERCENTAGE(state, val) {
    state.pdfLoadPercent = val
  },

  UPDATE_SUGGEST_GUIDE(state, val) {
    state.suggestGuide = val
  },

  UPDATE_SUGGEST_GUIDE_ID(state, val) {
    state.suggestGuide.id = val
  },

  UPDATE_SUGGEST_GUIDE_ACTIVITIES(state, val) {
    if (Array.isArray(val)) {
      val.forEach(activity => {
        state.suggestGuide.recommendations.push(activity)
      })
    } else {
      state.suggestGuide.recommendations.push(val)
    }
  },

  UPDATE_SUGGEST_GUIDE_ACTIVITIES_REMOVED(state, val) {
    if (Array.isArray(val)) {
      state.suggestGuide.activitiesRemoved.push(...val)
    } else {
      state.suggestGuide.activitiesRemoved.push(val)
    }
  },

  UPDATE_SUGGEST_GUIDE_STEP(state, val) {
    state.suggestGuide.step = val
  },

  RESET_SUGGEST_GUIDE(state) {
    state.suggestGuide = {
      step: 0,
      id: null,
      recommendations: [],
      activitiesRemoved: [],
      activitiesUsedForRecommendation: [],
    }
  },

  UPDATE_SUGGEST_GUIDE_ACTIVITIES_USED_FOR_SUGGESTION(state, val) {
    if (!val.map) {
      state.suggestGuide.activitiesUsedForRecommendation = [val]
    } else {
      state.suggestGuide.activitiesUsedForRecommendation = val
    }
  },

  RESET_TEACHER_CONTEXT(state) {
    const defaultState = teacherContextConstructor()
    Object.assign(state, defaultState)
  },
}

export default mutations
