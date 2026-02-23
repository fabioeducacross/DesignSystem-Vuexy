<template>
  <div>
    <ListTable
      ref="listTableRef"
      :loading="isLoading"
      :table-columns="columns"
      :data-table="dataTable"
      :total-data="totalData"
      :per-page-options="[5, 10, 50, 100]"
      search-placeholder="searchForStudent"
      @change="changeListTable"
    >
      <template #cell(studentName)="{ item }">
        <div class="d-flex align-items-center justify-content-start gap-2">
          <span class="font-bold">{{ item.studentName }}</span>
          <b-badge v-if="!item.totalTime" pill variant="light-danger"> Não iniciou</b-badge>
        </div>
      </template>
      <template #cell(serieName)="{ item }">
        <b-badge pill variant="light-primary">{{ item.serieName }}</b-badge>
      </template>
      <template #cell(totalTime)="{ item }">
        <span pill variant="light-primary">{{ item.totalTime | formattedTime }}</span>
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
  </div>
</template>

<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ListTable from '@/components/table/ListTable.vue'
import { IndividualReportStatusEnum } from '@/consts/StatusEnums.js'
import router from '@/router'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy
const { eventId } = router.currentRoute.params
const listTableRef = ref(null)

const role = store.getters.accessRole
const isTeacher = role === 'Teacher'
const isCoordinator = role === 'Coordinator'

const { classId, serieId } = useEvents()

const isLoading = computed(() => store.getters['individualReportStudents/loading'])
const dataTable = computed(() => store.getters['individualReportStudents/data'])
const totalData = computed(() => store.getters['individualReportStudents/total'])

const columns = [
  { key: 'studentName', label: 'Aluno', sortable: true },
  { key: 'serieName', label: 'Ano Escolar', sortable: true },
  { key: 'className', label: 'Turma', sortable: true },
  { key: 'totalTime', label: 'Tempo Total', sortable: true },
  {
    key: 'performance',
    label: 'Rendimento',
    sortable: true,
    tooltip: vm.$t('performanceBasedOnStudentMistakesAndSuccesses'),
  },
  { key: 'actions', label: 'Ações', sortable: true },
]

const tableActions = [
  {
    icon: 'visibility',
    tooltip: 'Ver detalhes',
    action: data => {
      router.push({
        name: isTeacher ? 'individualReportTeacherStudent' : 'individualReportAdminStudent',
        params: {
          eventId,
          studentId: data.studentId,
        },
      })
    },
  },
]

function changeListTable({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) {
  store.commit('individualReportStudents/setParams', {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
  })
  store.dispatch('individualReportStudents/fetch')
}

watch([classId, serieId], () => {
  if (!serieId.value && !isCoordinator) return null

  store.commit('individualReportStudents/setParams', {
    Page: 1,
  })

  listTableRef.value.resetPage()
  store.dispatch('individualReportStudents/fetch')
})

onMounted(() => {
  if (isTeacher || serieId.value || isCoordinator) {
    store.dispatch('individualReportStudents/fetch')
  }
})
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }
</style>