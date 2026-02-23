<template>
  <section>
    <div class="w-full">
      <b-card>
        <b-skeleton-wrapper :loading="isLoading">
          <template #loading>
            <b-row>
              <b-col cols="12" md>
                <b-skeleton height="150px" width="150px rounded"></b-skeleton>
              </b-col>
              <b-col cols="12" md>
                <b-skeleton height="150px" width="150px rounded"></b-skeleton>
              </b-col>
              <b-col cols="12" md>
                <b-skeleton height="150px" width="150px rounded"></b-skeleton>
              </b-col>
              <b-col cols="12" md>
                <b-skeleton height="150px" width="150px rounded"></b-skeleton>
              </b-col>
              <b-col cols="12" md>
                <b-skeleton height="150px" width="150px rounded"></b-skeleton>
              </b-col>
            </b-row>
          </template>
          <div class="pb-1">
            <h3 class="text-secondary">Jogos de {{ missionReportActivities.studentName }}</h3>
            <hr />
            <div class="d-flex align-items-center justify-content-between">
              <h3 class="text-secondary">
                {{
                  UtilTeacherService.changeTextBySubject(
                    'knowledgeAxis',
                    'pluralFirstCapitalLetters',
                  )
                }}
              </h3>
              <span
                v-b-tooltip.hover.left="
                  `Veja quais ${UtilTeacherService.changeTextBySubject(
                    'knowledgeAxis',
                    'pluralLowercase',
                  )} da BNCC estão contempladas nesta missão.`
                "
                class="material-icons-outlined text-muted"
                style="font-size: 16px"
              >
                help_outline
              </span>
            </div>
            <b-row>
              <b-col
                cols="12"
                md
                class="intermediateCol-studentActivityContent flex flex-col items-center"
              >
                <img
                  :src="imgAxis('firstAxis', missionReportActivities.qtdFirstAxis)"
                  class="iconImg-AxisContent"
                  alt="firstAxis"
                />
                <p class="text-missionReport color-patternSeven font-bold text-center mt-1">
                  {{ bnccAxisName.firstAxis }}
                </p>
                <p class="text-missionReport color-patternSeven">
                  {{ missionReportActivities.qtdFirstAxis }}
                  {{ missionReportActivities.qtdFirstAxis === 1 ? 'jogo' : 'jogos' }}
                </p>
              </b-col>
              <b-col
                cols="12"
                md
                class="intermediateCol-studentActivityContent flex flex-col items-center"
              >
                <img
                  :src="imgAxis('secondAxis', missionReportActivities.qtdSecondAxis)"
                  class="iconImg-AxisContent"
                  alt="secondAxis"
                />
                <p class="text-missionReport color-patternSeven font-bold text-center mt-1">
                  {{ bnccAxisName.secondAxis }}
                </p>
                <p class="text-missionReport color-patternSeven">
                  {{ missionReportActivities.qtdSecondAxis }}
                  {{ missionReportActivities.qtdSecondAxis === 1 ? 'jogo' : 'jogos' }}
                </p>
              </b-col>
              <b-col class="intermediateCol-studentActivityContent flex flex-col items-center">
                <img
                  :src="imgAxis('thirdAxis', missionReportActivities.qtdThirdAxis)"
                  class="iconImg-AxisContent"
                  alt="thirdAxis"
                />
                <p class="text-missionReport color-patternSeven text-center font-bold mt-1">
                  {{ bnccAxisName.thirdAxis }}
                </p>
                <p class="text-missionReport color-patternSeven">
                  {{ missionReportActivities.qtdThirdAxis }}
                  {{ missionReportActivities.qtdThirdAxis === 1 ? 'jogo' : 'jogos' }}
                </p>
              </b-col>
              <b-col
                cols="12"
                md
                class="intermediateCol-studentActivityContent flex flex-col items-center"
              >
                <img
                  :src="imgAxis('fourthAxis', missionReportActivities.qtdFourthAxis)"
                  class="iconImg-AxisContent"
                  alt="fourthAxis"
                />
                <p class="text-missionReport color-patternSeven font-bold text-center mt-1">
                  {{ bnccAxisName.fourthAxis }}
                </p>
                <p class="text-missionReport color-patternSeven">
                  {{ missionReportActivities.qtdFourthAxis }}
                  {{ missionReportActivities.qtdFourthAxis === 1 ? 'jogo' : 'jogos' }}
                </p>
              </b-col>
              <b-col
                cols="12"
                md
                class="intermediateCol-studentActivityContent flex flex-col items-center"
              >
                <img
                  :src="imgAxis('fifthAxis', missionReportActivities.qtdFifthAxis)"
                  class="iconImg-AxisContent"
                  alt="fifthAxis"
                />
                <p class="text-missionReport color-patternSeven font-bold text-center mt-1">
                  {{ bnccAxisName.fifthAxis }}
                </p>
                <p class="text-missionReport color-patternSeven">
                  {{ missionReportActivities.qtdFifthAxis }}
                  {{ missionReportActivities.qtdFifthAxis === 1 ? 'jogo' : 'jogos' }}
                </p>
              </b-col>
            </b-row>
          </div>
          <hr />
          <!-- INICIO DA "TABELA" -->
          <b-row class="d-none d-lg-flex" style="padding: 1rem 1rem 1rem 3.8rem">
            <b-col cols="12" lg="2">
              <h5 class="text-secondary font-bold">Jogos</h5>
            </b-col>
            <b-col cols="12" lg="3">
              <h5 class="text-secondary font-bold"></h5>
            </b-col>
            <b-col cols="12" lg="3">
              <h5 class="text-secondary font-bold">Índices</h5>
            </b-col>
            <b-col cols="12" lg="2">
              <h5 class="text-secondary font-bold">Total de tentativas</h5>
            </b-col>
            <b-col cols="12" lg="2">
              <h5 class="text-secondary font-bold">Finalizado</h5>
            </b-col>
          </b-row>

          <div class="tableActivity-missionReport mt-1">
            <app-collapse
              accordion
              type="margin"
              class="collapse-withLeftIconDropdown collapse-grayBackground table-content"
            >
              <app-collapse-item
                v-for="(activity, indexActivity) in data.activities"
                :key="indexActivity"
                left
                body-class="w-full"
              >
                <template #header>
                  <div class="w-full">
                    <b-row class="text-center">
                      <b-col cols="12" lg="2">
                        <div class="">
                          <div class="d-flex align-items-top">
                            <img
                              :src="activity.imageUrl"
                              class="ml-2 img-activity"
                              alt="activity"
                            />
                            <b-badge
                              v-if="data.type === 3"
                              pill
                              :variant="
                                $utilTeacherService.activityType.bgColorForBadge(activity.type)
                              "
                            >
                              {{ $utilTeacherService.activityType.formatText(activity.type) }}
                            </b-badge>
                            <span
                              style="font-size: 20px"
                              class="material-symbols-outlined"
                              @click="openActivityDetail(activity.id)"
                            >
                              info
                            </span>
                          </div>
                        </div>
                      </b-col>
                      <b-col cols="12" lg="3" class="text-left">
                        <a
                          v-if="activity.descriptors.length > 2"
                          class="text-missionReport text-primary cursor-pointer underline"
                          @click.stop="showOrHideAllDescriptors(activity, indexActivity)"
                        >
                          {{ activity.showAllDescriptors ? 'Ver menos' : 'Ver todos' }}
                        </a>
                        <div class="flex flex-wrap mt-1 mt-lg-0">
                          <div
                            v-for="(descriptor, indexDescriptor) in activity.descriptors"
                            :key="indexDescriptor"
                            class="mb-50"
                          >
                            <template
                              v-if="
                                (indexDescriptor < 2 && !activity.showAllDescriptors) ||
                                activity.showAllDescriptors
                              "
                            >
                              <b-badge
                                pill
                                :variant="getSubjectVariant(subject.id)"
                                class="description-criterionActivity d-flex cursor-default mr-1"
                              >
                                <span
                                  v-b-tooltip.hover.top="descriptor.description"
                                  style="font-weight: bold"
                                  class="p-50"
                                  >{{ descriptor.name }}</span
                                >
                              </b-badge>
                            </template>
                          </div>
                        </div>
                      </b-col>
                      <!-- INDICES -->
                      <b-col
                        cols="12"
                        lg="3"
                        class="collapse-progress-bars textBold-studentMission"
                      >
                        <div class="text-left mt-1 mb-1">
                          <span class="truncate color-gray100 class-performance">
                            Progresso do Aluno:
                            {{ activity.progress | formatNumber }}%
                          </span>
                          <b-progress height="5px" :value="activity.progress" variant="math" />
                        </div>
                        <div v-if="activity.type === 1" class="text-left mt-1 mb-1">
                          <span class="truncate color-gray100 class-performance">
                            Desempenho do Aluno:
                            {{ activity.performance | formatNumber }}%
                          </span>
                          <b-progress height="5px" :value="activity.performance" variant="mix" />
                        </div>
                        <div class="collapse-progress-bars textBold-studentMission">
                          <div class="text-left mt-1 mb-1">
                            <span class="truncate color-gray100 class-performance">
                              Progresso da Turma:
                              {{ activity.progressClass | formatNumber }}%
                            </span>
                            <b-progress
                              height="5px"
                              :value="activity.progressClass"
                              variant="math"
                            />
                          </div>
                          <div v-if="activity.type === 1" class="text-left mt-1 mb-1">
                            <span class="truncate color-gray100 class-performance">
                              Desempenho da Turma:
                              {{ activity.performanceClass | formatNumber }}%
                            </span>
                            <b-progress
                              height="5px"
                              :value="activity.performanceClass"
                              variant="mix"
                            />
                          </div>
                        </div>
                      </b-col>
                      <!-- TOTAL DE TENTATIVAS -->
                      <b-col cols="12" lg="2" class="text-center">
                        <span>{{ activity.totalAttempts | formatNumber }}</span>
                      </b-col>
                      <!-- FINALIZADO -->
                      <b-col cols="12" lg="2" class="text-left">
                        <span>{{ activity.finished ? 'Sim' : 'Não' }}</span>
                      </b-col>
                    </b-row>
                  </div>
                </template>
                <div class="grayBackground">
                  <div class="p-1">
                    <template v-if="activity.activityPlays.length > 0">
                      <b-row
                        v-for="(play, indexPlay) in activity.activityPlays"
                        :key="indexPlay"
                        class="student-content pt-1 px-1 text-center justify-center"
                        :class="{
                          'border-studentContent pb-1 mb-1':
                            activity.activityPlays.length != indexPlay + 1,
                        }"
                      >
                        <b-col cols="12" lg="2">
                          <p class="textBold-studentMission color-patternThree">Concluiu</p>
                          <div>
                            <span class="text-studentMission color-patternThree">
                              {{ play.finished ? 'Sim' : 'Não' }}
                            </span>
                          </div>
                        </b-col>
                        <b-col cols="12" lg="2">
                          <p class="textBold-studentMission color-patternThree">Acertos</p>
                          <div>
                            <span class="text-studentMission color-patternThree">
                              {{ play.hits }}
                            </span>
                          </div>
                        </b-col>
                        <b-col
                          v-if="!$utilTeacherService.activityType.isCollective(data.type)"
                          cols="12"
                          lg="2"
                        >
                          <p class="textBold-studentMission color-patternThree">Erros</p>
                          <div>
                            <span class="text-studentMission color-patternThree">
                              {{ play.errors }}
                            </span>
                          </div>
                        </b-col>
                        <b-col cols="12" lg="2">
                          <p class="textBold-studentMission color-patternThree">
                            {{
                              $utilTeacherService.activityType.isCollective(data.type)
                                ? 'Progresso'
                                : 'Desempenho'
                            }}
                          </p>
                          <div>
                            <progress-with-label-following
                              :data="
                                $utilTeacherService.activityType.isCollective(data.type)
                                  ? play.progress
                                  : play.performance
                              "
                              color="info"
                            />
                          </div>
                        </b-col>
                        <b-col cols="12" lg="2">
                          <p class="textBold-studentMission color-patternThree">Tempo</p>
                          <div>
                            <span class="text-studentMission color-patternThree">
                              {{ play.time | formattedTime('Não jogou') }}
                            </span>
                          </div>
                        </b-col>
                        <b-col cols="12" lg="2">
                          <p class="textBold-studentMission color-patternThree">Data</p>
                          <div>
                            <span class="text-studentMission color-patternThree">
                              {{ play.date | formattedDate }}
                            </span>
                          </div>
                        </b-col>
                      </b-row>
                    </template>
                    <template v-else>
                      <p class="text-studentMission color-patternTwo text-center mt-1">
                        Não há informações sobre esta atividade.
                      </p>
                    </template>
                  </div>
                </div>
              </app-collapse-item>
            </app-collapse>

            <!-- AREA DOS CARDS -->

            <b-row class="cardTable-container">
              <b-col
                v-for="(activity, indexActivity) in missionReportActivities.activities"
                :key="indexActivity"
                cols="12"
                md="6"
                style="padding-bottom: 20px"
                :class="{
                  'mb-base':
                    indexActivity + 1 < missionReportActivities.activities.length ||
                    indexActivity % 2 != 0,
                }"
              >
                <b-card class="card-table p-1">
                  <div class="flex">
                    <img :src="activity.imageUrl" class="img-activity" alt="activity" />

                    <span
                      style="font-size: 20px"
                      class="material-symbols-outlined infoIcon-activity"
                      @click="openActivityDetail(activity.id)"
                    >
                      info
                    </span>
                  </div>
                  <div class="mt-1">
                    <a
                      v-if="activity.descriptors.length > 2"
                      class="text-missionReport text-primary cursor-pointer underline"
                      @click="showOrHideAllDescriptors(activity, indexActivity)"
                    >
                      {{ activity.showAllDescriptors ? 'Ver menos' : 'Ver todos' }}
                    </a>
                    <div class="flex flex-wrap">
                      <div
                        v-for="(descriptor, indexDescriptor) in activity.descriptors"
                        :key="indexDescriptor"
                      >
                        <template
                          v-if="
                            (indexDescriptor < 2 && !activity.showAllDescriptors) ||
                            activity.showAllDescriptors
                          "
                        >
                          <b-badge
                            v-b-tooltip.hover="descriptor.description"
                            pill
                            :variant="getSubjectVariant(subject.id)"
                            class="description-criterionActivity cursor-default mr-1 mb-1 mt-1"
                          >
                            <span class="p-0" style="font-weight: bold">{{ descriptor.name }}</span>
                          </b-badge>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="mt-1 flex flex-col text-missionReport">
                    <p>
                      <span class="color-patternTwo font-semibold mr-1"> Índices </span>
                    </p>
                    <div class="w-full">
                      <div class="text-left mt-1 mb-1">
                        <span class="color-gray100 class-performance">
                          Progresso do Aluno:
                          {{ activity.progress | formatNumber }}%
                        </span>
                        <b-progress height="5px" :value="activity.progress" variant="math" />
                      </div>
                      <div class="text-left mt-1 mb-1">
                        <span class="color-gray100 class-performance">
                          Desempenho do Aluno:
                          {{ activity.performance | formatNumber }}%
                        </span>
                        <b-progress height="5px" :value="activity.performance" variant="mix" />
                      </div>
                      <div class="text-left mt-1 mb-1">
                        <span class="color-gray100 class-performance">
                          Progresso da Turma: {{ activity.progress | formatNumber }}%
                        </span>
                        <b-progress height="5px" :value="activity.progress" variant="math" />
                      </div>
                      <div class="text-left mt-1 mb-1">
                        <span class="color-gray100 class-performance">
                          Desempenho da Turma: {{ activity.progress | formatNumber }}%
                        </span>
                        <b-progress height="5px" :value="activity.progress" variant="mix" />
                      </div>
                    </div>
                  </div>

                  <div class="my-1 flex text-missionReport">
                    <p>
                      <span class="color-patternTwo font-semibold mr-1"> Total de tentativas </span>
                      <span class="color-patternSeven">
                        {{ activity.totalAttempts | formatNumber }}
                      </span>
                    </p>
                  </div>
                  <div class="my-1 flex text-missionReport">
                    <p>
                      <span class="color-patternTwo font-semibold mr-1"> Finalizado </span>
                      <span class="color-patternSeven">
                        {{ activity.finished ? 'Sim' : 'Não' }}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span v-b-toggle="activity.id.toString()" class="text-primary cursor-pointer">
                      Ver detalhes
                    </span>
                    <b-collapse :id="activity.id.toString()" class="mt-2">
                      <div v-if="activity.activityPlays.length > 0">
                        <span class="d-block mb-1 font-bold">
                          Concluiu:
                          <span class="font-normal">{{
                            activity.activityPlays[0].finished ? 'Sim' : 'Não'
                          }}</span>
                        </span>
                        <span class="d-block mb-1 font-bold">
                          Acertos:
                          <span class="font-normal">
                            {{ activity.activityPlays[0].hits | formatNumber }}
                          </span>
                        </span>
                        <span class="d-block mb-1 font-bold">
                          Erros:
                          <span class="font-normal">
                            {{ activity.activityPlays[0].errors | formatNumber }}
                          </span>
                        </span>
                        <span class="d-block mb-1 font-bold">
                          Desempenho:
                          <span class="font-normal">
                            {{ activity.activityPlays[0].performance | formatNumber }}%
                          </span>
                        </span>
                        <span class="d-block mb-1 font-bold">
                          Tempo:
                          <span class="font-normal">
                            {{ activity.activityPlays[0].time | formattedTime }}
                          </span>
                        </span>
                        <span class="d-block mb-1 font-bold">
                          Data:
                          <span class="font-normal">{{
                            formatDate(activity.activityPlays[0].date)
                          }}</span>
                        </span>
                      </div>
                      <span v-else>Não há informações sobre esta atividade.</span>
                    </b-collapse>
                  </div>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </b-skeleton-wrapper>
      </b-card>
    </div>

    <b-modal
      ref="activityDetail"
      v-model="activePromptActivityDetail"
      size="xl"
      hide-footer
      header-class="bg-white"
      scrollable
      no-close-on-backdrop
      no-close-on-esc
      static
      @close="activePromptActivityDetail = false"
    >
      <template #modal-header>
        <button v-if="renderWebgl" class="back" @click="renderWebgl = false">
          <span class="material-symbols-outlined" style="font-size: 16px"> arrow_back </span>
        </button>
        <button class="close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <activity-detail
        v-if="activePromptActivityDetail"
        v-model="renderWebgl"
        :activity-id="selectedActivityId"
        :subject-id="subject.id"
        @close-activityDetail="closeActivityDetail"
      />
    </b-modal>
  </section>
