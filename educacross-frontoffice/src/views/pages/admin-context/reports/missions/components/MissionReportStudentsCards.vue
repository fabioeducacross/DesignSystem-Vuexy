<template>
  <b-row class="match-height">
    <b-col cols="12" md="6">
      <MediaCard title="Alunos" icon="sentiment_satisfied" variant="light-primary" right-align>
        <template v-slot:description>
          <h6>
            <span class="text-primary font-bold">
              {{ studentsFinished | formatNumber }} de
              {{ totalStudents | formatNumber }} finalizaram</span
            >
          </h6>
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
          <h6 class="text-primary font-bold">
            {{ challengesDone | formatNumber }}
          </h6>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" md="6">
      <MediaCard title="Desempenho" icon="checklist" variant="light-primary" right-align>
        <template v-slot:description>
          <div class="font-14 body-color">
            <ProgressBarHorizontalV2 :value="performance" :get-variant="getPerformanceEnum" />
          </div>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" md="6">
      <MediaCard title="Tempo de aprendizagem" icon="timelapse" variant="light-primary" right-align>
        <template v-slot:description>
          <h6 class="text-primary font-bold">{{ totalTime | formattedTime }}</h6>
        </template>
      </MediaCard>
    </b-col>
  </b-row>
</template>

<script setup>
  import MediaCard from '@/components/card/MediaCard.vue'
  import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
  import { getPerformanceEnum } from '@/consts/progressPerformanceEnum.js'

  // Props
  const props = defineProps({
    studentsFinished: { required: true },
    totalStudents: { required: true },
    challengesDone: { required: true },
    performance: { required: true },
    totalTime: { required: true },
  })

  // Methods/Const
  // getPerformanceEnum already imported and used directly in template

  // Expose props so they're accessible in the template
  const studentsFinished = props.studentsFinished
  const totalStudents = props.totalStudents
  const challengesDone = props.challengesDone
  const performance = props.performance
  const totalTime = props.totalTime
</script>

<style lang="scss" scoped></style>