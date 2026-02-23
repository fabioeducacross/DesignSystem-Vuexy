<template>
  <section>
    <!-- PAGE TITLE -->
    <PageTitle
      :is-loading="!evaluationDetails"
      :title="evaluationDetails.evaluationName"
      :start-date="evaluationDetails.startDate"
      :end-date="evaluationDetails.endDate"
      :status="evaluationDetails.status"
      :last-update="lastUpdate"
      :status-enum="StatusEnum"
      :subjects-ids="subjectsIds"
    />
    <!-- PAGE FILTERS -->
    <EvaluationsTCTInstitutionsFilters
      v-model="filtersParams"
      :is-loading="loading"
      :network-groups="networkGroupsFilterOptions"
      :exames-options="examesFilterOptions"
    />

    <SubjectBand :subjects-ids="subject.id ? [subject.id] : []"></SubjectBand>

    <!-- PAGE DASHBOARD -->
    <EvaluationsTCTInstitutionsDashboard
      :is-loading="loading || dashboardAndTableLoading"
      :dashboard-data="dashboardData"
    />

    <!--  Cards -->
    <LegendCard :items="LegendStatusEnumCard" :active="cardFocus">
      <template v-for="(d, index) in dashboardData.proficiency" #[`content-${index}`]="{ item }">
        <div :key="index">
          <ProgressBarTopInfo
            v-for="bar in d.content"
            :key="`${bar.key}-${index}`"
            :value="bar.percentage"
            :variant="item.variant"
            :label="bar.key"
            :tooltip="`${bar.students} alunos`"
          ></ProgressBarTopInfo>
        </div>
      </template>
    </LegendCard>

    <!-- LIST -->
    <ListTable
      :loading="loading || dashboardAndTableLoading || tableLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por escola"
      @change="changeListTable"
    >
      <template #cell(institutionName)="{ item }">
        <div class="text-wrap" style="min-width: 200px">
          <span class="align-text-top font-bold">{{ item.institutionName }}</span>
        </div>
      </template>
      <template #cell(hits)="{ item }">
        <ConditionalValueDisplay :value="item.hits" layout="badge">
          <PerformanceCell :performance="item.hits" />
        </ConditionalValueDisplay>
      </template>
      <template #cell(started)="{ item }">
        <!-- :value="calcPercent(item.started, item.totalStudents)" -->
        <ProgressBarHorizontalV2
          :value="item.startedStudents"
          :max="item.totalStudents"
          :get-variant="getParticipationStatusEnum"
          values-divisor=" de "
          show-values
          height="12px"
        />
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="item.hits != null ? action.tooltip(item) : textTooltipEmpty"
            :class="['material-symbols-outlined', 'text-primary', setCursor(item)]"
            @click="item.hits != null ? action.action(item) : ''"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTable>
    <!-- <Legend /> -->
    <LegendEnum :legends="legends" />
    <portal to="fixed-sticky-footer-destination">
      <div class="bg-white p-1 gap-2 d-flex justify-content-center">
        <b-button
          variant="outline-primary"
          size="sm"
          class="d-flex align-items-center"
          :class="{ 'cursor-not-allowed': generatingExcel || loading }"
          style="height: 44px"
          :disabled="generatingExcel || loading"
          @click="exportToExcel"
        >
          <div class="d-flex align-items-center justify-content-center gap-2">
            <b-spinner v-if="generatingExcel" small></b-spinner>
            <span v-if="!generatingExcel" class="material-symbols-outlined" style="font-size: 22px">
              ios_share</span
            >
            <span>Exportar em Excel</span>
          </div>
        </b-button>
        <div
          v-if="pdfDownloadButtonConfig.visible"
          v-b-tooltip.hover.top="pdfDownloadButtonConfig.tooltip"
        >
          <b-button
            class="button d-flex align-items-center justify-content-center gap-2"
            variant="primary"
            :disabled="pdfDownloadButtonConfig.disabled"
            :class="{ 'cursor-not-allowed': pdfDownloadButtonConfig.disabled }"
            style="height: 44px"
            @click="handleOpenReportPDFModal"
          >
            <span class="material-symbols-outlined" style="font-size: 22px"> picture_as_pdf </span>
            Exportar em PDF
          </b-button>
        </div>
      </div>
    </portal>
    <ReportPDFModal v-model="openReportPDFModal" is-institution />
  </section>
</template>

