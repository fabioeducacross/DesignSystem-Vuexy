import { getEducationSystemReporClassStudents } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable'

const { loading, dataTable } = useTable()

const { classe, subject, book, mission, educationSystemId, serie } = useFilters()

export default {
  namespaced: true,
  state: {
    educationSystemName: '',
    totalStudents: 0,
    teachersNames: [],
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
  },
  mutations: {
    reset(state) {
      state.educationSystemName = ''
      state.totalStudents = 0
      state.teachersNames = []
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
    },

    educationSystemName(state, payload) {
      state.educationSystemName = payload
    },

    totalStudents(state, payload) {
      state.totalStudents = payload
    },

    teachersNames(state, payload) {
      state.teachersNames = payload
    },
    loadingDashboard(state, payload) {
      state.loadingDashboard = payload
    },
    dashboardData(state, payload) {
      state.dashboardData = payload
    },
  },
  getters: {
    educationSystemName(state) {
      return state.educationSystemName
    },

    totalStudents(state) {
      return state.totalStudents
    },

    teachersNames(state) {
      return state.teachersNames
    },
    loadingDashboard(state) {
      return state.loadingDashboard
    },
    dashboardData(state) {
      return state.dashboardData
    },
  },
  actions: {
    fetch({ commit }) {
      loading.value = true
      getEducationSystemReporClassStudents(educationSystemId.value, {
        ClassId: classe.value.id,
        SubjectId: subject.value.id,
        BookId: book.value.id,
        GuideId: mission.value.id,
      })
        .then(({ data }) => {
          commit('educationSystemName', data.educationSystemName)
          commit('totalStudents', data.totalStudents)
          const teachersNames = data.teachersNames
            ? data.teachersNames.map(teacher => {
                return {
                  name: teacher,
                }
              })
            : []

          commit('teachersNames', teachersNames)

          dataTable.value = data.students
          serie.value = {
            id: data.serieId,
            name: data.serieName,
          }
          classe.value.name = data.className
        })
        .catch(() => {
          dataTable.value = []
        })
        .finally(() => {
          loading.value = false
        })
    },
  },
}
