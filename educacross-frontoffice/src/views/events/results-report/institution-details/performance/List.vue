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
    <template #cell(performanceInstitution)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <ArrowCompare
          :value-initial="item.performanceInstitution"
          :value-to-compare="item.performanceNetworkGroup"
        />
        <SemaphoreStatus
          :status-enum="
            getVariantByRule(item.performanceInstitution || 0, 'eventLearningPerformance')
          "
        >
          <span class="whitespace-no-wrap"
            >{{ (item.performanceInstitution || 0) | formatNumber }}%</span
          >
        </SemaphoreStatus>
      </div>
    </template>
    <template #cell(performanceNetworkGroup)="{ item }">
      <SemaphoreStatus
        :status-enum="
          getVariantByRule(item.performanceNetworkGroup || 0, 'eventLearningPerformance')
        "
      >
        <span class="whitespace-no-wrap"
          >{{ (item.performanceNetworkGroup || 0) | formatNumber }}%</span
        >
      </SemaphoreStatus>
    </template>
  </ListTable>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import router from '@/router'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { ref, watch, computed } from 'vue'

const listTableRef = ref(null)

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const { selectedEducationalOrganizationLabel, selectedKnowledgeAxes } = useEvents()

if (isNetworkManager) {
  store.commit('events/setInstitutionId', router.currentRoute.params.institutionId)
}

const isLoading = computed(() => {
  return store.getters['resultsReportClassesPerformance/loading']
})

const tableColumns = [
  { key: 'tag', label: 'CÓDIGO DA HABILIDADE', sortable: true },
  { key: 'knowledgeAxisName', label: 'TEMÁTICAS', sortable: true },
  /* { key: 'studentsAmount', label: 'TOTAL DE ALUNOS', sortable: true }, */
  { key: 'performanceInstitution', label: 'Rendimento DA ESCOLA', sortable: true },
  { key: 'performanceNetworkGroup', label: 'Rendimento DO GRUPO', sortable: true },
]

const dataTable = computed(() => {
  return store.getters['resultsReportClassesPerformance/data']
})

const totalData = computed(() => {
  return store.getters['resultsReportClassesPerformance/total']
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('resultsReportClassesPerformance/setParams', {
    Search: searchQuery,
    OrderBy: sortBy,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  store.dispatch('resultsReportClassesPerformance/fetch')
}

watch([selectedKnowledgeAxes], () => {
  store.commit('resultsReportClassesPerformance/setParams', {
    Page: 1,
  })
  listTableRef.value.resetPage()
  if (selectedEducationalOrganizationLabel.value.id) {
    store.dispatch('resultsReportClassesPerformance/fetch')
  }
})
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }
</style>