</template>

<script setup>
import AppCollapse from '@/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@/components/app-collapse/AppCollapseItem.vue'
import { SubjectEnum } from '@/consts/teacher-context/enums/subjectEnum'
import router from '@/router'
import useFilters from '@/store/filters/useFilters'
import formatDate from '@/utils/date.js'
import UtilTeacherService from '@/utils/teacher-utils/utils'
import { getSubjectVariant } from '@/utils/utils'
import ProgressWithLabelFollowing from '@/views/pages/teacher-context/shared/components/ProgressWithLabelFollowing.vue'
import ActivityDetail from '@/views/pages/teacher-context/shared/modals/ActivityDetail.vue'
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Object,
  },
  isLoading: {
    type: Boolean,
  },
})

const activePromptActivityDetail = ref(false)
const selectedActivityId = ref(0)
const renderWebgl = ref(false)

const activityDetail = ref(null)

const { subject } = useFilters()

const bnccAxisName = ref({})

const missionReportActivities = ref({
  activities: [],
})

const missionDetails = ref({
  name: '',
  date: '',
  type: '',
  loading: true,
})

const missionIcons = import.meta.glob(
  '@/assets/images/teacher-context/school-context/institution-missions/icons/*',
  { eager: true },
)

const imgAxis = (axis, qtd) => {
  const subjectName = Object.keys(SubjectEnum).find(
    key => SubjectEnum[key] === subject.value.id,
  )
  const fileName = `${subjectName}-${qtd === 0 ? 'disabled' : 'enabled'}-${axis}.png`
  const key = Object.keys(missionIcons).find(k => k.endsWith(`/${fileName}`))
  return key ? missionIcons[key].default || missionIcons[key] : ''
}

