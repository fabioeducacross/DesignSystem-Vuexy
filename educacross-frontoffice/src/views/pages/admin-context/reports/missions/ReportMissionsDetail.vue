<template>
  <div>
    <div class="mission-individual-content">
      <Tab :tabs="tabs" :current-tab.sync="currentTab">
        <template #tab-content-0>
          <b-card>
            <div class="mission-individual-header">
              <div class="d-flex align-items-center">
                <h2 class="page-title mr-1">
                  {{ guideName }}
                </h2>
                <mission-type :content="{ type: MissionTypeEnum[dashboardGamesData.type] }" />
                <b-badge
                  v-if="application && applicationTypeEnum[application]"
                  pill
                  :variant="applicationTypeEnum[application].variant"
                  class="ml-50 d-flex align-items-center justify-content-center gap-1"
                  style="height: 30px"
                >
                  <span class="material-symbols-outlined" style="font-size: 16px">
                    {{ applicationTypeEnum[application].icon }}
                  </span>
                  {{ applicationTypeEnum[application].label }}
                </b-badge>
              </div>
            </div>
          </b-card>
          <MissionReportStudentsCards
            :students-finished="missionReportStudents.studentsFinished"
            :total-students="missionReportStudents.totalStudents"
            :challenges-done="missionReportStudents.challengesDone"
            :performance="missionReportStudents.performance"
            :total-time="missionReportStudents.totalTime"
          />
          <ListTable
            v-if="dashboardGamesData.type"
            :loading="busy"
            :table-columns="
              dashboardGamesData.type === 'Individual'
                ? tableColumnsIndividual
                : tableColumnsCollective
            "
            :data-table="studentList"
            :total-data="totalStudents"
            :per-page-default="perPage"
            :show-search-query-input="false"
            @change="changeListTable"
          >
            <template #cell(name)="{ item }">
              <span class="font-weight-bold">{{ item.name }}</span>
            </template>

            <template #cell(progress)="{ value }">
              <SemaphoreStatus :status-enum="getPerformanceEnum(value)">
                {{ value }}%
              </SemaphoreStatus>
            </template>

            <template #cell(performance)="{ value }">
              <SemaphoreStatus :status-enum="getPerformanceEnum(value)">
                {{ value }}%
              </SemaphoreStatus>
            </template>

            <template #cell(time)="{ value }">
              {{ formattedTime(value, 'Nenhum') }}
            </template>
          </ListTable>
        </template>
        <template #tab-content-1>
          <div class="mission-games-dashboard">
            <b-card class="dashboard-card">
              <b-overlay :show="busy" no-wrap />
              <div class="d-flex align-items-center">
                <img
                  alt="#"
                  class="dashboard-images"
                  src="@/assets/images/missions/mission-students.png"
                />
                <div class="mission-games-dashboard-text">
                  <h1 class="mission-dashboard-title">Total de Alunos</h1>
                  <h2>
                    {{ formatNumber(dashboardGamesData.amountStudents) }}
                    {{ dashboardGamesData.amountStudents > 1 ? 'Alunos' : 'Aluno' }}
                  </h2>
                  <h2>
                    {{ formatNumber(dashboardGamesData.finishedStudents) }}
                    {{ dashboardGamesData.amountStudents === 1 ? 'Finalizou' : 'Finalizaram' }}
                  </h2>
                </div>
              </div>
            </b-card>
            <b-card class="dashboard-card">
              <b-overlay :show="busy" no-wrap />
              <div class="d-flex align-items-center">
                <img
                  alt="#"
                  class="dashboard-images"
                  src="@/assets/images/missions/mission-challenges.png"
                />
                <div class="mission-games-dashboard-text">
                  <h1 class="mission-dashboard-title">Desafios Realizados</h1>
                  <h2>{{ formatNumber(dashboardGamesData.exercisesPerformed) }} Desafios</h2>
                </div>
              </div>
            </b-card>
            <b-card
              v-if="dashboardGamesData.type !== 'Individual'"
              :class="
                dashboardGamesData.type === 'Mixed' ? 'dashboard-card-mista' : 'dashboard-card'
              "
            >
              <b-overlay :show="busy" no-wrap />
              <div class="d-flex align-items-center">
                <img
                  alt="#"
                  class="dashboard-images"
                  src="@/assets/images/missions/mission-progress.png"
                />
                <div class="mission-games-dashboard-text">
                  <h1 class="mission-dashboard-title">Progresso da Turma</h1>
                  <h2>{{ formatNumber(dashboardGamesData.progressClass) }}%</h2>
                </div>
              </div>
            </b-card>
            <b-card
              v-if="dashboardGamesData.type !== 'Collective'"
              :class="
                dashboardGamesData.type === 'Mixed' ? 'dashboard-card-mista' : 'dashboard-card'
              "
            >
              <b-overlay :show="busy" no-wrap />
              <div class="d-flex align-items-center">
                <img
                  alt="#"
                  class="dashboard-images"
                  src="@/assets/images/missions/mission-performance.png"
                />
                <div class="mission-games-dashboard-text">
                  <h1 class="mission-dashboard-title">Desempenho da Turma</h1>
                  <h2>{{ dashboardGamesData.performanceClass }}</h2>
                </div>
              </div>
            </b-card>
            <b-card
              :class="
                dashboardGamesData.type === 'Mixed' ? 'dashboard-card-mista' : 'dashboard-card'
              "
            >
              <b-overlay :show="busy" no-wrap />
              <div class="d-flex align-items-center">
                <img
                  alt="#"
                  class="dashboard-images"
                  src="@/assets/images/missions/mission-time.png"
                />
                <div class="mission-games-dashboard-text">
                  <h1 class="mission-dashboard-title">Tempo de Aprendizagem</h1>
                  <h2>
                    {{ formatTime }}
                  </h2>
                </div>
              </div>
            </b-card>
          </div>
          <div class="mission-experience-fields">
            <b-card class="experience-fields-card">
              <b-overlay :show="busy" no-wrap />
              <div>
                <h1 v-if="subject.id === 1">Unidade Tematica</h1>
                <h1 v-else-if="subject.id === 2">Campos de Atuacao</h1>
                <h1 v-else>Campos de Experiencias</h1>
                <experience-fields
                  :data="dashboardGamesData.knowledgeAxes"
                  :type="getSubjectType()"
                />
                <h1>Jogos</h1>
                <hr />
                <b-table :fields="fields" :items="dashboardGamesData.activities">
                  <template #cell(name)="data">
                    <div class="d-flex align-items-center">
                      <div>
                        <img :src="data.item.imageUrl" alt="" />
                        <mission-type
                          v-if="getActivitieType(data.item.type) !== 'Individual'"
                          :content="{ type: data.item.type }"
                        />
                      </div>
                      <div class="ml-3 d-flex flex-column align-items-start">
                        <span
                          v-if="data.item.descriptors.length > 2"
                          class="text-warning seeAll-button mb-1"
                          @click="showAllDescriptors(data.item)"
                          >Ver todos</span
                        >
                        <div
                          v-for="(descriptor, index) in data.item.descriptors"
                          :key="descriptor.id"
                        >
                          <b-badge
                            v-if="index < 2 || showDescriptorsArray.includes(data.item.id)"
                            :variant="getSubjectVariant(subject.id)"
                            pill
                            class="mb-50"
                          >
                            {{ descriptor.name }}
                          </b-badge>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #cell(performance)="data">
                    <div>
                      <div>
                        <div class="progressbar-label">
                          <p>Progresso da turma - {{ data.item.progress }}%</p>
                        </div>
                        <b-progress
                          :max="100"
                          :value="data.item.progress"
                          height="5px"
                          variant="primary"
                        />
                      </div>
                      <div v-if="dashboardGamesData.type !== 'Collective' || data.item.type === 2">
                        <div class="progressbar-label mt-1">
                          <p>Desempenho da turma - {{ data.item.performance }}%</p>
                        </div>
                        <b-progress
                          :max="100"
                          :value="data.item.performance"
                          height="5px"
                          variant="primary"
                        />
                      </div>
                    </div>
                  </template>
                  <template #cell(time)="data">
                    {{ data.item.time === 0 ? 'Nenhum' : formattedTime(data.item.time, 'Nenhum') }}
                  </template>
                </b-table>
              </div>
            </b-card>
          </div>
        </template>
        <template v-if="handleShowRanking" #tab-content-2>
          <ranking-mission-table
            ranking-title="Ranking de conquistas por ano escolar"
            :leader-board="rankingData"
            :count-activities="countActivities"
            :count-stars="countStars"
            :busy="busy"
          />
        </template>
      </Tab>
    </div>
  </div>
