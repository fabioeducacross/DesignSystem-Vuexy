import { getEducationSystemReporClasses } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable'

const { loading, dataTable } = useTable()

const { serie, subject, institution, educationSystemId } = useFilters()

export default {
  namespaced: true,
  state: {
    loading: true,
    loadingDashboard: true,
    dashboardData: {
      totalGuideProgress: 0,
      sendGuideProgress: 0,
      amountGuideSend: 0,
      totalGuide: 0,
      studentsPlayed: 0,
      performance: 0,
      totalTime: 0,
      challengesDone: 0,
      amountGuidesInProgress: 0,
      inProgressGuideProgress: 0,
    },
    educationSystemName: '',
    institutionName: '',
  },
  mutations: {
    reset(state) {
      state.loading = true
      state.loadingDashboard = true
      state.dashboardData = {
        totalGuideProgress: 0,
        sendGuideProgress: 0,
        amountGuideSend: 0,
        totalGuide: 0,
        studentsPlayed: 0,
        performance: 0,
        totalTime: 0,
        challengesDone: 0,
        amountGuidesInProgress: 0,
        inProgressGuideProgress: 0,
      }
      state.educationSystemName = ''
    },
    loading(state, payload) {
      state.loading = payload
    },
    loadingDashboard(state, payload) {
      state.loadingDashboard = payload
    },
    dashboardData(state, payload) {
      state.dashboardData = payload
    },
    educationSystemName(state, payload) {
      state.educationSystemName = payload
    },

    institutionName(state, payload) {
      state.institutionName = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    loadingDashboard(state) {
      return state.loadingDashboard
    },
    dashboardData(state) {
      return state.dashboardData
    },
    educationSystemName(state) {
      return state.educationSystemName
    },
    institutionName(state) {
      return state.institutionName
    },
  },
  actions: {
    fetch({ commit }) {
      commit('loading', true)

      getEducationSystemReporClasses(educationSystemId.value, {
        SubjectId: subject.value.id,
        SerieId: serie.value.id,
        InstitutionId: institution.value?.id,
      })
        .then(({ data }) => {
          commit('educationSystemName', data.educationSystemName)
          commit('institutionName', data.institutionName)

          dataTable.value = data.classes
        })
        .catch(() => {
          dataTable.value = []
        })
        .finally(() => {
          loading.value = false
          commit('loading', false)
        })
    },
  },
}
