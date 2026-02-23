<template>
  <ListTableLocalSorting
    :loading="loading"
    :table-columns="tableColumns"
    :data-table="dataTable"
    search-placeholder="Pesquisar por habilidade"
    :generating-excel="generatingExcel"
    :export-to-excel="exportToExcel"
  >
    <template #head(knowledgeAxisName)="item">
      <div class="d-flex flex-col" style="min-width: 150px" v-html="item.label"></div>
    </template>
    <template #head(networkGroupOrInstitutionPerformance)="item">
      <div class="d-flex align-items-center gap 1">
        {{ item.label }}
        <span
          v-b-tooltip.hover.top="$t('performanceBasedOnStudentMistakesAndSuccesses')"
          class="material-symbols-outlined ml-1 head-icon-info"
        >
          info
        </span>
      </div>
    </template>
    <template #head(networkPerformance)="item">
      <div class="d-flex align-items-center gap 1">
        {{ item.label }}
        <span
          v-b-tooltip.hover.top="$t('performanceBasedOnStudentMistakesAndSuccesses')"
          class="material-symbols-outlined ml-1 head-icon-info"
        >
          info
        </span>
      </div>
    </template>
    <template #cell(tag)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <Subjects :key="subject.id" :subject-id="subject.id" :size="24" />
        <span class="underline text-primary">{{ item.tag }}</span>
      </div>
    </template>
    <template #cell(networkGroupOrInstitutionPerformance)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <ArrowCompare
          :value-initial="item.networkGroupOrInstitutionPerformance"
          :value-to-compare="item.networkPerformance"
        />
        <SemaphoreStatus
          :status-enum="getPerformanceEnum(item.networkGroupOrInstitutionPerformance)"
        >
          <span class="whitespace-no-wrap"
            >{{ item.networkGroupOrInstitutionPerformance | formatNumber }}%</span
          >
        </SemaphoreStatus>
      </div>
    </template>
    <template #cell(networkPerformance)="{ item }">
      <div class="d-flex align-items-center gap-2">
        <SemaphoreStatus :status-enum="getPerformanceEnum(item.networkPerformance)">
          <span class="whitespace-no-wrap">{{ item.networkPerformance | formatNumber }}%</span>
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
import { useRoute, useRouter } from 'vue-router/composables'
import {
  getEvaluationTCTInstitutionsAbility,
  getEvaluationTCTInstitutionsAbilityExcel,
} from '@/services/shared/evaluations/Evaluation.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { saveAs } from 'file-saver'
import { ref, watch } from 'vue'

const props = defineProps({
  filtersParams: {
    type: Object,
    required: true,
  },
})

const { subject } = useFilters()

const loading = ref(false)
const dataTable = ref([])
const route = useRoute()
const evaluationId = route.params.evaluationId

const tableColumns = [
  { key: 'tag', label: 'Código', sortable: true, searchable: true },
  {
    key: 'knowledgeAxisName',
    label: 'Temáticas',
    sortable: true,
  },
  { key: 'descriptorName', label: 'Habilidades', sortable: true, searchable: true },
  {
    key: 'networkGroupOrInstitutionPerformance',
    label: 'RENDIMENTO DO GRUPO OU ESCOLA',
    sortable: true,
    formatter: value => `${formatNumber(value)}%`,
  },
  {
    key: 'networkPerformance',
    label: 'Rendimento da rede',
    sortable: true,
    formatter: value => `${formatNumber(value)}%`,
  },
]

const params = ref({
  SubjectId: null,
  EducationalOrganizationId: null,
  KnowledgeAxisId: null,
  NetworkGroupId: null,
  InstitutionId: null,
})

const fetchData = () => {
  if (!params.value.SerieId || !params.value.NetworkGroupId) {
    loading.value = false
    dataTable.value = []
    return
  }

  loading.value = true
  dataTable.value = []

  getEvaluationTCTInstitutionsAbility(evaluationId, params.value)
    .then(({ data }) => {
      dataTable.value = data
      store.dispatch('evaluations/setLastUpdate', '')
    })
    .finally(() => {
      loading.value = false
    })
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true

  getEvaluationTCTInstitutionsAbilityExcel(evaluationId, params.value)
    .then(response => {
      const fileName = 'Avaliação Digital - Habilidades - Escolas.xlsx'
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
      KnowledgeAxisId: props.filtersParams.KnowledgeAxisId,
      NetworkGroupId: props.filtersParams.NetworkGroupId,
      InstitutionId: props.filtersParams.InstitutionId,
      SerieId: props.filtersParams.SerieId,
    }
    fetchData()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>