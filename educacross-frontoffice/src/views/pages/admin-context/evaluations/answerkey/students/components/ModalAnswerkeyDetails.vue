<template>
  <b-modal
    :visible="value"
    hide-footer
    size="xl"
    no-close-on-backdrop
    centered
    static
    title="Gabarito Digital"
    header-bg-variant="light-primary"
    @close="handleCloseModal"
    @hide="handleCloseModal"
  >
    <div v-if="student">
      <b-card border-variant="rowBackground border shadow-none" body-class="p-1">
        <b-row>
          <b-col cols="12" sm="9">
            <div>
              <div class="d-flex flex-md-row align-items-center gap-4">
                <div v-if="subjectsIds" class="d-flex gap-1">
                  <Subjects
                    v-for="subject in subjectsIds"
                    :key="subject"
                    :subject-id="subject"
                    :size="24"
                  />
                </div>
                <h6 class="font-bold text-body mb-0">{{ evaluationDetails.evaluationName }}</h6>
              </div>
            </div>
          </b-col>
          <b-col cols="12" sm="3">
            <div
              class="d-flex align-items-center gap-2 justify-content-center justify-content-sm-end text-primary"
            >
              <h4 class="mb-0 text-primary">
                <span class="font-bold">{{ student.name }}</span>
              </h4>
            </div>
          </b-col>
        </b-row>
      </b-card>

      <!-- Status Alerts -->
      <b-alert
        v-if="currentAlert"
        :variant="currentAlert.variant"
        :show="true"
        :class="currentAlert.class"
      >
        <div class="alert-body text-center">
          <p :class="currentAlert.messageClass">
            <span class="material-symbols-outlined align-middle">{{ currentAlert.icon }}</span>
            {{ currentAlert.message }}
            <b-link
              v-if="currentAlert.showEditLink"
              class="d-inline underline cursor-pointer"
              @click="handleOpenAnswerKey"
            >
              Editar gabarito
              <span class="material-symbols-outlined align-middle font-16">edit</span>
            </b-link>
          </p>
          <b v-if="evaluationStatusMessage">
            {{ evaluationStatusMessage }}
          </b>
        </div>
      </b-alert>

      <!-- Test Selection -->
      <b-form-group v-if="hasMultipleTests" label="Prova" label-for="test">
        <ESelect
          :value="selectedTest"
          :options="testList"
          :loading="loadingTests"
          @change="handleTestChange"
        >
          <template v-slot:option="item">
            <div class="d-flex align-items-center gap-1">
              <component :is="getSubjectIcon(item.subjectId)" :height="26" :width="26" />
              <span>{{ item.name }}</span>
            </div>
          </template>

          <template v-slot:selected-option="item">
            <div class="d-flex align-items-center gap-1">
              <component :is="getSubjectIcon(item.subjectId)" :height="26" :width="26" />
              <span>{{ item.name }}</span>
            </div>
          </template>
        </ESelect>
      </b-form-group>

      <!-- Questions List -->
      <div style="max-height: 440px; overflow-y: auto; overflow-x: hidden">
        <AnswerkeyList
          :loading="loadingQuestions"
          :data="questionList.questions"
          :subject-id="selectedTest.subjectId"
          :disabled="true"
        />
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import MissionLiga from '@/assets/icons/mission-icons/MissionLiga.vue'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import ESelect from '@/components/selects/ESelect.vue'
import Subjects from '@/components/subjects/subjects.vue'
import { EAnswerKey, StatusEnum } from '@/consts/evaluationsEnum.js'
import router from '@/router'
import {
  getEvaluationAnswerKeyStudentQuestions,
  getEvaluationTestsLabel,
} from '@/services/shared/evaluations/Evaluation.Service.js'
import useFilters from '@/store/filters/useFilters'
import AnswerkeyList from '@/views/pages/admin-context/evaluations/answerkey/students/components/AnswerkeyList.vue'
import { computed, watch, ref, reactive, toRefs } from 'vue'

const SUBJECT_ICONS = {
  1: MissionMath,
  2: MissionPort,
  3: MissionLiga,
  4: MissionMathIng,
}

// Props
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  student: {
    type: Object,
    default: () => null,
    validator: value => !value || (value && typeof value.id !== 'undefined'),
  },
  evaluationDetails: {
    type: Object,
    default: () => ({}),
    validator: value => !value || (value && typeof value === 'object'),
  },
})

// Emits
const emit = defineEmits(['input', 'close'])

// Composables
const { classe } = useFilters()

