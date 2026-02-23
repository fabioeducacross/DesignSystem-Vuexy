<template>
  <ListTable
    ref="listTableRef"
    :loading="isLoading"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="Pesquisar por habilidade"
    @change="changeListTable"
  >
    <template #cell(tag)="{ item }">
      <span :id="`popover-target-${item.tag}`" class="underline text-primary">{{ item.tag }}</span>
      <b-popover :title="item.tag" :target="`popover-target-${item.tag}`" triggers="hover">
        <div>
          <p>
            <strong>Objeto de Conhecimento:</strong> {{ item.knowledgeObject || 'Não cadastrado' }}
          </p>
          <p><strong>Habilidade:</strong> {{ item.name }}</p>
        </div>
      </b-popover>
    </template>
    <template #cell(studentsAmount)="{ item }">
      <span>{{ item.studentsAmount | formatNumber }}</span>
    </template>
    <template #cell(performance)="{ item }">
      <PerformanceCell :performance="item.performance" enum="eventLearningPerformance" />
    </template>
  </ListTable>
</template>

<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ListTable from '@/components/table/ListTable.vue'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import { ref, watch, computed } from 'vue'

const listTableRef = ref(null)

const { networkGroupID } = useEvents()

const isLoading = computed(() => {
  return store.getters['resultsReportInstitutionsPerformance/loading']
})

const selectedEducationalOrganization = computed(() => {
  return store.getters['events/selectedEducationalOrganizationLabel']
})

const selectedKnowledgeAxes = computed(() => {
  return store.getters['events/selectedKnowledgeAxes']
})

const tableColumns = [
  { key: 'tag', label: 'CÓDIGO DA HABILIDADE', sortable: true },
  { key: 'knowledgeAxisName', label: 'TEMÁTICAS', sortable: true },
  /* { key: 'studentsAmount', label: 'TOTAL DE ALUNOS', sortable: true }, */
  { key: 'performance', label: 'Rendimento', sortable: true },
]

const dataTable = computed(() => {
  return store.getters['resultsReportInstitutionsPerformance/data']
})

const totalData = computed(() => {
  return store.getters['resultsReportInstitutionsPerformance/total']
})

const changeListTable = ({
  currentPage,
  perPage,
  sortBy,
  isSortDirDesc,
  searchQuery,
}) => {
  store.commit('resultsReportInstitutionsPerformance/setParams', {
    Search: searchQuery,
    OrderBy: sortBy,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  store.dispatch('resultsReportInstitutionsPerformance/fetch')
}

watch([networkGroupID, selectedKnowledgeAxes], () => {
  store.commit('resultsReportInstitutionsPerformance/setParams', {
    Page: 1,
  })
  listTableRef.value.resetPage()

  if (selectedEducationalOrganization.value.id) {
    store.dispatch('resultsReportInstitutionsPerformance/fetch')
  }
})
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>