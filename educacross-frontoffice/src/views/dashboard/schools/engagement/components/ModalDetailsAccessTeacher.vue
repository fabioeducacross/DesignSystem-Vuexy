<template>
  <b-modal
    ref="Modal"
    :visible="value"
    hide-footer
    size="xl"
    no-close-on-backdrop
    centered
    static
    :title="modalTitle"
    header-bg-variant="light-primary"
    @close="closeModal"
    @hide="closeModal"
  >
    <div v-if="value">
      <b-card class="card-style" body-class="d-flex align-items-center justify-content-between">
        <h5 class="text-primary font-bold mb-0">{{ InstitutionName }}</h5>
        <div>
          Período:
          <span class="font-bold text-primary">{{ month.name }}</span>
        </div>
      </b-card>
      <ListTable
        :loading="loading"
        :table-columns="tableColumns"
        :data-table="dataTable"
        :total-data="totalData"
        search-placeholder="Pesquisar por escola"
        border
        @change="changeListTable"
      >
        <template #cell(institutionName)="{ item }">
          <span class="font-bold">{{ item.institutionName }}</span>

          <b-badge v-if="item.totalRecords === 0" pill variant="light-danger" class="ml-50">
            Sem cadastros
          </b-badge>
        </template>
        <template #cell(records)="{ item }">
          <ConditionalValueDisplay :value="item.totalRecords" layout="badge">
            <ProgressBarHorizontalV2
              values-divisor="de"
              show-values
              height="12px"
              :value="item.totalRecords"
              :max="item.licenses"
              :get-variant="setRangeColor"
            >
            </ProgressBarHorizontalV2>
          </ConditionalValueDisplay>
        </template>
        <template #cell(access)="{ item }">
          <ConditionalValueDisplay :value="item.totalAccess" layout="badge">
            <ProgressBarHorizontalV2
              values-divisor="de"
              show-values
              height="12px"
              :value="item.totalAccess"
              :max="item.totalRecords"
              :get-variant="setRangeColor"
            >
            </ProgressBarHorizontalV2>
          </ConditionalValueDisplay>
        </template>
      </ListTable>
      <b-row class="mb-2">
        <b-col v-if="reportRoute" class="text-center">
          <b-button variant="primary" @click="openReport">
            Ver relatório de acessos completo
            <span style="font-size: 12px" class="material-icons-outlined">chevron_right</span>
          </b-button>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { DynamicCardStatusEnum } from '@/consts/StatusEnums'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import { getNetworkPanelAccessInstitutionsProfile } from '@/services/shared/reports/Report.service.js'
import store from '@/store'
import {useSchoolEngagement} from '@/views/dashboard/schools/engagement/useSchoolEngagement'
import { can } from '@core/libs/acl/utils'
import { computed, ref, watch } from 'vue'

// Props
const props = defineProps({
  value: {
    type: Boolean,
  },
  context: {
    type: String,
  },
})

// Emits
const emit = defineEmits(['input'])

// --- Logic from setup
const { month, networkGroup, schoolYear } = useSchoolEngagement()

const { InstitutionName } = store.state.access.userData

const listTable = ref(null)
const loading = ref(false)

const contextData = {
  Secretariats: {
    id: 7,
    modalTitle: 'Detalhes de acesso de administradores',
    tableColumns: [
      { key: 'institutionName', label: 'Escola', sortable: true },
      { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
      {
        key: 'records',
        label: 'Administradores CADASTRADOS',
        sortable: true,
        tooltip: 'Licenças atribuídas',
      },
      {
        key: 'access',
        label: 'Administradores QUE ACESSARAM',
        tooltip:
          'Administradores que fizeram ao menos 1 acesso. O percentual é calculado sobre os administradores cadastrados',
        sortable: true,
      },
    ],
    reportRoute: '',
  },
  Teachers: {
    id: 2,
    modalTitle: 'Detalhes de acesso de professores',
    tableColumns: [
      { key: 'institutionName', label: 'Escola', sortable: true },
      { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
      {
        key: 'records',
        label: 'Professores CADASTRADOS',
        sortable: true,
        tooltip: 'Licenças atribuídas',
      },
      {
        key: 'access',
        label: 'Professores QUE ACESSARAM',
        tooltip:
          'Professores que fizeram ao menos 1 acesso. O percentual é calculado sobre os Professores cadastrados',
        sortable: true,
      },
    ],
    reportRoute: 'teachersAccessNetwork',
  },
  Coordinators: {
    id: 5,
    modalTitle: 'Detalhes de acesso de coordenadores',
    tableColumns: [
      { key: 'institutionName', label: 'Escola', sortable: true },
      { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
      {
        key: 'records',
        label: 'Coordenadores CADASTRADOS',
        sortable: true,
        tooltip: 'Licenças atribuídas',
      },
      {
        key: 'access',
        label: 'Coordenadores QUE ACESSARAM',
        tooltip:
          'Coordenadores que fizeram ao menos 1 acesso. O percentual é calculado sobre os coordenadores cadastrados',
        sortable: true,
      },
    ],
    reportRoute: '',
  },
  Managers: {
    id: 4,
    modalTitle: 'Detalhes de acesso de diretores',
    tableColumns: [
      { key: 'institutionName', label: 'Escola', sortable: true },
      { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
      {
        key: 'records',
        label: 'Diretores CADASTRADOS',
        sortable: true,
        tooltip: 'Licenças atribuídas',
      },
      {
        key: 'access',
        label: 'Diretores QUE ACESSARAM',
        tooltip:
          'Diretores que fizeram ao menos 1 acesso. O percentual é calculado sobre os diretores cadastrados',
        sortable: true,
      },
    ],
    reportRoute: '',
  },
}

const modalTitle = computed(() => {
  return contextData[props.context]?.modalTitle || ''
})

const tableColumns = computed(() => {
  let columns = contextData[props.context]?.tableColumns || []
  if (can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)) {
    columns = columns.filter(column => column.key !== 'records')
  }
  return columns
})

const dataTable = ref([])
const totalData = ref(0)

const params = ref({
  Page: 1,
  pageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
  }

  fetchData()
}

const fetchData = () => {
  loading.value = true

  const NetworkGroupsIds = networkGroup.value.map(i => i.id)

  getNetworkPanelAccessInstitutionsProfile({
    UserType: contextData[props.context]?.id || null,
    NetworkGroupsIds,
    Month: month.value.id,
    serieId: schoolYear.value.id,
    ...params.value,
  })
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  () => props.value,
  value => {
    if (value) {
      fetchData()
    }
  },
)

const reportRoute = computed(() => {
  return contextData[props.context]?.reportRoute || false
})

const openReport = () => {
  if (reportRoute.value) {
    router.push({ name: reportRoute.value })
  }
}

const closeModal = () => {
  emit('input', false)
}

const setRangeColor = value => {
  let variant = {}

  switch (true) {
    case value === 100:
      variant = DynamicCardStatusEnum[4]
      break
    case value >= 80:
      variant = DynamicCardStatusEnum[3]
      break
    case value >= 50:
      variant = DynamicCardStatusEnum[2]
      break
    default:
      variant = DynamicCardStatusEnum[1]
      break
  }

  return variant
}
</script>

<style lang="scss" scoped>
.card-style {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
</style>