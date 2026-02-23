import { getData } from '@/services/admin-context/components/select.service'
import store from '@/store'
import { computed } from 'vue'

export function useEducationSystemBookReportNetworkManager() {
  const module_name = 'EducationSystemBookReport'

  const loading = computed({
    get: () => store.getters[`${module_name}/loading`],
    set: value => store.commit(`${module_name}/loading`, value),
  })

  const tableStrongWeak = computed({
    get: () => store.getters[`${module_name}/tableStrongWeak`],
    set: value => store.commit(`${module_name}/tableStrongWeak`, value),
  })

  const rounds = computed({
    get: () => store.getters[`${module_name}/rounds`],
    set: value => store.commit(`${module_name}/rounds`, value),
  })

  const exhibition = computed({
    get: () => store.getters[`${module_name}/exhibition`],
    set: value => store.commit(`${module_name}/exhibition`, value),
  })

  const perPage = computed({
    get: () => {
      const data = store.getters[`${module_name}/perPage`]
      return {
        id: data,
        name: data,
      }
    },
    set: value => store.commit(`${module_name}/perPage`, value.id),
  })

  const total = computed({
    get: () => store.getters[`${module_name}/total`],
    set: value => store.commit(`${module_name}/total`, value),
  })

  const currentPage = computed({
    get: () => store.getters[`${module_name}/currentPage`],
    set: value => store.commit(`${module_name}/currentPage`, value),
  })

  const search = computed({
    get: () => store.getters[`${module_name}/search`],
    set: value => store.commit(`${module_name}/search`, value),
  })

  const fetch = () => {
    store.dispatch(`${module_name}/fetch`)
  }
  const resetAndfetch = () => {
    currentPage.value = 1
    store.dispatch(`${module_name}/fetch`)
  }

  const fetchDetails = () => {
    store.dispatch(`${module_name}/fetchDetails`)
  }

  const knowledgeAxe = computed({
    get: () => store.getters[`${module_name}/knowledgeAxe`],
    set: value => store.commit(`${module_name}/knowledgeAxe`, value),
  })

  const educationalOrganization = computed({
    get: () => store.getters[`${module_name}/educationalOrganization`],
    set: value => store.commit(`${module_name}/educationalOrganization`, value),
  })

  const orderBy = computed({
    get: () => store.getters[`${module_name}/orderBy`],
    set: value => store.commit(`${module_name}/orderBy`, value),
  })

  const orderByDescription = computed({
    get: () => store.getters[`${module_name}/orderByDescription`],
    set: value => store.commit(`${module_name}/orderByDescription`, value),
  })

  const paramsOrderBy = computed({
    get: () => store.getters[`${module_name}/paramsOrderBy`],
    set: value => store.commit(`${module_name}/paramsOrderBy`, value),
  })

  const ascending = computed({
    get: () => store.getters[`${module_name}/ascending`],
    set: value => store.commit(`${module_name}/ascending`, value),
  })

  const hideUnworked = computed({
    get: () => store.getters[`${module_name}/hideUnworked`],
    set: value => store.commit(`${module_name}/hideUnworked`, value),
  })

  const bookName = computed({
    get: () => store.getters[`${module_name}/bookName`],
    set: value => store.commit(`${module_name}/bookName`, value),
  })

  const subjectId = computed({
    get: () => store.getters[`${module_name}/subjectId`],
    set: value => store.commit(`${module_name}/subjectId`, value),
  })

  const serieId = computed({
    get: () => store.getters[`${module_name}/serieId`],
    set: value => store.commit(`${module_name}/serieId`, value),
  })

  const educationSystemName = computed({
    get: () => store.getters[`${module_name}/educationSystemName`],
    set: value => store.commit(`${module_name}/educationSystemName`, value),
  })

  const group = computed({
    get: () => store.getters[`${module_name}/group`],
    set: value => store.commit(`${module_name}/group`, value),
  })

  const school = computed({
    get: () => store.getters[`${module_name}/school`],
    set: value => store.commit(`${module_name}/school`, value),
  })

  return {
    module_name,
    loading,
    bookName,
    subjectId,
    serieId,
    educationSystemName,
    tableStrongWeak,
    rounds,
    getData,
    exhibition,
    resetAndfetch,
    fetchDetails,
    fetch,
    total,
    currentPage,
    perPage,
    search,
    knowledgeAxe,
    educationalOrganization,
    orderBy,
    orderByDescription,
    ascending,
    paramsOrderBy,
    hideUnworked,
    group,
    school,
  }
}