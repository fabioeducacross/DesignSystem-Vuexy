<template>
  <b-row class="match-height">
    <b-col cols="12" md="4">
      <MediaCard
        :loading="loading"
        icon="event_upcoming"
        right-align
        title="Missões enviadas"
        title-color="text-body"
        tooltip-text="Missões enviadas: missões disponibilizadas para os alunos jogarem. Podem ter status “iniciada”, “não iniciada” e “finalizada”."
        variant="light-primary"
      >
        <template v-slot:description>
          <span class="font-weigth-bold text-primary h1">
            {{ data.totalGuides }}
          </span>
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" md="4">
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
              <template v-slot="{ item }">
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
    <b-col cols="12" md="4">
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
              <template v-slot="{ item }">
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
  </b-row>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import store from '@/store'
import { computed, getCurrentInstance, watch } from 'vue'

const vm = getCurrentInstance().proxy

const getColorsProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}

const getColorsPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}

const loading = computed(
  () => store.getters['moduleMissionsPlusReportAdminInstitutionsOverview/loading'],
)
const data = computed(
  () => store.getters['moduleMissionsPlusReportAdminInstitutionsOverview/cards'],
)

if (vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
  watch(data, () => {
    vm.$bus.emit('setBreadcrumb', ['', '', data.value.institutionName])
  })
}
</script>

<style lang="scss" scoped>
.extra-small {
  font-size: 0.72rem;
}
</style>