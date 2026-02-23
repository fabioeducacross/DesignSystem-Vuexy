import { getManagersV2 } from '@/services/admin-context/directors/Directors.service.js'
import store from '@/store'
import useTable from '@/store/table/useTable'
import { computed, ref } from 'vue'

export function useRecordsManagers() {
  const moduleName = 'useRecordsManagers'
  const refCreateManager = ref(null)

  const { params, loading, totalData, tableRef, dataTable, resetPage, reset } = useTable()

  const selectedData = computed({
    get() {
      return store.getters[`${moduleName}/selectedData`]
    },
    set(val) {
      store.commit(`${moduleName}/selectedData`, val)
    },
  })

  const status = computed({
    get() {
      return store.getters[`${moduleName}/status`]
    },
    set(val) {
      store.commit(`${moduleName}/status`, val)
    },
  })

  const availableLicenses = computed({
    get() {
      return store.getters[`${moduleName}/availableLicenses`]
    },
    set(val) {
      store.commit(`${moduleName}/availableLicenses`, val)
    },
  })

  const totalUsers = computed({
    get() {
      return store.getters[`${moduleName}/totalUsers`]
    },
    set(val) {
      store.commit(`${moduleName}/totalUsers`, val)
    },
  })

  const fetch = async () => {
    loading.value = true
    try {
      const res = await getManagersV2({ ...params.value, Status: status.value.id })

      dataTable.value = res.data.managers.data
      totalData.value = res.data.managers.total
      availableLicenses.value = res.data.availableLicenses
      totalUsers.value = res.data.totalUsers
    } catch (error) {
      dataTable.value = []
      totalData.value = 0
      availableLicenses.value = 0
      totalUsers.value = 0
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

  const openSidebarCreateOrEdit = (managerId = null) => {
    refCreateManager.value.openSidebar(managerId)
  }

  return {
    refCreateManager,
    moduleName,
    status,
    selectedData,
    params,
    loading,
    totalData,
    tableRef,
    dataTable,
    availableLicenses,
    totalUsers,
    fetch,
    resetAndfetch,
    moduleReset,
    openSidebarCreateOrEdit,
  }
}