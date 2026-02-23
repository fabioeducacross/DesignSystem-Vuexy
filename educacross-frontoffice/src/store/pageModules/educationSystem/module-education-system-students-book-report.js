import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { getEducationSystemReporBooksContent } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { getEducationSystemBookDetails } from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import useFilters from '@/store/filters/useFilters'

const { book, serie, classe, period, educationSystemId, institution, subject, subjects } =
  useFilters()

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
    bookName: '',
    subjectId: null,
    serieId: null,
    educationSystemName: '',
    student: {
      id: null,
      name: 'Todos os alunos',
    },
    tableStrongWeak: {
      descriptorsStrong: [],
      descriptorsToImprove: [],
    },
    rounds: [],
    exhibition: 0,
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
    loading(state, payload) {
      state.loading = payload
    },
    bookName(state, payload) {
      state.bookName = payload
    },
    subjectId(state, payload) {
      state.subjectId = payload
    },
    serieId(state, payload) {
      state.serieId = payload
    },
    educationSystemName(state, payload) {
      state.educationSystemName = payload
    },
    student(state, payload) {
      state.student = payload
    },

    reset(state) {
      state.loading = true
      state.bookName = ''
      state.subjectId = null
      state.serieId = null
      state.educationSystemName = ''

      state.tableStrongWeak = {
        descriptorsStrong: [],
        descriptorsToImprove: [],
      }
      state.rounds = []
      state.exhibition = 0
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
    bookName(state) {
      return state.bookName
    },
    subjectId(state) {
      return state.subjectId
    },
    serieId(state) {
      return state.serieId
    },
    educationSystemName(state) {
      return state.educationSystemName
    },
    student(state) {
      return state.student
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
    fetchDetails({ commit }) {
      return getEducationSystemBookDetails(educationSystemId.value, book.value.id).then(
        ({ data }) => {
          commit('bookName', data.bookName)
          commit('subjectId', data.subjectId)
          commit('serieId', data.serieId)
          commit('educationSystemName', data.educationSystemName)

          subject.value = subjects.value.find(({ id }) => id === data.subjectId)
        },
      )
    },

    fetch({ commit, state }) {
      if (!subject.value.id) return
      commit('loading', true)

      getEducationSystemReporBooksContent(educationSystemId.value, {
        BookId: book.value.id,
        SubjectId: state.subjectId,
        ByTopic: !!state.exhibition,
        HideUnworked: `${state.hideUnworked}`,
        SerieId: serie.value.id,
        EducationalOrganizationId: state.educationalOrganization.id,
        ThematicId: state.knowledgeAxe.id,
        ClassId: classe.value.ClassId,
        Month: period.value.id,
        InstitutionId: institution.value.id,
        StudentId: state.student.id,
        ...state.params,
      })
        .then(({ data }) => {
          if (classe.value.id) {
            classe.value = { id: classe.value.id, name: data.className }
          }
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
                    /* educationalOrganizationName */
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
