import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { useEducationSystemAdminDashboard } from '@/views/pages/admin-context/reports/educationSystem/components/useEducationSystemAdminDashboard'
import { computed, ref } from 'vue'

const moduleName = 'educationSystemNetworkInstitutions'
const networkGroupDefault = { id: null, name: 'Todos os grupos de escolas' }

export function useEducationSystemInstitutions() {
  const { resetPage, loading } = useTable()
  const { serie, subject, educationSystemId, networkGroup } = useFilters()
  const { fetchDashboardData } = useEducationSystemAdminDashboard()

  const networkGroups = ref([])
  const networkLoading = ref(true)

  const cards = computed({
    get: () => store.getters[`${moduleName}/cards`],
    set: value => store.commit(`${moduleName}/cards`, value),
  })

  const educationSystemName = computed({
    get: () => store.getters[`${moduleName}/educationSystemName`],
    set: value => store.commit(`${moduleName}/educationSystemName`, value),
  })

  const groups = computed({
    get() {
      return store.getters[`${moduleName}/groups`]
    },
    set(value) {
      store.commit(`${moduleName}/groups`, value)
    },
  })

  const fetch = () => {
    loading.value = true
    store.dispatch(`${moduleName}/fetch`)
  }

  const fetchDashboard = () => {
    fetchDashboardData({
      SubjectId: subject.value.id,
      EducationSystemId: educationSystemId.value,
      SerieId: serie.value.id,
      NetworkGroupId: networkGroup.value.id,
    })
  }

  const resetAndfetch = () => {
    resetPage()
    fetchDashboard()
    fetch()
  }

  const fetchNetworkGroups = () => {
    networkLoading.value = true
    return getNetworkGroups()
      .then(response => {
        networkGroups.value = response.data
        groups.value = response.data
      })
      .finally(() => {
        networkGroups.value.unshift(networkGroupDefault)
        networkLoading.value = false
      })
  }

  return {
    moduleName,
    cards,
    fetch,
    resetAndfetch,
    educationSystemName,
    groups,
    networkGroups,
    networkLoading,
    fetchNetworkGroups,
  }
}
