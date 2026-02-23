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
          <b-row class="match-height">
            <b-col cols="12" md="5">
              <b-card border-variant="gray" class="border">
                <div>
                  <h6 class="text-center text-primary text-uppercase">Proposta</h6>
                  <div>
                    {{ item.text }}
                  </div>
                </div>
              </b-card>
            </b-col>
            <b-col cols="12" md="7">
              <b-card border-variant="gray" class="border">
                <h6 class="text-center text-primary text-uppercase">ESCRITA CRIATIVA DO ALUNO</h6>
                <div class="h5 font-weight-bolder text-writing">
                  {{ item.response }}
                </div>
              </b-card>
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
import store from '@/store'
import readingExpeditionUnitStudentWritingChallengeModule from '@/store/pageModules/readingExpedition/readingExpeditionUnitStudentWritingChallengeModule.js'
import { computed, getCurrentInstance, onUnmounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy
const moduleName = 'readingExpeditionUnitStudentWritingChallengeModule'
store.registerModule(moduleName, readingExpeditionUnitStudentWritingChallengeModule)

vm.$bus.on('reloadChallenge', () => {
  store.commit('readingExpeditionUnitStudentModule/loading', true)
  store.dispatch('readingExpeditionUnitStudentWritingChallengeModule/fetch')
})

onUnmounted(() => {
  vm.$bus.off('reloadChallenge')
  store.unregisterModule(moduleName)
})

const dataTable = computed(
  () => store.getters['readingExpeditionUnitStudentWritingChallengeModule/data'],
)

store.dispatch('readingExpeditionUnitStudentWritingChallengeModule/fetch')

const currentPage = ref(1)
const totalData = computed(() => dataTable.value.length || 0)
const currentSlide = ref(0)

const changePage = value => {
  currentSlide.value = value - 1
}
const changeSlide = value => {
  currentPage.value = value + 1
}

watch(dataTable, () => {
  if (dataTable.value.length) {
    store.dispatch('readingExpeditionUnitStudentModule/setChallengeDetails', {
      lastAccessDate: dataTable.value[currentSlide.value].date,
      totalSeconds: dataTable.value[currentSlide.value].time,
      currentProficiency: {
        status: dataTable.value[currentSlide.value].status,
        level: dataTable.value[currentSlide.value].level,
        changeLevel: dataTable.value[currentSlide.value].changeLevel !== undefined,
      },
    })
  } else {
    store.dispatch('readingExpeditionUnitStudentModule/resetChallengeDetails')
  }
})
</script>

<style lang="scss" scoped>
  .question-field,
  .question-header {
    opacity: 0.65;
    &.currentQuestion {
      opacity: 1;
    }
  }
  .text-writing {
    line-height: 2;
    color: #6e6b7b !important;
  }
</style>