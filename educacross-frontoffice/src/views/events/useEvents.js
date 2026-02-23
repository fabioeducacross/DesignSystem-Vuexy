import store from '@/store'
import { computed } from 'vue'

export function useEvents() {
  const networkGroup = computed(() => store.getters['events/networkGroup'])

  const networkGroupID = computed(() => store.getters['events/networkGroupID'])

  const setNetworkGroup = networkGroup => {
    store.commit('events/setNetworkGroup', networkGroup)
  }

  const rankingOrder = computed(() => store.getters['events/rankingOrder'])

  const rankingOrderOptions = [
    { text: 'Ranking por pontos', value: false },
    { text: 'Ranking por troféus', value: true },
  ]

  const setRankingOrder = rankingOrder => {
    store.commit('events/setRankingOrder', rankingOrder)
  }

  const serie = computed(() => store.getters['events/serie'])

  const setEventSerie = setSerie => {
    store.commit('events/setEventSerie', setSerie)
    store.commit('events/setSerieId', setSerie.id)
  }

  const serieId = computed(() => store.getters['events/serieId'])

  const series = computed(() => store.getters['events/series'])

  const setSerieId = setSerieId => {
    store.commit('events/setSerieId', setSerieId)
  }

  const classId = computed(() => store.getters['events/classId'])

  const setClassId = setClassId => {
    store.commit('events/setClassId', setClassId)
  }

  const institutionId = computed(() => store.getters['events/institutionId'])

  const setInstitutionId = setInstitutionId => {
    store.commit('events/setInstitutionId', setInstitutionId)
  }

  const loadingEducationalOrganization = computed(
    () => store.getters['events/loadingEducationalOrganization'],
  )

  const educationalOrganizationsLabels = computed(
    () => store.getters['events/educationalOrganizationsLabels'],
  )

  const setSelectedEducationalOrganization = educationalOrganization => {
    store.commit('events/setSelectedEducationalOrganization', educationalOrganization)
  }

  const selectedEducationalOrganizationLabel = computed(
    () => store.getters['events/selectedEducationalOrganizationLabel'],
  )

  const loadingKnowledgeAxes = computed(() => {
    return store.getters['events/loadingKnowledgeAxes']
  })

  const knowledgeAxes = computed(() => store.getters['events/knowledgeAxes'])

  const setSelectedKnowledgeAxes = selectedKnowledgeAxes => {
    store.commit('events/setSelectedKnowledgeAxes', selectedKnowledgeAxes)
  }

  const selectedKnowledgeAxes = computed(() => store.getters['events/selectedKnowledgeAxes'])

  return {
    networkGroup,
    networkGroupID,
    setNetworkGroup,
    rankingOrder,
    rankingOrderOptions,
    setRankingOrder,
    series,
    serie,
    setEventSerie,
    serieId,
    setSerieId,
    classId,
    setClassId,
    institutionId,
    setInstitutionId,
    loadingEducationalOrganization,
    educationalOrganizationsLabels,
    setSelectedEducationalOrganization,
    selectedEducationalOrganizationLabel,
    loadingKnowledgeAxes,
    knowledgeAxes,
    setSelectedKnowledgeAxes,
    selectedKnowledgeAxes,
  }
}