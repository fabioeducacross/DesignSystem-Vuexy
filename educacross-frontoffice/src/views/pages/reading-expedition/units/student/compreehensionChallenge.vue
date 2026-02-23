<template>
  <div class="px-1">
    <b-table-simple responsive outlined>
      <b-thead>
        <b-tr>
          <b-th :colspan="columns" class="text-center bg-white py-1">
            <span class="text-primary text-center">GABARITO DO ALUNO</span>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th
            v-for="(field, index) in tableFields"
            :key="index"
            class="text-center py-50 question-header"
            :class="{ currentQuestion: index === currentSlide }"
          >
            {{ field.label }}
          </b-th>
        </b-tr>
      </b-thead>

      <b-tbody>
        <b-tr>
          <b-td
            v-for="(item, index) in dataTable"
            :key="item.proposal"
            :class="`py-50 text-center question-field ${fieldClass(item.status)} ${
              index === currentSlide ? 'currentQuestion' : ''
            }`"
          >
            <div class="d-flex align-items-center justify-content-center">
              <QuestionStatus :status="item.status" />
            </div>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <b-carousel
      id="carousel-questions"
      v-model="currentSlide"
      :interval="0"
      controls
      no-wrap
      @sliding-end="changeSlide"
    >
      <!-- Text slides with image -->
      <b-carousel-slide v-for="item in dataTable" :key="item.proposal" class="position-relative">
        <template #img>
          <b-row class="match-height">
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

    <div>
      <b-pagination
        v-if="totalData > 0"
        :value="currentPage"
        :total-rows="totalData"
        hide-ellipsis
        per-page="1"
        limit="20"
        hide-goto-end-buttons
        @change="value => changePage(value)"
      >
        <!--  <template v-slot:prev-text>
          <span></span>
          !-- <feather-icon icon="ChevronLeftIcon" size="18" /> --
        </template>
        <template v-slot:next-text>
          <span></span>
          !-- <feather-icon icon="ChevronRightIcon" size="18" /> --
        </template> -->
      </b-pagination>
    </div>
  </div>
</template>

<script setup>
import QuestionStatus from '@/components/question/QuestionStatus.vue'
import {
  EQuestionAnswerStatus,
  getEQuestionAnswerStatusEnum,
} from '@/consts/EQuestionAnswerStatus.js'
import {
  EQuestionTypeAlternative,
  EQuestionTypeAlternativeResult,
  EQuestionTypeEnunciation,
} from '@/consts/EQuestionType.js'
import { EExpeditionStageStatus } from '@/consts/ReadingExpeditionEnum.js'
import store from '@/store'
import readingExpeditionUnitStudentCompreehensionChallengeModule from '@/store/pageModules/readingExpedition/readingExpeditionUnitStudentCompreehensionChallengeModule.js'
import QuestionAlternative from '@/views/pages/reading-expedition/units/student/components/QuestionAlternative.vue'
import QuestionContent from '@/views/pages/reading-expedition/units/student/components/QuestionContent.vue'
import { computed, getCurrentInstance, onUnmounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy

const getEnunciations = item => {
  if (item && Array.isArray(item.content)) {
    const enunciation = item.content.find(
      question => EQuestionTypeEnunciation.EnunciationOne === question.questionType,
    )
    return {
      EnunciationOne: enunciation,
    }
  }
  return {}
}

const getStatus = item => {
  if (item.response && typeof item.response.hit === 'boolean') {
    return item.response.hit ? EQuestionAnswerStatus.Right : EQuestionAnswerStatus.Incorrect
  }
  return EQuestionAnswerStatus.Unanswered
}

const getAlternatives = item => {
  if (item && Array.isArray(item.content)) {
    const alternatives = item.content
      .filter(question =>
        Object.values(EQuestionTypeAlternative).includes(question.questionType),
      )
      .map(question => {
        // Criar copia do objeto ao inves de mutar o original
        const alternativeCopy = { ...question }

        if (item.response) {
          alternativeCopy.isResponse =
            item.response.alternative ===
            EQuestionTypeAlternativeResult[question.questionType]
        }
        alternativeCopy.rightAlternative =
          item.rightAlternative === EQuestionTypeAlternativeResult[question.questionType]

        return alternativeCopy
      })
    return alternatives
  }
  return []
}

vm.$bus.on('reloadChallenge', () => {
  store.commit('readingExpeditionUnitStudentModule/loading', true)
  store.dispatch('readingExpeditionUnitStudentCompreehensionChallengeModule/fetch')
})

const moduleName = 'readingExpeditionUnitStudentCompreehensionChallengeModule'
store.registerModule(moduleName, readingExpeditionUnitStudentCompreehensionChallengeModule)

onUnmounted(() => {
  vm.$bus.off('reloadChallenge')
  store.unregisterModule(moduleName)
})

const dataTable = computed(() => {
  const data = store.getters['readingExpeditionUnitStudentCompreehensionChallengeModule/data']

  // Validacao: garantir que data e um array
  if (!Array.isArray(data)) {
    return []
  }

  return data.map(item => {
    return {
      // Usa proposal como identificador estavel para chaves de renderizacao
      id: item.proposal,
      ...item,
      enunciations: getEnunciations(item),
      alternatives: getAlternatives(item),
      status: getStatus(item),
    }
  })
})

const tableFields = computed(() => {
  return dataTable.value.map(item => {
    return {
      key: item.proposal,
      label: item.proposal,
      tdClass: `py-50 text-center ${fieldClass(item.status)}`,
    }
  })
})

const columns = computed(() => tableFields.value?.length || 1)

const fieldClass = status => {
  const statusEnum = getEQuestionAnswerStatusEnum(status)
  return `bg-light-${statusEnum.variant}`
}

store.dispatch('readingExpeditionUnitStudentCompreehensionChallengeModule/fetch')

const currentPage = ref(1)
const totalData = computed(() => dataTable.value.length || 0)

const currentSlide = ref(0)

const changePage = value => {
  currentSlide.value = value - 1
}
const changeSlide = value => {
  currentPage.value = value + 1
}

watch(dataTable, () => {
  // Reset paginacao/slide ao trocar de unidade ou quando o dataset mudar
  currentSlide.value = 0
  currentPage.value = 1

  if (dataTable.value.length) {
    store.dispatch('readingExpeditionUnitStudentModule/setChallengeDetails', {
      lastAccessDate: dataTable.value[currentSlide.value].date,
      totalSeconds: dataTable.value[currentSlide.value].time,
      currentProficiency: {
        status: EExpeditionStageStatus.Finished,
        level: dataTable.value[currentSlide.value].level,
        changeLevel: dataTable.value[currentSlide.value].changeLevel !== undefined,
      },
    })
  } else {
    store.dispatch('readingExpeditionUnitStudentModule/resetChallengeDetails')
  }
})
</script>

<style lang="scss" scoped>
  .question-field,
  .question-header {
    opacity: 0.65;

    &.currentQuestion {
      opacity: 1;
    }
  }
</style>
