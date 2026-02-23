import axiosIns from '@/libs/axios'
import {
  getBooksLibrary,
  getEnableDisableAudio,
  putEnableDisableAudio,
} from '@/services/teacher-context/books/BookLibrary.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { computed, ref, set } from 'vue'

const { classe } = useFilters()

const f = [1, 2, 3, 4, 5]

const enableBookAudio = ref(false)
const loadingBookAudio = ref(true)

export function useMeetBooks() {
  // ############################### VARIABLES #################################

  const dataTable = computed({
    get() {
      return store.getters['moduleLibrayBooks/dataTable']
    },
    set(value) {
      store.commit('moduleLibrayBooks/dataTable', value)
    },
  })

  const filters = computed({
    get() {
      return store.getters['moduleLibrayBooks/filters']
    },

    set(value) {
      store.commit('moduleLibrayBooks/filters', value)
    },
  })

  const pageSize = computed({
    get() {
      return store.getters['moduleLibrayBooks/pageSize']
    },
    set(value) {
      store.commit('moduleLibrayBooks/pageSize', value)
    },
  })

  const checkedItems = computed({
    get() {
      return store.getters['moduleLibrayBooks/checkedItems']
    },
    set(value) {
      store.commit('moduleLibrayBooks/checkedItems', value)
    },
  })

  const currentPage = computed({
    get() {
      return store.getters['moduleLibrayBooks/currentPage']
    },
    set(value) {
      store.commit('moduleLibrayBooks/currentPage', value)
    },
  })

  const selectAll = computed({
    get() {
      return store.getters['moduleLibrayBooks/selectAll']
    },
    set(value) {
      store.commit('moduleLibrayBooks/selectAll', value)
    },
  })

  const enabled = computed({
    get() {
      return store.getters['moduleLibrayBooks/filterByEnabled']
    },

    set(value) {
      store.commit('moduleLibrayBooks/filterByEnabled', value)
    },
  })

  const params = computed({
    get() {
      return store.getters['moduleLibrayBooks/params']
    },

    set(value) {
      store.commit('moduleLibrayBooks/params', value)
    },
  })

  const onlyName = computed({
    get() {
      return store.getters['moduleLibrayBooks/onlyName']
    },

    set(value) {
      store.commit('moduleLibrayBooks/onlyName', value)
    },
  })

  const isLoading = computed({
    get() {
      return store.getters['moduleLibrayBooks/loading']
    },

    set(value) {
      store.commit('moduleLibrayBooks/loading', value)
    },
  })

  const totalData = computed({
    get() {
      return store.getters['moduleLibrayBooks/totalData']
    },

    set(value) {
      store.commit('moduleLibrayBooks/totalData', value)
    },
  })

  const filtersOptions = computed({
    get() {
      return store.getters['moduleLibrayBooks/filtersOptions']
    },
    set(value) {
      store.commit('moduleLibrayBooks/filtersOptions', value)
    },
  })

  const searchQuery = computed({
    get() {
      return store.getters['moduleLibrayBooks/search']
    },
    set(value) {
      store.commit('moduleLibrayBooks/search', value)
    },
  })

  const disableMassActions = computed(() => checkedItems.value.length <= 1 && !selectAll.value)
  const indeterminate = computed(() => checkedItems.value.length > 0 && !selectAll.value)

  const loadingFilter = ref(true)

  // ############################### END VARIABLES #############################

  // ############################### FUNCTIONS #################################
  const resetFilters = () => {
    for (let index = 0; index < f.length; index++) {
      filtersOptions.value[index].length = 0
      filters.value[index].length = 0
    }
  }

  // Fetch filter options
  const fetchFilterOptions = async (filter, serieId) => {
    const p = { filter, serieId }
    return axiosIns.get('/v2/book-library/filters', { params: p })
  }

  const fetchFilters = async SerieId => {
    loadingFilter.value = true

    const responses = await Promise.all(
      f.map(filter => fetchFilterOptions(filter, SerieId).then(r => r.data)),
    )

    responses.forEach((response, index) => {
      filtersOptions.value[index].push(...response.map(r => ({ name: r })))
      filters.value[index].push(...filtersOptions.value[index])
    })

    loadingFilter.value = false
  }

  const getFilterObject = () => {
    const isAll = filtersOptions.value.map(
      (f, i) => f.length === filters.value[i].length || f.length === 0,
    )

    return {
      SearchAuthors: isAll[0] ? [] : filters.value[0].map(i => i.name),
      SearchGenres: isAll[1] ? [] : filters.value[1].map(i => i.name),
      SearchThematic: isAll[2] ? [] : filters.value[2].map(i => i.name),
      SearchGoals: isAll[3] ? [] : filters.value[3].map(i => i.name),
      SearchKnowledgeaxes: isAll[4] ? [] : filters.value[4].map(i => i.name),
    }
  }

  const fetchBooks = async () => {
    isLoading.value = true

    const classId = classe.value.ClassId

    const paramEnabled = enabled.value[0] === 0 ? 'false' : enabled.value[0]
    const filtersObj = getFilterObject()

    try {
      const { data } = await getBooksLibrary({
        search: searchQuery.value,
        classId,
        OnlyName: onlyName.value,
        ...params.value,
        ...filtersObj,
        Enabled: paramEnabled,
        pageSize: pageSize.value,
        page: currentPage.value,
      })

      dataTable.value = data.data
      totalData.value = data.total
    } finally {
      isLoading.value = false
    }
  }

  const search = () => {
    currentPage.value = 1
    checkedItems.value = []
    selectAll.value = false
    fetchBooks()
  }

  const fetchEnableBookAudio = async () => {
    loadingBookAudio.value = true

    const response = await getEnableDisableAudio(classe.value.ClassId)

    set(enableBookAudio, 'value', response.data)
    loadingBookAudio.value = false
  }

  const changeEnableBookAudio = async () => {
    loadingBookAudio.value = true

    await putEnableDisableAudio(classe.value.ClassId)
    set(enableBookAudio, 'value', !enableBookAudio.value)

    loadingBookAudio.value = false
  }

  return {
    dataTable,
    totalData,
    filters,
    pageSize,
    checkedItems,
    currentPage,
    enabled,
    selectAll,
    disableMassActions,
    indeterminate,
    isLoading,
    params,
    onlyName,
    filtersOptions,
    loadingFilter,
    searchQuery,
    enableBookAudio,
    loadingBookAudio,

    resetFilters,
    fetchBooks,
    getFilterObject,
    fetchFilters,
    search,
    fetchEnableBookAudio,
    changeEnableBookAudio,
  }
}