<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends'
import useFilters from '@/store/filters/useFilters.js'
import { useEducationSystemMission } from '@/views/pages/admin-context/reports/educationSystem/admin/mission/useEducationSystemMission.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { formatNumber, formattedTime } from '@/filters/filters'

const { loading, cards } = useEducationSystemMission()
const { classe } = useFilters()

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
          <div class="font-14 body-color">
            <ProgressBarHorizontalV2
              :value="cards.progress.institution"
              height="6px"
              enum="progress"
            >
              <template v-slot="{ item }">
                <div class="d-flex justify-content-between gap-1">
                  <span :class="item.variant.textClass" class="font-bold mr-1"
                    >{{ formatNumber(item.percent) }}%</span
                  >

                  <div
                    v-if="classe.id"
                    class="d-flex gap-1 align-items-center font-semibold text-body font-12"
                  >
                    <span> Turma: </span>
                    <SemaphoreStatus
                      size="pdf"
                      :status-enum="getColorsProgressEnum(cards.progress.classe)"
                    ></SemaphoreStatus>
                    <span>{{ formatNumber(cards.progress.classe) }}%</span>
                  </div>
                </div>
              </template>
            </ProgressBarHorizontalV2>
          </div>
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
            :value="cards.performance.institution"
            height="6px"
            enum="accuracyPerformance"
          >
            <template v-slot="{ item }">
              <div class="d-flex justify-content-between gap-1">
                <span :class="item.variant.textClass" class="font-bold mr-1"
                  >{{ formatNumber(item.percent) }}%</span
                >

                <div
                  v-if="classe.id"
                  class="d-flex gap-1 align-items-center font-semibold text-body font-12"
                >
                  <span> Turma: </span>
                  <SemaphoreStatus
                    size="pdf"
                    :status-enum="getColorsPerformanceEnum(cards.performance.classe)"
                  ></SemaphoreStatus>
                  <span>{{ formatNumber(cards.performance.classe) }}%</span>
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
            <span class="font-bold text-primary">
              {{ formattedTime(cards.totalTime.institution) }}
            </span>
            <span v-if="classe.id" class="text-body font-semibold font-12">
              Turma: {{ formattedTime(cards.totalTime.classe) }}
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
          <span class="font-bold text-primary">
            {{ cards.challengesDone }}
          </span>
        </template>
      </MediaCard>
    </b-col>
  </b-row>
</template>

<style lang="scss" scoped></style>