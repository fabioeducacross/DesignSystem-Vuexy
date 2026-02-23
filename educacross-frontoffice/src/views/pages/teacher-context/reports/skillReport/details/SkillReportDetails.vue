<template>
  <div>
    <b-card>
      <b-row class="match-height">
        <b-col cols="12" md="auto">
          <b-link class="text-primary" :to="{ name: 'TeacherSkillReport' }">
            <span class="material-symbols-outlined" style="font-size: 12px; vertical-align: middle">
              arrow_back_ios
            </span>
            <span class="underline"> Voltar </span>
          </b-link>
        </b-col>
        <b-col cols="12" md>
          <p class="mb-0 text-primary font-bold text-right">
            <span :id="`popover-target-${descriptorInfo.tag}`">{{ descriptorInfo.tag }}</span>
          </p>
          <b-popover
            :title="descriptorInfo.tag"
            :target="`popover-target-${descriptorInfo.tag}`"
            triggers="hover"
          >
            <div>
              <p><strong>Habilidade:</strong> {{ descriptorInfo.name }}</p>
            </div>
          </b-popover>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <app-collapse accordion type="margin" class="collapse-container">
        <app-collapse-item title="Proficiency" class="collapse-no-box-shadow">
          <template #header>
            <div class="accordion-header">
              <h1 class="m-0 skillReport-title">
                Atividades utilizadas({{ performanceUsedActivities.length }})
              </h1>
            </div>
          </template>
          <p v-if="performanceUsedActivities.length === 0" class="skillReportPage-text">
            Nenhuma das atividades desta habilidade foram utilizadas nas missões.
          </p>
          <div v-else class="showGamesWrapper">
            <div
              v-for="(usedActivity, usedActivityIndex) in performanceUsedActivities"
              :key="usedActivityIndex"
              class="m-1"
            >
              <div class="d-flex">
                <img
                  alt="activity"
                  :src="usedActivity.activityImage"
                  class="activityImage"
                  @click="openActivityDetail(usedActivity.activityId)"
                />
              </div>
            </div>
          </div>
        </app-collapse-item>
      </app-collapse>
      <hr />
      <div class="skillReport-container">
        <h1 class="m-0 skillReport-title">Desempenho por aluno</h1>
        <b-overlay :show="loading">
          <div class="d-flex align-items-center w-100 mt-1">
            <table class="w-100">
              <thead>
                <tr>
                  <th class="table-column-title p-0">Aluno</th>
                  <th class="table-column-title">Tempo de aprendizagem</th>
                  <th class="table-column-title">Desempenho Geral</th>
                  <th class="table-column-title">Desempenho Missões</th>
                  <th class="table-column-title p-0">Desempenho Ilhas</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in performanceStudents" :key="student.studentId">
                  <td>
                    <p class="m-0 pt-1 skillReportPage-text">
                      {{ student.studentName }}
                    </p>
                  </td>
                  <td>
                    <p class="m-0 pt-1 skillReportPage-text">
                      {{ student.studentTime | formattedTime('Não jogou') }}
                    </p>
                  </td>
                  <td>
                    <div class="d-flex flex-column progress-container pr-1 pt-1">
                      <small> {{ student.performanceStudentGeneral | formatNumber }}% </small>
                      <b-progress
                        variant="success"
                        :value="student.performanceStudentGeneral"
                        :max="100"
                        height="8px"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-column progress-container pr-1 pt-1">
                      <small> {{ student.performanceStudentGuide | formatNumber }}% </small>
                      <b-progress
                        :value="student.performanceStudentGuide"
                        :max="100"
                        height="8px"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-column progress-container pr-1 pt-1">
                      <small> {{ student.performanceStudentIsland | formatNumber }}% </small>
                      <b-progress
                        variant="warning"
                        :value="student.performanceStudentIsland"
                        :max="100"
                        height="8px"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-overlay>
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
        <button class="close" @click="activePromptActivityDetail = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <activity-detail
        v-if="activePromptActivityDetail"
        v-model="renderWebgl"
        :activity-id="selectedActivityId"
        :subject-id="subject.id"
        :educational-organization-id="educationalOrganizationId"
        @close-activityDetail="activePromptActivityDetail = false"
      />
    </b-modal>
  </div>
</template>

<script setup>
import ActivityDetail from '../../../shared/modals/ActivityDetail.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import {
  getDescriptorInfo,
  getPerformanceActivities,
  getPerformanceStudents,
} from '@/services/shared/reports/Report.service'
import useFilters from '@/store/filters/useFilters'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import { watch, ref } from 'vue'

// Filters (global recommended to support legacy pipes)
import { formatNumber, formattedTime } from '@/filters/filters'

const { classe, subject } = useFilters()
const descriptorId = router.currentRoute.params.id

const loading = ref(true)
const descriptorInfo = ref({})
const performanceUsedActivities = ref([])
const performanceUnusedActivities = ref([])
const performanceStudents = ref([])

const educationalOrganizationId =
  parseInt(router.currentRoute.query.educationalOrganizationId) || null

const handleGetDescriptorInfo = async () => {
  await getDescriptorInfo(descriptorId).then(response => {
    descriptorInfo.value = response.data
  })
}

const handleGetPerformanceActivities = async () => {
  await getPerformanceActivities(classe.value.ClassId, descriptorId).then(response => {
    performanceUsedActivities.value = response.data.filter(el => el.count > 0)
    performanceUnusedActivities.value = response.data.filter(el => el.count === 0)
  })
}

const handleGetPerformanceStudents = async () => {
  await getPerformanceStudents(classe.value.ClassId, descriptorId).then(response => {
    performanceStudents.value = response.data
  })
}

const fetchData = () => {
  loading.value = true
  handleGetDescriptorInfo()
  handleGetPerformanceActivities()
  handleGetPerformanceStudents()
  loading.value = false
}

watch(
  [classe],
  () => {
    fetchData()
  },
  { deep: true },
)

fetchData()

const activePromptActivityDetail = ref(false)
const selectedActivityId = ref(0)

const openActivityDetail = id => {
  selectedActivityId.value = id
  activePromptActivityDetail.value = true
}
const renderWebgl = ref(false)
</script>

<script>
export default {
  filters: {
    formatNumber,
    formattedTime,
  },
}
</script>

<style lang="scss" scoped>
  .infoIcon-activity {
    position: relative;
    top: -1rem;
    right: 0.7rem;
    cursor: pointer;
    font-size: 21px;
    height: min-content;
    width: 0;
  }

  .back-linkText {
    top: -4.1rem;
  }

  .collapse-no-box-shadow {
    box-shadow: initial !important;
  }

  .skillReport-title {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #5e5873;
  }

  .skillReport-container {
    padding: 1rem;
    overflow-x: auto;
  }

  .skillReportPage-title {
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 25px;
    color: #5e5873;
  }

  .progress-label-md,
  .skillReportPage-text {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 23px;
    color: #6e6b7b;
    padding-right: 1rem;
  }

  .showGamesWrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .activityImage:hover {
    cursor: pointer;
  }

  .table-column-title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    color: #5e5873;
    padding: 0;
    padding-right: 1rem;
  }

  .back {
    position: absolute;
    top: -2px;
    right: 30px;

    padding: 0.7rem 0.7rem;
    box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
    border-radius: 0.357rem;
    background: #fff;

    color: #5e5873;

    opacity: 1;
    transition: all 0.23s ease 0.1s;

    &:hover {
      transform: translate(-3px, 5px);
    }
  }

  .left-arrow-icon {
    stroke-width: 3;
    transform: scale(1.2);
  }
</style>