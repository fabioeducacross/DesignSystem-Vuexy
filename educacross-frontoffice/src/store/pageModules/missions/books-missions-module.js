import { getGuideBook } from '@/services/teacher-context/guides/Guides.Service'

export default {
  namespaced: true,
  state: {
    selectedEducationSystem: {},
    selectedBook: { name: 'Todos', id: null },
    missions: [],
    loading: true,
    subjectId: null,
    classId: null,
    serieId: null,
  },
  mutations: {
    selectedEducationSystem(state, data) {
      state.selectedEducationSystem = data
    },
    selectedBook(state, data) {
      state.selectedBook = data
    },
    missions(state, data) {
      state.missions = data
    },
    loading(state, data) {
      state.loading = data
    },
    classId(state, data) {
      state.classId = data
    },
    serieId(state, data) {
      state.serieId = data
    },
    subjectId(state, data) {
      state.subjectId = data
    },
  },
  getters: {
    selectedEducationSystem(state) {
      return state.selectedEducationSystem
    },
    selectedBook(state) {
      return state.selectedBook
    },
    missions(state) {
      return state.missions
    },
    loading(state) {
      return state.loading
    },
    classId(state) {
      return state.classId
    },
    serieId(state) {
      return state.serieId
    },
    subjectId(state) {
      return state.subjectId
    },
  },
  actions: {
    async fetchData({ commit, state }) {
      commit('loading', true)

      const response = await getGuideBook({
        classId: state.classId,
        serieId: state.serieId,
        subjectId: state.subjectId,
        educationSystemId: state.selectedEducationSystem ? state.selectedEducationSystem.id : false,
        bookId: state.selectedEducationSystem ? state.selectedBook.id : false,
      })

      const { data } = response

      commit('missions', data)
      commit('loading', false)
    },
  },
}
