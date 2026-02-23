<template>
  <section>
    <ListTableSelect
      ref="listTableRef"
      v-model="selectedData"
      :loading="isLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por escola"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      :sort-by="sortBy"
      :sort-desc="orderBy"
      @change="changeListTable"
    >
      <template #cell(institutionName)="{ item }">
        <span class="font-bold">{{ item.institutionName }}</span>
      </template>

      <template #cell(challengesDone)="{ item }">
        <ConditionalValueDisplay :value="item.challengesDone" :layout="'badge'">
          {{ item.challengesDone | formatNumber }}
        </ConditionalValueDisplay>
      </template>

      <template #cell(totalTime)="{ item }">
        <ConditionalValueDisplay :value="item.totalTime" :layout="'badge'">
          {{ item.totalTime | formattedTime }}
        </ConditionalValueDisplay>
      </template>

      <template #cell(performance)="{ item }">
        <PerformanceCell :performance="item.performance" enum="learningPerformance" />
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? `${action.color} cursor-pointer`
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableSelect>
  </section>
</template>

<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import router from '@/router'
import { getNetworkManagerPerformanceExcel } from '@/services/shared/reports/Report.service'
import store from '@/store'
import SemaphoreStatusV2 from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatusV2.vue'
import { saveAs } from 'file-saver'
import { computed, ref, watch } from 'vue'

const selectedData = ref({
  value: [],
  batchAction: 1,
})

const listTableRef = ref(null)

const isLoading = computed(() => store.getters['moduleDashboardSchoolsPerformance/loading'])
const dataTable = computed(() => store.getters['moduleDashboardSchoolsPerformance/dataTable'])
const totalData = computed(() => store.getters['moduleDashboardSchoolsPerformance/totalData'])
const sortBy = computed({
  get() {
    return store.getters['moduleDashboardSchoolsPerformance/params'].OrderBy
  },
  set(value) {
    store.commit('moduleDashboardSchoolsPerformance/setParams', { OrderBy: value })
  },
})
const orderBy = computed({
  get() {
    return !store.getters['moduleDashboardSchoolsPerformance/params'].Ascending
  },
  set(value) {
    store.commit('moduleDashboardSchoolsPerformance/setParams', { Ascending: !value })
  },
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('moduleDashboardSchoolsPerformance/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('moduleDashboardSchoolsPerformance/fetch')
}

const tableColumns = computed(() => {
  const columns = [
    { key: 'institutionName', label: 'Escola', sortable: true, searchable: true },
    { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
    {
      key: 'challengesDone',
      label: 'DESAFIOS REALIZADOS',
      sortable: true,
      searchable: false,
      tooltip:
        'Os desafios são as etapas que compõem uma atividade, desafios que o aluno deve cumprir dentro de um jogo ou quiz.',
    },
    {
      key: 'totalTime',
      label: 'TEMPO INVESTIDO',
      sortable: true,
      searchable: false,
    },
    {
      key: 'performance',
      label: 'RENDIMENTO MÉDIO',
      sortable: true,
      searchable: false,
      tooltip:
        'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios.',
    },
    { key: 'actions', label: 'Ações', sortable: false },
  ]
  return columns
})

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => 'Relatório da escola',
    isEnabled: () => true,
    color: 'text-primary',
    action: data => {
      router.push({
        name: 'dashboardClassesTabsPerformanceNetworkManager',
        params: {
          institutionId: data.institutionId,
        },
      })
    },
  },
]

const networkGroup = computed(
  () => store.getters['moduleDashboardSchoolsPerformance/networkGroup'],
)
const month = computed(() => store.getters['moduleDashboardSchoolsPerformance/month'])

const schoolYear = computed(
  () => store.getters['moduleDashboardSchoolsPerformance/schoolYear'],
)

watch([networkGroup, month, schoolYear], () => {
  store.commit('moduleDashboardSchoolsPerformance/setParams', {
    Page: 1,
  })

  listTableRef.value.resetPage()
  store.dispatch('moduleDashboardSchoolsPerformance/fetch')
})

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true

  const params = {
    NetworkGroupsIds: networkGroup.value.map(item => item.id),
    SerieId: schoolYear.value.id,
    Month: month.value.id,
    InstitutionsIds:
      selectedData.value.batchAction === 2
        ? null
        : selectedData.value.value.map(institution => institution.institutionId),
  }

  getNetworkManagerPerformanceExcel(params)
    .then(response => {
      const fileName = 'Relatório de Desempenho.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const getProgressColorsEnum = value => {
  return getVariantByRule(value, 'learningPerformance')
}
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }
</style>