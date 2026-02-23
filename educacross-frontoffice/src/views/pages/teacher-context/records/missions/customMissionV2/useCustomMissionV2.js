import { ACTION } from '@/consts/permissions'
import { getAbilities } from '@/libs/acl/ability'
import { getSubjectsSeries } from '@/services/admin-context/series/Series.service'
import { getEducationalOrganizationsLabel } from '@/services/shared/educationalOrganization/EducationalOrganization.service'
import {
  getActivitieQuiz,
  getActivitiesV1,
} from '@/services/teacher-context/activities/Activities.service'
import {
  getDescriptorsV2,
  getKnowledgeObject,
} from '@/services/teacher-context/descriptors/Descriptors.service'
import {
  enableGuidePlus,
  getGuidePlusEdit,
  postGuidePlus,
  putGuidePlus,
} from '@/services/teacher-context/guides/GuidesPlus.service'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service'
import { getStudentsInGuide } from '@/services/teacher-context/students/Students.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { sortString } from '@/utils/utils'
import { Ability } from '@casl/ability'
import { computed, ref, set } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

export function useCustomMissionV2() {
  const module_name = 'create_mission_module'
  const { subject, classe } = useFilters()

  const vibratePatterns = {
    // sudden stop
    startDrag: [100, 100],

    // long decrease
    endDrag: [100, 100, 100, 100],
  }

  const filtersLoadingList = ref([true, true, true, true, true])
  const SERIE_LOADING_INDEX = 0
  const MATRIX_LOADING_INDEX = 1
  const THEME_LOADING_INDEX = 2
  const KNOWLEDGE_LOADING_INDEX = 3
  const ABILITY_LOADING_INDEX = 4

  const searchTopic = ref('')
  const ACTIVITIES_MAX_QTD = 8
  const loadingMissionPlus = ref(false)
  const missionPlusEditData = ref(null)
  const preparingToEdit = ref(false)

  const ACTIVITY_EMPTY = {
    isDraggable: false,
    isShaking: false,
    isLoading: false,
    item: null,
  }

  const ROUND_TYPE = {
    ACTIVITY: 0,
    QUIZ: 1,
  }

  const openWarningDifferentSubject = ref(false)
  const itemPending = ref(null)
  const subjectPending = ref(null)

  const startDateModal = ref(null)

  const route = useRoute()
  const router = useRouter()

  // region Store Getters and Setters
  const missionInfo = computed({
    get() {
      return store.getters[`${module_name}/missionInfo`]
    },
    set(value) {
      store.commit(`${module_name}/missionInfo`, value)
    },
  })

  const selectedItems = computed({
    get() {
      return store.getters[`${module_name}/selectedItems`]
    },
    set(value) {
      store.commit(`${module_name}/selectedItems`, value)
    },
  })

  const itemsFilters = computed({
    get() {
      return store.getters[`${module_name}/itemsFilters`]
    },
    set(value) {
      store.commit(`${module_name}/itemsFilters`, value)
    },
  })

  const filtersItems = computed({
    get() {
      return store.getters[`${module_name}/filtersItems`]
    },
    set(value) {
      store.commit(`${module_name}/filtersItems`, value)
    },
  })

  const gamesTab = computed({
    get() {
      return store.getters[`${module_name}/gamesTab`]
    },
    set(value) {
      store.commit(`${module_name}/gamesTab`, value)
    },
  })

  const questionsTab = computed({
    get() {
      return store.getters[`${module_name}/questionsTab`]
    },
    set(value) {
      store.commit(`${module_name}/questionsTab`, value)
    },
  })

  const activeTab = computed({
    get() {
      return store.getters[`${module_name}/activeTab`]
    },
    set(value) {
      store.commit(`${module_name}/activeTab`, value)
    },
  })

  const resultListQTD = computed(() => {
    if (activeTab.value === 0) return gamesTab.value.games.length
    return questionsTab.value.questions.length
  })
  // endregion

  // region HTTP Requests
  // region Filters Requests
  const getSeries = async () => {
    filtersLoadingList.value[SERIE_LOADING_INDEX] = true
    const { data } = await getSubjectsSeries(subject.value.id)

    filtersItems.value.series = [{ id: null, name: 'Todos os anos escolares' }, ...data] || [
      { id: null, name: 'Todos os anos escolares' },
    ]
    const serieOfSelectedClass = filtersItems.value.series.find(
      serie => serie.id === classe.value.SerieId,
    )
    itemsFilters.value.serie = serieOfSelectedClass || {}

    filtersLoadingList.value[SERIE_LOADING_INDEX] = false
  }

  const getMatrices = async () => {
    filtersLoadingList.value[MATRIX_LOADING_INDEX] = true

    const { data } = await getEducationalOrganizationsLabel(
      itemsFilters.value.serie.id,
      subject.value.id,
    )

    if (data.length === 0) {
      filtersLoadingList.value[MATRIX_LOADING_INDEX] = false

      itemsFilters.value.matrix = {}
      itemsFilters.value.knowledgeObject = {}
      itemsFilters.value.theme = {}
      itemsFilters.value.ability = []
      itemsFilters.value.query = ''

      filtersItems.value.matrices = []
      filtersItems.value.knowledgeObjects = []
      filtersItems.value.themes = []
      filtersItems.value.abilities = []

      gamesTab.value = {
        games: [],
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        total: 0,
        loading: false,
      }

      questionsTab.value = {
        questions: [],
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        total: 0,
        loading: false,
      }

      return
    }

    filtersItems.value.matrices = [{ id: null, name: 'Todos' }, ...data] || [
      { id: null, name: 'Todos' },
    ]
    itemsFilters.value.matrix = filtersItems.value.matrices[0] || {}
    filtersLoadingList.value[MATRIX_LOADING_INDEX] = false
  }

  const getThemes = async () => {
    const optionAll = { name: 'Todas as temáticas' }

    if (!itemsFilters.value.matrix.id) {
      filtersLoadingList.value[THEME_LOADING_INDEX] = false
      itemsFilters.value.theme = optionAll
      filtersItems.value.themes = [optionAll]
      await updateTabContent()
      return
    }
    filtersLoadingList.value[THEME_LOADING_INDEX] = true

    let { data } = await getKnowledgeaxesFilterOptions({
      educationalOrganizationId: itemsFilters.value.matrix.id,
    })

    data = data || []
    data.unshift(optionAll)

    filtersItems.value.themes = data || []
    itemsFilters.value.theme = filtersItems.value.themes[0] || {}
    filtersLoadingList.value[THEME_LOADING_INDEX] = false
  }

  const getKnowledgeObjects = async () => {
    const optionAll = { name: 'Todos os Objetos do Conhecimento' }

    if (!itemsFilters.value.matrix.id) {
      filtersLoadingList.value[KNOWLEDGE_LOADING_INDEX] = false
      itemsFilters.value.knowledgeObject = optionAll
      filtersItems.value.knowledgeObjects = [optionAll]
      return
    }

    filtersLoadingList.value[KNOWLEDGE_LOADING_INDEX] = true

    let { data } = await getKnowledgeObject({
      EducationalOrganizationId: itemsFilters.value.matrix.id,
      KnowledgeAxisId: itemsFilters.value.theme.id,
    })

    data = data || []
    data = data.map(i => {
      return { name: i, id: i }
    })
    data.unshift(optionAll)

    filtersItems.value.knowledgeObjects = data
    itemsFilters.value.knowledgeObject = filtersItems.value.knowledgeObjects[0] || {}
    filtersLoadingList.value[KNOWLEDGE_LOADING_INDEX] = false
  }

  const getFilterAbilities = async () => {
    const optionAll = { name: 'Todas as habilidades' }

    if (!itemsFilters.value.matrix.id) {
      filtersLoadingList.value[ABILITY_LOADING_INDEX] = false
      itemsFilters.value.ability = optionAll
      filtersItems.value.abilities = [optionAll]
      return
    }

    filtersLoadingList.value[ABILITY_LOADING_INDEX] = true

    const { data } = await getDescriptorsV2(
      itemsFilters.value.matrix.id,
      itemsFilters.value.theme.id,
      itemsFilters.value.knowledgeObject.id,
    )

    filtersItems.value.abilities = data || []
    itemsFilters.value.ability = filtersItems.value.abilities || []
    filtersLoadingList.value[ABILITY_LOADING_INDEX] = false

    await updateTabContent()
  }

  const getClasses = async () => {
    let { data } = await getStudentsInGuide(subject.value.id)

    data = data.filter(c => !isDisabledModule(c))

    data = data.sort((a, b) => sortString(a.className, b.className))

    filtersItems.value.classes = data.map(item => ({
      ...item,
      disabled: item.guidesCreated >= 40,
    }))

    return data
  }

  // endregion

  // region Games, Quiz and Mission Requests
  const getGames = async () => {
    gamesTab.value.loading = true

    let DescriptorsIds = []

    if (itemsFilters.value.matrix.id) {
      DescriptorsIds = itemsFilters.value.ability?.map(a => a.id)
    }

    if (filtersItems.value.abilities.length === itemsFilters.value.ability?.length) {
      DescriptorsIds = []
    }

    const { data } = await getActivitiesV1({
      page: gamesTab.value.currentPage,
      pageSize: gamesTab.value.pageSize,
      educationalOrganizationId: itemsFilters.value.matrix.id,
      knowledgeAxisId: itemsFilters.value.theme.id,
      SerieId: itemsFilters.value.serie.id,
      SearchKnowledgeObject: itemsFilters.value.knowledgeObject.id,
      DescriptorsIds,
      subjectId: subject.value.id,
      searchTopic: searchTopic.value,
    })

    let tempData = data.data || []
    tempData = tempData.map(i => ({
      ...i,
      type: ROUND_TYPE.ACTIVITY,
      subjectId: subject.value.id,
      id: i.activityId,
    }))

    gamesTab.value.games = tempData
    gamesTab.value.total = data.total
    gamesTab.value.totalPages = data.totalPages

    gamesTab.value.loading = false
  }

  const getQuizes = async () => {
    questionsTab.value.loading = true

    let DescriptorsIds = []

    if (itemsFilters.value.matrix.id) {
      DescriptorsIds = itemsFilters.value.ability?.map(a => a.id)
    }

    if (filtersItems.value.abilities.length === itemsFilters.value.ability?.length) {
      DescriptorsIds = []
    }

    const { data } = await getActivitieQuiz({
      page: questionsTab.value.currentPage,
      pageSize: questionsTab.value.pageSize,
      educationalOrganizationId: itemsFilters.value.matrix.id,
      knowledgeAxisId: itemsFilters.value.theme.id,
      SearchKnowledgeObject: itemsFilters.value.knowledgeObject.id,
      SerieId: itemsFilters.value.serie.id,
      DescriptorsIds,
      subjectId: subject.value.id,
      searchTopic: searchTopic.value,
    })

    let tempData = data.data || []
    tempData = tempData.map(i => ({
      ...i,
      type: ROUND_TYPE.QUIZ,
      subjectId: subject.value.id,
      id: `${i.topicId}-${i.descriptorId}`,
    }))

    questionsTab.value.questions = tempData

    questionsTab.value.total = data.total
    questionsTab.value.totalPages = data.totalPages

    questionsTab.value.loading = false
  }

  const getGuidePlusDetails = async (id, classId) => {
    return getGuidePlusEdit(id, classId)
  }

  const createMission = async () => {
    loadingMissionPlus.value = true
    const id = route.value.params.id

    let rounds = []
    selectedItems.value.forEach((i, index) => {
      if (i.item === null) return

      let descriptorsIds

      if (i.item?.descriptors) {
        descriptorsIds = i.item.descriptors.map(d => d.id)
      } else {
        descriptorsIds = [i.item.descriptorId]
      }

      if (i.item.descriptorsIds) {
        descriptorsIds = i.item.descriptorsIds
      }

      rounds.push({
        round: index + 1,
        topicId: i.item.topicId,
        type: i.item.type,
        contentId: i.item.activityId || i.item.contentId,
        descriptorsIds,
      })
    })

    rounds = rounds
      .sort((a, b) => a.round - b.round)
      .map((r, index) => ({ ...r, round: index + 1 }))

    let Start = missionInfo.value.start
    let Expiration = missionInfo.value.end

    if (typeof Start === 'string') {
      Start = new Date(Start)
      Expiration = new Date(Expiration)
    }

    const params = {
      Name: missionInfo.value.name,
      Classes: missionInfo.value.classe.map(c => c.classId),
      Start,
      Expiration,
      Rounds: rounds,
      Sequential: missionInfo.value.flux === 2,
      Subject: subject.value.id,
      Students: missionInfo.value.students.map(s => s.studentId),
      messageToStudent: missionInfo.value.messageToStudent,
      rankingEnabled: missionInfo.value.rankingEnabled,
      application: missionInfo.value.application,
    }

    if (id) {
      await putGuidePlus(id, params)
      loadingMissionPlus.value = false

      return parseInt(id)
    }

    const { data } = await postGuidePlus(params)

    loadingMissionPlus.value = false
    startDateModal.value = data

    return data
  }

  const updateMission = async () => {
    const response = await putGuidePlus()

    return response.data
  }
  // endregion
  // endregion

  // region Utils
  const vibrate = time => {
    if ('vibrate' in navigator) {
      navigator.vibrate(time)
    }
  }

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  }

  const selectItem = item => {
    if (!selectedItems.value.some(i => i.item === null)) return

    const firstSlotAvailable = selectedItems.value.findIndex(i => i.item === null)

    set(selectedItems.value[firstSlotAvailable], 'item', item)
  }

  const resumeSelectingItem = () => {
    selectedItems.value = selectedItems.value.map(i => {
      return {
        ...i,
        item: null,
      }
    })
    selectItem(itemPending.value)

    openWarningDifferentSubject.value = false
  }

  const resumeSelectingSubject = () => {
    selectedItems.value = selectedItems.value.map(i => {
      return {
        ...i,
        item: null,
      }
    })

    getSeries()
    openWarningDifferentSubject.value = false
  }

  const cancelResumeSelectingSubject = () => {
    openWarningDifferentSubject.value = false
    subject.value = subjectPending.value
  }

  const cancelResumeSelectingItem = () => {
    openWarningDifferentSubject.value = false
    itemPending.value = null
  }

  const removeItem = item => {
    if (item.type === ROUND_TYPE.QUIZ) {
      const index = selectedItems.value.findIndex(i => {
        if (!i.item) return false
        return i.item.id === item.id
      })
      set(selectedItems.value[index], 'item', null)
      return
    }

    const index = selectedItems.value.findIndex(i => {
      if (!i.item) return false
      return i.item.contentId === item.id || i.item.id === item.id
    })
    set(selectedItems.value[index], 'item', null)
  }

  const isItemSelected = item => {
    if (item.type === ROUND_TYPE.QUIZ) {
      return selectedItems.value.some(i => {
        if (!i.item) return false
        return i.item.id === item.id
      })
    }

    return selectedItems.value.some(i => {
      if (!i.item) return false
      return i.item.contentId === item.id || i.item.id === item.id
    })
  }
  const someItemsSelected = () => {
    return selectedItems.value.some(i => i.item)
  }

  const updateTabContent = () => {
    gamesTab.value.currentPage = 1
    questionsTab.value.currentPage = 1

    if (activeTab.value === 0) return getGames()
    return getQuizes()
  }

  const sendMission = async id => {
    await enableGuidePlus(id)
  }

  const currentRouteAction = computed(() => {
    return route?.meta?.action
  })

  const currentRouteResource = computed(() => {
    return route?.meta?.resource
  })

  const isDisabledModule = c => {
    if (!currentRouteAction.value || !currentRouteResource.value) return false

    const ability = new Ability([])
    const abilities = getAbilities(store.getters.abilities, c.classId)
    ability.update(abilities)

    return (
      !ability.can(currentRouteAction.value, currentRouteResource.value) ||
      ability.can(ACTION.DISABLED, currentRouteResource.value)
    )
  }
  // endregion

  return {
    filtersLoadingList,
    activeTab,
    loadingMissionPlus,
    openWarningDifferentSubject,

    // region Store Getters and Setters
    module_name,
    missionInfo,
    selectedItems,
    gamesTab,
    questionsTab,
    itemsFilters,
    filtersItems,
    vibratePatterns,
    searchTopic,
    missionPlusEditData,
    ROUND_TYPE,
    preparingToEdit,
    ACTIVITIES_MAX_QTD,
    ACTIVITY_EMPTY,
    resultListQTD,
    // endregion

    // region HTTP Requests
    getSeries,
    getMatrices,
    getThemes,
    getKnowledgeObjects,
    getAbilities: getFilterAbilities,
    getGames,
    getQuizes,
    getGuidePlusDetails,
    createMission,
    updateMission,
    getClasses,
    sendMission,
    // endregion

    // region Utils
    vibrate,
    isMobile,
    updateTabContent,
    selectItem,
    removeItem,
    isItemSelected,

    resumeSelectingItem,
    cancelResumeSelectingItem,
    // endregion
    subjectPending,
    resumeSelectingSubject,
    cancelResumeSelectingSubject,
    someItemsSelected,
  }
}