const showOrHideAllDescriptors = (element, index) => {
  element.showAllDescriptors = !element.showAllDescriptors
  missionReportActivities.value.activities.splice(index, 1, element)
}

watch(
  () => props.data,
  () => {
    missionReportActivities.value = props.data

    missionReportActivities.value.qtdFirstAxis = 0
    missionReportActivities.value.qtdSecondAxis = 0
    missionReportActivities.value.qtdThirdAxis = 0
    missionReportActivities.value.qtdFourthAxis = 0
    missionReportActivities.value.qtdFifthAxis = 0

    missionReportActivities.value.knowledgeAxis.forEach(element => {
      if (element.name === bnccAxisName.value.firstAxis)
        missionReportActivities.value.qtdFirstAxis = element.activities
      else if (element.name === bnccAxisName.value.secondAxis)
        missionReportActivities.value.qtdSecondAxis = element.activities
      else if (element.name === bnccAxisName.value.thirdAxis)
        missionReportActivities.value.qtdThirdAxis = element.activities
      else if (element.name === bnccAxisName.value.fourthAxis)
        missionReportActivities.value.qtdFourthAxis = element.activities
      else if (element.name === bnccAxisName.value.fifthAxis)
        missionReportActivities.value.qtdFifthAxis = element.activities
    })
    missionDetails.value.name = props.data.guideName
    missionDetails.value.date = props.data.date
    missionDetails.value.type = props.data.type
  }
)

