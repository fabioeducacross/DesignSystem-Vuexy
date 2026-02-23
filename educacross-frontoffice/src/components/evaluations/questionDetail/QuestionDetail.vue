<template>
  <b-modal
    v-if="value"
    id="question-detail-modal"
    ref="questionDetailModal"
    :visible="value"
    content-class="shadow "
    modal-class="d-flex flex-column justify-content-center"
    title="Detalhes da questão"
    hide-footer
    scrollable
    static
    size="xl"
    @close="closeModal"
    @hide="closeModal"
  >
    <b-skeleton-wrapper :loading="loading">
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
      <section v-if="dataQuestion">
        <b-row class="match-height">
          <b-col cols="12" lg="4">
            <MediaCard
              bg-variant="light-primary"
              :title="hitAnsweredCardTitle"
              :tooltip-text="hitAnsweredCardTooltipText"
              title-color="text-body"
              icon="checklist"
              variant="light-primary"
              right-align
            >
              <template #description>
                <span class="text-primary font-bold">
                  {{ dataQuestion.totalStudentsHitAnswered | formatNumber }} de
                  {{ dataQuestion.totalStudentsAnswered | formatNumber }} acertaram
                </span>
              </template>
            </MediaCard>
          </b-col>
          <b-col cols="12" lg="4">
            <MediaCard
              bg-variant="light-primary"
              title="Tempo médio de resposta"
              title-color="text-body"
              icon="timelapse"
              variant="light-primary"
              right-align
            >
              <template #description>
                <span class="text-primary font-bold">{{ dataQuestion.totalTime | formattedTime }}</span>
              </template>
            </MediaCard>
          </b-col>
          <b-col cols="12" lg="4">
            <MediaCard
              bg-variant="light-primary"
              title="Nível de dificuldade"
              title-color="text-body"
              icon="readiness_score"
              variant="light-primary"
              right-align
            >
              <template #description>
                <span class="text-primary font-bold">
                  {{ EQuestionDificultyLevelLabel[dataQuestion.level] }}
                </span>
              </template>
            </MediaCard>
          </b-col>
        </b-row>
        <!-- inicio template -->
        <b-card body-class="pb-0" class="question-card">
          <div class="d-flex align-items-center mb-2 gap-2">
            <Subjects :subject-id="dataQuestion.subjectId" :size="44" />
            <h4 class="font-bold text-body mb-0">
              Código da Questão: <span class="text-primary">{{ dataQuestion.questionId }}</span>
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
          <component
            :is="`Template${dataQuestion.templateId}`"
            v-if="dataQuestion.templateId && enunciations"
            :enunciations="enunciations"
            :alternatives="alternatives"
          />
        </b-card>
        <!-- fim template -->
        <b-row class="match-height">
          <b-col v-for="(alternative, index) in alternatives" :key="index" cols="12" sm="6" lg="3">
            <b-card :border-variant="alternative.rightAlternative ? 'success' : 'danger'">
              <b-card-text class="d-flex align-items-center gap-4">
                <div>
                  <b-avatar
                    size="sm"
                    class="question-letter"
                    :variant="alternative.rightAlternative ? 'success' : 'danger'"
                  >
                    <span class="question-letter">
                      {{ EQuestionContentLetter[alternative.questionType] }}
                    </span>
                  </b-avatar>
                </div>
                <div>
                  <h4 class="alternativeResultTitle">
                    <span v-b-tooltip.hover.top="alternative.result.students">
                      {{ alternative.result.performance | formatNumber }}%
                    </span>
                    dos alunos
                  </h4>
                  <h5 class="mb-0">
                    Responderam {{ EQuestionContentLetter[alternative.questionType] }}
                  </h5>
                </div>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="12">
            <h4 class="font-bold">
              Matriz/currículo: <span class="text-primary">{{ matriz }}</span>
            </h4>
            <div v-if="dataQuestion.knowledgeAxes" class="d-flex flex-wrap descriptorsList">
              <div
                v-for="(knowledgeAxe, index) in dataQuestion.knowledgeAxes"
                :key="index"
                class="pr-1 mr-1"
              >
                <p class="mb-0 small">
                  <span class="font-weight-bold">
                    {{ knowledgeAxe.knowledgeAxisName }}
                  </span>
                </p>
                <div class="d-flex flex-nowrap gap-2">
                  <div v-for="(item, idx) in knowledgeAxe.descriptors" :key="idx">
                    <b-badge pill variant="math">{{ item }}</b-badge>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </section>
    </b-skeleton-wrapper>
  </b-modal>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import Subjects from '@/components/subjects/subjects.vue'