// Reactive state
const selectedTest = ref({})
const testList = ref([])
const questionList = ref({})
const loadingTests = ref(false)
const loadingQuestions = ref(false)
const error = ref(null)

// Computed properties
const evaluationId = computed(() => router.currentRoute.params.evaluationId)

const subjectsIds = computed(
  () => props.evaluationDetails?.subjects?.map(subject => subject.id) || [],
)

const hasMultipleTests = computed(() => testList.value.length > 1)

const isDigitalEvaluation = computed(
  () => questionList.value.status === EAnswerKey.EvaluationDigital,
)

const isTeacherInput = computed(() => questionList.value.status === EAnswerKey.TeacherInput)

const isTeacherAutomaticInput = computed(
  () => questionList.value.status === EAnswerKey.TeacherAutomaticInput,
)

const isEvaluationCancelled = computed(
  () => props.evaluationDetails?.status === StatusEnum['0'].value,
)

const isEvaluationFinished = computed(
  () => props.evaluationDetails?.status === StatusEnum['4'].value,
)

const canEditAnswerKey = computed(
  () => props.evaluationDetails?.status === StatusEnum['3'].value,
)

const currentAlert = computed(() => {
  if (isDigitalEvaluation.value) {
    return {
      variant: 'success',
      class: '',
      messageClass: '',
      icon: 'check_circle',
      message:
        'Este aluno finalizou a avaliação de forma digital, seu gabarito foi gerado automaticamente.',
      showEditLink: false,
    }
  }

  if (isTeacherInput.value || isTeacherAutomaticInput.value) {
    return {
      variant: 'primary',
      class: 'text-center p-1',
      messageClass: 'font-bold',
      icon: 'check_circle',
      message: `Este aluno finalizou a avaliação de forma off-line, seu gabarito foi ${
        isTeacherInput.value ? 'incluído pelo professor.' : 'lido automaticamente.'
      }`,
      showEditLink: canEditAnswerKey.value,
    }
  }

  return null
})

const evaluationStatusMessage = computed(() => {
  if (isEvaluationCancelled.value) {
    return 'Esta avaliação foi cancelada, os gabaritos não podem mais ser alterados.'
  }

  if (isEvaluationFinished.value) {
    return 'Esta avaliação já foi finalizada, os gabaritos não podem mais ser alterados.'
  }

  return null
})

// Methods
const getSubjectIcon = subjectId => {
  return SUBJECT_ICONS[subjectId] || MissionMath
}

const handleCloseModal = () => {
  emit('input', false)
  emit('close')
}

const handleTestChange = test => {
  if (!test || test.id === selectedTest.value.id) return

  selectedTest.value = test
  fetchQuestions()
}

const handleOpenAnswerKey = () => {
  if (!props.student?.id) return

  router.push({
    name: 'evaluationsAnswerTeacherStudentAnswers',
    params: {
      studentId: props.student.id,
    },
  })
}

const resetState = () => {
  testList.value = []
  selectedTest.value = {}
  questionList.value = {}
  loadingTests.value = false
  loadingQuestions.value = false
  error.value = null
}

const fetchTests = async () => {
  if (!props.student?.id || !classe.value?.ClassId) {
    return
  }

  loadingTests.value = true
  error.value = null

  try {
    const { data } = await getEvaluationTestsLabel(evaluationId.value, {
      ClassId: classe.value.ClassId,
      studentId: props.student.id,
    })

    testList.value = data || []

    if (data?.[0]) {
      handleTestChange(data[0])
    }
  } catch (err) {
    error.value = 'Erro ao carregar as provas'
  } finally {
    loadingTests.value = false
  }
}

const fetchQuestions = async () => {
  if (!props.student?.id || !selectedTest.value?.id || !classe.value?.ClassId) {
    return
  }

  loadingQuestions.value = true
  error.value = null

  try {
    const { data } = await getEvaluationAnswerKeyStudentQuestions(
      evaluationId.value,
      props.student.id,
      {
        ClassId: classe.value.ClassId,
        TestId: selectedTest.value.id,
      },
    )

    questionList.value = data || {}
  } catch (err) {
    error.value = 'Erro ao carregar as questões'
  } finally {
    loadingQuestions.value = false
  }
}

// Watchers
watch(
  () => props.value,
  newValue => {
    if (newValue) {
      resetState()
      fetchTests()
    } else {
      resetState()
    }
  },
  { immediate: false },
)

// Expose for template
</script>

<style lang="scss" scoped></style>