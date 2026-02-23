import vueInstance from '@/main'
import { isNumber } from '@/utils/utils'
import { computed, ref } from 'vue'

/**
 * @typedef {Object} UserImport
 * @property {String} name
 * @property {String} serieId
 * @property {{id: Number, name: String, serieName: String}} class
 */

/**
 * @typedef {Object} FileToImport
 * @property {String} name
 * @property {String} type
 * @property {Number} size
 * @property {Array<UserImport>} users
 */

/**
 * import-wizard: são os passos do wizard para importação de alunos
 *
 * edit: é a visualização para editar um aluno vindo dos dados importados
 *
 * history: é a visualização para ver o histórico de importação. A listagem dos alunos de uma importação fica por conta do componente de listagem, e não desta variável
 * @typedef {'import-wizard' | 'edit' | 'history'} EViewStudentsImport
 */
const EView = {
  IMPORT_WIZARD: 'import-wizard',
  EDIT: 'edit',
  HISTORY: 'history',
}

/**
 * @typedef {import('vue').Ref<EViewStudentsImport>}
 */

/**
 * @typedef {0 | 1} EStepImportStudents
 */
const EStep = {
  STEP_1: 0,
  STEP_2: 1,
}

/**
 * importUsersLimit
 */
const importUsersLimit = 300

export function useImportClasses() {
  const view = ref(EView.IMPORT_WIZARD)
  const step = ref(EStep.STEP_1)
  const isVisible = ref(false)
  const isLoading = ref(false)
  const filesToImport = ref([])
  const availableLicensesQTD = ref(0)
  const refFormWizard = ref(null)
  const schoolYears = ref([])
  const rawImportingUsers = ref([])
  const fileName = ref('')

  const sumImportingUsersFromFiles = computed(() => {
    if (step.value === EStep.STEP_2) {
      return rawImportingUsers.value.length
    }
    return filesToImport.value.reduce((acc, file) => {
      return acc + file.users.length
    }, 0)
  })

  // const isImportingMoreThanAvailable = computed(() => {
  //   return sumImportingUsersFromFiles.value > availableLicensesQTD.value
  // })

  const isImportingMoreThanLimit = computed(() => {
    return sumImportingUsersFromFiles.value > importUsersLimit
  })

  const hasUnsavedChanges = computed(() => {
    return filesToImport.value.length > 0 || rawImportingUsers.value.length > 0
  })

  const showImport = () => {
    resetState()
    isVisible.value = true
  }

  const resetState = () => {
    if (refFormWizard.value && typeof refFormWizard.value.reset === 'function') {
      refFormWizard.value.reset()
    }

    isVisible.value = false
    step.value = EStep.STEP_1
    view.value = EView.IMPORT_WIZARD
    filesToImport.value = []
    availableLicensesQTD.value = 0
    isLoading.value = false
    fileName.value = ''
    schoolYears.value = []
    rawImportingUsers.value = []
  }

  const gotoViewWizard = () => {
    view.value = EView.IMPORT_WIZARD
    step.value = EStep.STEP_1
  }

  const gotoViewEdit = () => {
    view.value = EView.EDIT
  }

  const gotoViewHistory = () => {
    view.value = EView.HISTORY
  }

  const gotoNextStepWizard = () => {
    if (step.value < 2) {
      step.value += 1
    }
    if (refFormWizard.value && typeof refFormWizard.value.nextTab === 'function') {
      refFormWizard.value.nextTab()
    }
  }

  const findUserSerieId = serieName => {
    const serie = schoolYears.value.find(s => s.name === serieName)
    return serie ? serie.id : null
  }

  const isValidUser = user => {
    const isNameValid = user.name && user.name.length <= 20
    const isSerieIdValid = isNumber(user.serieId)
    return isNameValid && isSerieIdValid
  }

  /**
   * @param file
   * @returns {Promise<Array<UserImport>>}
   */
  const getXlsxUsers = async file => {
    const { default: XLSX } = await import('xlsx')
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    /**
     * @type {Array<UserImport>}
     */
    const users = []

    // read the lines and add 1 to the user counter if any cell on the line is not empty
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    for (let i = 0; i < rows.length; i++) {
      // eslint-disable-next-line no-continue
      if (i === 0) continue // skip the first line (header)

      const row = rows[i]
      if (row.some(cell => cell !== null && cell !== undefined && cell !== '')) {
        const serieId = findUserSerieId(row[0])

        users.push({
          name: row[1] || '',
          serieId,
        })
      }
    }

    return users
  }

  /**
   *
   * @param {File} file
   * @returns {Array<FileToImport>}
   */
  const getFileToImportInfo = async file => {
    const name = file.name
    const type = file.type
    const size = Math.round(file.size / 1024)

    const users =
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ? await getXlsxUsers(file)
        : []

    return {
      name,
      type,
      size,
      users,
    }
  }

  const importingUsers = computed(() => {
    return [...rawImportingUsers.value].sort((a, b) => {
      return a.isValid === b.isValid ? 0 : a.isValid ? 1 : -1
    })
  })

  const cancelImport = (byPass = false) => {
    if (hasUnsavedChanges.value && !byPass) {
      // event bus: $bus → mitt emitter pattern (preserve import usage)
      vueInstance.$bus.emit('manualShowConfirmExit', () => cancelImport(true))
      return
    }
    resetState()
  }

  return {
    refFormWizard,
    EView,
    EStep,
    isVisible,
    step,
    view,
    isLoading,
    filesToImport,
    availableLicensesQTD,
    sumImportingUsersFromFiles,
    isImportingMoreThanLimit,
    importUsersLimit,
    schoolYears,
    rawImportingUsers,
    importingUsers,
    fileName,
    hasUnsavedChanges,
    isValidUser,
    showImport,
    gotoViewWizard,
    gotoViewEdit,
    gotoViewHistory,
    resetState,
    getFileToImportInfo,
    gotoNextStepWizard,
    cancelImport,
  }
}