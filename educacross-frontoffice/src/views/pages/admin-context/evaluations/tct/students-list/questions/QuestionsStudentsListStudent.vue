<template>
  <section id="QuestionsStudentsListStudent">
    <b-card>
      <p>Escolha o caderno de prova que deseja exibir:</p>
      <div class="d-flex gap-3">
        <b-skeleton-wrapper :loading="loadingTest">
          <template v-slot:loading>
            <div class="d-flex gap-3">
              <b-skeleton type="text" height="38px" width="150px" />
            </div>
          </template>
          <b-button
            v-for="test in tests"
            :key="test.id"
            :variant="selectedTest && selectedTest !== test.id ? 'outline-primary' : 'primary'"
            @click="selectTest(test.id)"
          >
            {{ test.name }}
          </b-button>
        </b-skeleton-wrapper>
      </div>
    </b-card>
    <ListTable
      id=""
      ref="listTable"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      :per-page-options="[25, 50, 100]"
      :per-page-default="25"
      @change="changeListTable"
    >
      <template #cell(studentName)="{ item }">
        <div
          v-if="item.studentId"
          class="text-md-nowrap d-flex align-items-center flex-wrap flex-md-nowrap gap-2"
        >
          <span
            v-b-tooltip.hover.top="`Detalhes do aluno`"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click="details(item.studentId)"
          >
            visibility
          </span>
          <span
            class="align-text-top underline text-primary cursor-pointer"
            @click="details(item.studentId)"
            >{{ item.studentName }}</span
          >
          <b-badge v-if="isNotStarded(item.questions)" pill variant="light-danger">
            Não iniciou
          </b-badge>
        </div>
      </template>

      <template #head(questions)="item">
        <div class="d-flex align-items-center">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top.html="
              `Este é um código de referência da questão e não está relacionado à ordem em que ela é exibida durante a avaliação.`
            "
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <template #cell(questions)="{ item }">
        <div class="d-flex d-flex-nowrap">
          <div
            v-for="(question, index) in item.questions"
            :key="`${item.studentId}-${index}-${question.questionId}`"
            class="question"
          >
            <QuestionStatus v-if="item.studentId" :status="question.status" />
            <div v-else>
              <span
                v-b-tooltip.hover.top="`Detalhes da questão`"
                class="underline text-primary cursor-pointer"
                @click="openQuestionModal(question.questionId)"
              >
                {{ question.questionId }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </ListTable>
    <b-card body-class="p-1 d-flex flex-wrap justify-content-center gap-4  legend">
      <div class="d-flex flex-nowrap align-items-center gap-1">
        <img src="@/assets/images/questionAnswerStatus/Right.svg" />
        <small>Resposta correta</small>
      </div>
      <div class="d-flex flex-nowrap align-items-center gap-1">
        <img src="@/assets/images/questionAnswerStatus/Incorrect.svg" />
        <small>Resposta incorreta</small>
      </div>
      <div class="d-flex flex-nowrap align-items-center gap-1">
        <img src="@/assets/images/questionAnswerStatus/Unanswered.svg" />
        <small>Não respondida</small>
      </div>
      <div class="d-flex flex-nowrap align-items-center gap-1">
        <img src="@/assets/images/questionAnswerStatus/Annulled.svg" />
        <small>Anulada</small>
      </div>
      <div class="d-flex flex-nowrap align-items-center gap-1">
        <img src="@/assets/images/questionAnswerStatus/Undisplayed.svg" />
        <small>Não exibida para esse aluno</small>
      </div>
    </b-card>
    <QuestionDetail
      v-if="filtersParams.EducationalOrganization"
      v-model="openModal"
      :question-id="questionId"
      :evaluation-id="evaluationId"
      :total="totalData"
      :ids-questions="idsQuestions"
      :class-id="classId"
      :subject-id="subject.id"
      :educational-organization-id="filtersParams.EducationalOrganization.id"
      :matriz="filtersParams.EducationalOrganization.name"
      hit-answered-card-title="Dos respondentes na turma"
      hit-answered-card-tooltip-text="A exibição das questões está relacionada ao modelo da prova, por isso esta questão pode não ter sido proposta a todos alunos."
    />
  </section>
</template>

<script setup>
import QuestionDetail from '@/components/evaluations/questionDetailV2/QuestionDetail.vue'
import QuestionStatus from '@/components/question/QuestionStatus.vue'
import ListTable from '@/components/table/ListTable.vue'
import { EQuestionAnswerStatus } from '@/consts/EQuestionAnswerStatus.js'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import {
  getEvaluationStudentsQuestions,
  getEvaluationTestsLabel,
} from '@/services/shared/evaluations/Evaluation.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import { onMounted, ref, watch } from 'vue'

// Props
const props = defineProps({
  filtersParams: {
    type: Object,
    required: true,
  },
})

const { subject, classe } = useFilters()
const loading = ref(true)
const loadingTest = ref(true)
const listTable = ref(null)

const dataTable = ref([])
const totalData = ref(0)
const idsQuestions = ref([])

const { evaluationId, institutionId } = router.currentRoute.params
const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const isTeacher = store.getters.accessRole === 'Teacher'

const classId = router.currentRoute.params.classId || classe.value.ClassId

const selectedTest = ref(null)
const tests = ref([])

const tableColumns = [
  {
    key: 'studentName',
    label: 'Aluno',
    stickyColumn: true,
    isRowHeader: true,
    sortable: true,
  },
  {
    key: 'testName',
    label: 'PROVA RESPONDIDA',
    sortable: true,
  },
  { key: 'questions', label: 'código da QUESTÃO', sortable: false, searchable: true },
]

const params = ref({
  Page: 1,
  pageSize: 25,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
  SubjectId: subject.value.id,
  EducationalOrganizationId: props.filtersParams.EducationalOrganization?.id,
  ClassId: classId,
  TestId: selectedTest.value,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
    EducationalOrganizationId: props.filtersParams.EducationalOrganization?.id,
    SubjectId: subject.value.id,
    ClassId: classId,
    TestId: selectedTest.value,
  }

  fetchData()
}

const fetchData = () => {
  loading.value = true

  getEvaluationStudentsQuestions(evaluationId, params.value)
    .then(({ data }) => {
      dataTable.value = data.data
      dataTable.value.unshift({
        studentName: '',
        testName: '',
        _rowVariant: 'rowBackground',
        questions: data.data[0].questions,
      })
      totalData.value = data.total
    })
    .finally(() => {
      getQuestionsIds()
      loading.value = false
    })
}

const getQuestionsIds = () => {
  const body = { ...params.value, pageSize: totalData.value }
  getEvaluationStudentsQuestions(evaluationId, body).then(({ data }) => {
    idsQuestions.value = data.data.map(item => item.questionId)
  })
}

watch([() => props.filtersParams], () => {
  if (params.value.SubjectId !== subject.value.id) {
    getEvaluationTests()
  }
  prepareFetchData()
})

onMounted(() => {
  prepareFetchData()
})

const prepareFetchData = () => {
  params.value.SubjectId = subject.value.id
  params.value.EducationalOrganizationId = props.filtersParams.EducationalOrganization?.id
  params.value.TestId = selectedTest.value
  params.value.Page = 1
  listTable.value.resetPage()
  fetchData()
}

onMounted(() => {
  getEvaluationTests()
})

const getEvaluationTests = () => {
  loadingTest.value = true
  tests.value = []
  selectedTest.value = null
  getEvaluationTestsLabel(evaluationId, {
    SubjectId: subject.value.id,
    ClassId: classId,
  })
    .then(({ data }) => {
      tests.value = data
    })
    .finally(() => {
      loadingTest.value = false
    })
}

const selectTest = testId => {
  selectedTest.value = selectedTest.value === testId ? null : testId
  prepareFetchData()
}

const isNotStarded = questions => {
  return !questions.some(
    question =>
      question.status === EQuestionAnswerStatus.Incorrect ||
      question.status === EQuestionAnswerStatus.Right,
  )
}

const details = studentId => {
  if (isTeacher) {
    router.push({
      name: 'evaluationsTCTStudentsQuestionsDetailsTeacher',
      params: {
        studentId,
      },
    })
  } else {
    router.push({
      name: isNetworkManager
        ? 'evaluationsTCTInstutionsStudentsQuestionsDetails'
        : 'evaluationsTCTStudentsQuestionsDetails',
      params: {
        evaluationId,
        institutionId,
        classId,
        studentId,
      },
    })
  }
}
const openModal = ref(false)
const questionId = ref(null)

const openQuestionModal = question => {
  openModal.value = true
  questionId.value = question
}
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }

  .question {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .legend img {
    width: 10px;
    height: 10px;
  }
</style>

<style lang="scss">
  #QuestionsStudentsListStudent {
    .table-responsive > .table.b-table > thead > tr > .b-table-sticky-column {
      position: sticky !important;
    }

    .table.b-table > tbody > tr > .table-b-table-default {
      background: #fff;
    }
  }
</style>