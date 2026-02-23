import { emitter } from '@/eventBus'
import { useRoute } from 'vue-router/composables'
import {
  getMissionsRanking,
  getMissionsRankingExportExcel,
} from '@/services/shared/ranking/Ranking.Service'
import { getGuidePlusReportClass } from '@/services/teacher-context/guides/Guides.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { computed } from 'vue'

const MODULE_NAME = 'rankingMissionsModule'

export function useMissionPlusRanking() {
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
      return store.getters[`${MODULE_NAME}/title`].serieId
    },
    set(value) {
      store.commit(`${MODULE_NAME}/title`, { serieId: value })
    },
  })

  const subjectId = computed(() => store.getters[`${MODULE_NAME}/subjectId`])

  const route = useRoute()
  const guideId = route.params.guideId
  const classId = route.params.classId

  const { classe, subject } = useFilters()

  const getRoundsData = async () => {
    loading.value = true

    const { data } = await getGuidePlusReportClass(guideId, classId)

    serieId.value = data.serieId
    title.value = {
      subjectId: data.subjectId,
      status: data.status,
      startDate: data.startTime,
      endDate: data.expirationTime,
      title: data.name,
      className: classe.value.className,
      serieName: classe.value.SerieName,
    }

    emitter.emit('setBreadcrumb', ['', '', data.className, data.name])

    rounds.value = data.rounds
    loading.value = false
  }

  const getRankingData = async () => {
    const body = {
      SubjectId: subject.value.id,
      ClassIds: classId,
      SerieId: serieId.value,
      GuideId: guideId,
      GuidePlus: true,
    }

    getMissionsRanking(body)
      .then(({ data }) => {
        dataTable.value = data
        total.value = data.length
      })
      .finally(() => {
        loadingTable.value = false
      })
  }

  const exportExcel = async () => {
    const body = {
      SubjectId: subject.value.id,
      ClassIds: classId,
      SerieId: serieId.value,
      GuideId: guideId,
      GuidePlus: true,
    }
    excelLoading.value = true
    const { data } = await getMissionsRankingExportExcel(body)

    const fileName = sanitizeString(`Relatório missão plus ${title.value.title}.xlsx`)
    saveAs(data, fileName)

    excelLoading.value = false
  }

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
    serieId,
    dataTable,

    exportExcel,
    getRoundsData,
    getRankingData,
  }
}