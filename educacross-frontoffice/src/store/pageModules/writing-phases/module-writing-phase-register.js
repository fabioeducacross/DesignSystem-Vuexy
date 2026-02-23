const defaultState = () => {
  return {
    writingPhasesTruth: null,
    writingPhasesWritten: null,
    currentPhaseIndex: 0,
    loading: true,
    analysis: [],
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    writingPhasesTruth(state, writingPhasesTruth) {
      state.writingPhasesTruth = writingPhasesTruth
    },
    writingPhasesWritten(state, writingPhasesWritten) {
      state.writingPhasesWritten = writingPhasesWritten
    },
    currentPhaseIndex(state, currentPhaseIndex) {
      state.currentPhaseIndex = currentPhaseIndex
    },
    loading(state, loading) {
      state.loading = loading
    },
    analysis(state, analysis) {
      state.analysis = analysis
    },
    reset(state) {
      Object.assign(state, defaultState())
    },
  },
  getters: {
    writingPhasesTruth(state) {
      return state.writingPhasesTruth
    },
    writingPhasesWritten(state) {
      return state.writingPhasesWritten
    },
    currentPhaseIndex(state) {
      return state.currentPhaseIndex
    },
    loading(state) {
      return state.loading
    },
    analysis(state) {
      return state.analysis
    },
  },
}
