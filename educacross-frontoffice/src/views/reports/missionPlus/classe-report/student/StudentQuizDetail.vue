<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import QuestionStatus from '@/components/question/QuestionStatus.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import {
  EQuestionAnswerStatus,
  getEQuestionAnswerStatusEnum,
} from '@/consts/EQuestionAnswerStatus'
import {
  EQuestionTypeAlternative,
  EQuestionTypeAlternativeResult,
  EQuestionTypeEnunciation,
} from '@/consts/EQuestionType'
import { getVariantByRule } from '@/consts/legends'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import QuestionAlternative from '@/views/pages/reading-expedition/units/student/components/QuestionAlternative.vue'
import QuestionContent from '@/views/pages/reading-expedition/units/student/components/QuestionContent.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  /** @type {import('vue').PropType<{
   *  imageUrl: String,
   *  topicName: String,
   *  attempts: Number,
   *  challenges: Number,
   *  quiz: Array
   * }>} */
  studentRound: {
    type: Object,
    required: true,
  },
  studentName: {
    type: String,
    default: '',
  },
})

const emit = defineEmits([])

const mainProps = {
  blank: true,
  blankColor: '#bbb',
  width: 100,
  height: 100,
}
const selectedTry = ref(props.studentRound.quiz)
const currentSlide = ref(0)

const fieldClass = status => {
  const statusEnum = getEQuestionAnswerStatusEnum(status)
  return `bg-light-${statusEnum.variant}`
}

const getEnunciations = item => {
  if (item && Array.isArray(item.questionContent)) {
    return {
      EnunciationOne: item.questionContent.find(
        question => EQuestionTypeEnunciation.EnunciationOne === question.questionType,
      ),
      EnunciationTwo: item.questionContent.find(
        question => EQuestionTypeEnunciation.EnunciationTwo === question.questionType,
      ),
      EnunciationThree: item.questionContent.find(
        question => EQuestionTypeEnunciation.EnunciationThree === question.questionType,
      ),
    }
  }
  return {}
}

const getStatus = item => {
  if (item) {
    return item.rightAlternative === item.alternative
      ? EQuestionAnswerStatus.Right
      : EQuestionAnswerStatus.Incorrect
  }
  return EQuestionAnswerStatus.Incorrect
}

const getAlternatives = item => {
  if (item && Array.isArray(item.questionContent)) {
    return item.questionContent
      .filter(question =>
        Object.values(EQuestionTypeAlternative).includes(question.questionType),
      )
      .map(question => {
        if (item) {
          question.isResponse =
            item.alternative === EQuestionTypeAlternativeResult[question.questionType]
        }
        question.rightAlternative =
          item.rightAlternative === EQuestionTypeAlternativeResult[question.questionType]
        return question
      })
  }
  return []
}

const quizes = computed(() => {
  return selectedTry.value.map((q, i) => {
    return {
      ...q,
      questions: q.questions.map(j => {
        return {
          ...j,
          enunciations: getEnunciations(j),
          alternatives: getAlternatives(j),
          status: getStatus(j),
        }
      }),
      try: i + 1,
    }
  })
})

const formatAlternativeNumber = number => {
  const numberToShow = number + 1
  return numberToShow < 10 ? `0${numberToShow}` : numberToShow
}

const changeSlide = value => {
  currentSlide.value = value
}

const legends = [accuracyPerformanceLegend]
</script>

