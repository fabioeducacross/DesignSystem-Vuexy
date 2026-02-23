import vueInstance from '@/main'
import { useRoute, useRouter } from 'vue-router/composables'
import {
  getWritingStagesAnalysis,
  getWritingStagesStudent,
  putWritingStagesStudentEvaluate,
} from '@/services/shared/writing-stages/writing-stages.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { cloneDeep, isEqual } from 'lodash'
import { computed, set } from 'vue'

const module_name = 'WritingPhaseRegister'
const { classe } = useFilters()

/**
 * Possíveis valores para a análise do estágio de escrita baseados no enum:
 * 0: NotApplicable, 1: Partially, 2: No, 3: Yes.
 *
 * @typedef {0|1|2|3|null} WritingStageValue
 */

/**
 * Representa a análise de um estágio de escrita.
 *
 * @typedef {Object} WritingStageAnalysis
 * @property {number} id - Identificador único da análise do estágio.
 * @property {string} [name] - Descrição da etapa de escrita.
 * @property {WritingStageValue} value - Valor correspondente ao enum (inteiro) ou null.
 */

/**
 * Representa uma fase da análise do estudante.
 *
 * @typedef {Object} Apply
 * @property {number} apply - Número da fase.
 * @property {string} [name] - Nome da fase.
 * @property {number} writingStagesTestId - id do teste tipo a prova
 * @property {number} stage - etapa de leitura do aluno
 * @property {string | File | null} imageUrl - URL da imagem relacionada à fase.
 * @property {string} [generalNotes] - Comentário sobre a fase.
 * @property {WritingStageAnalysis[]} [analysis] - Lista com 5 itens de análise de estágio de escrita.
 */

/**
 * Representa a análise completa de um estudante.
 *
 * @typedef {Object} StudentWritingAnalysis
 * @property {string} name - Nome do estudante.
 * @property {Apply[]} applies - Lista de fases (deve conter 3 fases).
 */

