<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { useReportMissionPlusStudent } from '@/views/reports/missionPlus/classe-report/student/useReportMissionPlusStudent'

const { loading, cards } = useReportMissionPlusStudent()

const getColorsProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}

const getColorsPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}
</script>

<template>
  <b-row class="match-height">
    <b-col cols="12" sm="6">
      <MediaCard
        :loading="loading"
        icon="timeline"
        right-align
        title="Progresso na missão"
        title-color="text-body"
        tooltip-text="Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/jogos disponibilizados nas missões."
        variant="light-primary"
      >
        <template v-slot:description>
          <ProgressBarHorizontalV2
            :get-variant="getColorsProgressEnum"
            :value="cards.progress.student"
            height="6px"
          >
            <template v-slot="{ item }">
              <div class="d-flex justify-content-between gap-1">
                <span :class="item.variant.textClass" class="font-bold mr-1">
                  {{ $filters.formatNumber(item.percent) }}%
                </span>
                <div class="d-flex gap-1 font-semibold text-body">
                  <span> Turma: </span>
                  <SemaphoreStatus
                    :status-enum="getColorsProgressEnum(cards.progress.classe)"
                  ></SemaphoreStatus>
                  <span>{{ $filters.formatNumber(cards.progress.classe) }}%</span>
                </div>
              </div>
            </template>
          </ProgressBarHorizontalV2>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" sm="6">
      <MediaCard
        :loading="loading"
        icon="checklist"
        right-align
        title="Rendimento na missão"
        title-color="text-body"
        variant="light-primary"
      >
        <template v-slot:description>
          <ProgressBarHorizontalV2
            :get-variant="getColorsPerformanceEnum"
            :value="cards.performance.student"
            height="6px"
          >
            <template v-slot="{ item }">
              <div class="d-flex justify-content-between gap-1">
                <span :class="item.variant.textClass" class="font-bold mr-1">
                  {{ $filters.formatNumber(item.percent) }}%
                </span>
                <div class="d-flex gap-1 font-semibold text-body">
                  <span> Turma: </span>
                  <SemaphoreStatus
                    :status-enum="getColorsPerformanceEnum(cards.performance.classe)"
                  ></SemaphoreStatus>
                  <span>{{ $filters.formatNumber(cards.performance.classe) }}%</span>
                </div>
              </div>
            </template>
          </ProgressBarHorizontalV2>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" sm="6">
      <MediaCard
        :loading="loading"
        icon="timelapse"
        right-align
        title="Tempo investido na missão"
        title-color="text-body"
        variant="light-primary"
      >
        <template v-slot:description>
          <div class="d-flex justify-content-between">
            <span class="font-bold text-primary">
              {{ cards.totalTime.student | formattedTime }}
            </span>
            <br />
            <span class="text-body font-semibold">
              Turma: {{ cards.totalTime.classe | formattedTime }}
            </span>
          </div>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" sm="6">
      <MediaCard
        :loading="loading"
        icon="extension"
        right-align
        title="Total de desafios realizados"
        title-color="text-body"
        variant="light-primary"
      >
        <template v-slot:description>
          <span class="font-bold text-primary">
            {{ cards.challengesDone }}
          </span>
        </template>
      </MediaCard>
    </b-col>
  </b-row>
</template>

<style lang="scss" scoped></style>