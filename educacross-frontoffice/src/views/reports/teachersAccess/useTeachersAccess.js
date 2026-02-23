import { getEducationSystemInfo } from '@/services/shared/educationSystem/EducationSystem.Service'
import {
  getInstitutions,
  getInstitutionsModules,
} from '@/services/shared/institution/Institutions.Service'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import store from '@/store'
import { computed } from 'vue'

export function useTeachersAccess() {
  const networkGroupLoading = computed(
    () => store.getters['moduleTeacherAccess/networkGroupLoading'],
  )
  const networkGroup = computed(() => store.getters['moduleTeacherAccess/networkGroup'])

  const networkGroups = computed(() => store.getters['moduleTeacherAccess/networkGroups'])

  function setNetworkGroup(networkGroup) {
    store.commit('moduleTeacherAccess/setNetworkGroup', networkGroup)
  }

  function getNetworkGroupsList() {
    store.commit('moduleTeacherAccess/setNetworkGroupLoading', true)
    store.commit('moduleTeacherAccess/setNetworkGroup', {
      id: null,
      name: 'Todos',
    })

    getNetworkGroups()
      .then(response => {
        store.commit('moduleTeacherAccess/setNetworkGroups', [
          { id: null, name: 'Todos' },
          ...response.data,
        ])
      })
      .finally(() => {
        store.commit('moduleTeacherAccess/setNetworkGroupLoading', false)
      })
  }

  const institution = computed(() => store.getters['moduleTeacherAccess/institution'])

  function setInstitution(institution) {
    store.commit('moduleTeacherAccess/setInstitution', institution)
  }

  function getInstitutionsList() {
    store.commit('moduleTeacherAccess/setInstitutionLoading', true)
    store.commit('moduleTeacherAccess/setInstitution', { id: null, name: 'Todas as escolas' })
    return getInstitutions({
      NetworkGroupId: networkGroup.value.id,
    }).then(response => {
      store.commit('moduleTeacherAccess/setInstitutionList', [
        { id: null, name: 'Todas as escolas' },
        ...response.data,
      ])
      store.commit('moduleTeacherAccess/setInstitutionLoading', false)
    })
  }

  const institutionList = computed(() => store.getters['moduleTeacherAccess/institutionList'])

  const institutionLoading = computed(() => store.getters['moduleTeacherAccess/institutionLoading'])

  const moduleId = computed(() => store.getters['moduleTeacherAccess/moduleId'])

  function setModuleId(moduleId) {
    store.commit('moduleTeacherAccess/setModuleId', moduleId)
  }

  function typeOptions(type) {
    const types = {
      1: {
        id: 1,
        name: 'Missões da Escola',
      },
      11: {
        id: 11,
        name: 'Sistema de Ensino',
      },
    }
    return types[type]
  }

  async function getInstitutionsModulesList(institutionId) {
    store.commit('moduleTeacherAccess/setModuleLoading', true)
    store.commit('moduleTeacherAccess/setModuleId', null)
    const response = await getInstitutionsModules(institutionId)
    const modules = []
    response.data.forEach(item => {
      modules.push(...item.modules)
    })
    const modulesList = modules
      .filter((item, index) => modules.indexOf(item) >= index)
      .filter(module => typeOptions(module))
      .map(module => typeOptions(module))

    store.commit('moduleTeacherAccess/setModuleList', modulesList)
    store.commit('moduleTeacherAccess/setModuleId', modulesList.length ? modulesList[0] : null)
    store.commit('moduleTeacherAccess/setModuleLoading', false)
  }

  const moduleList = computed(() => store.getters['moduleTeacherAccess/moduleList'])

  const educationSystem = computed(() => store.getters['moduleTeacherAccess/educationSystem'])

  function setEducationSystem(educationSystemId) {
    store.commit('moduleTeacherAccess/setEducationSystem', educationSystemId)
  }

  async function getInstitutionsEducationSystemList(institutionId) {
    const response = await getEducationSystemInfo({ InstitutionId: institutionId })

    const educationSystemList = response.data || []

    store.commit('moduleTeacherAccess/setEducationSystemList', educationSystemList)
    store.commit(
      'moduleTeacherAccess/setEducationSystem',
      educationSystemList.length ? educationSystemList[0] : null,
    )
  }

  const educationSystemList = computed(
    () => store.getters['moduleTeacherAccess/educationSystemList'],
  )

  const month = computed(() => store.getters['moduleTeacherAccess/month'])

  function setMonth(month) {
    store.commit('moduleTeacherAccess/setMonth', month)
  }

  const moduleLoading = computed(() => store.getters['moduleTeacherAccess/moduleLoading'])

  function setModuleLoading(value) {
    store.commit('moduleTeacherAccess/setModuleLoading', value)
  }

  return {
    networkGroupLoading,
    networkGroup,
    networkGroups,
    setNetworkGroup,
    getNetworkGroupsList,
    institution,
    setInstitution,
    getInstitutionsList,
    institutionList,
    moduleId,
    setModuleId,
    getInstitutionsModulesList,
    moduleList,
    month,
    setMonth,
    educationSystem,
    setEducationSystem,
    getInstitutionsEducationSystemList,
    educationSystemList,
    moduleLoading,
    setModuleLoading,
    institutionLoading,
  }
}