<template>
  <div>
    <!-- Texto simples -->
    <div v-if="content.questionContentType === 0">
      <p class="mb-0">{{ content.value }}</p>
    </div>
    <!-- HTML enriquecido -->
    <div v-if="content.questionContentType === 1">
      <EvaluationsHtmlContentRenderer :content="content.value" max-image-height="400px" />
    </div>
    <!-- Imagem -->
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

  const props = defineProps({
    content: {
      type: Object,
      required: true,
    },
  })

  // Props are accessed as 'content' directly in template
</script>

<style lang="scss" scoped>
  .conntent-img img {
    max-height: 400px;
  }
</style>