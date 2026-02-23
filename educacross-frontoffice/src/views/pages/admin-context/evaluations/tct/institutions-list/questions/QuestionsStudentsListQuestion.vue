<template>
  <section>
    <ListTable
      ref="refListTable"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-type="number"
      search-placeholder="Pesquisar por código da questão"
      :per-page-options="[5, 10, 50, 100]"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      @change="changeListTable"
    >
      <template #head(questionId)="item">
        <div class="d-flex align-items-center">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top.html="
              `Este é um código de referência da questão e não está relacionado à ordem em que ela é exibida durante a avaliação.`
            "
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <template #cell(questionId)="{ item }">
        <div class="d-flex flex-md-row align-items-center justify-content-start gap-4">
          <div class="d-flex gap-1">
            <Subjects
              v-for="subject in subjectsIds"
              :key="subject"
              :subject-id="subject"
              :size="24"
            />
          </div>
          <div>
            <span
              v-b-tooltip.hover.top="`Detalhes da questão`"
              class="underline text-primary cursor-pointer"
              @click="openQuestionModal(item.questionId)"
            >
              {{ item.questionId }}
            </span>
          </div>
        </div>
      </template>

      <template #head(students)="item">
        <div class="d-flex align-items-center">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top.html="`Alunos cadastrados.`"
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <template #head(performance)="item">
        <div class="d-flex align-items-center">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top.html="$t('performanceBasedOnStudentMistakesAndSuccesses')"
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <template #cell(descriptors)="{ item, index }">
        <div class="d-flex flex-wrap gap-3">
          <span v-for="(ability, indexAbility) in item.descriptors" :key="indexAbility">
            <span
              :id="`popover-target-${ability.tag}-${index}-${indexAbility}`"
              class="underline text-primary"
              >{{ ability.tag }}</span
            >

            <b-popover
              :title="ability.tag"
              :target="`popover-target-${ability.tag}-${index}-${indexAbility}`"
              triggers="hover"
            >
              <div>
                <p><strong>Matriz:</strong> {{ ability.educationalOrganizationName }}</p>
                <p><strong>Tópico:</strong> {{ ability.knowledgeAxisName }}</p>
                <p v-if="ability.knowledgeObject">
                  <strong>Objeto de Conhecimento:</strong> {{ ability.knowledgeObject }}
                </p>
                <p><strong>Habilidade:</strong> {{ ability.descriptorName }}</p>
              </div>
            </b-popover>
          </span>
        </div>
      </template>

      <template #cell(answers)="{ item }">
        <ProgressBarHorizontalV2
          show-values
          height="12px"
          :value="item.answers"
          :max="item.students"
          :get-variant="getAnswersVariant"
          values-divisor=" de "
        >
        </ProgressBarHorizontalV2>
      </template>

      <template #cell(performance)="{ item }">
        <PerformanceCell :performance="item.performance" />
      </template>
    </ListTable>
    <LegendEnum :legends="legends" />
    <QuestionDetail
      v-if="filtersParams.EducationalOrganization"
      v-model="openModal"
      :question-id="questionId"
      :evaluation-id="evaluationId"
      :ids-questions="idsQuestions"
      :total="totalData"
      :subject-id="subject.id"
      :educational-organization-id="filtersParams.EducationalOrganization.id"
      :network-group-id="filtersParams.NetworkGroupId"
      :matriz="filtersParams.EducationalOrganization.name"
      hit-answered-card-title="Dos respondentes na turma"
      hit-answered-card-tooltip-text="A exibição das questões está relacionada ao modelo da prova, por isso esta questão pode não ter sido proposta a todos alunos."
    />
  </section>
</template>

<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import QuestionDetail from '@/components/evaluations/questionDetailV2/QuestionDetail.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import Subjects from '@/components/subjects/subjects.vue'
import ListTable from '@/components/table/ListTable.vue'
import { answersEnum, answersLegend, PerformanceEnum } from '@/consts/evaluationsEnum.js'
import { useRoute, useRouter } from 'vue-router/composables'
import {
  getEvaluationQuestionsInstitutions,
  getEvaluationQuestionsInstitutionsExcel,
} from '@/services/shared/evaluations/Evaluation.Service.js'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import { saveAs } from 'file-saver'
import { computed, onMounted, ref, watch } from 'vue'

