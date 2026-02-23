import {
  getWritingStagesNetworkOverviewInstitution,
  getWritingStagesNetworkOverview,
  getWritingStagesClassExcel,
} from '@/services/shared/writing-stages/writing-stages.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { saveAs } from 'file-saver'
import { computed, ref } from 'vue'

const moduleName = 'writingStagesInstitutions'

export function useWritingStagesInstitutions() {
  const { resetPage, reset, params, loading, dataTable, totalData, tableRef } = useTable()
  const { networkGroup, institution, serie, classe } = useFilters()

  const applyId = computed({
    get: () => store.getters[`${moduleName}/applyId`],
    set: value => store.commit(`${moduleName}/applyId`, value),
  })

  const loadingCards = computed({
    get: () => store.getters[`${moduleName}/loadingCards`],
    set: value => store.commit(`${moduleName}/loadingCards`, value),
  })

  const cards = computed({
    get: () => store.getters[`${moduleName}/cards`],
    set: value => store.commit(`${moduleName}/cards`, value),
  })

  const fetchCards = () => {
    loadingCards.value = true
    applyId.value = null

    getWritingStagesNetworkOverview({
      NetworkGroupsIds: networkGroup.value.map(item => item.id),
      InstitutionsIds: institution.value.map(item => item.id),
      SeriesIds: serie.value.map(item => item.id),
    })
      .then(({ data }) => {
        cards.value = data || []

        const firstEnabled = cards.value.find(card => card.enabled)
        applyId.value = firstEnabled ? firstEnabled.apply : null
      })
      .finally(() => {
        loadingCards.value = false
      })
  }

  const fetch = () => {
    if (!applyId.value) {
      dataTable.value = []
      totalData.value = 0
      return
    }
    loading.value = true
    getWritingStagesNetworkOverviewInstitution({
      NetworkGroupsIds: networkGroup.value.map(item => item.id),
      InstitutionsIds: institution.value.map(item => item.id),
      SeriesIds: serie.value.map(item => item.id),
      Apply: applyId.value,
      ...params.value,
    })
      .then(({ data }) => {
        dataTable.value = data.data
        totalData.value = data.total
      })
      .finally(() => {
        loading.value = false
      })
  }

  const resetAndfetch = () => {
    resetPage()
    fetch()
  }

  const generatingExcel = ref(false)

  const exportToExcel = () => {
    generatingExcel.value = true

    getWritingStagesClassExcel(classe.value.ClassId)
      .then(response => {
        const fileName = `Fases da Escrita - Alunos.xlsx`
        saveAs(response.data, fileName)
      })
      .finally(() => {
        generatingExcel.value = false
      })
  }

  return {
    moduleName,
    applyId,
    loadingCards,
    cards,
    fetchCards,
    fetch,
    resetAndfetch,
    generatingExcel,
    exportToExcel,
    reset,
    params,
    loading,
    dataTable,
    totalData,
    tableRef,
  }
}