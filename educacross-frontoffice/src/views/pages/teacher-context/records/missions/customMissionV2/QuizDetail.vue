<script setup>
import {
  EQuestionTypeAlternative,
  EQuestionTypeAlternativeResult,
  EQuestionTypeEnunciation,
} from '@/consts/EQuestionType'
import axiosIns from '@/libs/axios'
import QuestionAlternative from '@/views/pages/reading-expedition/units/student/components/QuestionAlternative.vue'
import QuestionContent from '@/views/pages/reading-expedition/units/student/components/QuestionContent.vue'
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  topicId: {
    type: Number,
  },
  descriptorId: {
    type: Number,
  },
  value: {
    type: Boolean,
    default: false,
    required: true,
  },
})

// Emits
const emit = defineEmits(['input'])

// Modal open/close two-way binding
const openQuizDetail = computed({
  get: () => props.value,
  set: value => {
    if (!value) {
      quizDetails.value = {
        questions: [],
      }
    }
    emit('input', value)
  },
})

const currentPage = ref(1)
const rows = ref(0)
const quizDetails = ref({
  questions: [],
})
const loading = ref(true)

const getEnunciations = item => {
  if (item && Array.isArray(item.content)) {
    const enunciation = item.content.find(
      question => EQuestionTypeEnunciation.EnunciationOne === question.questionType,
    )
    if (!enunciation) {
      return {}
    }
    return {
      EnunciationOne: {
        ...enunciation,
        questionContentType:
          enunciation.questionContentType === 0 ? 1 : enunciation.questionContentType,
      },
    }
  }
  return {}
}

const getAlternatives = item => {
  if (item && Array.isArray(item.content)) {
    return item.content
      .filter(question =>
        Object.values(EQuestionTypeAlternative).includes(question.questionType),
      )
      .map(question => {
        question.questionContentType =
          question.questionContentType === 0 ? 1 : question.questionContentType
        question.rightAlternative =
          item.rightAlternative === EQuestionTypeAlternativeResult[question.questionType]
        return question
      })
  }
  return []
}

const processDataTable = computed(() => {
  const startIndex = (currentPage.value - 1) * 2
  const endIndex = startIndex + 2

  return quizDetails.value.questions.slice(startIndex, endIndex).map(item => {
    return {
      ...item,
      enunciations: getEnunciations(item),
      alternatives: getAlternatives(item),
    }
  })
})

const getQuizDetails = async () => {
  loading.value = true

  const response = await axiosIns.get('/v2/activities/quiz/detail', {
    params: {
      TopicId: props.topicId,
      DescriptorId: props.descriptorId,
    },
  })

  quizDetails.value = response.data
  rows.value = response.data.questions.length
  loading.value = false
}

watch(openQuizDetail, async value => {
  if (value) {
    currentPage.value = 1
    await getQuizDetails()
  }
})
</script>

<template>
  <b-modal
    v-model="openQuizDetail"
    centered
    hide-footer
    size="lg"
    static
    title="Exemplos de questões"
  >
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-skeleton height="100px" />
        <b-skeleton height="300px" />
        <b-skeleton height="300px" />
      </template>
      <div>
        <b-media class="mb-1">
          <template v-slot:aside>
            <b-img
              :src="quizDetails.imageUrl"
              alt="Imagem do jogo"
              fluid
              height="100px"
              width="100px"
            />
          </template>
          <b-media-body>
            <h4 class="text-primary">{{ quizDetails.topicName }}</h4>
            <b-card-text>
              <p class="mb-0">
                Objeto do conhecimento:
                <span class="text-primary font-semibold">
                  {{ quizDetails.objectOfKnowledgeName }}
                </span>
              </p>
              <p class="mb-0">
                Temática:
                <span class="text-primary font-semibold">{{ quizDetails.thematicName }}</span>
              </p>
            </b-card-text>
          </b-media-body>
        </b-media>
        <b-row v-for="item in processDataTable" :key="item.id" class="match-height">
          <b-col cols="12" md="5">
            <b-card border-variant="gray" class="border">
              <div>
                <h6 class="text-center text-primary text-uppercase">Proposta</h6>
                <div>
                  <QuestionContent :content="item.enunciations.EnunciationOne" />
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col cols="12" md="7">
            <b-card border-variant="gray" class="border">
              <h6 class="text-center text-primary text-uppercase">ALTERNATIVAS</h6>
              <div>
                <div v-for="(alternative, index) in item.alternatives" :key="index">
                  <QuestionAlternative :alternative="alternative" />
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-pagination
          v-model="currentPage"
          :per-page="2"
          :total-rows="rows"
          first-number
          last-number
          next-class="next-item"
          prev-class="prev-item"
        >
          <template v-slot:prev-text>
            <feather-icon icon="ChevronLeftIcon" size="18" />
          </template>
          <template v-slot:next-text>
            <feather-icon icon="ChevronRightIcon" size="18" />
          </template>
        </b-pagination>
      </div>
    </b-skeleton-wrapper>
  </b-modal>
</template>
