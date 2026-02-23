<template>
  <ComparatorWords
    :table-type="details.student.type"
    :reference="referenceWords"
    :result="transcription"
    :loading="loading"
  />
</template>
<script setup>
import store from '@/store'
import ComparatorWords from '@/views/pages/reading-expedition/components/ComparatorWords.vue'
import { computed } from 'vue'

const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
})

const referenceWords = computed(() => props.details.student.report?.referenceWords || [])
const transcription = computed(() => props.details.student.report?.transcription || [])
const loading = computed(
  () => store.getters['readingExpeditionUnitStudentReadingChallengeModule/loading'],
)
</script>