<script setup>
import EvaluationsTCTInstitutionsDashboard from './EvaluationsTCTInstitutionsDashboard.vue'
import EvaluationsTCTInstitutionsFilters from './EvaluationsTCTInstitutionsFilters.vue'
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import LegendCard from '@/components/legends/LegendCard.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ProgressBarTopInfo from '@/components/progessBar/ProgressBarTopInfo.vue'
import SubjectBand from '@/components/subjects/SubjectBand.vue'
import ListTable from '@/components/table/ListTable.vue'
import {
  PerformanceEnum,
  ParticipationStatusEnum,
  getParticipationStatusEnum,
  getPerformanceEnum,
  LegendStatusEnumCard,
  StatusEnum,
} from '@/consts/evaluationsEnum.js'
import router from '@/router'
import {
  getEvaluationTCTDashboard,
  getEvaluationTCTInstitutions,
  getEvaluationTCTInstitutionsExcel,
} from '@/services/shared/evaluations/Evaluation.Service'
import { getNetworkGroupsEvaluationNetworkManager } from '@/services/shared/network-groups/NetworkGroups.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { calcPercent, formatDecimalPlace } from '@/utils/number.js'
import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
import ReportPDFModal from '@/views/pages/admin-context/evaluations/components/ReportPDFModal.vue'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, reactive, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy

// LOADING
const loading = ref(true)
const dashboardAndTableLoading = ref(true)
const tableLoading = ref(true)
const evaluationId = router.currentRoute.params.evaluationId
const { subject } = useFilters()
const cardFocus = ref(null)
const hasMultipleGroups = ref(true)
const isAllGroupsSelected = ref(true)
const { pdfDownloadButtonConfig } = useEvaluation()

const textTooltipEmpty = 'O relatório será liberado quando pelo menos 1 aluno tiver jogado.'

// PAGE TITLE
store
  .dispatch('evaluations/setEvaluationData', {
    evaluationId,
  })
  .then(() => {
    vm.$bus.emit('setBreadcrumb', ['', '', store.getters['evaluations/evaluationName']])
    vm.$bus.emit('setTabTitle', store.state.access.userData.InstitutionName)
  })
const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])
const lastUpdate = computed(() => store.getters['evaluations/lastUpdate'])

// PAGE FILTERS
const filtersParams = ref({
  NetworkGroupId: null,
})

const networkGroupsFilterOptions = ref([])

const fetchNetworkGroups = () => {
  getNetworkGroupsEvaluationNetworkManager(evaluationId).then(response => {
    hasMultipleGroups.value = response.data.filter(item => item.id).length > 1
    store.commit(
      'evaluations/setNetworkGroups',
      response.data.filter(item => item.id),
    )
    networkGroupsFilterOptions.value = response.data
    networkGroupsFilterOptions.value.unshift({
      id: null,
      name: 'Todos os grupos',
    })
  })
}

fetchNetworkGroups()

const examesFilterOptions = computed(() => store.getters['evaluations/exames'])

// PAGE DASHBOARD
const dashboardData = reactive({
  students: {},
  serieProgress: {
    series: [],
    categories: [],
    colors: [],
  },
  serieHit: {
    series: [],
    categories: [],
    colors: [],
  },
  proficiency: [],
})

const filterProficiencyForLegend = proficiency => {
  if (!Array.isArray(proficiency)) return []

  const shouldRemoveGroup = !hasMultipleGroups.value || isAllGroupsSelected.value

  if (!shouldRemoveGroup) return proficiency

  return proficiency.map(p => ({
    ...p,
    content: Array.isArray(p.content) ? p.content.filter(it => it.key !== 'Grupo') : [],
  }))
}

const fetchEvaluationInstitutionsDashboard = () => {
  dashboardAndTableLoading.value = true
  getEvaluationTCTDashboard(evaluationId, {
    ...filtersParams.value,
    SubjectId: subject.value.id,
  })
    .then(response => {
      dashboardData.serieProgress = generateChartProgress(response.data.serieProgress)
      dashboardData.serieHit = generateChartConfigHit(response.data.serieHit)
      dashboardData.students = {
        studentsStarted: response.data.studentsStarted,
        totalStudents: response.data.totalStudents,
      }
      store.dispatch('evaluations/setLastUpdate', response.data.lastUpdate)
      dashboardData.proficiency = filterProficiencyForLegend(response.data.proficiency)
      cardFocus.value = defineCardFocus()
    })
    .finally(() => {
      dashboardAndTableLoading.value = false
    })
}

const generateChartConfigHit = serieHit => {
  const series = [{ data: [], name: 'Questões acertadas' }]
  const categories = []
  const colors = []

  if (!serieHit.length) {
    return {
      series,
      categories,
      colors,
    }
  }

  serieHit.forEach(item => {
    series[0].data.push(item.percentage)
    categories.push(item.serieName)

    const variant = getPerformanceEnum(item.percentage).variant
    colors.push(variant)
  })

  return {
    series,
    categories,
    colors,
  }
}

