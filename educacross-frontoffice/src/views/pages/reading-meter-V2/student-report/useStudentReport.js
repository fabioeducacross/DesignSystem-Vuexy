import { useRoute, useRouter } from 'vue-router/composables'
import {
  reapplyStudentEvaluation,
  changeStudentProficiency,
  getReadingEvaluationStudentDetail,
  getTestLabelsFluencyEvaluation,
  getReadingEvaluationDetail,
  fetchReadingsEvaluationProficiency,
  fetchStudentsLabel,
  auditFluencyTest,
} from '@/services/shared/readingFluencyEvaluation/readingFluencyEvaluation.service.js'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification/composition'

const moduleName = 'ReadingMeterV2Module'

export function useStudentReport() {
  const toast = useToast()
  const route = useRoute()
  const router = useRouter()

  const studentId = computed(() => route.params.studentId)
  const evaluationId = computed(() => route.params.evaluationId)
  const classId = computed(() => route.params.classId)
  const institutionId = computed(() => route.params.institutionId)
  const isAuditor = computed(() => store.getters.accessRole === 'Auditor')

  const isLoading = computed({
    get() {
      return store.getters[`${moduleName}/loading`]
    },
    set(value) {
      store.commit(`${moduleName}/loading`, value)
    },
  })

  const editMode = computed({
    get() {
      return store.getters[`${moduleName}/editMode`]
    },
    set(value) {
      store.commit(`${moduleName}/editMode`, value)
    },
  })

  const proficiencyIndicators = computed({
    get() {
      return store.getters[`${moduleName}/proficiencyIndicators`]
    },
    set(value) {
      store.commit(`${moduleName}/proficiencyIndicators`, value)
    },
  })

  const isLoadingReport = computed({
    get() {
      return store.getters[`${moduleName}/loadingReport`]
    },
    set(value) {
      store.commit(`${moduleName}/loadingReport`, value)
    },
  })

  const typeTest = computed({
    get() {
      return store.getters[`${moduleName}/typeTest`]
    },
    set(value) {
      store.commit(`${moduleName}/typeTest`, value)
    },
  })

  const readingsTest = computed({
    get() {
      return store.getters[`${moduleName}/readingsTest`]
    },
    set(value) {
      store.commit(`${moduleName}/readingsTest`, value)
    },
  })

  const readingDetail = computed({
    get() {
      return store.getters[`${moduleName}/readingDetail`]
    },
    set(value) {
      store.commit(`${moduleName}/readingDetail`, value)
    },
  })

  const getEvaluationDetails = async () => {
    const response = await getReadingEvaluationDetail(evaluationId.value, {
      ClassId: classId.value,
      institutionId: institutionId.value,
      studentId: studentId.value,
    })
    readingDetail.value = {
      ...readingDetail.value,
      evaluationDetailing: response.data,
    }
    return response.data
  }

  const getProficiencyLabel = async () => {
    const proficiency = await fetchReadingsEvaluationProficiency()
    const { indicators } = proficiency.data.find(
      item => item.serieId === readingDetail.value.evaluationDetailing.serieId,
    )
    readingDetail.value = {
      ...readingDetail.value,
      indicators,
    }
    proficiencyIndicators.value = proficiency.data
    return proficiency.data
  }

  const putAuditFluencyTest = async data => {
    isLoadingReport.value = true

    const response = await auditFluencyTest(evaluationId.value, studentId.value, {
      ...data,
      ClassId: classId.value,
      readingFluencyTestId: typeTest.value.id,
    })
    if (response.status === 200) {
      toast({
        component: Toast,
        props: {
          title: 'Relatório auditado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      isLoading.value = true
      await getReadingFluency()
      isLoading.value = false
    }

    isLoadingReport.value = false
    return response.data
  }

  const getReadingsTest = async () => {
    const response = await getTestLabelsFluencyEvaluation(evaluationId.value, {
      ClassId: classId.value,
      studentId: studentId.value,
    })

    readingsTest.value = response.data.map(reading => ({
      types: [reading.type],
      id: reading.id,
      name: reading.name,
    }))

    return response.data
  }

  const reapplyEvaluation = async () => {
    isLoadingReport.value = true

    const body = {
      readingFluencyTestId: typeTest.value.id,
      studentId: studentId.value,
      classId: classId.value,
    }

    await reapplyStudentEvaluation(evaluationId.value, body)
      .then(response => {
        if (response.status === 200) {
          toast({
            component: Toast,
            props: {
              title: 'Teste reaplicado com sucesso!',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        }
        return response
      })
      .finally(() => {
        isLoadingReport.value = false
      })
  }

  const getReadingFluency = async () => {
    const response = await getReadingEvaluationStudentDetail(evaluationId.value, studentId.value, {
      readingFluencyTestId: typeTest.value.id,
      classId: classId.value,
    })

    readingDetail.value = {
      ...readingDetail.value,
      report: response.data,
    }
  }

  const getStudentsLabel = async () => {
    if (!isAuditor.value) return
    const response = await fetchStudentsLabel(evaluationId.value)

    const studentsLabels = response.data
    const index = studentsLabels.findIndex(
      student => student.id.toString() === studentId.value.toString(),
    )
    const [activeStudent] = studentsLabels.splice(index, 1)
    studentsLabels.unshift(activeStudent)

    readingDetail.value = {
      ...readingDetail.value,
      studentsQueue: studentsLabels,
    }

    return response.data
  }

  const changeProficiency = async data => {
    const body = {
      readingFluencyTestId: typeTest.value.id,
      classId: classId.value,
      studentId: studentId.value,
      proficiency: data,
    }
    const response = await changeStudentProficiency(evaluationId.value, body.studentId, body)
    if (response.status === 200) {
      toast({
        component: Toast,
        props: {
          title: 'Proficiência alterada com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
    }
  }

  const loadInitialData = async () => {
    isLoading.value = true
    isLoadingReport.value = true
    store.commit(`${moduleName}/reset`)

    try {
      await getReadingsTest()
      if (!isAuditor.value && readingsTest.value.length > 1) {
        readingsTest.value.unshift({ name: 'Todos os testes', id: null, types: [1, 2] })
      }

      typeTest.value = {
        types:
          isAuditor.value || readingsTest.value.length <= 1
            ? [readingsTest.value[0].types[0]]
            : [1, 2],
        id: readingsTest.value[0].id,
        name: readingsTest.value[0].name,
      }

      await Promise.all([getEvaluationDetails(), getReadingFluency(), getStudentsLabel()])
      await getProficiencyLabel()
    } catch (error) {
      toast({
        component: Toast,
        props: {
          title: 'Erro ao carregar dados do relatório.',
          icon: 'AlertCircleIcon',
          variant: 'danger',
        },
      })
    } finally {
      isLoadingReport.value = false
      isLoading.value = false
    }
  }

  return {
    typeTest,
    readingDetail,
    editMode,
    isLoadingReport,
    getStudentsLabel,
    putAuditFluencyTest,
    getReadingsTest,
    getReadingFluency,
    changeProficiency,
    getEvaluationDetails,
    getProficiencyLabel,
    reapplyEvaluation,
    readingsTest,
    isLoading,
    loadInitialData,
  }
}