import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getEducationSystemDashboard } from '@/services/shared/educationSystem/EducationSystem.Service'
import {
  getEducationSystemBookDetails,
  getEducationSystemMissionBooks,
  getEducationSystemGuideHistory,
} from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { sortString } from '@/utils/utils'
import { computed, ref } from 'vue'

const moduleName = 'educationSystemMissions'
const defaultUnityOption = { name: 'Todas as unidades do livro', id: null }
const defaultStatusOption = { key: null, label: 'Todos os status' }

export function useEducationSystemMissions() {
  const {
    book,
    educationSystemId,
    classe,
    subject,
    serie,
    subjects,
  } = useFilters()

  const { loading, dataTable } = useTable()
  const { resetPage } = useTable()

  const loadingDetails = computed({
    get: () => store.getters[`${moduleName}/loadingDetails`],
    set: value => store.commit(`${moduleName}/loadingDetails`, value),
  })

  const loadingDashboard = computed({
    get: () => store.getters[`${moduleName}/loadingDashboard`],
    set: value => store.commit(`${moduleName}/loadingDashboard`, value),
  })

  const dashboardData = computed({
    get: () => store.getters[`${moduleName}/dashboardData`],
    set: value => store.commit(`${moduleName}/dashboardData`, value),
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

  const serieName = computed({
    get: () => store.getters[`${moduleName}/serieName`],
    set: value => store.commit(`${moduleName}/serieName`, value),
  })

  const status = computed({
    get: () => store.getters[`${moduleName}/status`],
    set: value => store.commit(`${moduleName}/status`, value),
  })

  const history = computed({
    get: () => store.getters[`${moduleName}/history`],
    set: value => store.commit(`${moduleName}/history`, value),
  })

  const historyLoading = computed({
    get: () => store.getters[`${moduleName}/historyLoading`],
    set: value => store.commit(`${moduleName}/historyLoading`, value),
  })

  const classesLoading = ref(true)
  const classes = ref([])
  const classesPage = ref(1)
  const classesTotalpages = ref(1)

  const fetchClasses = async (ctx = {}) => {
    if (!subject.value?.id || !serie.value?.id) {
      classes.value = [{ name: 'Todas as turmas', id: null }]
      classesLoading.value = false
      return
    }

    classesLoading.value = true

    const { page } = ctx
    classesPage.value = page || 1

    try {
      const { data } = await getClassesV2Label({
        Page: classesPage.value,
        SubjectId: subject.value.id,
        SerieIds: [serie.value.id],
      })

      const options = data.data

      if (classesPage.value === 1) {
        classes.value = [{ name: 'Todas as turmas', id: null }]
      }

      classes.value.push(...options)
      classesTotalpages.value = data.totalPages
    } catch (error) {
      classes.value = [{ name: 'Todas as turmas', id: null }]
    } finally {
      classesLoading.value = false
    }
  }

  const fetchList = async () => {
    loading.value = true

    const params = {
      bookId: book.value.id,
      educationSystemId: educationSystemId.value,
      classId: classe.value.id,
      UnityId: unity.value.id,
    }

    if (status.value.key !== null) {
      params.status = status.value.key.toString()
    }

    try {
      const { data } = await getEducationSystemMissionBooks(params)
      const sortedData = (data || []).sort((a, b) => {
        if (a.unityId !== b.unityId) {
          return a.unityId - b.unityId
        }
        return sortString(a.name, b.name)
      })
      dataTable.value = sortedData
    } catch (error) {
      dataTable.value = []
    } finally {
      loading.value = false
    }
  }

  const fetchDashboard = async () => {
    loadingDashboard.value = true

    const params = {
      SubjectId: subject.value.id,
      EducationSystemId: educationSystemId.value,
      BookId: book.value.id,
      SerieId: serie.value.id,
      ClassId: classe.value.id,
      UnityId: unity.value.id,
    }

    if (status.value.key !== null) {
      params.Status = status.value.key.toString()
    }

    try {
      const response = await getEducationSystemDashboard(params)
      dashboardData.value = response.data || {
        totalGuideProgress: 0,
        sendGuideProgress: 0,
        amountGuideSend: 0,
        totalGuide: 0,
        studentsPlayed: 0,
        performance: 0,
        totalTime: 0,
        challengesDone: 0,
        amountGuidesInProgress: 0,
        inProgressGuideProgress: 0,
      }
    } catch (error) {
      dashboardData.value = {
        totalGuideProgress: 0,
        sendGuideProgress: 0,
        amountGuideSend: 0,
        totalGuide: 0,
        studentsPlayed: 0,
        performance: 0,
        totalTime: 0,
        challengesDone: 0,
        amountGuidesInProgress: 0,
        inProgressGuideProgress: 0,
      }
    } finally {
      loadingDashboard.value = false
    }
  }

  const resetAndfetch = async () => {
    resetPage()
    await Promise.all([fetchDashboard(), fetchList()])
  }

  const fetchDetails = async () => {
    loadingDetails.value = true

    try {
      const { data } = await getEducationSystemBookDetails(
        educationSystemId.value,
        book.value.id
      )

      unitys.value = [defaultUnityOption, ...data.unities]
      unity.value = defaultUnityOption
      bookName.value = data.bookName
      subjectId.value = data.subjectId
      serieName.value = data.serieName
      educationSystemName.value = data.educationSystemName
      book.value.name = data.bookName
      subject.value = subjects.value.find(({ id }) => id === data.subjectId)
      serie.value = {
        id: data.serieId,
        name: data.serieName,
      }

      await fetchClasses()
      await Promise.all([fetchDashboard(), fetchList()])
    } finally {
      loadingDetails.value = false
    }
  }

  const fetchHistory = async GuideId => {
    if (!GuideId || !classe.value.id) {
      history.value = []
      return
    }

    historyLoading.value = true

    try {
      const { data } = await getEducationSystemGuideHistory(GuideId, classe.value.id)
      history.value = data || []
    } catch (error) {
      history.value = []
    } finally {
      historyLoading.value = false
    }
  }

  return {
    moduleName,
    loadingDetails,
    unitys,
    unity,
    bookName,
    serieName,
    subjectId,
    educationSystemName,
    status,
    history,
    historyLoading,
    defaultStatusOption,
    defaultUnityOption,
    classesLoading,
    classes,
    classesPage,
    classesTotalpages,
    fetch: fetchList,
    fetchDetails,
    fetchClasses,
    resetAndfetch,
    loadingDashboard,
    dashboardData,
    fetchHistory,
  }
}
