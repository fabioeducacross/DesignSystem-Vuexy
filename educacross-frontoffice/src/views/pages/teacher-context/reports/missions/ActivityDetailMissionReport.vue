<template>
  <div>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-skeleton-img no-aspect height="75px" />
      </template>
      <template v-if="!loading">
        <b-card>
          <div class="d-flex justify-between align-items-center">
            <b-link class="text-primary" @click="router.back()">
              <span
                class="material-symbols-outlined"
                style="font-size: 12px; vertical-align: middle"
              >
                arrow_back_ios
              </span>
              <span class="underline"> Voltar </span>
            </b-link>
            <div class="d-flex flex-col flex-md-row align-items-center justify-content-start gap-4">
              <span class="font-bold text-primary mb-0">{{
                $filters.truncate(activityDetail.guideName, 30)
              }}</span>

              <span v-if="activityDetail.date" class="point-circle d-none d-md-block" />

              <div v-if="activityDetail.date">
                <span>Período de {{ activityDetail.date }}</span>
              </div>
            </div>
          </div>
        </b-card>

        <b-row class="match-height">
          <b-col class="mb-base" sm="12" md="6" lg="3">
            <MediaCard
              tooltip-text="Veja quantos alunos receberam o jogo enviado."
              title="Total de alunos"
              icon="group"
              variant="light-info"
            >
              <template #description>
                {{ activityDetail.amountStudents | formatNumber }}
                {{ activityDetail.amountStudents === 1 ? 'aluno' : 'alunos' }}
              </template>
            </MediaCard>
          </b-col>

          <b-col class="mb-base" sm="12" md="6" lg="3">
            <MediaCard
              tooltip-text="Veja quantos alunos finalizaram o jogo enviado."
              title="Finalizaram"
              icon="sports_esports"
              variant="light-warning"
            >
              <template #description>
                {{ activityDetail.finishedStudents | formatNumber }}
                {{ activityDetail.finishedStudents === 1 ? 'aluno' : 'alunos' }}
              </template>
            </MediaCard>
          </b-col>

          <b-col class="mb-base" sm="12" md="6" lg="3">
            <MediaCard
              v-if="activityDetail.activity.type === 2"
              tooltip-text="Quantidade de jogos cumpridos (em %)."
              title="Progresso da Turma"
              icon="trending_up"
              variant="light-success"
            >
              <template #description> {{ activityDetail.progressClass | formatNumber }}% </template>
            </MediaCard>

            <MediaCard
              v-else
              tooltip-text="'Desempenho é calculado com base nos acertos e erros nas jogadas dos alunos. ' +
                '90% a 100% -Avançado ' +
                '70% a 89% - Adequado ' +
                '50% a 69% - Básico ' +
                '0% a 49% - Baixo'"
              title="Desempenho da Turma"
              icon="trending_up"
              variant="light-success"
            >
              <template #description>
                {{ activityDetail.performanceClass }}
              </template>
            </MediaCard>
          </b-col>

          <b-col class="mb-base" sm="12" md="6" lg="3">
            <MediaCard
              tooltip-text="Tempo de aprendizado dos alunos nesse jogo."
              title="Tempo de aprendizagem"
              icon="watch"
              variant="light-info"
            >
              <template #description>
                {{ activityDetail.timeClass | formattedTime('Não jogaram') }}
              </template>
            </MediaCard>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="w-full">
            <b-card>
              <div class="p-1">
                <div class="text-center">
                  <p class="title-activityMission color-patternTwo">
                    {{ activityDetail.activity.name }}
                  </p>
                  <div class="flex justify-center">
                    <div class="mission-img">
                      <img
                        :src="activityDetail.activity.imageUrl"
                        class="img-activity"
                        alt="activity"
                      />
                      <b-badge
                        v-if="activityDetail.type === 3"
                        :variant="
                          $utilTeacherService.activityType.bgColorForBadge(
                            activityDetail.activity.type,
                          )
                        "
                        class="situation-chip"
                      >
                        {{
                          $utilTeacherService.activityType.formatText(activityDetail.activity.type)
                        }}
                      </b-badge>
                    </div>
                    <feather-icon
                      icon="AlertCircleIcon"
                      class="color-patternSeven infoIcon-activity"
                      @click="switchModal(true)"
                    />
                  </div>
                </div>
                <b-row>
                  <b-col cols="12" class="w-full">
                    <app-collapse accordion type="margin" class="collapse-grayBackground">
                      <app-collapse-item
                        v-for="(student, indexStudent) in activityDetail.students"
                        :key="indexStudent"
                        title=""
                      >
                        <template #header>
                          <div class="w-full">
                            <b-row>
                              <b-col sm="12" md="4" class="w-full d-flex items-center">
                                <span class="textBold-activityMission color-patternTwo">
                                  {{ student.studentName }}
                                </span>
                              </b-col>
                              <b-col sm="12" md="3" class="textBold-activityMission w-full">
                                <div class="mt-1 mb-1">
                                  <span class="truncate color-gray100 class-performance">
                                    Progresso do Aluno:
                                    {{ student.progress | formatNumber }}%
                                  </span>
                                  <b-progress class="progressBar progress">
                                    <b-progress-bar
                                      variant="progressbar-progress"
                                      :value="student.progress"
                                    />
                                  </b-progress>
                                </div>
                                <div v-if="activityDetail.activity.type === 1" class="mt-1 mb-1">
                                  <span class="truncate color-gray100 class-performance">
                                    Desempenho do Aluno:
                                    {{ student.performance | formatNumber }}%
                                  </span>

                                  <b-progress class="progressBar performance">
                                    <b-progress-bar
                                      variant="progressbar-performance"
                                      :value="student.performance"
                                    />
                                  </b-progress>
                                </div>
                              </b-col>

                              <b-col sm="12" md="3" class="text-center">
                                <p class="textBold-activityMission color-patternTwo">
                                  Tempo de aprendizagem
                                </p>
                                <span class="text-activityMission color-patternTwo">
                                  {{ student.time | formattedTime('Não jogou') }}
                                </span>
                              </b-col>

                              <b-col
                                sm="12"
                                md="2"
                                class="d-flex mobile-justify-content align-items-center"
                              >
                                <span class="mr-2 textBold-activityMission text-primary underline">
                                  Ver mais
                                </span>
                              </b-col>
                            </b-row>
                          </div>
                        </template>
                        <div class="p-1">
                          <template v-if="student.plays.length > 0">
                            <b-row
                              v-for="(play, indexPlay) in student.plays"
                              :key="indexPlay"
                              class="student-content pt-1 px-1 text-center justify-center w-full"
                              :class="{
                                'border-studentContent pb-1 mb-1':
                                  student.plays.length != indexPlay + 1,
                              }"
                            >
                              <b-col sm="6" md="2">
                                <p class="textBold-activityMission color-patternThree">Concluiu</p>
                                <div>
                                  <span class="text-activityMission color-patternThree">
                                    {{ play.finished ? 'Sim' : 'Não' }}
                                  </span>
                                </div>
                              </b-col>

                              <b-col sm="6" md="2">
                                <p class="textBold-activityMission color-patternThree">Acertos</p>
                                <div>
                                  <span class="text-activityMission color-patternThree">
                                    {{ play.hits }}
                                  </span>
                                </div>
                              </b-col>

                              <b-col
                                v-if="
                                  !$utilTeacherService.activityType.isCollective(
                                    activityDetail.type,
                                  )
                                "
                                sm="6"
                                md="2"
                              >
                                <p class="textBold-activityMission color-patternThree">Erros</p>
                                <div>
                                  <span class="text-activityMission color-patternThree">
                                    {{ play.errors }}
                                  </span>
                                </div>
                              </b-col>

                              <b-col sm="6" md="2">
                                <p class="textBold-activityMission color-patternThree">
                                  {{
                                    $utilTeacherService.activityType.isCollective(
                                      activityDetail.type,
                                    )
                                      ? 'Progresso'
                                      : 'Desempenho'
                                  }}
                                </p>
                                <div>
                                  <progress-with-label-following
                                    :data="
                                      $utilTeacherService.activityType.isCollective(
                                        activityDetail.type,
                                      )
                                        ? play.progress
                                        : play.performance
                                    "
                                    color="info"
                                  />
                                </div>
                              </b-col>

                              <b-col sm="6" md="2">
                                <p class="textBold-activityMission color-patternThree">Tempo</p>
                                <div>
                                  <span class="text-activityMission color-patternThree">
                                    {{ play.time | formattedTime('Não jogou') }}
                                  </span>
                                </div>
                              </b-col>

                              <b-col sm="6" md="2">
                                <p class="textBold-activityMission color-patternThree">Data</p>
                                <div>
                                  <span class="text-activityMission color-patternThree">
                                    {{ play.date | formattedDate }}
                                  </span>
                                </div>
                              </b-col>
                            </b-row>
                          </template>
                          <template v-else>
                            <p class="text-activityMission color-patternTwo text-center mt-1">
                              Não há informações sobre este aluno.
                            </p>
                          </template>
                        </div>
                      </app-collapse-item>
                    </app-collapse>
                  </b-col>
                </b-row>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </template>
    </b-skeleton-wrapper>
    <b-modal
      v-model="activePromptActivityDetail"
      size="xl"
      hide-footer
      header-class="bg-white"
      scrollable
      no-close-on-backdrop
      no-close-on-esc
      static
    >
      <activity-detail
        v-if="activePromptActivityDetail"
        v-model="renderWebgl"
        :activity-id="activityId"
        :subject-id="subjectId"
        @close-activityDetail="switchModal(false)"
      />
    </b-modal>
  </div>
