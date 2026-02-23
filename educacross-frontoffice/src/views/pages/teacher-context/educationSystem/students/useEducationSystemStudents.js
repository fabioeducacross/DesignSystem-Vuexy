import { getEducationSystemReportStudentExcel } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { saveAs } from 'file-saver'
import { ref, computed } from 'vue'

export function useEducationSystemStudents() {
  const moduleName = 'educationSystemStudents'
  const { resetPage, loading } = useTable()
  const { classe, subject, book, mission, educationSystemId } = useFilters()

  const cards = computed({
    get: () => store.getters[`${moduleName}/cards`],
    set: value => store.commit(`${moduleName}/cards`, value),
  })

  const educationSystemName = computed({
    get: () => store.getters[`${moduleName}/educationSystemName`],
    set: value => store.commit(`${moduleName}/educationSystemName`, value),
  })

  const fetch = () => {
    loading.value = true
    store.dispatch(`${moduleName}/fetch`)
  }
  const resetAndfetch = () => {
    resetPage()
    fetch()
  }

  const generatingExcel = ref(false)

  const exportToExcel = () => {
    generatingExcel.value = true

    const params = {
      ClassId: classe.value.ClassId,
      SubjectId: subject.value.id,
      BookId: book.value.id,
      GuideId: mission.value.id,
      EducationSystemId: educationSystemId.value,
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
    educationSystemName,
    generatingExcel,
    exportToExcel,
  }
}