import { getEducationSystemDashboard } from '@/services/shared/educationSystem/EducationSystem.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { computed } from 'vue'

export function useEducationSystemStudents() {
  const moduleName = 'educationSystemClassStudents'
  const { resetPage, loading, dataTable } = useTable()
  const { classe, serie, subject, educationSystemId, book, mission } = useFilters()

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

  const totalStudents = computed({
    get: () => store.getters[`${moduleName}/totalStudents`],
    set: value => store.commit(`${moduleName}/totalStudents`, value),
  })

  const teachersNames = computed({
    get: () => store.getters[`${moduleName}/teachersNames`],
    set: value => store.commit(`${moduleName}/teachersNames`, value),
  })

  const fetch = () => {
    loading.value = true
    store.dispatch(`${moduleName}/fetch`)
  }

  const resetAndfetch = () => {
    resetPage()
    fetch()
  }

  const fetchDashboard = async () => {
    loadingDashboard.value = true

    try {
      const response = await getEducationSystemDashboard({
        SubjectId: subject.value.id,
        EducationSystemId: educationSystemId.value,
        SerieId: serie.value.id,
        ClassId: classe.value.id,
        BookId: book.value.id,
        GuideId: mission.value.id,
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

  return {
    moduleName,
    cards,
    fetch,
    resetAndfetch,
    educationSystemName,
    fetchDashboard,
    totalStudents,
    teachersNames,
    loadingDashboard,
    dashboardData,
  }
}
