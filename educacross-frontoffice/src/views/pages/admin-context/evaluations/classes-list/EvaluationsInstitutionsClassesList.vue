<template>
  <section>
    <PageTitle
      :is-loading="pageLoading"
      :title="evaluationDetails.evaluationName"
      :start-date="evaluationDetails.startDate"
      :end-date="evaluationDetails.endDate"
      :status="evaluationDetails.status"
      :last-update="evaluationDetails.lastUpdate"
      :status-enum="StatusEnum"
    />
    <EvaluationsInstitutionsClassesFilters
      v-model="filtersParams"
      :is-loading="pageLoading"
      :series-options="seriesFilterOptions"
      :exames-options="examesFilterOptions"
    />
    <EvaluationsInstitutionsClassesDashboard
      :is-loading="pageLoading || dashboardAndTableLoading"
      :data="dashboardData"
    />
    <ListTable
      :loading="pageLoading || dashboardAndTableLoading || tableLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      @change="setTableParams"
    >
      <template #cell(className)="{ item }">
        <div class="text-wrap" style="min-width: 200px">
          <span class="align-text-top font-bold">{{ item.className }}</span>
        </div>
      </template>
      <template #cell(serieName)="{ item }">
        <div class="text-wrap">
          <b-badge pill variant="light-primary">
            {{ item.serieName }}
          </b-badge>
        </div>
      </template>
      <template #cell(started)="{ item }">
        <SemaphoreStatus
          :status-enum="getVariantByRule(formatDecimalPlace(item.started), 'progress')"
          has-tooltip
        >
          <span>{{ formatDecimalPlace(item.started) | formatPercentToPtBr }}</span>
        </SemaphoreStatus>
      </template>
      <template #cell(finished)="{ item }">
        <SemaphoreStatus
          :status-enum="getVariantByRule(formatDecimalPlace(item.finished), 'progress')"
          has-tooltip
        >
          <span>{{ formatDecimalPlace(item.finished) | formatPercentToPtBr }}</span>
        </SemaphoreStatus>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item)"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click="action.action(item)"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTable>
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import PageTitle from '../components/PageTitle.vue'
import EvaluationsInstitutionsClassesDashboard from './EvaluationsInstitutionsClassesDashboard.vue'
import EvaluationsInstitutionsClassesFilters from './EvaluationsInstitutionsClassesFilters.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ListTable from '@/components/table/ListTable.vue'
import { StatusEnum } from '@/consts/evaluationsEnum.js'
import { getVariantByRule } from '@/consts/legends/index.js'
import { progressLegend } from '@/consts/legends/progressEnum.js'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import {
  getEvaluationDetails,
  getEvaluationInstitutionsClasses,
  getEvaluationInstitutionsClassesDashboard,
} from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import { formatDecimalPlace } from '@/utils/number.js'
import sortObjectListByKey from '@/utils/sort.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'

const pageLoading = ref(false)
const dashboardAndTableLoading = ref(false)
const tableLoading = ref(false)
const filtersParams = ref({})
const evaluationId = router.currentRoute.params.evaluationId
const institutionId = router.currentRoute.params.institutionId
const evaluationDetails = ref({})
const seriesFilterOptions = ref([])
const examesFilterOptions = ref([])
const dashboardData = ref({})
const dataTable = ref([])
const totalData = ref(0)
const tableParams = ref({})
const vm = getCurrentInstance().proxy

