const defaultState = () => {
  return {
    subjects: [],
    subject: {},
    institution: {},
    serie: {},
    evaluationId: null,
    loading: true,
    students: [],
    student: {},
    networkGroup: {},
    period: {},
    book: {},
    mission: {},
    parentModule: {},
    childModule: null,
  }
}

export default {
  namespaced: true,
  state: { class: {}, ...defaultState() },
  mutations: {
    subjects(state, payload) {
      state.subjects = payload
    },
    subject(state, payload) {
      state.subject = payload
    },
    institution(state, payload) {
      state.institution = payload
    },
    serie(state, payload) {
      state.serie = payload
    },
    class(state, payload) {
      state.class = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    evaluationId(state, payload) {
      state.evaluationId = payload
    },
    students(state, payload) {
      state.students = payload
    },
    student(state, payload) {
      state.student = payload
    },
    networkGroup(state, payload) {
      state.networkGroup = payload
    },
    period(state, payload) {
      state.period = payload
    },
    book(state, payload) {
      state.book = payload
    },
    mission(state, payload) {
      state.mission = payload
    },
    parentModule(state, payload) {
      state.parentModule = payload
    },
    childModule(state, payload) {
      state.childModule = payload
    },
  },
  getters: {
    subjects: state => state.subjects,
    subject: state => state.subject,
    institution: state => state.institution,
    serie: state => state.serie,
    class: state => state.class,
    loading: state => state.loading,
    evaluationId: state => state.evaluationId,
    students: state => state.students,
    student: state => state.student,
    networkGroup: state => state.networkGroup,
    period: state => state.period,
    book: state => state.book,
    mission: state => state.mission,
    parentModule: state => state.parentModule,
    childModule: state => state.childModule,
  },
  actions: {
    reset({ rootGetters, state }) {
      return new Promise(resolve => {
        if (rootGetters.accessRole !== 'Teacher') {
          state.class = {}
        }
        Object.assign(state, defaultState())
        resolve()
      })
    },
  },
}
