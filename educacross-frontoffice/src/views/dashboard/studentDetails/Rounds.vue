<template>
  <section>
    <h2 class="text-primary my-1">Desempenho do aluno por atividade</h2>

    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card>
          <b-skeleton class="mb-0" height="150px" />
        </b-card>
      </template>
      <RoundsFilter v-if="dataTable.length" />
      <div v-if="rounds.length">
        <MissionAndQuestionItem
          v-for="round in rounds"
          :key="round.id"
          :item="round"
          :subject-id="subject.id"
          :show-view-details="!!round.totalTime"
          @open:details="openDetails(round)"
        >
          <template v-slot:left-content>
            <div class="d-flex flex-column gap-4 justify-content-center" style="min-width: 350px">
              <ProgressBarHorizontalV2
                :value="round.performance"
                enum="accuracyPerformance"
                height="6px"
                reverse
              >
                <template v-slot="{ item }">
                  <div class="d-flex justify-content-between gap-1 leading-none">
                    <span class="font-weight-bolder small">Rendimento do aluno</span>
                    <span :class="item.variant.textClass" class="font-bold"
                      >{{ item.percent | formatNumber }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>

              <ProgressBarHorizontalV2
                :value="round.classPerformance"
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

              <div class="d-flex justify-content-between">
                <span class="font-weight-bolder small">Tempo do aluno</span>
                <span class="text-primary font-bold">{{ round.totalTime | formattedTime }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="font-weight-bolder small">Tempo médio da turma</span>
                <span class="text-primary font-bold">{{
                  round.classTotalTime | formattedTime
                }}</span>
              </div>
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
    <b-card v-show="totalData">
      <ListTablePagination
        :value="currentPage"
        :total-data="totalData"
        :per-page="perPage.id"
        @input="changePage"
      />
    </b-card>

    <StudentGameDetailsModal
      v-model="openStudentDetailModal"
      :is-loading="loadingStudentDetailsModal"
      :data="studentDetailsModal"
      :student-name="studentName"
    />

    <b-modal
      ref="gameDetail"
      v-model="openGameReport"
      body-class="bg-white"
      centered
      hide-footer
      size="xl"
      static
      title="Detalhes do aluno no turno"
    >
      <StudentGameDetail
        v-if="studentGameDetail"
        :student-round="studentGameDetail"
        :student-name="studentName"
      />
    </b-modal>

    <b-modal
      ref="quizDetail"
      v-model="openQuizReport"
      body-class="bg-white"
      centered
      hide-footer
      size="xl"
      static
      title="Detalhes do aluno no turno"
    >
      <StudentQuizDetail
        v-if="studentQuizDetail"
        :student-round="studentQuizDetail"
        :student-name="studentName"
      />
    </b-modal>
    <!-- <ModalStudentActivityDetails
      v-model="detailsIsOpen"
      :guide-id="mission.id"
      :activity="selectedActivity"
      :student-id="studentId"
      :student-name="studentName"
    /> -->
  </section>
</template>

<script setup>
import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
import ModalStudentActivityDetails from '@/components/mission-plus/ModalStudentActivityDetails.vue'
import StudentGameDetailsModal from '@/components/modal/StudentGameDetailsModal.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import {
  getReportStudentMonitoringPlusActivityDetail,
  getReportStudentMonitoringPlusQuizDetail,
} from '@/services/shared/reports/Report.service.js'
import useFilters from '@/store/filters/useFilters'
import MissionAndQuestionItem from '@/views/dashboard/studentDetails/MissionAndQuestionItem.vue'
import RoundsFilter from '@/views/dashboard/studentDetails/RoundsFilter.vue'
import StudentGameDetail from '@/views/dashboard/studentDetails/components/StudentGameDetail.vue'
import StudentQuizDetail from '@/views/dashboard/studentDetails/components/StudentQuizDetail.vue'
import {useStudentDetails} from '@/views/dashboard/studentDetails/useStudentDetails.js'
import { ref } from 'vue'

const {
  rounds,
  loading,
  studentName,
  studentId,
  fetchStudentDetails,
  loadingStudentDetailsModal,
  studentDetailsModal,
  dataTable,
  perPage,
  totalData,
  currentPage,
  changePage,
} = useStudentDetails()

const { subject, mission, period, parentModule, childModule } = useFilters()

const loadingDetails = ref(false)

const detailsIsOpen = ref(false)
const selectedActivity = ref(null)

const openStudentDetailModal = ref(false)

const openQuizReport = ref(false)
const openGameReport = ref(false)

const studentGameDetail = ref(null)
const studentQuizDetail = ref(null)

const openDetails = async item => {
  if (item.roundType === undefined) {
    openStudentDetailModal.value = true
    fetchStudentDetails(item)
  } else {
    if (loadingDetails.value) return

    loadingDetails.value = true
    if (item.roundType === 0) {
      getReportStudentMonitoringPlusActivityDetail(
        {
          ActivityId: item.activityId,
          TopicId: item.topicId,
          SubjectId: subject.value.id,
          Module: parentModule.value.id,
          ModuleDetailId: childModule.value?.id,
          Month: period.value.id,
          DescriptorsIds: item.descriptors.map(d => d.id),
        },
        studentId.value,
      ).then(({ data }) => {
        studentGameDetail.value = data
        studentGameDetail.value.activities = data.result || []
        studentGameDetail.value.challenges = data.challengesDone
        studentGameDetail.value.attempts = data.attempts

        openGameReport.value = true
      })
    } else {
      getReportStudentMonitoringPlusQuizDetail(
        {
          TopicId: item.topicId,
          SubjectId: subject.value.id,
          Module: parentModule.value.id,
          ModuleDetailId: childModule.value?.id,
          Month: period.value.id,
          DescriptorsIds: item.descriptors.map(d => d.id),
        },
        studentId.value,
      ).then(({ data }) => {
        studentQuizDetail.value = data
        studentQuizDetail.value.quiz = data.result || []
        studentQuizDetail.value.challenges = data.challengesDone
        studentQuizDetail.value.attempts = data.attempts
      })

      openQuizReport.value = true
    }

    loadingDetails.value = false
  }
}
</script>

<style lang="scss" scoped>
  .progress-wrapper {
    width: 375px;
    max-width: 100%;
  }
</style>