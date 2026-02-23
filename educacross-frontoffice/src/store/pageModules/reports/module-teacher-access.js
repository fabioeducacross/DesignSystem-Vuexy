export default {
  namespaced: true,
  state: {
    networkGroupLoading: true,
    networkGroup: {
      id: null,
      name: 'Todos',
    },
    networkGroups: [],
    institutionList: [{ id: null, name: 'Todas as escolas' }],
    institution: { id: null, name: 'Todas as escolas' },
    moduleList: [],
    moduleId: null,
    educationSystemList: [],
    educationSystem: null,
    month: {
      id: null,
      name: 'Todos os meses',
    },
    loading: true,
    institutionLoading: true,
    moduleLoading: true,
  },
  mutations: {
    setNetworkGroupLoading(state, data) {
      state.networkGroupLoading = data
    },
    setNetworkGroup(state, data) {
      state.networkGroup = data
    },
    setNetworkGroups(state, data) {
      state.networkGroups = data
    },
    setInstitutionList(state, data) {
      state.institutionList = data
    },
    setInstitution(state, data) {
      state.institution = data
    },
    setModuleList(state, data) {
      state.moduleList = data
    },
    setModuleId(state, data) {
      state.moduleId = data
    },
    setEducationSystemList(state, data) {
      state.educationSystemList = data
    },
    setEducationSystem(state, data) {
      state.educationSystem = data
    },
    setMonth(state, data) {
      state.month = data
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setInstitutionLoading(state, loading) {
      state.institutionLoading = loading
    },
    setModuleLoading(state, loading) {
      state.moduleLoading = loading
    },
    reset(state) {
      state.loading = true
      state.institutionLoading = true
      state.moduleLoading = true
    },
  },

  getters: {
    networkGroupLoading(state) {
      return state.networkGroupLoading
    },

    networkGroup(state) {
      return state.networkGroup
    },

    networkGroups(state) {
      return state.networkGroups
    },
    institutionList(state) {
      return state.institutionList
    },
    institution(state) {
      return state.institution
    },
    moduleList(state) {
      return state.moduleList
    },
    moduleId(state) {
      return state.moduleId
    },
    educationSystemList(state) {
      return state.educationSystemList
    },
    educationSystem(state) {
      return state.educationSystem
    },
    month(state) {
      return state.month
    },
    institutionLoading(state) {
      return state.institutionLoading
    },
    moduleLoading(state) {
      return state.moduleLoading
    },
    loading(state) {
      return state.loading
    },
  },
}
