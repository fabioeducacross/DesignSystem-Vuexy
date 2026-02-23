import { emitter } from '@/eventBus'
import { useRoute } from 'vue-router/composables'
import {
  getMissionsRanking,
  getMissionsRankingExportExcel,
  getMissionsLabelByClassId,
} from '@/services/shared/ranking/Ranking.Service'
import { getGuidesPlusInstitutionOverviewClass } from '@/services/teacher-context/guides/Guides.Service.js'
import store from '@/store'
import rankingMissionModule from '@/store/pageModules/missions/ranking-mission-module.js'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { computed, toRef } from 'vue'

export const MODULE_NAME = 'rankingMissionsModule'

// Default options
const ALL_MISSIONS = { id: null, label: 'Todas as missões' }
const ALL_PERIOD = { id: null, name: 'Todo o período' }

export function useMissionPlusRanking() {
  if (!store.hasModule(MODULE_NAME)) {
    store.registerModule(MODULE_NAME, rankingMissionModule)
  }

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

  const missionsLoading = computed({
    get() {
      return store.getters[`${MODULE_NAME}/missionsLoading`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/missionsLoading`, value)
    },
  })

  const overviewLoading = computed({
    get() {
      return store.getters[`${MODULE_NAME}/overviewLoading`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/overviewLoading`, value)
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

  const selectedMission = computed({
    get() {
      return store.getters[`${MODULE_NAME}/selectedMission`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/selectedMission`, value)
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

  const serieId = computed({
    get() {
      return store.getters[`${MODULE_NAME}/serieId`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/serieId`, value)
    },
  })

  const selectedPeriod = computed({
    get() {
      return store.getters[`${MODULE_NAME}/selectedPeriod`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/selectedPeriod`, value)
    },
  })

  const { classe, subject } = useFilters()

  const route = useRoute()
  const classId = toRef(route.params, 'classId')

  // #endregion

  // #region methods

  const getGuidesOverviewClass = async () => {
    overviewLoading.value = true
    try {
      const { data } = await getGuidesPlusInstitutionOverviewClass(classe.value.id, {
        SubjectId: subject.value.id,
      })

      title.value = {
        ...title.value,
        className: data.className,
      }
      emitter.emit('setBreadcrumb', ['', '', data.className])
      serieId.value = data.serieId

      // Trigger next fetch in cascade
      await getMissionsLabelByClassIdData()
    } catch (error) {
      missions.value = [ALL_MISSIONS]
      selectedMission.value = ALL_MISSIONS
    } finally {
      overviewLoading.value = false
    }
  }

  const getMissionsLabelByClassIdData = async () => {
    missionsLoading.value = true
    try {
      const body = {
        SubjectId: subject.value.id,
        ClassesIds: classId.value,
        SerieId: serieId.value,
        GuidePlus: true,
      }

      const { data } = await getMissionsLabelByClassId(body)

      const mi = data.map(item => ({
        id: item.id,
        label: item.name,
      }))

      missions.value = [ALL_MISSIONS, ...mi]
      selectedMission.value = missions.value[0]

      // Trigger next fetch in cascade
      await getRankingData()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch missions:', error)
      missions.value = [ALL_MISSIONS]
      selectedMission.value = ALL_MISSIONS
    } finally {
      missionsLoading.value = false
    }
  }

  const getRankingData = async () => {
    loadingTable.value = true
    try {
      const body = {
        SubjectId: subject.value.id,
        ClassIds: classId.value,
        SerieId: serieId.value,
        Month: selectedPeriod.value?.id,
        GuideId: selectedMission.value?.id,
        GuidePlus: true,
      }

      const { data } = await getMissionsRanking(body)
      dataTable.value = data
      total.value = data.length
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch ranking data:', error)
      dataTable.value = []
      total.value = 0
    } finally {
      loadingTable.value = false
    }
  }

  const exportExcel = async () => {
    excelLoading.value = true
    try {
      const body = {
        SubjectId: subject.value.id,
        ClassIds: classId.value,
        SerieId: serieId.value,
        Month: selectedPeriod.value?.id,
        GuideId: selectedMission.value?.id,
        GuidePlus: true,
      }

      const { data } = await getMissionsRankingExportExcel(body)

      const fileName = sanitizeString(`${setTitleExcel()}.xlsx`)
      saveAs(data, fileName)
    } finally {
      excelLoading.value = false
    }
  }

  const setTitleExcel = () => {
    const className = title.value.className === 'Todas as turmas' ? '' : title.value.className || ''
    const missionTitle =
      selectedMission.value?.label === 'Todas as missões' ? '' : selectedMission.value?.label || ''

    return `Relatório missão plus ${className} ${missionTitle}`.trim().replace(/\s+/g, ' ')
  }

  // #endregion

  return {
    MODULE_NAME,
    ALL_MISSIONS,
    ALL_PERIOD,

    total,
    loading,
    missionsLoading,
    overviewLoading,
    title,
    loadingTable,
    excelLoading,
    dataTable,
    missions,
    selectedMission,
    selectedPeriod,

    exportExcel,
    getRankingData,
    getMissionsLabelByClassIdData,
    getGuidesOverviewClass,
  }
}