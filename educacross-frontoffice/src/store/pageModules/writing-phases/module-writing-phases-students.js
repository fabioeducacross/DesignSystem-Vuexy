import { getWritingStagesClass } from '@/services/shared/writing-stages/writing-stages.Service.js'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'

const { classe } = useFilters()
const { loading, dataTable, totalData, params } = useTable()

export default {
  namespaced: true,
  state: {
    cards: [],
  },
  mutations: {
    cards(state, payload) {
      state.cards = payload || {}
    },
  },
  getters: {
    data(state) {
      return dataTable.value.map(student => {
        const mappedApplications = state.cards.reduce((acc, item) => {
          const applyValue = item.apply
          const applicationIndex = student.applications.findIndex(app => app.apply === applyValue)

          acc[`apply-${student.applications[applicationIndex].apply}`] = false

          if (student.applications[applicationIndex] && item.enabled) {
            acc[`apply-${student.applications[applicationIndex].apply}`] =
              student.applications[applicationIndex]
            if (student.applications[applicationIndex].writingStages) {
              student.applications[applicationIndex].enabled = true
              acc.enabled = true
            }
          }

          return acc
        }, {})

        return {
          id: student.id,
          name: student.name,
          applications: student.applications,
          ...mappedApplications,
        }
      })
    },
    cards(state) {
      return state.cards
    },
    onlyApplyEnabled(state) {
      return state.cards.some(card => card.enabled)
    },
    className(state) {
      return state.cards[0] ? state.cards[0].className : null
    },
    serieName(state) {
      return state.cards[0] ? state.cards[0].serieName : null
    },
  },
  actions: {
    fetch({ commit }) {
      loading.value = true

      getWritingStagesClass(classe.value.ClassId, {
        ...params.value,
      })
        .then(({ data }) => {
          dataTable.value = data.students.data
          totalData.value = data.students.total

          commit('cards', data.report)
        })
        .finally(() => {
          loading.value = false
        })
    },
  },
}
