<template>
  <b-row>
    <b-col cols="12">
      <ReadingMeterHeader />
    </b-col>
    <b-col cols="12">
      <ReadingMeterInfo />
    </b-col>
    <b-col cols="12">
      <ReadingMeterCards />
    </b-col>
    <b-col cols="12">
      <ReadingMeterWords />
    </b-col>
    <b-col cols="12">
      <ReadingMeterFooter />
    </b-col>
  </b-row>
</template>

<script setup>
import ReadingMeterCards from './ReadingMeterCards.vue'
import ReadingMeterFooter from './ReadingMeterFooter.vue'
import ReadingMeterHeader from './ReadingMeterHeader.vue'
import ReadingMeterInfo from './ReadingMeterInfo.vue'
import ReadingMeterWords from './ReadingMeterWords.vue'
import store from '@/store'
import { useRoute } from 'vue-router/composables'

const route = useRoute()

const { testId, classId, studentId } = route.params
const { readingDate } = route.query

store.dispatch('ReadingMeterModule/fetchReadingDetails', {
  testId,
  classId,
  studentId,
  readingDate,
})
</script>