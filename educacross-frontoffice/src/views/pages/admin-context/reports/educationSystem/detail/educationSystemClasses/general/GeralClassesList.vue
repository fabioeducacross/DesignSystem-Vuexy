<template>
  <ListTableLocalSorting
    :table-columns="tableColumns"
    :data-table="dataTable"
    search-placeholder="Pesquisar por turma"
    :loading="loading"
    :generating-excel="generatingExcel"
    :export-to-excel="exportToExcel"
  >
    <template #cell(className)="{ item }">
      <div class="text-wrap" style="min-width: 200px">
        <span class="align-text-top font-bold">{{ item.className }}</span>
      </div>
    </template>

    <template #cell(serieName)="{ item }">
      <div class="text-wrap">
        <SchoolYearBadge :text="item.serieName" />
      </div>
    </template>

    <template #cell(progress)="{ item }">
      <SemaphoreStatus
        :status-enum="getVariantByRule(formatDecimalPlace(item.progress), 'progress')"
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
      <div class="text-nowrap d-flex align-items-center gap-1 cursor-pointer text-primary">
        <span
          v-for="(action, index) in actions"
          :key="index"
          v-b-tooltip.hover.top="action.tooltip(item)"
          class="material-symbols-outlined"
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
  import SchoolYearBadge from '@/layouts/components/SchoolYearBadge.vue'
  import router from '@/router'
  import { getEducationSystemClassesExcel } from '@/services/shared/educationSystem/EducationSystem.Service.js'
  import store from '@/store'
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
    institutionName: {
      type: String,
      default: '',
    },
  })

  const { params } = toRefs(props)
  const institutionId = router.currentRoute.params.institutionId
  const educationSystemId = router.currentRoute.params.educationSystemId

  const isNetworkManager = store.getters.accessRole === 'NetworkManager'

  const tableColumns = [
    { key: 'className', label: 'Nome da turma', sortable: true, searchable: true },
    { key: 'serieName', label: 'Ano', sortable: true },
    {
      key: 'progress',
      label: 'Progresso Médio',
      sortable: true,
      tooltip: 'Missões finalizadas.',
    },
    {
      key: 'totalStudents',
      label: 'Total de Alunos',
      sortable: true,
      formatter: value => formatNumber(value),
    },
    { key: 'started', label: 'Iniciaram', sortable: true },
    { key: 'finished', label: 'Finalizaram', sortable: false },
  ]

  if (!isNetworkManager) {
    tableColumns.push({ key: 'actions', label: 'Ações', sortable: false })
  }

  const open = classId => {
    if (isNetworkManager) {
      router.push({
        name: 'educationSystemReportInstitutionsClassesDetail',
        params: {
          educationSystemId,
          institutionId,
          classId,
        },
      })
    } else {
      router.push({
        name: 'educationSystemReportClassesDetail',
        params: {
          educationSystemId,
          classId,
        },
      })
    }
  }

  const actions = [
    {
      icon: 'pie_chart',
      tooltip: () => 'Relatório da turma',
      action: data => {
        open(data.classId)
      },
    },
  ]

  const generatingExcel = ref(false)

  const exportToExcel = () => {
    generatingExcel.value = true
    getEducationSystemClassesExcel(educationSystemId, {
      InstitutionId: params.value.InstitutionId,
      SubjectId: params.value.SubjectId,
      SerieId: params.value.SerieId,
      BookId: params.value.BookId,
      GuideId: params.value.GuideId,
    })
      .then(response => {
        const fileName = `Relatórios Gerais - Sistema de Ensino - ${props.educationSystemName}${
          props.institutionName ? ` - ${props.institutionName}` : ''
        } - Visão Geral.xlsx`
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