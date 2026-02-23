import { getEducationalOrganizationsLabels } from '@/services/shared/educationalOrganization/EducationalOrganization.service.js'
import { getEventDetails } from '@/services/shared/events/Events.Service.js'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import sortObjectListByKey from '@/utils/sort'

const detailsDefaults = () => {
  return {
    eventActiveName: '',
    status: null,
    startDate: '',
    endDate: '',
    frequency: null,
  }
}

export default {
  namespaced: true,
  state: {
    details: detailsDefaults(),
    series: [],
    serie: null,
    eventId: null,
    institutionId: null,
    classId: null,
    serieId: null,
    networkGroup: {
      id: null,
      name: 'Todos',
    },
    rankingOrder: true,
    lastUpdate: '',
    loadingEducationalOrganization: true,
    educationalOrganizationsLabels: [],
    selectedEducationalOrganizationLabel: null,
    loadingKnowledgeAxes: true,
    knowledgeAxes: [],
    selectedKnowledgeAxes: { id: null, name: 'Todas' },
  },
  mutations: {
    setEventDetails(state, data) {
      state.details = data
    },
    setLastUpdate(state, data) {
      state.lastUpdate = data
    },
    setEventSeries(state, data) {
      state.series = data
    },
    setEventSerie(state, data) {
      state.serie = data
    },
    setSerieId(state, data) {
      state.serieId = data
      state.classId = null
    },

    setNetworkGroup(state, networkGroup) {
      state.networkGroup = networkGroup
    },
    setInstitutionId(state, institutionId) {
      state.institutionId = institutionId
    },

    setRankingOrder(state, rankingOrder) {
      state.rankingOrder = rankingOrder
    },

    setEventId(state, data) {
      state.eventId = data
    },
    setClassId(state, classId) {
      state.classId = classId
    },
    setLoadingEducationalOrganization(state, loading) {
      state.loadingEducationalOrganization = loading
    },

    setEducationalOrganizationsLabels(state, data) {
      state.educationalOrganizationsLabels = data
    },
    setSelectedEducationalOrganization(state, data) {
      state.selectedEducationalOrganizationLabel = data
    },
    setLoadingKnowledgeAxes(state, loading) {
      state.loadingKnowledgeAxes = loading
    },
    setKnowledgeAxes(state, data) {
      state.knowledgeAxes = data
    },
    setSelectedKnowledgeAxes(state, data) {
      state.selectedKnowledgeAxes = Object.assign(data)
    },

    reset(state) {
      state.details = detailsDefaults()
      state.series = []
      state.eventId = null
      state.institutionId = null
      state.classId = null
      state.serieId = null
      state.serie = null
      state.networkGroup = {
        id: null,
        name: 'Todos',
      }
      state.rankingOrder = true
      state.loadingEducationalOrganization = true
      state.educationalOrganizationsLabels = []
      state.selectedEducationalOrganizationLabel = null
      state.loadingKnowledgeAxes = true
      state.knowledgeAxes = []
      state.selectedKnowledgeAxes = { id: null, name: 'Todas' }
    },
  },
  actions: {
    async fetchDetails({ commit, state }, { eventId, institutionId = null, classId = null }) {
      try {
        if (!eventId) {
          commit('reset')

          return Promise.resolve()
        }
        if (
          eventId === state.eventId &&
          institutionId === state.institutionId &&
          classId === state.classId
        ) {
          return Promise.resolve()
        }
        commit('setEventId', eventId)
        const { data } = await getEventDetails(eventId, { institutionId, classId })
        commit('setEventDetails', data)
        commit('setEventSeries', data.series)

        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    setEventId({ commit }, eventId) {
      commit('setEventId', eventId)
    },
    fetchEducationalOrganizationsLabels({ commit, state, rootGetters }) {
      const params = {
        SubjectId: state.details?.subjectId,
        SerieId: rootGetters['events/serie']?.id,
      }

      commit('setLoadingEducationalOrganization', true)

      getEducationalOrganizationsLabels(params)
        .then(({ data }) => {
          commit('setEducationalOrganizationsLabels', sortObjectListByKey(data, 'name'))
          commit('setSelectedEducationalOrganization', data[0])
        })
        .finally(() => {
          commit('setLoadingEducationalOrganization', false)
        })
    },
    fetchKnowledgeAxes({ commit, rootGetters }) {
      commit('setLoadingKnowledgeAxes', true)

      const params = {
        educationalOrganizationId: rootGetters['events/selectedEducationalOrganizationLabel'].id,
      }

      getKnowledgeaxesFilterOptions(params)
        .then(({ data }) => {
          commit('setKnowledgeAxes', data)
          commit('setSelectedKnowledgeAxes', {
            id: null,
            name: 'Todas',
          })
        })
        .finally(() => {
          commit('setLoadingKnowledgeAxes', false)
        })
    },
    reset({ commit }) {
      commit('reset')
    },
  },
  getters: {
    eventId(state) {
      return state.eventId
    },
    eventDetails(state) {
      return state.details
    },
    eventLastUpdate(state) {
      return state.lastUpdate
    },
    series(state) {
      return state.series
    },
    serie(state) {
      return state.serie
    },
    serieId(state) {
      return state.serieId
    },
    classId(state) {
      return state.classId
    },
    institutionId(state) {
      return state.institutionId
    },
    networkGroup(state) {
      return state.networkGroup
    },
    networkGroupID(state) {
      return state.networkGroup.id || null
    },
    rankingOrder(state) {
      return state.rankingOrder
    },
    educationalOrganizationsLabels(state) {
      return state.educationalOrganizationsLabels
    },
    selectedEducationalOrganizationLabel(state) {
      return state.selectedEducationalOrganizationLabel
    },
    knowledgeAxes(state) {
      return state.knowledgeAxes
    },
    selectedKnowledgeAxes(state) {
      return state.selectedKnowledgeAxes
    },
    loadingKnowledgeAxes(state) {
      return state.loadingKnowledgeAxes
    },
    loadingEducationalOrganization(state) {
      return state.loadingEducationalOrganization
    },
  },
}
