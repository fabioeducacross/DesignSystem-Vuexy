import { EGuideSituation } from '@/consts/missionsEnum.js'
import { getGuidesPlusByClass } from '@/services/teacher-context/guides/Guides.Service'

const defaultParams = () => {
  return {
    perPage: 10,
    currentPage: 1,
    sortBy: null,
    isSortDirDesc: true,
    searchQuery: null,
  }
}

export default {
  namespaced: true,
  state: {
    selectedMissions: {
      value: [],
      batchAction: 1,
    },
    missionStatus: { id: null, label: 'Todas' },
    missionGroup: { id: null, label: 'Todos' },
    ascending: false,
    missions: [],
    loading: true,
    totalData: 0,
    params: defaultParams(),
  },
  mutations: {
    selectedMissions(state, data) {
      state.selectedMissions = data
    },
    missionStatus(state, data) {
      state.missionStatus = data
    },
    missionGroup(state, data) {
      state.missionGroup = data
    },
    currentPage(state, data) {
      state.params.currentPage = data
    },
    isSortDirDesc(state, data) {
      state.params.isSortDirDesc = data
    },
    missions(state, data) {
      state.missions = data.map(item => {
        return {
          ...item,
          disableSelect:
            item.situation !== EGuideSituation.Finished &&
            item.situation !== EGuideSituation.Cancelled,
        }
      })
    },
    perPage(state, data) {
      state.params.perPage = data
    },
    totalData(state, data) {
      state.totalData = data
    },
    loading(state, data) {
      state.loading = data
    },
    params(state, data) {
      Object.assign(state.params, data)
    },
    reset(state) {
      state.selectedMissions = {
        value: [],
        batchAction: 1,
      }
      state.missionStatus = { id: null, label: 'Todas' }
      state.missionGroup = { id: null, label: 'Todos' }
      state.ascending = false
      state.missions = []
      state.loading = true
      state.totalData = 0
      state.params = defaultParams()
    },
  },
  getters: {
    selectedMissions(state) {
      return state.selectedMissions
    },
    missionStatus(state) {
      return state.missionStatus
    },
    missionGroup(state) {
      return state.missionGroup
    },
    currentPage(state) {
      return state.params.currentPage
    },
    isSortDirDesc(state) {
      return state.params.isSortDirDesc
    },
    missions(state) {
      return state.missions
    },
    perPage(state) {
      return state.params.perPage
    },
    totalData(state) {
      return state.totalData
    },
    loading(state) {
      return state.loading
    },
    params(state) {
      return state.params
    },
  },
  actions: {
    async fetchData({ commit, state, rootGetters }) {
      commit('loading', true)
      const classId = rootGetters['filters/class']?.ClassId
      const subjectId = rootGetters['filters/subject']?.id

      const params = state.params

      const situation =
        typeof state.missionStatus.id === 'number' ? `${state.missionStatus.id}` : ''

      const filters = {
        subjectId,
        situation,
        Page: params.currentPage,
        PageSize: params.perPage,
        OrderBy: params.sortBy,
        Ascending: params.isSortDirDesc,
        Search: params.searchQuery,
        Filed: false,
      }

      const response = await getGuidesPlusByClass(classId, filters)

      const { data } = response

      commit('totalData', data.total || 0)

      let missions = data.data || []

      missions = missions.map(mission => {
        return {
          ...mission,
          guideLinkUrl: mission.guideLinkUrl
            ? import.meta.env.VITE_APP_DEEPLINK_URL + mission.guideLinkUrl
            : mission.guideLinkUrl,
        }
      })

      commit('missions', missions)
      commit('loading', false)
    },
  },
}
