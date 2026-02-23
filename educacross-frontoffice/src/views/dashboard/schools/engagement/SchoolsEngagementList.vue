<template>
  <section>
    <ListTableSelect
      ref="listTableRef"
      v-model="selectedData"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por escola"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      @change="changeListTable"
    >
      <template #cell(institutionName)="{ item }">
        <span class="font-bold">{{ item.institutionName }}</span>
      </template>

      <template #cell(studentsRecords)="{ item }">
        <ConditionalValueDisplay :value="item.studentsRecords" :layout="'badge'">
          {{ item.studentsRecords | formatNumber }}
        </ConditionalValueDisplay>
      </template>

      <template #cell(records)="{ item }">
        <ConditionalValueDisplay :value="item.studentsRecords" :layout="'badge'">
          <ProgressBarHorizontalV2
            values-divisor="de"
            show-values
            height="12px"
            :value="item.studentsRecords"
            :max="item.licenses"
            :get-variant="setRangeColor"
          >
          </ProgressBarHorizontalV2>
        </ConditionalValueDisplay>
      </template>
      <template #cell(accessed)="{ item }">
        <ConditionalValueDisplay :value="item.studentsAccess" :layout="'badge'">
          <ProgressBarHorizontalV2
            values-divisor="de"
            show-values
            height="12px"
            :value="item.studentsAccess"
            :max="item.studentsRecords"
            :get-variant="setRangeColor"
          >
          </ProgressBarHorizontalV2>
        </ConditionalValueDisplay>
      </template>
      <template #cell(played)="{ item }">
        <ConditionalValueDisplay :value="item.studentsPlayed" :layout="'badge'">
          <ProgressBarHorizontalV2
            values-divisor="de"
            show-values
            height="12px"
            :value="item.studentsPlayed"
            :max="item.studentsAccess"
            :get-variant="setRangeColor"
          >
          </ProgressBarHorizontalV2>
        </ConditionalValueDisplay>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? `${action.color} cursor-pointer`
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableSelect>
    <ModalDetailsSchool
      v-if="detailsSchoolIsOpen"
      v-model="detailsSchoolIsOpen"
      :data="detailsSchool"
    />
  </section>
</template>

<script setup>
import { loginImpersonatedAdmin } from '@/auth/utils'
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { DynamicCardStatusEnum } from '@/consts/StatusEnums'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import { getRoleHomeRouteName } from '@/router/home-route.js'
import { impersonateAdmin } from '@/services/shared/login/Login.Service'
import { getNetworkPanelAccessExcel } from '@/services/shared/reports/Report.service'
import store from '@/store'
import ModalDetailsSchool from '@/views/dashboard/schools/engagement/components/ModalDetailsSchool.vue'
import {useSchoolEngagement} from '@/views/dashboard/schools/engagement/useSchoolEngagement'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, ref } from 'vue'

// Props
const props = defineProps({
  filter: {
    type: Object,
    default: () => ({}),
  },
})

// State & Composables
const {
  loading,
  dataTable,
  totalData,
  networkGroup,
  schoolYear,
  month,
  params,
  fetchListData,
} = useSchoolEngagement()

const vm = getCurrentInstance().proxy

const selectedData = ref({
  value: [],
  batchAction: 1,
})

const listTableRef = ref(null)

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  }
  fetchListData()
}

const tableColumns = computed(() => {
  return [
    { key: 'institutionName', label: 'Escola', sortable: true, searchable: true },
    { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
    {
      key: vm.$can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)
        ? 'studentsRecords'
        : 'records',
      label: 'ALUNOS CADASTRADOS',
      sortable: true,
      tooltip: 'Licenças atribuídas',
    },
    {
      key: 'accessed',
      label: 'ALUNOS QUE ACESSARAM',
      tooltip:
        'Alunos que fizeram ao menos 1 acesso. O percentual é calculado sobre os alunos cadastrados.',
      sortable: true,
    },
    {
      key: 'played',
      label: 'ALUNOS QUE JOGARAM',
      tooltip:
        'Alunos que jogaram ao menos 1 vez. O percentual é calculado sobre os alunos que acessaram.',
      sortable: true,
    },
    { key: 'actions', label: 'Ações', sortable: false },
  ]
})

const tableActions = computed(() => {
  const actions = [
    {
      icon: 'info',
      tooltip: () => 'Informações da escola',
      isEnabled: () => true,
      color: 'text-primary',
      action: data => {
        openModalDetail(data)
      },
    },
    {
      icon: 'pie_chart',
      tooltip: () => 'Relatório da escola',
      isEnabled: () => true,
      color: 'text-primary',
      action: data => {
        router.push({
          name: 'dashboardClassesTabsEngagementNetworkManager',
          params: {
            institutionId: data.institutionId,
          },
        })
      },
    },
  ]
  if (vm.$can('read', 'ManageInstitutions')) {
    actions.unshift({
      icon: 'manage_accounts',
      tooltip: () => 'Gerenciar Escola',
      isEnabled: () => true,
      color: 'text-primary',
      action: data => {
        impersonateNetworManager(data.institutionId)
      },
    })
  }
  return actions
})

function setRangeColor(value) {
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

const impersonateNetworManager = institutionId => {
  const loggedUsers = store.state.loggedAccess.loggedAccess
  const loggedUser = loggedUsers.impersonated[institutionId]

  if (loggedUser) {
    loginImpersonatedAdmin({
      accessToken: loggedUser.AccessToken,
      refreshToken: loggedUser.RefreshToken,
    }).then(() => {
      router.push({
        name: getRoleHomeRouteName(),
      })
    })

    return
  }

  impersonateAdmin(institutionId).then(res => {
    const { data } = res
    loginImpersonatedAdmin(data).then(() => {
      router.push({
        name: getRoleHomeRouteName(),
      })
    })
  })
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true

  const exportParams = {
    NetworkGroupsIds: networkGroup.value.id,
    Month: month.value.id,
    SerieId: schoolYear.value.id,
    InstitutionsIds:
      selectedData.value.batchAction === 2
        ? null
        : selectedData.value.value.map(institution => institution.institutionId),
  }

  getNetworkPanelAccessExcel(exportParams)
    .then(response => {
      const fileName = 'Relatório de Engajamento.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const detailsSchool = ref({})
const detailsSchoolIsOpen = ref(false)

const openModalDetail = data => {
  detailsSchool.value = data
  detailsSchoolIsOpen.value = true
}
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>