<template>
  <b-modal
    v-if="value"
    id="question-detail-modal"
    ref="question-detail-modal"
    :visible="value"
    content-class="shadow"
    title="Detalhes da Avaliação"
    scrollable
    static
    size="lg"
    @close="closeModal"
    @hide="closeModal"
  >
    <b-skeleton-wrapper :loading="loadingTests || loading">
      <template #loading>
        <div>
          <b-row>
            <b-col cols="12" lg="4">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
            <b-col cols="12" lg="4">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
            <b-col cols="12" lg="4">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
          </b-row>
          <b-skeleton type="text" class="w-100 mb-2" height="200px" />
          <b-row>
            <b-col cols="12">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
            <b-col cols="12">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
          </b-row>
        </div>
      </template>
      <section v-if="evaluationsDetails">
        <b-row class="match-height mb-50">
          <b-col cols="12" md>
            <b-card
              body-class="p-50 d-flex align-items-center"
              border-variant="light-gray shadow-none"
              class="mb-0"
            >
              <div class="d-flex flex-md-row align-items-center justify-content-start gap-4">
                <div v-if="evaluationsDetails.subjectsIds" class="d-flex gap-1">
                  <Subjects
                    v-for="subject in evaluationsDetails.subjectsIds"
                    :key="subject"
                    :subject-id="subject"
                    :size="24"
                  />
                </div>
                <h5 class="text-primary mb-0">
                  <span class="font-bold">
                    {{ evaluationsDetails.name }}
                  </span>
                </h5>
              </div>
            </b-card>
          </b-col>
          <b-col cols="12" md="auto">
            <div
              v-b-tooltip="
                cancelledEvaluation ? 'Ação bloqueada, pois a Avaliação foi cancelada' : ''
              "
            >
              <b-button
                variant="math"
                block
                class="mb-0"
                :disabled="cancelledEvaluation"
                @click="emit('download', evaluationId)"
              >
                <span class="material-symbols-outlined" style="vertical-align: middle">
                  download
                </span>
                Baixar avaliação
              </b-button>
            </div>
          </b-col>
        </b-row>

        <b-form-group v-if="hasMultipleTests" label="Prova" label-for="test">
          <ESelect
            :value="selectedTest"
            :options="testList"
            :loading="loadingTests"
            @change="handleTestChange"
          >
            <template #option="item">
              <div class="d-flex align-items-center gap-1">
                <Subjects
                  v-if="item.subjectId"
                  :key="item.subjectId"
                  :subject-id="item.subjectId"
                  :size="26"
                />
                <span>{{ item.name }}</span>
              </div>
            </template>

            <template #selected-option="item">
              <div class="d-flex align-items-center gap-1">
                <Subjects
                  v-if="item.subjectId"
                  :key="item.subjectId"
                  :subject-id="item.subjectId"
                  :size="26"
                />
                <span>{{ item.name }}</span>
              </div>
            </template>
          </ESelect>
        </b-form-group>

        <div class="d-flex align-items-center mb-50 gap-2">
          <Subjects :subject-id="dataQuestion?.subjectId" :size="32" />
          <h4 class="font-bold text-body mb-0">
            Código da Questão: <span class="text-primary">{{ dataQuestion?.id }}</span>
          </h4>
          <span
            v-b-tooltip.hover.top.html="
              `Este é um código de referência da questão e não está relacionado à ordem em que ela é exibida durante a avaliação.`
            "
            class="material-symbols-outlined head-icon-info"
          >
            info
          </span>
        </div>

        <b-card v-if="firstDescriptor" body-class="p-1" border-variant="light-gray shadow-none">
          <b-row>
            <b-col cols="12" md="4">
              <div>
                <span class="font-bold">
                  Matriz/currículo:
                  <span class="text-primary">{{ firstDescriptor.educationalOrganizationName }}</span>
                </span>
              </div>

              <div v-if="firstDescriptor.knowledgeAxisName">
                <span class="font-bold">
                  Temática:
                  <span class="text-primary">{{ firstDescriptor.knowledgeAxisName }}</span>
                </span>
              </div>

              <div v-if="firstDescriptor.descriptorTag">
                <span class="font-bold">
                  Habilidade:
                  <b-badge pill :variant="getSubjectVariant(dataQuestion?.subjectId)">{{ firstDescriptor.descriptorTag }}</b-badge>
                </span>
              </div>
            </b-col>
            <b-col cols="12" md="8">
              <div v-if="firstDescriptor.descriptorName">
                <span class="font-bold"> Descritor da habilidade: </span>
                <span>{{ firstDescriptor.descriptorName }}</span>
              </div>
            </b-col>
          </b-row>
        </b-card>

        <b-card
          v-if="otherDescriptors.length"
          body-class="p-1"
          border-variant="light-gray shadow-none"
        >
          <span class="font-bold d-flex gap-1">
            Outras Habilidades:
            <div class="d-flex gap-1">
              <b-badge
                v-for="(descriptor, index) in otherDescriptors"
                :key="index"
                pill
                :variant="getSubjectVariant(dataQuestion?.subjectId)"
              >{{ descriptor.descriptorTag }}</b-badge>
            </div>
          </span>
        </b-card>

        <component
          :is="TemplateDefault"
          v-if="enunciations"
          :enunciations="enunciations"
          :alternatives="alternatives"
        />
      </section>
    </b-skeleton-wrapper>
    <template #modal-footer>
      <div v-if="evaluationsDetails" class="w-100 d-flex align-items-center justify-content-center">
        <b-pagination
          :value="currentQuestion"
          :total-rows="evaluationsDetails.questions.length"
          :per-page="1"
          first-number
          last-number
          class="mb-0"
          prev-class="prev-item"
          next-class="next-item"
          @change="val => (currentQuestion = val)"
        >
          <template #prev-text>
            <feather-icon icon="ChevronLeftIcon" size="18" />
          </template>
          <template #next-text>
            <feather-icon icon="ChevronRightIcon" size="18" />
          </template>
        </b-pagination>
      </div>
    </template>
  </b-modal>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import PieChart from '@/components/chart/PieChart.vue'
