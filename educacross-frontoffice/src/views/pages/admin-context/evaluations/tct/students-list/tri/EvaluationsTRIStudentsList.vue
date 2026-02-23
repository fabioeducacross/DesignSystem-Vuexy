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

    <!--  Cards -->
    <LegendCard
      :items="ProficiencyTRIEnum"
      :active="cardFocus"
      tooltip-active-text="O maior percentual de alunos se encontra nesta faixa de proficiência. "
    >
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
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      search-placeholder="searchForStudent"
    >
      <template #cell(studentName)="{ item }">
        <span class="font-weight-bolder">{{ item.studentName }}</span>
      </template>

      <template #cell(score)="{ value, item }">
        <div class="d-flex align-items-center justify-content-start gap-2 legend-icon">
          <div
            class="range-circle rounded-circle text-white d-flex align-items-center justify-content-center"
            :class="`bg-${getProficiencyEnum(item.proficiency).variant}`"
          >
            <span class="material-symbols-outlined">
              {{ getProficiencyEnum(item.proficiency).icon }}
            </span>
          </div>

          <span>{{ formatNumber(value) }}</span>
        </div>
      </template>
    </ListTableLocalSorting>
    <LegendEnum :legends="legends">
      <template v-slot:enum-component="{ value }">
        <div class="d-flex align-items-center gap-2">
          <div class="d-flex align-items-center justify-content-start gap-2 legend-icon">
            <div
              class="range-circle rounded-circle text-white d-flex align-items-center justify-content-center"
              :class="`bg-${value.variant}`"
            >
              <span class="material-symbols-outlined">
                {{ value.icon }}
              </span>
            </div>

            <span> {{ value.text }}</span>
          </div>
        </div>
      </template>
    </LegendEnum>
  </section>
</template>

<script setup>
import LegendCard from '@/components/legends/LegendCard.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarTopInfo from '@/components/progessBar/ProgressBarTopInfo.vue'
import SubjectBand from '@/components/subjects/SubjectBand.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { ProficiencyTRIEnum, StatusEnum } from '@/consts/evaluationsEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters.js'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import {
  getEvaluationTRIClassDashboard,
  getEvaluationTRIStudents,
  getEvaluationTRIStudentsExcel,
} from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { calcPercent, formatDecimalPlace } from '@/utils/number.js'
import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, reactive, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy

// LOADING
const loading = ref(true)
const dashboardAndTableLoading = ref(true)
const tableLoading = ref(true)

const evaluationId = router.currentRoute.params.evaluationId
const { classe, subject } = useFilters()
const cardFocus = ref(null)
const { classId, institutionId } = vm.$route.params

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
  proficiency: [],
})

const fetchEvaluationInstitutionsDashboard = () => {
  if (!subject.value.id) return

  dashboardAndTableLoading.value = true

  getEvaluationTRIClassDashboard(evaluationId, {
    ClassId: classId || classe.value.ClassId,
    SubjectId: subject.value.id,
    institutionId,
  })
    .then(response => {
      dashboardData.students = {
        studentsStarted: response.data.studentsStarted,
        totalStudents: response.data.totalStudents,
      }
      dashboardData.proficiency = response.data.proficiency
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

  const highValue = Math.max(
    ...dashboardData.proficiency.map(
      proficiency => proficiency.content[contentIndex].percentage,
    ),
  )

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

// TABLE
const dataTable = ref([])

const tableColumns = [
  {
    key: 'studentName',
    label: 'Aluno',
    sortable: true,
    searchable: true,
  },
  {
    key: 'score',
    label: 'Pontuação',
    sortable: true,
    thStyle: { width: '250px' },
  },
]

const params = ref({
  ClassId: classId || classe.value.ClassId,
  institutionId,
})

const fetchData = () => {
  if (!subject.value.id) return

  tableLoading.value = true
  loading.value = true

  getEvaluationTRIStudents(evaluationId, { ...params.value, subjectId: subject.value.id })
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
  getEvaluationTRIStudentsExcel(evaluationId, {
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

      const fileName = `Avaliação Digital - Análise TRI - ${fileText}.xlsx`

      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)

const legends = [
  {
    text: 'Escala de Proficiência baseada em Avaliações Externas Nacionais',
    enum: ProficiencyTRIEnum,
  },
]

const getProficiencyEnum = proficiency => {
  return ProficiencyTRIEnum.find(item => item.range === proficiency) || {}
}

watch(subject, () => {
  fetchData()
  fetchEvaluationInstitutionsDashboard()
})

</script>
<style lang="scss" scoped>
  .legend-icon {
    .range-circle {
      width: 24px;
      height: 24px;
    }
    .material-symbols-outlined {
      font-size: 24px;
    }
  }
</style>