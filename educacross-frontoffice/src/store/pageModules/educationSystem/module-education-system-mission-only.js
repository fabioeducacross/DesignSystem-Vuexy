import { getEducationSystemReportStudent } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable'

const { loading, dataTable } = useTable()

const { classe, subject, book, mission, educationSystemId } = useFilters()

export default {
  namespaced: true,
  state: {
    loading: true,
    cards: {
      progress: 0,
      performance: 0,
      totalTime: 0,
      challengesDone: 0,
    },
    educationSystemName: '',
    status: null,
    startDate: '',
    finishDate: '',
    error: false,
  },
  mutations: {
    reset(state) {
      state.loading = true
      state.cards = {
        progress: 0,
        performance: 0,
        totalTime: 0,
        challengesDone: 0,
      }
      state.educationSystemName = ''
      state.error = false
      dataTable.value = []
    },
    loading(state, payload) {
      state.loading = payload
    },
    cards(state, payload) {
      state.cards = payload
    },
    educationSystemName(state, payload) {
      state.educationSystemName = payload
    },
    status(state, payload) {
      state.status = payload
    },
    startDate(state, payload) {
      state.startDate = payload
    },
    finishDate(state, payload) {
      state.finishDate = payload
    },
    error(state, payload) {
      state.error = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    cards(state) {
      return state.cards
    },
    educationSystemName(state) {
      return state.educationSystemName
    },
    status(state) {
      return state.status
    },
    startDate(state) {
      return state.startDate
    },
    finishDate(state) {
      return state.finishDate
    },
    error(state) {
      return state.error
    },
  },
  actions: {
    fetch({ commit }) {
      commit('loading', true)

      getEducationSystemReportStudent({
        ClassId: classe.value.ClassId,
        SubjectId: subject.value.id,
        BookId: book.value.id,
        GuideId: mission.value.id,
        EducationSystemId: educationSystemId.value,
      })
        .then(({ data }) => {
          commit('cards', {
            progress: data.progress,
            performance: data.performance,
            totalTime: data.totalTime,
            challengesDone: data.challengesDone,
          })
          commit('educationSystemName', data.educationSystemName)
          commit('status', data.status)
          commit('startDate', data.startDate)
          commit('finishDate', data.finishDate)
          mission.value.name = data.guideName
          dataTable.value = data.students
        })
        .catch(() => {
          commit('cards', {
            progress: 0,
            performance: 0,
            totalTime: 0,
            challengesDone: 0,
          })
          dataTable.value = []
        })
        .finally(() => {
          loading.value = false
          commit('loading', false)
        })
    },
  },
}
