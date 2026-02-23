import { useRoute, useRouter } from 'vue-router/composables'
import { getEvaluationEducationalOrganization } from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed, toRef } from 'vue'

const { subject } = useFilters()

const serieDefaultOption = {
  id: null,
  name: 'Todas as provas',
}
const matrixDefaultOption = {
  id: null,
  name: 'Todas as matrizes/currículos',
}

export function useEvaluation() {
  const route = useRoute()
  const router = useRouter()

  /**
   * @type {import('vue').ComputedRef<Array<{id: Number, name: String}>>}
   */
  const evaluationSeries = computed(
    () => store.getters['evaluations/evaluationDetails']?.series || [],
  )

  const evaluationId = toRef(route.params, 'evaluationId')

  const institutionName = computed(() => store.getters['evaluations/institutionName'])

  const className = computed(() => store.getters['evaluations/className'])

  const detailsSerieId = computed(() => store.getters['evaluations/evaluationDetails']?.serieId)

  const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])

  const fetchMatrix = async () => {
    const response = await getEvaluationEducationalOrganization(evaluationId.value, {
      subjectId: subject.value.id,
    })

    if (response.status === 200) {
      return [matrixDefaultOption, ...response.data]
    }
    return []
  }

  /**
   * Configuração do botão de download do PDF
   * @type {import('vue').ComputedRef<{disabled: Boolean, tooltip: String, visible: Boolean}>}
   */
  const pdfDownloadButtonConfig = computed(() => {
    const { reportTCT } = evaluationDetails.value

    let config
    switch (reportTCT) {
      case true:
        config = {
          disabled: false,
          tooltip: '',
          visible: true,
        }
        break
      case false:
        config = {
          disabled: true,
          tooltip: 'Esta opção será liberada quando a avaliação for finalizada.',
          visible: true,
        }
        break
      case undefined:
      case null:
        config = {
          disabled: true,
          tooltip: '',
          visible: false,
        }
        break
      default:
        config = {
          disabled: true,
          tooltip: '',
          visible: false,
        }
    }

    return config
  })

  return {
    evaluationSeries,
    serieDefaultOption,
    institutionName,
    className,
    evaluationId,
    matrixDefaultOption,
    detailsSerieId,
    evaluationDetails,
    fetchMatrix,
    pdfDownloadButtonConfig,
  }
}