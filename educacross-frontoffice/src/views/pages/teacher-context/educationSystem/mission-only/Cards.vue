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
          <ProgressBarHorizontalV2 enum="progress" :value="cards.progress" height="6px">
            <template v-slot="{ item }">
              <div class="d-flex justify-content-between gap-1">
                <span :class="item.variant.textClass" class="font-bold mr-1"
                  >{{ item.percent | formatNumber }}%</span
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
            :value="cards.performance"
            height="6px"
            enum="accuracyPerformance"
          >
            <template v-slot="{ item }">
              <div class="d-flex justify-content-between gap-1">
                <span :class="item.variant.textClass" class="font-bold mr-1"
                  >{{ item.percent | formatNumber }}%</span
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
        </template>
      </MediaCard>
    </b-col>
    <b-col cols="12" lg="3" sm="6">
      <MediaCard
        :loading="loading"
        icon="timelapse"
        right-align
        title="Total de tempo investido"
        title-color="text-body"
        variant="light-primary"
      >
        <template v-slot:description>
          <span class="font-bold text-primary">
            {{ cards.totalTime | formattedTime }}
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
          <span class="font-bold text-primary">
            {{ cards.challengesDone }}
          </span>
        </template>
      </MediaCard>
    </b-col>
  </b-row>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import useTable from '@/store/table/useTable.js'
import { useEducationSystemOnlyMission } from '@/views/pages/teacher-context/educationSystem/mission-only/useEducationSystemOnlyMission.js'

const { cards } = useEducationSystemOnlyMission()
const { loading } = useTable()
</script>

<style lang="scss" scoped>
.extra-small {
  font-size: 0.72rem;
}
</style>