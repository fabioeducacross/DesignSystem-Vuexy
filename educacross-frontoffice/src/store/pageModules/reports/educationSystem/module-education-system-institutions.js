import { getEducationSystemReporInstitutions } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable'

const { loading, dataTable } = useTable()

const { serie, subject, networkGroup, educationSystemId } = useFilters()

export default {
  namespaced: true,
  state: {
    loading: true,
    educationSystemName: '',
    groups: null,
  },
  mutations: {
    reset(state) {
      state.loading = true
      state.educationSystemName = ''
      state.groups = null
    },
    loading(state, payload) {
      state.loading = payload
    },
    educationSystemName(state, payload) {
      state.educationSystemName = payload
    },
    groups(state, payload) {
      state.groups = payload
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    educationSystemName(state) {
      return state.educationSystemName
    },
    groups(state) {
      return state.groups
    },
  },
  actions: {
    fetch({ commit }) {
      commit('loading', true)

      getEducationSystemReporInstitutions(educationSystemId.value, {
        SubjectId: subject.value.id,
        SerieId: serie.value.id,
        NetworkGroupId: networkGroup.value.id,
      })
        .then(({ data }) => {
          commit('educationSystemName', data.educationSystemName)

          dataTable.value = data.institutions
        })
        .catch(() => {
          dataTable.value = []
        })
        .finally(() => {
          loading.value = false
          commit('loading', false)
        })
    },
  },
}
