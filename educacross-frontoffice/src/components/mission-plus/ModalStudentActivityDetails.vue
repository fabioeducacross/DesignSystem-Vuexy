<template>
  <b-modal
    ref="Modal"
    :title="modalTitle"
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
        <StudentActivityDetail
          v-if="studentActivityDetail"
          :student-round="studentActivityDetail"
          :student-name="studentName"
        />
      </div>
      <div v-else-if="studentsData">
        <StudentsDetail :student-round="studentsData" />
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import StudentActivityDetail from '@/components/mission-plus/StudentActivityDetail.vue'
import StudentsDetail from '@/components/mission-plus/StudentsDetail.vue'
import { getGuideReportActivity, getGuideReportActivityStudent } from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import StudentQuizDetail from '@/views/reports/missionPlus/classe-report/student/StudentQuizDetail.vue'
import { ref, watch, computed } from 'vue'

// Props
const props = defineProps({
  studentId: {
    required: false,
  },
  guideId: {
    required: false,
  },
  activity: {
    required: false,
  },
  value: {
    type: Boolean,
  },
  studentName: {
    type: String,
    required: false,
  },
})

// Emit
const emit = defineEmits(['input'])

const { classe } = useFilters()
const loadingDetails = ref(true)

const studentActivityDetail = ref(null)
const studentQuizDetail = ref(null)
const studentsData = ref(null)

const fetchDataStudents = async () => {
  loadingDetails.value = true
  const { data } = await getGuideReportActivity(
    classe.value.ClassId,
    props.guideId,
    props.activity.activityId,
  )
  studentsData.value = data
  loadingDetails.value = false
}

const modalTitle = computed(() => {
  if (props.studentId) {
    return 'Detalhes do aluno no turno'
  }
  return 'Detalhes dos alunos no turno'
})

const fetchDataActivity = async () => {
  const { data } = await getGuideReportActivityStudent(
    props.guideId,
    props.activity.activityId,
    props.studentId,
    {
      classId: classe.value.ClassId,
    },
  )
  studentActivityDetail.value = data
}

watch(
  () => props.value,
  () => {
    if (props.value) {
      studentActivityDetail.value = null
      studentQuizDetail.value = null
      studentsData.value = null

      if (props.studentId) {
        fetchDataActivity()
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