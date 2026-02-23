import { useRoute, useRouter } from 'vue-router/composables'
import {
  getGuidePlusReportClassRounds,
  getGuidePlusReportClassStudents,
  getGuidePlusReportClassStudentsExcel,
} from '@/services/teacher-context/guides/Guides.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { computed, toRef } from 'vue'

const MODULE_NAME = 'ReportMissionPlusStudents'

export function useMissionPlusReportStudents() {
  const { classe } = useFilters()
  const route = useRoute()
  const guideId = toRef(route.params, 'guideId')

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

  const params = computed({
    get() {
      return store.getters[`${MODULE_NAME}/params`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/params`, value)
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

  const students = computed({
    get() {
      return store.getters[`${MODULE_NAME}/students`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/students`, value)
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

  const selectedRoundFilter = computed({
    get() {
      return store.getters[`${MODULE_NAME}/selectedRoundFilter`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/selectedRoundFilter`, value)
    },
  })

  const subjectId = computed(() => store.getters[`${MODULE_NAME}/subjectId`])
  // #endregion computed

  // #region methods
  const getStudentsData = async () => {
    loadingTable.value = true

    const { data } = await getGuidePlusReportClassStudents(guideId.value, classe.value.ClassId, {
      ...params.value,
      GuideRoundId: selectedRoundFilter.value.guideRoundId,
    })

    students.value = data

    loadingTable.value = false
  }

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

  const exportExcel = async () => {
    excelLoading.value = true
    const { data } = await getGuidePlusReportClassStudentsExcel(
      guideId.value,
      classe.value.ClassId,
      { search: params.value.Search, GuideRoundId: selectedRoundFilter.value.guideRoundId },
    )

    const fileName = sanitizeString(`Relatório missão plus ${title.value.className}.xlsx`)
    saveAs(data, fileName)

    excelLoading.value = false
  }

  // #endregion methods

  const selectRound = round => {
    if (isSelectedRound(round)) {
      selectedRoundFilter.value = {}
    } else {
      selectedRoundFilter.value = round
    }

    getStudentsData()
  }

  const isSelectedRound = round => {
    return round.guideRoundId === selectedRoundFilter.value.guideRoundId
  }

  return {
    MODULE_NAME,

    total,
    loading,
    title,
    params,
    subjectId,
    guideId,
    rounds,
    students,
    loadingTable,
    excelLoading,
    selectedRoundFilter,

    exportExcel,
    getStudentsData,
    getRoundsData,
    selectRound,
    isSelectedRound,
  }
}