<script setup>
import DynamicMediaCard from '@/components/card/DynamicMediaCard.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontal from '@/components/progessBar/ProgressBarHorizontal.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { calcPercent } from '@/utils/number'
import { getRangeColor } from '@/utils/report-education-system/range-color'
import { colorsEnum } from '@/utils/report-education-system/rangeColors'
import { useEducationSystemAdminDashboard } from '@/views/pages/admin-context/reports/educationSystem/components/useEducationSystemAdminDashboard'
import { computed, toRef } from 'vue'
import { formatNumber } from '@/filters/filters'
import { formattedTime } from '@/utils/utils'

const props = defineProps({
  onlyInProgress: {
    type: Boolean,
    default: false,
  },
  dashboardData: {
    type: Object,
    default: () => ({}),
  },
  loadingDashboard: {
    type: Boolean,
    default: true,
  },
})

const dashboardData = toRef(props, 'dashboardData')
const loadingDashboard = toRef(props, 'loadingDashboard')

const onlyInProgress = toRef(props, 'onlyInProgress')

const tooltipText = computed(() => {
  if (onlyInProgress.value) {
    return 'Missões enviadas: missões disponibilizadas aos alunos. Podem ter status “iniciada”, “não iniciada” ou “finalizada”. \n\n Missões em andamento: missões  disponibilizadas aos alunos e que não finalizaram o seu período de duração. Essas missões têm status “iniciada”.'
  }

  return 'Missões totais são todas as missões cadastradas no Sistema de Ensino. Seu cálculo de progresso também inclui missões que não foram enviadas.\n Já o cálculo de progresso em missões enviadas desconsidera a parcela de missões não enviadas.'
})
</script>

