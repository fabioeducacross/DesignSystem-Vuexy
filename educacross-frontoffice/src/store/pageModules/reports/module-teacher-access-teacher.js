import {
  getAccessByTeachers,
  getTeacherAccessByMonth,
  getTeacherEducationSystemGuidesEnabled,
  getTeacherSchoolGuidesEnabled,
} from '@/services/admin-context/professor/Professor.service'

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

export default {
  namespaced: true,
  state: {
    data: [],
    total: 0,
    params: defaultParams(),
    loading: true,
    dataTeacherAccess: {},
    cardLoading: true,
  },
  mutations: {
    setData(state, data) {
      state.data = data
    },
    setTotal(state, total) {
      state.total = total
    },

    setLoading(state, loading) {
      state.loading = loading
    },
    setCardLoading(state, loading) {
      state.cardLoading = loading
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },
    reset(state) {
      state.dataTeacherAccess = {}
      state.data = []
      state.total = 0
      state.params = defaultParams()
      state.loading = true
      state.cardLoading = true
    },
    setDataTeacherAccess(state, data) {
      state.dataTeacherAccess = data
    },
    setDataTeacherAccessAssign(state, data) {
      Object.assign(state.dataTeacherAccess, data)
    },
  },
  actions: {
    async fetchTeacherAccess({ commit, rootGetters }) {
      const moduleId = rootGetters['moduleTeacherAccess/moduleId']?.id
      const institution = rootGetters['moduleTeacherAccess/institution']
      const educationSystemId = rootGetters['moduleTeacherAccess/educationSystem']?.id
      const month = rootGetters['moduleTeacherAccess/month']
      const NetworkGroup = rootGetters['moduleTeacherAccess/networkGroup']

      commit('setCardLoading', true)
      getTeacherAccessByMonth({
        InstitutionId: institution?.id,
        Month: month.id,
        NetworkGroupId: NetworkGroup?.id,
      })
        .then(async response => {
          commit('setDataTeacherAccess', response.data || {})

          try {
            if (moduleId === 11) {
              const { data } = await getTeacherEducationSystemGuidesEnabled({
                InstitutionId: institution.id,
                EducationSystemId: educationSystemId,
                Month: month.id,
                NetworkGroupId: NetworkGroup.id,
              })
              commit('setDataTeacherAccessAssign', {
                guidesEnabled: data.guidesEnabled,
                months: data.months,
              })
            } else {
              const { data } = await getTeacherSchoolGuidesEnabled({
                InstitutionId: institution.id,
                Month: month.id,
                NetworkGroupId: NetworkGroup.id,
              })
              commit('setDataTeacherAccessAssign', {
                guidesEnabled: data.guidesEnabled,
                months: data.months,
              })
            }
            commit('setCardLoading', false)
          } catch (error) {
            commit('setCardLoading', false)
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
    async fetch({ commit, rootGetters, state }) {
      commit('setData', [])
      commit('setLoading', true)

      const moduleId = rootGetters['moduleTeacherAccess/moduleId']?.id
      const NetworkGroup = rootGetters['moduleTeacherAccess/networkGroup']
      const month = rootGetters['moduleTeacherAccess/month']
      const institution = rootGetters['moduleTeacherAccess/institution']
      const educationSystemId = rootGetters['moduleTeacherAccess/educationSystem']?.id

      if (!moduleId) return

      const params = {
        InstitutionId: institution.id,
        Month: month.id,
        Module: moduleId,
        NetworkGroupId: NetworkGroup.id,
        EducationSystemId: educationSystemId,
        ...state.params,
      }

      getAccessByTeachers(params, state.params.Page)
        .then(({ data }) => {
          commit('setData', data.data)
          commit('setTotal', data.total)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    resetData({ commit }) {
      commit('setParams', defaultParams())
    },
  },
  getters: {
    data(state) {
      return state.data
    },
    dataTeacherAccess(state) {
      return state.dataTeacherAccess
    },
    total(state) {
      return state.total
    },
    loading(state) {
      return state.loading
    },
    cardLoading(state) {
      return state.cardLoading
    },
  },
}
