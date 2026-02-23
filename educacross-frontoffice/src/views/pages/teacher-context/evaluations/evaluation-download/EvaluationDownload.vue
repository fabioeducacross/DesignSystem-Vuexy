<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import router from '@/router'
import { getEvaluationInfoToDownloadV2 } from '@/services/shared/evaluations/Evaluation.Service'
import EvaluationAnswerSheet from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationAnswerSheet.vue'
import EvaluationCover from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationCover.vue'
import EvaluationQuestion from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationQuestion.vue'
import EvaluationSectionCover from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationSectionCover.vue'
import { ref, computed } from 'vue'

const refPdfViewer = ref(null)
const pdfUrl = ref('')
const isLoading = ref(true)
const error = ref(null)

// 90 19872
const { id, classId } = router.currentRoute.query
/** @type {import('vue').Ref<Course>} */
const evaluation = ref({
  students: [],
})

const fetchData = async () => {
  try {
    const response = await getEvaluationInfoToDownloadV2(id, classId)
    evaluation.value = response.data
  } catch (err) {
    error.value = err?.message || 'Erro ao carregar avaliação.'
  } finally {
    isLoading.value = false
  }
}

fetchData()

const evaluationSubjects = computed(() => {
  return evaluation.value?.students[0]?.tests.map(test => {
    return test.subjectId
  })
})

const evaluationName = computed(() => {
  return evaluation.value?.name || 'Avaliação'
})

const printPDF = () => {
  window.print()
}
</script>

<template>
  <section>
    <b-navbar variant="white" class="d-flex justify-content-between d-print-none mb-1">
      <b-navbar-nav>
        <b-button size="sm" variant="white" class="border" @click="$router.go(-1)">
          <span class="material-symbols-outlined align-middle" style="font-size: 1rem"
            >arrow_back</span
          >
        </b-button>
        <b-nav-item>
          <div class="d-flex gap-1">
            <subjects
              v-for="subjectId in evaluationSubjects"
              :key="`subject-${subjectId}`"
              :subject-id="subjectId"
              :size="21"
            />
          </div>
        </b-nav-item>
        <b-nav-item>{{ evaluationName }}</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-button variant="primary" size="sm" @click="printPDF">
          <span class="material-symbols-outlined align-middle" style="font-size: 1rem">print</span>
          <span class="d-none d-md-inline align-middle"> Imprimir</span>
        </b-button>
      </b-navbar-nav>
    </b-navbar>
    <!--    PDF Content-->

    <div>
      <div v-if="isLoading" class="text-center py-5">
        <b-spinner variant="primary" label="Loading..."></b-spinner>
        <p>Carregando PDF...</p>
      </div>
      <div v-else-if="error" class="text-center py-5 text-danger">
        {{ error }}
      </div>
      <div v-for="student in evaluation.students" :key="`student-${student.id}`">
        <div v-for="(test, index) in student.tests" :key="`${student.id}-test-${index}`">
          <div class="page">
            <EvaluationCover
              :evaluation-name="evaluation.name"
              :evaluation-subjects="evaluation.subjectsIds"
              :class-name="student.className"
              :class-series="student.serieName"
              :end-date="evaluation.endDate"
              :start-date="evaluation.startDate"
              :school-name="student.institutionName"
              :test-book-number="test.notebook"
              :student-name="student.name"
              :school-logo="evaluation.logoUrl"
            />
          </div>
          <div class="page">
            <EvaluationAnswerSheet
              :evaluation-name="evaluation.name"
              :evaluation-subjects="evaluation.subjectsIds"
              :class-name="student.className"
              :class-series="student.serieName"
              :end-date="evaluation.endDate"
              :start-date="evaluation.startDate"
              :school-name="student.institutionName"
              :test-book-number="test.notebook"
              :student-name="student.name"
              :school-logo="evaluation.logoUrl"
              :tests="student.tests"
              :student-id="student.id"
            />
          </div>
          <div class="page">
            <EvaluationSectionCover :block-index="index + 1" :block-name="test.subjectName" />
          </div>
          <div class="page">
            <EvaluationQuestion
              v-for="(question, questionIndex) in test.questions"
              :key="`${student.id}-test-${index}-${question.id}`"
              :question="question"
              :question-number="questionIndex + 1"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
  b-navbar {
    display: none;

    .d-print-none {
      display: none !important;
    }
  }

  .page {
    padding: 2.5rem;
    background-color: #fff;
    width: fit-content;
    height: fit-content;
  }

  @media print {
    .page {
      padding: 0;
    }

    @page {
      size: 46.75rem 66.125rem !important;
      width: 46.75rem;
      height: 66.125rem;
      padding: 2.5rem;
      margin: 0;

      /* Set margins to provide space for the header and footer */
      /*@top-left {
        content: 'Ariel da Silva Santos';
        font-size: 10pt;
        border-bottom: 1px solid #ccc;
        width: 100%;
        padding-bottom: 5px;
      }

      @top-right {
        content: 'Turma 5º A - Manhã • 5º ano';
        font-size: 10pt;
        border-bottom: 1px solid #ccc;
        width: 100%;
        padding-bottom: 5px;
        text-align: right;
      }

      @bottom-left {
        content: 'Avaliação Diagnóstica Inicial • CADERNO B • LÍNGUA PORTUGUESA';
        font-size: 10pt;
        border-top: 1px solid #ccc;
        width: 100%;
        padding-top: 5px;
      }

      @bottom-right {
        content: counter(page);
        font-size: 10pt;
        border-top: 1px solid #ccc;
        width: 100%;
        padding-top: 5px;
        text-align: right;
      }*/
    }
  }
</style>