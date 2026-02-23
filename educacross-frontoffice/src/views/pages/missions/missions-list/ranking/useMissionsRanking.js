import {
  getMissionsRanking,
  getMissionsRankingExportExcel,
  getMissionsLabelByClassId,
} from '@/services/shared/ranking/Ranking.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { ref, computed } from 'vue'

const MODULE_NAME = 'rankingMissionsListModule'
const ALL_MISSIONS_OPTION = { id: null, label: 'Todas as missões' }

export function useMissionRanking() {
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

  const missions = computed({
    get() {
      return store.getters[`${MODULE_NAME}/missions`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/missions`, value)
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

  const selectedMonth = computed({
    get() {
      return store.getters[`${MODULE_NAME}/selectedMonth`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/selectedMonth`, value)
    },
  })

  // #endregion computed

  const { classe, subject } = useFilters()

  // #region methods

  const getMissionsLabelByClassIdData = async () => {
    missionsLoading.value = true

    const body = {
      SubjectId: subject.value?.id,
      ClassesIds: classe.value?.ClassId,
      SerieId: classe.value?.SerieId,
    }

    try {
      const { data } = await getMissionsLabelByClassId(body)

      missions.value = [
        ALL_MISSIONS_OPTION,
        ...data.map(item => ({
          id: item.id,
          label: item.name,
        })),
      ]
      selectedGuide.value = ALL_MISSIONS_OPTION

      // Cascade to ranking data
      await getRankingData()
    } catch (error) {
      missions.value = [ALL_MISSIONS_OPTION]
      selectedGuide.value = ALL_MISSIONS_OPTION
      dataTable.value = []
    } finally {
      missionsLoading.value = false
    }
  }

  const getRankingData = async () => {
    if (missions.value.length === 0 || missions.value.length === 1) {
      loadingTable.value = false
      dataTable.value = []
      return
    }

    loadingTable.value = true

    const body = {
      SubjectId: subject.value?.id,
      ClassIds: classe.value?.ClassId,
      SerieId: classe.value?.SerieId,
      Month: selectedMonth.value?.id,
      GuideId: selectedGuide.value?.id,
    }

    try {
      const { data } = await getMissionsRanking(body)
      dataTable.value = data
    } catch (error) {
      dataTable.value = []
    } finally {
      loadingTable.value = false
    }
  }

  const exportExcel = async () => {
    const body = {
      SubjectId: subject.value?.id,
      ClassIds: classe.value?.ClassId,
      SerieId: classe.value?.SerieId,
      Month: selectedMonth.value?.id,
      GuideId: selectedGuide.value?.id,
    }

    excelLoading.value = true

    try {
      const { data } = await getMissionsRankingExportExcel(body)
      const fileName = sanitizeString(`Relatório missão plus ${title.value?.className}.xlsx`)
      saveAs(data, fileName)
    } catch (error) {
    } finally {
      excelLoading.value = false
    }
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
    dataTable,
    selectedMonth,

    exportExcel,
    getRankingData,
    getMissionsLabelByClassIdData,
  }
}