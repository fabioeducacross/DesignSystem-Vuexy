<template>
  <loading-in-component ref="loadingInReportActivitiesComponet">
    <b-row v-if="missionReportActivities.type !== 3" class="match-height">
      <b-col class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text="Veja quantos alunos receberam e quantos finalizaram a missão enviada."
          title="Total de alunos"
          icon="group"
          variant="light-info"
        >
          <template v-slot:description>
            <p>
              {{ missionReportActivities.amountStudents | formatNumber }}
              {{ missionReportActivities.amountStudents === 1 ? 'aluno' : 'alunos' }}
            </p>
            <p>
              {{ missionReportActivities.finishedStudents | formatNumber }}
              {{ missionReportActivities.finishedStudents === 1 ? 'finalizou' : 'finalizaram' }}
            </p>
          </template>
        </MediaCard>
      </b-col>
      <b-col class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text='Chamamos de "desafios" os exercícios dentro de cada jogo.'
          title="Desafios realizados"
          icon="sports_esports"
          variant="light-warning"
        >
          <template v-slot:description>
            {{ missionReportActivities.exercisesPerformed | formatNumber }}
            {{ missionReportActivities.exercisesPerformed === 1 ? 'desafio' : 'desafios' }}
          </template>
        </MediaCard>
      </b-col>
      <b-col v-if="missionReportActivities.type === 2" class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text="Quantidade de jogos cumpridos (em %)."
          title="Progresso da Turma"
          icon="sports_esports"
          variant="light-primary"
        >
          <template v-slot:description>
            {{ missionReportActivities.progressClass | formatNumber }}%
          </template>
        </MediaCard>
      </b-col>
      <b-col v-else class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text="Desempenho é calculado com base nos acertos e erros nas jogadas dos alunos.

90% a 100% -Avançado
70% a 89% - Adequado
50% a 69% - Básico
0% a 49% - Baixo"
          title="Desempenho da Turma"
          icon="trending_up"
          variant="light-success"
        >
          <template v-slot:description>
            {{ missionReportActivities.performanceClass }}
          </template>
        </MediaCard>
      </b-col>
      <b-col class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text="Tempo de aprendizado dos alunos na Missão enviada"
          title="Tempo de aprendizagem"
          icon="watch"
          variant="light-info"
        >
          <template v-slot:description>
            {{ missionReportActivities.timeClass | formattedTime('Não jogaram') }}
          </template>
        </MediaCard>
      </b-col>
    </b-row>
    <b-row v-else class="match-height">
      <b-col class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text="Veja quantos alunos receberam e quantos finalizaram a missão enviada."
          title="Total de alunos"
          icon="group"
          variant="light-info"
        >
          <template v-slot:description>
            <p>
              {{ missionReportActivities.amountStudents | formatNumber }}
              {{ missionReportActivities.amountStudents === 1 ? 'Student' : 'alunos' }}
            </p>
            <p>
              {{ missionReportActivities.finishedStudents | formatNumber }}
              {{ missionReportActivities.finishedStudents === 1 ? 'finalizou' : 'finalizaram' }}
            </p>
          </template>
        </MediaCard>
      </b-col>
      <b-col class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text='Chamamos de "desafios" os exercícios dentro de cada jogo.'
          title="Desafios realizados"
          icon="sports_esports"
          variant="light-warning"
        >
          <template v-slot:description>
            {{ missionReportActivities.exercisesPerformed | formatNumber }}
            {{ missionReportActivities.exercisesPerformed === 1 ? 'desafio' : 'desafios' }}
          </template>
        </MediaCard>
      </b-col>
      <b-col class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text="Quantidade de jogos cumpridos (em %)."
          title="Progresso da Turma"
          icon="trending_up"
          variant="light-primary"
        >
          <template v-slot:description>
            {{ missionReportActivities.progressClass | formatNumber }}%
          </template>
        </MediaCard>
      </b-col>
      <b-col class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text="Desempenho é calculado com base nos acertos e erros nas jogadas dos alunos.

