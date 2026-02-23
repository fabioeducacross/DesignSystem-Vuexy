<template>
  <ListTable
    ref="listTableRef"
    :loading="isLoading"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="searchForStudent"
    @change="changeListTable"
  >
    <template #head(performance)="item">
      <div class="d-flex align-items-center gap 1">
        {{ item.label }}
        <span
          v-b-tooltip.hover.top.html="$t('performanceBasedOnStudentMistakesAndSuccesses')"
          class="material-symbols-outlined ml-1 head-icon-info"
        >
          info
        </span>
      </div>
    </template>
    <template #cell(studentName)="{ item }">
      <span class="font-bold">{{ item.studentName }}</span>
      <b-badge v-if="!item.challengesDone" class="ml-1" pill variant="light-danger">
        <span>Não jogou</span>
      </b-badge>
    </template>
    <template #cell(challengesDone)="{ item }">
      <span>{{ formatNumber(item.challengesDone) }}</span>
    </template>
    <template v-if="isCoordinator" #cell(serieName)="{ item }">
      <b-badge variant="light-primary" pill>
        <span>{{ item.serieName }}</span>
      </b-badge>
    </template>
    <template v-if="isCoordinator" #cell(className)="{ item }">
      <span>{{ item.className }}</span>
    </template>
    <template #cell(progress)="{ item }">
      <span v-if="item.progress > 0">{{ `${formatNumber(item.progress)}%` }}</span>
      <PerformanceCell v-else :performance="item.progress" enum="eventLearningPerformance" />
    </template>
    <template #cell(performance)="{ item }">
      <PerformanceCell :performance="item.performance" enum="eventLearningPerformance" />
    </template>
    <template #cell(totalTime)="{ item }">
      <span v-if="item.totalTime > 0">{{ formattedTime(item.totalTime) }}</span>
      <PerformanceCell v-else :performance="item.totalTime" enum="eventLearningPerformance" />
    </template>
  </ListTable>
</template>

<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ListTable from '@/components/table/ListTable.vue'
import { formatNumber, formattedTime } from '@/filters/filters.js'
import router from '@/router'
import { getEventResultReportStudents } from '@/services/shared/events/Events.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { ref, onMounted } from 'vue'

const { classe } = useFilters()

const isCoordinator = store.getters.accessRole === 'Coordinator'

const listTableRef = ref(null)

const { eventId, institutionId } = router.currentRoute.params

const isLoading = ref(false)
const dataTable = ref([])
const totalData = ref(0)

const tableColumns = [
  { key: 'studentName', label: 'Aluno', sortable: true },
  { key: 'challengesDone', label: 'Desafios Realizados', sortable: true },
  {
    key: 'progress',
    label: 'Participação',
    sortable: true,
    formatter: value => `${formatNumber(value)}%`,
  },
  { key: 'performance', label: 'Rendimento', sortable: true },
  { key: 'totalTime', label: 'Tempo de Aprendizagem', sortable: true },
]

// Uncomment below to add serieName and className columns for Coordinator
/* if (isCoordinator) {
  tableColumns.splice(1, 0, { key: 'serieName', label: 'Ano Escolar', sortable: true })
  tableColumns.splice(2, 0, { key: 'className', label: 'Turma', sortable: true })
} */

const params = ref({
  InstitutionId: institutionId,
  ClassId: classe.value.ClassId,
  Search: '',
  OrderBy: 'studentName',
  Ascending: 'true',
  Page: 1,
  PageSize: 10,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    InstitutionId: institutionId,
    ClassId: classe.value.ClassId,
    Search: searchQuery,
    OrderBy: sortBy,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  }
  fetchData()
}

const fetchData = () => {
  isLoading.value = true
  getEventResultReportStudents(eventId, params.value)
    .then(response => {
      const { data } = response
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>