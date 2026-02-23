import {
  getTeacherAccessByMonth,
  getTeacherEducationSystemGuidesEnabled,
  getTeacherSchoolGuidesEnabled,
} from '@/services/admin-context/professor/Professor.service'

export default {
  namespaced: true,
  state: {
    data: [],
    loading: true,
    dataTeacherAccess: {},
    cardLoading: true,
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    setCardLoading(state, loading) {
      state.cardLoading = loading
    },
    reset(state) {
      state.data = []
      state.loading = true
      state.dataTeacherAccess = {}
      state.cardLoading = true
    },
    setDataTeacherAccess(state, data) {
      state.dataTeacherAccess = data
    },
    setDataTeacherAccessGuides(state, data) {
      let value = []
      if (state.dataTeacherAccess.months) {
        value = state.dataTeacherAccess.months.map(item => {
          const monthGuidesEnabled = data.months.find(el => el.month === item.month)
          item.guidesEnabled = monthGuidesEnabled ? monthGuidesEnabled.guidesEnabled : ''
          return item
        })
      }
      state.dataTeacherAccess.guidesEnabled = data.guidesEnabled
      state.dataTeacherAccess.months = value
      state.data = value
    },
  },
  actions: {
    async fetchTeacherAccess({ commit, rootGetters }) {
      const moduleId = rootGetters['moduleTeacherAccess/moduleId']?.id
      const institution = rootGetters['moduleTeacherAccess/institution']
      const educationSystemId = rootGetters['moduleTeacherAccess/educationSystem']?.id
      const NetworkGroup = rootGetters['moduleTeacherAccess/networkGroup']

      commit('setCardLoading', true)
      commit('setLoading', true)

      getTeacherAccessByMonth({
        InstitutionId: institution.id,
        NetworkGroupId: NetworkGroup.id,
      })
        .then(async response => {
          commit('setDataTeacherAccess', response.data || {})
          try {
            if (moduleId === 11) {
              const { data } = await getTeacherEducationSystemGuidesEnabled({
                InstitutionId: institution.id,
                EducationSystemId: educationSystemId,
                NetworkGroupId: NetworkGroup.id,
              })
              commit('setDataTeacherAccessGuides', {
                guidesEnabled: data.guidesEnabled,
                months: data.months,
              })
            } else {
              const { data } = await getTeacherSchoolGuidesEnabled({
                InstitutionId: institution.id,
                NetworkGroupId: NetworkGroup.id,
              })
              commit('setDataTeacherAccessGuides', {
                guidesEnabled: data.guidesEnabled,
                months: data.months,
              })
            }
            commit('setCardLoading', false)
            commit('setLoading', false)
          } catch (error) {
            commit('setCardLoading', false)
            commit('setLoading', false)
          }
        })
        .catch(() => {
          commit('setDataTeacherAccess', {})
        })
    },
    setEmpty({ commit }) {
      commit('reset')
      commit('setCardLoading', false)
      commit('setLoading', false)
    },
  },
  getters: {
    data(state) {
      return state.data
    },
    dataTeacherAccess(state) {
      return state.dataTeacherAccess
    },

    loading(state) {
      return state.loading
    },
    cardLoading(state) {
      return state.cardLoading
    },
  },
}
