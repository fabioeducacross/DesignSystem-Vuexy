<template>
  <b-card class="shadow-none" body-class="p-0">
    <ListTable
      ref="tableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por escola"
      @change="changeListTable"
    >
      <template #cell(studentsByPhase)="{ item }">
        <div v-if="!item.students" class="d-flex">
          <b-badge pill block variant="gray" class="badge-not-realized"> NÃO REALIZADA </b-badge>
        </div>
        <WritingPhaseBarChart
          v-else
          :options="{
            series: serie(item),
          }"
          :enable-tooltips="true"
          :min-segment-percentage="2"
        />
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? `text-primary cursor-pointer`
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTable>
  </b-card>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { writingPhaseEnum } from '@/consts/legends/writingPhasesEnum'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import WritingPhaseBarChart from '@/views/pages/writing-phases/components/BarChart.vue'
import { useWritingStagesInstitutions } from '@/views/pages/writing-phases/institutions/useWritingStagesInstitutions.js'
import { ref } from 'vue'

const cardFocus = ref(null)

const {
  fetch,
  params,
  loading,
  dataTable,
  totalData,
  tableRef,
} = useWritingStagesInstitutions()

const tableColumns = [
  { key: 'name', label: 'ESCOLA', sortable: true, searchable: true, tdClass: 'font-bold' },
  { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
  {
    key: 'students',
    label: 'ALUNOS PARTICIPANTES',
    sortable: true,
    tooltip: 'Alunos habilitados a fazer o teste.',
    formatter: value => formatNumber(value),
  },
  {
    key: 'studentsByPhase',
    label: 'Alunos por fase',
    sortable: false,
    tdClass: 'p-0',
  },
  {
    key: 'actions',
    label: 'Ações',
    thStyle: { width: '64px' },
  },
]

const serie = item => {
  return writingPhaseEnum.map(e => {
    return {
      name: e.text,
      value: item[e.key],
      color: e.variant,
      label: e.text,
    }
  })
}

const openReport = institutionId => {
  router.push({
    name: 'WritingPhasesInstitutionsClasses',
    params: { institutionId },
  })
}

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: isEnabled =>
      isEnabled
        ? 'Relatório da escola'
        : 'O relatório ficará disponível assim que o professor aplicar o teste.',
    isEnabled: item => item.students,
    action: data => {
      openReport(data.id)
    },
  },
]

const changeListTable = data => {
  params.value = data
  fetch()
}
</script>

<style lang="scss">
  .th-head-arrow-white {
    background-image: url(@/assets/images/arrows/arrows-white.svg) !important;
  }
</style>
<style lang="scss" scoped>
  .badge-not-realized {
    background: rgba(108, 117, 125, 0.12);
    color: #4b4b4b;
    flex-grow: 1;
  }
</style>