import { getAccessByInstitutionMonth } from '@/services/admin-context/professor/Professor.service'

export default {
  namespaced: true,
  state: {
    data: [],
    loading: true,
    dataTeacherAccess: {},
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },

    reset(state) {
      state.data = []
      state.loading = true
      state.dataTeacherAccess = {}
    },
    setDataTeacherAccess(state, data) {
      state.dataTeacherAccess = data
    },
  },
  actions: {
    async fetchTeacherAccess({ commit, rootGetters }) {
      const moduleId = rootGetters['moduleTeacherAccess/moduleId']?.id
      const educationSystemId = rootGetters['moduleTeacherAccess/educationSystem']?.id
      const month = rootGetters['moduleTeacherAccess/month']
      const institutionsIds = rootGetters['moduleTeacherAccess/institution']
      const NetworkGroup = rootGetters['moduleTeacherAccess/networkGroup']

      commit('setLoading', true)

      getAccessByInstitutionMonth({
        Month: month.id,
        Module: moduleId,
        EducationSystemId: educationSystemId,
        InstitutionsIds: institutionsIds.id,
        NetworkGroupId: NetworkGroup.id,
      })
        .then(async response => {
          commit('setDataTeacherAccess', response.data)
          commit('setLoading', false)
        })
        .catch(() => {
          commit('setDataTeacherAccess', {})
        })
    },
    setEmpty({ commit }) {
      commit('reset')
      commit('setLoading', false)
    },
  },
  getters: {
    data(state) {
      return state.dataTeacherAccess?.institutions
    },
    dataTeacherAccess(state) {
      return state.dataTeacherAccess
    },

    loading(state) {
      return state.loading
    },
  },
}
