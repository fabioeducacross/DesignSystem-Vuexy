import { getEducationSystemReportGuidePlus } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import useFilters from '@/store/filters/useFilters'

const { book, educationSystemId, classe, mission, subject, subjects } = useFilters()

export default {
  namespaced: true,
  state: {
    loading: true,
    student: {
      id: null,
      name: 'Todos os alunos',
    },
    tableStrongWeak: {
      descriptorsStrong: [],
      descriptorsToImprove: [],
    },
    rounds: [],
    cards: {
      progress: {
        student: 0,
        classe: 0,
      },
      performance: {
        student: 0,
        classe: 0,
      },
      totalTime: {
        student: 0,
        classe: 0,
      },
      challengesDone: 0,
    },
    name: '',
    className: '',
    serieName: '',
    educationSystemName: '',
  },
  mutations: {
    reset(state) {
      state.loading = true
      state.student = {
        id: null,
        name: 'Todos os alunos',
      }
      state.tableStrongWeak = {
        descriptorsStrong: [],
        descriptorsToImprove: [],
      }
      state.rounds = []
      state.cards = {
        progress: {
          student: 0,
          classe: 0,
        },
        performance: {
          student: 0,
          classe: 0,
        },
        totalTime: {
          student: 0,
          classe: 0,
        },
        challengesDone: 0,
      }

      state.name = ''
      state.className = ''
      state.serieName = ''
      state.educationSystemName = ''
    },
    loading(state, payload) {
      state.loading = payload
    },

    tableStrongWeak(state, payload) {
      state.tableStrongWeak = payload
    },

    rounds(state, payload) {
      state.rounds = payload
    },
    cards(state, payload) {
      state.cards = payload
    },

    student(state, payload) {
      state.student = payload
    },

    name(state, payload) {
      state.name = payload
    },
    className(state, payload) {
      state.className = payload
    },
    serieName(state, payload) {
      state.serieName = payload
    },
    educationSystemName(state, payload) {
      state.educationSystemName = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },

    tableStrongWeak(state) {
      return state.tableStrongWeak
    },

    rounds(state) {
      return state.rounds
    },

    cards(state) {
      return state.cards
    },

    student(state) {
      return state.student
    },

    name(state) {
      return state.name
    },
    className(state) {
      return state.className
    },
    serieName(state) {
      return state.serieName
    },
    educationSystemName(state) {
      return state.educationSystemName
    },
  },

  actions: {
    fetch({ commit, state }) {
      commit('loading', true)

      getEducationSystemReportGuidePlus(educationSystemId.value, {
        GuideId: mission.value.id,
        ClassId: classe.value.ClassId,
        StudentId: state.student.id,
      })
        .then(({ data }) => {
          commit('tableStrongWeak', {
            descriptorsStrong: data.topicsStrong,
            descriptorsToImprove: data.topicsToImprove,
          })
          commit('rounds', data.rounds)
          commit('cards', {
            progress: {
              student: state.student.id ? data.progressStudent : data.progressClass,
              classe: data.progressClass,
            },
            performance: {
              student: state.student.id ? data.performanceStudent : data.performanceClass,
              classe: data.performanceClass,
            },
            totalTime: {
              student: state.student.id ? data.timeStudent : data.timeClass,
              classe: data.timeClass,
            },
            challengesDone: data.challenges,
          })

          commit('name', data.name)
          commit('className', data.className)
          commit('serieName', data.serieName)
          commit('educationSystemName', data.educationSystemName)
          book.value.name = data.bookName
          mission.value.name = data.name
          subject.value = subjects.value.find(({ id }) => id === data.subjectId)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
  },
}
