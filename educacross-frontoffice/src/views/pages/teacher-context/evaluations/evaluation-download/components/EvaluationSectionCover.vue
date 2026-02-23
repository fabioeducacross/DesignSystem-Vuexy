<script setup>
import { defineComponent } from 'vue'

const props = defineProps({
  blockIndex: {
    type: Number,
    required: true,
  },
  blockName: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="evaluation-section-cover">
    <h2 class="mb-0">
      Bloco de prova {{ blockIndex }}: <span class="text-primary">{{ blockName }}</span>
    </h2>
  </section>
</template>

<style scoped lang="scss">
  .evaluation-section-cover {
    width: 46.7rem;
    height: 66.125rem;
    padding: 2.5rem;

    background-color: white;
    break-inside: avoid;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media print {
    .evaluation-section-cover {
      padding: 0;
    }
  }
</style>