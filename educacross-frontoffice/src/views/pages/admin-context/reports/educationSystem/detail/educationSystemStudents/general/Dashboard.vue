<template>
  <b-skeleton-wrapper :loading="loading" class="w-100 px-1 mb-1">
    <template v-slot:loading>
      <div class="h-100">
        <b-row class="match-height h-50">
          <b-col>
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
          <b-col>
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
          <b-col>
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
        </b-row>
      </div>
    </template>

    <b-row class="match-height">
      <b-col cols="12" lg="4" sm="12">
        <MediaCard title="Alunos" icon="sentiment_satisfied" variant="light-primary" right-align>
          <template v-slot:description>
            <p class="text-body">
              <span class="text-body font-extrabold">
                {{ data.studentsStarted | formatNumber }}
              </span>
              de
              {{ data.totalStudents | formatNumber }} jogaram
              <span
                v-b-tooltip.hover.top="`Iniciaram ao menos 1 jogo`"
                style="font-size: 16px"
                class="material-symbols-outlined head-icon-info"
              >
                info
              </span>
            </p>
            <h4
              :class="`${
                getVariantByRule(calcPercent(data.studentsStarted, data.totalStudents), 'progress')
                  .textClass || ''
              }
                  font-bold`"
            >
              {{ calcPercent(data.studentsStarted, data.totalStudents) | formatNumber }}%
            </h4>
          </template>
        </MediaCard>
      </b-col>
      <b-col cols="12" lg="4" sm="12">
        <MediaCard title="Desafios" icon="stadia_controller" variant="light-primary" right-align>
          <template v-slot:description>
            <p class="text-body">
              <span class="text-body font-extrabold">
                {{ data.challengesDone | formatNumber }}
              </span>
              finalizados
              <span
                v-b-tooltip.hover.top.html="
                  `<div>Desafios são jogadas que o aluno deve cumprir dentro de cada jogo.</div>`
                "
                style="font-size: 16px"
                class="material-symbols-outlined head-icon-info"
              >
                info
              </span>
            </p>
          </template>
        </MediaCard>
      </b-col>

      <b-col cols="12" lg="4" sm="12">
        <MediaCard
          title="Progresso médio"
          tooltip-text="Missões finalizadas"
          icon="timeline"
          variant="light-primary"
          right-align
        >
          <template v-slot:description>
            <ProgressBarHorizontalV2
              height="6px"
              :value="data.progress"
              :get-variant="getColorsEnum"
            >
            </ProgressBarHorizontalV2>
          </template>
        </MediaCard>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { calcPercent } from '@/utils/number.js'
import { colorsEnum } from '@/utils/report-education-system/rangeColors.js'

// Props
const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// getVariant function for ProgressBarHorizontalV2
const getColorsEnum = value => {
  return getVariantByRule(value, 'progress')
}
</script>