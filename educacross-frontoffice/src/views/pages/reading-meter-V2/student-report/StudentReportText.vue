<template>
  <section>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card>
          <b-skeleton height="400px" />
        </b-card>
      </template>
      <div class="words-container">
        <span
          v-for="(word, index) in filteredTranscription"
          :key="`word-${index}-${getWordLabel(word)}`"
          :class="getWordStatusClass(word)"
        >
          {{ getWordLabel(word) }}
        </span>
      </div>
    </b-skeleton-wrapper>
  </section>
</template>

<script setup>
import { useStudentReport } from './useStudentReport'
import { getReadingMeterWordStatusEnum } from '@/consts/ReadingMeterEnum'
import { ref, computed } from 'vue'

const loading = ref(false)
const { readingDetail } = useStudentReport()

const readingData = computed(() => {
  const transcription = readingDetail.value?.report?.transcription || []
  const referenceWords = readingDetail.value?.report?.referenceWords || []
  return {
    transcription,
    referenceWords,
  }
})

const filteredTranscription = computed(() => {
  if (!readingData.value?.transcription && !readingData.value?.referenceWords) {
    return []
  }
  if (readingData.value.transcription.length) {
    return readingData.value.transcription.filter(word => word.reading !== 3)
  }
  return readingData.value.referenceWords
})

const getWordLabel = word => {
  if (word instanceof Object) return word.word || ''
  return word
}

const getWordStatusClass = word => {
  if (!word.reading) return ''
  const statusEnum = getReadingMeterWordStatusEnum(word.reading)
  return statusEnum ? statusEnum.textClass : ''
}
</script>

<style lang="scss" scoped>
  .words-container {
    font-weight: 600;
    line-height: 42px;
    font-size: 14px;
    font-style: normal;
  }
</style>