90% a 100% -Avançado
70% a 89% - Adequado
50% a 69% - Básico
0% a 49% - Baixo"
          title="Desempenho da Turma"
          icon="track_changes"
          variant="light-success"
        >
          <template v-slot:description>
            {{
              UtilTeacherService.activityType.isCollective(missionReportActivities.type)
                ? missionReportActivities.progressClass + '%'
                : missionReportActivities.performanceClass
            }}
          </template>
        </MediaCard>
      </b-col>
      <b-col class="mb-base" sm="12" md="6" lg="3">
        <MediaCard
          tooltip-text="Tempo de aprendizado dos alunos na Missão enviada"
          title="Tempo de aprendizagem"
          icon="watch"
          variant="light-success"
        >
          <template v-slot:description>
            {{ missionReportActivities.timeClass | formattedTime('Não jogaram') }}
          </template>
        </MediaCard>
      </b-col>
    </b-row>

    <b-card>
      <div class="flex justify-end">
        <span
          v-b-tooltip="
            `Veja quais ${UtilTeacherService.changeTextBySubject(
              'knowledgeAxis',
              'pluralLowercase',
            )} da BNCC estão contempladas nesta missão.`
          "
          class="material-symbols-outlined"
          style="font-size: 20px"
        >
          info
        </span>
      </div>
      <div class="px-1 pb-1">
        <p class="title-missionReport color-patternTwo">
          {{
            UtilTeacherService.changeTextBySubject('knowledgeAxis', 'singularFirstCapitalLetters')
          }}
        </p>

        <b-row>
          <b-col cols="12" sm="4" lg>
            <div class="d-flex flex-column justify-content-center align-items-center">
              <img
                :src="imgAxis('firstAxis', missionReportActivities.qtdFirstAxis)"
                class="iconImg-AxisContent"
                alt="firstAxis"
              />
              <p class="text-missionReport color-patternSeven font-bold text-center mt-1">
                {{ bnccAxisName.firstAxis }}
              </p>
              <p class="text-missionReport color-patternSeven text-center">
                {{ missionReportActivities.qtdFirstAxis | formatNumber }}
                {{ missionReportActivities.qtdFirstAxis === 1 ? 'jogo' : 'jogos' }}
              </p>
            </div>
          </b-col>
          <b-col cols="12" sm="4" lg>
            <div class="d-flex flex-column justify-content-center align-items-center">
              <img
                :src="imgAxis('secondAxis', missionReportActivities.qtdSecondAxis)"
                class="iconImg-AxisContent"
                alt="secondAxis"
              />
              <p class="text-missionReport color-patternSeven font-bold text-center mt-1">
                {{ bnccAxisName.secondAxis }}
              </p>
              <p class="text-missionReport color-patternSeven text-center">
                {{ missionReportActivities.qtdSecondAxis | formatNumber }}
                {{ missionReportActivities.qtdSecondAxis === 1 ? 'jogo' : 'jogos' }}
              </p>
            </div>
          </b-col>
          <b-col cols="12" sm="4" lg>
            <div class="d-flex flex-column justify-content-center align-items-center">
              <img
                :src="imgAxis('thirdAxis', missionReportActivities.qtdThirdAxis)"
                class="iconImg-AxisContent"
                alt="thirdAxis"
              />
              <p class="text-missionReport color-patternSeven text-center font-bold mt-1">
                {{ bnccAxisName.thirdAxis }}
              </p>
              <p class="text-missionReport color-patternSeven text-center">
                {{ missionReportActivities.qtdThirdAxis | formatNumber }}
                {{ missionReportActivities.qtdThirdAxis === 1 ? 'jogo' : 'jogos' }}
              </p>
            </div>
          </b-col>
          <b-col cols="12" sm="4" lg>
            <div class="d-flex flex-column justify-content-center align-items-center">
              <img
                :src="imgAxis('fourthAxis', missionReportActivities.qtdFourthAxis)"
                class="iconImg-AxisContent"
                alt="fourthAxis"
              />
              <p class="text-missionReport color-patternSeven font-bold text-center mt-1">
                {{ bnccAxisName.fourthAxis }}
              </p>
              <p class="text-missionReport color-patternSeven text-center">
                {{ missionReportActivities.qtdFourthAxis | formatNumber }}
                {{ missionReportActivities.qtdFourthAxis === 1 ? 'jogo' : 'jogos' }}
              </p>
            </div>
          </b-col>
          <b-col cols="12" sm="4" lg>
            <div class="d-flex flex-column justify-content-center align-items-center">
              <img
                :src="imgAxis('fifthAxis', missionReportActivities.qtdFifthAxis)"
                class="iconImg-AxisContent"
                alt="fifthAxis"
              />
              <p class="text-missionReport color-patternSeven font-bold text-center mt-1">
                {{ bnccAxisName.fifthAxis }}
              </p>
              <p class="text-missionReport color-patternSeven text-center">
                {{ missionReportActivities.qtdFifthAxis | formatNumber }}
                {{ missionReportActivities.qtdFifthAxis === 1 ? 'jogo' : 'jogos' }}
              </p>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="flex justify-end">
        <span
          v-b-tooltip="'Veja quais jogos compõem esta missão.'"
          class="material-symbols-outlined"
          style="font-size: 20px"
        >
          info
        </span>
      </div>
      <div class="px-1 pb-1">
        <p class="title-missionReport color-patternTwo">Jogos</p>
      </div>
      <div class="tableActivity-missionReport mt-1">
        <b-table-simple
          ref="tableActivityMissionReport"
          class="table-dark-inverted d-none d-lg-block"
          no-data-text="Nenhum dado encontrado."
        >
          <b-thead head-variant="light">
            <b-th variant="white" sort-key="id"> Jogo </b-th>
            <b-th />
            <b-th sort-key="performance">
              {{
                UtilTeacherService.subjects.isMultiliteracy(subject.id)
                  ? 'Índices'
                  : 'Desempenho da turma'
              }}
            </b-th>
            <b-th sort-key="totalTime"> Tempo de aprendizagem </b-th>
            <b-th>Ações</b-th>
          </b-thead>
          <b-tbody>
            <b-tr
              v-for="(activity, indexActivity) in missionReportActivities.activities"
              :key="indexActivity"
            >
              <b-td
                class="games-table"
                :class="{
                  'takeOff-firstBorderTable': indexActivity === 0,
                }"
              >
                <div class="flex">
                  <div class="mission-img flex flex-column justify-content-center">
                    <img :src="activity.imageUrl" class="img-activity" alt="activity" />

                    <b-badge
                      v-if="missionReportActivities.type === 3"
                      pill
                      :variant="$utilTeacherService.activityType.bgColorForBadge(activity.type)"
                      class="situation-chip mx-auto"
                    >
                      {{ UtilTeacherService.activityType.formatText(activity.type) }}
                    </b-badge>
                  </div>

                  <span
                    class="material-symbols-outlined"
                    style="font-size: 20px"
                    @click="openActivityDetail(activity.id)"
                  >
                    info
                  </span>
                </div>
              </b-td>
              <b-td
                class="criterion-table"
                :class="{
                  'takeOff-firstBorderTable': indexActivity === 0,
                }"
              >
                <a
                  v-if="activity.descriptors.length > 2"
                  class="text-missionReport text-primary cursor-pointer underline"
                  @click="showOrHideAllDescriptors(activity, indexActivity)"
                >
                  {{ activity.showAllDescriptors ? 'Ver menos' : 'Ver todos' }}
                </a>
                <div class="flex flex-wrap gap-1">
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
                        v-b-tooltip="descriptor.description"
                        pill
                        :variant="getSubjectVariant(subject.id)"
                        class="description-criterionActivity cursor-default"
                      >
                        <span class="px-1" style="font-weight: bold">{{ descriptor.name }}</span>
                      </b-badge>
                    </template>
                  </div>
                </div>
              </b-td>
              <b-td
                :class="{
                  'takeOff-firstBorderTable': indexActivity === 0,
                }"
              >
                <div>
                  <span class="truncate color-gray100 font-weight-bold">
                    Progresso da Turma :
                    {{ activity.progress }}%
                  </span>
                  <b-progress :value="activity.progress" variant="math" height="5px" />
                </div>
                <p />
                <div v-if="activity.type === 1">
                  <span class="truncate color-gray100 font-weight-bold">
                    Desempenho da Turma:
                    {{ activity.performance | formatNumber }}%
                  </span>
                  <b-progress :value="activity.performance" variant="success" height="5px" />
                </div>
              </b-td>

              <b-td
                :class="{
                  'takeOff-firstBorderTable': indexActivity === 0,
                }"
              >
                <p class="text-missionReport color-patternSeven">
                  {{ activity.time | formattedTime('Não jogou') }}
                </p>
              </b-td>
              <b-td
                :class="{
                  'takeOff-firstBorderTable': indexActivity === 0,
                }"
              >
                <span v-if="breadcrumbRoot === 'HighFive'">
                  <router-link
                    :to="{
                      name: 'ActivityDetailMissionReportHighFive',
                      params: {
                        missionId: missionId,
                        activityId: activity.id,
                      },
                    }"
                    class="text-missionReport text-primary font-bold underline"
                  >
                    Detalhes
                  </router-link>
                </span>
                <span v-else-if="breadcrumbRoot === 'booksAndMissions'">
                  <router-link
                    :to="{
                      name: `ActivityDetailBookMissionReportEducationSystem${
                        router.currentRoute.params.educationSystemId || ''
                      }`,
                      params: {
                        bookId: router.currentRoute.params.bookId,
                        missionId: missionId,
                        activityId: activity.id,
                        from: 'sistemaDeEnsino/relatorios',
                        educationSystemId: router.currentRoute.params.educationSystemId,
                      },
                    }"
                    class="text-missionReport text-primary font-bold underline"
                  >
                    Detalhes
                  </router-link>
                </span>
                <span
                  v-else-if="breadcrumbRoot === 'generalReports' || breadcrumbRoot === 'Reports'"
                >
                  <router-link
                    :to="{
                      name: `EducationSystemReportActivityDetail${router.currentRoute.params.educationSystemId}`,
                      params: {
                        bookId: router.currentRoute.params.bookId,
                        missionId: missionId,
                        activityId: activity.id,
                        from: 'sistemaDeEnsino/relatorios',
                        educationSystemId: router.currentRoute.params.educationSystemId,
                      },
                    }"
                    class="text-missionReport text-primary font-bold underline"
                  >
                    Detalhes
                  </router-link>
                </span>
                <span v-else>
                  <router-link
                    :to="{
                      name: 'ActivityDetailMissionReport',
                      params: {
                        educationSystemId: router.currentRoute.params.educationSystemId,
                        missionId: missionId,
                        activityId: activity.id,
                      },
                    }"
                    class="text-missionReport text-primary font-bold underline"
                  >
                    Detalhes
                  </router-link>
                </span>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        <div class="cardTable-container d-flex d-lg-none flex-wrap">
          <div
            v-for="(activity, indexActivity) in missionReportActivities.activities"
            :key="indexActivity"
            class="w-full md:w-1/2"
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
                  class="material-symbols-outlined"
                  style="font-size: 20px"
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
                        v-b-tooltip="descriptor.description"
                        pill
                        :variant="$utilTeacherService.variantByContentType(descriptor.name)"
                        class="description-criterionActivity cursor-default mr-1 mb-1 mt-1"
                      >
                        <span class="p-0" style="font-weight: bold">{{ descriptor.name }}</span>
                      </b-badge>
                    </template>
                  </div>
                </div>
              </div>
              <div class="mt-1 flex flex-col text-missionReport">
                <span class="color-patternTwo font-semibold mr-1">
                  {{
                    UtilTeacherService.subjects.isMultiliteracy(subject.id)
                      ? 'Índices'
                      : 'Desempenho da turma:'
                  }}
                </span>
                <div v-if="UtilTeacherService.subjects.isMultiliteracy(subject.id)" class="w-full">
                  <div v-if="UtilTeacherService.activityType.isCollective(activity.type)">
                    <span class="color-gray100 font-weight-bold">
                      Progresso da Turma: {{ activity.progress | formatNumber }}%
                    </span>
                    <b-progress :value="activity.progress" variant="math" height="5px" />
                  </div>
                  <div v-else>
                    <span class="color-gray100 font-weight-bold">
                      Desempenho da Turma:
                      {{ activity.performance | formatNumber }}%
                    </span>
                    <b-progress :value="activity.performance" variant="math" height="5px" />
                  </div>
                </div>
                <div v-else class="w-full">
                  <span class="color-patternSeven"> {{ activity.performance }}% </span>
                  <b-progress :value="activity.performance" variant="math" height="5px" />
                </div>
              </div>
              <div class="my-1 flex text-missionReport">
                <p>
                  <span class="color-patternTwo font-semibold mr-1"> Tempo de aprendizagem: </span>
                  <span class="color-patternSeven">
                    {{ activity.time | formattedTime('Não jogou') }}
                  </span>
                </p>
              </div>

              <span v-if="breadcrumbRoot === 'HighFive'">
                <router-link
                  :to="{
                    name: 'ActivityDetailMissionReportHighFive',
                    params: {
                      missionId: missionId,
                      activityId: activity.id,
                    },
                  }"
                  class="text-missionReport text-primary font-bold underline"
                >
                  Detalhes
                </router-link>
              </span>
              <span v-else-if="breadcrumbRoot === 'booksAndMissions'">
                <router-link
                  :to="{
                    name: `ActivityDetailBookMissionReportEducationSystem${
                      router.currentRoute.params.educationSystemId || ''
                    }`,
                    params: {
                      bookId: router.currentRoute.params.bookId,
                      missionId: missionId,
                      activityId: activity.id,
                      from: 'sistemaDeEnsino/relatorios',
                      educationSystemId: router.currentRoute.params.educationSystemId,
                    },
                  }"
                  class="text-missionReport text-primary font-bold underline"
                >
                  Detalhes
                </router-link>
              </span>
              <span v-else-if="breadcrumbRoot === 'generalReports' || breadcrumbRoot === 'Reports'">
                <router-link
                  :to="{
                    name: `EducationSystemReportActivityDetail${router.currentRoute.params.educationSystemId}`,
                    params: {
                      bookId: router.currentRoute.params.bookId,
                      missionId: missionId,
                      activityId: activity.id,
                      from: 'sistemaDeEnsino/relatorios',
                      educationSystemId: router.currentRoute.params.educationSystemId,
                    },
                  }"
                  class="text-missionReport text-primary font-bold underline"
                >
                  Detalhes
                </router-link>
              </span>
              <span v-else>
                <router-link
                  :to="{
                    name: 'ActivityDetailMissionReport',
                    params: {
                      educationSystemId: router.currentRoute.params.educationSystemId,
                      missionId: missionId,
                      activityId: activity.id,
                    },
                  }"
                  class="text-missionReport text-primary font-bold underline"
                >
                  Detalhes
                </router-link>
              </span>
            </b-card>
          </div>
        </div>
      </div>
    </b-card>

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
      <template v-slot:modal-header>
        <button v-if="renderWebgl" class="back" @click="renderWebgl = false">
          <span class="material-symbols-outlined" style="font-size: 16px"> arrow_back </span>
        </button>
        <button class="close" @click="$refs.activityDetail.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <activity-detail
        v-if="activePromptActivityDetail"
        v-model="renderWebgl"
        :activity-id="selectedActivityId"
        :subject-id="subject.id"
        @close-activityDetail="closeActivityDetail()"
      />
    </b-modal>
  </loading-in-component>