const openActivityDetail = activityId => {
  selectedActivityId.value = activityId
  activePromptActivityDetail.value = true
}

const closeActivityDetail = () => {
  activePromptActivityDetail.value = false
}

const closeModal = () => {
  if (activityDetail.value && activityDetail.value.hide) {
    activityDetail.value.hide()
  }
}

bnccAxisName.value = UtilTeacherService.bnccAxisName(subject.value.id)
</script>

<style lang="scss">
  //table and card
  .tableActivity-missionReport {
    th:first-child {
      padding-left: 1.75rem !important;
    }

    td:first-child {
      padding-left: 1.5rem !important;
    }

    tr th {
      padding-top: 2.5rem !important;
    }

    tbody td {
      padding-top: 2rem !important;
      padding-bottom: 2rem !important;
    }

    .card-table {
      height: 100%;
      margin: 0;
    }

    .table-content {
      @media (max-width: 1024px) {
        display: none;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .tableActivity-missionReport {
    margin-right: -10px;
    margin-left: -10px;

    .games-table {
      width: 15%;
    }

    .criterion-table {
      width: 30%;
    }

    .takeOff-firstBorderTable {
      border-top: none !important;
    }

    .cardTable-container {
      padding: 2.5rem 1.5rem 0 1.5rem;
      @media (min-width: 1024px) {
        display: none;
      }
    }
  }

  .title-missionReport {
    font-size: 20px;
    line-height: 22px;
  }

  .text-missionReport {
    font-size: 16px;
    line-height: 21px;
  }

  .description-criterionActivity {
    white-space: normal;
    line-height: 1.5rem;
  }

  .title-missionReport,
  .description-criterionActivity {
    font-weight: 600;
  }

  .img-activity {
    width: 100px;
    height: 100px;
  }

  .iconImg-AxisContent {
    width: 86px;
    height: 86px;
  }

  .infoIcon-activity {
    position: relative;
    top: -0.2rem;
    right: -0.1rem;
    cursor: pointer;
    font-size: 21px;
    height: min-content;
  }

  .intermediateCol-studentActivityContent {
    margin-top: 1rem;
    @media (max-width: 991px) and (min-width: 450px) {
      width: 33.33% !important;
    }
    @media (max-width: 449px) and (min-width: 340px) {
      width: 50% !important;
    }
  }
</style>