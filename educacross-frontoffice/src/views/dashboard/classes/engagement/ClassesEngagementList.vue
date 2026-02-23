<template>
  <section>
    <ListTableSelect
      ref="listTableRef"
      v-model="selectedData"
      :loading="isLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por turma"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      @change="changeListTable"
    >
      <template #cell(className)="{ item }">
        <span class="align-text-top font-bold">{{ item.className }}</span>
      </template>

      <template #cell(serieName)="{ item }">
        <b-badge pill variant="light-primary">
          {{ item.serieName }}
        </b-badge>
      </template>
      <template #cell(institutionName)="{ item }">
        <span class="font-bold">{{ item.institutionName }}</span>
      </template>
      <template #cell(networkGroupName)="{ item }">
        <span class="font-bold">{{ item.networkGroupName }}</span>
      </template>
      <template #cell(records)="{ item }">
        <ConditionalValueDisplay :value="item.records" :layout="'badge'">
          {{ item.records | formatNumber }}
        </ConditionalValueDisplay>
      </template>
      <template #cell(accessed)="{ item }">
        <ConditionalValueDisplay :value="item.studentsAccess" :layout="'badge'">
          <ProgressBarHorizontalV2
            show-values
            height="12px"
            :value="item.studentsAccess"
            :max="item.records"
            :get-variant="setRangeColor"
            values-divisor=" de "
          >
          </ProgressBarHorizontalV2>
        </ConditionalValueDisplay>
      </template>
      <template #cell(played)="{ item }">
        <ConditionalValueDisplay :value="item.studentsAccess" :layout="'badge'">
          <ProgressBarHorizontalV2
            show-values
            height="12px"
            :value="item.studentsPlayed"
            :max="item.studentsAccess"
            :get-variant="setRangeColor"
            values-divisor=" de "
          >
          </ProgressBarHorizontalV2>
        </ConditionalValueDisplay>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(action.isEnabled(item))"
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
  </section>
</template>

<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { DynamicCardStatusEnum } from '@/consts/StatusEnums'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import { getAdminPanelAccessExcel } from '@/services/shared/reports/Report.service'
import store from '@/store'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { saveAs } from 'file-saver'
import { ref, watch, computed } from 'vue'

const selectedData = ref({
  value: [],
  batchAction: 1,
})

const listTableRef = ref(null)

const institutionId = computed(
  () => store.getters['moduleDashboardClassesEngagement/institutionId'],
)
const teacher = computed(() => store.getters['moduleDashboardClassesEngagement/teacher'])

const schoolYear = computed(
  () => store.getters['moduleDashboardClassesEngagement/schoolYear'],
)
const month = computed(() => store.getters['moduleDashboardClassesEngagement/month'])

const isLoading = computed(() => store.getters['moduleDashboardClassesEngagement/loading'])
const dataTable = computed(() => store.getters['moduleDashboardClassesEngagement/dataTable'])
const totalData = computed(() => store.getters['moduleDashboardClassesEngagement/totalData'])

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('moduleDashboardClassesEngagement/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('moduleDashboardClassesEngagement/fetch')
}

const tableColumns = [
  { key: 'className', label: 'Turma', sortable: true, searchable: true },
  { key: 'serieName', label: 'Ano Escolar', sortable: true, searchable: false },
  {
    key: 'records',
    label: 'ALUNOS CADASTRADOS',
    sortable: true,
    searchable: false,
    tooltip: 'Licenças atribuídas',
  },
  {
    key: 'accessed',
    label: 'ALUNOS QUE ACESSARAM',
    sortable: true,
    searchable: false,
    tooltip:
      'Alunos que fizeram ao menos 1 acesso. O percentual é calculado sobre os alunos cadastrados.',
  },
  {
    key: 'played',
    label: 'ALUNOS QUE JOGARAM',
    sortable: true,
    searchable: false,
    tooltip:
      'Alunos que jogaram ao menos 1 vez. O percentual é calculado sobre os alunos que acessaram.',
  },
  { key: 'actions', label: 'Ações', sortable: false },
]

const accessRole = computed(() => {
  const role = store.getters.accessRole
  if (role !== 'NetworkManager') {
    return 'Admin'
  }
  return role
})

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: isEnabled =>
      isEnabled
        ? 'Relatório da turma'
        : 'O relatório será liberado quando pelo menos 1 aluno tiver jogado.',
    isEnabled: item => item.studentsPlayed,
    color: 'text-primary',
    action: data => {
      router.push({
        name: `dashboardStudents${accessRole.value}`,
        params: {
          institutionId: institutionId.value,
          classId: data.classId,
        },
      })
    },
  },
]

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

watch([schoolYear, month, teacher], () => {
  store.commit('moduleDashboardClassesEngagement/setParams', {
    Page: 1,
  })

  listTableRef.value.resetPage()
  store.dispatch('moduleDashboardClassesEngagement/fetchDashboardData')
  store.dispatch('moduleDashboardClassesEngagement/fetch')
})

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true

  const params = {
    SerieId: schoolYear.value.id,
    month: month.value.id,
    InstitutionId: institutionId.value,
    ClassesIds:
      selectedData.value.batchAction === 2
        ? null
        : selectedData.value.value.map(classe => classe.classId),
    TeachersIds: teacher.value.map(item => item.id),
  }

  getAdminPanelAccessExcel(params)
    .then(response => {
      const fileName = 'Relatório de Acessos Turmas.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }
</style>