<template>
  <section>
    <b-row class="match-height h-full" align-v="stretch">
      <b-skeleton-wrapper :loading="loading" class="w-100 px-1 mb-1">
        <template v-slot:loading>
          <div class="h-100">
            <b-row class="match-height h-50">
              <b-col cols="12" lg="4">
                <div class="h-100">
                  <b-row class="match-heigth h-100">
                    <b-col cols="12">
                      <b-skeleton type="card" height="215px" class="w-100 rounded"></b-skeleton>
                    </b-col>
                  </b-row>
                </div>
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
            title="Missões"
            icon="mountain_flag"
            bg-variant="bg-light-primary"
            right-align
            has-tooltip-icon
            icon-background="bg-light-primary"
            icon-class="text-primary"
            tooltip-text="<div class='text-left'>
              Missões enviadas: missões disponibilizadas aos alunos no período filtrado. Podem ter status “iniciada”, “não iniciada” ou “finalizada”.
<br /><br />
            Missões em andamento: missões  disponibilizadas aos alunos e que não finalizaram o seu período de duração. Essas missões têm status “iniciada” ou “não iniciada”.
<br /><br />
            Missões encerradas: missões que já não estão disponíveis para o aluno, pois encerraram o seu período de duração.</div>"
            :value="data.totalGuides"
          >
            <template v-slot:description>
              <div class="mt-1 mb-50">
                <h6 class="text-body font-bold mb-25">Enviadas</h6>
                <span class="text-primary d-flex align-items-center">
                  <span class="material-symbols-outlined font-22 mr-50"> event_upcoming </span>
                  <span class="font-weight-bold font-22">{{ data.totalGuides }}</span>
                </span>
              </div>
              <div class="mb-50">
                <h6 class="text-body font-bold mb-25">Em andamento</h6>
                <span class="text-primary d-flex align-items-center">
                  <span class="material-symbols-outlined font-22 mr-50"> calendar_clock </span>
                  <span class="font-weight-bold font-22">{{ data.totalGuidesInProgress }}</span>
                </span>
              </div>
              <div class="mb-50">
                <h6 class="text-body font-bold mb-25">Finalizadas</h6>
                <span class="text-primary d-flex align-items-center">
                  <span class="material-symbols-outlined font-22 mr-50"> event_available </span>
                  <span class="font-weight-bold font-22">{{ data.totalGuidesFinished }}</span>
                </span>
              </div>
            </template>
          </DynamicMediaCard>
        </b-col>
        <b-col>
          <b-row class="match-height h-full">
            <b-col cols="12" md="6">
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
                  <div class="font-14 body-color">
                    <ProgressBarHorizontalV2
                      :get-variant="getColorsProgressEnum"
                      :value="data.progress"
                      height="6px"
                    >
                      <template v-slot="{ item }"
                        >
                        <div class="d-flex justify-content-between gap-1">
                          <span :class="item.variant.textClass" class="font-bold mr-1"
                            >{{ $filters.formatNumber(item.percent) }}%</span
                          >

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
                  </div>
                </template>
              </MediaCard>
            </b-col>

            <b-col cols="12" md="6">
              <MediaCard
                :loading="loading"
                icon="checklist"
                right-align
                title="Rendimento médio"
                title-color="text-body"
                tooltip-text="Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas)."
                variant="light-primary"
              >
                <template v-slot:description>
                  <div class="font-14 body-color">
                    <ProgressBarHorizontalV2
                      :get-variant="getColorsPerformanceEnum"
                      :value="data.performance"
                      height="6px"
                    >
                      <template v-slot="{ item }"
                        >
                        <div class="d-flex justify-content-between gap-1">
                          <span :class="item.variant.textClass" class="font-bold mr-1"
                            >{{ $filters.formatNumber(item.percent) }}%</span
                          >

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
                  </div>
                </template>
              </MediaCard>
            </b-col>

            <b-col cols="12" md="6">
              <MediaCard
                title="Tempo médio investido "
                title-color="text-body"
                icon="timelapse"
                variant="light-primary"
                tooltip-text="Tempo médio por aluno."
                right-align
              >
                <template v-slot:description>
                  <h6 class="font-bold text-primary">
                    {{ data.time | formattedTime }}
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
                  <h6 class="font-bold text-primary">
                    {{ data.challengesDone }}
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

<script setup>
import DynamicMediaCard from '@/components/card/DynamicMediaCard.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import store from '@/store'
import { computed, watch, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy

const getColorsProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}

const getColorsPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}

const loading = computed(
  () => store.getters['moduleMissionsPlusReportAdminMissionsOverview/loadingCards'],
)
const data = computed(
  () => store.getters['moduleMissionsPlusReportAdminMissionsOverview/cards'],
)

watch(data, () => {
  vm.$bus.emit('setBreadcrumb', ['', '', data.value.className])
})
</script>

<style lang="scss" scoped>
  .extra-small {
    font-size: 0.72rem;
  }
  .font-22 {
    font-size: 1.72rem;
  }
</style>