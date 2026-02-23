<template>
  <section>
    <b-skeleton-wrapper :loading="loadingDashboard" class="w-100">
      <template v-slot:loading>
        <b-row>
          <b-col cols="12" md="4">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-75"></b-skeleton>
          </b-col>
          <b-col cols="12" md="4">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-75"></b-skeleton>
          </b-col>
          <b-col cols="12" md="4">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-75"></b-skeleton>
          </b-col>
        </b-row>
      </template>

      <b-row class="match-height h-full" align-v="stretch">
        <b-col cols="12" md="4">
          <MediaCard
            title="Desafios realizados"
            title-color="text-body"
            icon="extension"
            variant="light-primary"
            right-align
            tooltip-text="Os desafios são as etapas que compõem uma atividade, desafios que o aluno deve cumprir dentro de um jogo ou quiz."
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

        <b-col cols="12" md="4">
          <MediaCard
            title="Tempo investido"
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
        <b-col cols="12" md="4">
          <MediaCard
            title="Rendimento médio"
            title-color="text-body"
            icon="checklist"
            variant="light-primary"
            right-align
            tooltip-text="Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios."
          >
            <template v-slot:description>
              <ConditionalValueDisplay :value="dashboard.performance" layout="badge">
                <div class="font-14 body-color">
                  <ProgressBarHorizontalV2
                    height="6px"
                    :value="dashboard.performance"
                    :get-variant="getColorsEnum"
                  >
                  </ProgressBarHorizontalV2>
                </div>
              </ConditionalValueDisplay>
            </template>
          </MediaCard>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>
  </section>
</template>

<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import store from '@/store'
import ModalDetailsAccessClasses from '@/views/dashboard/classes/engagement/components/ModalDetailsAccessClasses.vue'
import { computed } from 'vue'

const loadingDashboard = computed(
  () => store.getters['moduleDashboardSchoolsPerformance/loadingDashboard'],
)
const dashboard = computed(() => store.getters['moduleDashboardSchoolsPerformance/dashboard'])

const getColorsEnum = value => {
  return getVariantByRule(value, 'learningPerformance')
}
</script>