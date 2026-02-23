import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { getGuidesPlusInstitutionsContent } from '@/services/teacher-context/guides/Guides.Service.js'
import useFilters from '@/store/filters/useFilters'

const { serie, period, institution, subject, networkGroup } = useFilters()

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'false',
  }
}

export default {
  namespaced: true,
  state: {
    loading: true,
    tableStrongWeak: {
      descriptorsStrong: [],
      descriptorsToImprove: [],
    },
    rounds: [],
    exhibition: 1,
    hideUnworked: true,
    educationalOrganization: {},
    knowledgeAxe: {
      id: null,
      name: 'Todas as temáticas',
    },
    total: 0,
    params: defaultParams(),
    orderBy: [],
    orderByDescription: {},
  },
  mutations: {
    reset(state) {
      state.loading = true
      state.tableStrongWeak = {
        descriptorsStrong: [],
        descriptorsToImprove: [],
      }
      state.rounds = []
      state.exhibition = 1
      state.hideUnworked = true
      state.educationalOrganization = {}
      state.knowledgeAxe = {
        id: null,
        name: 'Todas as temáticas',
      }
      state.total = 0
      state.params = defaultParams()
      state.orderBy = []
      state.orderByDescription = {}
    },
    loading(state, payload) {
      state.loading = payload
    },

    tableStrongWeak(state, payload) {
      state.tableStrongWeak = payload
    },

    rounds(state, payload) {
      state.rounds = payload
    },

    exhibition(state, payload) {
      state.exhibition = payload
    },

    total(state, payload) {
      state.total = payload
    },
    currentPage(state, payload) {
      state.params.Page = payload
    },
    perPage(state, payload) {
      state.params.PageSize = payload
    },
    paramsOrderBy(state, payload) {
      state.params.OrderBy = payload
    },
    search(state, payload) {
      state.params.Search = payload
    },
    knowledgeAxe(state, payload) {
      state.knowledgeAxe = payload
    },
    educationalOrganization(state, payload) {
      state.educationalOrganization = payload
    },

    orderBy(state, payload) {
      state.orderBy = payload
    },
    orderByDescription(state, payload) {
      state.orderByDescription = payload
    },
    ascending(state, payload) {
      state.params.Ascending = payload
    },

    hideUnworked(state, payload) {
      state.hideUnworked = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },

    tableStrongWeak(state) {
      return state.tableStrongWeak
    },

    rounds(state) {
      return state.rounds
    },

    exhibition(state) {
      return state.exhibition
    },

    total(state) {
      return state.total
    },
    currentPage(state) {
      return state.params.Page
    },
    perPage(state) {
      return state.params.PageSize
    },
    search(state) {
      return state.params.Search
    },
    knowledgeAxe(state) {
      return state.knowledgeAxe
    },
    educationalOrganization(state) {
      return state.educationalOrganization
    },
    paramsOrderBy(state) {
      return state.params.OrderBy
    },
    orderBy(state) {
      return state.orderBy
    },
    orderByDescription(state) {
      return state.orderByDescription
    },
    ascending(state) {
      return state.params.Ascending
    },
    hideUnworked(state) {
      return state.hideUnworked
    },
  },

  actions: {
    fetch({ commit, state }) {
      if (!subject.value.id) return
      commit('loading', true)

      getGuidesPlusInstitutionsContent({
        SubjectId: subject.value.id,
        ByTopic: !!state.exhibition,
        HideUnworked: `${state.hideUnworked}`,
        SerieId: serie.value.id,
        EducationalOrganizationId: state.educationalOrganization.id,
        ThematicId: state.knowledgeAxe.id,
        Month: period.value.id,
        InstitutionId: institution.value.id,
        NetworkGroupId: networkGroup.value.id,
        ...state.params,
      })
        .then(({ data }) => {
          commit('tableStrongWeak', {
            descriptorsStrong: data.contentsStrong.map(item => {
              if (item.descriptor) {
                item.descriptor.tag = item.name
              }
              return item
            }),
            descriptorsToImprove: data.contentsToImprove.map(item => {
              if (item.descriptor) {
                item.descriptor.tag = item.name
              }
              return item
            }),
          })
          commit(
            'rounds',
            data.report?.data.map(item => {
              if (item.descriptor) {
                item.descriptor.tag = item.contentName
              }
              if (state.exhibition) {
                item.descriptors = [
                  {
                    tag: item.contentName,
                    knowledgeAxisName: item.thematicName,
                    knowledgeObject: item.objectOfKnowledgeName,
                    name: item.name,
                  },
                ]
              }
              return {
                ...item,
                imageUrl: item.imageUrl ? item.imageUrl : SubjectEnum[subject.value.id].image,
                subjectId: subject.value.id,
              }
            }) || [],
          )
          commit('total', data.report?.total || 0)
          commit('orderBy', data.report?.orderBy || [])
          commit('orderByDescription', data.report?.orderByDescription || [])
        })
        .finally(() => {
          commit('loading', false)
        })
    },
  },
}
