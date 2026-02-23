<template>
  <section>
    <!-- LIST -->
    <ListTable
      ref="listTableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="searchForStudent"
      @change="changeListTable"
    >
      <template v-for="(item, index) in ENarrativeComplexityApply" #[`cell(${index})`]="{ value }">
        <template>
          <div
            v-if="value.error"
            :key="index"
            class="position-absolute h-full w-full inset-0 d-flex align-items-center justify-content-center flex-column gap-1 text-uppercase"
          >
            <span class="d-flex align-items-center gap-2 flex-nowrap">
              <b-badge variant="light-danger" pill> Problema identificado </b-badge>
              <span
                v-b-tooltip="'Entre em contato com o nosso suporte para solucionar o problema.'"
                class="material-symbols-outlined text-danger"
                style="font-size: 18px"
              >
                info
              </span>
            </span>
            <div v-if="value.createdAt" class="d-flex align-items-center" :class="`text-danger`">
              <span class="font-bold">{{ value.createdAt | formatDate }}</span>
            </div>
          </div>

          <CellStatus
            v-else-if="value.complexity"
            :key="index"
            :value="value.complexity"
            :date="value.createdAt"
            enum="percentileNarrativeComplexityWithNotCompleted"
          />
          <b-badge
            v-else-if="!value.enabled || value.finished"
            :key="index"
            :variant="`light-secondary`"
            :class="`text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1 badge-not-enabled`"
          >
            NÃO REALIZADA
          </b-badge>

          <div v-else-if="value.paused" :key="index" class="d-flex justify-content-center">
            <div class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined" :class="`text-info`">pause</span>
              <small class="font-semibold uppercase" :class="`text-info`">EM PAUSA</small>
            </div>
          </div>

          <div v-else-if="value.enabled" :key="index" class="d-flex justify-content-center">
            <div class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined" :class="`text-info`">directions_walk</span>
              <small class="font-semibold uppercase" :class="`text-info`">EM ANDAMENTO</small>
            </div>
          </div>
        </template>
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
  </section>
</template>

<script setup>
import CellStatus from '@/components/badge/CellStatus.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getVariantByRule } from '@/consts/legends'
import { proficiencyWithNotCompleted } from '@/consts/legends/proficiencyEnum.js'
import {
  ENarrativeComplexityApply,
  ENarrativeComplexityTitle,
} from '@/consts/narrativeComplexity.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { formatDecimalPlace } from '@/utils/number.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { computed, getCurrentInstance, ref, watch } from 'vue'

const { classe } = useFilters()
const vm = getCurrentInstance().proxy
const listTableRef = ref(null)
const cardFocus = ref(null)

// LOADING
const loading = computed(() => store.getters['narrativeComplexityStudents/loading'])

// TABLE
const dataTable = computed(() => store.getters['narrativeComplexityStudents/data'])
const totalData = computed(() => store.getters['narrativeComplexityStudents/total'])

const tableColumns = computed(() => {
  const applys = Object.entries(ENarrativeComplexityApply).map(([key, value]) => {
    return {
      key,
      label: ENarrativeComplexityTitle[value],
      class: 'position-relative',
      thStyle: { minWidth: '240px', textAlign: 'center' },
    }
  })

  const columns = [
    {
      key: 'name',
      label: 'ALUNO',
      sortable: true,
      searchable: true,
      tdClass: 'font-bold',
      thStyle: { minWidth: '140px' },
    },
    ...applys,
  ]

  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
    columns.push({
      key: 'actions',
      label: 'Ações',
      sortable: false,
      thStyle: { width: '120px' },
    })
  }

  return columns
})

const tableActions = [
  {
    icon: 'pie_chart',
    color: 'text-primary',
    isEnabled: data => {
      return Object.entries(ENarrativeComplexityApply).some(([key]) => data[key].complexity)
    },
    tooltip: (data, isEnabled) =>
      isEnabled
        ? 'Relatório do aluno'
        : 'O relatório ficará disponível assim que o aluno finalizar o teste.',
    action: data => {
      openReport(data.id)
    },
  },
]

const sortByEnum = {
  name: {
    key: 0,
    value: 'Name',
  },
}

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('narrativeComplexityStudents/setParams', {
    Search: searchQuery,
    OrderBy: sortByEnum[sortBy]?.key || '0',
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  store.dispatch('narrativeComplexityStudents/fetch')
}

const openReport = studentId => {
  router.push({
    name: 'narrativeComplexityStudent',
    params: { studentId },
  })
}

watch(classe, () => {
  store.commit('narrativeComplexityStudents/reset')
  listTableRef.value.resetPage()
  store.dispatch('narrativeComplexityStudents/fetch')
})

store.dispatch('narrativeComplexityStudents/fetch')

const getPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}

const getProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}
</script>

<style lang="scss" scoped>
  .badge-not-enabled {
    color: #4b4b4b !important;
    background-color: rgba(108, 117, 125, 0.12) !important;
    border: none;
  }
</style>