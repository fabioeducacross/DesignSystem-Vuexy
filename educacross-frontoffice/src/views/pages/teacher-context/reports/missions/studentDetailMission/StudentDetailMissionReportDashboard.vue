<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" md="auto">
        <b-card>
          <SelectSubject />
        </b-card>
      </b-col>
      <b-col cols="12" md>
        <b-skeleton-wrapper :loading="isLoading">
          <template v-slot:loading>
            <b-row class="match-height">
              <b-col cols="12">
                <b-skeleton class="mb-2" height="50px" no-aspect></b-skeleton>
              </b-col>
            </b-row>
          </template>
          <b-card body-class="d-md-flex align-items-center">
            <div class="d-flex flex-col flex-md-row align-items-center justify-content-start gap-4">
              <span class="font-bold">{{ data.guideName }}</span>
              <span class="point-circle d-none d-md-block" />
              <span class="text-body">Período de {{ data.date }}</span>
              <b-badge
                v-if="missionTypeEnum[data.type]"
                pill
                :variant="missionTypeEnum[data.type].variant"
              >
                <div class="d-flex align-items-center gap-1">
                  <span class="material-icons" style="font-size: 16px">
                    {{ missionTypeEnum[data.type].icon }}
                  </span>
                  <span> {{ missionTypeEnum[data.type].label }} </span>
                </div>
              </b-badge>
              <b-badge
                v-if="missionTypeEnum[data.application]"
                pill
                :variant="applicationTypeEnum[data.application].variant"
              >
                <div class="d-flex align-items-center gap-1">
                  <span class="material-icons-outlined" style="font-size: 16px">
                    {{ applicationTypeEnum[data.application].icon }}
                  </span>
                  <span> {{ applicationTypeEnum[data.application].label }} </span>
                </div>
              </b-badge>
            </div>
          </b-card>
        </b-skeleton-wrapper>
      </b-col>
    </b-row>
    <b-skeleton-wrapper :loading="isLoading">
      <template v-slot:loading>
        <b-row class="match-height">
          <b-col cols="12" md="6" lg="4" class="mb-2">
            <b-skeleton height="100px" no-aspect></b-skeleton>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-2">
            <b-skeleton height="100px" no-aspect></b-skeleton>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-2">
            <b-skeleton height="100px" no-aspect></b-skeleton>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-2">
            <b-skeleton height="100px" no-aspect></b-skeleton>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-2">
            <b-skeleton height="100px" no-aspect></b-skeleton>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-2">
            <b-skeleton height="100px" no-aspect></b-skeleton>
          </b-col>
        </b-row>
      </template>

      <b-row class="match-height">
        <b-col v-if="data.type === 1" cols="12" md="6" lg="4">
          <MediaCard
            title="Desafios realizados"
            tooltip-text="Jogadas que o aluno deve cumprir dentro de cada jogo (Exercícios/Questões)."
            title-color="text-body"
            icon="stadia_controller"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <span class="text-primary font-bold">{{ data.challengesDone | formatNumber }}</span>
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" md="6" :lg="data.type === 1 ? 4 : 6">
          <MediaCard
            title="Progresso"
            tooltip-text="Calcula-se o progresso com base na quantidade de jogos cumpridos pelo aluno."
            title-color="text-body"
            icon="timeline"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <ProgressBarHorizontalV2
                show-values
                :value="data.finishedActivities"
                :max="data.totalActivities"
                :get-variant="getProgressEnum"
              />
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" md="6" :lg="data.type === 1 ? 4 : 6">
          <MediaCard
            title="Tempo de aprendizagem"
            title-color="text-body"
            icon="timelapse"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <span class="text-primary font-bold">{{ data.time | formattedTime }}</span>
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" md="6" :lg="data.type === 1 ? 4 : 6">
          <MediaCard
            title="Jogos iniciados"
            tooltip-text="Jogos em que o aluno acessou, podendo ter finalizado ou não."
            title-color="text-body"
            icon="stadia_controller"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <ProgressBarHorizontalV2
                show-values
                :value="data.playedActivities"
                :max="data.totalActivities"
                :get-variant="getProgressEnum"
              />
            </template>
          </MediaCard>
        </b-col>
        <b-col v-if="data.type === 1" cols="12" md="6" lg="4">
          <MediaCard
            title="Desempenho"
            tooltip-text="Calcula-se desempenho com base nos erros e acertos dos alunos em seus desafios (jogadas)."
            title-color="text-body"
            icon="checklist"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <ProgressBarHorizontalV2 :value="data.performance" :get-variant="getPerformanceEnum">
                <template v-slot:description>
                  <span class="ml-auto text-body">
                    Média da turma: {{ data.performanceClass | formatNumber }}%
                  </span>
                </template>
              </ProgressBarHorizontalV2>
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" md="6" :lg="data.type === 1 ? 4 : 6">
          <MediaCard
            title="Data da conclusão da atividade"
            title-color="text-body"
            icon="event"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <span class="text-danger font-bold">{{ data.endDate }}</span>
            </template>
          </MediaCard>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>
  </section>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { missionTypeEnum, applicationTypeEnum } from '@/consts/missionsEnum.js'
import { getProgressEnum, getPerformanceEnum } from '@/consts/progressPerformanceEnum.js'
import SelectSubject from '@/layouts/components/SelectSubject.vue'

const props = defineProps({
  data: {
    type: Object,
  },
  isLoading: {
    type: Boolean,
  },
})
</script>

<style lang="scss" scoped>
  .point-circle {
    border-radius: 50%;
    background: #82868b;
    width: 4px;
    height: 4px;
  }
</style>
