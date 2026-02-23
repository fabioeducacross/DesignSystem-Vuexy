<template>
  <b-modal
    v-if="value"
    id="question-detail-modal"
    ref="question-detail-modal"
    :visible="value"
    content-class="shadow "
    modal-class="d-flex flex-column justify-content-center"
    title="Detalhes da questão"
    scrollable
    static
    size="lg"
    @close="closeModal"
    @hide="closeModal"
  >
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
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
        <!-- inicio template -->

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

        <b-card body-class="p-1" border-variant="light-gray shadow-none">
          <b-row>
            <b-col cols="12" md="4">
              <div>
                <span class="font-bold">
                  Matriz/currículo: <span class="text-primary">{{ matriz }}</span>
                </span>
              </div>
              <template v-if="dataQuestion.knowledgeAxis">
                <div v-if="dataQuestion.knowledgeAxis.knowledgeAxisName">
                  <span class="font-bold">
                    Temática:
                    <span class="text-primary">{{ dataQuestion.knowledgeAxis.knowledgeAxisName }}</span>
                  </span>
                </div>

                <div v-if="dataQuestion.knowledgeAxis.descriptor">
                  <span class="font-bold">
                    Habilidade:
                    <b-badge pill variant="math">{{ dataQuestion.knowledgeAxis.descriptor.tag }}</b-badge>
                  </span>
                </div>
              </template>

              <!--   <div v-if="dataQuestion.knowledgeAxes" class="d-flex flex-wrap descriptorsList">
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
                    <div v-for="(item, index) in knowledgeAxe.descriptors" :key="index">
                      <b-badge pill variant="math">{{ item }}</b-badge>
                    </div>
                  </div>
                </div>
              </div> -->
            </b-col>
            <b-col cols="12" md="8">
              <div v-if="dataQuestion.knowledgeAxis && dataQuestion.knowledgeAxis.descriptor">
                <span class="font-bold"> Descritor da habilidade: </span>
                <span>{{ dataQuestion.knowledgeAxis.descriptor.name }}</span>
              </div>
            </b-col>
          </b-row>
        </b-card>

        <b-row class="match-height">
          <b-col cols="12" lg="4">
            <b-card border-variant="light-gray shadow-none">
              <h5 class="text-body">
                {{ $t('Rendimento') }}
              </h5>

              <PieChart :data="answeredchartOptions" />

              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center justify-content-start gap-1">
                  <div class="icon-games-finished"></div>
                  <span>Acertos</span>
                </div>
                <span class="font-bold text-success">
                  {{ formatNumber(calcPercent(
                    dataQuestion.totalStudentsHitAnswered,
                    dataQuestion.totalStudentsAnswered,
                  )) }}%
                </span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center justify-content-start gap-1">
                  <div class="icon-games-unfinished"></div>
                  <span>Erros</span>
                </div>
                <span class="font-bold text-danger">
                  {{ formatNumber(calcPercent(
                    dataQuestion.totalStudentsAnswered - dataQuestion.totalStudentsHitAnswered,
                    dataQuestion.totalStudentsAnswered,
                  )) }}%
                </span>
              </div>
            </b-card>
          </b-col>
          <b-col cols="12" lg="4">
            <b-card border-variant="light-gray shadow-none" body-class="pb-0">
              <h5 class="text-body">
                {{ $t('Alternativas mais respondidas') }}
              </h5>

              <vue-apex-charts
                ref="refChart"
                :options="alternativesChartOptions.chartOptions"
                :series="alternativesChartOptions.series"
                :height="200"
              />
            </b-card>
          </b-col>
          <b-col cols="12" lg="4">
            <b-row class="match-height h-full">
              <b-col cols="12">
                <MediaCard
                  border-variant="light-gray shadow-none"
                  title="Nível de dificuldade"
                  title-color="text-body"
                  icon="readiness_score"
                  variant="light-primary"
                  right-align
                >
                  <template v-slot:description>
                    <span class="text-primary font-bold">
                      {{ EQuestionDificultyLevelLabel[dataQuestion.level] }}
                    </span>
                  </template>
                </MediaCard>
              </b-col>
              <b-col cols="12">
                <MediaCard
                  border-variant="light-gray shadow-none"
                  title="Tempo médio de resposta"
                  title-color="text-body"
                  icon="timelapse"
                  variant="light-primary"
                  right-align
                >
                  <template v-slot:description>
                    <span class="text-primary font-bold">
                      {{ formattedTime(dataQuestion.totalTime) }}
                    </span>
                  </template>
                </MediaCard>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <component
          :is="TemplateDefault"
          v-if="enunciations"
          :enunciations="enunciations"
          :alternatives="alternatives"
        />
      </section>
    </b-skeleton-wrapper>
    <template #modal-footer>
      <div class="w-100 d-flex align-items-center justify-content-center">
        <b-pagination
          :value="currentQuestion"
          :total-rows="total"
          :per-page="1"
          first-number
          last-number
          class="mb-0"
          prev-class="prev-item"
          next-class="next-item"
          @change="value => (currentQuestion = value)"
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
import TemplateDefault from './templates/TemplateDefault.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import PieChart from '@/components/chart/PieChart.vue'
import Subjects from '@/components/subjects/subjects.vue'
import { EQuestionDificultyLevelLabel } from '@/consts/EQuestionDificultyLevel.js'
import {
  EQuestionContentLetter,
  EQuestionTypeAlternative,
  EQuestionTypeAlternativeResult,
  EQuestionTypeEnunciation,
} from '@/consts/EQuestionType.js'
import { formatNumber, formattedTime } from '@/filters/filters'
import { getEvaluationStudentsQuestion } from '@/services/shared/evaluations/Evaluation.Service.js'
import { calcPercent } from '@/utils/number.js'
import { computed, ref, watch } from 'vue'
import VueApexCharts from 'vue-apexcharts'