</template>

<script setup>
import ExperienceFields from '../../shared/components/experience-fields/ExperienceFields.vue'
import RankingMissionTable from '../../shared/components/ranking-mission-table/RankingMissionTable.vue'
import MissionType from '../../shared/table-columns-components/MissionType.vue'
import Tab from '@/components/tab/Tab.vue'
import ListTable from '@/components/table/ListTable.vue'
import MissionTypeEnum from '@/consts/admin-context/enums/mission'
import SubjectEnum from '@/consts/admin-context/enums/subject'
import { getPerformanceEnum } from '@/consts/evaluationsEnum.js'
import { applicationTypeEnum } from '@/consts/missionsEnum.js'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import {
  getMissionActivitiesV2,
  getMissionReportV2,
} from '@/services/shared/reports/Report.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import rankingMissionsModule from '@/store/pageModules/missions/ranking-missions-module.js'
import { formattedTime, getSubjectVariant } from '@/utils/utils'
import MissionReportStudentsCards from '@/views/pages/admin-context/reports/missions/components/MissionReportStudentsCards.vue'
import { useRankingMissionTable } from '@/views/pages/admin-context/shared/components/ranking-mission-table/useRankingMissionTable'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { computed, ref } from 'vue'

const { MODULE_NAME } = useRankingMissionTable()

