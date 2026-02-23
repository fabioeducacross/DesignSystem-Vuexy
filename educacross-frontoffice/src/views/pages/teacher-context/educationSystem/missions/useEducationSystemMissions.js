import {
  getEducationSystemBookDetails,
  getEducationSystemMissionBooks,
} from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { sortString } from '@/utils/utils'
import { computed } from 'vue'

const moduleName = 'educationSystemMissions'
const defaultUnityOption = { name: 'Todas as unidades do livro', id: null }
const defaultStatusOption = { key: null, label: 'Todos os status' }

export function useEducationSystemMissions() {
  const { loading, dataTable, resetPage } = useTable()
  const { book, educationSystemId, classe, subject, subjects } = useFilters()

  const loadingDetails = computed({
    get: () => store.getters[`${moduleName}/loadingDetails`],
    set: value => store.commit(`${moduleName}/loadingDetails`, value),
  })

  const unitys = computed({
    get: () => store.getters[`${moduleName}/unitys`],
    set: value => store.commit(`${moduleName}/unitys`, value),
  })

  const unity = computed({
    get: () => store.getters[`${moduleName}/unity`],
    set: value => store.commit(`${moduleName}/unity`, value),
  })

  const bookName = computed({
    get: () => store.getters[`${moduleName}/bookName`],
    set: value => store.commit(`${moduleName}/bookName`, value),
  })

  const subjectId = computed({
    get: () => store.getters[`${moduleName}/subjectId`],
    set: value => store.commit(`${moduleName}/subjectId`, value),
  })

  const educationSystemName = computed({
    get: () => store.getters[`${moduleName}/educationSystemName`],
    set: value => store.commit(`${moduleName}/educationSystemName`, value),
  })

  const status = computed({
    get: () => store.getters[`${moduleName}/status`],
    set: value => store.commit(`${moduleName}/status`, value),
  })

  const fetchBooks = () => {
    loading.value = true
    loadingDetails.value = true

    const params = {
      bookId: book.value.id,
      educationSystemId: educationSystemId.value,
      classId: classe.value.ClassId,
      UnityId: unity.value.id,
    }

    if (status.value.key !== null) {
      params.status = status.value.key.toString()
    }

    getEducationSystemMissionBooks(params)
      .then(({ data }) => {
        const sortedData = (data || []).sort((a, b) => {
          if (a.unityId !== b.unityId) {
            return a.unityId - b.unityId
          }
          return sortString(a.name, b.name)
        })
        dataTable.value = sortedData
      })
      .catch(() => {
        dataTable.value = []
      })
      .finally(() => {
        loading.value = false
        loadingDetails.value = false
      })
  }

  const resetAndfetch = () => {
    resetPage()
    fetchBooks()
  }

  const fetchDetails = () => {
    loadingDetails.value = true

    return getEducationSystemBookDetails(educationSystemId.value, book.value.id)
      .then(({ data }) => {
        unitys.value = [defaultUnityOption, ...(data.unities || [])]
        unity.value = defaultUnityOption
        bookName.value = data.bookName
        subjectId.value = data.subjectId
        educationSystemName.value = data.educationSystemName
        book.value.name = data.bookName
        subject.value = subjects.value.find(({ id }) => id === data.subjectId)

        fetchBooks()
      })
      .finally(() => {
        loadingDetails.value = false
      })
  }

  return {
    moduleName,
    loadingDetails,
    unitys,
    unity,
    bookName,
    subjectId,
    educationSystemName,
    status,
    defaultUnityOption,
    defaultStatusOption,
    fetch: fetchBooks,
    fetchDetails,
    resetAndfetch,
  }
}
