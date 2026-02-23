import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import {
  getMissionsRanking,
  getMissionsRankingExportExcel,
  getMissionsLabelByClassId,
} from '@/services/shared/ranking/Ranking.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { computed, ref } from 'vue'

const MODULE_NAME = 'rankingMissionsModule'

const firstMissionOption = { id: null, label: 'Todas as missões' }
const firstClassoption = { id: null, label: 'Todas as turmas' }
const monthFirstOption = { id: null, name: 'Todo o período' }

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

  const selectedGuide = computed({
    get() {
      return store.getters[`${MODULE_NAME}/selectedGuide`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/selectedGuide`, value)
    },
  })

  const schoolYears = computed({
    get() {
      return store.getters[`${MODULE_NAME}/schoolYears`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/schoolYears`, value)
    },
  })

  const classes = computed({
    get() {
      return store.getters[`${MODULE_NAME}/classes`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/classes`, value)
    },
  })

  const missions = computed({
    get() {
      return store.getters[`${MODULE_NAME}/missions`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/missions`, value)
    },
  })

  const selectedSerie = computed({
    get() {
      return store.getters[`${MODULE_NAME}/selectedSerie`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/selectedSerie`, value)
    },
  })

  const selectedClass = computed({
    get() {
      return store.getters[`${MODULE_NAME}/selectedClass`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/selectedClass`, value)
    },
  })

  const classLoading = computed({
    get() {
      return store.getters[`${MODULE_NAME}/classLoading`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/classLoading`, value)
    },
  })

  const schoolYearsLoading = computed({
    get() {
      return store.getters[`${MODULE_NAME}/schoolYearsLoading`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/schoolYearsLoading`, value)
    },
  })

  const missionsLoading = computed({
    get() {
      return store.getters[`${MODULE_NAME}/missionsLoading`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/missionsLoading`, value)
    },
  })

  const classPage = computed({
    get() {
      return store.getters[`${MODULE_NAME}/classPage`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/classPage`, value)
    },
  })

  const classPageSize = computed({
    get() {
      return store.getters[`${MODULE_NAME}/classPageSize`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/classPageSize`, value)
    },
  })

  const classTotalPages = computed({
    get() {
      return store.getters[`${MODULE_NAME}/classTotalPages`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/classTotalPages`, value)
    },
  })

  const selectedMonth = computed({
    get() {
      return store.getters[`${MODULE_NAME}/selectedMonth`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/selectedMonth`, value)
    },
  })

  const { subject, institution } = useFilters()

  const getSeriesData = async () => {
    schoolYearsLoading.value = true
    try {
      const { data } = await getSeries({
        subjects: subject.value.id,
        modulesIds: ModulesEnum.CustomMissionsPlus,
      })

      schoolYears.value = data.data || []

      selectedSerie.value = schoolYears.value[0]

      await getClassesSimplifiedData({ page: 1 })
    } catch (error) {
      loading.value = false
    } finally {
      schoolYearsLoading.value = false
    }
  }

  const getMissionsLabelByClassIdData = async () => {
    const body = {
      SubjectId: subject.value.id,
      ClassesIds: selectedClass.value?.id,
      SerieId: selectedSerie.value?.id,
      GuidePlus: true,
    }

    missionsLoading.value = true
    try {
      const { data } = await getMissionsLabelByClassId(body)
      const mapped = data.map(item => ({ id: item.id, label: item.name }))
      missions.value = [firstMissionOption, ...mapped]
      selectedGuide.value = missions.value[0]

      await getRankingData()
    } catch (error) {
      missions.value = [firstMissionOption]
    } finally {
      missionsLoading.value = false
    }
  }

  const getClassesSimplifiedData = async (ctx = { page: 1 }) => {
    if (!selectedSerie.value.id) return

    classPage.value = ctx.page

    classLoading.value = true

    try {
      const body = {
        SubjectId: subject.value.id,
        SerieIds: selectedSerie.value?.id,
        InstitutionId: institution.value.id,
        PageSize: classPageSize.value,
        Page: ctx.page,
      }

      const { data } = await getClassesV2Label(body)
      if (data.data.length === 0) {
        dataTable.value = []
      }

      const mapped = data.data.map(item => ({ id: item.id, label: item.name }))

      if (classPage.value === 1) {
        classes.value = [firstClassoption]
        selectedClass.value = firstClassoption
      }

      classes.value.push(...mapped)

      classTotalPages.value = data.totalPages

      await getMissionsLabelByClassIdData()
    } catch (error) {
      dataTable.value = []
      loading.value = false
    } finally {
      classLoading.value = false
    }
  }

  const getRankingData = async () => {
    loadingTable.value = true
    const body = {
      SubjectId: subject.value.id,
      ClassIds: selectedClass.value?.id,
      SerieId: selectedSerie.value?.id,
      Month: selectedMonth.value?.id,
      GuideId: selectedGuide.value?.id,
      InstitutionId: institution.value.id,
      GuidePlus: true,
    }
    getMissionsRanking(body)
      .then(({ data }) => {
        dataTable.value = data
      })
      .catch(() => {
        dataTable.value = []
      })
      .finally(() => {
        loadingTable.value = false
      })
  }

  const exportExcel = async () => {
    const body = {
      SubjectId: subject.value.id,
      ClassIds: selectedClass.value?.id,
      SerieId: selectedSerie.value?.id,
      Month: selectedMonth.value?.id,
      GuideId: selectedGuide.value?.id,
      InstitutionId: institution.value.id,
      GuidePlus: true,
    }
    excelLoading.value = true
    const { data } = await getMissionsRankingExportExcel(body)

    const fileName = sanitizeString(`${setTitleExcel()}.xlsx`)
    saveAs(data, fileName)

    excelLoading.value = false
  }

  const setTitleExcel = () => {
    const className = title.value.className === 'Todas as turmas' ? '' : title.value.className || ''
    const missionTitle = title.value.title === 'Todas as missões' ? '' : title.value.title || ''

    return `Relatório missão plus ${selectedSerie.value?.name} ${className} ${missionTitle}`
      .trim()
      .replace(/\s+/g, ' ')
  }

  // #endregion methods

  return {
    MODULE_NAME,

    total,
    loading,
    title,
    selectedGuide,
    loadingTable,
    excelLoading,
    missions,
    missionsLoading,
    selectedSerie,
    selectedClass,
    classes,
    classLoading,
    schoolYears,
    schoolYearsLoading,
    selectedMonth,
    dataTable,
    classPage,
    classPageSize,
    classTotalPages,
    monthFirstOption,

    exportExcel,
    getRankingData,
    getSeriesData,
    getClassesSimplifiedData,
    getMissionsLabelByClassIdData,
  }
}