if (!store.hasModule(MODULE_NAME)) {
  store.registerModule(MODULE_NAME, rankingMissionsModule)
}
const { classe, subject } = useFilters()

const busy = ref(true)

classe.value = { ClassId: router.currentRoute.params.classId }

const { classId, guideId, institutionId } = router.currentRoute.params

const tableColumnsIndividual = [
  {
    key: 'name',
    label: 'Aluno',
    sortable: false,
  },
  {
    key: 'challengesDone',
    label: 'Desafios realizados',
    sortable: false,
  },
  {
    key: 'progress',
    label: 'Progresso do aluno',
    sortable: false,
  },
  {
    key: 'performance',
    label: 'Desempenho do aluno',
    sortable: false,
  },
  {
    key: 'time',
    label: 'Tempo de aprendizagem',
    sortable: false,
  },
]
const tableColumnsCollective = [
  {
    key: 'name',
    label: 'Aluno',
  },
  {
    key: 'progress',
    label: 'Progresso do aluno',
    sortable: false,
  },
  {
    key: 'time',
    label: 'Tempo de aprendizagem',
    sortable: false,
  },
]

const fields = [
  {
    key: 'name',
    label: 'Jogos',
  },
  {
    key: 'performance',
    label: 'Indices',
  },
  {
    key: 'time',
    label: 'Tempo de Aprendizagem',
  },
]

const params = {
  id: guideId,
  classId,
  institutionId,
}

const missionReportStudents = ref({})
const guideName = ref('')
const application = ref(0)
const studentList = ref([])
const totalStudents = ref(0)
const dashboardGamesData = ref({})
const rankingData = ref([])
const countActivities = ref(0)
const countStars = ref(0)
const perPage = ref(10)
const currentPage = ref(1)
const sortBy = ref(null)
const sortDesc = ref(false)

const handleGetData = async () => {
  const requestParams = {
    ...params,
    Page: currentPage.value,
    PageSize: perPage.value,
    OrderBy: sortBy.value,
    Ascending: sortDesc.value,
  }

  const response = await getMissionReportV2(requestParams)

  missionReportStudents.value = response.data
  guideName.value = response.data.guideName
  application.value = response.data.application
  studentList.value = response.data.students
  totalStudents.value = response.data.total || response.data.students.length

  store.commit(`${MODULE_NAME}/guideName`, response.data.guideName)
}

const handleGetActivities = async () => {
  const response = await getMissionActivitiesV2(params)
  dashboardGamesData.value = response.data
}

Promise.all([handleGetData(), handleGetActivities()]).finally(() => {
  busy.value = false
})

