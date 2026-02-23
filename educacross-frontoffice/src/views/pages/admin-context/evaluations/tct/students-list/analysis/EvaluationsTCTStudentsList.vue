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

    <!-- align center -->
    <b-card>
      <SelectSubject :fetch-on-mounted="false" />
    </b-card>

    <SubjectBand :subjects-ids="subject.id ? [subject.id] : []"></SubjectBand>

    <!-- PAGE DASHBOARD -->
    <EvaluationsTCTStudentsDashboard
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
    <ListTableLocalSorting
      :loading="loading || tableLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      search-placeholder="searchForStudent"
    >
      <template #head()="item">
        <div class="d-flex align-items-center gap-1">
          <span class="text-uppercase" v-html="item.label"></span>
          <span
            v-if="item.field.tooltip"
            v-b-tooltip.hover.top.html="item.field.tooltip"
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <template #cell(studentName)="{ item }">
        <div
          v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
          class="text-md-nowrap d-flex align-items-center flex-wrap flex-md-nowrap gap-2"
        >
          <span
            v-b-tooltip.hover.top="`Detalhes do aluno`"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click="details(item.studentId)"
          >
            visibility
          </span>
          <span class="align-text-top text-primary">{{ item.studentName }}</span>
        </div>
        <span v-else class="font-weight-bolder">{{ item.studentName }}</span>
      </template>

      <template #cell(progress)="{ value }">
        <ProgressBarHorizontalV2
          show-values
          height="12px"
          :value="value.questionsAnswered"
          :max="value.question"
          :get-variant="getParticipationStatusEnum"
          values-divisor=" de "
        >
          <template v-slot:description>&nbsp;questões</template>
        </ProgressBarHorizontalV2>
      </template>
      <template #cell(performance)="{ value }">
        <ConditionalValueDisplay :value="value.rightAnswers" layout="badge">
          <PerformanceCell v-b-tooltip="value.rightAnswers" :performance="value.percentage" />
        </ConditionalValueDisplay>
      </template>
    </ListTableLocalSorting>
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
            @click="fetchEvaluationPDFStudentsReport"
          >
            <b-spinner v-if="loadingReport" variant="light" small />
            <span v-else class="material-symbols-outlined" style="font-size: 22px">
              picture_as_pdf
            </span>
            Exportar em PDF
          </b-button>
        </div>
      </div>
    </portal>
  </section>
</template>

<script setup>
import EvaluationsTCTStudentsDashboard from './EvaluationsTCTStudentsDashboard.vue'
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import LegendCard from '@/components/legends/LegendCard.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ProgressBarTopInfo from '@/components/progessBar/ProgressBarTopInfo.vue'
import SubjectBand from '@/components/subjects/SubjectBand.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { PerformanceEnum, LegendStatusEnumCard, StatusEnum, getParticipationStatusEnum, ParticipationStatusEnum, getPerformanceEnum } from '@/consts/evaluationsEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters.js'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { useRoute, useRouter } from 'vue-router/composables'
import { getEvaluationTCTClassDashboard, getEvaluationTCTStudents, getEvaluationTCTStudentsExcel, getEvaluationTCTReportPDF } from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { calcPercent, formatDecimalPlace } from '@/utils/number.js'
import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, reactive, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy

// LOADING
const loading = ref(true)
const dashboardAndTableLoading = ref(true)
const tableLoading = ref(true)

const loadingReport = ref(false)

const route = useRoute()
const router = useRouter()
const evaluationId = route.params.evaluationId
const { classe, subject } = useFilters()
const cardFocus = ref(null)
const classId = route.params.classId
const institutionId = route.params.institutionId

const networkGroups = computed(() => store.getters['evaluations/networkGroups'])
const hasMultipleGroups = computed(() => networkGroups.value.length > 1)
const { pdfDownloadButtonConfig } = useEvaluation()

// PAGE TITLE 1 request
store
  .dispatch('evaluations/setEvaluationData', {
    evaluationId,
    classId: classId || classe.value.ClassId,
    institutionId,
  })
  .then(() => {
    const breadcrumb = ['', '', store.getters['evaluations/evaluationName']]

    if (vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
      breadcrumb.push(store.getters['evaluations/institutionName'])
    }

    breadcrumb.push(store.getters['evaluations/className'])

    vm.$bus.emit('setBreadcrumb', breadcrumb)
    vm.$bus.emit('setTabTitle', store.getters['evaluations/className'])
  })
const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])
const lastUpdate = computed(() => store.getters['evaluations/lastUpdate'])

// PAGE DASHBOARD
const dashboardData = reactive({
  students: {},
  serieProgress: {},
  serieHit: {},
})

