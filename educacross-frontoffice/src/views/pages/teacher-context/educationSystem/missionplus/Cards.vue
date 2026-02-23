<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { useEducationSystemMissionPlus } from '@/views/pages/teacher-context/educationSystem/missionplus/useEducationSystemMissionPlus.js'
import { formatNumber, formattedTime } from '@/filters/filters'

const { loading, cards, student } = useEducationSystemMissionPlus()

const getColorsProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}

const getColorsPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}
</script>

<template>
  <b-row class="match-height">
    <b-col cols="12" md="6" lg="3">
      <MediaCard
        :loading="loading"
        icon="timeline"
        right-align
        title="Progresso"
        title-color="text-body"
        tooltip-text="Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/jogos disponibilizados nas missões."
        variant="light-primary"
      >
        <template v-slot:description>
          <ProgressBarHorizontalV2 :value="cards.progress.student" height="6px" enum="progress">
            <template v-slot="{ item }">
              <div class="d-flex justify-content-between gap-1">
                <span :class="item.variant.textClass" class="font-bold font-14 mr-1"
                  >{{ item.percent | formatNumber }}%</span
                >

                <div
                  v-if="student.id"
                  class="d-flex gap-1 align-items-center font-semibold text-body font-12"
                >
                  <span> Turma: </span>
                  <SemaphoreStatus
                    size="pdf"
                    :status-enum="getColorsProgressEnum(cards.progress.classe)"
                  ></SemaphoreStatus>
                  <span>{{ cards.progress.classe | formatNumber }}%</span>
                </div>
              </div>
            </template>
          </ProgressBarHorizontalV2>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" md="6" lg="3">
      <MediaCard
        :loading="loading"
        icon="checklist"
        right-align
        title="Rendimento"
        title-color="text-body"
        tooltip-text="Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas)."
        variant="light-primary"
      >
        <template v-slot:description>
          <ProgressBarHorizontalV2
            :value="cards.performance.student"
            height="6px"
            enum="accuracyPerformance"
          >
            <template v-slot="{ item }">
              <div class="d-flex justify-content-between gap-1">
                <span :class="item.variant.textClass" class="font-bold font-14 mr-1"
                  >{{ item.percent | formatNumber }}%</span
                >

                <div
                  v-if="student.id"
                  class="d-flex gap-1 align-items-center font-semibold text-body font-12"
                >
                  <span> Turma: </span>
                  <SemaphoreStatus
                    size="pdf"
                    :status-enum="getColorsPerformanceEnum(cards.performance.classe)"
                  ></SemaphoreStatus>
                  <span>{{ cards.performance.classe | formatNumber }}%</span>
                </div>
              </div>
            </template>
          </ProgressBarHorizontalV2>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" md="6" lg="3">
      <MediaCard
        :loading="loading"
        icon="timelapse"
        right-align
        title="Total de tempo investido"
        title-color="text-body"
        variant="light-primary"
      >
        <template v-slot:description>
          <div class="d-flex flex-col gap-2">
            <span class="font-bold text-primary font-14">
              {{ cards.totalTime.student | formattedTime }}
            </span>
            <span v-if="student.id" class="text-body font-semibold font-12">
              Turma: {{ cards.totalTime.classe | formattedTime }}
            </span>
          </div>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" md="6" lg="3">
      <MediaCard
        :loading="loading"
        icon="extension"
        right-align
        title="Total de desafios realizados"
        title-color="text-body"
        variant="light-primary"
      >
        <template v-slot:description>
          <span class="font-bold text-primary font-14">
            {{ cards.challengesDone }}
          </span>
        </template>
      </MediaCard>
    </b-col>
  </b-row>
</template>

<style lang="scss" scoped></style>