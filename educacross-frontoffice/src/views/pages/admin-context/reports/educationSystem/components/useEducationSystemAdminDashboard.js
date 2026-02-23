import { getEducationSystemDashboard } from '@/services/shared/educationSystem/EducationSystem.Service'
import { ref } from 'vue'

export function useEducationSystemAdminDashboard() {
  const dashboardDataDefault = {
    totalGuideProgress: 0,
    sendGuideProgress: 0,
    amountGuideSend: 0,
    totalGuide: 0,
    studentsPlayed: 0,
    performance: 0,
    totalTime: 0,
    challengesDone: 0,
  }

  const dashboardData = ref(dashboardDataDefault)
  const loadingDashboard = ref(true)

  /**
   * @param {GetEducationSystemDashboardParams} params
   * @returns {Promise<void>}
   */
  const fetchDashboardData = async params => {
    loadingDashboard.value = true

    try {
      const response = await getEducationSystemDashboard(params)
      dashboardData.value = response.data || dashboardDataDefault
    } catch (error) {
      dashboardData.value = dashboardDataDefault
    } finally {
      loadingDashboard.value = false
    }
  }

  return {
    dashboardData,
    loadingDashboard,
    fetchDashboardData,
  }
}

export default function useEducationSystemAdminDashboardDefault() {
  return useEducationSystemAdminDashboard()
}