const tableColumns = [
  { key: 'className', label: 'Turma', sortable: true },
  { key: 'serieName', label: 'Ano Escolar', sortable: true },
  {
    key: 'totalStudents',
    label: 'Total de alunos',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  { key: 'started', label: 'Iniciaram', sortable: true },
  { key: 'finished', label: 'Finalizaram', sortable: true },
  { key: 'actions', label: 'Ações', sortable: false },
]

const tableActions = [
  {
    icon: 'trending_up',
    tooltip: data => (data.status === 4 ? 'Relatório final' : 'Relatório em andamento'),
    enableTo: [2, 3, 4],
    action: data => {
      openReport(data.classId)
    },
  },
]

const sortByEnum = ref({
  institutionName: {
    key: 0,
    value: 'Institution',
  },
  networkGroupName: {
    key: 1,
    value: 'NetworkGroup',
  },
  totalStudents: {
    key: 2,
    value: 'TotalStudents',
  },
  started: {
    key: 3,
    value: 'Started',
  },
  finished: {
    key: 4,
    value: 'Finished',
  },
})

const fetchEvaluationDetails = () => {
  getEvaluationDetails(evaluationId, {
    InstitutionId: institutionId,
  })
    .then(response => {
      evaluationDetails.value = response.data
      seriesFilterOptions.value = response.data.series
      seriesFilterOptions.value.unshift({
        id: null,
        name: 'Todos os anos',
      })

      const { subjects } = response.data

      if (subjects instanceof Array && subjects.length > 0) {
        examesFilterOptions.value = subjects.map(subject => subject.id)
      } else {
        examesFilterOptions.value = []
      }

      const breadcrumb = ['', '', evaluationDetails.value.evaluationName]
      if (isNetworkManager) {
        breadcrumb.push(evaluationDetails.value.institutionName)
      }
      vm.$bus.emit('setBreadcrumb', breadcrumb)
    })
    .finally(() => {})
}

const generateChartData = serieProgressArray => {
  const newArray = sortObjectListByKey(serieProgressArray, 'serieName')

  const startedArray = []
  const finishedArray = []
  const chartColumnLabel = []

  if (!serieProgressArray.length) {
    return {
      startedArray: [0],
      finishedArray: [0],
      chartColumnLabel: [''],
    }
  }

  newArray.forEach(item => {
    startedArray.push(formatDecimalPlace(item.started))
    finishedArray.push(formatDecimalPlace(item.finished))
    chartColumnLabel.push(item.serieName)
  })

  return {
    startedArray,
    finishedArray,
    chartColumnLabel,
  }
}

const urlParams = ref({
  SubjectId: null,
  Search: '',
  OrderBy: 0,
  Ascending: 'true',
  Page: 1,
  PageSize: 10,
})

const fetchEvaluationInstitutionsClassesDashboard = () => {
  urlParams.value = {
    InstitutionId: institutionId,
    SerieId: filtersParams.value.SerieId,
    SubjectId: filtersParams.value.SubjectId,
    Search: tableParams.value?.searchQuery,
    OrderBy: sortByEnum.value[tableParams.value?.sortBy]?.key || '0',
    Ascending: !tableParams.value?.isSortDirDesc || 'false',
    Page: tableParams.value?.currentPage,
    PageSize: tableParams.value?.perPage,
  }

  getEvaluationInstitutionsClassesDashboard(evaluationId, urlParams.value)
    .then(response => {
      dashboardData.value = response.data
      const horizontalBarChartSeries = generateChartData(response.data.serieProgress)
      dashboardData.value = {
        ...dashboardData.value,
        horizontalBarChartSeries,
      }
      evaluationDetails.value = {
        ...evaluationDetails.value,
        lastUpdate: response.data.lastUpdate,
      }
    })
    .finally(() => {})
}

const fetchEvaluationIntitutionsClasses = () => {
  urlParams.value = {
    InstitutionId: institutionId,
    SerieId: filtersParams.value.SerieId,
    SubjectId: filtersParams.value.SubjectId,
    Search: tableParams.value?.searchQuery,
    OrderBy: sortByEnum.value[tableParams.value?.sortBy]?.key || '0',
    Ascending: !tableParams.value?.isSortDirDesc || 'false',
    Page: tableParams.value?.currentPage,
    PageSize: tableParams.value?.perPage || 10,
  }

  getEvaluationInstitutionsClasses(evaluationId, urlParams.value)
    .then(response => {
      const { data } = response
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      pageLoading.value = false
      dashboardAndTableLoading.value = false
      tableLoading.value = false
    })
}

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const openReport = classId => {
  if (isNetworkManager) {
    router.push({
      path: `/evaluations/${evaluationId}/institutions/${institutionId}/classes/${classId}/students`,
    })
  } else {
    router.push({
      path: `/evaluations/${evaluationId}/classes/${classId}/students`,
    })
  }
}

onMounted(() => {
  pageLoading.value = true
  fetchEvaluationDetails()
})

const setTableParams = params => {
  tableParams.value = params
}

watch(filtersParams, () => {
  if (filtersParams.value.SerieId !== undefined) {
    dashboardAndTableLoading.value = true
    fetchEvaluationIntitutionsClasses()
    fetchEvaluationInstitutionsClassesDashboard()
  }
})

watch(tableParams, () => {
  tableLoading.value = true
  fetchEvaluationIntitutionsClasses()
})

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)

const legends = [progressLegend]
</script>