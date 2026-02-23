import { getImportStudentList } from '@/services/admin-context/students/Students.service'
import useTable from '@/store/table/useTable'

export function useImportHistory() {
  const { params, loading, totalData, tableRef, dataTable, resetPage, reset } = useTable()

  const fetch = async () => {
    loading.value = true
    try {
      const res = await getImportStudentList(params.value)

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

  return {
    params,
    loading,
    totalData,
    tableRef,
    dataTable,
    fetch,
    resetAndfetch,
    reset,
  }
}