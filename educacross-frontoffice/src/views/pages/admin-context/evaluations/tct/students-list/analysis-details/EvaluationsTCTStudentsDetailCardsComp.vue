<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-row class="match-height flex-wrap">
        <b-col v-for="(item, index) in 5" :key="index" cols="12" md class="cardComp-col">
          <div class="mb-2">
            <b-skeleton-img></b-skeleton-img>
          </div>
        </b-col>
      </b-row>
    </template>
    <b-row class="match-height flex-wrap">
      <b-col v-for="(item, index) in items" :key="index" cols="12" md class="cardComp-col">
        <b-card>
          <div class="cardComp-content">
            <div class="d-flex justify-content-center mb-1">
              <img v-if="item.imageUrl" :src="item.imageUrl" class="knowledgeAxes-img" />
              <img v-else :src="getSubjectImg()" />
            </div>
            <h6 class="text-center font-bold mb-1">{{ item.name }}</h6>
            <ProgressBarHorizontalV2
              :value="item.performance"
              :get-variant="getPerformanceEnum"
              class="mb-1"
            />
            <span>Média da turma: {{ item.classPerformance | formatNumber }}%</span>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { getPerformanceEnum } from '@/consts/evaluationsEnum.js'
import store from '@/store'
import ExameIcon from '@/views/pages/admin-context/evaluations/components/ExameIcon.vue'
import { computed } from 'vue'

const cardsComp = computed(() => store.getters['EvaluationTCTStudentsDetail/cardsComp'])
const items = computed(() => cardsComp.value.knowledgeAxes)

const loading = computed(() => store.getters['EvaluationTCTStudentsDetail/loading'])

const subjectId = computed(() => store.getters['evaluations/subjectId'])

const getSubjectImg = () => {
  if (!subjectId.value) return ''
  return SubjectEnum[subjectId.value].image
}
</script>
<style scoped>
.cardComp-col {
  min-width: 200px;
}
.cardComp-content {
  min-width: 140px;
  max-width: 200px;
  margin: 0 auto;
}

.knowledgeAxes-img {
  height: 48px;
  width: 48px;
}
</style>