<template>
  <section>
    <b-row class="match-height h-full" align-v="stretch">
      <b-skeleton-wrapper :loading="loadingDashboard" class="w-100 px-1 mb-1">
        <template v-slot:loading>
          <div class="h-100">
            <b-row class="match-height h-50">
              <b-col cols="12" lg="4">
                <b-skeleton-wrapper :loading="loadingDashboard" class="h-100 pb-1">
                  <template v-slot:loading>
                    <div class="h-100">
                      <b-row class="match-heigth h-100">
                        <b-col cols="12">
                          <b-skeleton type="card" height="215px" class="w-100 rounded"></b-skeleton>
                        </b-col>
                      </b-row>
                    </div>
                  </template>
                </b-skeleton-wrapper>
              </b-col>
              <b-col cols="12" lg="8">
                <b-row>
                  <b-col>
                    <b-row>
                      <b-col cols="12">
                        <b-row>
                          <b-col>
                            <b-skeleton
                              type="card"
                              height="100px"
                              class="w-100 rounded mb-1"
                            ></b-skeleton>
                          </b-col>
                          <b-col>
                            <b-skeleton
                              type="card"
                              height="100px"
                              class="w-100 rounded mb-1"
                            ></b-skeleton>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col cols="12">
                        <b-row>
                          <b-col>
                            <b-skeleton
                              type="card"
                              height="100px"
                              class="w-100 rounded mb-1"
                            ></b-skeleton>
                          </b-col>
                          <b-col>
                            <b-skeleton
                              type="card"
                              height="100px"
                              class="w-100 rounded mb-1"
                            ></b-skeleton>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </template>
        <b-col cols="12" lg="4">
          <DynamicMediaCard
            title="Progresso médio"
            icon="timeline"
            bg-variant="bg-light-primary"
            right-align
            has-tooltip-icon
            icon-background="bg-light-primary"
            icon-class="text-primary"
            :tooltip-text="tooltipText"
            :value="dashboardData.totalGuideProgress"
          >
            <template v-slot:description>
              <div class="mt-2">
                <div v-if="!onlyInProgress">
                  <ProgressBarHorizontal
                    label="Em missões totais"
                    label-class="text-body"
                    :value="dashboardData.totalGuideProgress"
                    progress-bar-container-class="mb-0 font-size-md"
                    position-bottom
                    :progress-bar-colors="colorsEnum"
                  >
                  </ProgressBarHorizontal>
                  <ProgressBarHorizontal
                    label="Em missões enviadas"
                    label-class="text-body"
                    :value="calcPercent(dashboardData.amountGuideSend, dashboardData.totalGuide)"
                    position-bottom
                    progress-bar-container-class="mb-0 font-size-md"
                    :progress-bar-colors="colorsEnum"
                  />
                </div>
                <div v-else>
                  <ProgressBarHorizontal
                    label="Em missões enviadas"
                    label-class="text-body"
                    :value="dashboardData.sendGuideProgress"
                    position-bottom
                    progress-bar-container-class="mb-0 font-size-md"
                    :progress-bar-colors="colorsEnum"
                  />
                  <ProgressBarHorizontal
                    label="Em missões em andamento"
                    label-class="text-body"
                    :value="dashboardData.inProgressGuideProgress"
                    position-bottom
                    progress-bar-container-class="mb-0 font-size-md"
                    :progress-bar-colors="colorsEnum"
                  />
                </div>
                <b-badge variant="light-primary" class="font-14">
                  <div class="d-flex">
                    <div class="d-flex align-items-center justify-content-center mr-50">
                      <span class="material-symbols-outlined align-middle" style="font-size: 14px">
                        event_upcoming
                      </span>
                    </div>
                    <div style="text-align: left">
                      <span class="align-middle whitespace-normal"
                        >{{
                          onlyInProgress
                            ? dashboardData.amountGuidesInProgress
                            : dashboardData.amountGuideSend
                        }}
                        missões {{ onlyInProgress ? 'em andamento' : 'enviadas' }}</span
                      >
                      <span class="font-normal align-middle whitespace-pre"
                        >/{{
                          onlyInProgress ? dashboardData.amountGuideSend : dashboardData.totalGuide
                        }}
                        missões {{ onlyInProgress ? 'enviadas' : 'totais' }}
                      </span>
                    </div>
                  </div>
                </b-badge>
              </div>
            </template>
          </DynamicMediaCard>
        </b-col>
        <b-col>
          <b-row class="match-height h-full">
            <b-col cols="12" md="6">
              <MediaCard
                title="Alunos que jogaram"
                title-color="text-body"
                icon="sentiment_satisfied"
                variant="light-primary"
                tooltip-text="Alunos que acessaram o ambiente de jogos e cumpriram ao menos 1 desafio (jogada)."
                right-align
              >
                <template v-slot:description>
                  <ProgressBarHorizontalV2 :value="dashboardData.studentsPlayed" enum="progress">
                    <template v-slot="{ item }">
                      <div class="d-flex justify-content-between gap-1">
                        <span :class="item.variant.textClass" class="font-bold font-14 mr-1"
                          >{{ formatNumber(item.percent)  }}%</span
                        >

                        <div>
                          <b-badge
                            :class="`border-${item.variant.variant}`"
                            :variant="`light-${item.variant.variant}`"
                            class="extra-small font-semibold uppercase"
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

            <b-col cols="12" md="6">
              <MediaCard
                title="Rendimento médio"
                title-color="text-body"
                icon="checklist"
                variant="light-primary"
                tooltip-text="Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas)."
                right-align
              >
                <template v-slot:description>
                  <ProgressBarHorizontalV2
                    :value="dashboardData.performance"
                    enum="accuracyPerformance"
                  >
                    <template v-slot="{ item }">
                      <div class="d-flex justify-content-between gap-1">
                        <span :class="item.variant.textClass" class="font-bold font-14 mr-1"
                          >{{ formatNumber(item.percent) }}%</span
                        >

                        <div>
                          <b-badge
                            :class="`border-${item.variant.variant}`"
                            :variant="`light-${item.variant.variant}`"
                            pill
                            class="extra-small font-semibold text-uppercase"
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

            <b-col cols="12" md="6">
              <MediaCard
                title="Tempo total investido "
                title-color="text-body"
                icon="timelapse"
                variant="light-primary"
                right-align
              >
                <template v-slot:description>
                  <h6 class="text-primary font-bold">
                    {{ formattedTime(dashboardData.totalTime) }}
                  </h6>
                </template>
              </MediaCard>
            </b-col>

            <b-col cols="12" md="6">
              <MediaCard
                title="Total de desafios realizados"
                title-color="text-body"
                icon="extension"
                variant="light-primary"
                right-align
              >
                <template v-slot:description>
                  <h6 class="text-primary font-bold">
                    {{ formatNumber(dashboardData.challengesDone) }}
                  </h6>
                </template>
              </MediaCard>
            </b-col>
          </b-row>
        </b-col>
      </b-skeleton-wrapper>
    </b-row>
  </section>
</template>

<style lang="scss" scoped>
  .extra-small {
    font-size: 0.72rem;
  }
</style>
