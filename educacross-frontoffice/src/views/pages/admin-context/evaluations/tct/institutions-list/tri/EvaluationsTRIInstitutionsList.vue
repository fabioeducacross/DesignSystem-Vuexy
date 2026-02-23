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
    <EvaluationsTRIInstitutionsFilters :is-loading="loading" />

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
    <ListTable
      :loading="loading || dashboardLoading || tableLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por escola"
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

      <template #cell(institutionName)="{ item }">
        <div class="text-wrap" style="min-width: 200px">
          <span class="align-text-top font-bold">{{ item.institutionName }}</span>
        </div>
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
    <!-- <Legend /> -->
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
import EvaluationsTRIInstitutionsFilters from './EvaluationsTRIInstitutionsFilters.vue'
import LegendCard from '@/components/legends/LegendCard.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarTopInfo from '@/components/progessBar/ProgressBarTopInfo.vue'
import SubjectBand from '@/components/subjects/SubjectBand.vue'
import ListTable from '@/components/table/ListTable.vue'
import { ProficiencyTRIEnum, StatusEnum } from '@/consts/evaluationsEnum.js'
import router from '@/router'
import {
  getEvaluationTRIDashboard,
  getEvaluationTRIInstitutions,
  getEvaluationTRIInstitutionsExcel,
} from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, reactive, ref, watch } from 'vue'

// Instance
const vm = getCurrentInstance().proxy
const evaluationId = router.currentRoute.params.evaluationId
const { subject } = useFilters()

const cardFocus = ref(null)

// LOADING
const loading = ref(true)
const dashboardLoading = ref(true)
const tableLoading = ref(true)

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

// PAGE DASHBOARD
const dashboardData = reactive({
  proficiency: [],
})

const subjectId = computed(() => store.getters['filters/subject']?.id)
const networkGroupId = computed(() => store.getters['filters/networkGroup']?.id || null)

const fetchEvaluationInstitutionsDashboard = () => {
  dashboardLoading.value = true
  getEvaluationTRIDashboard(evaluationId, {
    NetworkGroupId: networkGroupId.value,
    SubjectId: subject.value.id,
  })
    .then(response => {
      store.dispatch('evaluations/setLastUpdate', response.data.lastUpdate)
      dashboardData.proficiency = response.data.proficiency

      cardFocus.value = defineCardFocus()
    })
    .finally(() => {
      dashboardLoading.value = false
    })
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
    { key: 'institutionName', label: 'Escola', sortable: true },
    { key: 'networkGroupName', label: 'Grupo escolar', sortable: true },
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
    tooltip: () => 'Relatório da escola',
    action: data => {
      openReport(data.institutionId)
    },
  },
]

const params = ref({
  Search: '',
  OrderBy: 0,
  Ascending: 'true',
  Page: 1,
  PageSize: 10,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Search: searchQuery,
    OrderBy: sortByEnum[sortBy]?.key || '0',
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  }

  fetchData()
}

const fetchData = () => {
  tableLoading.value = true
  getEvaluationTRIInstitutions(evaluationId, {
    ...params.value,
    NetworkGroupId: networkGroupId.value,
    SubjectId: subject.value.id,
  })
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
      tableLoading.value = false
    })
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getEvaluationTRIInstitutionsExcel(evaluationId, {
    NetworkGroupId: networkGroupId.value,
    SubjectId: subject.value.id,
    Search: params.value.Search,
  })
    .then(response => {
      const fileText = store.getters['evaluations/evaluationName']

      const fileName = `Avaliação Digital - Análise TRI - ${fileText}.xlsx`

      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const openReport = institutionId => {
  router.push({
    name: 'evaluationsTRIInstutionsClass',
    params: { evaluationId, institutionId },
  })
}

const defineCardFocus = () => {
  let highIndex = null
  let contentIndex = 1
  let highCount = 0

  if (networkGroupId.value) {
    contentIndex = 0
  }

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

const sortByEnum = {
  institutionName: {
    key: 0,
    value: 'Institution',
  },
  networkGroupName: {
    key: 1,
    value: 'NetworkGroup',
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

watch([subjectId, networkGroupId], () => {
  if (!subject.value.id) return
  fetchEvaluationInstitutionsDashboard()
  fetchData()
})

if (subject.value.id) {
  fetchEvaluationInstitutionsDashboard()
  fetchData()
}

const legends = [
  {
    text: 'Escala de Proficiência baseada em Avaliações Externas Nacionais',
    enum: ProficiencyTRIEnum,
  },
]

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)
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