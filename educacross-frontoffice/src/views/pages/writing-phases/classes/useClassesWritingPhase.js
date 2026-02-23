import {
  getWritingPhaseClasses,
  getWritingPhaseInstitutionOverview,
  getWritingStagesSeriesLabel,
} from '@/services/shared/writing-stages/writing-stages.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from 'vue'
import { useRoute } from 'vue-router/composables'

export function useClassesWritingPhase() {
  const module_name = 'ModuleWritingPhaseClasses'

  const { adminInstitutionId, institution } = useFilters()
  const route = useRoute()
  const institutionId = route.params.institutionId

  institution.value = { id: institutionId || adminInstitutionId.value }

  const loading = computed({
    get() {
      return store.getters[`${module_name}/loading`]
    },
    set(value) {
      store.commit(`${module_name}/loading`, value)
    },
  })
  const loadingCards = computed({
    get() {
      return store.getters[`${module_name}/loadingCards`]
    },
    set(value) {
      store.commit(`${module_name}/loadingCards`, value)
    },
  })
  const cards = computed({
    get() {
      return store.getters[`${module_name}/cards`]
    },
    set(value) {
      store.commit(`${module_name}/cards`, value)
    },
  })
  const data = computed({
    get() {
      return store.getters[`${module_name}/data`]
    },
    set(value) {
      store.commit(`${module_name}/data`, value)
    },
  })
  const total = computed({
    get() {
      return store.getters[`${module_name}/total`]
    },
    set(value) {
      store.commit(`${module_name}/total`, value)
    },
  })
  const params = computed({
    get() {
      return store.getters[`${module_name}/params`]
    },
    set(value) {
      store.commit(`${module_name}/params`, value)
    },
  })
  const applyId = computed({
    get() {
      return store.getters[`${module_name}/applyId`]
    },
    set(value) {
      store.commit(`${module_name}/applyId`, value)
    },
  })
  const seriesIds = computed({
    get() {
      return store.getters[`${module_name}/seriesIds`]
    },
    set(value) {
      store.commit(`${module_name}/seriesIds`, value)
    },
  })
  const institutionSeries = computed({
    get() {
      return store.getters[`${module_name}/institutionSeries`]
    },
    set(value) {
      store.commit(`${module_name}/institutionSeries`, value)
    },
  })
  const institutionSeriesLoading = computed({
    get() {
      return store.getters[`${module_name}/institutionSeriesLoading`]
    },
    set(value) {
      store.commit(`${module_name}/institutionSeriesLoading`, value)
    },
  })
  const institutionName = computed({
    get() {
      return store.getters[`${module_name}/institutionName`]
    },
    set(value) {
      store.commit(`${module_name}/institutionName`, value)
    },
  })

  const fetchSeries = async () => {
    institutionSeriesLoading.value = true

    const res = await getWritingStagesSeriesLabel({
      InstitutionsIds: [institution.value.id],
    })

    institutionSeries.value = res.data

    institutionSeriesLoading.value = false
  }

  const fetchClasses = async () => {
    loading.value = true

    const res = await getWritingPhaseClasses({
      Apply: applyId.value,
      InstitutionId: institution.value.id,
      SeriesIds: seriesIds.value.map(i => i.id),
      ...params.value,
    })

    data.value = res.data.data
    total.value = res.data.total

    loading.value = false
  }

  const fetchCards = async () => {
    loadingCards.value = true

    const res = await getWritingPhaseInstitutionOverview({
      institutionId: institution.value.id,
      seriesIds: seriesIds.value.map(i => i.id),
    })

    cards.value = res.data

    const firstEnabled = cards.value.find(card => card.enabled)
    applyId.value = firstEnabled ? firstEnabled.apply : null

    loadingCards.value = false

    institutionName.value = cards.value[0] ? cards.value[0].institutionName : null

    if (!applyId.value) {
      loading.value = false
      data.value = []
      total.value = 0

      return
    }

    fetchClasses()
  }

  return {
    module_name,
    loading,
    loadingCards,
    cards,
    data,
    total,
    params,
    applyId,
    seriesIds,
    institutionSeriesLoading,
    institutionSeries,
    institutionName,
    fetchClasses,
    fetchCards,
    fetchSeries,
  }
}