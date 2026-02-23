<template>
  <b-modal
    ref="Modal"
    :visible="value"
    hide-footer
    size="xl"
    centered
    static
    no-close-on-backdrop
    header-bg-variant="light-primary"
    @close="closeModal"
  >
    <div v-if="value">
      <div v-if="studentId" class="d-flex flex-col gap-2 p-2">
        <StudentGameDetail
          v-if="studentGameDetail"
          :student-round="studentGameDetail"
          :student-name="studentName"
        />

        <StudentQuizDetail
          v-if="studentQuizDetail"
          :student-round="studentQuizDetail"
          :student-name="studentName"
        />
      </div>
      <div v-else>
        <StudentsDetail v-if="studentsDetail" :student-round="studentsDetail" />
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import StudentsDetail from '@/components/mission-plus/StudentsDetail.vue'
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import {
  getGuidePlusReportStudentRoundActivityDetail,
  getGuidePlusReportStudentRoundQuizDetail,
  getGuidePlusReportStudentsRoundDetail,
} from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import StudentGameDetail from '@/views/reports/missionPlus/classe-report/student/StudentGameDetail.vue'
import StudentQuizDetail from '@/views/reports/missionPlus/classe-report/student/StudentQuizDetail.vue'
import { watch, ref } from 'vue'

// Props
const props = defineProps({
  studentId: {
    required: false,
  },
  studentName: {
    required: false,
  },
  round: {
    required: false,
  },
  value: {
    type: Boolean,
  },
})

// Emits
const emit = defineEmits(['input'])

const { classe, subject } = useFilters()
const loadingDetails = ref(true)

const studentGameDetail = ref(null)
const studentQuizDetail = ref(null)
const studentsDetail = ref(null)

const fetchDataStudent = async () => {
  loadingDetails.value = true
  if (props.round.type === 0) {
    await fetchDataActivity()
  } else {
    await fetchDataQuiz()
  }
  loadingDetails.value = false
}

const fetchDataStudents = async () => {
  const { data } = await getGuidePlusReportStudentsRoundDetail(
    classe.value.ClassId,
    props.round.guideRoundId,
  )
  studentsDetail.value = data
  if (!data.imageUrl) {
    studentsDetail.value.imageUrl = SubjectEnum[subject.value.id].image
  }
}

const fetchDataQuiz = async () => {
  const { data } = await getGuidePlusReportStudentRoundQuizDetail(
    props.studentId,
    classe.value.ClassId,
    props.round.guideRoundId,
  )
  studentQuizDetail.value = data
  if (!data.imageUrl) {
    studentQuizDetail.value.imageUrl = SubjectEnum[subject.value.id].image
  }
}

const fetchDataActivity = async () => {
  const { data } = await getGuidePlusReportStudentRoundActivityDetail(
    props.studentId,
    classe.value.ClassId,
    props.round.guideRoundId,
  )
  studentGameDetail.value = data
}

watch(
  () => props.value,
  () => {
    if (props.value) {
      studentGameDetail.value = null
      studentQuizDetail.value = null
      studentsDetail.value = null

      if (props.studentId) {
        fetchDataStudent()
      } else {
        fetchDataStudents()
      }
    }
  },
)

const closeModal = () => {
  emit('input', false)
}
</script>

<style lang="scss" scoped>
.modal-icon {
  font-size: 80px;
}
</style>