const getActivitieType = data => {
  return MissionTypeEnum.Individual === data ? 'Individual' : 'Coletivo'
}

const formatTime = computed(() => {
  return formattedTime(dashboardGamesData.value.timeClass, 'Nao jogaram')
})

const getSubjectType = () => {
  if (SubjectEnum.Matematica === subject.value.id) {
    return 'Matematica'
  }
  if (SubjectEnum.Portugues === subject.value.id) {
    return 'Portugues'
  }
  return 'LigaDasCorujinhas'
}

const handleShowRanking = computed(() => {
  if (busy.value) return true

  if (!dashboardGamesData.value || !dashboardGamesData.value.type) {
    return false
  }

  if (dashboardGamesData.value.type === 'Collective') {
    return false
  }

  if (subject.value && subject.value.id && getSubjectType() === 'LigaDasCorujinhas') {
    return false
  }

  return true
})

const showDescriptorsArray = ref([])

const showAllDescriptors = data => {
  if (!showDescriptorsArray.value.includes(data.id)) {
    showDescriptorsArray.value.push(data.id)
  } else {
    showDescriptorsArray.value = showDescriptorsArray.value.filter(item => item !== data.id)
  }
}

const changeListTable = async ({
  currentPage: page,
  perPage: pageSize,
  sortBy: sort,
  isSortDirDesc,
}) => {
  currentPage.value = page
  perPage.value = pageSize
  sortBy.value = sort || null
  sortDesc.value = isSortDirDesc
  busy.value = true
  await handleGetData()
  busy.value = false
}

const currentTab = ref(0)
const tabs = computed(() => {
  const tabsList = [{ title: 'Alunos' }, { title: 'Jogos' }]

  if (handleShowRanking.value) {
    tabsList.push({ title: 'Ranking da missao' })
  }

  return tabsList
})
</script>

<style lang="scss" scoped>
  .mission-experience-fields {
    @media (max-width: 800px) {
      display: flex;
      flex-direction: column;
    }
  }

  .mission-games-dashboard {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-between;

    @media (max-width: 800px) {
      display: flex;
      flex-direction: column;
    }

    @media (min-width: 1300px) {
      column-gap: 10px;
      flex-wrap: nowrap;
    }
  }

  .dashboard-card {
    display: flex;
    flex-direction: row;
    min-width: 49%;

    @media (min-width: 1300px) {
      min-width: 24.5%;
    }

    ::v-deep .card-body {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }

  .dashboard-card-mista {
    display: flex;
    flex-direction: row;
    min-width: 32%;

    ::v-deep .card-body {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }

  .mission-games-dashboard-text {
    margin: 0 0 0 16px;

    h2 {
      margin: 0;
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;

      color: #b9b9c3;
    }
  }

  .dashboard-images {
    width: 64px;
    height: 64px;
  }

  .mission-dashboard-title {
    margin: 0;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    color: #5e5873;
  }

  .experience-fields-card {
    h1 {
      margin: 0;
      font-weight: 500;
      font-size: 21px;
      line-height: 25px;

      color: #6e6b7b;
    }

    @media (max-width: 800px) {
      display: flex;
      flex-direction: column;
    }
  }

  .experience-field {
    width: 20%;
    margin: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      text-align: center;

      margin: 16px 0 8px 0;
      font-weight: 600;
      font-size: 15px;
      line-height: 14px;

      color: #6e6b7b;
    }

    span {
      margin: 0;
      font-weight: 500;
      font-size: 14px;
      line-height: 23px;

      color: #6e6b7b;
    }

    img {
      width: 92px;
      height: 92px;
    }
  }

  .page-title {
    margin: 0;
    font-weight: 500;
    font-size: 21px;
    line-height: 25px;

    color: #2c2c2c;
  }

  .descriptor-chip {
    padding: 6px;
    border-radius: 15px;
  }

  .mission-type-chip {
    border-radius: 15px;
  }

  .mission-tag-style {
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    margin-top: 0.3rem;
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 900px) {
    .column-order {
      display: flex;
      flex-direction: column;
    }

    .filters-form {
      display: flex;
      flex-direction: column;
    }

    .filters-form-items {
      margin-bottom: 1rem;
    }

    .custom-button-margin {
      margin-top: 1rem;
    }
  }

  .seeAll-button {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
