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
    <template #cell(performance)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <ArrowCompare :value-initial="item.performance" :value-to-compare="item.seriePerformance" />
        <SemaphoreStatus :status-enum="getPerformanceEnum(item.performance)">
          <span class="whitespace-no-wrap">{{ item.performance | formatNumber }}%</span>
        </SemaphoreStatus>
      </div>
    </template>
    <template #cell(seriePerformance)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <SemaphoreStatus :status-enum="getPerformanceEnum(item.seriePerformance)">
          <span class="whitespace-no-wrap">{{ item.seriePerformance | formatNumber }}%</span>
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
  getEvaluationTCTStudentsAbility,
  getEvaluationTCTStudentsAbilityExcel,
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

const { subject, classe } = useFilters()
const loading = ref(true)

const vm = getCurrentInstance().proxy

const dataTable = ref([])

const evaluationId = router.currentRoute.params.evaluationId
const classId = router.currentRoute.params.classId || classe.value.ClassId

const tableColumns = [
  { key: 'tag', label: 'Código', sortable: true, searchable: true },
  {
    key: 'knowledgeAxisName',
    label: 'TEMÁTICAS',
    sortable: true,
  },
  { key: 'descriptorName', label: 'Habilidades', sortable: true, searchable: true },
  {
    key: 'performance',
    label: 'RENDIMENTO DA TURMA OU ALUNO',
    sortable: true,
    formatter: value => `${formatNumber(value)}%`,
    tooltip: vm.$t('performanceBasedOnStudentMistakesAndSuccesses'),
  },
  {
    key: 'seriePerformance',
    label: 'RENDIMENTO DA ESCOLA',
    sortable: true,
    formatter: value => `${formatNumber(value)}%`,
    tooltip: vm.$t('performanceBasedOnStudentMistakesAndSuccesses'),
  },
]

const params = ref({
  SubjectId: null,
  EducationalOrganizationId: null,
  ClassId: classId,
  StudentId: null,
  KnowledgeAxisId: null,
})

const fetchData = () => {
  // Só faz a requisição se houver um SubjectId válido
  if (!params.value.SubjectId) {
    loading.value = false
    dataTable.value = []
    return
  }

  loading.value = true
  dataTable.value = []

  getEvaluationTCTStudentsAbility(evaluationId, params.value)
    .then(({ data }) => {
      dataTable.value = data
    })
    .finally(() => {
      loading.value = false
    })
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  // Só exporta se houver um SubjectId válido
  if (!params.value.SubjectId) {
    return
  }

  generatingExcel.value = true

  getEvaluationTCTStudentsAbilityExcel(evaluationId, params.value)
    .then(response => {
      const fileName = 'Avaliação Digital - Habilidades - Alunos.xlsx'
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
      StudentId: props.filtersParams.StudentId,
      ClassId: classId,
      KnowledgeAxisId: props.filtersParams.KnowledgeAxisId,
    }

    fetchData()
  },
  { deep: true },
)

// Não chama fetchData() imediatamente para evitar erro com SubjectId null
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>