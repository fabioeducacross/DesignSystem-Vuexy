const defaultStatus = {
  id: null,
  name: 'Todos os status',
}

export default {
  namespaced: true,
  state: {
    selectedData: {
      value: [],
      batchAction: 1,
    },
    totalUsers: 0,
    availableLicenses: 0,
    status: defaultStatus,
  },
  mutations: {
    reset(state) {
      state.availableLicenses = 0
      state.selectedData = {
        value: [],
        batchAction: 1,
      }
      state.status = defaultStatus
    },
    status(state, status) {
      state.status = status
    },
    selectedData(state, selectedData) {
      state.selectedData = selectedData
    },

    availableLicenses(state, availableLicenses) {
      state.availableLicenses = availableLicenses
    },
    totalUsers(state, totalUsers) {
      state.totalUsers = totalUsers
    },
  },
  getters: {
    selectedData(state) {
      return state.selectedData
    },

    availableLicenses(state) {
      return state.availableLicenses
    },
    totalUsers(state) {
      return state.totalUsers
    },
    status(state) {
      return state.status
    },
  },
}
