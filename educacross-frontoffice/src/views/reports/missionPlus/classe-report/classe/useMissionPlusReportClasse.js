import { useRoute, useRouter } from 'vue-router/composables'
import { getGuidePlusReportClass } from '@/services/teacher-context/guides/Guides.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { uuidv4 } from '@/utils/utils'
import { computed } from 'vue'

const moduleName = 'ReportMissionPlusClasse'

export function useMissionPlusReportClasse() {
  // #region store computed
  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: value => store.commit(`${moduleName}/loading`, value),
  })

  const cards = computed({
    get: () => store.getters[`${moduleName}/cards`],
    set: value => store.commit(`${moduleName}/cards`, value),
  })

  const title = computed({
    get: () => store.getters[`${moduleName}/title`],
    set: value => store.commit(`${moduleName}/title`, value),
  })

  const tableStrongWeak = computed({
    get: () => store.getters[`${moduleName}/tableStrongWeak`],
    set: value => store.commit(`${moduleName}/tableStrongWeak`, value),
  })

  const subjectId = computed({
    get: () => store.getters[`${moduleName}/subjectId`],
    set: value => store.commit(`${moduleName}/subjectId`, value),
  })

  const rounds = computed({
    get: () => store.getters[`${moduleName}/rounds`],
    set: value => store.commit(`${moduleName}/rounds`, value),
  })

  // #endregion

  // #region refs
  const route = useRoute()
  const { guideId } = route.params

  const { classe } = useFilters()
  // #endregion

  // #region requests

  const getDetails = async () => {
    loading.value = true
    const { data } = await getGuidePlusReportClass(guideId, classe.value.ClassId)

    title.value = {
      subjectId: data.subjectId,
      status: data.status,
      startDate: data.startTime,
      endDate: data.expirationTime,
      title: data.name,
      className: data.className,
      serieName: data.serieName,
    }

    cards.value = {
      progress: data.progress,
      performance: data.performance,
      totalTime: data.time,
      challengesDone: data.challenges,
    }

    tableStrongWeak.value = {
      descriptorsStrong: data.topicsStrong,
      descriptorsToImprove: data.topicsToImprove,
    }

    rounds.value = data.rounds.map(round => {
      round.descriptors = round.descriptors.map(descriptor => {
        descriptor.id = uuidv4()
        return descriptor
      })

      return { ...round, id: uuidv4() }
    })

    loading.value = false
  }

  // #endregion

  return {
    moduleName,
    loading,
    cards,
    title,
    tableStrongWeak,
    subjectId,
    rounds,

    getDetails,
  }
}