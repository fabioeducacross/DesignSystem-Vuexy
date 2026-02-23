<template>
  <ListTable
    ref="listTableRef"
    :loading="isLoading"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="Pesquisar por turma"
    @change="changeListTable"
  >
    <template #head(students)="item">
      <div class="d-flex align-items-center gap 1">
        {{ item.label }}
        <span
          v-b-tooltip.hover.top.html="'Alunos cadastrados'"
          class="material-symbols-outlined ml-1 head-icon-info"
        >
          info
        </span>
      </div>
    </template>
    <template #head(studentsStarted)="item">
      <div class="d-flex align-items-center gap 1">
        {{ item.label }}
        <span
          v-b-tooltip.hover.top.html="'Iniciaram ao menos 1 missão.'"
          class="material-symbols-outlined ml-1 head-icon-info"
        >
          info
        </span>
      </div>
    </template>
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
    <template #cell(className)="{ item }">
      <span class="font-bold">{{ item.className }}</span>
    </template>
    <template #cell(serieName)="{ item }">
      <b-badge variant="light-primary" pill>
        <span>{{ item.serieName }}</span>
      </b-badge>
    </template>
    <template #cell(students)="{ item }">
      <span>{{ item.students | formatNumber }}</span>
    </template>
    <template #cell(started)="{ item }">
      <span v-if="item.started > 0" v-b-tooltip.hover.top="formatNumber(item.studentsStarted)">
        {{ item.started | formatNumber }}%
      </span>
      <PerformanceCell v-else :performance="item.started" enum="eventLearningPerformance" />
    </template>
    <template #cell(performance)="{ item }">
      <PerformanceCell :performance="item.performance" enum="eventLearningPerformance" />
    </template>
    <template #cell(actions)="{ item }">
      <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
        <span
          v-for="(action, index) in tableActions"
          :key="index"
          v-b-tooltip.hover.top="action.tooltip"
          class="material-symbols-outlined text-primary cursor-pointer"
          @click="action.action(item)"
        >
          {{ action.icon }}
        </span>
      </div>
    </template>
  </ListTable>
</template>

<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ListTable from '@/components/table/ListTable.vue'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import { getEventResultReportClasses } from '@/services/shared/events/Events.Service'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import { ref, onMounted, watch } from 'vue'

// refs & state
const listTableRef = ref(null)
const isNetworkManager = store.getters.accessRole === 'NetworkManager'

// get params from router
const { eventId, institutionId } = router.currentRoute.params

const { serieId } = useEvents()

const isLoading = ref(false)
const dataTable = ref([])
const totalData = ref(0)

const tableColumns = [
  { key: 'className', label: 'Turma', sortable: true },
  { key: 'serieName', label: 'Ano Escolar', sortable: true },
  { key: 'students', label: 'Total de Alunos', sortable: true },
  { key: 'started', label: 'Participação', sortable: true },
  { key: 'performance', label: 'Rendimento', sortable: true },
  { key: 'actions', label: 'Ações', sortable: false },
]

const openClassReport = data => {
  if (isNetworkManager) {
    router.push({
      name: 'resultsReportNetworkManagerStudentsParticipation',
      params: {
        eventId,
        institutionId,
        classId: data.classId,
        serieId: serieId.value,
      },
    })
  } else {
    router.push({
      name: 'resultsReportAdminStudentsParticipation',
      params: {
        eventId,
        institutionId,
        classId: data.classId,
        serieId: serieId.value,
      },
    })
  }
}

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: 'Relatório da Turma',
    action: data => {
      openClassReport(data)
    },
  },
]

const params = ref({
  InstitutionId: institutionId,
  SerieId: serieId.value,
  Search: '',
  OrderBy: 'className',
  Ascending: 'true',
  Page: 1,
  PageSize: 10,
})

const changeListTable = ({
  currentPage,
  perPage,
  sortBy,
  isSortDirDesc,
  searchQuery,
}) => {
  params.value = {
    InstitutionId: institutionId,
    SerieId: serieId.value,
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
  getEventResultReportClasses(eventId, params.value)
    .then(response => {
      const { data } = response
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      isLoading.value = false
    })
}

watch([serieId], () => {
  params.value.Page = 1
  params.value.SerieId = serieId.value
  listTableRef.value.resetPage()
  fetchData()
})

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>