</template>

<script setup>
import LoadingInComponent from '../../shared/components/LoadingInComponent.vue'
import ProgressWithLabelFollowing from '../../shared/components/ProgressWithLabelFollowing.vue'
import ActivityDetail from '../../shared/modals/ActivityDetail.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import router from '@/router'
import { getMissionActivitiesById } from '@/services/shared/reports/Report.service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'

const { classe, subject } = useFilters()
const { missionId, activityId } = router.currentRoute.params
const vm = getCurrentInstance().proxy
const loading = ref(true)
const activityDetail = ref({
  guideId: 0,
  guideName: '',
  date: '',
  amountStudents: 0,
  finishedStudents: 0,
  performanceClass: '',
  timeClass: 0,
  activity: {
    name: '',
    imageUrl: '',
  },
  students: [
    {
      studentId: 0,
      studentName: '',
      performance: 0,
      time: 0,
      plays: [],
    },
  ],
})

const getActivityDetailMissionReport = () => {
  loading.value = true

  getMissionActivitiesById(missionId, activityId, classe.value.ClassId)
    .then(response => {
      activityDetail.value = response.data
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = vm.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        vm.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getActivityDetailMissionReport()
})

const activePromptActivityDetail = ref(false)

const switchModal = value => {
  activePromptActivityDetail.value = value
}

const renderWebgl = ref(false)

const activityIdNum = parseInt(activityId, 10)
const subjectIdNum = parseInt(subject.value.id, 10)

</script>

<style lang="scss" scoped>
  .point-circle {
    border-radius: 50%;
    background: #82868b;
    width: 4px;
    height: 4px;
  }

  .title-activityMission {
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
  }

  .description-cardInfoData,
  .description-titleHeader {
    font-size: 18px;
    line-height: 21px;
  }

  .description-titleHeader {
    font-weight: 500;
  }

  .text-activityMission,
  .textBold-activityMission {
    font-size: 16px;
    line-height: 21px;
  }

  .textBold-activityMission {
    font-weight: bold;
  }

  .back-linkText {
    top: -3.7rem;
  }

  .img-activity {
    width: 100px;
    height: 100px;
  }

  .infoIcon-activity {
    position: relative;
    top: -0.2rem;
    right: -0.1rem;
    cursor: pointer;
    font-size: 21px;
    height: min-content;
  }

  .student-content {
    margin-left: -24px;
    margin-right: -24px;
  }

  .student-content:not(:first-child) {
    @media (min-width: 992px) {
      p {
        display: none;
      }
    }
  }

  .situation-chip {
    margin-top: 0.5rem;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  .mission-img {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .mobile-justify-content {
    justify-content: end;

    @media (max-width: 765px) {
      justify-content: center;
      margin-left: 10px;
      margin-top: 20px;
    }
  }

  .progressBar {
    height: 5px;

    &.progress {
      background: rgba(0, 189, 184, 0.1);
    }

    &.performance {
      background: rgba(139, 199, 40, 0.1);
    }
  }
</style>