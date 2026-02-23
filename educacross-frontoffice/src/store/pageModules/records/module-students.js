import Vue from 'vue'

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

const defaultState = () => {
  return {
    studentsList: [],
    total: 0,
    totalLicenses: null,
    usedLicenses: null,
    params: defaultParams(),
    loading: true,
    selectedStudents: {
      value: [],
      batchAction: 1,
    },
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    studentsList(state, data) {
      state.studentsList = data
    },
    total(state, total) {
      state.total = total
    },
    loading(state, loading) {
      state.loading = loading
    },
    params(state, params) {
      Object.assign(state.params, params)
    },
    reset(state) {
      Object.assign(state, defaultState())
    },
    selectedStudents(state, selectedStudents) {
      Vue.set(state, 'selectedStudents', selectedStudents)
    },
    totalLicenses(state, totalLicenses) {
      state.totalLicenses = totalLicenses
    },
    usedLicenses(state, usedLicenses) {
      state.usedLicenses = usedLicenses
    },
  },
  getters: {
    studentsList(state) {
      return state.studentsList
    },
    total(state) {
      return state.total
    },
    loading(state) {
      return state.loading
    },
    selectedStudents(state) {
      return state.selectedStudents
    },
    totalLicenses(state) {
      return state.totalLicenses
    },
    usedLicenses(state) {
      return state.usedLicenses
    },
    params(state) {
      return state.params
    },
  },
}
