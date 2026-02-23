<template>
  <b-card class="shadow-none" body-class="p-0">
    <ListTable
      ref="listTableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por escola"
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

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip()"
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
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import store from '@/store'
import { computed, getCurrentInstance, ref, onMounted, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy
const listTableRef = ref(null)
const cardFocus = ref(null)

// LOADING
const loading = computed(() => store.getters['narrativeComplexityInstitutions/loading'])

// TABLE
const dataTable = computed(() => store.getters['narrativeComplexityInstitutions/data'])
const totalData = computed(() => store.getters['narrativeComplexityInstitutions/total'])

const tableColumns = computed(() => {
  const percentil = percentileNarrativeComplexityWithNotCompleted
    .map(item => {
      return {
        key: item.key,
        label: item.icon,
        sortable: true,
        thClass: `bg-${item.variant} text-white th-head-arrow-white`,

        tdClass: (value, key, itemRow) => {
          const percentils = percentileNarrativeComplexityWithNotCompleted
            .slice(0, percentileNarrativeComplexityWithNotCompleted.length - 1)
            .filter(i => i.key !== key)

          if (percentils.every(percentilItem => value > itemRow[percentilItem.key])) {
            const percentilObj = percentileNarrativeComplexityWithNotCompleted.find(
              p => p.key === key,
            )
            return `bg-light-${percentilObj.variant}`
          }
          return ''
        },
        thStyle: { width: '64px' },
      }
    })
    .reverse()
    .slice(1)

  return [
    { key: 'name', label: 'ESCOLA', sortable: true, searchable: true, tdClass: 'font-bold' },
    { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
    {
      key: 'students',
      label: 'Total de alunos',
      sortable: true,
      tooltip: 'Alunos habilitados a fazer o teste.',
      formatter: value => vm.$filters.formatNumber(value),
    },
    ...percentil,
    {
      key: 'tooltip',
      label: '',
      sortable: false,
      tooltip: 'Percentual de alunos em cada categoria.',
      thStyle: { width: '60px' },
    },
    {
      key: 'actions',
      label: 'Ações',
      thStyle: { width: '120px' },
    },
  ]
})

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => 'Relatório da Escola',
    action: data => {
      openReport(data.id)
    },
  },
]

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('narrativeComplexityInstitutions/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('narrativeComplexityInstitutions/fetch')
}

const openReport = institutionId => {
  router.push({
    name: 'narrativeComplexityInstitutionsClasses',
    params: { institutionId },
  })
}

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
  .th-head-arrow-white {
    background-image: url(@/assets/images/arrows/arrows-white.svg) !important;
  }
</style>