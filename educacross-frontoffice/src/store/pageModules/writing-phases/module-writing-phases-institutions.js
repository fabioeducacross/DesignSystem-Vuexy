export default {
  namespaced: true,
  state: {
    loadingCards: true,
    applyId: null,
    cards: [],
  },
  mutations: {
    loadingCards(state, payload) {
      state.loadingCards = payload
    },
    applyId(state, payload) {
      state.applyId = payload
    },
    cards(state, payload) {
      state.cards = payload || {}
    },
  },
  getters: {
    loadingCards(state) {
      return state.loadingCards
    },

    applyId(state) {
      return state.applyId
    },

    cards(state) {
      return state.cards
    },
  },
}
