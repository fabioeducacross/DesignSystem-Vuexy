import { useRoute, useRouter } from 'vue-router/composables'
import {
  getInstitutions,
  getReadingEvaluationDetail,
  getProficiency,
  getTestLabelsFluencyEvaluation,
} from '@/services/shared/readingFluencyEvaluation/readingFluencyEvaluation.service.js'
import store from '@/store'
import { ref, computed } from 'vue'

const moduleName = 'ReadingMeterV2Module'

export function useSchoolsReport() {
  const route = useRoute()
  const router = useRouter()

  const error = ref(null)
  const selectedEvaluation = ref(route.params.evaluationId || null)

  const institutions = computed({
    get() {
      return store.getters[`${moduleName}/institutions`] || []
    },
    set(value) {
      store.commit(`${moduleName}/institutions`, value)
    },
  })

  const proficiencies = computed({
    get() {
      return store.getters[`${moduleName}/proficiencies`] || []
    },
    set(value) {
      store.commit(`${moduleName}/proficiencies`, value)
    },
  })

  const proficiencyIndicators = computed({
    get() {
      return store.getters[`${moduleName}/proficiencyIndicators`] || []
    },
    set(value) {
      store.commit(`${moduleName}/proficiencyIndicators`, value)
    },
  })

  const test = computed({
    get() {
      return store.getters[`${moduleName}/test`] || {}
    },
    set(value) {
      store.commit(`${moduleName}/test`, value)
    },
  })

  const readingFluencyEvaluation = computed({
    get() {
      return store.getters[`${moduleName}/readingFluencyEvaluation`] || {}
    },
    set(value) {
      store.commit(`${moduleName}/readingFluencyEvaluation`, value)
    },
  })

  const testOptions = computed({
    get() {
      return store.getters[`${moduleName}/testOptions`] || []
    },
    set(value) {
      store.commit(`${moduleName}/testOptions`, value)
    },
  })

  const isLoading = computed({
    get() {
      return store.getters[`${moduleName}/loading`]
    },
    set(value) {
      store.commit(`${moduleName}/loading`, value)
    },
  })

  const institutionId = computed({
    get() {
      return store.getters[`${moduleName}/institutionId`]
    },
    set(value) {
      store.commit(`${moduleName}/institutionId`, value)
    },
  })

  const hasAnyAuditor = computed(() => {
    return institutions.value.some(inst => inst.hasAuditor === true)
  })

  const totalStudents = computed(() => {
    return institutions.value.reduce((sum, inst) => sum + (inst.students || 0), 0)
  })

  const updateFromRoute = () => {
    selectedEvaluation.value = route.params.evaluationId || null
  }

  const fetchEvaluationDetails = async () => {
    if (!selectedEvaluation.value) {
      error.value = 'Avaliação não selecionada'
      return
    }

    try {
      const { data } = await getReadingEvaluationDetail(selectedEvaluation.value)
      readingFluencyEvaluation.value = data
    } catch (err) {
      error.value = err.message || 'Erro ao carregar detalhes da avaliação'
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
      const params = {}
      const { data } = await getTestLabelsFluencyEvaluation(selectedEvaluation.value, params)
      testOptions.value = [{ name: 'Todos os testes', id: null, icons: [] }, ...data] || []
      test.value = testOptions.value[0]
    } catch (err) {
      error.value = err.message || 'Erro ao carregar detalhes do teste'
    }
  }

  const fetchInstitutions = async () => {
    if (!selectedEvaluation.value) {
      error.value = 'Avaliação não selecionada'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const params = {
        ReadingFluencyTestId: test.value.id,
      }

      const response = await getInstitutions(selectedEvaluation.value, params)

      if (response.data) {
        const mappedInstitutions = (response.data.institutions || []).map(institution => ({
          ...institution,
          proficient: institution.adequate,
          advenced: institution.advanced,
          studentsProficient: institution.studentsAdequate,
          studentsAdvanced: institution.studentsAdvanced,
        }))

        institutions.value = mappedInstitutions
        proficiencies.value = response.data.proficiencies || []
      }
    } catch (err) {
      error.value = err.message || 'Erro ao carregar instituições'
    } finally {
      isLoading.value = false
    }
  }

  const openInstitutionReport = id => {
    institutionId.value = id
    router.push({
      name: 'NetworkManagerFluencyV2Classes',
      params: {
        institutionId: id,
      },
    })
  }

  updateFromRoute()

  return {
    // State
    isLoading,
    error,
    selectedEvaluation,

    // Computed
    institutions,
    proficiencies,
    proficiencyIndicators,
    readingFluencyEvaluation,
    hasAnyAuditor,
    totalStudents,
    test,
    testOptions,
    institutionId,

    // Methods
    fetchInstitutions,
    fetchEvaluationDetails,
    loadProficiency,
    getTestLabels,
    openInstitutionReport,
    updateFromRoute,
  }
}