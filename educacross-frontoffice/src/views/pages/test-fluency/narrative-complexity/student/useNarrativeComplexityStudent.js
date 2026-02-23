import { getNarrativeComplexityStudent } from '@/services/shared/narrativeComplexity/narrativeComplexity.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from 'vue'

const module_name = 'narrative_complexity_student'

export function useNarrativeComplexityStudent() {
  const loading = computed({
    get() {
      return store.getters[`${module_name}/loading`]
    },
    set(value) {
      store.commit(`${module_name}/loading`, value)
    },
  })

  const details = computed({
    /** @returns {StudentDetailsResponse} */
    get() {
      return store.getters[`${module_name}/details`]
    },

    /** @param {StudentDetailsResponse} val */
    set(val) {
      store.commit(`${module_name}/details`, val)
    },
  })

  const applicationSelectedIndex = computed({
    get() {
      return store.getters[`${module_name}/applicationSelectedIndex`]
    },

    set(val) {
      store.commit(`${module_name}/applicationSelectedIndex`, val)
    },
  })

  const getStudentData = async studentId => {
    loading.value = true
    const { classe } = useFilters()
    const { data } = await getNarrativeComplexityStudent(classe.value.ClassId, studentId)

    details.value = data
    loading.value = false
  }

  return {
    module_name,
    loading,
    details,
    applicationSelectedIndex,

    getStudentData,
  }
}