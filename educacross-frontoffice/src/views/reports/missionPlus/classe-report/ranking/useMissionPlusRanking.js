import { useRoute, useRouter } from 'vue-router/composables'
import {
  getMissionsRanking,
  getMissionsRankingExportExcel,
} from '@/services/shared/ranking/Ranking.Service'
import { getGuidePlusReportClassRounds } from '@/services/teacher-context/guides/Guides.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { computed, toRef } from 'vue'

const MODULE_NAME = 'rankingMissionsModule'

export function useMissionPlusRanking() {
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

  const subjectId = computed(() => store.getters[`${MODULE_NAME}/subjectId`])
  // #endregion computed

  const route = useRoute()
  const guideId = toRef(route.params, 'guideId')

  const { classe, subject } = useFilters()

  const body = {
    SubjectId: subject.value.id,
    ClassIds: classe.value.ClassId,
    SerieId: classe.value.SerieId,
  }

  // #region methods

  const getRoundsData = async () => {
    loading.value = true
    const { data } = await getGuidePlusReportClassRounds(guideId.value, classe.value.ClassId)

    title.value = {
      subjectId: data.subjectId,
      status: data.status,
      startDate: data.startTime,
      endDate: data.expirationTime,
      title: data.name,
      className: classe.value.Name,
      serieName: classe.value.SerieName,
    }

    rounds.value = data.rounds
    loading.value = false
  }

  const getRankingData = async () => {
    getMissionsRanking(body)
      .then(({ data }) => {
        dataTable.value = data
      })
      .finally(() => {
        loadingTable.value = false
      })
  }

  const exportExcel = async () => {
    excelLoading.value = true
    const { data } = await getMissionsRankingExportExcel(body)

    const fileName = sanitizeString(`Relatório missão plus ${title.value.className}.xlsx`)
    saveAs(data, fileName)

    excelLoading.value = false
  }

  // #endregion methods

  return {
    MODULE_NAME,

    total,
    loading,
    title,
    subjectId,
    guideId,
    rounds,
    loadingTable,
    excelLoading,
    dataTable,

    exportExcel,
    getRoundsData,
    getRankingData,
  }
}