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

    <!-- PAGE DASHBOARD -->
    <EvaluationsStudentsDashboard
      :is-loading="pageLoading || dashboardAndTableLoading"
      :data="dashboardData"
    />
    <!-- LIST -->

    <ListTableLocalSorting
      :loading="pageLoading || dashboardAndTableLoading || tableLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      search-placeholder="searchForStudent"
    >
      <template #head="item">
        <div class="d-flex align-items-center gap 1" v-html="item.label" />
      </template>

      <template #cell(studentName)="{ item }">
        <div class="text-wrap" style="min-width: 200px">
          <span class="align-text-top font-bold">{{ item.studentName }}</span>
        </div>
      </template>

      <template #cell="data">
        <div>
          <SemaphoreStatus
            v-if="data.field.subjectId"
            :status-enum="
              getVariantByRule(data.item[`subject-${data.field.subjectId}`], 'progress')
            "
            has-tooltip
          >
            <span>{{ formatNumber(data.item[`subject-${data.field.subjectId}`]) }}%</span>
          </SemaphoreStatus>

          <div v-else class="text-nowrap">
            {{ data.item[data.field.key] }}
          </div>
        </div>
      </template>

      <template #cell(lastReplyDate)="{ item }">
        <div class="text-nowrap">
          <template v-if="item.lastReplyDate">
            {{ formattedDate(item.lastReplyDate) }}
          </template>
          <template v-else> - </template>
        </div>
      </template>
    </ListTableLocalSorting>
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import EvaluationsStudentsDashboard from './EvaluationsStudentsDashboard.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { StatusEnum } from '@/consts/evaluationsEnum.js'
import { getVariantByRule } from '@/consts/legends/index.js'
import { progressLegend } from '@/consts/legends/progressEnum.js'
import router from '@/router'
import {
  getEvaluationClassDashboard,
  getEvaluationDetails,
  getEvaluationStudents,
} from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { formatDecimalPlace } from '@/utils/number.js'
import sortObjectListByKey from '@/utils/sort.js'
import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { formatNumber, formattedDate } from '@/filters/filters'

const { classe } = useFilters()
const evaluationId = router.currentRoute.params.evaluationId
const classId = router.currentRoute.params.classId || classe.value.ClassId
const institutionId = router.currentRoute.params.institutionId

const evaluationDetails = ref({})
const dashboardData = ref({})
const dataTable = ref([])

const role = store.getters.accessRole

const vm = getCurrentInstance().proxy

const dashboardAndTableLoading = ref(false)
const pageLoading = ref(false)
const tableLoading = ref(false)

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)

const fetchEvaluationDetails = () => {
  getEvaluationDetails(evaluationId, {
    InstitutionId: institutionId,
    ClassId: classId,
  })
    .then(response => {
      evaluationDetails.value = response.data
      const breadcrumb = []
      if (role !== 'Teacher') {
        breadcrumb.push(
          '',
          '',
          evaluationDetails.value.evaluationName,
          evaluationDetails.value.className,
        )
        if (role === 'NetworkManager') {
          breadcrumb.splice(3, 0, evaluationDetails.value.institutionName)
        }
      }
      vm.$bus.emit('setBreadcrumb', breadcrumb)
    })
    .finally(() => {})
}

// DASHBOARD
const fetchEvaluationInstitutionsDashboard = () => {
  getEvaluationClassDashboard(evaluationId, classId, institutionId)
    .then(response => {
      evaluationDetails.value.lastUpdate = response.data.lastUpdate

      const horizontalBarChartSeries = generateChartData(response.data.subjectProgress)
      dashboardData.value = { ...response.data, horizontalBarChartSeries }
    })
    .finally(() => {})
}

const subjectsColumns = computed(() => {
  try {
    return subjectsIds.value?.map(subjectId => {
      return {
        key: `subject-${subjectId}`,
        label: `Progresso<br />${SubjectEnum[subjectId].label}`,
        sortable: true,
        subjectId,
      }
    }) || []
  } catch (error) {
    return []
  }
})

const tableColumns = computed(() => [
  {
    key: 'studentName',
    label: 'Aluno',
    sortable: true,
    searchable: true,
  },
  ...subjectsColumns.value,
  { key: 'lastReplyDate', label: 'Último acesso', sortable: true },
])

const generateChartData = array => {
  const newArray = sortObjectListByKey(array, 'subjectId')

  const startedArray = []
  const finishedArray = []
  const chartColumnLabel = []

  newArray.forEach(item => {
    startedArray.push(formatDecimalPlace(item.started))
    finishedArray.push(formatDecimalPlace(item.finished))
    chartColumnLabel.push(SubjectEnum[item.subjectId].label || '')
  })

  return {
    startedArray,
    finishedArray,
    chartColumnLabel,
  }
}

const fetchData = () => {
  getEvaluationStudents(evaluationId, {
    ClassId: classId,
    InstitutionId: institutionId,
  })
    .then(({ data }) => {
      dataTable.value = data.map(student => {
        const subjectsProgess = {}
        Object.keys(student.progress).forEach(index => {
          subjectsProgess[`subject-${index}`] = student.progress[index]
        })
        return {
          studentName: student.studentName,
          ...subjectsProgess,
          lastReplyDate: student.lastReplyDate || '',
        }
      })
    })
    .finally(() => {
      pageLoading.value = false
      dashboardAndTableLoading.value = false
      tableLoading.value = false
    })
}

onMounted(async () => {
  pageLoading.value = true
  fetchEvaluationDetails()
  fetchEvaluationInstitutionsDashboard()
  fetchData()
})

const legends = [progressLegend]

</script>