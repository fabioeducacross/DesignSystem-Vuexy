import { useRoute, useRouter } from 'vue-router/composables'
import { getGuidePlusReportClassStudentDetails } from '@/services/teacher-context/guides/Guides.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { uuidv4 } from '@/utils/utils'
import { computed } from 'vue'

const { classe } = useFilters()

const module_name = 'ReportMissionPlusStudent'

export function useReportMissionPlusStudent() {
  const route = useRoute()
  const router = useRouter()

  // #region store computed
  const loading = computed({
    get: () => store.getters[`${module_name}/loading`],
    set: value => store.commit(`${module_name}/loading`, value),
  })

  const cards = computed({
    /** @return {Array<GameItem | QuizItem>} */
    get: () => store.getters[`${module_name}/cards`],
    set: value => store.commit(`${module_name}/cards`, value),
  })

  const tableStrongWeak = computed({
    get: () => store.getters[`${module_name}/tableStrongWeak`],
    set: value => store.commit(`${module_name}/tableStrongWeak`, value),
  })

  const subjectId = computed({
    get: () => store.getters[`${module_name}/subjectId`],
    set: value => store.commit(`${module_name}/subjectId`, value),
  })

  const rounds = computed({
    get: () => store.getters[`${module_name}/rounds`],
    set: value => store.commit(`${module_name}/rounds`, value),
  })

  const studentName = computed({
    get: () => store.getters[`${module_name}/studentName`],
    set: value => store.commit(`${module_name}/studentName`, value),
  })

  const missionName = computed({
    get: () => store.getters[`${module_name}/missionName`],
    set: value => store.commit(`${module_name}/missionName`, value),
  })
  // #endregion

  // #region methods
  const getData = async () => {
    loading.value = true

    const { guideId, studentId } = route.params
    const { data } = await getGuidePlusReportClassStudentDetails(
      guideId,
      classe.value.ClassId,
      studentId,
    )

    studentName.value = data.studentName
    missionName.value = data.name

    cards.value = {
      progress: {
        student: data.progress,
        classe: data.classProgress,
      },
      performance: {
        student: data.performance,
        classe: data.classPerformance,
      },
      totalTime: {
        student: data.totalTime,
        classe: data.classTotalTime,
      },
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
    subjectId.value = data.subjectId

    loading.value = false
  }
  // #endregion

  return {
    module_name,
    loading,
    cards,
    tableStrongWeak,
    subjectId,
    rounds,
    studentName,
    missionName,

    getData,
    route,
    router,
  }
}