<template>
  <section>
    <!-- PAGE TITLE -->
    <PageTitle
      :is-loading="pageLoading"
      :title="evaluationDetails.evaluationName"
      :start-date="evaluationDetails.startDate"
      :end-date="evaluationDetails.endDate"
      :status="evaluationDetails.status"
      :last-update="evaluationDetails.lastUpdate"
      :status-enum="StatusEnum"
    />
    <!-- PAGE FILTERS -->
    <EvaluationsInstitutionsFilters
      v-model="filtersParams"
      :is-loading="pageLoading"
      :network-groups="networkGroupsFilterOptions"
      :exames-options="examesFilterOptions"
    />
    <!-- PAGE DASHBOARD -->
    <EvaluationsInstitutionsDashboard
      :is-loading="pageLoading || dashboardAndTableLoading"
      :data="dashboardData"
    />
    <!-- LIST -->
    <ListTable
      :loading="pageLoading || dashboardAndTableLoading || tableLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      @change="setTableParams"
    >
      <template #cell(institutionName)="{ item }">
        <div class="text-wrap" style="min-width: 200px">
          <span class="align-text-top font-bold">{{ item.institutionName }}</span>
        </div>
      </template>
      <template #cell(networkGroupName)="{ item }">
        <div class="text-wrap" style="min-width: 200px">
          <span class="align-text-top font-bold">{{ item.networkGroupName }}</span>
        </div>
      </template>
      <template #cell(started)="{ item }">
        <SemaphoreStatus :status-enum="getVariantByRule(item.started, 'progress')" has-tooltip>
          <span>{{ item.started | formatNumber }}%</span>
        </SemaphoreStatus>
      </template>
      <template #cell(finished)="{ item }">
        <SemaphoreStatus :status-enum="getVariantByRule(item.finished, 'progress')" has-tooltip>
          <span>{{ item.finished | formatNumber }}%</span>
        </SemaphoreStatus>
      </template>
      <!-- nessa primeira entrega não teremos a informação de Consultor -->
      <!-- <template #cell(consultant)="{item}">
        <div :class="!item.consultant ? 'text-center' : ''">
          <b-avatar v-if="item.consultant" variant="light-primary" :text="item.consultant | abbreviateName" class="mr-1"/>
          <span>{{ item.consultant || '-' }}</span>
        </div>
      </template> -->
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
  import EvaluationsInstitutionsDashboard from './EvaluationsInstitutionsDashboard.vue'
  import EvaluationsInstitutionsFilters from './EvaluationsInstitutionsFilters.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import ListTable from '@/components/table/ListTable.vue'
  import { StatusEnum } from '@/consts/evaluationsEnum.js'
  import { getVariantByRule } from '@/consts/legends/index.js'
  import { progressLegend } from '@/consts/legends/progressEnum.js'
  import { formatNumber } from '@/filters/filters'
  import router from '@/router'
  import {
    getEvaluationDetails,
    getEvaluationInstitutions,
    getEvaluationInstitutionsDashboard,
  } from '@/services/shared/evaluations/Evaluation.Service'
  import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
  import { formatDecimalPlace } from '@/utils/number.js'
  import sortObjectListByKey from '@/utils/sort.js'
  import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
  import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'

  const pageLoading = ref(false)
  const dashboardAndTableLoading = ref(false)
  const tableLoading = ref(false)
  const filtersParams = ref({})
  const evaluationId = router.currentRoute.params.evaluationId
  const evaluationDetails = ref({})
  const networkGroupsFilterOptions = ref([])
  const examesFilterOptions = ref([])
  const dashboardData = ref({})
  const dataTable = ref([])
  const totalData = ref(0)
  const tableParams = ref({})
  const vm = getCurrentInstance().proxy

  const tableColumns = [
    { key: 'institutionName', label: 'Escola', sortable: true },
    { key: 'networkGroupName', label: 'Grupo escolar', sortable: true },
    {
      key: 'totalStudents',
      label: 'Total de alunos',
      sortable: true,
      formatter: value => formatNumber(value),
    },
    { key: 'started', label: 'Iniciaram', sortable: true },
    { key: 'finished', label: 'Finalizaram', sortable: true },
    // { key: 'consultant', label: 'Consultor', sortable: false },
    { key: 'actions', label: 'Ações', sortable: false },
  ]

  const tableActions = [
    {
      icon: 'trending_up',
      tooltip: () => {
        return evaluationDetails.value.status === 4
          ? 'Relatório final'
          : 'Relatório em andamento'
      },
      enableTo: [2, 3, 4],
      action: data => {
        openReport(data.institutionId)
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
    getEvaluationDetails(evaluationId)
      .then(response => {
        evaluationDetails.value = response.data
        const { subjects } = response.data

        if (subjects instanceof Array && subjects.length > 0) {
          examesFilterOptions.value = subjects.map(subject => subject.id)
        } else {
          examesFilterOptions.value = []
        }

        vm.$bus.emit('setBreadcrumb', ['', '', evaluationDetails.value.evaluationName])
      })
      .finally(() => {})
  }

  const fetchNetworkGroups = () => {
    getNetworkGroups()
      .then(response => {
        networkGroupsFilterOptions.value = response.data
        networkGroupsFilterOptions.value.unshift({
          id: null,
          name: 'Todos',
        })
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
    NetworkGroupId: null,
    SubjectId: null,
    Search: '',
    OrderBy: 0,
    Ascending: 'true',
    Page: 1,
    PageSize: 10,
  })

  const fetchEvaluationInstitutionsDashboard = () => {
    urlParams.value = {
      NetworkGroupId: filtersParams.value.NetworkGroupId,
      SubjectId: filtersParams.value.SubjectId,
      Search: tableParams.value?.searchQuery,
      OrderBy: sortByEnum.value[tableParams.value?.sortBy]?.key || '0',
      Ascending: !tableParams.value?.isSortDirDesc || 'false',
      Page: tableParams.value?.currentPage,
      PageSize: tableParams.value?.perPage,
    }
    getEvaluationInstitutionsDashboard(evaluationId, urlParams.value)
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

  const fetchEvaluationIntitutions = () => {
    urlParams.value = {
      NetworkGroupId: filtersParams.value.NetworkGroupId,
      SubjectId: filtersParams.value.SubjectId,
      Search: tableParams.value?.searchQuery,
      OrderBy: sortByEnum.value[tableParams.value?.sortBy]?.key || '0',
      Ascending: !tableParams.value?.isSortDirDesc || 'false',
      Page: tableParams.value?.currentPage,
      PageSize: tableParams.value?.perPage || 10,
    }

    getEvaluationInstitutions(evaluationId, urlParams.value)
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

  const enableAction = evaluationStatus =>
    evaluationDetails.value.status.includes(evaluationStatus)

  const openReport = institutionId => {
    router.push({
      path: `/evaluations/${evaluationId}/institutions/${institutionId}/classes`,
    })
  }

  onMounted(() => {
    pageLoading.value = true
    fetchEvaluationDetails()
    fetchNetworkGroups()
  })

  const setTableParams = params => {
    tableParams.value = params
  }

  watch(filtersParams, () => {
    if (filtersParams.value.NetworkGroupId !== undefined) {
      dashboardAndTableLoading.value = true
      fetchEvaluationIntitutions()
      fetchEvaluationInstitutionsDashboard()
    }
  })

  watch(tableParams, () => {
    tableLoading.value = true
    fetchEvaluationIntitutions()
  })

  const subjectsIds = computed(() =>
    evaluationDetails.value?.subjects?.map(subject => subject.id),
  )

  const legends = [progressLegend]
</script>