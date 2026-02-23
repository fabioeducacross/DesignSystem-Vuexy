import {
  getReadingExpeditionStudents,
  getReadingExpeditionStudentsDashboard,
} from '@/services/shared/reading-expedition/reading-expedition.service.js'
import useFilters from '@/store/filters/useFilters'
import { calcPercent } from '@/utils/number.js'

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
    loadingDashboard: true,
    dashboard: [],
    selectedStage: null,
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

    dashboard(state, data) {
      state.dashboard = data
    },

    loadingDashboard(state, data) {
      state.loadingDashboard = data
    },

    selectedStage(state, data) {
      state.selectedStage = data
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
    data(state, getters) {
      if (state.viewMode === 1) {
        return state.data.map(item => {
          const columns = {}

          item.stages.forEach((stage, index) => {
            if (stage && stage.name) {
              columns[stage.name.replace(/\s/g, '_')] = stage // { status: stage.status, stage: stage.stage }
              if (stage.status === 0 && item.stages[index - 1]?.status === 4) {
                columns[stage.name.replace(/\s/g, '_')].canBeUnlocked = true
              }
            }
          })

          const dataColumns = {}

          getters.tableColumns.forEach(column => {
            if (column.key === 'studentName') return

            dataColumns[column.key] = columns[column.key] || null
          })

          return {
            ...item,
            ...dataColumns,
          }
        })
      }
      if (state.viewMode === 2) {
        return state.data.map(item => {
          const columns = {}
          item.performance.forEach(performance => {
            if (performance && performance?.name) {
              columns[performance.name.replace(/\s/g, '_')] = performance
            }
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

    dashboard(state) {
      return state.dashboard
    },

    loadingDashboard(state) {
      return state.loadingDashboard
    },

    selectedStage(state) {
      return state.selectedStage
    },
    tableColumns(state) {
      let columns = []
      try {
        if (state.data[0]) {
          const uniqueColumns = []
          if (state.viewMode === 1) {
            uniqueColumns.push(
              ...new Set(state.data.flatMap(student => student.stages.map(stage => stage.name))),
            )
          }
          if (state.viewMode === 2) {
            uniqueColumns.push(
              ...new Set(state.data.flatMap(student => student.performance.map(item => item.name))),
            )
          }
          columns = uniqueColumns.map(name => ({
            key: `${name.replace(/\s/g, '_')}`,
            label: name,
            sortable: false,
            searchable: false,
            class: 'position-relative',
            tdClass: 'py-0',
            labelClass: 'justify-content-center text-center',
          }))
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
    async fetchDashboard({ commit, state }) {
      commit('loadingDashboard', true)
      commit('loading', true)

      const { classe, serie } = useFilters()

      return new Promise(resolve => {
        if (!serie.value || !serie.value.id) {
          commit('dashboard', [])
          commit('loadingDashboard', false)
          resolve()
          return
        }

        getReadingExpeditionStudentsDashboard({
          SerieId: serie.value.id,
          ClassId: classe.value.id,
          Filter: state.viewMode,
        })
          .then(response => {
            const data = response.data.map(item => {
              return {
                ...item,
                percent: calcPercent(item.students, item.totalStudents),
              }
            })
            commit('dashboard', data)
            commit('selectedStage', null)

            /*  if (data.length) {
              const selectedStage = data.reduce((max, item) => {
                return item.percent > max.percent ? item : max
              }, data[0])
              commit('selectedStage', selectedStage)
            } else {
              commit('selectedStage', null)
            } */
          })
          .catch(() => {
            commit('dashboard', {})
            commit('selectedStage', null)
          })
          .finally(() => {
            commit('loadingDashboard', false)
            resolve()
          })
      })
    },

    async fetch({ commit, state }) {
      commit('loading', true)
      const { classe, serie } = useFilters()

      if (!serie.value || !serie.value.id) {
        commit('data', [])
        commit('loading', false)
        return
      }

      getReadingExpeditionStudents({
        SerieId: serie.value.id,
        ClassId: classe.value.id,
        Filter: state.viewMode,
        Stage: state.viewMode === 1 ? state.selectedStage?.stage : null,
        ...state.params,
      })
        .then(response => {
          commit('data', response.data.data)
          commit('total', response.data.total)
        })
        .catch(() => {
          commit('data', [])
          commit('total', 0)
        })
        .finally(() => {
          commit('loading', false)
        })
    },
  },
}
