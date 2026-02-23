<template>
  <b-row class="match-height">
    <b-col cols="12" lg="3" sm="6">
      <MediaCard
        :loading="loading"
        icon="timeline"
        right-align
        title="Progresso médio"
        title-color="text-body"
        tooltip-text="Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/jogos disponibilizados nas missões."
        variant="light-primary"
      >
        <template v-slot:description>
          <ProgressBarHorizontalV2
            :get-variant="getColorsProgressEnum"
            :value="data.progress"
            height="6px"
          >
            <template v-slot="{ item }">
              <div class="d-flex justify-content-between gap-1">
                <span :class="item.variant.textClass" class="font-bold font-14 mr-1">
                  {{ $filters.formatNumber(item.percent) }}%
                </span>
                <div>
                  <b-badge
                    :class="`border-${item.variant.variant}`"
                    :variant="`light-${item.variant.variant}`"
                    class="extra-small font-bold text-uppercase"
                    pill
                  >
                    {{ $t(item.variant.badgeLabel) }}
                  </b-badge>
                </div>
              </div>
            </template>
          </ProgressBarHorizontalV2>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" lg="3" sm="6">
      <MediaCard
        :loading="loading"
        icon="checklist"
        right-align
        title="Rendimento médio"
        title-color="text-body"
        variant="light-primary"
        tooltip-text="Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas)."
      >
        <template v-slot:description>
          <ProgressBarHorizontalV2
            :get-variant="getColorsPerformanceEnum"
            :value="data.performance"
            height="6px"
          >
            <template v-slot="{ item }">
              <div class="d-flex justify-content-between gap-1">
                <span :class="item.variant.textClass" class="font-bold font-14 mr-1">
                  {{ $filters.formatNumber(item.percent) }}%
                </span>
                <div>
                  <b-badge
                    :class="`border-${item.variant.variant}`"
                    :variant="`light-${item.variant.variant}`"
                    class="extra-small font-bold text-uppercase"
                    pill
                  >
                    {{ $t(item.variant.badgeLabel) }}
                  </b-badge>
                </div>
              </div>
            </template>
          </ProgressBarHorizontalV2>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" lg="3" sm="6">
      <MediaCard
        :loading="loading"
        icon="timelapse"
        right-align
        title="Tempo médio investido"
        title-color="text-body"
        variant="light-primary"
        tooltip-text="Tempo médio por aluno."
      >
        <template v-slot:description>
          <span class="font-bold font-14 text-primary">
            {{ data.totalTime | formattedTime }}
          </span>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" lg="3" sm="6">
      <MediaCard
        :loading="loading"
        icon="extension"
        right-align
        title="Total de desafios realizados"
        title-color="text-body"
        variant="light-primary"
      >
        <template v-slot:description>
          <span class="font-bold font-14 text-primary">
            {{ data.challengesDone }}
          </span>
        </template>
      </MediaCard>
    </b-col>
  </b-row>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import store from '@/store'
import { computed } from 'vue'

const getColorsProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}

const getColorsPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}

const loading = computed(() => store.getters['ReportMissionPlusClasse/loading'])

const data = computed(() => store.getters['ReportMissionPlusClasse/cards'])
</script>

<style lang="scss" scoped>
.extra-small {
  font-size: 0.72rem;
}
</style>