import store from '@/store'
import { computed } from 'vue'

const moduleName = 'table'
export default function useTable() {
  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: value => store.commit(`${moduleName}/loading`, value),
  })

  const dataTable = computed({
    get: () => store.getters[`${moduleName}/data`],
    set: val => {
      store.commit(`${moduleName}/data`, val)
    },
  })

  const totalData = computed({
    get: () => store.getters[`${moduleName}/totalData`],
    set: val => {
      store.commit(`${moduleName}/totalData`, val)
    },
  })

  const tableRef = computed({
    get: () => store.getters[`${moduleName}/tableRef`],
    set: val => {
      store.commit(`${moduleName}/tableRef`, val)
    },
  })

  const params = computed({
    get: () => store.getters[`${moduleName}/params`],
    set: ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
      store.commit(`${moduleName}/params`, {
        Search: searchQuery,
        OrderBy: sortBy,
        Ascending: `${!isSortDirDesc}`,
        Page: currentPage,
        PageSize: perPage,
      })
    },
  })

  const resetPage = () => {
    store.commit('table/params', {
      Page: 1,
    })
    if (tableRef.value) tableRef.value.resetPage()
  }

  const reset = () => {
    store.commit('table/reset')
  }

  return {
    tableRef,
    loading,
    params,
    dataTable,
    totalData,
    resetPage,
    reset,
  }
}
