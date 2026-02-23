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
    <EvaluationsTCTClassFilters
      v-model="filtersParams"
      :is-loading="loading"
      :series="seriesFilterOptions"
      :exames-options="examesFilterOptions"
    />
    <SubjectBand :subjects-ids="selectedSubjectIdArr"></SubjectBand>

    <!-- PAGE DASHBOARD -->
    <EvaluationsTCTClassDashboard
      :is-loading="loading || dashboardAndTableLoading"
      :data="dashboardData"
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
      ref="refListTable"
      :loading="loading || dashboardAndTableLoading || tableLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por turma"
      @change="changeListTable"
    >
      <template #cell(className)="{ item }">
        <div class="text-wrap" style="min-width: 200px">
          <span class="align-text-top font-bold">{{ item.className }}</span>
        </div>
      </template>
      <template #cell(serieName)="{ item }">
        <div>
          <b-badge variant="light-primary" pill>{{ item.serieName }}</b-badge>
        </div>
      </template>
      <template #cell(started)="{ item }">
        <ProgressBarHorizontalV2
          :value="item.startedStudents"
          :max="item.totalStudents"
          :get-variant="getParticipationStatusEnum"
          values-divisor=" de "
          show-values
          height="12px"
        />
      </template>
      <template #cell(hits)="{ item }">
        <ConditionalValueDisplay :value="item.hits" layout="badge">
          <PerformanceCell :performance="item.hits" />
        </ConditionalValueDisplay>
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
              ios_share
            </span>
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
    <ReportPDFModal v-model="openReportPDFModal" />
  </section>
</template>

<script setup>
import PageTitle from '../../../components/PageTitle.vue'
import EvaluationsTCTClassDashboard from './EvaluationsTCTClassDashboard.vue'
import EvaluationsTCTClassFilters from './EvaluationsTCTClassFilters.vue'
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
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import {
  getEvaluationTCTClasses,
  getEvaluationTCTClassesExcel,
  getEvaluationTCTInstitutionDashboard,
} from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import { formatDecimalPlace } from '@/utils/number.js'
import ReportPDFModal from '@/views/pages/admin-context/evaluations/components/ReportPDFModal.vue'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy
const refListTable = ref(null)

// LOADING
const loading = ref(true)
const dashboardAndTableLoading = ref(true)
const tableLoading = ref(true)
const cardFocus = ref(null)

const evaluationId = router.currentRoute.params.evaluationId
const institutionId = router.currentRoute.params.institutionId

const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const { pdfDownloadButtonConfig } = useEvaluation()

const networkGroups = computed(() => store.getters['evaluations/networkGroups'])
const textTooltipEmpty = 'O relatório será liberado quando pelo menos 1 aluno tiver jogado.'

// PAGE TITLE
store
  .dispatch('evaluations/setEvaluationData', {
    evaluationId,
    institutionId,
  })
  .then(() => {
    const breadcrumb = ['', '', store.getters['evaluations/evaluationName']]
    if (isNetworkManager) {
      breadcrumb.push(store.getters['evaluations/institutionName'])
    }
    vm.$bus.emit('setBreadcrumb', breadcrumb)
    vm.$bus.emit('setTabTitle', store.getters['evaluations/institutionName'])
  })

const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])
const lastUpdate = computed(() => store.getters['evaluations/lastUpdate'])

// PAGE FILTERS
const filtersParams = ref({
  SerieId: null,
  SubjectId: null,
})
const examesFilterOptions = computed(() => [...store.getters['evaluations/exames']])
const seriesFilterOptions = computed(() => [
  {
    id: null,
    name: 'Todas as provas',
  },
  ...store.getters['evaluations/series'],
])

const subjectsIds = computed(() => examesFilterOptions.value?.map(subject => subject.id))
const selectedSubjectIdArr = computed(() => {
  return filtersParams.value.SubjectId ? [filtersParams.value.SubjectId] : []
})

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
})
const hasMultipleGroups = computed(() => networkGroups.value.length > 1)

const fetchEvaluationInstitutionsDashboard = () => {
  if (!filtersParams.value.SubjectId) {
    return
  }

  const filterProficiencyForLegend = proficiency => {
    if (!Array.isArray(proficiency)) return []

    if (hasMultipleGroups.value) return proficiency

    return proficiency.map(p => ({
      ...p,
      content: Array.isArray(p.content) ? p.content.filter(it => it.key !== 'Grupo') : [],
    }))
  }

  getEvaluationTCTInstitutionDashboard(evaluationId, {
    InstitutionId: institutionId,
    SerieId: filtersParams.value.SerieId,
    SubjectId: filtersParams.value.SubjectId,
  })
    .then(response => {
      dashboardData.serieProgress = generateSerieProgressChartData(response.data.started)
      dashboardData.serieHit = generateSerieHitChartData(response.data.hits)
      dashboardData.students = {
        studentsStarted: response.data.studentsStarted,
        totalStudents: response.data.totalStudents,
      }
      dashboardData.proficiency = filterProficiencyForLegend(response.data.proficiency)
      store.dispatch('evaluations/setLastUpdate', response.data.lastUpdate)
      cardFocus.value = defineCardFocus()
    })
    .finally(() => {
      dashboardAndTableLoading.value = false
    })
}

