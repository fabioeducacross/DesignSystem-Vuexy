import { getReadingFluency } from '@/services/shared/reading-expedition/reading-expedition.service.js'

const defaultState = () => {
  return {
    loading: true,
    params: {
      Search: '',
      OrderBy: null,
      Page: 1,
      PageSize: 10,
      Ascending: 'true',
      ClassId: null,
    },

    filter: {
      readingMaterial: null,
      periode: null,
    },
    readingDetail: {
      report: {
        accuracy: {
          correctWords: 0,
          pronuncedWords: 0,
        },
        referenceWords: [],
        transcription: [],
      },
      indicators: {},
    },
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    loading(state, value) {
      state.loading = value
    },
    readingDetail(state, value) {
      state.readingDetail = value
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },
    reset(state) {
      Object.assign(state, defaultState())
    },
  },
  getters: {
    proficiency: state => state.proficiency,
    loading: state => state.loading,
    readingDetail: state => state.readingDetail,
    params: state => state.params,
  },
  actions: {
    async fetchReadingDetails({ commit }) {
      commit('loading', true)

      // const res = await fetchReadingDetails({ testId, studentId })
      const res = await getReadingFluency()

      // const { status, data } = res

      // if (status !== 200) return

      commit('readingDetail', res)
      commit('loading', false)
    },
  },
}
