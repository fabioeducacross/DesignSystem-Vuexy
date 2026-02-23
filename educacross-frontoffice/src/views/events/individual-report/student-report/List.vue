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
          <p><strong>Tópico:</strong> {{ item.knowledgeAxisName }}</p>
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
    <template #cell(studentPerformance)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <ArrowCompare
          :value-initial="item.studentPerformance"
          :value-to-compare="item.institutionPerformance"
        />
        <SemaphoreStatus
          :status-enum="getVariantByRule(item.studentPerformance || 0, 'eventLearningPerformance')"
        >
          <span class="whitespace-no-wrap"
            >{{ (item.studentPerformance || 0) | formatNumber }}%</span
          >
        </SemaphoreStatus>
      </div>
    </template>
    <template #cell(institutionPerformance)="{ item }">
      <SemaphoreStatus
        :status-enum="getVariantByRule(item.studentPerformance || 0, 'eventLearningPerformance')"
      >
        <span class="whitespace-no-wrap">{{ (item.studentPerformance || 0) | formatNumber }}%</span>
      </SemaphoreStatus>
    </template>
  </ListTable>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { ref, watch, computed } from 'vue'

const { studentId } = router.currentRoute.params

store.commit('individualReportStudentAbilities/setStudentId', studentId)

const listTableRef = ref(null)

const { selectedEducationalOrganizationLabel, selectedKnowledgeAxes } = useEvents()

const isLoading = computed(() => {
  return store.getters['individualReportStudentAbilities/loading']
})

const tableColumns = [
  { key: 'tag', label: 'CÓDIGO DA HABILIDADE', sortable: true },
  { key: 'knowledgeAxisName', label: 'TEMÁTICAS', sortable: true },
  { key: 'studentPerformance', label: 'Rendimento DO ALUNO', sortable: true },
  { key: 'institutionPerformance', label: 'Rendimento DA ESCOLA', sortable: true },
]

const dataTable = computed(() => {
  return store.getters['individualReportStudentAbilities/data']
})

const totalData = computed(() => {
  return store.getters['individualReportStudentAbilities/total']
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('individualReportStudentAbilities/setParams', {
    Search: searchQuery,
    OrderBy: sortBy,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  store.dispatch('individualReportStudentAbilities/fetch')
}

watch([selectedKnowledgeAxes], () => {
  store.commit('individualReportStudentAbilities/setParams', {
    Page: 1,
  })
  listTableRef.value.resetPage()
  if (selectedEducationalOrganizationLabel.value.id) {
    store.dispatch('individualReportStudentAbilities/fetch')
  }
})
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }
</style>