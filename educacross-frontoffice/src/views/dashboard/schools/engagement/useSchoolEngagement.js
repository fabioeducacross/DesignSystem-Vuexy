import {
  getNetworkManagerAccessDashboard,
  getNetworkManagerAccessInstitutions,
} from '@/services/shared/reports/Report.service'
import store from '@/store'
import { computed } from 'vue'

/**
 * @readonly
 * @type {'moduleDashboardSchoolsEngagement'}
 */
const module_name = 'moduleDashboardSchoolsEngagement'

export function useSchoolEngagement() {
  const networkGroup = computed({
    get: () => store.getters[`${module_name}/networkGroup`],
    set: value => store.commit(`${module_name}/networkGroup`, value),
  })

  const month = computed({
    get: () => store.getters[`${module_name}/month`],
    set: value => store.commit(`${module_name}/month`, value),
  })

  const loading = computed({
    get: () => store.getters[`${module_name}/loading`],
    set: value => store.commit(`${module_name}/loading`, value),
  })

  const loadingDashboard = computed({
    get: () => store.getters[`${module_name}/loadingDashboard`],
    set: value => store.commit(`${module_name}/loadingDashboard`, value),
  })

  const dashboard = computed({
    get: () => store.getters[`${module_name}/dashboard`],
    set: value => store.commit(`${module_name}/dashboard`, value),
  })

  const params = computed({
    get: () => store.getters[`${module_name}/params`],
    set: value => store.commit(`${module_name}/params`, value),
  })

  const dataTable = computed({
    get: () => store.getters[`${module_name}/dataTable`],
    set: value => store.commit(`${module_name}/dataTable`, value),
  })

  const totalData = computed({
    get: () => store.getters[`${module_name}/totalData`],
    set: value => store.commit(`${module_name}/totalData`, value),
  })

  const schoolYear = computed({
    get: () => store.getters[`${module_name}/schoolYear`],
    set: value => store.commit(`${module_name}/schoolYear`, value),
  })

  const resetState = () => store.commit(`${module_name}/reset`)

  const fetchDashboardData = async () => {
    loadingDashboard.value = true

    const NetworkGroupsIds = networkGroup.value.map(i => i.id)

    try {
      const { data } = await getNetworkManagerAccessDashboard({
        NetworkGroupsIds,
        SerieId: schoolYear.value.id,
        month: month.value.id,
      })

      dashboard.value = data
    } finally {
      loadingDashboard.value = false
    }
  }

  const fetchListData = async () => {
    loading.value = true

    const NetworkGroupsIds = networkGroup.value.map(i => i.id)
    const schoolYearId = schoolYear.value.id

    try {
      const { data } = await getNetworkManagerAccessInstitutions({
        NetworkGroupsIds,
        SerieId: schoolYearId,
        Month: month.value.id,
        ...params.value,
      })

      dataTable.value = data.data
      totalData.value = data.total
    } finally {
      loading.value = false
    }
  }

  const fetchPageInfo = async () => {
    await Promise.all([fetchDashboardData(), fetchListData()])

    loading.value = false
    loadingDashboard.value = false
  }

  return {
    module_name,

    networkGroup,
    month,
    loading,
    loadingDashboard,
    dashboard,
    params,
    dataTable,
    totalData,
    schoolYear,

    resetState,
    fetchPageInfo,
    fetchListData,
  }
}