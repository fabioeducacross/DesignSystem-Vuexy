import { UserStatusEnum } from '@/consts/UserStatusEnum'
import {
  deleteMassCoordinators,
  getCoordinatorsV2,
} from '@/services/admin-context/coordinators/Coordinators.service'
import { sendEmail } from '@/services/shared/accesses/Accesses.service'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { ref, getCurrentInstance, computed } from 'vue'

const module_name = 'module-coordinator'

const refModalDelete = ref(null)
const refTable = ref(null)

export function useCoordinatorList() {
  const params = computed({
    get() {
      return store.getters[`${module_name}/params`]
    },
    set(value) {
      store.commit(`${module_name}/params`, value)
    },
  })

  const status = computed({
    get() {
      return store.getters[`${module_name}/status`]
    },
    set(value) {
      store.commit(`${module_name}/status`, value)
    },
  })

  const coordinators = computed({
    get() {
      return store.getters[`${module_name}/coordinators`]
    },
    set(value) {
      store.commit(`${module_name}/coordinators`, value)
    },
  })

  const selectedData = computed({
    get() {
      return store.getters[`${module_name}/selectedData`]
    },
    set(value) {
      store.commit(`${module_name}/selectedData`, value)
    },
  })

  const loading = computed({
    get() {
      return store.getters[`${module_name}/loading`]
    },
    set(value) {
      store.commit(`${module_name}/loading`, value)
    },
  })

  const availableLicenses = computed({
    get() {
      return store.getters[`${module_name}/availableLicenses`]
    },
    set(value) {
      store.commit(`${module_name}/availableLicenses`, value)
    },
  })

  const totalUsers = computed({
    get() {
      return store.getters[`${module_name}/totalUsers`]
    },
    set(value) {
      store.commit(`${module_name}/totalUsers`, value)
    },
  })

  const pagination = computed({
    get() {
      return store.getters[`${module_name}/pagination`]
    },
    set(value) {
      store.commit(`${module_name}/pagination`, value)
    },
  })

  const haveLicensesAvailable = computed(() => availableLicenses.value > 0)

  const vm = getCurrentInstance().proxy
  const userRole = ref('')
  const showListByCard = ref(false)
  const actions = ref([])

  const massActions = ref([])
  const statusFilterDefaultOption = { key: null, label: 'Todos os status' }
  const statusFilterOptions = ref([statusFilterDefaultOption, ...UserStatusEnum])

  const handleListCoordinatorsOrderBy = ({
    currentPage,
    perPage,
    sortBy,
    isSortDirDesc,
    searchQuery,
  }) => {
    params.value.Page = currentPage
    params.value.OrderBy = sortBy
    params.value.Ascending = isSortDirDesc
    params.value.Search = searchQuery
    params.value.PageSize = perPage

    handleListCoordinators()
  }

  const handleListCoordinators = async () => {
    loading.value = true

    try {
      const response = await getCoordinatorsV2({ ...params.value, status: status.value.key })
      const { data } = response

      coordinators.value = data.coordinators.data
      availableLicenses.value = data.availableLicenses
      totalUsers.value = data.totalUsers
      pagination.value.totalPages = data.coordinators.totalPages
      pagination.value.total = data.coordinators.total
    } finally {
      loading.value = false
    }
  }

  const resetPage = () => {
    params.value.Page = 1
    if (refTable.value && typeof refTable.value.resetPage === 'function') {
      refTable.value.resetPage()
    }
  }

  const resetAndfetch = () => {
    resetPage()
    handleListCoordinators()
  }

  const deleteRow = async (ids, BatchAction) => {
    await deleteMassCoordinators({
      ids,
      BatchAction,
      status: status.value.key,
    })

    resetAndfetch()
  }

  const sendEmailCoordinator = id => {
    sendEmail(id)
      .then(() => {
        vm.$toast({
          component: Toast,
          props: {
            title: 'E-mail enviado com sucesso!',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })
      })
      .finally(() => {
        handleListCoordinators()
      })
  }

  const allItensSelected = data => {
    if (data) {
      selectedData.value.batchAction = 2
    } else {
      selectedData.value.batchAction = 1
    }
  }

  return {
    refModalDelete,
    refTable,
    module_name,
    loading,
    userRole,
    showListByCard,
    availableLicenses,
    totalUsers,
    actions,
    selectedData,
    massActions,
    coordinators,
    pagination,
    statusFilterOptions,
    status,
    params,
    haveLicensesAvailable,
    handleListCoordinatorsOrderBy,
    handleListCoordinators,
    deleteRow,
    sendEmailCoordinator,
    allItensSelected,
    resetPage,
    resetAndfetch,
  }
}