<template>
  <ListTableLocalSorting
    :table-columns="tableColumns"
    :data-table="dataTable"
    search-placeholder="Pesquisar por escola"
    :loading="loading"
    :generating-excel="generatingExcel"
    :export-to-excel="exportToExcel"
  >
    <template #cell(institutionName)="{ item }">
      <div class="text-wrap" style="min-width: 200px">
        <span class="font-bold">{{ item.institutionName }}</span>
      </div>
    </template>

    <template #cell(progress)="{ item }">
      <SemaphoreStatus
        :status-enum="getVariantByRule(formatDecimalPlace(item.progress), 'progress')"
        has-tooltip
      >
        <span>{{ formatDecimalPlace(item.progress) | formatPercentToPtBr }}</span>
      </SemaphoreStatus>
    </template>

    <template #cell(started)="{ item }">
      <SemaphoreStatus
        :status-enum="getVariantByRule(item.started, 'progress')"
        has-tooltip
        :tooltip-text="item.studentsStarted.toString()"
      >
        <span>{{ item.started | formatNumber }}%</span>
      </SemaphoreStatus>
    </template>
    <template #cell(finished)="{ item }">
      <SemaphoreStatus
        :status-enum="getVariantByRule(item.finished, 'progress')"
        has-tooltip
        :tooltip-text="item.studentsFinished.toString()"
      >
        <span>{{ item.finished | formatNumber }}%</span>
      </SemaphoreStatus>
    </template>
    <template #cell(actions)="{ item }">
      <div class="text-nowrap d-flex align-items-center gap-3">
        <span
          v-for="(action, index) in actions"
          :key="index"
          v-b-tooltip.hover.top="action.tooltip(item)"
          class="material-symbols-outlined cursor-pointer text-primary"
          @click="action.action(item)"
        >
          {{ action.icon }}
        </span>
      </div>
    </template>
  </ListTableLocalSorting>
</template>

<script setup>
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { formatNumber } from '@/filters/filters'
import { useRoute, useRouter } from 'vue-router/composables'
import { getEducationSystemInstitutionsExcel } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { calcPercent, formatDecimalPlace } from '@/utils/number.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { saveAs } from 'file-saver'
import { ref, toRefs } from 'vue'

const props = defineProps({
  dataTable: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  educationSystemName: {
    type: String,
    default: '',
  },
})

const { params } = toRefs(props)
const route = useRoute()
const router = useRouter()

const educationSystemId = route.params.educationSystemId
const tableColumns = [
  { key: 'institutionName', label: 'Escola', sortable: true, searchable: true },
  { key: 'networkGroupName', label: 'Grupo Escolar', sortable: true, searchable: true },
  {
    key: 'progress',
    label: 'Progresso Médio',
    sortable: true,
    searchable: false,
    tooltip: 'Missões finalizadas.',
  },
  {
    key: 'totalStudents',
    label: 'Total de Alunos',
    sortable: true,
    searchable: false,
    formatter: value => formatNumber(value),
  },
  { key: 'started', label: 'Iniciaram', sortable: true, searchable: false },
  { key: 'finished', label: 'Finalizaram', sortable: true, searchable: false },
  { key: 'actions', label: 'Ações', sortable: false, searchable: false },
]

const openReport = institutionId => {
  router.push({
    name: 'educationSystemReportInstitutionsClasses',
    params: {
      educationSystemId,
      institutionId,
    },
  })
}

const actions = [
  {
    icon: 'pie_chart',
    tooltip: () => 'Relatório da Escola',
    action: data => {
      openReport(data.institutionId)
    },
  },
]

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getEducationSystemInstitutionsExcel(educationSystemId, {
    SubjectId: params.value.SubjectId,
    SerieId: params.value.SerieId,
    BookId: params.value.BookId,
    GuideId: params.value.GuideId,
    NetworkGroupId: params.value.NetworkGroupId,
  })
    .then(response => {
      const fileName = `Relatórios Gerais - Sistema de Ensino - ${props.educationSystemName} - Visão Geral.xlsx`
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