import TemplateDefault from '@/components/evaluations/questionsListDetail/templates/TemplateDefault.vue'
import ESelect from '@/components/selects/ESelect.vue'
import Subjects from '@/components/subjects/subjects.vue'
import { EQuestionDificultyLevelLabel } from '@/consts/EQuestionDificultyLevel.js'
import {
  EQuestionContentLetter,
  EQuestionTypeAlternative,
  EQuestionTypeAlternativeResult,
  EQuestionTypeEnunciation,
} from '@/consts/EQuestionType.js'
import {
  getEvaluationDetailsV2,
  getEvaluationTestsLabel,
} from '@/services/shared/evaluations/Evaluation.Service.js'
import useFilters from '@/store/filters/useFilters.js'
import { calcPercent } from '@/utils/number.js'
import { getSubjectVariant } from '@/utils/utils'
import { computed, ref, watch, reactive, toRefs } from 'vue'
import VueApexCharts from 'vue-apexcharts'

// Props
const props = defineProps({
  value: {
    type: Boolean,
  },
  evaluationId: {
    required: true,
  },
  subjectId: { required: false },
  classId: { required: false },
  serieId: { required: false },
  cancelledEvaluation: { type: Boolean, default: false },
  matriz: { required: false },
})

// Emits
const emit = defineEmits(['input', 'download'])

const loading = ref(false)
const evaluationsDetails = ref(null)
const currentQuestion = ref(1)

const state = reactive({
  testList: [{ id: null, name: 'Todas as provas', subjectId: null }],
  selectedTest: {},
  questionList: {},
  loadingTests: false,
  error: null,
})

const { classe, subject } = useFilters()

const hasMultipleTests = computed(() => testList.value.length > 2)

const serieId = computed(() => classe.value?.SerieId ?? null)

const subjectId = computed(() => props.subjectId ?? subject.value?.id ?? null)

const dataQuestion = computed(() => {
  if (evaluationsDetails.value && evaluationsDetails.value.questions) {
    return evaluationsDetails.value.questions[currentQuestion.value - 1]
  }
  return null
})

