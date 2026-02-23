<template>
  <section>
    <h2 class="text-primary my-1">Turnos da Missão</h2>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card>
          <b-skeleton class="mb-0" height="150px" />
        </b-card>
      </template>
      <div v-if="rounds.length">
        <MissionAndQuestionItem
          v-for="round in rounds"
          :key="round.id"
          :item="round"
          :subject-id="subject.id"
          :show-view-details="false"
        >
          <template v-slot:left-content>
            <div class="d-flex flex-column gap-4 justify-content-center" style="min-width: 350px">
              <ProgressBarHorizontalV2
                v-if="classe.id"
                :value="round.performanceClass"
                enum="accuracyPerformance"
                height="6px"
                reverse
              >
                <template v-slot="{ item }">
                  <div class="d-flex justify-content-between gap-1 leading-none">
                    <span class="font-weight-bolder small">Rendimento médio da turma</span>
                    <span :class="item.variant.textClass" class="font-bold"
                      >{{ item.percent | formatNumber }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>

              <ProgressBarHorizontalV2
                :value="round.performanceInstitution"
                enum="accuracyPerformance"
                height="6px"
                reverse
              >
                <template v-slot="{ item }">
                  <div class="d-flex justify-content-between gap-1 leading-none">
                    <span class="font-weight-bolder small">Rendimento médio da escola</span>
                    <span :class="item.variant.textClass" class="font-bold"
                      >{{ item.percent | formatNumber }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>

              <ProgressBarHorizontalV2
                v-if="classe.id"
                :value="round.progressClass"
                enum="accuracyPerformance"
                height="6px"
                reverse
              >
                <template v-slot="{ item }">
                  <div class="d-flex justify-content-between gap-1 leading-none">
                    <span class="font-weight-bolder small">Progresso da turma</span>
                    <span :class="item.variant.textClass" class="font-bold"
                      >{{ item.percent | formatNumber }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>

              <ProgressBarHorizontalV2
                :value="round.progressInstitution"
                enum="accuracyPerformance"
                height="6px"
                reverse
              >
                <template v-slot="{ item }">
                  <div class="d-flex justify-content-between gap-1 leading-none">
                    <span class="font-weight-bolder small">Progresso da escola</span>
                    <span :class="item.variant.textClass" class="font-bold"
                      >{{ item.percent | formatNumber }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>
            </div>
          </template>
        </MissionAndQuestionItem>
      </div>

      <b-card v-else>
        <div class="d-flex flex-column align-items-center">
          <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
          <span class="text-center text-primary font-bold" v-html="$t('noInformationFound')"></span>
        </div>
      </b-card>
    </b-skeleton-wrapper>
  </section>
</template>

<script setup>
import MissionAndQuestionItem from '@/components/mission-plus/MissionAndQuestionItem.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemMissionPlus } from '@/views/pages/admin-context/reports/educationSystem/admin/missionplus/useEducationSystemMissionPlus.js'

const { rounds, loading } = useEducationSystemMissionPlus()
const { classe, subject } = useFilters()
</script>

<style lang="scss" scoped>
  .progress-wrapper {
    width: 375px;
    max-width: 100%;
  }
</style>