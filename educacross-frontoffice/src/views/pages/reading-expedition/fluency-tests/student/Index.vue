<template>
  <section>
    <b-card class="shadow-none" body-class="p-0 " :class="currentItemClass">
      <ReadingMeterHeader />
      <b-row class="px-1">
        <b-col cols="12">
          <ReadingMeterCards />
        </b-col>
        <b-col cols="12">
          <ReadingMeterWords />
        </b-col>
      </b-row>
    </b-card>

    <ReadingMeterFooter />
    <ChangeEvaluation
      :student-id="parseInt(studentId)"
      :stage="testId"
      :type="details.expeditionType"
      :current-proficiency="currentProficiency"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import ReadingMeterCards from './ReadingMeterCards.vue'
import ReadingMeterFooter from './ReadingMeterFooter.vue'
import ReadingMeterHeader from './ReadingMeterHeader.vue'
import ReadingMeterWords from './ReadingMeterWords.vue'
import ChangeEvaluation from '@/views/pages/reading-expedition/components/ChangeEvaluation.vue'
import { EExpeditionStageStatus } from '@/consts/ReadingExpeditionEnum.js'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'

const route = useRoute()
const router = useRouter()
const studentId = route.params.studentId

const testId = computed(() => store.getters['ReadingExpeditionModule/testId'])

const studentName = computed(() => store.getters['ReadingExpeditionModule/studentName'])

const currentItemClass = computed(
  () => store.getters['ReadingExpeditionModule/currentTestClass'],
)

const details = computed(
  () => store.getters['readingExpeditionFluencyTestModule/readingDetail'],
)

const currentProficiency = computed(() => {
  return {
    status: EExpeditionStageStatus.Finished,
    level: details.value.report?.proficiency,
    changeLevel: details.value.report?.changeProficiency,
  }
})

watch(
  studentName,
  () => {
    window.$bus.emit('setTabTitle', studentName.value)
    const test = store.getters['ReadingExpeditionModule/test']
    if (!test) return
    window.$bus.emit('setBreadcrumb', [null, test.test, studentName.value])
  },
  { deep: true },
)

watch([testId], () => {
  if (testId.value) {
    store.commit('readingExpeditionFluencyTestModule/reset')
    store.dispatch('readingExpeditionFluencyTestModule/fetchReadingDetails', {
      testId: testId.value,
      studentId,
    })
  }
})

onMounted(() => {
  if (testId.value) {
    store.dispatch('readingExpeditionFluencyTestModule/fetchReadingDetails', {
      testId: testId.value,
      studentId,
    })
  }

  window.$bus.on('reloadChallenge', () => {
    store.dispatch('readingExpeditionFluencyTestModule/fetchReadingDetails', {
      testId: testId.value,
      studentId,
    })
  })
})

onUnmounted(() => {
  window.$bus.off('reloadChallenge')
})
</script>