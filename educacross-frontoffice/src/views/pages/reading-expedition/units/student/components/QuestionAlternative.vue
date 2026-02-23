<template>
  <b-card
    class="card-alternative border rounded-pill"
    :class="{ 'border-response': alternative.isResponse }"
    body-class="p-50"
    :border-variant="
      alternative.rightAlternative ? 'success' : alternative.isResponse ? 'danger' : 'gray'
    "
  >
    <div class="d-flex align-items-center">
      <div class="letter-container flex-grow-0">
        <b-avatar
          size="sm"
          class="question-letter"
          :variant="
            alternative.rightAlternative
              ? 'light-success'
              : alternative.isResponse
              ? 'light-danger'
              : 'gray'
          "
        >
          <span class="question-letter">
            {{ EQuestionContentLetter[alternative.questionType] }}
          </span>
        </b-avatar>
      </div>
      <div
        class="d-flex align-items-center justify-content-center h-full conntent-img flex-grow-1"
        :class="
          alternative.rightAlternative
            ? 'text-success'
            : alternative.isResponse
            ? 'text-danger'
            : ''
        "
      >
        <!-- Texto simples -->
        <span v-if="alternative.questionContentType === 0" class="text-xl">
          {{ alternative.value }}
        </span>
        <!-- HTML enriquecido -->
        <EvaluationsHtmlContentRenderer
          v-if="alternative.questionContentType === 1"
          :content="alternative.value"
          class="text-xl"
          max-image-height="200px"
        />
        <!-- Imagem -->
        <b-img v-if="alternative.questionContentType === 2" :src="alternative.value" fluid></b-img>
      </div>
    </div>
  </b-card>
</template>

<script setup>
import EvaluationsHtmlContentRenderer from '@/components/evaluations/shared/EvaluationsHtmlContentRenderer.vue'
import { EQuestionContentLetter } from '@/consts/EQuestionType.js'

const props = defineProps({
  alternative: {
    type: Object,
    required: true,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
})

// Provide EQuestionContentLetter to template
</script>

<style lang="scss" scoped>
  .letter-container {
    /*  position: absolute;
    top: 0.5em;
    left: 0.5em; */
  }
  .question-letter {
    font-size: 0.857rem;
  }
  .card-alternative {
    //min-height: 80px;
  }
  .conntent-img img {
    max-height: 200px;
  }
  .border-response {
    border-width: 3px !important;
  }
  .badge-gray {
    color: #6e6b7b;
    background-color: #ccc;
  }
</style>