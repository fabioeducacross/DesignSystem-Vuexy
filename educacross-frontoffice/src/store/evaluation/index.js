import useFilters from '../filters/useFilters'
import { getEvaluationDetails } from '@/services/shared/evaluations/Evaluation.Service'

const { subjects } = useFilters()

export default {
  namespaced: true,
  state() {
    return {
      details: {},
      exames: [],
      series: [],
      evaluationId: null,
      institutionId: null,
      classId: null,
      institutionName: '',
      className: '',
      evaluationName: '',
      lastUpdate: '',
      subjectId: null,
      networkGroups: [],
    }
  },
  mutations: {
    setEvaluationDetails(state, data) {
      state.details = data
    },
    setEvaluationSeries(state, data) {
      state.series = data
    },
    setEvaluationExames(state, data) {
      state.exames = data
    },
    setInstitutionName(state, data) {
      state.institutionName = data
    },
    setClassName(state, data) {
      state.className = data
    },
    setEvaluationName(state, data) {
      state.evaluationName = data
    },
    setEvaluationParams(state, { evaluationId, institutionId = null, classId = null }) {
      state.evaluationId = evaluationId
      state.institutionId = institutionId
      state.classId = classId
    },
    setLastUpdate(state, data) {
      state.lastUpdate = data
    },
    setSubjectId(state, data) {
      state.subjectId = data
    },
    setNetworkGroups(state, data) {
      state.networkGroups = data
    },
  },
  actions: {
    setEvaluationData({ commit, state }, { evaluationId, institutionId = null, classId = null }) {
      return new Promise((resolve, reject) => {
        try {
          if (!evaluationId) {
            return
          }
          if (
            evaluationId === state.evaluationId &&
            institutionId === state.institutionId &&
            classId === state.classId
          ) {
            resolve()
          }
          commit('setEvaluationParams', { evaluationId, institutionId, classId })

          getEvaluationDetails(state.evaluationId, {
            InstitutionId: state.institutionId,
            ClassId: state.classId,
          })
            .then(({ data }) => {
              commit('setEvaluationDetails', data)
              commit('setEvaluationExames', data.subjects)
              commit('setEvaluationSeries', data.series)
              commit('setInstitutionName', data.institutionName)
              commit('setClassName', data.className)
              commit('setEvaluationName', data.evaluationName)
              subjects.value = data.subjects

              resolve()
            })
            .catch(error => {
              reject(error)
            })
        } catch (error) {}
      })
    },
    setLastUpdate({ commit }, lastUpdate) {
      commit('setLastUpdate', lastUpdate)
    },
  },
  getters: {
    evaluationDetails(state) {
      return state.details
    },
    exames(state) {
      return state.exames
    },
    series(state) {
      return state.series
    },
    institutionName(state) {
      return state.institutionName
    },
    className(state) {
      return state.className
    },
    evaluationName(state) {
      return state.evaluationName
    },
    lastUpdate(state) {
      return state.lastUpdate
    },
    subjectId(state) {
      return state.subjectId
    },
    networkGroups(state) {
      return state.networkGroups
    },
  },
}
