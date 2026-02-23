import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,

    menu_colors_teacher: {},
    menu_colors_admin: {},
    menu_colors_responsible: {},
    canVerifyNPS: true,
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },

    get_institution_id: state => state.institution_id,
    GET_MENU_COLORS_TEACHER: state => state.menu_colors_teacher,
    GET_MENU_COLORS_ADMIN: state => state.menu_colors_admin,
    GET_MENU_COLORS_RESPONSIBLE: state => state.menu_colors_responsible,
  },
  mutations: {
    SET_CanVerifyNPS(state, payload) {
      state.canVerifyNPS = payload
    },
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },

    SET_MENU_COLORS_TEACHER(state, val) {
      state.menu_colors_teacher = val
    },

    SET_MENU_COLORS_ADMIN(state, val) {
      state.menu_colors_admin = val
    },

    SET_MENU_COLORS_RESPONSIBLE(state, val) {
      state.menu_colors_responsible = val
    },
  },
  actions: {
    SET_MENU_COLORS_TEACHER({ commit }, state) {
      commit('SET_MENU_COLORS_TEACHER', state)
    },
    SET_MENU_COLORS_ADMIN({ commit }, state) {
      commit('SET_MENU_COLORS_ADMIN', state)
    },
    SET_MENU_COLORS_RESPONSIBLE({ commit }, state) {
      commit('SET_MENU_COLORS_RESPONSIBLE', state)
    },
  },
}
