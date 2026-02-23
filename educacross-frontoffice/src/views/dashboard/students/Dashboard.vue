<template>
  <b-skeleton-wrapper :loading="loading" class="w-100">
    <template v-slot:loading>
      <b-row class="match-height">
        <b-col cols="12" lg="4">
          <b-skeleton type="card" height="215px" class="w-100 rounded mb-1"></b-skeleton>
        </b-col>
        <b-col cols="12" lg="8">
          <b-row>
            <b-col cols="12">
              <b-row>
                <b-col cols="12" md="6">
                  <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
                </b-col>
                <b-col cols="12" md="6">
                  <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12">
              <b-row>
                <b-col cols="12" md="6">
                  <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
                </b-col>
                <b-col cols="12" md="6">
                  <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </template>
    <b-row class="match-height h-full" align-v="stretch">
      <b-col cols="12" lg="4">
        <b-card>
          <div>
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="text-body font-normal">Atividades</h5>
              <span
                v-b-tooltip.hover="
                  'Atividades finalizadas são aquelas em que o aluno jogou todos os desafios propostos seja acertando ou errando cada desafio.'
                "
                class="material-symbols-outlined"
                style="font-size: 16px"
                >info</span
              >
            </div>
            <ConditionalValueDisplay
              :value="!!dashboard.activitiesFinished || !!dashboard.activitiesNotFinished"
            >
              <PieChart
                :key="counterKey"
                tooltip-suffix=" atividades"
                :data="{
                  series: [dashboard.activitiesFinished, dashboard.activitiesNotFinished],
                  colors: ['#28C76F', '#EA5455'],
                  tooltipLabels: ['Finalizadas: ', 'Não finalizadas: '],
                }"
              />
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center justify-content-start gap-1">
                  <div class="icon-games-finished"></div>
                  <span>Atividades finalizadas</span>
                </div>
                <span class="font-bold text-legend-proficient">
                  {{
                    calcPercent(dashboard.activitiesFinished, dashboard.totalActivities)
                      | formatNumber
                  }}%
                </span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center justify-content-start gap-1">
                  <div class="icon-games-unfinished"></div>
                  <span>Atividades não finalizadas</span>
                </div>
                <span class="font-bold text-legend-below-basic">
                  {{
                    calcPercent(dashboard.activitiesNotFinished, dashboard.totalActivities)
                      | formatNumber
                  }}%
                </span>
              </div>
              <template v-slot:empty>
                <p class="text-center text-body">
                  Realize uma nova filtragem ou aguarde até alguma atividade ser realizada.
                </p>
              </template>
            </ConditionalValueDisplay>
          </div>
        </b-card>
      </b-col>
      <b-col>
        <b-row class="match-height h-full">
          <b-col cols="12" md="6">
            <MediaCard
              title="Alunos que jogaram"
              title-color="text-body"
              tooltip-text="Alunos que jogaram ao menos 1 vez. O percentual é calculado sobre os alunos que acessaram."
              title-class="mb-0"
              icon="sentiment_satisfied"
              variant="light-primary"
              right-align
            >
              <template v-slot:description>
                <ConditionalValueDisplay :value="dashboard.totalStudentsPlayed" layout="badge">
                  <div class="font-14 body-color">
                    <ProgressBarHorizontalV2
                      :value="dashboard.totalStudentsPlayed"
                      :max="dashboard.totalStudents"
                      show-values
                      values-divisor=" de "
                      :get-variant="getParticipationEnum"
                      class="mb-1"
                    >
                      <template v-slot:description></template>
                    </ProgressBarHorizontalV2>
                  </div>
                </ConditionalValueDisplay>
              </template>
            </MediaCard>
          </b-col>
          <b-col cols="12" md="6">
            <MediaCard
              title="Desafios realizados"
              title-color="text-body"
              icon="extension"
              tooltip-text="Os desafios são as etapas que compõem uma atividade, desafios que o aluno deve cumprir dentro de um jogo ou quiz."
              variant="light-primary"
              right-align
            >
              <template v-slot:description>
                <ConditionalValueDisplay :value="dashboard.challengesDone" layout="badge">
                  <h6 class="text-primary font-bold">
                    {{ dashboard.challengesDone | formatNumber }}
                  </h6>
                </ConditionalValueDisplay>
              </template>
            </MediaCard>
          </b-col>
          <b-col cols="12" md="6">
            <MediaCard
              title="Tempo médio investido por aluno"
              title-color="text-body"
              icon="timelapse"
              variant="light-primary"
              right-align
            >
              <template v-slot:description>
                <ConditionalValueDisplay :value="dashboard.totalTime" layout="badge">
                  <h6 class="text-primary font-bold">
                    {{ dashboard.totalTime | formattedTime }}
                  </h6>
                </ConditionalValueDisplay>
              </template>
            </MediaCard>
          </b-col>

          <b-col cols="12" md="6">
            <MediaCard
              title="Rendimento médio"
              title-color="text-body"
              icon="checklist"
              tooltip-text="Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios."
              variant="light-primary"
              right-align
            >
              <template v-slot:description>
                <ConditionalValueDisplay :value="dashboard.performance" layout="badge">
                  <div class="font-14 body-color">
                    <ProgressBarHorizontalV2
                      :value="dashboard.performance"
                      :get-variant="getPerformanceEnum"
                    />
                  </div>
                </ConditionalValueDisplay>
              </template>
            </MediaCard>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import {useDashboardStudents} from '../useDashboardStudents.js'
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import DynamicMediaCard from '@/components/card/DynamicMediaCard.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import PieChart from '@/components/chart/PieChart.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { calcPercent } from '@/utils/number.js'
import { ref, watch } from 'vue'

const { loading, dashboard, dataTable } = useDashboardStudents()

const counterKey = ref(0)

watch(dataTable, () => {
  counterKey.value += 1
})

const getParticipationEnum = value => {
  return getVariantByRule(value, 'participation')
}

const getPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}
</script>

<style scoped lang="scss">
  .icon-games-finished {
    height: 10px;
    width: 10px;
    border: 2px solid #28c76f;
    border-radius: 50%;
  }

  .icon-games-unfinished {
    height: 10px;
    width: 10px;
    border: 2px solid #ea5455;
    border-radius: 50%;
  }
</style>