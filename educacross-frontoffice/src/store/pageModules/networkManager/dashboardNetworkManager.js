export default {
  namespaced: true,
  state: {
    selectedInstitution: undefined,
  },
  mutations: {
    selectedInstitution(state, institution) {
      state.selectedInstitution = institution
    },
  },
  getters: {
    selectedInstitution: state => state.selectedInstitution,
  },
}
