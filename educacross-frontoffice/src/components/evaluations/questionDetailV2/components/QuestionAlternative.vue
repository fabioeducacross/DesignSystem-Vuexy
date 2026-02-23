<template>
  <b-card
    no-body
    class="card-alternative h-100"
    :border-variant="alternative.rightAlternative ? 'success' : 'danger'"
  >
    <b-card-body body-class="body-alternative">
      <div class="d-flex align-items-center justify-content-center h-full conntent-img">
        <EvaluationsHtmlContentRenderer :content="alternative.value" class="alternative-content" />
      </div>
      <div class="letter-container">
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
    </b-card-body>

    <b-card-footer
      v-if="
        alternative.rightAlternative ||
        alternative.isHighestPerformance ||
        alternative.isHighestPerformanceFalse
      "
      footer-class="font-weight-bolder p-1 text-center rounded-0"
      footer-text-variant="white"
      :footer-bg-variant="alternative.rightAlternative ? 'success' : 'danger'"
      :footer-border-variant="alternative.rightAlternative ? 'success' : 'danger'"
    >
      <span v-if="alternative.rightAlternative">
        {{
          alternative.isHighestPerformance
            ? 'Alternativa com maior número de respostas.'
            : 'Alternativa correta.'
        }}
      </span>

      <span v-else-if="alternative.isHighestPerformance">
        Alternativa com maior número de respostas.
      </span>

      <span v-else-if="alternative.isHighestPerformanceFalse">
        Alternativa incorreta com maior número de respostas.
      </span>
    </b-card-footer>
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
})
</script>

<style lang="scss" scoped>
.letter-container {
  position: absolute;
  top: 0.5em;
  left: 0.5em;
}
.question-letter {
  font-size: 0.857rem;
}
.card-alternative {
  min-height: 80px;
}
.conntent-img img {
  max-height: 200px;
}
.border-success {
  border-width: 3px !important;
}
.body-alternative {
  min-height: 130px;
}
</style>