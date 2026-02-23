<template>
  <ListTableLocalSorting
    :loading="loading"
    :table-columns="tableColumns"
    :data-table="dataTable"
    search-placeholder="Pesquisar por habilidade"
    :generating-excel="generatingExcel"
    :export-to-excel="exportToExcel"
  >
    <template #cell(tag)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <Subjects :key="subject.id" :subject-id="subject.id" :size="24" />
        <span class="underline text-primary">{{ item.tag }}</span>
      </div>
    </template>

    <template #cell(institutionPerformance)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <ArrowCompare
          :value-initial="item.institutionPerformance"
          :value-to-compare="item.networkGroupPerformance"
        />

        <SemaphoreStatus :status-enum="getPerformanceEnum(item.institutionPerformance)">
          <span class="whitespace-no-wrap">{{ item.institutionPerformance | formatNumber }}%</span>
        </SemaphoreStatus>
      </div>
    </template>
    <template #cell(networkGroupPerformance)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <SemaphoreStatus :status-enum="getPerformanceEnum(item.networkGroupPerformance)">
          <span class="whitespace-no-wrap">{{ item.networkGroupPerformance | formatNumber }}%</span>
        </SemaphoreStatus>
      </div>
    </template>
  </ListTableLocalSorting>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getPerformanceEnum } from '@/consts/evaluationsEnum.js'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import {
  getEvaluationTCTClassesAbility,
  getEvaluationTCTClassesAbilityExcel,
} from '@/services/shared/evaluations/Evaluation.Service.js'
import useFilters from '@/store/filters/useFilters'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { saveAs } from 'file-saver'
import { getCurrentInstance, ref, watch } from 'vue'

const props = defineProps({
  filtersParams: {
    type: Object,
    required: true,
  },
})

const vm = getCurrentInstance().proxy

const { subject } = useFilters()

const loading = ref(true)
const dataTable = ref([])

const evaluationId = router.currentRoute.params.evaluationId
const institutionId = router.currentRoute.params.institutionId

const tableColumns = [
  { key: 'tag', label: 'Código', sortable: true, searchable: true },
  {
    key: 'knowledgeAxisName',
    label: 'Temáticas',
    sortable: true,
  },
  { key: 'descriptorName', label: 'Habilidades', sortable: true, searchable: true },
  {
    key: 'institutionPerformance',
    label: 'RENDIMENTO DA ESCOLA',
    sortable: true,
    formatter: value => `${formatNumber(value)}%`,
    tooltip: vm.$t('performanceBasedOnStudentMistakesAndSuccesses'),
  },
  {
    key: 'networkGroupPerformance',
    label: 'RENDIMENTO DO GRUPO',
    sortable: true,
    formatter: value => `${formatNumber(value)}%`,
    tooltip: vm.$t('performanceBasedOnStudentMistakesAndSuccesses'),
  },
]

const params = ref({
  SubjectId: null,
  EducationalOrganizationId: null,
  SerieId: null,
  InstitutionId: institutionId,
  KnowledgeAxisId: null,
})

const fetchData = () => {
  loading.value = true
  dataTable.value = []

  if (!params.value.SerieId) {
    loading.value = false
    return
  }
  getEvaluationTCTClassesAbility(evaluationId, params.value)
    .then(({ data }) => {
      dataTable.value = data
    })
    .finally(() => {
      loading.value = false
    })
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true

  getEvaluationTCTClassesAbilityExcel(evaluationId, params.value)
    .then(response => {
      const fileName = 'Avaliação Digital - Habilidades - Turmas.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

watch(
  () => props.filtersParams,
  () => {
    params.value = {
      SubjectId: props.filtersParams.SubjectId,
      EducationalOrganizationId: props.filtersParams.EducationalOrganizationId,
      SerieId: props.filtersParams.SerieId,
      InstitutionId: institutionId,
      KnowledgeAxisId: props.filtersParams.KnowledgeAxisId,
    }

    fetchData()
  },
)
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }
</style>