const fetchData = () => {
  loading.value = true
  currentQuestion.value = 1
  getEvaluationDetailsV2(props.evaluationId, {
    SubjectId: subjectId.value,
    SerieId: serieId.value,
    TestId: state.selectedTest.id,
  })
    .then(({ data }) => {
      evaluationsDetails.value = data
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })
}

// Refaz busca quando mudar série/assunto com modal aberto
watch([serieId, subjectId], () => {
  if (props.value) fetchData()
})

const enunciations = computed(() => {
  if (dataQuestion.value && Array.isArray(dataQuestion.value.contents)) {
    const EnunciationOne =
      dataQuestion.value.contents.find(
        question => EQuestionTypeEnunciation.EnunciationOne === question.questionType,
      ) || {}
    const EnunciationTwo =
      dataQuestion.value.contents.find(
        question => EQuestionTypeEnunciation.EnunciationTwo === question.questionType,
      ) || {}
    const EnunciationThree =
      dataQuestion.value.contents.find(
        question => EQuestionTypeEnunciation.EnunciationThree === question.questionType,
      ) || {}

    if (!EnunciationOne && !EnunciationTwo && !EnunciationThree) return {}

    return { EnunciationOne, EnunciationTwo, EnunciationThree }
  }
  return {}
})

const alternatives = computed(() => {
  if (dataQuestion.value && Array.isArray(dataQuestion.value.contents)) {
    const value = dataQuestion.value.contents
      .filter(question =>
        Object.values(EQuestionTypeAlternative).includes(question.questionType),
      )
      .map(question => {
        question.rightAlternative =
          dataQuestion.value.rightAlternative ===
          EQuestionTypeAlternativeResult[question.questionType]
        return question
      })
    return value
  }
  return []
})

const firstDescriptor = computed(() => {
  if (dataQuestion.value && Array.isArray(dataQuestion.value.descriptors)) {
    return dataQuestion.value.descriptors[0]
  }
  return null
})

const otherDescriptors = computed(() => {
  if (dataQuestion.value && Array.isArray(dataQuestion.value.descriptors)) {
    return dataQuestion.value.descriptors.slice(1)
  }
  return []
})

const fetchTests = async () => {
  if (!classe.value?.ClassId) {
    return
  }

  state.loadingTests = true
  state.error = null
  try {
    const { data } = await getEvaluationTestsLabel(props.evaluationId, {
      ClassId: classe.value.ClassId,
      subjectId: subjectId.value,
    })

    if (data.length > 1) {
      state.testList.push({ id: null, name: 'Todas as provas', subjectId: null })
    }

    state.testList.push(...data)

    handleTestChange(state.testList[0])
  } catch (error) {
    state.error = 'Erro ao carregar as provas'
  } finally {
    state.loadingTests = false
  }
}

const resetState = () => {
  state.testList = []
  state.selectedTest = {}
  state.loadingTests = false
  state.loadingQuestions = false
  state.error = null
}

const handleTestChange = test => {
  if (!test || test.id === state.selectedTest.id) return

  state.selectedTest = test
  fetchData()
}

const closeModal = () => {
  emit('input', false)
}

watch(
  () => props.value,
  newValue => {
    if (newValue) {
      resetState()
      fetchTests()
    } else {
      resetState()
    }
  },
  { immediate: false },
)

const { testList, selectedTest, loadingTests, error } = toRefs(state)
</script>

<style lang="scss" scoped>
  ::v-deep .modal-custom {
    width: 100%;
  }
  @media (min-width: 1200px) {
    ::v-deep .modal-custom {
      max-width: 1200px;
    }
  }
  h5 {
    font-weight: 400;
    font-size: 1.15rem;
  }

  .question-card {
    background: #efefef;
  }

  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }

  .question-letter {
    font-size: 0.857rem;
  }

  .alternativeResultTitle {
    font-weight: 800;
  }

  .icon-games-finished {
    height: 10px;
    width: 10px;
    border: 2px solid #28c76f;
    border-radius: 50%;
  }

  .icon-games-unfinished {
    height: 10px;
    width: 10px;
    border: 2px solid #ea5455;
    border-radius: 50%;
  }
</style>
<style lang="scss">
  .icon-circle-tooltip {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
  }
</style>