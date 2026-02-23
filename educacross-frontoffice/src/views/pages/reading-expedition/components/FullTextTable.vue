<template>
  <div class="words-container">
    <span v-for="(word, index) in text" :key="index" :class="getStatus(word)">
      {{ getLabel(word) }}
    </span>
  </div>
</template>

<script setup>
import { getReadingMeterWordStatusEnum } from '@/consts/ReadingExpeditionEnum.js'

// Props
const props = defineProps({
  text: { type: Array, default: () => [] },
})

// Methods
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
