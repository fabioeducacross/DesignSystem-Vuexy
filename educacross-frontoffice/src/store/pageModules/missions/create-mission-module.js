const defaultState = () => {
  const today = new Date()
  // reset hour
  today.setHours(0, 0, 0, 0)

  return {
    missionInfo: {
      name: '',
      start: today,
      end: new Date(new Date().setDate(today.getDate() + 7)),
      flux: null,
      classe: [],
      students: [],
      rankingEnabled: false,
      application: 1,
      messageToStudent: null,
    },
    selectedItems: [],
    itemsFilters: {
      serie: {},
      matrix: {},
      knowledgeObject: {},
      theme: {},
      ability: [],
      query: '',
    },
    filtersItems: {
      series: [],
      classes: [],
      students: [],
      matrices: [],
      knowledgeObjects: [],
      themes: [],
      abilities: [],
    },
    gamesTab: {
      games: [],
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      total: 0,
      loading: true,
    },
    questionsTab: {
      questions: [],
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      total: 0,
      loading: true,
    },
    activeTab: 0,
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    missionInfo(state, missionInfo) {
      state.missionInfo = missionInfo
    },
    selectedItems(state, selectedItems) {
      state.selectedItems = selectedItems
    },
    itemsFilters(state, itemsFilters) {
      state.itemsFilters = itemsFilters
    },
    filtersItems(state, filtersItems) {
      state.filtersItems = filtersItems
    },
    gamesTab(state, gamesTab) {
      state.gamesTab = gamesTab
    },
    questionsTab(state, questionsTab) {
      state.questionsTab = questionsTab
    },
    resetStore(state) {
      Object.assign(state, defaultState())
    },
    activeTab(state, activeTab) {
      state.activeTab = activeTab
    },
  },
  getters: {
    missionInfo: state => state.missionInfo,
    selectedItems: state => state.selectedItems,
    itemsFilters: state => state.itemsFilters,
    filtersItems: state => state.filtersItems,
    gamesTab: state => state.gamesTab,
    questionsTab: state => state.questionsTab,
    activeTab: state => state.activeTab,
  },
}
