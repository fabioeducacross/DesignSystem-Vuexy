<template>
  <ComparatorWords
    :table-type="details.type"
    :reference="referenceWords"
    :result="transcription"
    :loading="loading"
  />
</template>

<script setup>
import store from '@/store'
import ComparatorWords from '@/views/pages/reading-meter/components/ComparatorWords.vue'
import { computed } from 'vue'

const details = computed(() => store.getters['ReadingMeterModule/readingDetail'])
const referenceWords = computed(() => details.value.report.referenceWords || [])
const transcription = computed(() => details.value.report.transcription || [])
const loading = computed(() => store.getters['ReadingMeterModule/loading'])
</script>