import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import {
  getInstitutionsMissionsRanking,
  getInstitutionsMissionsRankingExportExcel,
  getMissionsLabelByClassId,
} from '@/services/shared/ranking/Ranking.Service.js'
import { getSeries } from '@/services/shared/serie/Serie.Service'
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

  const missions = computed({
    get() {
      return store.getters[`${MODULE_NAME}/missions`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/missions`, value)
    },
  })

  const guide = computed({
    get() {
      return store.getters[`${MODULE_NAME}/guideId`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/guideId`, value)
    },
  })

  const networkGroups = computed({
    get() {
      return store.getters[`${MODULE_NAME}/networkGroups`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/networkGroups`, value)
    },
  })

  const serie = computed({
    get() {
      return store.getters[`${MODULE_NAME}/serieId`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/serieId`, value)
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

  const month = computed({
    get() {
      return store.getters[`${MODULE_NAME}/month`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/month`, value)
    },
  })

  const group = computed({
    get() {
      return store.getters[`${MODULE_NAME}/group`]
    },
    set(value) {
      store.commit(`${MODULE_NAME}/group`, value)
    },
  })

  const subjectId = computed(() => store.getters[`${MODULE_NAME}/subjectId`])

  const { subject } = useFilters()

  // Requests

  const getNetworkGroupsData = async () => {
    try {
      const { data } = await getNetworkGroups()

      networkGroups.value = [{ id: null, name: 'Todos os grupos de escolas' }, ...data]
      group.value = networkGroups.value[0]

      await getMissionsLabelByClassIdData()
    } catch (error) {
      loading.value = false
    }
  }

  const getSeriesData = async () => {
    try {
      const { data } = await getSeries({
        subjects: subject.value.id,
        modulesIds: ModulesEnum.CustomMissionsPlus,
      })

      schoolYears.value = data.data || []

      serie.value = schoolYears.value[0]
      await getNetworkGroupsData()
    } catch (error) {
      loading.value = false
    }
  }

  const getMissionsLabelByClassIdData = async () => {
    const body = {
      SubjectId: subject.value.id,
      SerieId: serie.value.id,
      NetworkGroupId: group.value.id,
    }

    try {
      const { data } = await getMissionsLabelByClassId(body)
      missions.value = [{ id: null, name: 'Todas as missões' }, ...data]
      guide.value = missions.value[0]

      await getRankingData()
    } catch (error) {
      missions.value = [{ id: null, name: 'Todas as missões' }]
    }
  }

  const getRankingData = async () => {
    loadingTable.value = true
    const body = {
      SubjectId: subject.value.id,
      SerieId: serie.value.id,
      NetworkGroupId: group.value.id,
      Month: month.value.id,
      GuideId: guide.value.id,
      GuidePlus: true,
    }

    getInstitutionsMissionsRanking(body)
      .then(({ data }) => {
        dataTable.value = data
      })
      .finally(() => {
        loadingTable.value = false
      })
  }

  const exportExcel = async () => {
    const body = {
      SubjectId: subject.value.id,
      SerieId: serie.value.id,
      NetworkGroupId: group.value.id,
      Month: month.value.id,
      GuideId: guide.value.id,
      GuidePlus: true,
    }
    excelLoading.value = true
    const { data } = await getInstitutionsMissionsRankingExportExcel(body)

    const fileName = sanitizeString(`Relatório missão plus ${title.value.className}.xlsx`)
    saveAs(data, fileName)

    excelLoading.value = false
  }

  return {
    MODULE_NAME,

    total,
    loading,
    title,
    subjectId,
    guide,
    rounds,
    serie,
    loadingTable,
    excelLoading,
    missions,
    networkGroups,
    group,
    month,
    schoolYears,
    getSeriesData,
    getNetworkGroupsData,
    getMissionsLabelByClassIdData,

    exportExcel,
    getRankingData,
  }
}