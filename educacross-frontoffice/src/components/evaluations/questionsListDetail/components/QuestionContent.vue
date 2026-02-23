<template>
  <div>
    <div v-if="content.questionContentType === 1">
      <EvaluationsHtmlContentRenderer :content="content.value" max-image-height="400px" />
    </div>
    <div
      v-if="content.questionContentType === 2"
      class="d-flex justify-content-center conntent-img"
    >
      <b-img :src="content.value" fluid></b-img>
    </div>
  </div>
</template>

<script setup>
import EvaluationsHtmlContentRenderer from '@/components/evaluations/shared/EvaluationsHtmlContentRenderer.vue'

// Props
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
})

// Destructure for template use
const { content } = props
</script>

<style lang="scss" scoped>
.conntent-img img {
  max-height: 400px;
}
</style>