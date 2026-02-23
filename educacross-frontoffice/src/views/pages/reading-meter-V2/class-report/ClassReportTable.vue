<template>
  <section>
    <ListTableLocalSorting
      ref="listTableRef"
      :loading="loading"
      :per-page-options="[10, 25, 50]"
      :per-page-default="10"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por turma"
    >
      <template
        v-for="(field, index) in proficiencyV2WithNotCompleted"
        #[`head(${field.key})`]="{}"
      >
        <span :key="index" class="material-symbols-outlined">
          {{ field.icon }}
        </span>
      </template>

      <template
        v-for="(field, index) in proficiencyV2WithNotCompleted"
        #[`cell(${field.key})`]="{ value, item }"
      >
        <span :key="index" v-b-tooltip.hover.top="`${item[field.studentKey]} alunos`">
          {{ value | formatNumber }}%
        </span>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click="action.action(item)"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableLocalSorting>
  </section>
</template>

<script setup>
import { useClassReport } from './useClassReport.js'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { proficiencyV2WithNotCompleted } from '@/consts/ReadingMeterV2ProficiencyEnum'
import { computed, ref, getCurrentInstance, onMounted, onUnmounted, watch } from 'vue'

// Data & refs
const listTableRef = ref(null)
const vm = getCurrentInstance().proxy

const {
  loading,
  students,
  pagination,
  statusFilter,
  proficiencyFilter,
  loadClassesData,
  openClassReport,
} = useClassReport()

const dataTable = computed(() => students.value || [])
const totalData = computed(() => pagination.value?.totalData || 0)

// Table columns
const tableColumns = computed(() => {
  const proficiencys = proficiencyV2WithNotCompleted.map(item => {
    return {
      key: item.key,
      label: item.icon,
      sortable: true,
      thClass: `bg-${item.variant} text-white th-head-arrow-white`,
      tdClass: (value, key, row) => getCellClass(value, key, row),
      thStyle: { width: '64px' },
    }
  })
  return [
    { key: 'name', label: 'TURMA', sortable: true, searchable: true, tdClass: 'font-bold' },
    {
      key: 'students',
      label: 'Total de alunos',
      sortable: true,
      tooltip: 'Alunos habilitados a fazer o teste.',
    },
    ...proficiencys,
    {
      key: 'tooltip',
      label: '',
      sortable: false,
      tooltip: 'Percentual de alunos em cada faixa de proficiência.',
      thStyle: { width: '60px' },
    },
    {
      key: 'actions',
      label: 'AÇÕES',
      sortable: false,
      thStyle: { width: '100px' },
    },
  ]
})

// Actions column data
const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: 'Relatório da turma',
    action: data => {
      openClassReport(data.id)
    },
  },
]

// Cell class util
const getCellClass = (value, key, item) => {
  const keyMapping = {
    proficient: 'adequate',
    advenced: 'advanced',
  }

  const proficiencys = proficiencyV2WithNotCompleted.filter(
    proficiency => proficiency.key !== key,
  )

  const isHighest = proficiencys.every(proficiency => {
    const apiKey = keyMapping[proficiency.key] || proficiency.key
    return value > (item[apiKey] || 0)
  })

  if (isHighest) {
    const proficiency = proficiencyV2WithNotCompleted.find(
      proficiency => proficiency.key === key,
    )
    return `bg-light-${proficiency.variant}`
  }
  return ''
}

// Event listeners & lifecycle
onMounted(() => {
  vm.$bus.on('resetPage', () => {
    listTableRef.value.resetPage()
  })
  loadClassesData()
})

onUnmounted(() => {
  vm.$bus.off('resetPage')
})

watch([statusFilter, proficiencyFilter], () => {
  loadClassesData()
})

</script>

<style lang="scss" scoped></style>