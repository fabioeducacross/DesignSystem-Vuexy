<template>
  <b-row class="match-height">
    <b-col cols="12" md="6">
      <MediaCard title="Alunos" icon="sentiment_satisfied" variant="light-primary" right-align>
        <template v-slot:description>
          <p>
            <span class="text-primary font-extrabold">
              {{ studentsFinished | formatNumber }} de
              {{ totalStudents | formatNumber }} finalizaram</span
            >
          </p>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" md="6">
      <MediaCard
        title="Desafios realizados"
        icon="stadia_controller"
        variant="light-primary"
        right-align
      >
        <template v-slot:description>
          <p>
            <span class="text-primary font-extrabold"> {{ challengesDone | formatNumber }} </span>
          </p>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" md="6">
      <MediaCard title="Desempenho" icon="checklist" variant="light-primary" right-align>
        <template v-slot:description>
          <ProgressBarHorizontalV2 :value="performance" :get-variant="getPerformanceEnum" />
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" md="6">
      <MediaCard title="Tempo de aprendizagem" icon="timelapse" variant="light-primary" right-align>
        <template v-slot:description>
          <p class="text-primary font-bold">{{ totalTime | formattedTime }}</p>
        </template>
      </MediaCard>
    </b-col>
  </b-row>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getPerformanceEnum } from '@/consts/progressPerformanceEnum.js'

const props = defineProps({
  studentsFinished: {
    required: true,
  },
  totalStudents: {
    required: true,
  },
  challengesDone: {
    required: true,
  },
  performance: {
    required: true,
  },
  totalTime: {
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>