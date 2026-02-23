<template>
  <b-card class="shadow-none" body-class="p-0">
    <ListTable
      ref="listTableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="data"
      :total-data="total"
      search-placeholder="Pesquisar por turma"
      @change="changeListTable"
    >
      <template #cell(serieName)="{ value }">
        <b-badge pill variant="light-primary">{{ value }}</b-badge>
      </template>

      <template #cell(studentsByPhase)="{ item }">
        <WritingPhaseBarChart
          v-if="item.students !== 0"
          :options="{
            series: serie(item),
          }"
          :enable-tooltips="true"
          :min-segment-percentage="2"
        />
        <b-badge v-else pill variant="gray" class="badge-not-realized w-100">
          NÃO REALIZADA
        </b-badge>
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
    </ListTable>
  </b-card>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { writingPhaseEnum } from '@/consts/legends/writingPhasesEnum'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import useFilters from '@/store/filters/useFilters'
import { useClassesWritingPhase } from '@/views/pages/writing-phases/classes/useClassesWritingPhase'
import WritingPhaseBarChart from '@/views/pages/writing-phases/components/BarChart.vue'
import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'

const vm = getCurrentInstance().proxy

const { loading, data, total, params, fetchClasses } = useClassesWritingPhase()

const listTableRef = ref(null)
const cardFocus = ref(null)

const tableColumns = ref([
  { key: 'name', label: 'TURMA', sortable: true, searchable: true, tdClass: 'font-bold' },
  { key: 'serieName', label: 'ANO ESCOLAR', sortable: true },
  {
    key: 'students',
    label: 'Total de alunos',
    sortable: true,
    tooltip: 'Alunos habilitados a fazer o teste.',
    formatter: value => formatNumber(value),
  },
  {
    key: 'studentsByPhase',
    label: 'Alunos por fase',
    tdClass: `${
      vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER) ? 'p-0 pr-2' : 'p-0'
    }`,
  },
])

if (!vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
  tableColumns.value.push({
    key: 'actions',
    label: 'Ações',
  })
}

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  }

  fetchClasses()
}

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

const tableActions = [
  {
    icon: 'pie_chart',
    color: 'text-primary',
    isEnabled: item => {
      return item.students
    },
    tooltip: item => {
      if (item.students) {
        return 'Relatório da turma'
      }

      return 'O relatório ficará disponível assim que o professor aplicar o teste.'
    },

    action: item => {
      router.push({
        name: 'WritingPhasesListStudentsAdmin',
        params: {
          classId: item.id,
        },
      })
    },
  },
]

onMounted(() => {
  vm.$bus.on('resetPage', () => {
    listTableRef.value.resetPage()
  })
})

onUnmounted(() => {
  vm.$bus.off('resetPage')
})
</script>

<style lang="scss">
  #lineEchart.echarts {
    height: 64px !important;
    width: 357px !important;
    > div {
      margin: 0 auto !important;
      max-width: 357px !important;
      height: 64px !important;
      canvas {
        position: relative !important;
        max-width: 357px !important;
        height: 64px !important;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .badge-not-realized {
    background: rgba(108, 117, 125, 0.12);
    color: #4b4b4b;
    flex-grow: 1;
  }
</style>