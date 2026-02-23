import { getDirectorsExcluded } from '@/services/admin-context/directors/Directors.service.js'
import store from '@/store'
import useTable from '@/store/table/useTable'
import { computed } from 'vue'

const moduleName = 'useRecordsManagersTrash'

export function useRecordsManagers() {
  const { params, loading, totalData, tableRef, dataTable, resetPage, reset } = useTable()

  const selectedData = computed({
    get() {
      return store.getters[`${moduleName}/selectedData`]
    },
    set(val) {
      store.commit(`${moduleName}/selectedData`, val)
    },
  })

  const fetch = async () => {
    loading.value = true
    try {
      const res = await getDirectorsExcluded({ ...params.value })
      dataTable.value = res.data.data
      totalData.value = res.data.total
    } catch (error) {
      dataTable.value = []
      totalData.value = 0
    }
    loading.value = false
  }

  const resetAndfetch = () => {
    resetPage()
    fetch()
  }

  const moduleReset = () => {
    store.commit(`${moduleName}/reset`)
    reset()
  }

  return {
    moduleName,
    selectedData,
    params,
    loading,
    totalData,
    tableRef,
    dataTable,
    fetch,
    resetAndfetch,
    moduleReset,
  }
}