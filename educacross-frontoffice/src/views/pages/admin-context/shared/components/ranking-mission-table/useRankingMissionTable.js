import { getMissionRankingV2, getMissionRankingExcelV2 } from '@/services/shared/reports/Report.service'
import { getGuidesPlusInstitutionOverviewClass } from '@/services/teacher-context/guides/Guides.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const MODULE_NAME = 'rankingMissionsModule'

export function useRankingMissionTable() {
  // #region computed

  const total = computed({
    get() {
      return store.getters[`${MODULE_NAME}/total`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/total`, value)
    },
  })

  const loading = computed({
    get() {
      return store.getters[`${MODULE_NAME}/loading`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/loading`, value)
    },
  })

  const title = computed({
    get() {
      return store.getters[`${MODULE_NAME}/title`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/title`, value)
    },
  })

  const dataTable = computed({
    get() {
      return store.getters[`${MODULE_NAME}/dataTable`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/dataTable`, value)
    },
  })

  const rounds = computed({
    get() {
      return store.getters[`${MODULE_NAME}/rounds`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/rounds`, value)
    },
  })

  const loadingTable = computed({
    get() {
      return store.getters[`${MODULE_NAME}/loadingTable`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/loadingTable`, value)
    },
  })

  const excelLoading = computed({
    get() {
      return store.getters[`${MODULE_NAME}/excelLoading`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/excelLoading`, value)
    },
  })

  const serieId = computed({
    get() {
      return store.getters[`${MODULE_NAME}/serieId`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/serieId`, value)
    },
  })

  const countActivities = computed({
    get() {
      return store.getters[`${MODULE_NAME}/countActivities`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/countActivities`, value)
    },
  })

  const countStars = computed({
    get() {
      return store.getters[`${MODULE_NAME}/countStars`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/countStars`, value)
    },
  })

  const { subject } = useFilters()

  const guideName = computed(() => store.getters[`${MODULE_NAME}/guideName`])

  // #endregion computed

  const route = useRoute()
  const { classId, guideId, institutionId } = route.params

  const body = {
    id: guideId,
    classId,
    institutionId,
  }

  // #region methods

  const getRankingData = async () => {
    getMissionRankingV2(body)
      .then(({ data }) => {
        dataTable.value = data.ranking
        countStars.value = data.totalStars
        countActivities.value = data.activities
      })
      .finally(() => {
        loadingTable.value = false
      })
  }

  const exportExcel = async () => {
    excelLoading.value = true
    const { data } = await getMissionRankingExcelV2(body)

    const fileName = sanitizeString(`Relatório missão ${guideName.value}.xlsx`)
    saveAs(data, fileName)

    excelLoading.value = false
  }

  // #endregion methods

  return {
    MODULE_NAME,

    total,
    loading,
    title,
    guideId,
    rounds,
    loadingTable,
    excelLoading,
    serieId,
    dataTable,
    countActivities,
    countStars,

    exportExcel,
    getRankingData,
  }
}