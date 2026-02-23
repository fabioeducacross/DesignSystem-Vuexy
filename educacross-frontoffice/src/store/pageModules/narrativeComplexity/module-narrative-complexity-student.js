import Vue from 'vue'

const defaultState = () => {
  return {
    loading: true,
    applicationSelectedIndex: 0,
    details: {
      name: '',
      applications: [
        {
          name: '',
          apply: null,
          createdAt: '',
          percentilComplexity: 0,
          complexity: null,
          percentilDecoding: 0,
          decoding: null,
          percentilComprehension: 0,
          comprehension: null,
          blocked: true,
          enabled: true,
          paused: true,
          finished: true,
          error: false,
          recording: {
            imageUrl: '',
            audioUrl: '',
            transcription: '',
          },
        },
      ],
    },
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    details(state, payload) {
      Vue.set(state, 'details', payload)
    },
    applicationSelectedIndex(state, payload) {
      state.applicationSelectedIndex = payload
    },
    reset(state) {
      Object.assign(state, defaultState())
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    details(state) {
      return state.details
    },
    applicationSelectedIndex(state) {
      return state.applicationSelectedIndex
    },
  },
}
