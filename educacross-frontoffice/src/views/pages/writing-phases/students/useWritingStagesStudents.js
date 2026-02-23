import { getWritingStagesClassExcel } from '@/services/shared/writing-stages/writing-stages.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { saveAs } from 'file-saver'
import { computed, ref } from 'vue'

export function useWritingStagesStudents() {
  const moduleName = 'writingStagesStudents'

  const { resetPage } = useTable()
  const { classe } = useFilters()

  const onlyApplyEnabled = computed({
    get: () => store.getters[`${moduleName}/onlyApplyEnabled`],
    set: value => store.commit(`${moduleName}/onlyApplyEnabled`, value),
  })

  const className = computed({
    get: () => store.getters[`${moduleName}/className`],
    set: value => store.commit(`${moduleName}/className`, value),
  })

  const serieName = computed({
    get: () => store.getters[`${moduleName}/serieName`],
    set: value => store.commit(`${moduleName}/serieName`, value),
  })

  const cards = computed({
    get: () => store.getters[`${moduleName}/cards`],
    set: value => store.commit(`${moduleName}/cards`, value),
  })

  const data = computed({
    get: () => store.getters[`${moduleName}/data`],
    set: value => store.commit(`${moduleName}/data`, value),
  })

  const fetch = () => {
    store.dispatch(`${moduleName}/fetch`)
  }

  const resetAndfetch = () => {
    resetPage()
    fetch()
  }

  const generatingExcel = ref(false)

  const exportToExcel = () => {
    generatingExcel.value = true

    getWritingStagesClassExcel(classe.value.ClassId)
      .then(response => {
        const fileName = `Fases da Escrita - Alunos.xlsx`

        saveAs(response.data, fileName)
      })
      .finally(() => {
        generatingExcel.value = false
      })
  }

  return {
    moduleName,
    onlyApplyEnabled,
    className,
    serieName,
    cards,
    data,
    fetch,
    resetAndfetch,
    generatingExcel,
    exportToExcel,
  }
}

export default useWritingStagesStudents