const defineCardFocus = () => {
  let highIndex = null
  const contentIndex = 0
  let highCount = 0

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

const filterSerieProgressData = serieProgressArray => {
  if (!hasMultipleGroups.value) {
    return serieProgressArray.filter(item => item.key !== 'Grupo')
  }
  return serieProgressArray
}

const generateSerieProgressChartData = serieProgressArray => {
  const series = [{ data: [], name: 'Alunos participantes' }]
  const categories = []
  const colors = []

  if (!serieProgressArray) return { series, categories, colors }

  filterSerieProgressData(serieProgressArray).forEach(item => {
    series[0].data.push(item.started)
    categories.push(item.key)
    colors.push(getParticipationStatusEnum(item.started).variant)
  })

  return {
    series,
    categories,
    colors,
  }
}

const generateSerieHitChartData = serieProgressArray => {
  const series = [{ data: [], name: 'Questões acertadas' }]
  const categories = []
  const colors = []

  if (!serieProgressArray) return { series, categories, colors }

  filterSerieProgressData(serieProgressArray).forEach(item => {
    series[0].data.push(item.percentage)
    categories.push(item.key)
    colors.push(getPerformanceEnum(item.percentage).variant)
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
  { key: 'className', label: 'Turma', sortable: true },
  { key: 'serieName', label: 'Ano Escolar', sortable: true },
  {
    key: 'started',
    label: 'Participação Dos Alunos',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  {
    key: 'started',
    label: 'Participação',
    sortable: true,
    tooltip: () => 'Iniciaram ao menos 1 prova.',
    formatter: value => `${formatNumber(value)}%`,
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
        ? 'Relatório da turma'
        : 'Relatório em andamento'
    },
    enableTo: [2, 3, 4],
    action: data => {
      openReport(data.classId)
    },
  },
]

const params = ref({
  InstitutionId: institutionId,
  SerieId: null,
  SubjectId: null,
  Search: '',
  OrderBy: 0,
  Ascending: 'true',
  Page: 1,
  PageSize: 10,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    InstitutionId: institutionId,
    SerieId: filtersParams.value.SerieId,
    SubjectId: filtersParams.value.SubjectId,
    Search: searchQuery,
    OrderBy: sortByEnum.value[sortBy]?.key || '0',
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  }

  fetchData()
}

const fetchData = () => {
  if (!filtersParams.value.SubjectId) {
    return
  }

  tableLoading.value = true
  getEvaluationTCTClasses(evaluationId, params.value)
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
      tableLoading.value = false
    })
}

const openReport = classId => {
  if (isNetworkManager) {
    router.push({
      name: 'evaluationsTCTInstutionsStudentsAnalysis',
      params: { evaluationId, institutionId, classId },
    })
  } else {
    router.push({
      name: 'evaluationsTCTStudentsAnalysis',
      params: { evaluationId, classId },
    })
  }
}
const sortByEnum = ref({
  className: {
    key: 0,
    value: 'Class',
  },
  serieName: {
    key: 1,
    value: 'Serie',
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

const setCursor = item => (item.hits != null ? 'cursor-pointer' : 'cursor-not-allowed')

onMounted(() => {
  fetchEvaluationInstitutionsDashboard()
  fetchData()

  const breadcrumb = ['', '', store.getters['evaluations/evaluationName']]
  if (isNetworkManager) {
    breadcrumb.push(store.getters['evaluations/institutionName'])
  }
  vm.$bus.emit('setBreadcrumb', breadcrumb)
})

watch(filtersParams, (newValue, oldValue) => {
  if (newValue.SerieId !== oldValue.SerieId || newValue.SubjectId !== oldValue.SubjectId) {
    if (refListTable.value) refListTable.value.resetPage()
    params.value.Page = 1

    params.value.SerieId = filtersParams.value.SerieId
    params.value.SubjectId = filtersParams.value.SubjectId
    dashboardAndTableLoading.value = true
    fetchEvaluationInstitutionsDashboard()
    fetchData()
  }
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

const openReportPDFModal = ref(false)

const handleOpenReportPDFModal = () => {
  if (pdfDownloadButtonConfig.disabled) return

  openReportPDFModal.value = true
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getEvaluationTCTClassesExcel(evaluationId, {
    SerieId: params.value.SerieId,
    SubjectId: params.value.SubjectId,
    Search: params.value.Search,
    InstitutionId: institutionId,
  })
    .then(response => {
      const data = [store.getters['evaluations/evaluationName']]
      if (isNetworkManager) {
        data.push(store.getters['evaluations/institutionName'])
      }

      const fileText = data.join(' - ')

      const fileName = `Avaliação Digital - Análise TCT - ${fileText}.xlsx`
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

</script>