import { EQuestionDificultyLevelLabel } from '@/consts/EQuestionDificultyLevel.js'
import {
  EQuestionContentLetter,
  EQuestionTypeAlternative,
  EQuestionTypeAlternativeResult,
  EQuestionTypeEnunciation,
} from '@/consts/EQuestionType.js'
import { getEvaluationStudentsQuestion } from '@/services/shared/evaluations/Evaluation.Service.js'
import { ref, computed, watch } from 'vue'
import { formatNumber, formattedTime } from '@/filters/filters'

// Async templates for dynamic import
const Template1 = () => import('./templates/Template1.vue')
const Template2 = () => import('./templates/Template2.vue')
const Template3 = () => import('./templates/Template3.vue')
const Template4 = () => import('./templates/Template4.vue')
const Template5 = () => import('./templates/Template5.vue')
const Template6 = () => import('./templates/Template6.vue')
const Template7 = () => import('./templates/Template7.vue')
const Template8 = () => import('./templates/Template8.vue')
const Template9 = () => import('./templates/Template9.vue')
const Template10 = () => import('./templates/Template10.vue')
const Template11 = () => import('./templates/Template11.vue')

// Props
const props = defineProps({
  value: Boolean,
  evaluationId: {
    required: true,
  },
  subjectId: { required: false },
  classId: { required: false },
  educationalOrganizationId: { required: false },
  questionId: { required: false },
  institutionId: { required: false },
  matriz: { required: false },
  networkGroupId: { required: false },
  hitAnsweredCardTitle: {
    type: String,
    required: false,
  },
  hitAnsweredCardTooltipText: {
    type: String,
    required: false,
  },
})

// Emits
const emit = defineEmits(['input'])

const loading = ref(false)
const dataQuestion = ref(null)

const fetchData = () => {
  loading.value = true
  getEvaluationStudentsQuestion(props.evaluationId, {
    SubjectId: props.subjectId,
    ClassId: props.classId,
    QuestionId: props.questionId,
    EducationalOrganizationId: props.educationalOrganizationId,
    NetworkGroupId: props.networkGroupId,
    InstitutionId: props.institutionId,
  })
    .then(({ data }) => {
      dataQuestion.value = data
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })
}

const enunciations = computed(() => {
  if (dataQuestion.value && Array.isArray(dataQuestion.value.content)) {
    return {
      EnunciationOne: dataQuestion.value.content.find(
        question => EQuestionTypeEnunciation.EnunciationOne === question.questionType,
      ),
      EnunciationTwo: dataQuestion.value.content.find(
        question => EQuestionTypeEnunciation.EnunciationTwo === question.questionType,
      ),
      EnunciationThree: dataQuestion.value.content.find(
        question => EQuestionTypeEnunciation.EnunciationThree === question.questionType,
      ),
    }
  }
  return []
})

const alternatives = computed(() => {
  if (dataQuestion.value && Array.isArray(dataQuestion.value.content)) {
    const value = dataQuestion.value.content
      .filter(question =>
        Object.values(EQuestionTypeAlternative).includes(question.questionType),
      )
      .map(question => {
        question.result = dataQuestion.value.alternativesResults.find(
          result =>
            EQuestionTypeAlternativeResult[question.questionType] === result.alternative,
        )
        if (!question.result) {
          question.result = {
            students: 0,
            performance: 0,
          }
        }
        question.rightAlternative =
          dataQuestion.value.rightAlternative ===
          EQuestionTypeAlternativeResult[question.questionType]
        return question
      })
    return value
  }
  return []
})

const closeModal = () => {
  emit('input', false)
}

watch(
  () => props.value,
  (isOpen) => {
    if (isOpen) {
      fetchData()
    }
  }
)
</script>

<style lang="scss" scoped>
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
</style>