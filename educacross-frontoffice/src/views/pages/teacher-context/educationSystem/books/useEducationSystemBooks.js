import { getEducationSystemBooks } from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from 'vue'

export function useEducationSystemBooks() {
  const moduleName = 'EducationSystemBooks'
  const { subject, educationSystemId, classe } = useFilters()

  const books = computed({
    get() {
      return store.getters[`${moduleName}/books`]
    },
    set(val) {
      store.commit(`${moduleName}/books`, val)
    },
  })

  const educationSystemName = computed({
    get() {
      return store.getters[`${moduleName}/educationSystemName`]
    },
    set(val) {
      store.commit(`${moduleName}/educationSystemName`, val)
    },
  })

  const loading = computed({
    get() {
      return store.getters[`${moduleName}/loading`]
    },
    set(val) {
      store.commit(`${moduleName}/loading`, val)
    },
  })

  const onlyInProgress = computed({
    get() {
      return store.getters[`${moduleName}/onlyInProgress`]
    },
    set(val) {
      store.commit(`${moduleName}/onlyInProgress`, val)
    },
  })

  const fetchData = async () => {
    loading.value = true
    educationSystemName.value = ''
    const response = await getEducationSystemBooks({
      SubjectId: subject.value.id,
      EducationSystemId: educationSystemId.value,
      ClassId: classe.value.ClassId,
      OnlyInProgress: onlyInProgress.value.toString(),
    })

    if (response.status === 200) {
      books.value = response.data.books
      educationSystemName.value = response.data.educationSystemName
    } else {
      books.value = []
      educationSystemName.value = ''
    }

    loading.value = false
  }

  return {
    moduleName,
    educationSystemName,
    books,
    loading,
    educationSystemId,
    onlyInProgress,
    fetchData,
  }
}