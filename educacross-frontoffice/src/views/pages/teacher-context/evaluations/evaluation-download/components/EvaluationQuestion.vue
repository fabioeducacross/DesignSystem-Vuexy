<script setup>
import HtmlContentRenderer from '@/components/evaluations/shared/EvaluationsHtmlContentRenderer.vue'
import {
  formatQuestionNumber,
  getAlphabetLetter,
  getEnunciation,
  getQuestionOptions,
} from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationPdfUtils'
import { ref, computed } from 'vue'

/**
 * @typedef {import('src/services/shared/evaluations/Evaluation.Service.js').Question} Question
 */

// Props
const props = defineProps({
  /**
   * @type {import('vue').PropOptions<Question>}
   */
  question: {
    type: Object,
    required: true,
  },
  questionNumber: {
    type: Number,
    required: true,
  },
})

const optionsAreImages = () => {
  const options = getQuestionOptions(props.question)
  return options.every(
    option => option.value.includes('<img') && option.value.includes('src='),
  )
}

const optionsWithImagesAndText = () => {
  const options = getQuestionOptions(props.question)
  return options.some(
    option =>
      option.value.includes('<img') &&
      option.value.includes('src=') &&
      option.value.replace(/<img[^>]*>/g, '').trim() !== '',
  )
}
</script>

<template>
  <section class="evaluation-question-page text-black">
    <div
      class="d-flex align-items-center justify-content-between gap-4 evaluation-question-header mb-50"
    >
      <h5 class="mb-0 font-bold">
        Questão: <span class="text-primary">{{ formatQuestionNumber(props.questionNumber) }}</span>
      </h5>
      <h5 class="mb-0 font-bold">
        Código: <span class="text-primary">{{ props.question.id }}</span>
      </h5>
    </div>
    <div class="border rounded p-1">
      <HtmlContentRenderer
        :content="getEnunciation(props.question).value"
        class="evaluation-enunciation"
        max-image-width="400px"
      />

      <div
        v-if="optionsAreImages() && !optionsWithImagesAndText()"
        class="evaluation-options-container images-grid"
      >
        <div
          v-for="(content, index) in getQuestionOptions(props.question)"
          :key="index"
          class="d-flex align-items-center"
        >
          ({{ getAlphabetLetter(index) }})
          <div class="evaluation-image-option">
            <HtmlContentRenderer
              :content="content.value"
              max-image-height="208px"
              max-image-width="208px"
            />
          </div>
        </div>
      </div>

      <div v-else class="evaluation-options-container">
        <div
          v-for="(content, index) in getQuestionOptions(props.question)"
          :key="index"
          class="d-flex align-items-start gap-2 mb-50"
          style="break-inside: avoid"
        >
          <span>({{ getAlphabetLetter(index) }})</span>
          <HtmlContentRenderer :content="content.value" max-image-height="208px" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .evaluation-question-header {
    break-after: avoid;
  }

  .evaluation-question-page {
    background: white;
    padding-bottom: 2.5rem;

    width: 46.7rem;
  }

  .evaluation-enunciation {
    margin-bottom: 1.5rem;
    break-inside: auto;
  }

  .evaluation-options-container {
    break-inside: avoid;
    break-before: auto;

    &.images-grid {
      display: grid;
      grid-template-columns: repeat(2, 230px);

      gap: 1.25rem;
    }
  }

  .evaluation-image-option {
    border: 1px solid #666;
    width: 210px;
    height: 210px;
    padding: 1px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media print {
    .evaluation-question-page {
      padding: 0;
      margin-bottom: 2rem;
    }
  }
</style>

<style lang="scss">
  .evaluation-image-option {
    img {
      max-width: 208px;
      max-height: 208px;
    }
  }
</style>