// Props
const props = defineProps({
  value: {
    type: Boolean,
  },
  questions: {
    type: Array,
  },
  idsQuestions: {
    type: Array,
  },
  total: {
    type: Number,
  },
  evaluationId: {
    required: true,
  },
  subjectId: { required: false },
  classId: { required: false },
  educationalOrganizationId: { required: false },
  questionId: { required: false },
  matriz: { required: false },
  networkGroupId: { required: false },
  institutionId: { required: false },
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

// State
const modalShow = ref(true)
const loading = ref(false)
const dataQuestion = ref(null)
const currentQuestion = ref(1)

const fetchData = (questionId = null) => {
  loading.value = true

  const selectedQuestionId =
    questionId || props.questionId || props.idsQuestions[currentQuestion.value - 1]

  getEvaluationStudentsQuestion(props.evaluationId, {
    SubjectId: props.subjectId,
    ClassId: props.classId,
    QuestionId: selectedQuestionId,
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
        question.result.performance = Math.trunc(question.result.performance)
        question.isHighestPerformance = false
        question.isHighestPerformanceFalse = false
        question.rightAlternative =
          dataQuestion.value.rightAlternative ===
          EQuestionTypeAlternativeResult[question.questionType]
        return question
      })

    const maxPerformance = Math.max(...value.map(item => item.result.performance))
    const highestPerformanceItems = value.filter(
      item => item.result.performance === maxPerformance,
    )

    let highestPerformanceItem = null
    let highestPerformanceItemFalse = null

    if (highestPerformanceItems.length === 1) {
      highestPerformanceItem = highestPerformanceItems[0]
      highestPerformanceItem.isHighestPerformance = true

      if (highestPerformanceItem.rightAlternative === true) {
        const maxPerformanceFalse = Math.max(
          ...value
            .filter(item => !item.rightAlternative)
            .map(item => item.result.performance),
        )
        const highestPerformanceItemsFalse = value.filter(
          item => item.result.performance === maxPerformanceFalse && !item.rightAlternative,
        )

        if (highestPerformanceItemsFalse.length === 1) {
          highestPerformanceItemFalse = highestPerformanceItemsFalse[0]
          highestPerformanceItemFalse.isHighestPerformanceFalse = true
        }
      }
    }

    return value
  }
  return []
})

const answeredchartOptions = computed(() => {
  if (!dataQuestion.value) return {}
  return {
    series: [
      dataQuestion.value.totalStudentsHitAnswered,
      dataQuestion.value.totalStudentsAnswered - dataQuestion.value.totalStudentsHitAnswered,
    ],
    colors: ['#28C76F', '#EA5455'],
    tooltipLabels: ['Acertos: ', 'Erros: '],
  }
})

const labels = computed(() =>
  alternatives.value.map(alternative => alternative.result.students),
)

const alternativesChartOptions = computed(() => {
  const colors = []
  const categories = []
  const series = []
  const students = []

  alternatives.value.forEach(alternative => {
    colors.push(alternative.rightAlternative ? '#28C76F' : '#EA5455')
    series.push(alternative.result.performance)
    categories.push(EQuestionContentLetter[alternative.questionType])
    students.push(alternative.result.students)
  })

  return {
    series: [{ name: 'Performance', data: series }],
    chartOptions: {
      chart: {
        type: 'bar',
        height: 250,
        fontFamily: 'Montserrat',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      colors,
      dataLabels: {
        enabled: false,
      },
      values: labels,
      tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          return `<div class="apexcharts-tooltip-title font-weight-bolder p-50">Alternativa ${
            w.globals.labels[dataPointIndex]
          }</div>
                        <div class="text-body px-50">
                          <span class="icon-circle-tooltip" style="background-color: ${
                            colors[dataPointIndex]
                          };">
                          </span>

                          ${labels.value[dataPointIndex]} (${formatNumber(
            series[seriesIndex][dataPointIndex],
          )}%)</div>

                        `
        },
      },
      xaxis: {
        categories,
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        max: 100,
        tickAmount: 4,
      },
    },
  }
})

const closeModal = () => {
  emit('input', false)
}

watch(
  () => [props.idsQuestions, props.value],
  ([newIds, isOpen]) => {
    if (isOpen && newIds && newIds.length > 0) {
      const currentIndex = newIds.findIndex(id => id === props.questionId)

      currentQuestion.value = currentIndex !== -1 ? currentIndex + 1 : 1

      fetchData(props.questionId)
    }
  },
)

watch(currentQuestion, (newPage, oldPage) => {
  if (
    oldPage &&
    newPage !== oldPage &&
    props.idsQuestions &&
    props.idsQuestions.length > 0 &&
    props.value
  ) {
    const questionId = props.idsQuestions[newPage - 1]
    if (questionId) {
      fetchData(questionId)
    }
  }
})
</script>

<style lang="scss" scoped>
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