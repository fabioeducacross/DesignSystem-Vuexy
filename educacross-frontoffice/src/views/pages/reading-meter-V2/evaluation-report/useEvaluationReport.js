import { useRoute, useRouter } from 'vue-router/composables'
import {
  getStudents,
  getTestLabelsFluencyEvaluation,
  getReadingEvaluationDetail,
  reapplyStudentEvaluation,
  cancelStudentEvaluation,
  fetchEvaluationAudits,
  fetchInstitutionsFromEvaluation,
  assignAuditorToEvaluation,
  getProficiency,
} from '@/services/shared/readingFluencyEvaluation/readingFluencyEvaluation.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { ref, computed, reactive } from 'vue'
import { useToast } from 'vue-toastification/composition'

const moduleName = 'ReadingMeterV2Module'

export function useEvaluationReport() {
  const toast = useToast()
  const loadingAction = ref(false)
  const error = ref(null)
  const evaluationData = ref(null)
  const reportData = ref(null)
  const filters = reactive({
    studentId: null,
    classId: null,
    period: null,
    status: null,
  })

  const selectedView = ref('overview')
  const selectedStudent = ref(null)

  const route = useRoute()
  const router = useRouter()

  const selectedEvaluation = ref(route.params.evaluationId || null)
  const classe = useFilters().classe

  const updateFromRoute = () => {
    selectedEvaluation.value = route.params.evaluationId || null
  }

  const isLoading = computed({
    get() {
      return store.getters[`${moduleName}/loading`]
    },
    set(value) {
      store.commit(`${moduleName}/loading`, value)
    },
  })

  const readingsTestReport = computed({
    get() {
      return store.getters[`${moduleName}/readingsTestReport`]
    },
    set(value) {
      store.commit(`${moduleName}/readingsTestReport`, value)
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

  const totalData = computed({
    get() {
      return store.getters[`${moduleName}/totalData`]
    },
    set(value) {
      store.commit(`${moduleName}/totalData`, value)
    },
  })

  const params = computed({
    get() {
      return store.getters[`${moduleName}/params`]
    },
    set(value) {
      store.commit(`${moduleName}/setParams`, value)
    },
  })

  const auditorList = computed({
    get() {
      return store.getters[`${moduleName}/auditorList`]
    },
    set(value) {
      store.commit(`${moduleName}/auditorList`, value)
    },
  })

  const students = computed({
    get() {
      return store.getters[`${moduleName}/students`]
    },
    set(value) {
      store.commit(`${moduleName}/students`, value)
    },
  })

  const test = computed({
    get() {
      return store.getters[`${moduleName}/test`]
    },
    set(value) {
      store.commit(`${moduleName}/test`, value)
    },
  })

  const proficiency = computed({
    get() {
      return store.getters[`${moduleName}/proficiency`]
    },
    set(value) {
      store.commit(`${moduleName}/setProficiency`, value)
    },
  })

  const readingFluencyEvaluation = computed({
    get() {
      return store.getters[`${moduleName}/readingFluencyEvaluation`]
    },
    set(value) {
      store.commit(`${moduleName}/readingFluencyEvaluation`, value)
    },
  })

  const testOptions = computed({
    get() {
      return store.getters[`${moduleName}/testOptions`]
    },
    set(value) {
      store.commit(`${moduleName}/testOptions`, value)
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

  const resetModule = () => {
    store.commit(`${moduleName}/reset`)
  }

  const getInstitutionId = ref(route.params.institutionId || null)

  const getReadingsTest = async () => {
    const response = await getTestLabelsFluencyEvaluation(selectedEvaluation.value, {})
    testOptions.value = [{ name: 'Todos os testes', id: null }, ...response.data] || []
    test.value = testOptions.value[0]
  }

  const getStudentData = async () => {
    isLoading.value = true

    students.value = []
    const body = {
      ClassId: classe.value.ClassId || route.params.classId,
      ReadingFluencyTestId: test.value?.id || null,
      Proficiency: proficiency.value?.id || null,
    }
    const response = await getStudents(selectedEvaluation.value, body)
    students.value = response.data.students || []
    readingsTestReport.value = {
      students: response.data.proficiencies.reduce((sum, currentItem) => {
        return sum + currentItem.students
      }, 0),
      proficiency: response.data.proficiencies || [],
    }
    isLoading.value = false
  }

  const getEvaluationAudits = async () => {
    isLoading.value = true
    const body = {
      ...params.value,
    }
    try {
      const response = await fetchEvaluationAudits(selectedEvaluation.value, body)
      totalData.value = response.data.total
      auditorList.value = response.data.data
      return response.data
    } finally {
      isLoading.value = false
    }
  }

  const changeListTable = async (
    { currentPage, perPage, sortBy, isSortDirDesc, searchQuery },
    callbackFunction,
  ) => {
    params.value = {
      Page: currentPage,
      PageSize: perPage,
      OrderBy: sortBy,
      Ascending: isSortDirDesc?.toString(),
      Search: searchQuery,
    }

    await callbackFunction()
  }

  const getEvaluationDetails = async () => {
    const response = await getReadingEvaluationDetail(selectedEvaluation.value, {
      ClassId: classe.value.ClassId || route.params.classId,
      InstitutionId: getInstitutionId.value,
    })
    readingFluencyEvaluation.value = response.data || {}
  }

  const loadProficiency = async () => {
    try {
      const { data } = await getProficiency()
      proficiencyIndicators.value = data
    } catch (err) {
      proficiencyIndicators.value = []
    }
  }

  const reapplyEvaluation = async item => {
    loadingAction.value = true
    const id = route.params.evaluationId

    try {
      const body = {
        readingFluencyTestId: test.value?.id || null,
        studentId: item.id,
        classId: classe.value.ClassId || route.params.classId,
      }

      const response = await reapplyStudentEvaluation(id, body)

      if (response.status === 200) {
        toast({
          component: Toast,
          props: {
            title: 'Teste reaplicado com sucesso!',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })

        await getStudentData()
      }
    } catch (error) {
      toast({
        component: Toast,
        props: {
          title: 'Erro ao reaplicar teste',
          text: 'Não foi possível reaplicar o teste. Tente novamente.',
          icon: 'AlertCircleIcon',
          variant: 'danger',
        },
      })
    } finally {
      loadingAction.value = false
    }
  }

  const assingAuditorToSchool = async params => {
    loadingAction.value = true

    try {
      const body = {
        auditorId: params.auditorId,
        institutionsIds: params.institutionsIds,
      }

      const response = await assignAuditorToEvaluation(selectedEvaluation.value, body)

      if (response.status === 200) {
        toast({
          component: Toast,
          props: {
            title: 'Vínculo realizado com sucesso!',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })
      }
    } catch (error) {
      toast({
        component: Toast,
        props: {
          title: 'Erro ao vincular auditor',
          text: 'Não foi possível vincular o auditor. Tente novamente.',
          icon: 'AlertCircleIcon',
          variant: 'danger',
        },
      })
    } finally {
      loadingAction.value = false
    }
  }

  const cancelEvaluation = async item => {
    loadingAction.value = true

    try {
      const body = {
        studentId: item.id,
        classId: classe.value.ClassId || route.params.classId,
      }

      const response = await cancelStudentEvaluation(route.params.evaluationId, body)

      if (response.status === 200) {
        toast({
          component: Toast,
          props: {
            title: 'Teste cancelado com sucesso!',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })

        await getStudentData()
      }
    } catch (error) {
      toast({
        component: Toast,
        props: {
          title: 'Erro ao cancelar teste',
          text: 'Não foi possível cancelar o teste. Tente novamente.',
          icon: 'AlertCircleIcon',
          variant: 'danger',
        },
      })
    } finally {
      loadingAction.value = false
    }
  }

  updateFromRoute()

  return {
    isLoading,
    loadingAction,
    error,
    evaluationData,
    reportData,
    totalData,
    filters,
    selectedView,
    selectedStudent,
    selectedEvaluation,
    readingFluencyEvaluation,
    changeListTable,

    readingsTestReport,
    students,
    readingsTest,
    proficiency,
    test,
    testOptions,
    proficiencyIndicators,
    resetModule,
    getStudentData,
    getEvaluationAudits,
    getReadingsTest,
    getEvaluationDetails,
    loadProficiency,
    updateFromRoute,
    reapplyEvaluation,
    cancelEvaluation,
    fetchInstitutionsFromEvaluation,
    assingAuditorToSchool,
  }
}

export default useEvaluationReport