import { getSeries } from '@/services/shared/serie/Serie.Service'
import { getSharedGuides } from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters.js'

const { classe } = useFilters()

export default {
  namespaced: true,
  state: {
    sharedTypeOptions: [
      { name: 'Todos', id: 0 },
      { name: 'Somente Eu', id: 1 },
      { name: 'Minha Escola', id: 2 },
      { name: 'Minha Rede Escolar', id: 3 },
    ],
    selectedMissionType: { name: 'Todos', id: 0 },
    loadingSchoolYearData: true,
    schoolYearOptions: [],
    selectedSchoolYear: { name: 'Todos', id: null },
    searchQuery: '',
    loadingSharedMissions: true,
    sharedMissions: [],
    currentPage: 1,
    pageSize: 10,
    totalData: 0,
  },
  mutations: {
    setSelectedMissionType(state, data) {
      state.selectedMissionType = data
    },
    setLoadingSchoolYearData(state, data) {
      state.loadingSchoolYearData = data
    },
    setSchoolYearOptions(state, data) {
      state.schoolYearOptions = data
      state.schoolYearOptions.unshift({ name: 'Todos', id: null })
    },
    setSelectedSchoolYear(state, data) {
      state.selectedSchoolYear = data
    },
    setSearchQuery(state, data) {
      state.searchQuery = data
    },
    setLoadingSharedMissions(state, data) {
      state.loadingSharedMissions = data
    },
    setSharedMissions(state, data) {
      state.sharedMissions = data
    },
    setCurrentPage(state, data) {
      state.currentPage = data
    },
    setPageSize(state, data) {
      state.pageSize = data
    },
    setTotalData(state, data) {
      state.totalData = data
    },
  },
  actions: {
    async fetchSchoolYearData({ commit, rootGetters }) {
      commit('setLoadingSchoolYearData', true)
      const subjectId = rootGetters['filters/subject']?.id
      const response = await getSeries({
        subjects: subjectId,
        page: 1,
      })

      const { data } = response
      commit('setSchoolYearOptions', data.data)
      commit('setLoadingSchoolYearData', false)
    },
    async fetchSharedMissions({ commit, state, rootGetters }) {
      commit('setLoadingSharedMissions', true)

      const filters = {}

      if (state.selectedMissionType.id) {
        filters.sharedTypeId = state.selectedMissionType.id
      }

      if (state.selectedSchoolYear.id) {
        filters.serieId = state.selectedSchoolYear.id
      }

      if (state.searchQuery) {
        filters.searchTerm = state.searchQuery
      }

      await getSharedGuides({
        classId: classe.value?.ClassId,
        subjectId: rootGetters['filters/subject']?.id,
        page: state.currentPage,
        pageSize: state.pageSize,
        ...filters,
      })
        .then(response => {
          const { data } = response
          commit('setSharedMissions', data.data)
          state.sharedMissions.forEach(element => {
            element.guideType = 'shared'
          })
          commit('setTotalData', data.total)
        })
        .finally(() => {
          state.loadingSharedMissions = false
        })
    },
  },
  getters: {
    sharedTypeOptions(state) {
      return state.sharedTypeOptions
    },
    selectedMissionType(state) {
      return state.selectedMissionType
    },
    schoolYearOptions(state) {
      return state.schoolYearOptions
    },
    selectedSchoolYear(state) {
      return state.selectedSchoolYear
    },
    loadingSchoolYearData(state) {
      return state.loadingSchoolYearData
    },
    searchQuery(state) {
      return state.searchQuery
    },
    loadingSharedMissions(state) {
      return state.loadingSharedMissions
    },
    sharedMissions(state) {
      return state.sharedMissions
    },
    separetedMissionsBySerie(state) {
      return state.separetedSharedMissions
    },
    currentPage(state) {
      return state.currentPage
    },
    perPage(state) {
      return state.pageSize
    },
    totalData(state) {
      return state.totalData
    },
  },
}