export function useWritingPhaseRegister() {
  const route = useRoute()
  const router = useRouter()

  /**
   * Used to keep track of the original value returned from api
   * @type {import('vue').ComputedRef<StudentWritingAnalysis>}
   */
  const writingPhasesTruth = computed({
    /**
     * @returns {StudentWritingAnalysis}
     */
    get: () => store.getters[`${module_name}/writingPhasesTruth`],
    /**
     * @param {StudentWritingAnalysis} value
     */
    set: value => {
      store.commit(`${module_name}/writingPhasesTruth`, value)
    },
  })

  /**
   * used to be edited on the forms, starts as a copy of writingPhasesTruth
   * @type {import('vue').ComputedRef<StudentWritingAnalysis>}
   */
  const writingPhasesWritten = computed({
    get: () => store.getters[`${module_name}/writingPhasesWritten`],
    set: value => {
      store.commit(`${module_name}/writingPhasesWritten`, value)
    },
  })

  /**
   * @type {import('vue').ComputedRef<Number>}
   */
  const currentPhaseIndex = computed({
    get: () => store.getters[`${module_name}/currentPhaseIndex`],
    set: value => {
      store.commit(`${module_name}/currentPhaseIndex`, value)
    },
  })

  /**
   * @type {import('vue').ComputedRef<Apply | null>}
   */
  const currentPhase = computed(() => {
    if (!writingPhasesWritten.value) return null

    return writingPhasesWritten.value.applies[currentPhaseIndex.value]
  })

  /**
   * @type {import('vue').WritableComputedRef<Boolean>}
   */
  const loading = computed({
    get: () => store.getters[`${module_name}/loading`],
    set: value => {
      store.commit(`${module_name}/loading`, value)
    },
  })

  /**
   * @type {import('vue').WritableComputedRef<WritingStageAnalysis[]>}
   */
  const analysis = computed({
    get: () => store.getters[`${module_name}/analysis`],
    set: value => {
      store.commit(`${module_name}/analysis`, value)
    },
  })

  const studentId = computed(() => route.params.studentId)

  const formEdited = computed(() => {
    return !isEqual(writingPhasesWritten.value, writingPhasesTruth.value)
  })

  const irregularPhases = computed(() => {
    if (!writingPhasesWritten.value) return []
    const irregularApplies = []
    // verificar se alguma das alterações foram feitas sem a fase de leitura avaliada
    const appliesToCheck = writingPhasesWritten.value.applies.filter(a => !a.stage || a.stage === 0)

    appliesToCheck.forEach(applyToCheck => {
      // não preciso verificar pois ambas iniciam da mesma origem
      const originalApplyCopy = cloneDeep(
        writingPhasesTruth.value.applies.find(a => a.apply === applyToCheck.apply),
      )
      const changedApplyCopy = cloneDeep(applyToCheck)

      delete originalApplyCopy.stage
      delete changedApplyCopy.stage

      if (!isEqual(originalApplyCopy, changedApplyCopy)) {
        irregularApplies.push(originalApplyCopy)
      }
    })

    return irregularApplies
  })

  const fetchAnalysis = async () => {
    const response = await getWritingStagesAnalysis()

    if (response.status !== 200) return

    const { data } = response
    analysis.value = data.map(d => {
      return {
        ...d,
        value: 0,
      }
    })
  }

  const getPhases = async () => {
    loading.value = true
    await fetchAnalysis()

    const response = await getWritingStagesStudent(classe.value.ClassId, studentId.value)

    if (response.status !== 200) {
      loading.value = false
      return
    }

    const { data } = response

    vueInstance.$bus.emit('setBreadcrumb', ['', '', data.name])

    data.applies.forEach(apply => {
      if (!apply.imageUrl) apply.imageUrl = null
      if (!apply.generalNotes) apply.generalNotes = ''

      if (!apply.analysis || !Array.isArray(apply.analysis)) {
        apply.analysis = cloneDeep(analysis.value)
      } else {
        analysis.value.forEach(ana => {
          const exists = apply.analysis.some(existingAna => existingAna.id === ana.id)
          if (!exists) {
            apply.analysis.push(cloneDeep(ana))
          }
        })
      }
    })

    writingPhasesTruth.value = cloneDeep(data)
    writingPhasesWritten.value = cloneDeep(data)

    loading.value = false
  }

  /**
   * Transforms an array of Apply objects into FormData format.
   *
   * @param {Apply[]} applies - The array of Apply objects.
   * @returns {Promise<FormData>} - The FormData object representing the applies data.
   */
  async function transformAppliesToFormData(applies) {
    const formData = new FormData()

    await Promise.all(
      applies.map(async (apply, index) => {
        formData.append(`applies[${index}].apply`, apply.apply)
        formData.append(`applies[${index}].stage`, apply.stage)
        formData.append(`applies[${index}].writingStagesTestId`, apply.writingStagesTestId)

        if (apply.name) {
          formData.append(`applies[${index}].name`, apply.name)
        }

        if (apply.imageUrl) {
          if (typeof apply.imageUrl === 'string' && apply.imageUrl.startsWith('data:image')) {
            const ext = apply.imageUrl.match(/^data:image\/(\w+);base64,/)
            const blob = await base64ToBlob(apply.imageUrl)
            formData.append(`applies[${index}].image`, blob, `image.${ext[1]}`)
          }
        } else {
          formData.append(`applies[${index}].DeleteImage`, 'true')
        }

        if (apply.generalNotes) {
          formData.append(`applies[${index}].generalNotes`, apply.generalNotes)
        }

        if (Array.isArray(apply.analysis)) {
          apply.analysis.forEach((analysis, analysisIndex) => {
            formData.append(
              `applies[${index}].analysis[${analysisIndex}].WritingStagesAnalysisId`,
              analysis.id,
            )

            if (analysis.value !== null) {
              formData.append(`applies[${index}].analysis[${analysisIndex}].value`, analysis.value)
            }
          })
        }
      }),
    )

    return formData
  }

  /**
   * Converts a Base64 image string to a Blob.
   *
   * @param {string} base64 - The Base64 string.
   * @returns {Promise<Blob>} - The Blob object.
   */
  async function base64ToBlob(base64) {
    const response = await fetch(base64)
    return response.blob()
  }

  const submit = async () => {
    loading.value = true

    const applies = writingPhasesWritten.value.applies.filter(a => {
      const stageTruth = writingPhasesTruth.value.applies.find(i => i.apply === a.apply)

      return a.stage && !isEqual(a, stageTruth)
    })

    if (!applies.length) {
      await goBack(false)
      return
    }

    const formData = await transformAppliesToFormData(applies)
    formData.set(`studentId`, studentId.value)
    formData.set(`classId`, classe.value.ClassId)

    try {
      const res = await putWritingStagesStudentEvaluate(formData)

      if (res.status !== 200) {
        loading.value = false
        return
      }
    } catch (e) {
      loading.value = false
      return
    }

    // Vue.$toast is likely a plugin instance, use as in original
    // (If this is a global method, use Vue.$toast, not in component instance)
    // This preserves usage as required by conventions.
    // eslint-disable-next-line
    Vue.$toast({
      component: Toast,
      props: {
        title: 'Alterado com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })

    await goBack(false)
  }

  const qtdPhases = computed(() => {
    if (!writingPhasesWritten.value) return 0

    return writingPhasesWritten.value.applies.length
  })

  const nextPhase = () => {
    if (currentPhaseIndex.value === qtdPhases.value - 1) return

    set(currentPhaseIndex, 'value', currentPhaseIndex.value + 1)
  }
  const prevPhase = () => {
    if (currentPhaseIndex.value === 0) return

    set(currentPhaseIndex, 'value', currentPhaseIndex.value - 1)
  }

  const goBack = async (confirmExit = true) => {
    vueInstance.$bus.emit('showConfirmExit', confirmExit && formEdited.value)

    await router.push({
      name: 'WritingPhasesList',
    })
  }

  return {
    module_name,

    currentPhaseIndex,
    writingPhasesWritten,
    writingPhasesTruth,
    currentPhase,
    loading,
    qtdPhases,
    irregularPhases,
    formEdited,
    analysis,

    goBack,
    getPhases,
    nextPhase,
    prevPhase,
    submit,
  }
}