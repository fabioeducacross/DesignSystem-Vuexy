<template>
  <b-card
    class="card-alternative"
    :bg-variant="alternative.rightAlternative ? 'light-success' : ''"
    :border-variant="alternative.rightAlternative ? 'success' : 'gray'"
  >
    <div class="d-flex align-items-center justify-content-center h-full conntent-img">
      <b-img v-if="alternative.questionContentType === 2" :src="alternative.value" fluid></b-img>
      <EvaluationsHtmlContentRenderer
        v-if="alternative.questionContentType === 1"
        :content="alternative.value"
        class="text-xl"
        max-image-height="200px"
      />
    </div>
    <div class="letter-container">
      <b-avatar
        size="sm"
        class="question-letter"
        :variant="alternative.rightAlternative ? 'success' : 'gray'"
      >
        <span class="question-letter">
          {{ EQuestionContentLetter[alternative.questionType] }}
        </span>
      </b-avatar>
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
</style>