const fetchEvaluationPDFStudentsReport = () => {
  if (!subject.value.id || pdfDownloadButtonConfig.disabled) return

  loadingReport.value = true

  getEvaluationTCTReportPDF(evaluationId, {
    ClassId: classId || classe.value.ClassId,
    institutionId,
  })
    .then(response => {
      saveAs(response.data, evaluationDetails.value.evaluationName)
      vm.$toast({
        component: Toast,
        props: {
          text: 'Exportado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
    })
    .finally(() => {
      loadingReport.value = false
    })
}

const fetchEvaluationInstitutionsDashboard = () => {
  if (!subject.value.id) return

  dashboardAndTableLoading.value = true

  const filterProficiencyForLegend = proficiency => {
    if (!Array.isArray(proficiency)) return []

    if (hasMultipleGroups.value) return proficiency

    return proficiency.map(p => ({
      ...p,
      content: Array.isArray(p.content) ? p.content.filter(it => it.key !== 'Grupo') : [],
    }))
  }

  getEvaluationTCTClassDashboard(evaluationId, {
    ClassId: classId || classe.value.ClassId,
    SubjectId: subject.value.id,
    institutionId,
  })
    .then(response => {
      dashboardData.serieProgress = generateSerieProgressChartData(response.data.started)
      dashboardData.serieHit = generateSerieHitChartData(response.data.hits)
      dashboardData.students = {
        studentsStarted: response.data.studentsStarted,
        totalStudents: response.data.totalStudents,
      }
      dashboardData.proficiency = filterProficiencyForLegend(response.data.proficiency)
      cardFocus.value = defineCardFocus()

      store.dispatch('evaluations/setLastUpdate', response.data.lastUpdate)
    })
    .finally(() => {
      dashboardAndTableLoading.value = false
    })
}

const defineCardFocus = () => {
  let highIndex = null
  const contentIndex = 0
  let highCount = 0

  // get the highest proficiency value from dashboardData.proficiency[x].content[0].percentage from all proficiency
  // and set the index to the highest value
  const highValue = Math.max(
    ...dashboardData.proficiency.map(
      proficiency => proficiency.content[contentIndex].percentage,
    ),
  )

  // get the index of the highest value
  dashboardData.proficiency.forEach((proficiency, index) => {
    if (proficiency.content[contentIndex].percentage === highValue) {
      highCount++

      highIndex = index
    }
  })

  if (highCount > 1) {
    return null
  }

  return highIndex
}

const filterSerieProgressData = serieProgressArray => {
  if (!hasMultipleGroups.value) {
    return serieProgressArray.filter(item => item.key !== 'Grupo')
  }
  return serieProgressArray
}

const generateSerieProgressChartData = serieProgressArray => {
  const series = [{ name: 'Alunos participantes', data: [] }]
  const categories = []
  const colors = []

  if (!serieProgressArray) return { series, categories, colors }

  filterSerieProgressData(serieProgressArray).forEach(item => {
    categories.push(item.key)
    series[0].data.push(item.started)
    colors.push(getParticipationStatusEnum(item.started).variant)
  })

  return { series, categories, colors }
}

const generateSerieHitChartData = serieHitArray => {
  const series = [{ name: 'Questões acertadas', data: [] }]
  const categories = []
  const colors = []

  if (!serieHitArray) return { series, categories, colors }

  filterSerieProgressData(serieHitArray).forEach(item => {
    categories.push(item.key)
    series[0].data.push(item.percentage)
    colors.push(getPerformanceEnum(item.percentage).variant)
  })

  return { series, categories, colors }
}

// TABLE
const dataTable = ref([])

const tableColumns = computed(() => {
  const columns = [
    {
      key: 'studentName',
      label: 'Aluno',
      sortable: true,
      searchable: true,
    },
    {
      key: 'progress',
      label: 'Questões Respondidas',
      sortable: true,
    },
    {
      key: 'performance',
      label: 'Rendimento',
      sortable: true,
    },
  ]

  return columns
})

const params = ref({
  ClassId: classId || classe.value.ClassId,
  institutionId,
})

const fetchData = () => {
  if (!subject.value.id) return

  tableLoading.value = true
  loading.value = true

  getEvaluationTCTStudents(evaluationId, { ...params.value, subjectId: subject.value.id })
    .then(({ data }) => {
      dataTable.value = data
    })
    .finally(() => {
      loading.value = false
      tableLoading.value = false
    })
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getEvaluationTCTStudentsExcel(evaluationId, {
    InstitutionId: institutionId,
    ClassId: params.value.ClassId,
    SubjectId: subject.value.id,
  })
    .then(response => {
      const data = [store.getters['evaluations/evaluationName']]

      if (vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
        data.push(store.getters['evaluations/institutionName'])
      }

      data.push(store.getters['evaluations/className'])

      const fileText = data.join(' - ')

      const fileName = `Avaliação Digital - Análise TCT - ${fileText}.xlsx`

      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const details = studentId => {
  router.push({
    name: 'evaluationsTCTStudentsAnalysisDetailsTeacher',
    params: {
      studentId,
    },
  })
}

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)

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

watch(subject, () => {
  fetchData()
  fetchEvaluationInstitutionsDashboard()
})

</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>