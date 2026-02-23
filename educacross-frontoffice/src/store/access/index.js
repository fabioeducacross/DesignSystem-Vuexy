/* eslint-disable no-shadow */
import {ModulesEnum} from '@/consts/admin-context/enums/modules.js'
import { getAbilities } from '@/libs/acl/ability'
import axiosIns from '@/libs/axios'
import router from '@/router'
import generateEducationSystemRoutes from '@/router/education-system-routes'
import { getFamilyContextData } from '@/services/shared/account/Account.service'
import { capitalizeKeys } from '@/utils/utils'

const defaultState = () => ({
  token: null,
  refreshToken: null,
  userData: null,
  educationSystems: [],
  educationSystemSubjects: [],
  subjectId: null,
  series: [],
  abilities: [],
  selectedRanking: null,
  moduleSubjects: [],
  serieModulePermissions: {},
  classes: [],
  betaFeature: null,
})

const state = defaultState()

const mutations = {
  loginAccess(state, { token, refreshToken, userData }) {
    state.token = token
    state.refreshToken = refreshToken
    state.userData = userData
  },
  logoutAccess(state) {
    Object.assign(state, defaultState())
  },
  resetLoggedAccess(state) {
    Object.assign(state, defaultState())
  },
  betaFeature(state, payload) {
    state.betaFeature = payload
  },
  educationSystems(state, payload) {
    state.educationSystems = payload
    generateEducationSystemRoutes(router)
  },
  setEducationSystemSubjects(state, payload) {
    state.educationSystemSubjects = payload
  },
  setSubjectId(state, payload) {
    state.subjectId = payload
  },
  setUserDataAccess(state, payload) {
    state.userData = payload
  },
  setSeries(state, payload) {
    state.series = payload
  },
  setAbilities(state, payload) {
    state.abilities = payload
  },
  setUserAccessName(state, payload) {
    if (state.userData) state.userData.Name = payload
  },
  setSelectedRanking(state, payload) {
    state.selectedRanking = payload
  },
  setSerieModulePermissions(state, payload) {
    state.serieModulePermissions = payload
  },
  setModuleSubjects(state, payload) {
    state.moduleSubjects = payload
  },
  setClasses(state, payload) {
    state.classes = payload
  },
}

const getters = {
  abilities: state => state.abilities,
  getAbilities: (state, getters, rootState, rootGetters) => {
    const isTeacher = state.userData?.Role === 'Teacher'
    let classId = null

    if (isTeacher) {
      const { ClassId } = rootGetters['filters/class'] || {}
      classId = ClassId
    }

    return getAbilities(state.abilities, classId)
  },

  getInstituionAbilities: state => {
    return getAbilities(state.abilities, null)
  },

  getModulePermissions: state => state.serieModulePermissions || [],
  accessRole: state => (state.userData ? state.userData.Role : null),
  accessToken: state => state.token,
  accessRefreshToken: state => state.refreshToken,
  accessUserData: state => state.userData || {},
  betaFeature: state => state.betaFeature,
  getEducationSystems: state => state.educationSystems || [],
  educationSystems: (state, getters) => {
    const { educationSystems } = state
    const { selectedModule } = getters
    const globalSubjectId = getters.GET_GLOBAL_SUBJECT_ID

    if (state.userData?.Role !== 'Teacher') {
      const { SerieId } = state.userData
      return educationSystems.filter(item => {
        return item.subjects.some(subject => {
          return subject.serieIds.includes(SerieId)
        })
      })
    }

    if (!educationSystems) return []
    if (!selectedModule) return []

    const hasEducationSystemsPermission = selectedModule.some(
      module => module === ModulesEnum.EducationSystems,
    )

    if (!hasEducationSystemsPermission) return []

    const educationSystemsByModule = educationSystems.filter(educationSystem =>
      educationSystem.subjects.some(subject => subject.subjectId === globalSubjectId),
    )

    return educationSystemsByModule
  },
  selectedModule: (state, getters) => {
    const selectecSubjectId = getters.GET_GLOBAL_SUBJECT_ID
    const { Modules } = getters.accessUserData

    if (!Modules) return []
    if (!selectecSubjectId) return []

    return Modules[selectecSubjectId]
  },
  accessModules: (state, getters) => {
    const { Modules } = getters.accessUserData

    if (!Modules) return {}

    return Modules
  },
  classes: state => {
    return state.classes
  },
  subjects: state => (state.userData ? state.userData.InstitutionSubjects : []),
  selectecSubject(state, getters) {
    return getters.subjects.find(subject => subject.Id === getters.GET_GLOBAL_SUBJECT_ID)
  },
  isImpersonate: state => state.userData?.Impersonate,
  educationSystemSubjects: state => state.educationSystemSubjects,
  subjectId: state => state.subjectId,
  getSeries: state => state.series,
  getInstitutionId: state => (state.userData ? state.userData.InstitutionId : null),
  isEducacross: state => state.userData?.User === 'Educacross',
}

const actions = {
  logoutAccess({ commit, dispatch }) {
    commit('logoutAccess')
    dispatch('resetTeacherContext')
    commit('resetLoggedAccess')
  },

  saveEducationSystemSubjects({ commit }, { educationSystemSubjects }) {
    commit('setEducationSystemSubjects', educationSystemSubjects)
  },
  saveSubjectId({ commit }, { subjectId }) {
    commit('setSubjectId', subjectId)
  },
  setUserAccessNameAction({ commit }, { userAccessName }) {
    commit('setUserAccessName', userAccessName)
  },
  setSelectedRankingAction({ commit }, selectedRanking) {
    commit('setSelectedRanking', selectedRanking)
  },
  async fetchClasses({ commit }) {
    await axiosIns.get('/v1/classes/access').then(res => {
      const { data } = res
      let classes = data || []

      classes = classes.map(item => capitalizeKeys(item))

      classes = [...classes].sort((a, b) => {
        if (a.Name && b.Name) {
          return a.Name.localeCompare(b.Name)
        }
        return 0
      })

      commit('setClasses', classes)
    })
  },
  async fetchStudents({ commit }) {
    const { data } = await getFamilyContextData()

    let students = data || []

    students = students.map(item => capitalizeKeys(item))

    students = [...students].sort((a, b) => {
      if (a.Name && b.Name) {
        return a.Name.localeCompare(b.Name)
      }
      return 0
    })

    commit('filters/students', students)
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}