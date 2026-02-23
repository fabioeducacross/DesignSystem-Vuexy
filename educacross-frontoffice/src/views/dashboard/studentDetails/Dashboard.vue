<template>
  <section>
    <b-skeleton-wrapper :loading="loadingDashboard" class="w-100">
      <template v-slot:loading>
        <b-row>
          <b-col cols="12" md="4">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
          <b-col cols="12" md="4">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
          <b-col cols="12" md="4">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
        </b-row>
      </template>
      <b-row class="match-height h-full" align-v="stretch">
        <b-col>
          <b-row class="match-height">
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
                    <div class="h6 card-color">
                      <ProgressBarHorizontalV2
                        height="6px"
                        :value="dashboard.performance"
                        enum="accuracyPerformance"
                      >
                        <template v-slot="{ item }">
                          <div class="d-flex justify-content-between">
                            <span :class="item.variant.textClass"
                              >{{ item.value | formatNumber }}%</span
                            >
                            <span class="font-12 d-flex gap-2 text-body">
                              Turma:
                              <SemaphoreStatusV2
                                :value="dashboard.classPerformance"
                                size="small"
                                enum="accuracyPerformance"
                              />
                            </span>
                          </div>
                        </template>
                      </ProgressBarHorizontalV2>
                    </div>
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
                    <h6 class="text-primary font-bold mb-0">
                      {{ dashboard.totalTime | formattedTime }}
                    </h6>
                    <span class="font-12 text-body"
                      >Turma: {{ dashboard.classTotalTime | formattedTime }}</span
                    >
                  </ConditionalValueDisplay>
                </template>
              </MediaCard>
            </b-col>
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
          </b-row>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>
  </section>
</template>

<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ModalDetailsAccessClasses from '@/views/dashboard/classes/engagement/components/ModalDetailsAccessClasses.vue'
import {useStudentDetails} from '@/views/dashboard/studentDetails/useStudentDetails.js'
import SemaphoreStatusV2 from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatusV2.vue'

const { loadingDashboard, dashboard } = useStudentDetails()
</script>