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
    <EvaluationsTRIClassFilters
      v-model="filtersParams"
      :is-loading="loading"
      :series="seriesFilterOptions"
      :exames-options="examesFilterOptions"
    />
    <SubjectBand :subjects-ids="selectedSubjectIdArr"></SubjectBand>

    <!-- PAGE DASHBOARD -->

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
    <ListTable
      ref="refListTable"
      :loading="loading || dashboardLoading || tableLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por turma"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      @change="changeListTable"
    >
      <template v-for="(field, index) in ProficiencyTRIEnum" #[`head(${field.key})`]="{}">
        <span :key="index" class="material-symbols-outlined">
          {{ field.icon }}
        </span>
      </template>

      <template
        v-for="(field, index) in ProficiencyTRIEnum"
        #[`cell(${field.key})`]="{ value, item }"
      >
        <span :key="index" v-b-tooltip.hover.top="item[field.studentKey]">
          {{ value | formatNumber }}%
        </span>
      </template>

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
import EvaluationsTRIClassFilters from './EvaluationsTRIClassFilters.vue'
import LegendCard from '@/components/legends/LegendCard.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarTopInfo from '@/components/progessBar/ProgressBarTopInfo.vue'
import SubjectBand from '@/components/subjects/SubjectBand.vue'
import ListTable from '@/components/table/ListTable.vue'
import { ProficiencyTRIEnum, StatusEnum } from '@/consts/evaluationsEnum.js'
import router from '@/router'
import {
  getEvaluationTRIClasses,
  getEvaluationTRIClassesExcel,
  getEvaluationTRIInstitutionDashboard,
} from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import { formatDecimalPlace } from '@/utils/number.js'
import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'

// FILTER FORMATTER
import { formatNumber } from '@/filters/filters' // needed for filter pipe

const vm = getCurrentInstance().proxy
const refListTable = ref(null)

// LOADING
const loading = ref(true)
const dashboardLoading = ref(true)
const tableLoading = ref(true)
const cardFocus = ref(null)

const evaluationId = router.currentRoute.params.evaluationId
const institutionId = router.currentRoute.params.institutionId

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

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
    name: 'Todos os anos',
  },
  ...store.getters['evaluations/series'],
])

const subjectsIds = computed(() => examesFilterOptions.value?.map(subject => subject.id))
const selectedSubjectIdArr = computed(() => {
  return filtersParams.value.SubjectId ? [filtersParams.value.SubjectId] : []
})

// PAGE DASHBOARD
const dashboardData = reactive({
  proficiency: [],
})

const fetchEvaluationInstitutionsDashboard = () => {
  if (!filtersParams.value.SubjectId) {
    return
  }

  getEvaluationTRIInstitutionDashboard(evaluationId, {
    InstitutionId: institutionId,
    SerieId: filtersParams.value.SerieId,
    SubjectId: filtersParams.value.SubjectId,
  })
    .then(response => {
      dashboardData.proficiency = response.data.proficiency
      store.dispatch('evaluations/setLastUpdate', response.data.lastUpdate)
      cardFocus.value = defineCardFocus()
    })
    .finally(() => {
      dashboardLoading.value = false
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
const totalData = ref(0)

const tableColumns = computed(() => {
  const proficiencys = ProficiencyTRIEnum.map(item => {
    return {
      key: item.key,
      label: item.icon,
      sortable: true,
      thClass: `bg-${item.variant} text-white th-head-arrow-white`,
      tdClass: (value, key, item) => {
        const proficiencys = ProficiencyTRIEnum.filter(proficiency => proficiency.key !== key)

        if (proficiencys.every(proficiency => value > item[proficiency.key])) {
          const proficiency = ProficiencyTRIEnum.find(proficiency => proficiency.key === key)
          return `bg-light-${proficiency.variant}`
        }
        return ''
      },
      thStyle: { width: '64px' },
    }
  })
  return [
    { key: 'className', label: 'Turma', sortable: true },
    { key: 'serieName', label: 'Ano Escolar', sortable: true },
    ...proficiencys,
    {
      key: 'tooltip',
      label: '',
      sortable: false,
      tooltip: 'Percentual de alunos em cada faixa de proficiência.',
      thStyle: { width: '60px' },
    },
    { key: 'actions', label: 'Ações', sortable: false, thStyle: { width: '120px' } },
  ]
})

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: item => {
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
    OrderBy: sortByEnum[sortBy]?.key || '0',
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
  getEvaluationTRIClasses(evaluationId, params.value)
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
      name: 'evaluationsTRIInstutionsStudents',
      params: {
        classId,
        evaluationId,
        institutionId,
      },
    })
  } else {
    router.push({
      name: 'evaluationsTRIStudents',
      params: {
        classId,
        evaluationId,
      },
    })
  }
}
const sortByEnum = {
  className: {
    key: 0,
    value: 'Class',
  },
  serieName: {
    key: 1,
    value: 'Serie',
  },
  belowBasic: {
    key: 2,
    value: 'BelowBasic',
  },
  basic: {
    key: 3,
    value: 'Basic',
  },
  proficient: {
    key: 4,
    value: 'Proficient',
  },
  advenced: {
    key: 5,
    value: 'Advenced',
  },
}

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
    dashboardLoading.value = true
    fetchEvaluationInstitutionsDashboard()
    fetchData()
  }
})

const legends = [
  {
    text: 'Escala de Proficiência baseada em Avaliações Externas Nacionais',
    enum: ProficiencyTRIEnum,
  },
]

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getEvaluationTRIClassesExcel(evaluationId, {
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

      const fileName = `Avaliação Digital - Análise TRI - ${fileText}.xlsx`
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

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
<style lang="scss">
  .th-head-arrow-white {
    background-image: url(@/assets/images/arrows/arrows-white.svg) !important;
  }
</style>