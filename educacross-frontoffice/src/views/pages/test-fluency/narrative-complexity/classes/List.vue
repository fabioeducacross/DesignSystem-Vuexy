<template>
  <b-card class="shadow-none" body-class="p-0">
    <ListTable
      ref="listTableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por turma"
      @change="changeListTable"
    >
      <template
        v-for="(field, index) in percentileNarrativeComplexityWithNotCompleted"
        #[`head(${field.key})`]="{}"
      >
        <span :key="index" class="material-symbols-outlined">
          {{ field.icon }}
        </span>
      </template>

      <template
        v-for="(field, index) in percentileNarrativeComplexityWithNotCompleted"
        #[`cell(${field.key})`]="{ value, item }"
      >
        <span :key="index" v-b-tooltip.hover.top="`${item[field.studentKey]} alunos`">
          {{ $filters.formatNumber(value) }}%
        </span>
      </template>

      <template #cell(serieName)="{ value }">
        <b-badge pill variant="light-primary">{{ value }}</b-badge>
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
    </ListTable>
  </b-card>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { percentileNarrativeComplexityWithNotCompleted } from '@/consts/legends/percentileNarrativeComplexityEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters'
import store from '@/store'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const listTableRef = ref(null)
const cardFocus = ref(null)

const loading = computed(() => store.getters['narrativeComplexityClasses/loading'])
const dataTable = computed(() => store.getters['narrativeComplexityClasses/data'])
const totalData = computed(() => store.getters['narrativeComplexityClasses/total'])

const tableColumns = computed(() => {
  // access global $filters via window for formatter
  const $filters = typeof window !== 'undefined' && window.$filters ? window.$filters : { formatNumber }
  const percentil = percentileNarrativeComplexityWithNotCompleted
    .map(item => {
      return {
        key: item.key,
        label: item.icon,
        sortable: true,
        thClass: `bg-${item.variant} text-white th-head-arrow-white`,
        tdClass: (value, key, itemObj) => {
          const percentils = percentileNarrativeComplexityWithNotCompleted
            .slice(0, percentileNarrativeComplexityWithNotCompleted.length - 1)
            .filter(inner => inner.key !== key)
          if (percentils.every(percentil => value > itemObj[percentil.key])) {
            const matchPercentil = percentileNarrativeComplexityWithNotCompleted.find(
              percentil => percentil.key === key,
            )
            return `bg-light-${matchPercentil.variant}`
          }
          return ''
        },
        thStyle: { width: '64px' },
      }
    })
    .reverse()
    .slice(1)

  const columns = [
    { key: 'name', label: 'TURMA', sortable: true, searchable: true, tdClass: 'font-bold' },
    { key: 'serieName', label: 'ANO ESCOLAR', sortable: true },
    {
      key: 'students',
      label: 'Total de alunos',
      sortable: true,
      tooltip: 'Alunos habilitados a fazer o teste.',
      formatter: value => $filters.formatNumber(value),
    },
    ...percentil,
    {
      key: 'tooltip',
      label: '',
      sortable: false,
      tooltip: 'Percentual de alunos em cada categoria.',
      thStyle: { width: '60px' },
    },
  ]

  if (!(typeof window !== 'undefined' && window.$can && window.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER))) {
    columns.push({
      key: 'actions',
      label: 'Ações',
      thStyle: { width: '120px' },
    })
  }

  return columns
})

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => 'Relatório da Turma',
    action: data => {
      openReport(data.id)
    },
  },
]

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('narrativeComplexityClasses/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('narrativeComplexityClasses/fetch')
}

const router = useRouter()

const openReport = classId => {
  router.push({
    name: 'narrativeComplexityClassesStudents',
    params: { classId },
  })
}

onMounted(() => {
  if (typeof window !== 'undefined' && window.$bus) {
    window.$bus.on('resetPage', () => {
      listTableRef.value && listTableRef.value.resetPage()
    })
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined' && window.$bus) {
    window.$bus.off('resetPage')
  }
})
</script>

<style lang="scss">
  .th-head-arrow-white {
    background-image: url(@/assets/images/arrows/arrows-white.svg) !important;
  }
</style>