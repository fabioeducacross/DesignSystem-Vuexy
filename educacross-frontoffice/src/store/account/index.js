/* eslint-disable no-shadow */
import { decodeToken } from '@/auth/utils'
import { getEducationSystemModule } from '@/services/shared/educationSystem/EducationSystem.Service.js'

const getDefaultState = () => ({
  token: null,
  refreshToken: null,
  userData: {
    Role: 'Account',
  },
  totalCodeTimeValidateEmail: 0,
  codeVerifier: null,
  accessContext: {},
  appVersion: null,
  userAccountName: '',
  hasAccount: null,
})

const state = getDefaultState()

const getters = {
  accountToken: state => state.token,
  accountRefreshToken: state => state.refreshToken,
  accountUserData: state => state.userData,
  totalCodeTimeValidateEmail: state => state.totalCodeTimeValidateEmail,
  codeVerifier: state => state.codeVerifier,
  accessContext: state => state.accessContext,
  appVersion: state => state.appVersion,
}

const mutations = {
  loginAccount(state, { token, refreshToken, userData }) {
    state.token = token
    state.refreshToken = refreshToken
    state.userData = userData
  },
  totalCodeTimeValidateEmail(state, payload) {
    state.totalCodeTimeValidateEmail = payload
  },
  codeVerifier(state, payload) {
    state.codeVerifier = payload
  },
  accessContext(state, payload) {
    state.accessContext = payload
  },
  accountUserData(state, payload) {
    state.userData = payload
  },
  logoutAccount(state) {
    Object.assign(state, getDefaultState())
  },
  appVersion(state, payload) {
    state.appVersion = payload
  },
  setUserAccountName(state, payload) {
    state.userData.Name = payload
  },
  setHasAccount(state, payload) {
    state.hasAccount = payload
  },
}

const actions = {
  async login({ commit }, { token, refreshToken }) {
    const userData = decodeToken(token)

    if (userData.Role === 'Account') {
      commit('loginAccount', { token, refreshToken, userData })
    } else {
      commit('loginAccess', { token, refreshToken, userData })
    }

    const { InstitutionId } = userData

    if (InstitutionId) {
      getEducationSystemModule(InstitutionId).then(response => {
        commit('educationSystems', response.data)
      })
    }
  },
  verifyAppVersion({ commit, state }, appVersion) {
    if (!state.appVersion) {
      commit('appVersion', appVersion)
      return
    }

    if (state.appVersion !== appVersion) {
      commit('appVersion', appVersion)
      // reload window
      window.location.reload(true)
    }
  },
  setUserAccountNameAction({ commit }, { userAccountName }) {
    commit('setUserAccountName', userAccountName)
  },
  setHasAccountAction({ commit }, hasAccount) {
    commit('setHasAccount', hasAccount)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
