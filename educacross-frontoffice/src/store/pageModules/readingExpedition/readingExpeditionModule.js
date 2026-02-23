import {
  getReadingExpeditionStudentsPassport,
  getReadingFluencyTests,
  getReadingUnits,
} from '@/services/shared/reading-expedition/reading-expedition.service.js'
import useFilters from '@/store/filters/useFilters'

const { classe } = useFilters()

export default {
  namespaced: true,
  state: {
    loading: true,
    testId: null,
    unitId: null,
    tests: [],
    units: [],
    engagementOverview: [],
    loadingPassport: true,
    passport: {},
    studentName: '',
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    testId(state, testId) {
      state.testId = testId
    },
    unitId(state, unitId) {
      state.unitId = unitId
    },
    tests(state, tests) {
      state.tests = tests
    },
    units(state, units) {
      state.units = units
    },
    loadingPassport(state, data) {
      state.loadingPassport = data
    },

    passport(state, data) {
      state.passport = data
    },
    studentName(state, data) {
      state.studentName = data
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    tests(state) {
      return state.tests
    },
    units(state) {
      return state.units
    },
    unitId(state) {
      return state.unitId
    },
    testId(state) {
      return state.testId
    },
    test(state) {
      return state.tests.find(test => test.id === state.testId)
    },
    unit(state) {
      return state.units.find(unit => unit.stage === state.unitId)
    },
    currentTestClass(state) {
      if (!state.testId || state.tests.length === 0) {
        return ''
      }
      const index = state.tests.findIndex(test => test.id === state.testId)
      if (index === 0) {
        return 'border-top-left-radius-0'
      }

      if (index === state.tests.length - 1) {
        return 'border-top-right-radius-0'
      }

      return ''
    },
    currentUnitClass(state) {
      if (!state.unitId || state.units.length === 0) {
        return ''
      }
      const index = state.units.findIndex(test => test.id === state.unitId)
      if (index === 0) {
        return 'border-top-left-radius-0'
      }

      if (index === state.units.length - 1) {
        return 'border-top-right-radius-0'
      }

      return ''
    },
    loadingPassport(state) {
      return state.loadingPassport
    },
    passport(state) {
      return state.passport
    },
    passportTableColumns() {},
    studentName(state) {
      return state.studentName
    },
  },
  actions: {
    async fetchTests({ commit }, studentId) {
      commit('testId', null)
      getReadingFluencyTests({ ClassId: classe.value.ClassId, StudentId: studentId }).then(
        response => {
          if (response.status === 204) {
            commit('tests', [])
            commit('loading', false)
            return
          }
          commit('tests', [
            {
              id: 1,
              test: 'Teste de Fluência Inicial',
              testName: response.data.initialReadingFluencyTestName,
              serieName: response.data.initialReadingFluencyTestSerieName,
              bookImageUrl: 'https://blob.educacross.com.br/reading-fluency/tests/default.svg',
            },
            {
              id: 6,
              test: 'Teste de Fluência Final',
              testName: response.data.finalReadingFluencyTestName,
              serieName: response.data.finalReadingFluencyTestSerieName,
              bookImageUrl: 'https://blob.educacross.com.br/reading-fluency/tests/default.svg',
              enabled: response.data.finalReadingFluencyEnabled,
              studentFinish: response.data.studentFinish,
            },
          ])
          commit('loading', false)
        },
      )
    },
    async fetchUnits({ commit }, studentId) {
      commit('unitId', null)

      getReadingUnits({ ClassId: classe.value.ClassId, StudentId: studentId }).then(({ data }) => {
        commit('units', data)
        commit('loading', false)
      })
    },

    async fetchStudentPassport({ commit }, studentId) {
      commit('loadingPassport', true)
      return new Promise((resolve, reject) => {
        getReadingExpeditionStudentsPassport(studentId)
          .then(response => {
            commit('passport', response.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {
            commit('loadingPassport', false)
          })
      })
    },
    reset({ commit }) {
      commit('tests', [])
      commit('units', [])
      commit('testId', null)
      commit('unitId', null)
      commit('loading', true)
    },
  },
}
