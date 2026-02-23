<template>
  <div class="question-content">
    <EvaluationsHtmlContentRenderer :content="content.value" max-image-height="400px" />
  </div>
</template>

<script setup>
import EvaluationsHtmlContentRenderer from '@/components/evaluations/shared/EvaluationsHtmlContentRenderer.vue'

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
})

const { content } = props
</script>

<style lang="scss" scoped></style>