<template>
  <div>
    <b-card class="shadow-none border mb-1">
      <b-media class="d-flex align-items-center">
        <template v-slot:aside>
          <b-img-lazy :src="studentRound.imageUrl" rounded v-bind="mainProps" />
        </template>
        <div class="d-flex justify-content-between align-items-center gap-1">
          <div class="flex-1">
            <h3 class="text-body">{{ studentRound.topicName }}</h3>
            <span class="font-14 text-primary font-medium"
              >{{ studentRound.challenges }} desafios realizados</span
            >
            <br />
            <span class="font-14 text-primary font-medium"
              >{{ studentRound.attempts }} tentativas</span
            >
          </div>
          <div class="flex-1 text-right">
            Acompanhe a evolução de
            <span class="text-primary font-bold">{{ studentName }}</span> nesse turno.
          </div>
        </div>
      </b-media>
    </b-card>

    <h6 class="text-primary font-semibold font-12 text-center">HISTÓRICO DE TENTATIVAS</h6>
    <b-table
      :fields="[
        { key: 'try', label: 'TENTATIVA', sortable: true },
        { key: 'startedTime', label: 'ÚLTIMO ACESSO', sortable: true },
        { key: 'hits', label: 'ACERTOS', sortable: true },
        { key: 'errors', label: 'ERROS', sortable: true },
        { key: 'finished', label: 'STATUS ', sortable: true },
        { key: 'performance', label: 'RENDIMENTO NA TENTATIVA', sortable: true },
        { key: 'totalTime', label: 'TEMPO INVESTIDO', sortable: true },
        { key: 'actions', label: 'AÇÕES' },
      ]"
      :items="quizes"
      class="border rounded"
      responsive
    >
      <template #cell(try)="row">
        <span class="font-bold">{{ row.value }}</span>
      </template>
      <template #cell(startedTime)="{ value }">
        {{ value | formattedDate }}
      </template>
      <template #cell(hits)="{ value }">
        <span class="text-primary">{{ value | formatNumber }}</span>
      </template>
      <template #cell(errors)="{ value }">
        <span class="text-danger">{{ value | formatNumber }}</span>
      </template>
      <template #cell(finished)="{ value }">
        <div>
          <b-badge v-if="value" pill variant="light-success">Concluído</b-badge>
          <b-badge v-else pill variant="light-danger">Não concluído</b-badge>
        </div>
      </template>
      <template #cell(performance)="{ value }">
        <SemaphoreStatus :status-enum="getVariantByRule(value, 'accuracyPerformance')">
          {{ value }}%
        </SemaphoreStatus>
      </template>
      <template #cell(totalTime)="{ value }">
        {{ value | formattedTime }}
      </template>
      <template #cell(actions)="row">
        <div @click="row.toggleDetails">
          <span
            :class="{ 'rotate-180': row.detailsShowing }"
            class="material-symbols-outlined cursor-pointer"
            >stat_minus_1</span
          >
        </div>
      </template>
      <template v-slot:row-details="row">
        <div>
          <h6 class="text-primary font-semibold font-12 text-center">
            GABARITO da TENTATIVA {{ row.item.try }}
          </h6>

          <b-table-simple outlined responsive table-class="rounded">
            <b-thead class="rounded">
              <b-tr>
                <b-th
                  v-for="(field, index) in row.item.questions"
                  :key="index"
                  :class="{
                    'currentQuestion bg-primary text-white border-primary': index === currentSlide,
                  }"
                  class="text-center py-50 question-header"
                  @click="currentSlide = index"
                >
                  <span
                    v-b-tooltip.hover.top="`Clique para ver a questão`"
                    class="material-symbols-outlined font-14 font-bold align-middle"
                    >visibility</span
                  >
                  <span class="align-middle">
                    {{ formatAlternativeNumber(index) }}
                  </span>
                </b-th>
              </b-tr>
            </b-thead>

            <b-tbody>
              <b-tr>
                <b-td
                  v-for="(item, index) in row.item.questions"
                  :key="item.id"
                  :class="[
                    `py-50 text-center question-field ${fieldClass(item.hit ? 1 : 2)} `,
                    { 'border-primary': index === currentSlide },
                  ]"
                  @click="currentSlide = index"
                >
                  <div class="d-flex align-items-center justify-content-center">
                    <QuestionStatus :status="item.hit ? 1 : 2" />
                  </div>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <b-carousel
            id="carousel-questions"
            :value="currentSlide"
            :interval="0"
            controls
            no-wrap
            @sliding-end="changeSlide"
          >
            <b-carousel-slide
              v-for="item in row.item.questions"
              :key="item.id"
              class="position-relative"
            >
              <template v-slot:img>
                <b-row class="match-height">
                  <b-col cols="12" md="5">
                    <b-card border-variant="gray" class="border shadow-none">
                      <div>
                        <h6 class="text-center text-primary text-uppercase">Proposta</h6>
                        <div>
                          <QuestionContent :content="item.enunciations.EnunciationOne" />
                        </div>
                      </div>
                    </b-card>
                  </b-col>
                  <b-col cols="12" md="7">
                    <b-card border-variant="gray" class="border shadow-none">
                      <h6 class="text-center text-primary text-uppercase">RESPOSTA DO ALUNO</h6>
                      <div>
                        <div v-for="(alternative, index) in item.alternatives" :key="index">
                          <QuestionAlternative :alternative="alternative" />
                        </div>
                      </div>
                    </b-card>
                  </b-col>
                </b-row>
              </template>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </template>
    </b-table>
    <b-card class="shadow-none border" no-body>
      <LegendEnum :legends="legends" />
    </b-card>
  </div>
</template>

<style lang="scss" scoped>
  .question-field,
  .question-header {
    opacity: 0.65;

    &.currentQuestion {
      opacity: 1;
    }
  }
</style>

<style>
  .b-table-details {
    background: rgba(186, 191, 199, 0.12);
  }
</style>