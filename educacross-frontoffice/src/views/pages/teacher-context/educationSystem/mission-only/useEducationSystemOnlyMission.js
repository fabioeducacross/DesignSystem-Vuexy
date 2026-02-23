import { getEducationSystemReportStudentExcel } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { saveAs } from 'file-saver'
import { ref, computed } from 'vue'

export function useEducationSystemOnlyMission() {
  const moduleName = 'useEducationSystemOnlyMission'
  const { resetPage, loading } = useTable()
  const { classe, subject, book, mission } = useFilters()

  const cards = computed({
    get: () => store.getters[`${moduleName}/cards`],
    set: value => store.commit(`${moduleName}/cards`, value),
  })

  const educationSystemName = computed({
    get: () => store.getters[`${moduleName}/educationSystemName`],
    set: value => store.commit(`${moduleName}/educationSystemName`, value),
  })

  const status = computed({
    get: () => store.getters[`${moduleName}/status`],
    set: value => store.commit(`${moduleName}/status`, value),
  })
  const startDate = computed({
    get: () => store.getters[`${moduleName}/startDate`],
    set: value => store.commit(`${moduleName}/startDate`, value),
  })
  const finishDate = computed({
    get: () => store.getters[`${moduleName}/finishDate`],
    set: value => store.commit(`${moduleName}/finishDate`, value),
  })

  const error = computed({
    get: () => store.getters[`${moduleName}/error`],
    set: value => store.commit(`${moduleName}/error`, value),
  })

  const fetch = () => {
    loading.value = true
    store.dispatch(`${moduleName}/fetch`)
  }
  const resetAndfetch = () => {
    resetPage()
    fetch()
  }

  const resetWithErrors = () => {
    store.commit(`${moduleName}/reset`)
    error.value = true
    loading.value = false
  }

  const generatingExcel = ref(false)

  const exportToExcel = () => {
    generatingExcel.value = true

    const params = {
      ClassId: classe.value.ClassId,
      SubjectId: subject.value.id,
      BookId: book.value.id,
      GuideId: mission.value.id,
    }

    getEducationSystemReportStudentExcel(params)
      .then(response => {
        const fileName = `${educationSystemName.value} - Alunos.xlsx`

        saveAs(response.data, fileName)
      })
      .finally(() => {
        generatingExcel.value = false
      })
  }

  return {
    moduleName,
    cards,
    fetch,
    resetAndfetch,
    resetWithErrors,
    educationSystemName,
    generatingExcel,
    exportToExcel,
    status,
    startDate,
    finishDate,
    error,
  }
}