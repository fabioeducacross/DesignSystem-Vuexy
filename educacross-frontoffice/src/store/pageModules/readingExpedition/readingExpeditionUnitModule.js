import { getReadingUnitsResults } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import useFilters from '@/store/filters/useFilters'

const { classe } = useFilters()

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
    data: [],
    total: 0,
    loading: true,
    params: defaultParams(),
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    data(state, payload) {
      state.data = payload
    },

    total(state, payload) {
      state.total = payload
    },
    params(state, params) {
      state.params = params
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    data(state) {
      return state.data.map(item => {
        const columns = {}
        let enable = false
        item.performance.forEach(performance => {
          columns[performance.name.replace(/\s/g, '_')] = performance
          if (performance.level !== 0) {
            enable = true
          }
        })
        return {
          ...item,
          ...columns,
          enable,
        }
      })
    },
    total(state) {
      return state.total
    },
    search(state) {
      return state.params.Search
    },
    tableColumns(state) {
      const columns = []
      try {
        if (state.data[0]) {
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
      } catch (error) {
        return [
          {
            key: 'studentName',
            label: 'Aluno',
            sortable: true,
            searchable: true,
          },
          {
            key: 'actions',
            label: 'Ações',
            thStyle: { width: '120px' },
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
        {
          key: 'actions',
          label: 'Ações',
          thStyle: { width: '120px' },
        },
      ]
    },
  },
  actions: {
    async fetch({ commit, state, rootGetters }) {
      commit('loading', true)
      const unitId = rootGetters['ReadingExpeditionModule/unitId']
      if (!unitId) return

      const { data } = await getReadingUnitsResults({
        ClassId: classe.value.ClassId,
        Stage: unitId,
        ...state.params,
      })

      commit('data', data.data)
      commit('total', data.total)

      commit('loading', false)
    },

    reset({ commit }) {
      commit('data', [])
      commit('total', 0)
      commit('loading', true)
    },
  },
}
