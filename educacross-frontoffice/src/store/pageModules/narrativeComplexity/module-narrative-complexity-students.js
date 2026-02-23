import { ENarrativeComplexityApply } from '@/consts/narrativeComplexity.js'
import { getNarrativeComplexityStudents } from '@/services/shared/narrativeComplexity/narrativeComplexity.service.js'
import useFilters from '@/store/filters/useFilters'

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

const { classe } = useFilters()

export default {
  namespaced: true,
  state: {
    loading: true,
    loadingCards: true,
    cards: [],
    data: [],
    total: 0,
    params: defaultParams(),
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },

    loadingCards(state, payload) {
      state.loadingCards = payload
    },
    data(state, payload) {
      state.data = payload
    },

    total(state, payload) {
      state.total = payload
    },

    cards(state, payload) {
      state.cards = payload || {}
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },

    reset(state) {
      state.params = defaultParams()
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },

    loadingCards(state) {
      return state.loadingCards
    },
    data(state) {
      return state.data.map(student => {
        const mappedApplications = Object.keys(ENarrativeComplexityApply).reduce((acc, key) => {
          const applyValue = ENarrativeComplexityApply[key]
          const application = student.applications.find(app => app.apply === applyValue)

          if (application) {
            acc[key] = application
          }

          return acc
        }, {})

        return {
          id: student.id,
          name: student.name,
          ...mappedApplications,
        }
      })
    },
    cards(state) {
      return state.cards
    },
    total(state) {
      return state.total
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
    fetch({ commit, state }) {
      commit('loading', true)

      getNarrativeComplexityStudents(classe.value.ClassId, {
        ...state.params,
      })
        .then(({ data }) => {
          commit('data', data.students.data)
          commit('total', data.students.total)
          commit('cards', data.report)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
  },
}
