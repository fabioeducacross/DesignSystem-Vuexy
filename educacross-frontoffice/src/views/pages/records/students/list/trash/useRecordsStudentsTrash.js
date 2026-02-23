import { getStudentsExcluded } from '@/services/admin-context/students/Students.service.js'
import store from '@/store'
import useFilter from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable'
import { computed } from 'vue'

export function useRecordsStudentsTrash() {
  const moduleName = 'useRecordsStudentsTrash'

  const { serie, classe } = useFilter()

  const { params, loading, totalData, tableRef, dataTable, resetPage, reset } = useTable()

  const selectedData = computed({
    get() {
      return store.getters[`${moduleName}/selectedStudents`]
    },
    set(val) {
      store.commit(
        `${moduleName}/selectedStudents`,
        val || {
          value: [],
          batchAction: 1,
        },
      )
    },
  })

  const fetch = async () => {
    loading.value = true
    try {
      const res = await getStudentsExcluded({
        ...params.value,
        SerieId: serie.value.id,
        ClassId: classe.value.id,
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
    selectedData,
    params,
    loading,
    totalData,
    tableRef,
    dataTable,
    serie,
    classe,
    fetch,
    resetAndfetch,
    moduleReset,
  }
}