</template>

<script setup>
import LoadingInComponent from '../../../shared/components/LoadingInComponent.vue'
import ActivityDetail from '../../../shared/modals/ActivityDetail.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import MissionTypeEnum from '@/consts/admin-context/enums/mission.js'
import { SubjectEnum } from '@/consts/teacher-context/enums/subjectEnum'
import router from '@/router'
import { getMissionActivities } from '@/services/shared/reports/Report.service'
import useFilters from '@/store/filters/useFilters'
import UtilTeacherService from '@/utils/teacher-utils/utils'
import { getSubjectVariant } from '@/utils/utils'
import Vue, { ref } from 'vue'

const missionIcons = import.meta.glob(
  '@/assets/images/teacher-context/school-context/institution-missions/icons/*',
  { eager: true },
)

const emit = defineEmits(['mission-details'])
const loadingInReportActivitiesComponet = ref(null)
const activityDetail = ref(null)

// Use useFilters to get classe and subject
const { classe, subject } = useFilters()
const breadcrumbRoot = ref(router.currentRoute.meta.breadcrumb[0].text)
const missionId = ref(router.currentRoute.params.missionId)
const bnccAxisName = ref({})
const Toast = new Vue()
const missionReportActivities = ref({
  activities: [],
})
const missionDetails = ref({
  name: '',
  date: '',
  type: '',
  loading: true,
})