const generateChartProgress = serieProgressArray => {
  const series = [{ data: [], name: 'Alunos participantes' }]
  const categories = []
  const colors = []

  if (!serieProgressArray.length) {
    return {
      series,
      categories,
      colors,
    }
  }

  serieProgressArray.forEach(item => {
    series[0].data.push(item.started)
    categories.push(item.serieName)

    const variant = getParticipationStatusEnum(item.started).variant
    colors.push(variant)
  })

  return {
    series,
    categories,
    colors,
  }
}

// TABLE
const dataTable = ref([])
const totalData = ref(0)

const tableColumns = [
  { key: 'institutionName', label: 'Escola', sortable: true },
  { key: 'networkGroupName', label: 'Grupo escolar', sortable: true },
  {
    key: 'started',
    label: 'Participação Dos Alunos',
    sortable: true,
  },
  {
    key: 'hits',
    label: 'Rendimento Médio',
    sortable: true,
  },
  { key: 'actions', label: 'Ações', sortable: false },
]

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => {
      return evaluationDetails.value.status === 4
        ? 'Relatório da Escola'
        : 'Relatório em andamento'
    },
    enableTo: [2, 3, 4],
    action: data => {
      openReport(data.institutionId)
    },
  },
]

const params = ref({
  NetworkGroupId: null,
  SubjectId: null,
  SerieId: null,
  Search: '',
  OrderBy: 0,
  Ascending: 'true',
  Page: 1,
  PageSize: 10,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    ...filtersParams.value,
    SubjectId: subject.value.id,
    Search: searchQuery,
    OrderBy: sortByEnum.value[sortBy]?.key || '0',
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  }

  fetchData()
}

const fetchData = () => {
  tableLoading.value = true
  getEvaluationTCTInstitutions(evaluationId, params.value)
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
      tableLoading.value = false
    })
}

const openReportPDFModal = ref(false)

const handleOpenReportPDFModal = () => {
  if (pdfDownloadButtonConfig.disabled) return

  openReportPDFModal.value = true
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getEvaluationTCTInstitutionsExcel(evaluationId, {
    NetworkGroupId: params.value.NetworkGroupId,
    SubjectId: params.value.SubjectId,
    Search: params.value.Search,
    SerieId: params.value.SerieId,
  })
    .then(response => {
      const fileText = store.getters['evaluations/evaluationName']

      const fileName = `Avaliação Digital - Análise TCT - ${fileText}.xlsx`

      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const enableAction = evaluationStatus =>
  evaluationDetails.value.status.includes(evaluationStatus)

const openReport = institutionId => {
  router.push({
    name: 'evaluationsTCTInstutionsClassAnalysis',
    params: { evaluationId, institutionId },
  })
}

const defineCardFocus = () => {
  let highIndex = null
  const contentIndex = filtersParams.value.NetworkGroupId ? 0 : 1
  let highCount = 0

  // Safely extract percentages, preferring the desired index; if absent, pick first non-'Grupo', then first item
  const percentages = dashboardData.proficiency.map(p => {
    const content = Array.isArray(p.content) ? p.content : []
    const candidate =
      content[contentIndex] ?? content.find(it => it && it.key !== 'Grupo') ?? content[0]
    const val = candidate?.percentage
    return typeof val === 'number' ? val : null
  })

  const validValues = percentages.filter(v => v != null)
  if (!validValues.length) return null

  const highValue = Math.max(...validValues)

  // get the index of the highest value
  dashboardData.proficiency.forEach((p, index) => {
    const content = Array.isArray(p.content) ? p.content : []
    const candidate =
      content[contentIndex] ?? content.find(it => it && it.key !== 'Grupo') ?? content[0]
    const val = candidate?.percentage
    if (val === highValue) {
      highCount++
      highIndex = index
    }
  })

  return highCount > 1 ? null : highIndex
}

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
  hits: {
    key: 4,
    value: 'Hits',
  },
})

watch([filtersParams], () => {
  if (!filtersParams.value.SubjectId) return
  isAllGroupsSelected.value = filtersParams.value.NetworkGroupId == null

  params.value.NetworkGroupId = filtersParams.value.NetworkGroupId
  params.value.SubjectId = filtersParams.value.SubjectId
  params.value.SerieId = filtersParams.value.SerieId
  fetchEvaluationInstitutionsDashboard()
  fetchData()
})

const legends = [
  {
    text: 'Participação',
    enum: ParticipationStatusEnum,
  },
  {
    text: 'Rendimento',
    enum: PerformanceEnum,
  },
]

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)

const setCursor = item => (item.hits != null ? 'cursor-pointer' : 'cursor-not-allowed')
</script>