const defaultState = () => {
  return {
    loading: true,
    loadingReport: true,
    loadingModal: false,
    editMode: false,
    proficiencyIndicators: [],
    toastMsg: '',
    status: {
      id: null,
      text: 'Todos os status',
    },
    auditorList: [],
    proficiency: {
      id: null,
      text: 'Todos os níveis de proficiência',
    },
    test: {
      id: null,
      name: 'Todos os testes',
    },
    testOptions: [
      {
        id: null,
        name: 'Todos os testes',
      },
    ],
    params: {
      Search: '',
      OrderBy: null,
      Page: 1,
      PageSize: 10,
      Ascending: 'true',
      ClassId: null,
    },

    pagination: {
      totalData: 1,
    },
    students: [],
    institutions: [],
    institutionId: null,
    proficiencies: [],
    readings: [],
    readingsTest: [],
    readingsTestReport: {},
    readingFluencyEvaluation: {},
    readingDetail: {
      report: {},
      test: {},
      indicators: [],
      studentsQueue: [],
    },
    typeTest: {
      type: '',
      name: '',
    },
    isTeacher: false,
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    loading(state, value) {
      state.loading = value
    },
    loadingReport(state, value) {
      state.loadingReport = value
    },
    auditorList(state, payload) {
      state.auditorList = payload
    },
    editMode(state, payload) {
      state.editMode = payload
    },
    loadingModal(state, value) {
      state.loadingModal = value
    },
    proficiencyIndicators(state, value) {
      state.proficiencyIndicators = value
    },
    toastMsg(state, value) {
      state.toastMsg = value
    },
    readings(state, value) {
      state.readings = value
    },
    readingDetail(state, value) {
      state.readingDetail = value
    },
    typeTest(state, value) {
      state.typeTest = value
    },
    readingsTest(state, value) {
      state.readingsTest = value
    },
    readingsTestReport(state, value) {
      state.readingsTestReport = value
    },
    readingFluencyEvaluation(state, value) {
      state.readingFluencyEvaluation = value
    },
    test(state, value) {
      state.test = value
    },
    testOptions(state, value) {
      state.testOptions = value
    },
    students(state, value) {
      state.students = value
    },
    institutions(state, value) {
      state.institutions = value
    },
    institutionId(state, value) {
      state.institutionId = value
    },
    proficiencies(state, value) {
      state.proficiencies = value
    },
    setStatus(state, status) {
      state.status = status
    },
    setProficiency(state, proficiency) {
      state.proficiency = proficiency
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },
    reset(state) {
      Object.assign(state, defaultState())
    },
    totalData(state, data) {
      state.totalData = data
    },
    isTeacher(state, value) {
      state.isTeacher = value
    },
  },
  getters: {
    readings(state) {
      return state.readings
    },
    auditorList(state) {
      return state.auditorList
    },
    editMode(state) {
      return state.editMode
    },
    readingsTest(state) {
      return state.readingsTest
    },
    readingsTestReport(state) {
      return state.readingsTestReport
    },
    readingDetail(state) {
      return state.readingDetail
    },
    typeTest(state) {
      return state.typeTest
    },
    readingFluencyEvaluation(state) {
      return state.readingFluencyEvaluation
    },
    params(state) {
      return state.params
    },
    totalData(state) {
      return state.totalData
    },
    proficiencyIndicators(state) {
      return state.proficiencyIndicators
    },
    toastMsg: state => state.toastMsg,
    test: state => state.test,
    testOptions: state => state.testOptions,
    students: state => state.students,
    institutions: state => state.institutions,
    proficiencies: state => state.proficiencies,
    status: state => state.status,
    proficiency: state => state.proficiency,
    loading: state => state.loading,
    loadingReport: state => state.loadingReport,
    loadingModal: state => state.loadingModal,
    institutionId: state => state.institutionId,
    isTeacher: state => state.isTeacher,
  },
}
