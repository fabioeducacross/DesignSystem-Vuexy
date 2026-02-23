import { getEducationSystemRanking } from '@/services/teacher-context/educationSystem/EducationSystem.Service'

export default {
  namespaced: true,
  state: {
    subject: null,
    classes: null,
    schoolYear: null,
    month: null,
    period: { id: null, name: 'Geral' },
    loading: true,
    educationSystemId: null,
    data: [],
  },
  getters: {
    subject: state => state.subject,
    classes: state => state.classes,
    schoolYear: state => state.schoolYear,
    month: state => state.month,
    loading: state => state.loading,
    period: state => state.period,
    data: state => state.data,
  },
  mutations: {
    setSubject(state, subject) {
      state.subject = subject
    },
    setclasses(state, data) {
      state.classes = data
    },
    setSchoolYear(state, schoolYear) {
      state.schoolYear = schoolYear
    },
    setMonth(state, month) {
      state.month = month
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setPeriod(state, period) {
      state.period = period
    },
    setEducationSystemId(state, educationSystemId) {
      state.educationSystemId = educationSystemId
    },
    setData(state, data) {
      state.data = data
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (!state.schoolYear.id) return

      commit('setLoading', true)

      try {
        const res = await getEducationSystemRanking({
          subjectId: state.subject.id,
          serieId: state.schoolYear.id,
          ClassId: state.classes.id,
          timePeriod: state.period.id,
          month: state.period.id !== null ? state.month?.id : null,
          educationSystemId: state.educationSystemId,
        })

        commit('setData', res.data.ranking || [])
      } catch (_err) {
        commit('setData', [])
      } finally {
        commit('setLoading', false)
      }
    },
    noData({ commit }) {
      commit('setLoading', false)
      commit('setData', [])
    },
  },
}
