import { getTeacherExcluded } from '@/services/admin-context/professor/Professor.service'
import store from '@/store'
import useTable from '@/store/table/useTable'
import { computed, ref } from 'vue'

const moduleName = 'useRecordsTeachersTrash'

const { params, loading, totalData, tableRef, dataTable, resetPage, reset } = useTable()

export function useRecordsTeachers() {
  const status = ref(null)

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
      const res = await getTeacherExcluded({
        ...params.value,
      })
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
    status,
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