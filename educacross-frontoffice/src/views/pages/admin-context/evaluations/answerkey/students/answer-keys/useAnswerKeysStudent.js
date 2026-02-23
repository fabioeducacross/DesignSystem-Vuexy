import { emitter } from '@/eventBus'
import {
  getEvaluationAnswerKey,
  getEvaluationAnswerKeyStudentQuestions,
  getEvaluationTestsLabel,
  postEvaluationAnswerKeyStudentQuestions,
} from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { cloneDeep } from 'lodash'
import objectHash from 'object-hash'
import { computed, ref, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const EAnswerKey = {
  None: 0,
  EvaluationDigital: 1,
  TeacherInput: 2,
  TeacherAutomaticInput: 3,
}

export function useAnswerKeysStudent() {
  const students = ref([])
  const loading = ref(true)
  const loadingStudents = ref(true)
  const currentStudentIndex = ref(0)
  const originalStudentAnswers = ref(null)
  const newStudentAnswers = ref(null)
  const evaluationId = ref(null)
  const studentId = ref(null)
  const knowledgeArea = ref(null)
  const answerKeysDisabled = ref(true)
  const knowledgeAreas = ref([])
  const savingChanges = ref(false)
  const currentStudent = ref(null)

  const route = useRoute()
  const router = useRouter()
  const vm = getCurrentInstance()?.proxy

  const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])
  const { classe } = useFilters()

  const resetState = () => {
    students.value = []
    loading.value = true
    loadingStudents.value = true
    currentStudentIndex.value = 0
    originalStudentAnswers.value = null
    newStudentAnswers.value = null
    evaluationId.value = null
    studentId.value = null
    knowledgeArea.value = null
    answerKeysDisabled.value = true
    knowledgeAreas.value = []
    savingChanges.value = false
    currentStudent.value = null
  }

  const anyChangeWasMade = computed(() => {
    if (!originalStudentAnswers.value || !newStudentAnswers.value) {
      emitter.emit('showConfirmExit', false)
      return false
    }
    const originalQuestionsHash = objectHash(originalStudentAnswers.value.questions)
    const newQuestionsHash = objectHash(newStudentAnswers.value.questions)
    const res = originalQuestionsHash !== newQuestionsHash
    emitter.emit('showConfirmExit', res)
    return res
  })

  const combinedStatus = computed(() => {
    const status = originalStudentAnswers.value?.status
    const questions = originalStudentAnswers.value?.questions || []

    const digitalAnswerQtd = questions.reduce(
      (acc, q) => acc + (q.answerKey === EAnswerKey.EvaluationDigital ? 1 : 0),
      0,
    )
    const teacherAnswerQtd = questions.reduce(
      (acc, q) => acc + (q.answerKey === EAnswerKey.TeacherInput ? 1 : 0),
      0,
    )
    const studentAnswerQtd = questions.reduce(
      (acc, q) => acc + (q.answerKey === EAnswerKey.TeacherAutomaticInput ? 1 : 0),
      0,
    )
    let notAnsweredQtd = digitalAnswerQtd + teacherAnswerQtd + studentAnswerQtd - questions.length
    if (notAnsweredQtd < 0) {
      notAnsweredQtd *= -1
    }

    if (status === EAnswerKey.EvaluationDigital && digitalAnswerQtd === questions.length) {
      return {
        text: 'Este aluno já finalizou a avaliação de forma digital, seu gabarito não pode mais ser alterado.',
        icon: 'check_circle',
        variant: 'success',
        canEdit: false,
      }
    }

    if (status === EAnswerKey.EvaluationDigital && (notAnsweredQtd > 0 || teacherAnswerQtd > 0)) {
      return {
        text: 'Este aluno já iniciou a avaliação de forma digital, algumas questões não podem ser modificadas.',
        icon: 'report',
        variant: 'danger',
        canEdit: true,
      }
    }

    if (status === EAnswerKey.TeacherInput) {
      return {
        text: 'Este aluno finalizou a avaliação de forma off-line, seu gabarito foi incluído pelo professor.',
        icon: 'check_circle',
        variant: 'primary',
        canEdit: true,
      }
    }

    if (status === EAnswerKey.None && notAnsweredQtd === questions.length) {
      return {
        text: 'O aluno deve concluir a prova de forma digital ou o professor deve inserir o gabarito manualmente.',
        secondText:
          'Atenção: a inclusão manual será bloqueada assim que o período da Avaliação terminar. ',
        icon: 'report',
        variant: 'danger',
        canEdit: true,
      }
    }

    if (status === EAnswerKey.TeacherAutomaticInput) {
      return {
        text: 'Este aluno finalizou a avaliação de forma off-line, seu gabarito foi lido automaticamente.',
        icon: 'check_circle',
        variant: 'primary',
        canEdit: false,
      }
    }

    return null
  })

  const cancelChanges = (byPass = false) => {
    const callback = () => {
      cancelChanges(true)
    }
    if (!byPass && anyChangeWasMade.value) {
      emitter.emit('manualShowConfirmExit', callback)
      return
    }
    newStudentAnswers.value = cloneDeep(originalStudentAnswers.value)
    answerKeysDisabled.value = true
  }

  const getStudents = async () => {
    try {
      const { data } = await getEvaluationAnswerKey(evaluationId.value, {
        classId: classe.value.ClassId,
      })
      students.value = data || []
    } catch (_err) {
      students.value = []
    } finally {
      loadingStudents.value = false
    }
  }

  const getEvaluationLabels = async () => {
    const { data } = await getEvaluationTestsLabel(evaluationId.value, {
      ClassId: classe.value.ClassId,
      studentId: studentId.value,
    })
    knowledgeAreas.value = data
    knowledgeArea.value = data[0]
  }

  const getStudentDetails = async () => {
    try {
      loading.value = true
      let { data } = await getEvaluationAnswerKeyStudentQuestions(
        evaluationId.value,
        currentStudent.value.id,
        {
          classId: classe.value.ClassId,
          testId: knowledgeArea.value.id,
        },
      )
      data = data || {}
      data.questions = data?.questions || []
      data.questions = data.questions.map(q => {
        if (q.alternative === null || q.alternative === undefined) {
          q.alternative = 0
        }
        return q
      })

      originalStudentAnswers.value = data
      newStudentAnswers.value = cloneDeep(data)

      const breadcrumb = [
        '',
        store.getters['evaluations/evaluationName'],
        'Gabaritos',
        originalStudentAnswers.value.name,
      ]

      emitter.emit('setBreadcrumb', breadcrumb)
    } finally {
      loading.value = false
    }
  }

  /**
   * @param {'next' | 'previous'} action
   * @param {Boolean} bypass - If true, it will bypass the confirmation dialog
   */
  const changeStudent = async (action, bypass = false) => {
    if (anyChangeWasMade.value && !bypass) {
      const callback = () => {
        changeStudent(action, true)
      }
      emitter.emit('manualShowConfirmExit', callback)
      return
    }
    if (action === 'next') {
      currentStudentIndex.value = (currentStudentIndex.value + 1) % students.value.length
    } else if (action === 'previous') {
      currentStudentIndex.value =
        (currentStudentIndex.value - 1 + students.value.length) % students.value.length
    }
    currentStudent.value = cloneDeep(students.value[currentStudentIndex.value])
    router.replace({
      name: 'evaluationsAnswerTeacherStudentAnswers',
      params: {
        evaluationId: route.value.params.evaluationId,
        studentId: currentStudent.value.id,
      },
    })
    if (currentStudent.value) {
      loading.value = true
      await getStudentDetails(currentStudent.value.id)
      loading.value = false
    }
  }

  const enableAnswerKeyEdit = () => {
    answerKeysDisabled.value = false
  }

  const onCreate = async () => {
    await store.dispatch('evaluations/setEvaluationData', {
      evaluationId: evaluationId.value,
      classId: classe.value.ClassId,
    })
    await getEvaluationLabels()
    await getStudents()
    currentStudentIndex.value = students.value.findIndex(s => s.id === studentId.value)
    currentStudent.value = cloneDeep(students.value[currentStudentIndex.value])
    await getStudentDetails(currentStudent.value?.id)
    loading.value = false
  }

  const saveChanges = () => {
    let questions = newStudentAnswers.value.questions
    const originalQuestions = originalStudentAnswers.value.questions

    questions = questions.filter(q => {
      const originalQuestion = originalQuestions.find(oq => oq.id === q.id)
      return (
        originalQuestion &&
        (q.alternative !== originalQuestion.alternative ||
          q.answerKey !== originalQuestion.answerKey)
      )
    })

    questions = questions.map(q => {
      if (!q.alternative) {
        return {
          id: q.id,
        }
      }
      return {
        id: q.id,
        alternative: q.alternative,
      }
    })

    const params = {
      classId: classe.value.ClassId,
      testId: knowledgeArea.value.id,
      question: questions,
    }

    savingChanges.value = true

    postEvaluationAnswerKeyStudentQuestions(evaluationId.value, studentId.value, params)
      .then(async () => {
        vm.$toast({
          component: Toast,
          props: {
            title: 'Gabarito atualizado com sucesso',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })
        answerKeysDisabled.value = true
        await getStudentDetails()
      })
      .finally(() => {
        savingChanges.value = false
        emitter.emit('showConfirmExit', false)
      })
  }

  return {
    evaluationId,
    studentId,
    students,
    knowledgeArea,
    loading,
    loadingStudents,
    currentStudentIndex,
    originalStudentAnswers,
    newStudentAnswers,
    currentStudent,
    knowledgeAreas,
    answerKeysDisabled,
    anyChangeWasMade,
    evaluationDetails,
    savingChanges,
    combinedStatus,
    enableAnswerKeyEdit,
    changeStudent,
    getStudents,
    getStudentDetails,
    onCreate,
    cancelChanges,
    saveChanges,
    resetState,
  }
}