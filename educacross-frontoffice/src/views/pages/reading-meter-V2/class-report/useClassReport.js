import { useRoute, useRouter } from 'vue-router/composables'
import {
  getReadingEvaluationDetail,
  getReadingEvaluationClasses,
  getProficiency,
  getTestLabelsFluencyEvaluation,
} from '@/services/shared/readingFluencyEvaluation/readingFluencyEvaluation.service.js'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification/composition'

const moduleName = 'ReadingMeterV2Module'

export function useClassReport() {
  const toast = useToast()
  const route = useRoute()
  const router = useRouter()

  const isLoading = ref(false)
  const error = ref(null)
  const selectedEvaluation = ref(route.params.evaluationId || null)

  const updateFromRoute = () => {
    selectedEvaluation.value = route.params.evaluationId || null
    getInstitutionId.value = route.params.institutionId || null
  }

  // Computed properties for store state
  const readingFluencyEvaluation = computed({
    get() {
      return store.getters[`${moduleName}/readingFluencyEvaluation`]
    },
    set(value) {
      store.commit(`${moduleName}/readingFluencyEvaluation`, value)
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

  const loading = computed({
    get() {
      return store.getters[`${moduleName}/loading`]
    },
    set(value) {
      store.commit(`${moduleName}/loading`, value)
    },
  })

  const loadingReport = computed({
    get() {
      return store.getters[`${moduleName}/loadingReport`]
    },
    set(value) {
      store.commit(`${moduleName}/loadingReport`, value)
    },
  })

  const pagination = computed({
    get() {
      return store.getters[`${moduleName}/pagination`]
    },
    set(value) {
      store.commit(`${moduleName}/pagination`, value)
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

  const statusFilter = computed({
    get() {
      return store.getters[`${moduleName}/status`]
    },
    set(value) {
      store.commit(`${moduleName}/status`, value)
    },
  })

  const proficiencyFilter = computed({
    get() {
      return store.getters[`${moduleName}/proficiency`]
    },
    set(value) {
      store.commit(`${moduleName}/proficiency`, value)
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

  const test = computed({
    get() {
      return store.getters[`${moduleName}/test`]
    },
    set(value) {
      store.commit(`${moduleName}/test`, value)
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

  const getInstitutionId = ref(route.params.institutionId || null)

  const loadEvaluationDetails = async () => {
    try {
      loadingReport.value = true
      const { data } = await getReadingEvaluationDetail(selectedEvaluation.value, {
        InstitutionId: getInstitutionId.value,
      })
      readingFluencyEvaluation.value = data
    } catch (err) {
      error.value = err
      toast({
        component: Toast,
        props: {
          title: 'Erro ao buscar detalhes da avaliação',
          text: 'Não foi possível carregar os detalhes da avaliação. Tente novamente.',
          icon: 'AlertCircleIcon',
          variant: 'danger',
        },
      })
    } finally {
      loadingReport.value = false
    }
  }

  const loadClassesData = async () => {
    try {
      loading.value = true
      const { data } = await getReadingEvaluationClasses(selectedEvaluation.value, {
        InstitutionId: getInstitutionId.value,
        ReadingFluencyTestId: test.value.id,
      })

      const mappedClasses = (data.classes || []).map(classItem => ({
        ...classItem,
        proficient: classItem.adequate,
        advenced: classItem.advanced,
        studentsProficient: classItem.studentsAdequate,
        studentsAdvenced: classItem.studentsAdvenced,
      }))

      students.value = mappedClasses

      const currentEvaluationData = readingFluencyEvaluation.value || {}

      if (data.proficiencies) {
        const totalStudents = data.proficiencies.reduce(
          (sum, item) => sum + (item.students || 0),
          0,
        )

        readingFluencyEvaluation.value = {
          ...currentEvaluationData,
          proficiencies: data.proficiencies,
          totalStudents,
        }
      }
    } catch (err) {
      error.value = err
      students.value = []
      pagination.value = { totalData: 0 }
      toast({
        component: Toast,
        props: {
          title: 'Erro ao buscar turmas',
          text: 'Não foi possível carregar as turmas. Tente novamente.',
          icon: 'AlertCircleIcon',
          variant: 'danger',
        },
      })
    } finally {
      loadProficiency()
      loading.value = false
    }
  }

  const loadProficiency = async () => {
    try {
      const { data } = await getProficiency()
      proficiencyIndicators.value = data
    } catch (err) {
      proficiencyIndicators.value = []
    }
  }

  const getTestLabels = async () => {
    try {
      const paramsObj = {}
      const { data } = await getTestLabelsFluencyEvaluation(selectedEvaluation.value, paramsObj)
      testOptions.value = [{ name: 'Todos os testes', id: null, icons: [] }, ...data] || []
      test.value = testOptions.value[0]
    } catch (err) {
      error.value = err.message || 'Erro ao carregar detalhes do teste'
    }
  }

  const openClassReport = id => {
    const role = store.getters.accessUserData?.Role
    if (role === 'NetworkManager') {
      router.push({
        name: 'NetworkManagerFluencyV2Students',
        params: {
          classId: id,
        },
      })
      return
    }

    router.push({
      name: 'AdminFluencyV2Students',
      params: {
        classId: id,
      },
    })
  }

  updateFromRoute()

  return {
    // State
    isLoading,
    error,
    selectedEvaluation,

    // Computed properties
    readingFluencyEvaluation,
    students,
    loading,
    loadingReport,
    pagination,
    params,
    statusFilter,
    proficiencyFilter,
    test,
    testOptions,

    // Methods
    loadEvaluationDetails,
    loadClassesData,
    openClassReport,
    updateFromRoute,
    loadProficiency,
    proficiencyIndicators,
    getTestLabels,
    getInstitutionId,
  }
}

export default useClassReport