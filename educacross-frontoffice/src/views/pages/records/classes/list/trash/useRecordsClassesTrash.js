import { getClassesExcluded } from '@/services/shared/classes/Classes.service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import useFilter from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable'
import { computed, ref } from 'vue'

export function useRecordsClassesTrash() {
  const moduleName = 'useRecordsClassesTrash'

  const { serie } = useFilter()

  const { params, loading, totalData, tableRef, dataTable, resetPage, reset } = useTable()

  const selectedData = computed({
    get() {
      return store.getters[`${moduleName}/selectedData`]
    },
    set(val) {
      store.commit(
        `${moduleName}/selectedData`,
        val || {
          value: [],
          batchAction: 1,
        },
      )
    },
  })

  const schoolYears = computed({
    get() {
      return store.getters[`${moduleName}/schoolYears`]
    },
    set(val) {
      store.commit(`${moduleName}/schoolYears`, val)
    },
  })

  const schoolYearsLoading = computed({
    get() {
      return store.getters[`${moduleName}/schoolYearsLoading`]
    },
    set(val) {
      store.commit(`${moduleName}/schoolYearsLoading`, val)
    },
  })

  const fetchSeries = () => {
    getSeries()
      .then(response => {
        schoolYears.value = response.data.data
      })
      .finally(() => {
        schoolYears.value.unshift({ id: null, name: 'Todos os anos' })
        schoolYearsLoading.value = false
      })
  }

  const fetch = async () => {
    loading.value = true
    try {
      const res = await getClassesExcluded({
        ...params.value,
        serieIds: serie.value.id,
        ClassName: params.value.Search,
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
    fetch,
    resetAndfetch,
    schoolYears,
    schoolYearsLoading,
    fetchSeries,
    moduleReset,
  }
}