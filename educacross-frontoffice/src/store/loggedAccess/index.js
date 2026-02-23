import Vue from 'vue'

export default {
  state: {
    loggedAccess: {
      users: {},
      impersonated: {},
    },
  },
  mutations: {
    addAccess(state, payload) {
      if (payload.Impersonated) {
        Vue.set(state.loggedAccess.impersonated, payload.Id, payload)
      } else {
        Vue.set(state.loggedAccess.users, payload.Id, payload)
      }
    },
    removeAccess(state, payload) {
      if (payload.Impersonated) {
        Vue.delete(state.loggedAccess.impersonated, payload.Id)
      } else {
        Vue.delete(state.loggedAccess.users, payload.Id)
      }
    },
    clearAllAccess(state) {
      // state.loggedAccess.users = {}
      // state.loggedAccess.impersonated = {}
      Object.assign(state.loggedAccess, {
        users: {},
        impersonated: {},
      })
    },
  },
  actions: {
    loginLoggedAccess({ commit }, payload) {
      commit('addAccess', payload)
    },
    logoutLoggedAccess({ commit }, payload) {
      commit('removeAccess', payload)
    },
    logoutAllLoggedAccess({ commit }) {
      commit('clearAllAccess')
    },
  },
}
