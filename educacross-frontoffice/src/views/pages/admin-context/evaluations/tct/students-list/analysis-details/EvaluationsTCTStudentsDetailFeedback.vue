<template>
  <section>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card no-body="">
          <b-skeleton-table :rows="2" :columns="5"></b-skeleton-table>
        </b-card>
      </template>
      <b-card no-body>
        <b-table :fields="tableFields" :items="items" responsive>
          <template v-slot:thead-top>
            <b-tr>
              <b-th :colspan="tableFields.length">
                <span>GABARITO DO ALUNO</span>
              </b-th>
            </b-tr>
          </template>
          <template #head()="{ label }">
            <span
              class="text-primary underline cursor-pointer font-normal"
              @click="openQuestionModal(label)"
              >{{ label }}</span
            >
          </template>
          <template #cell()="{ value }">
            <QuestionStatus :status="value" />
          </template>
        </b-table>
      </b-card>
    </b-skeleton-wrapper>
    <QuestionDetail
      v-if="filter.educationalOrganization"
      v-model="openModal"
      :question-id="questionId"
      :ids-questions="idsQuestions"
      :total="data.length"
      :evaluation-id="evaluationId"
      :class-id="classId"
      :subject-id="subjectId"
      :educational-organization-id="filter.educationalOrganization.id"
      :matriz="filter.educationalOrganization.name"
      :institution-id="institutionId"
      hit-answered-card-title="Dos respondentes na turma"
      hit-answered-card-tooltip-text="A exibição das questões está relacionada ao modelo da prova, por isso esta questão pode não ter sido proposta a todos alunos."
    />
  </section>
</template>

<script setup>
  import QuestionDetail from '@/components/evaluations/questionDetailV2/QuestionDetail.vue'
  import QuestionStatus from '@/components/question/QuestionStatus.vue'
  import router from '@/router'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import { computed, ref } from 'vue'

  const props = defineProps({
    filter: {
      type: Object,
      default: () => ({
        educationalOrganization: {
          id: null,
          name: null,
        },
        subjectId: null,
      }),
    },
  })

  const feedback = computed(() => store.getters['EvaluationTCTStudentsDetail/feedback'])
  const data = computed(() => feedback.value.questions || [])

  const items = computed(() => {
    const newItem = {}

    data.value.forEach(item => {
      newItem[`${item.id}`] = item.status
    })

    return [newItem]
  })

  const idsQuestions = computed(() => data.value.map(item => item.id))

  const tableFields = computed(() => {
    return data.value.map(item => {
      return {
        key: item.id,
        label: item.id,
      }
    })
  })

  const loading = computed(() => store.getters['EvaluationTCTStudentsDetail/loading'])

  const { classe } = useFilters()

  const classId = router.currentRoute.params.classId || classe.value.ClassId

  const subjectId = computed(() => store.getters['evaluations/subjectId'])

  const { evaluationId, institutionId } = router.currentRoute.params

  const openModal = ref(false)
  const questionId = ref(null)

  const openQuestionModal = question => {
    openModal.value = true
    questionId.value = Number(question)
  }
</script>
