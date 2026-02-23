<template>
  <section>
    <ListTable
      ref="listTableRef"
      :data-table="students.data"
      :export-to-excel="exportExcel"
      :generating-excel="excelLoading"
      :loading="loadingTable"
      :table-columns="tableColumns"
      :total-data="students.total"
      search-placeholder="searchForStudent"
      @change="changeListTable"
    >
      <template #cell(name)="{ item }">
        <div>
          <span class="font-bold">{{ item.name }} </span>
          <b-badge v-if="item.totalTime === 0" pill variant="light-danger"> Não iniciou</b-badge>
        </div>
      </template>
      <template #cell(performance)="{ item }">
        <div>
          <div v-if="item.performance" class="d-flex align-items-center gap-2">
            <SemaphoreStatus
              :status-enum="getVariantByRule(item.performance, 'accuracyPerformance')"
            />
            <span> {{ $filters.formatNumber(item.performance) }}% </span>
          </div>
          <span v-else>-</span>
        </div>
      </template>
      <template #cell(totalTime)="{ item }">
        <div>
          <div v-if="item.totalTime">
            <span class="material-symbols-outlined align-middle" style="font-size: 16px">pace</span>
            <span class="font-semibold align-middle"> {{ item.totalTime | formattedTime }}</span>
          </div>
          <span v-else>-</span>
        </div>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? 'text-primary cursor-pointer'
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTable>
  </section>
</template>

<script setup>
  import ListTable from '@/components/table/ListTable.vue'
  import { getVariantByRule } from '@/consts/legends'
  import router from '@/router'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
  import { useMissionPlusReportStudents } from '@/views/reports/missionPlus/classe-report/students/useMissionPlusReportStudents'
  import { computed, getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue'

  // Get instance for $bus
  const vm = getCurrentInstance().proxy

  // Students data and table handlers from composable
  const { students, loadingTable, excelLoading, getStudentsData, exportExcel } =
    useMissionPlusReportStudents()
    
  const listTableRef = ref(null)

  const totalData = computed(() => store.getters['ReportMissionPlusStudents/total'])

  const { classe, serie } = useFilters()

  // Get guideId from current route params
  const { guideId } = router.currentRoute.params

  // Table column definitions
  const tableColumns = [
    { key: 'name', label: 'Aluno', class: 'font-bold', sortable: true, searchable: true },
    {
      key: 'performance',
      label: 'RENDIMENTO',
      sortable: true,
      tooltip:
        'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).',
    },
    {
      key: 'totalTime',
      label: 'TEMPO INVESTIDO',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Ações',
      thStyle: { width: '120px' },
    },
  ]

  // Table change handler
  const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
    store.commit('ReportMissionPlusStudents/params', {
      Search: searchQuery,
      OrderBy: sortBy,
      Ascending: `${!isSortDirDesc}`,
      Page: currentPage,
      PageSize: perPage,
    })
    getStudentsData()
  }

  // Reset params and fetch
  const resetAndFetch = () => {
    store.commit('ReportMissionPlusStudents/params', {
      Page: 1,
    })
    listTableRef.value.resetPage()
    getStudentsData()
  }

  // Listen for event bus
  vm.$bus.on('resetAndFetch', () => {
    resetAndFetch()
  })

  // Watch filters and fetch
  onMounted(() => {
    watch([classe, serie], () => {
      resetAndFetch()
    })
    getStudentsData()
  })

  // Table row actions
  const tableActions = [
    {
      icon: 'pie_chart',
      tooltip: () => 'Relatório por aluno',
      isEnabled: item => item.totalTime > 0 && item.performance,
      color: 'text-primary',
      action: data => {
        router.push({
          name: 'reportMissionsPlusStudent',
          params: {
            studentId: data.id,
            guideId,
          },
        })
      },
    },
  ]

  // Cleanup bus listener
  onUnmounted(() => {
    vm.$bus.off('resetAndFetch')
  })
</script>