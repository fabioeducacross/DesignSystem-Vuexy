import {
  getReadingEvaluations,
  getReadingEvaluationTests,
  getStudents,
  toggleReadingEvaluationStatus,
  readingEvaluationNetworkEnabled,
  readingEvaluationInstitutionEnabled,
} from '@/services/shared/readingFluencyEvaluation/readingFluencyEvaluation.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import readingMeterV2Module from '@/store/pageModules/readingMeter/readingMeterV2Module'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { computed, ref, watch, getCurrentInstance } from 'vue'

const moduleName = 'ReadingMeterV2Module'

export function useReadingMeterV2() {
  if (!store.hasModule(moduleName)) {
    store.registerModule(moduleName, readingMeterV2Module)
  }

  const data = ref([])
  const filters = ref({})
  const classe = useFilters().classe
  const vm = getCurrentInstance().proxy

  const hasData = computed(() => data.value && data.value.length > 0)
  const isLoading = computed({
    get() {
      return store.getters[`${moduleName}/loading`]
    },
    set(value) {
      store.commit(`${moduleName}/loading`, value)
    },
  })

  const totalData = computed({
    get() {
      return store.getters[`${moduleName}/totalData`]
    },
    set(value) {
      store.commit(`${moduleName}/totalData`, value)
    },
  })

  const isLoadingModal = computed({
    get() {
      return store.getters[`${moduleName}/loadingModal`]
    },
    set(value) {
      store.commit(`${moduleName}/loadingModal`, value)
    },
  })

  const readingDetail = computed({
    get() {
      return store.getters[`${moduleName}/readingDetail`]
    },
    set(value) {
      store.commit(`${moduleName}/readingDetail`, value)
    },
  })

  const params = computed({
    get() {
      return store.getters[`${moduleName}/params`]
    },
    set(value) {
      store.commit(`${moduleName}/setParams`, value)
    },
  })

  const status = computed({
    get() {
      return store.getters[`${moduleName}/status`]
    },
    set(value) {
      store.commit(`${moduleName}/setStatus`, value)
    },
  })

  const readings = computed({
    get() {
      return store.getters[`${moduleName}/readings`]
    },
    set(value) {
      store.commit(`${moduleName}/readings`, value)
    },
  })

  const readingsTest = computed({
    get() {
      return store.getters[`${moduleName}/readingsTest`]
    },
    set(value) {
      store.commit(`${moduleName}/readingsTest`, value)
    },
  })

  const changeToastMsg = computed({
    get() {
      return store.getters[`${moduleName}/toastMsg`]
    },
    set(value) {
      store.commit(`${moduleName}/toastMsg`, value)
    },
  })

  const isTeacher = computed({
    get() {
      return store.getters[`${moduleName}/isTeacher`]
    },
    set(value) {
      store.commit(`${moduleName}/isTeacher`, value)
    },
  })

  const changeStatusEvaluation = async dataParam => {
    try {
      const response = await toggleReadingEvaluationStatus(dataParam.id, classe.value.ClassId)
      await getEvaluations()
      if (response?.status === 200) {
        await vm.$toast({
          component: Toast,
          props: {
            title: changeToastMsg.value,
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })
      }
    } catch (error) {
      // Erro ao alterar status da avaliação
    }
  }

  const changeListTable = async ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
    params.value = {
      Page: currentPage,
      PageSize: perPage,
      OrderBy: sortBy,
      Ascending: isSortDirDesc?.toString(),
      Search: searchQuery,
    }
    await getEvaluations()
  }

  const getEvaluations = () => {
    isLoading.value = true
    const body = {
      ...params.value,
      Type: readings.value.id,
      Status: status.value.id?.toString(),
      ClassId: classe.value.ClassId,
    }
    getReadingEvaluations(body)
      .then(response => {
        readingsTest.value = response.data.data || []
      })
      .catch(() => {
        readingsTest.value = []
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const getEvaluationDetails = async evaluationId => {
    isLoadingModal.value = true
    try {
      const response = await getReadingEvaluationTests(evaluationId, {
        ClassId: classe.value.ClassId,
      })
      return response.data
    } finally {
      isLoadingModal.value = false
    }
  }

  const getEvaluationStudents = async evaluationId => {
    try {
      const response = await getStudents(evaluationId, {
        ClassId: classe.value.ClassId,
      })
      return response.data.students || []
    } catch (error) {
      return []
    }
  }

  const enabledEvaluation = async (evaluationId, { startDate, endDate }) => {
    isLoading.value = true
    try {
      if (store.getters.accessRole === 'NetworkManager') {
        await readingEvaluationNetworkEnabled(evaluationId, { startDate, endDate })
      } else {
        await readingEvaluationInstitutionEnabled(evaluationId, { startDate, endDate })
      }
      await getEvaluations()
      vm.$toast({
        component: Toast,
        props: {
          icon: 'AlertTriangleIcon',
          text: 'Avaliação aplicada com sucesso!',
          variant: 'success',
        },
      })
    } finally {
      isLoading.value = false
    }
  }

  const stopWatch = watch(
    () => classe.value?.ClassId,
    (newClassId, oldClassId) => {
      if (newClassId && newClassId !== oldClassId) {
        getEvaluations()
      }
    },
  )

  return {
    moduleName,
    data,
    filters,

    getEvaluations,
    getEvaluationDetails,
    getEvaluationStudents,
    changeStatusEvaluation,
    changeListTable,
    enabledEvaluation,
    changeToastMsg,

    hasData,
    isLoading,
    readingDetail,
    totalData,
    status,
    readings,
    readingsTest,
    stopWatch,
    isTeacher,
  }
}