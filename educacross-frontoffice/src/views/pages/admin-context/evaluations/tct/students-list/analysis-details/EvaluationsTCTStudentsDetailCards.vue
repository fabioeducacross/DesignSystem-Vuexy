<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-row>
        <b-col cols="12" lg="4">
          <div class="mb-2">
            <b-skeleton-img></b-skeleton-img>
          </div>
        </b-col>
        <b-col cols="12" lg="4">
          <div class="mb-2">
            <b-skeleton-img></b-skeleton-img>
          </div>
        </b-col>
        <b-col cols="12" lg="4">
          <div class="mb-2">
            <b-skeleton-img></b-skeleton-img>
          </div>
        </b-col>
      </b-row>
    </template>
    <b-row class="match-height">
      <b-col cols="12" lg="4">
        <MediaCard
          :title="card.studentName"
          :bg-variant="performanceVariant.variant"
          title-color="text-white"
          variant="light-white"
          :icon="performanceVariant.icon"
          right-align
        >
          <template v-slot:description>
            <div class="text-white">
              <span class="font-bold">{{ card.hits | formatNumber }}</span> de
              {{ card.totalQuestions | formatNumber }} acertos
            </div>
          </template>
        </MediaCard>
      </b-col>
      <b-col cols="12" lg="4">
        <MediaCard title="Rendimento" icon="checklist" variant="light-primary" right-align>
          <template v-slot:description>
            <ProgressBarHorizontalV2 :value="card.performance" :get-variant="getPerformanceEnum">
              <template v-slot="{ item }">
                <div class="d-flex justify-content-between">
                  <span :class="getPerformanceEnum(item.value).textClass"
                    >{{ item.value | formatNumber }}%</span
                  >
                  <span>Média da turma: {{ card.classPerformance | formatNumber }}%</span>
                </div>
              </template>
            </ProgressBarHorizontalV2>
          </template>
        </MediaCard>
      </b-col>
      <b-col cols="12" lg="4">
        <MediaCard title="Tempo de realização" icon="timelapse" variant="light-primary" right-align>
          <template v-slot:description>
            <div>
              <span class="text-primary font-bold">{{ card.totalTime | formattedTime }}</span>
              <br />
              <span>Média da turma: {{ card.classAverageTime | formattedTime }}</span>
            </div>
          </template>
        </MediaCard>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getPerformanceEnum } from '@/consts/evaluationsEnum.js'
import store from '@/store'
import { calcPercent } from '@/utils/number'
import { formatDateAndTime } from '@/utils/utils'
import { computed } from 'vue'

// Filters registration for template usage
import { formatNumber, formattedTime } from '@/filters/filters'

// Computed properties
const card = computed(() => store.getters['EvaluationTCTStudentsDetail/cards'])
const loading = computed(() => store.getters['EvaluationTCTStudentsDetail/loading'])

const performanceVariant = computed(() =>
  getPerformanceEnum(calcPercent(card.value.hits, card.value.totalQuestions))
)
</script>