const activePromptActivityDetail = ref(false)
const selectedActivityId = ref(0)
const renderWebgl = ref(false)

function closeActivityDetail() {
  activePromptActivityDetail.value = false
}

function showOrHideAllDescriptors(element, index) {
  element.showAllDescriptors = !element.showAllDescriptors
  missionReportActivities.value.activities.splice(index, 1, element)
}

function imgAxis(axis, qtd) {
  const subjectName = Object.keys(SubjectEnum).find(
    key => SubjectEnum[key] === subject.value.id,
  )
  const imagePath = `/src/assets/images/teacher-context/school-context/institution-missions/icons/${subjectName}-${
    qtd === 0 ? 'disabled' : 'enabled'
  }-${axis}.png`
  return missionIcons[imagePath]?.default || ''
}

function openActivityDetail(activityId) {
  selectedActivityId.value = activityId
  activePromptActivityDetail.value = true
}

function getSubjectMissionIcon(subjectName, missionType) {
  const fileName = `${subjectName}-${missionType}.svg`
  const key = Object.keys(missionIcons).find(k => k.endsWith(`/${fileName}`))
  return key ? missionIcons[key].default || missionIcons[key] : ''
}

function getMissionReportActivities(missionIdVal, classId) {
  setTimeout(() => {
    if (loadingInReportActivitiesComponet.value) {
      loadingInReportActivitiesComponet.value.startLoading()
    }
  }, 0)

  getMissionActivities({ id: missionIdVal, classId })
    .then(response => {
      missionReportActivities.value = response.data
      missionReportActivities.value.qtdFirstAxis = 0
      missionReportActivities.value.qtdSecondAxis = 0
      missionReportActivities.value.qtdThirdAxis = 0
      missionReportActivities.value.qtdFourthAxis = 0
      missionReportActivities.value.qtdFifthAxis = 0

      missionReportActivities.value.type =
        MissionTypeEnum[missionReportActivities.value.type] ||
        missionReportActivities.value.type

      missionReportActivities.value.knowledgeAxes.forEach(element => {
        if (element.knowledgeAxisName === bnccAxisName.value.firstAxis)
          missionReportActivities.value.qtdFirstAxis = element.activities
        else if (element.knowledgeAxisName === bnccAxisName.value.secondAxis)
          missionReportActivities.value.qtdSecondAxis = element.activities
        else if (element.knowledgeAxisName === bnccAxisName.value.thirdAxis)
          missionReportActivities.value.qtdThirdAxis = element.activities
        else if (element.knowledgeAxisName === bnccAxisName.value.fourthAxis)
          missionReportActivities.value.qtdFourthAxis = element.activities
        else if (element.knowledgeAxisName === bnccAxisName.value.fifthAxis)
          missionReportActivities.value.qtdFifthAxis = element.activities
      })
      missionDetails.value.name = response.data.guideName
      missionDetails.value.date = response.data.date
      missionDetails.value.type = MissionTypeEnum[response.data.type] || response.data.type
      missionDetails.value.loading = false
      emit('mission-details', missionDetails.value)
    })
    .catch(error => {
      const errors = error.response?.data?.errors
      let errorsArray = null
      if (errors) {
        errorsArray = UtilTeacherService.handleFormatErrors(errors)
        errorsArray.message.forEach(elementError => {
          Toast.$toast({
            component: Toast,
            props: {
              title: 'Atenção',
              icon: 'AlertTriangleIcon',
              text: elementError,
              variant: 'danger',
            },
          })
        })
      }
    })
    .finally(() => {
      if (loadingInReportActivitiesComponet.value) {
        loadingInReportActivitiesComponet.value.finishLoading()
      }
    })
}

// Fetch data on mount
getMissionReportActivities(missionId.value, classe.value.ClassId)
bnccAxisName.value = UtilTeacherService.bnccAxisName(subject.value.id)

// Make getSubjectVariant available in template
// and for b-badge usage
defineExpose({
  getSubjectVariant,
})

</script>
<style lang="scss" scoped>
  .mission-img {
    width: 100px;
  }
  .img-activity {
    width: 100px;
    height: 100px;
  }

  .title-missionReport {
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
  }

  .iconImg-AxisContent {
    width: 86px;
    height: 86px;
  }

  .cardTable-container {
    border-top: 1px solid #979797;
    padding: 2.5rem 1.5rem 0 1.5rem;
  }

  .tableActivity-missionReport {
    margin-right: -1.5rem;
    margin-left: -1.5rem;
  }

  .text-missionReport {
    font-size: 16px;
    line-height: 21px;
  }

  .games-table {
    width: 15%;
  }

  .criterion-table {
    width: 30%;
  }
  .description-criterionActivity {
    font-size: 14px;
    line-height: 21px;
  }

  .description-criterionActivity {
    font-weight: 600;
  }
</style>