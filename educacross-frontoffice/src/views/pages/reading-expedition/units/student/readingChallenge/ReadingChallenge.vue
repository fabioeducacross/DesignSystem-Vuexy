<template>
  <div class="px-1">
    <b-carousel
      id="carousel-expedition"
      v-model="currentSlide"
      :interval="0"
      no-wrap
      @sliding-end="changeSlide"
    >
      <!-- Text slides with image -->
      <b-carousel-slide v-for="item in dataTable" :key="item.id" class="position-relative">
        <template v-slot:img>
          <b-row>
            <b-col cols="12">
              <ReadingChallengeCards :details="item" />
            </b-col>
            <b-col cols="12">
              <ReadingChallengeWords :details="item" />
            </b-col>
          </b-row>
        </template>
      </b-carousel-slide>
    </b-carousel>

    <div>
      <b-pagination
        v-if="totalData > 0"
        :value="currentPage"
        :total-rows="totalData"
        hide-ellipsis
        per-page="1"
        limit="20"
        hide-goto-end-buttons
        @change="value => changePage(value)"
      >
        <!--  <template v-slot:prev-text>
          <span></span>
          !-- <feather-icon icon="ChevronLeftIcon" size="18" /> --
        </template>
        <template v-slot:next-text>
          <span></span>
          !-- <feather-icon icon="ChevronRightIcon" size="18" /> --
        </template> -->
      </b-pagination>
    </div>
  </div>
</template>

<script setup>
import ReadingChallengeCards from './ReadingChallengeCards.vue'
import ReadingChallengeWords from './ReadingChallengeWords.vue'
import { EExpeditionStageStatus } from '@/consts/ReadingExpeditionEnum.js'
import router from '@/router'
import store from '@/store'
import readingExpeditionUnitStudentReadingChallengeModule from '@/store/pageModules/readingExpedition/readingExpeditionUnitStudentReadingChallengeModule.js'
import { computed, onUnmounted, ref, watch } from 'vue'
import { emitter } from '@/eventBus'

const { testId, studentId } = router.currentRoute.params

const moduleName = 'readingExpeditionUnitStudentReadingChallengeModule'
store.registerModule(moduleName, readingExpeditionUnitStudentReadingChallengeModule)

onUnmounted(() => {
  emitter.off('reloadChallenge')
  store.unregisterModule(moduleName)
})

emitter.on('reloadChallenge', () => {
  store.commit('readingExpeditionUnitStudentModule/loading', true)
  store.dispatch('readingExpeditionUnitStudentReadingChallengeModule/fetchReadingDetails', {
    testId,
    studentId,
  })
})

store.dispatch('readingExpeditionUnitStudentReadingChallengeModule/fetchReadingDetails', {
  testId,
  studentId,
})

const dataTable = computed(
  () => store.getters['readingExpeditionUnitStudentReadingChallengeModule/data'],
)

const currentPage = ref(1)
const totalData = computed(() => dataTable.value.length || 0)

const currentSlide = ref(0)

const changePage = value => {
  currentSlide.value = value - 1
}
const changeSlide = value => {
  currentPage.value = value + 1
}

const setDetails = () => {
  if (dataTable.value.length) {
    store.dispatch('readingExpeditionUnitStudentModule/setChallengeDetails', {
      lastAccessDate: dataTable.value[currentSlide.value].student.report?.readingDate,
      totalSeconds: dataTable.value[currentSlide.value].totalSeconds,
      audioFileUrl: dataTable.value[currentSlide.value].student.report?.audioFileUrl,
      currentProficiency: {
        status: EExpeditionStageStatus.Finished,
        level: dataTable.value[currentSlide.value].level,
        changeLevel:
          dataTable.value[currentSlide.value].changeLevel === undefined
            ? false
            : dataTable.value[currentSlide.value].changeLevel,
      },
    })
  } else {
    store.dispatch('readingExpeditionUnitStudentModule/resetChallengeDetails')
  }
}

watch(dataTable, () => {
  setDetails()
})

watch(currentSlide, () => {
  setDetails()
})
</script>