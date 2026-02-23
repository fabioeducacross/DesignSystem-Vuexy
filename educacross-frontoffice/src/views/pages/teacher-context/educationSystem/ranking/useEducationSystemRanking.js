import {
  getEducationSystemRanking,
  getEducationSystemRankingExcel,
} from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { computed, ref } from 'vue'

const moduleName = 'educationSystemRankingModule'
const bookFirstoption = { id: null, name: 'Todos os livros' }
const missionFirstOption = { id: null, name: 'Todas as missões' }
const monthFirstOption = { id: null, name: 'Todo o período' }

export function useEducationSystemRanking() {
  const { subject, educationSystemId, classe, book, mission } = useFilters()

  /** @type {import('vue').WritableComputedRef<GetEducationSystemRankingResponse>} */
  const ranking = computed({
    get() {
      return store.getters[`${moduleName}/ranking`]
    },
    set(value) {
      store.commit(`${moduleName}/ranking`, value)
    },
  })

  const month = computed({
    get() {
      return store.getters[`${moduleName}/month`]
    },
    set(value) {
      store.commit(`${moduleName}/month`, value)
    },
  })

  const loading = computed({
    get() {
      return store.getters[`${moduleName}/loading`]
    },
    set(value) {
      store.commit(`${moduleName}/loading`, value)
    },
  })

  const excelLoading = computed({
    get() {
      return store.getters[`${moduleName}/excelLoading`]
    },
    set(value) {
      store.commit(`${moduleName}/excelLoading`, value)
    },
  })

  const educationSystemName = computed({
    get: () => store.getters[`${moduleName}/educationSystemName`],
    set: value => store.commit(`${moduleName}/educationSystemName`, value),
  })

  // ****************** METHODS ******************

  const fetchRanking = async () => {
    loading.value = true
    const response = await getEducationSystemRanking({
      EducationSystemId: educationSystemId.value,
      SubjectId: subject.value.id,
      BookId: book.value.id,
      ClassId: classe.value.ClassId,
      SerieId: classe.value.SerieId,
      GuideId: mission.value.id,
      Month: month.value.id,
    })

    if (response.status === 200) {
      ranking.value = response.data
      educationSystemName.value = ranking.value.educationSystemName
    } else {
      educationSystemName.value = ''
      ranking.value = {
        educationSystemName: '',
        ranking: [],
      }
    }

    loading.value = false
  }

  const exportExcel = async () => {
    if (excelLoading.value) return

    excelLoading.value = true

    const response = await getEducationSystemRankingExcel({
      EducationSystemId: educationSystemId.value,
      SubjectId: subject.value.id,
      BookId: book.value.id,
      ClassId: classe.value.ClassId,
      SerieId: classe.value.SerieId,
      GuideId: mission.value.id,
      Month: month.value.id,
    })

    if (response.status === 200) {
      const fileName = sanitizeString(`Ranking ${classe.value.Name}.xlsx`)
      saveAs(response.data, fileName)
    }

    excelLoading.value = false
  }

  return {
    moduleName,

    ranking,
    book,
    mission,
    month,
    loading,
    excelLoading,

    bookFirstoption,
    missionFirstOption,
    monthFirstOption,

    fetchRanking,
    exportExcel,
  }
}