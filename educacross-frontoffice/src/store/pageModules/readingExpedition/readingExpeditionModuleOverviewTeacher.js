import { getReadingExpedition } from '@/services/shared/reading-expedition/reading-expedition.service.js'
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

export default {
  namespaced: true,
  state: {
    viewMode: 1,
    loading: true,
    data: [],
    total: 0,
    params: defaultParams(),
    enabled: false,
  },
  mutations: {
    loading(state, data) {
      state.loading = data
    },
    data(state, data) {
      state.data = data
    },
    total(state, data) {
      state.total = data
    },
    enabled(state, data) {
      state.enabled = data
    },
    viewMode(state, data) {
      state.viewMode = data
    },
    params(state, params) {
      state.params = params
    },

    reset(state) {
      state.data = []
      state.total = 0
      state.params = defaultParams()
      state.loading = true
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    data(state) {
      if (state.viewMode === 1) {
        return state.data.map(item => {
          const columns = {}
          item.stages.forEach((stage, index) => {
            columns[stage.name.replace(/\s/g, '_')] = { status: stage.status, stage: stage.stage }
            if (stage.status === 0 && item.stages[index - 1]?.status === 4) {
              columns[stage.name.replace(/\s/g, '_')].canBeUnlocked = true
            }
          })
          return {
            ...item,
            ...columns,
          }
        })
      }
      if (state.viewMode === 2) {
        return state.data.map(item => {
          const columns = {}
          item.performance.forEach(performance => {
            columns[performance.name.replace(/\s/g, '_')] = performance
          })
          return {
            ...item,
            ...columns,
          }
        })
      }
      return state.data
    },
    total(state) {
      return state.total
    },
    enabled(state) {
      return state.enabled
    },
    viewMode(state) {
      return state.viewMode
    },
    search(state) {
      return state.params.Search
    },
    tableColumns(state) {
      const columns = []
      try {
        if (state.data[0]) {
          if (state.viewMode === 1) {
            state.data[0].stages.forEach(item => {
              columns.push({
                key: `${item.name.replace(/\s/g, '_')}`,
                label: item.name,
                sortable: false,
                searchable: false,
                class: 'position-relative',
                tdClass: 'py-0',
                labelClass: 'justify-content-center text-center',
              })
            })
          }
          if (state.viewMode === 2) {
            state.data[0].performance.forEach(item => {
              columns.push({
                key: `${item.name.replace(/\s/g, '_')}`,
                label: item.name,
                sortable: false,
                searchable: false,
                class: 'position-relative',
                tdClass: 'py-0',
                labelClass: 'justify-content-center text-center',
              })
            })
          }
        }
      } catch (error) {
        return [
          {
            key: 'studentName',
            label: 'Aluno',
            sortable: true,
            searchable: true,
          },
        ]
      }

      return [
        {
          key: 'studentName',
          label: 'Aluno',
          sortable: true,
          searchable: true,
        },
        ...columns,
      ]
    },
  },
  actions: {
    async fetch({ commit, state }) {
      commit('loading', true)
      const { classe } = useFilters()

      getReadingExpedition({
        ClassId: classe.value.ClassId,
        Filter: state.viewMode,
        ...state.params,
      })
        .then(response => {
          commit('data', response.data.students.data)
          commit('total', response.data.students.total)
          commit('enabled', response.data.enabled)
        })
        .catch(() => {
          commit('data', [])
          commit('total', 0)
          commit('enabled', false)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
  },
}
