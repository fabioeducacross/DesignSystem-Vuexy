import { getEducationSystemDashboard } from '@/services/shared/educationSystem/EducationSystem.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { computed } from 'vue'

export function useEducationSystemClasses() {
  const moduleName = 'educationSystemClasses'
  const { resetPage, loading, dataTable } = useTable()
  const { serie, subject, educationSystemId } = useFilters()

  const cards = computed(() => dataTable.value)

  const educationSystemName = computed({
    get: () => store.getters[`${moduleName}/educationSystemName`],
    set: value => store.commit(`${moduleName}/educationSystemName`, value),
  })

  const loadingDashboard = computed({
    get: () => store.getters[`${moduleName}/loadingDashboard`],
    set: value => store.commit(`${moduleName}/loadingDashboard`, value),
  })

  const dashboardData = computed({
    get: () => store.getters[`${moduleName}/dashboardData`],
    set: value => store.commit(`${moduleName}/dashboardData`, value),
  })

  const fetch = () => {
    loading.value = true
    store.dispatch(`${moduleName}/fetch`)
  }

  const fetchDashboard = async () => {
    loadingDashboard.value = true

    try {
      const response = await getEducationSystemDashboard({
        SubjectId: subject.value.id,
        EducationSystemId: educationSystemId.value,
        SerieId: serie.value.id,
      })
      dashboardData.value = response.data || {
        totalGuideProgress: 0,
        sendGuideProgress: 0,
        amountGuideSend: 0,
        totalGuide: 0,
        studentsPlayed: 0,
        performance: 0,
        totalTime: 0,
        challengesDone: 0,
        amountGuidesInProgress: 0,
        inProgressGuideProgress: 0,
      }
    } catch (error) {
      dashboardData.value = {
        totalGuideProgress: 0,
        sendGuideProgress: 0,
        amountGuideSend: 0,
        totalGuide: 0,
        studentsPlayed: 0,
        performance: 0,
        totalTime: 0,
        challengesDone: 0,
        amountGuidesInProgress: 0,
        inProgressGuideProgress: 0,
      }
    } finally {
      loadingDashboard.value = false
    }
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
    loadingDashboard,
    dashboardData,
  }
}
