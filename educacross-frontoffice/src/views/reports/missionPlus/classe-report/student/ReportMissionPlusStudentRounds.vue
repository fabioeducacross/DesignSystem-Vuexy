<script setup>
import MissionAndQuestionItem from '@/components/mission-plus/MissionAndQuestionItem.vue'
import ProgressBarHorizontal from '@/components/progessBar/ProgressBarHorizontal.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarTopInfo.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getVariantByRule } from '@/consts/legends'
import router from '@/router'
import {
  getGuidePlusReportStudentRoundActivityDetail,
  getGuidePlusReportStudentRoundQuizDetail,
} from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import StudentGameDetail from '@/views/reports/missionPlus/classe-report/student/StudentGameDetail.vue'
import StudentQuizDetail from '@/views/reports/missionPlus/classe-report/student/StudentQuizDetail.vue'
import { useReportMissionPlusStudent } from '@/views/reports/missionPlus/classe-report/student/useReportMissionPlusStudent'
import { ref } from 'vue'

const { rounds, loading, subjectId, studentName } = useReportMissionPlusStudent()
const { classe } = useFilters()
const { studentId } = router.currentRoute.params

const studentGameDetail = ref(null)
const studentQuizDetail = ref(null)

const getColorsProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}

const getColorsPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}

const openQuizReport = ref(false)
const openGameReport = ref(false)

const loadingDetails = ref(false)

/** @param {GameItem | QuizItem} item */
const openDetails = async item => {
  if (loadingDetails.value) return

  loadingDetails.value = true
  if (item.type === 0) {
    const { data } = await getGuidePlusReportStudentRoundActivityDetail(
      studentId,
      classe.value.ClassId,
      item.guideRoundId,
    )

    studentGameDetail.value = data
    openGameReport.value = true
  } else {
    const { data } = await getGuidePlusReportStudentRoundQuizDetail(
      studentId,
      classe.value.ClassId,
      item.guideRoundId,
    )
    studentQuizDetail.value = data

    openQuizReport.value = true
  }

  loadingDetails.value = false
}
</script>

<template>
  <section>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card>
          <b-skeleton class="mb-0" height="150px" />
        </b-card>
      </template>
      <MissionAndQuestionItem
        v-for="round in rounds"
        :key="round.guideRoundId"
        :item="round"
        :subject-id="subjectId"
        :loading-details="loadingDetails"
        @open:details="openDetails"
      >
        <template v-slot:left-content>
          <div>
            <ProgressBarHorizontal
              :value="round.performance"
              :variant="getColorsPerformanceEnum(round.performance)"
              label="Rendimento do aluno"
            >
            </ProgressBarHorizontal>

            <ProgressBarHorizontal
              :value="round.classPerformance"
              :variant="getColorsPerformanceEnum(round.classPerformance)"
              label="Rendimento médio da turma"
            />

            <div class="d-flex justify-content-between mb-1">
              <span class="font-semibold">Tempo do aluno</span>
              <span class="text-primary font-bold">{{ round.time | formattedTime }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="font-semibold">Tempo médio da turma</span>
              <span class="text-primary font-bold">{{ round.classTime | formattedTime }}</span>
            </div>
          </div>
        </template>
      </MissionAndQuestionItem>
    </b-skeleton-wrapper>
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
  </section>
</template>