// Props
const props = defineProps({
  filtersParams: {
    type: Object,
    required: true,
  },
})

// State and refs
const { subject } = useFilters()
const loading = ref(true)
const refListTable = ref(null)

const dataTable = ref([])
const totalData = ref(0)
const idsQuestions = ref([])

const route = useRoute()
const evaluationId = route.params.evaluationId

const tableColumns = [
  { key: 'questionId', label: 'Código da Questão', sortable: true, searchable: true },
  {
    key: 'descriptors',
    label: 'Habilidades Vinculadas',
  },
  {
    key: 'answers',
    label: 'total de respostas',
    sortable: true,
  },
  {
    key: 'performance',
    label: 'RENDIMENTO',
    sortable: true,
  },
]

const params = ref({
  Page: 1,
  PageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
  SubjectId: subject.value.id,
  EducationalOrganizationId: props.filtersParams.EducationalOrganization?.id,
  NetworkGroupId: props.filtersParams.NetworkGroupId,
  SerieId: props.filtersParams.SerieId,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
    EducationalOrganizationId: props.filtersParams.EducationalOrganization?.id,
    NetworkGroupId: props.filtersParams.NetworkGroupId,
    SubjectId: subject.value.id,
    SerieId: props.filtersParams.SerieId,
  }

  fetchData()
}

const fetchData = () => {
  if (!subject.value.id) return
  if (!params.value.SerieId) {
    return
  }

  loading.value = true

  const cleanParams = Object.keys(params.value).reduce((acc, key) => {
    if (
      params.value[key] !== null &&
      params.value[key] !== undefined &&
      params.value[key] !== ''
    ) {
      acc[key] = params.value[key]
    }
    return acc
  }, {})

  return getEvaluationQuestionsInstitutions(evaluationId, cleanParams)
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
      getQuestionsIds()
    })
    .finally(() => {
      loading.value = false
    })
}

const getQuestionsIds = () => {
  if (!totalData.value || !params.value.SerieId || !params.value.SubjectId) {
    return
  }

  const body = { ...params.value }
  body.PageSize = totalData.value

  const cleanBody = Object.keys(body).reduce((acc, key) => {
    if (body[key] !== null && body[key] !== undefined && body[key] !== '') {
      acc[key] = body[key]
    }
    return acc
  }, {})

  getEvaluationQuestionsInstitutions(evaluationId, cleanBody).then(({ data }) => {
    idsQuestions.value = data.data.map(item => item.questionId)
  })
}

watch(
  () => props.filtersParams,
  () => {
    if (refListTable.value) refListTable.value.resetPage()
    params.value.Page = 1
    params.value.SubjectId = subject.value.id
    params.value.EducationalOrganizationId = props.filtersParams.EducationalOrganization?.id
    params.value.NetworkGroupId = props.filtersParams.NetworkGroupId
    params.value.SerieId = props.filtersParams.SerieId
    fetchData()
  }
)

const openModal = ref(false)
const questionId = ref(null)

const openQuestionModal = question => {
  openModal.value = true
  questionId.value = question
}

onMounted(() => {
  params.value.SubjectId = subject.value.id
  params.value.EducationalOrganizationId = props.filtersParams.EducationalOrganization?.id
  params.value.NetworkGroupId = props.filtersParams.NetworkGroupId
  params.value.SerieId = props.filtersParams.SerieId

  if (params.value.SerieId && params.value.SubjectId) {
    fetchData()
  }
})

const subjectsIds = computed(() => (subject.value.id ? [subject.value.id] : []))

const getAnswersVariant = value => {
  return answersEnum.find(item => item.rule(value))
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true

  getEvaluationQuestionsInstitutionsExcel(evaluationId, {
    SubjectId: params.value.SubjectId,
    EducationalOrganizationId: params.value.EducationalOrganizationId,
    NetworkGroupId: props.filtersParams.NetworkGroupId,
    Search: params.value.Search,
    SerieId: params.value.SerieId,
  })
    .then(response => {
      let fileName = 'Avaliação Digital - Questões - Escolas.xlsx'
      fileName = sanitizeString(fileName)
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const legends = [
  answersLegend,
  {
    text: 'Rendimento',
    enum: PerformanceEnum,
  },
]
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }
</style>