import vueInstance from '@/main'
import { computed, ref, set } from 'vue'

/**
 * @typedef {Object} UserImport
 * @property {String} name
 * @property {String} sponsorEmail
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
 * @typedef {1 | 2 | 3} EStepImportStudents
 */
const EStep = {
  STEP_1: 0,
  STEP_2: 1,
  STEP_3: 2,
}

// Singleton state - shared across all component instances
const view = ref(EView.IMPORT_WIZARD)
const step = ref(EStep.STEP_1)
const isVisible = ref(false)
const isLoading = ref(false)
const filesToImport = ref([])
const availableLicensesQTD = ref(0)
const refFormWizard = ref(null)
const importUsersLimit = 300
const classes = ref([])
const editingUser = ref(null)
const rawImportingUsers = ref([])
const fileName = ref('')
const showHistory = ref(false)

export function useImportStudents() {

  const sumImportingUsersFromFiles = computed(() => {
    if (step.value === EStep.STEP_2) {
      return rawImportingUsers.value.length
    }

    return filesToImport.value.reduce((acc, file) => {
      return acc + file.users.length
    }, 0)
  })

  const isImportingMoreThanAvailable = computed(() => {
    return sumImportingUsersFromFiles.value > availableLicensesQTD.value
  })

  const isImportingMoreThanLimit = computed(() => {
    return sumImportingUsersFromFiles.value > importUsersLimit
  })

  const hasUnsavedChanges = computed(() => {
    return (
      filesToImport.value.length > 0 ||
      rawImportingUsers.value.length > 0 ||
      editingUser.value !== null
    )
  })

  const showImport = licenses => {
    resetState()
    availableLicensesQTD.value = licenses
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
    editingUser.value = null
    fileName.value = ''
    showHistory.value = false
    classes.value = []
  }

  const gotoViewWizard = () => {
    view.value = EView.IMPORT_WIZARD
    step.value = EStep.STEP_1
    showHistory.value = false
  }

  const gotoViewEdit = () => {
    view.value = EView.EDIT
  }

  const gotoViewHistory = () => {
    view.value = EView.HISTORY
  }

  const gotoNextStepWizard = () => {
    if (step.value < 3) {
      step.value += 1
    }

    if (refFormWizard.value && typeof refFormWizard.value.nextTab === 'function') {
      refFormWizard.value.nextTab()
    }
  }

  const findUserClass = (userClassName, classesArg) => {
    const userClass = classesArg.find(userClass => userClass.name === userClassName)
    return userClass || null
  }

  const isValidUser = user => {
    const isNameValid = user.name && user.name.length <= 50
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid =
      !user.sponsorEmail || (emailRegex.test(user.sponsorEmail) && user.sponsorEmail.length <= 100)
    const isClassNameValid = user.class !== null

    return {
      isValid: isNameValid && isEmailValid && isClassNameValid,
      isNameValid,
      isEmailValid,
      isClassNameValid,
    }
  }

  /**
   * @param file
   * @returns {Promise<Array<UserImport>>}
   */
  const getXlsxUsers = async file => {
    const XLSX = await import('xlsx')
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
        users.push({
          name: row[0] || '',
          sponsorEmail: row[1] || '',
          className: row[2] || '',
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
      // eslint-disable-next-line no-nested-ternary
      return a.isValid === b.isValid ? 0 : a.isValid ? 1 : -1
    })
  })

  const editUser = user => {
    const userToEdit = importingUsers.value.find(u => u.id === user.id)
    editingUser.value = { ...userToEdit }
  }

  const saveEditedUser = () => {
    const indexToUpdate = rawImportingUsers.value.findIndex(
      user => user.id === editingUser.value.id,
    )

    if (indexToUpdate !== -1) {
      // Validate the edited user data
      const validationResult = isValidUser(editingUser.value)

      set(rawImportingUsers.value, indexToUpdate, {
        ...editingUser.value,
        ...validationResult,
        _rowVariant: validationResult.isValid ? '' : 'danger',
      })
    }

    // Close the sidebar
    editingUser.value = null
  }

  const cancelEdit = () => {
    editingUser.value = null
  }

  const cancelImport = (byPass = false) => {
    if (hasUnsavedChanges.value && !byPass) {
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
    isImportingMoreThanAvailable,
    isImportingMoreThanLimit,
    importUsersLimit,
    classes,
    editingUser,
    rawImportingUsers,
    importingUsers,
    fileName,
    showHistory,
    hasUnsavedChanges,
    isValidUser,
    showImport,
    gotoViewWizard,
    gotoViewEdit,
    gotoViewHistory,
    resetState,
    getFileToImportInfo,
    gotoNextStepWizard,
    findUserClass,
    editUser,
    saveEditedUser,
    cancelEdit,
    cancelImport,
  }
}