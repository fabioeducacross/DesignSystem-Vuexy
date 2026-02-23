import {
  getEducationSystemRankingNetwork,
  getEducationSystemRankingExcel,
} from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { computed } from 'vue'

const moduleName = 'educationSystemRankingNetworkModule'
const bookFirstoption = { id: null, name: 'Todos os livros' }
const missionFirstOption = { id: null, name: 'Todas as missões' }
const monthFirstOption = { id: null, name: 'Todo o período' }

const { subject, educationSystemId, book, mission, networkGroup, serie } = useFilters()

export function useEducationSystemRankingNetwork() {
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

  const classe = computed({
    get() {
      return store.getters[`${moduleName}/classe`]
    },
    set(value) {
      store.commit(`${moduleName}/classe`, value)
    },
  })

  const educationSystemName = computed({
    get: () => store.getters[`${moduleName}/educationSystemName`],
    set: value => store.commit(`${moduleName}/educationSystemName`, value),
  })

  // ****************** METHODS ******************

  const fetchRanking = async () => {
    if (!serie.value.id) return

    loading.value = true
    const response = await getEducationSystemRankingNetwork({
      EducationSystemId: educationSystemId.value,
      SubjectId: subject.value.id,
      SerieId: serie.value.id,
      NetworkGroupId: networkGroup.value.id,
      BookId: book.value.id,
      GuideId: mission.value.id,
      Month: month.value.id,
    })

    if (response.status === 200) {
      ranking.value = response.data
      educationSystemName.value = ranking.value.educationSystemName
      if (ranking.value.bookName) book.value.name = ranking.value.bookName
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
      ClassId: classe.value?.id,
      SerieId: serie.value.id,
      GuideId: mission.value.id,
      Month: month.value.id,
    })

    if (response.status === 200) {
      const className = !classe.value.id
        ? ` - ${classe.value.name} ${serie.value.name}`
        : ` - ${classe.value.name}`

      const fileName = sanitizeString(
        `Ranking ${ranking.value.educationSystemName}${className}.xlsx`,
      )

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
    serie,
    classe,

    bookFirstoption,
    missionFirstOption,
    monthFirstOption,

    fetchRanking,
    exportExcel,
    educationSystemName,
    networkGroup,
    subject,
    educationSystemId,
  }
}