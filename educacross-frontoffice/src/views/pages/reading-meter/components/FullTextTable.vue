<template>
  <section>
    <div class="d-flex justify-content-center mb-2">
      <b-badge variant="light-primary"> {{ text.length }} palavras </b-badge>
    </div>
    <div class="words-container">
      <span v-for="(word, index) in text" :key="index" :class="getStatus(word)">
        {{ getLabel(word) }}
      </span>
    </div>
  </section>
</template>

<script setup>
  import { getReadingMeterWordStatusEnum } from '@/consts/ReadingMeterEnum'

  const props = defineProps({
    text: { type: Array, default: () => [] },
  })

  const getLabel = word => {
    if (word instanceof Object) return word.word
    return word
  }

  const getStatus = word => {
    if (!word.reading) return
    const status = word.reading
    const { textClass } = getReadingMeterWordStatusEnum(status)
    return textClass
  }
</script>

<style scoped>
  .words-container {
    font-weight: 600;
    line-height: 42px;
    font-size: 14px;
    font-style: normal;
  }
</style>