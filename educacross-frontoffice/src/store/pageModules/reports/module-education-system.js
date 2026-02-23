const initialState = {
  book: { name: 'Todos', id: null },
  mission: { name: 'Todas', id: null },
  year: { name: 'Todos', id: null },
  tabTitle: null,
}

const moduleEducationSystem = {
  namespaced: true,
  state: initialState,
  mutations: {
    setBook(state, book) {
      state.book = book
      state.mission = { name: 'Todas', id: null }
    },
    setMission(state, mission) {
      state.mission = mission
    },
    setYear(state, year) {
      state.year = year
    },
    reset(state) {
      Object.assign(state, initialState)
    },
    setTabTitle(state, tabTitle) {
      state.tabTitle = tabTitle
    },
  },
  getters: {
    book: state => state.book,
    mission: state => state.mission,
    year: state => state.year,
    tabTitle: state => state.tabTitle,
  },
}

export default moduleEducationSystem
