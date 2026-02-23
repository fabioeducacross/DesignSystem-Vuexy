import { getEducationSystemReportInstitutionGuidePlus } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { getEducationSystemBookDetails } from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import useFilters from '@/store/filters/useFilters'

const { serie, book, educationSystemId, classe, mission, subject, subjects } = useFilters()

export default {
  namespaced: true,
  state: {
    loading: true,
    tableStrongWeak: {
      descriptorsStrong: [],
      descriptorsToImprove: [],
    },
    rounds: [],
    cards: {
      progress: {
        institution: 0,
        classe: 0,
      },
      performance: {
        institution: 0,
        classe: 0,
      },
      totalTime: {
        institution: 0,
        classe: 0,
      },
      challengesDone: 0,
    },
    name: '',
    className: '',
    serieName: '',
    educationSystemName: '',
    bookName: '',
    serieId: null,
    status: null,
  },
  mutations: {
    reset(state) {
      state.loading = true
      state.tableStrongWeak = {
        descriptorsStrong: [],
        descriptorsToImprove: [],
      }
      state.rounds = []
      state.cards = {
        progress: {
          institution: 0,
          classe: 0,
        },
        performance: {
          institution: 0,
          classe: 0,
        },
        totalTime: {
          institution: 0,
          classe: 0,
        },
        challengesDone: 0,
      }

      state.name = ''
      state.className = ''
      state.serieName = ''
      state.educationSystemName = ''
      state.bookName = ''
      state.serieId = null
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
    bookName(state, payload) {
      state.bookName = payload
    },
    serieId(state, payload) {
      state.serieId = payload
    },
    status(state, payload) {
      state.status = payload
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
    bookName(state) {
      return state.bookName
    },
    serieId(state) {
      return state.serieId
    },
    status(state) {
      return state.status
    },
  },

  actions: {
    fetchDetails({ commit }) {
      return getEducationSystemBookDetails(educationSystemId.value, book.value.id).then(
        ({ data }) => {
          commit('bookName', data.bookName)
          commit('serieId', data.serieId)
          commit('educationSystemName', data.educationSystemName)

          serie.value = {
            id: data.serieId,
            name: data.serieName,
          }
          subject.value = subjects.value.find(({ id }) => id === data.subjectId)
        },
      )
    },
    fetch({ commit }) {
      commit('loading', true)

      getEducationSystemReportInstitutionGuidePlus(educationSystemId.value, {
        GuideId: mission.value.id,
        ClassId: classe.value.id,
      })
        .then(({ data }) => {
          commit('tableStrongWeak', {
            descriptorsStrong: data.topicsStrong,
            descriptorsToImprove: data.topicsToImprove,
          })
          commit(
            'rounds',
            data.rounds.map((round, index) => ({ ...round, id: index })),
          )
          commit('cards', {
            progress: {
              institution: data.progressInstitution,
              classe: data.progressClass,
            },
            performance: {
              institution: data.performanceInstitution,
              classe: data.performanceClass,
            },
            totalTime: {
              institution: data.timeInstitution,
              classe: data.timeClass,
            },
            challengesDone: data.challenges,
          })

          commit('name', data.name)
          commit('className', data.className)
          commit('serieName', data.serieName)
          commit('educationSystemName', data.educationSystemName)
          commit('status', data.status)
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
