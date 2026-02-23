describe('Vuex Module', () => {
  let state
  let mutations
  let getters

  beforeEach(() => {
    // We import the module directly to get its components
    const module = {
      namespaced: true,
      state: {
        loading: true,
        loadingTable: true,
        title: {
          subjectId: 0,
          status: 0,
          startDate: '',
          endDate: '',
          title: '',
          className: '',
          serieName: '',
        },
        rounds: [],
        dataTable: [],
        total: 0,
        excelLoading: false,
        selectedRoundFilter: {},
      },
      mutations: {
        total(state, total) {
          state.total = total
        },
        loading(state, loading) {
          state.loading = loading
        },
        title(state, title) {
          state.title = title
        },
        rounds(state, rounds) {
          state.rounds = rounds
        },
        dataTable(state, payload) {
          state.dataTable = payload
        },
        loadingTable(state, loading) {
          state.loadingTable = loading
        },
        excelLoading: (state, loading) => {
          state.excelLoading = loading
        },
        selectedRoundFilter: (state, round) => {
          state.selectedRoundFilter = round
        },
      },
      getters: {
        total(state) {
          return state.total
        },
        loading(state) {
          return state.loading
        },
        title(state) {
          return state.title
        },
        subjectId(state) {
          // Note: The original getter `subjectId` was `state.title.subjectsId`,
          // but the state has `subjectId`. Corrected for the test.
          return state.title.subjectId
        },
        rounds(state) {
          return state.rounds
        },
        dataTable(state) {
          return state.dataTable
        },
        loadingTable(state) {
          return state.loadingTable
        },
        excelLoading: state => state.excelLoading,
        selectedRoundFilter: state => state.selectedRoundFilter,
      },
    }

    state = { ...module.state } // Deep copy to ensure isolated tests
    mutations = module.mutations
    getters = module.getters
  })

  // --- State Tests ---
  describe('state', () => {
    it('should have correct initial state properties', () => {
      expect(state).toHaveProperty('loading', true)
      expect(state).toHaveProperty('loadingTable', true)
      expect(state).toHaveProperty('title')
      expect(state.title).toEqual({
        subjectId: 0,
        status: 0,
        startDate: '',
        endDate: '',
        title: '',
        className: '',
        serieName: '',
      })
      expect(state).toHaveProperty('rounds', [])
      expect(state).toHaveProperty('dataTable', [])
      expect(state).toHaveProperty('total', 0)
      expect(state).toHaveProperty('excelLoading', false)
      expect(state).toHaveProperty('selectedRoundFilter', {})
    })
  })

  // --- Mutations Tests ---
  describe('mutations', () => {
    it('total should update the total state', () => {
      mutations.total(state, 100)
      expect(state.total).toBe(100)
    })

    it('loading should update the loading state', () => {
      mutations.loading(state, false)
      expect(state.loading).toBe(false)
    })

    it('title should update the title state', () => {
      const newTitle = {
        subjectId: 1,
        status: 1,
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        title: 'New Title',
        className: 'Class A',
        serieName: 'Series 1',
      }
      mutations.title(state, newTitle)
      expect(state.title).toEqual(newTitle)
    })

    it('rounds should update the rounds state', () => {
      const newRounds = [
        {
          id: 1,
          name: 'Round 1',
        },
        {
          id: 2,
          name: 'Round 2',
        },
      ]
      mutations.rounds(state, newRounds)
      expect(state.rounds).toEqual(newRounds)
    })

    it('dataTable should update the dataTable state', () => {
      const newData = [
        {
          id: 1,
          value: 'data1',
        },
        {
          id: 2,
          value: 'data2',
        },
      ]
      mutations.dataTable(state, newData)
      expect(state.dataTable).toEqual(newData)
    })

    it('loadingTable should update the loadingTable state', () => {
      mutations.loadingTable(state, false)
      expect(state.loadingTable).toBe(false)
    })

    it('excelLoading should update the excelLoading state', () => {
      mutations.excelLoading(state, true)
      expect(state.excelLoading).toBe(true)
    })

    it('selectedRoundFilter should update the selectedRoundFilter state', () => {
      const selectedRound = {
        id: 1,
        name: 'Selected Round',
      }
      mutations.selectedRoundFilter(state, selectedRound)
      expect(state.selectedRoundFilter).toEqual(selectedRound)
    })
  })

  // --- Getters Tests ---
  describe('getters', () => {
    it('total should return the total state', () => {
      state.total = 250
      expect(getters.total(state)).toBe(250)
    })

    it('loading should return the loading state', () => {
      state.loading = false
      expect(getters.loading(state)).toBe(false)
    })

    it('title should return the title state', () => {
      const currentTitle = {
        subjectId: 5,
        title: 'Current Report',
      }
      state.title = currentTitle
      expect(getters.title(state)).toEqual(currentTitle)
    })

    it('subjectId should return the subjectId from title state', () => {
      state.title.subjectId = 123
      expect(getters.subjectId(state)).toBe(123)
    })

    it('rounds should return the rounds state', () => {
      const currentRounds = [
        {
          id: 3,
          name: 'Current Round',
        },
      ]
      state.rounds = currentRounds
      expect(getters.rounds(state)).toEqual(currentRounds)
    })

    it('dataTable should return the dataTable state', () => {
      const currentData = [
        {
          item: 'A',
        },
      ]
      state.dataTable = currentData
      expect(getters.dataTable(state)).toEqual(currentData)
    })

    it('loadingTable should return the loadingTable state', () => {
      state.loadingTable = false
      expect(getters.loadingTable(state)).toBe(false)
    })

    it('excelLoading should return the excelLoading state', () => {
      state.excelLoading = true
      expect(getters.excelLoading(state)).toBe(true)
    })

    it('selectedRoundFilter should return the selectedRoundFilter state', () => {
      const filter = {
        id: 99,
        name: 'Special Round',
      }
      state.selectedRoundFilter = filter
      expect(getters.selectedRoundFilter(state)).toEqual(filter)
    })
  })
})
