<template>
  <section>
    <!-- LIST -->
    <ListTable
      ref="listTableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por escola"
      @change="changeListTable"
    >
      <template #cell(serieName)="{ value }">
        <b-badge pill variant="light-primary">
          {{ value }}
        </b-badge>
      </template>
      <template #cell(progress)="{ value }">
        <ProgressBarHorizontalV2
          height="12px"
          :value="value"
          :get-variant="getProgressEnum"
          reverse
        >
        </ProgressBarHorizontalV2>
      </template>

      <template #cell(performance)="{ item }">
        <PerformanceCell :performance="item.performance" />
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
  </section>
</template>

<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getVariantByRule } from '@/consts/legends'
import { proficiencyWithNotCompleted } from '@/consts/legends/proficiencyEnum.js'
import router from '@/router'
import store from '@/store'
import { formatDecimalPlace } from '@/utils/number.js'
import { computed, getCurrentInstance, ref, onMounted, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy
const listTableRef = ref(null)
const cardFocus = ref(null)

// LOADING
const loading = computed(
  () => store.getters['moduleMissionsPlusReportAdminInstitutionsOverview/loading'],
)

// TABLE
const dataTable = computed(
  () => store.getters['moduleMissionsPlusReportAdminInstitutionsOverview/data'],
)
const totalData = computed(
  () => store.getters['moduleMissionsPlusReportAdminInstitutionsOverview/total'],
)

const tableColumns = [
  { key: 'name', label: 'ESCOLA', sortable: true, searchable: true, tdClass: 'font-bold' },
  { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
  {
    key: 'totalGuides',
    label: 'Missões enviadas',
    sortable: true,
    tooltip:
      'Missões enviadas: missões disponibilizadas para os alunos jogarem. Podem ter status “iniciada”, “não iniciada” e “finalizada”.',
  },
  {
    key: 'progress',
    label: 'Progresso Médio',
    sortable: true,
    tooltip:
      'Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/ jogos disponibilizados nas missões.',
  },
  {
    key: 'Performance',
    label: 'Rendimento Médio',
    sortable: true,
    tooltip:
      'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).',
  },
  { key: 'actions', label: 'Ações', sortable: false, thStyle: { width: '120px' } },
]

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => 'Relatório da escola',
    action: data => {
      openReport(data.id)
    },
  },
]

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('moduleMissionsPlusReportAdminInstitutionsOverview/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('moduleMissionsPlusReportAdminInstitutionsOverview/fetch')
}

const openReport = institutionId => {
  router.push({
    name: 'missionsPlusInstitutionsClassesOverview',
    params: { institutionId },
  })
}

onMounted(() => {
  vm.$bus.on('resetPage', () => {
    listTableRef.value.resetPage()
  })
})

onUnmounted(() => {
  vm.$bus.off('resetPage')
})

const getPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}

const getProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}
</script>