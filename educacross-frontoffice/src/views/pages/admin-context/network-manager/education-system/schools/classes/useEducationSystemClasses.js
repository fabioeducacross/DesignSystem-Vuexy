import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { useEducationSystemAdminDashboard } from '@/views/pages/admin-context/reports/educationSystem/components/useEducationSystemAdminDashboard'
import { computed } from 'vue'

export function useEducationSystemClasses() {
  const moduleName = 'educationSystemNetworkClasses'
  const { resetPage, loading } = useTable()
  const { serie, subject, educationSystemId, institution } = useFilters()
  const { fetchDashboardData } = useEducationSystemAdminDashboard()

  const cards = computed({
    get: () => store.getters[`${moduleName}/cards`],
    set: value => store.commit(`${moduleName}/cards`, value),
  })

  const educationSystemName = computed({
    get: () => store.getters[`${moduleName}/educationSystemName`],
    set: value => store.commit(`${moduleName}/educationSystemName`, value),
  })

  const institutionName = computed({
    get: () => store.getters[`${moduleName}/institutionName`],
    set: value => store.commit(`${moduleName}/institutionName`, value),
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
      InstitutionId: institution.value?.id,
    })
  }

  const resetAndfetch = () => {
    resetPage()
    fetchDashboard()
    fetch()
  }

  return {
    moduleName,
    cards,
    fetch,
    resetAndfetch,
    educationSystemName,
    institutionName,
  }
}
