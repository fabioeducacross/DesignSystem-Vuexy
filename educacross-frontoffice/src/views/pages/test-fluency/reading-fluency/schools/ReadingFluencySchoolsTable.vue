<template>
  <section>
    <!-- LIST -->
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
        v-for="(field, index) in proficiencyWithNotCompleted"
        #[`head(${field.key})`]="{}"
      >
        <span :key="index" class="material-symbols-outlined">
          {{ field.icon }}
        </span>
      </template>

      <template
        v-for="(field, index) in proficiencyWithNotCompleted"
        #[`cell(${field.key})`]="{ value, item }"
      >
        <span :key="index" v-b-tooltip.hover.top="`${item[field.studentKey]} alunos`">
          {{ $filters.formatNumber(value) }}%
        </span>
      </template>

      <template #cell(students)="{ value }">
        {{ $filters.formatNumber(value, 0) }}
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
  </section>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { proficiencyWithNotCompleted } from '@/consts/legends/proficiencyEnum.js'
import router from '@/router'
import store from '@/store'
import { computed, getCurrentInstance, ref, onMounted, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy
const listTableRef = ref(null)

const cardFocus = ref(null)

// LOADING
const loading = computed(() => store.getters['moduleReadingFluencySchools/loading'])

// TABLE
const dataTable = computed(() => store.getters['moduleReadingFluencySchools/data'])
const totalData = computed(() => store.getters['moduleReadingFluencySchools/total'])

const tableColumns = computed(() => {
  const proficiencys = proficiencyWithNotCompleted.map(item => {
    return {
      key: item.key,
      label: item.icon,
      sortable: true,
      thClass: `bg-${item.variant} text-white th-head-arrow-white`,
      tdClass: (value, key, item) => {
        const proficiencys = proficiencyWithNotCompleted.filter(
          proficiency => proficiency.key !== key,
        )

        if (proficiencys.every(proficiency => value > item[proficiency.key])) {
          const proficiency = proficiencyWithNotCompleted.find(
            proficiency => proficiency.key === key,
          )
          return `bg-light-${proficiency.variant}`
        }
        return ''
      },
      thStyle: { width: '64px' },
    }
  })
  return [
    { key: 'name', label: 'Escola', sortable: true, searchable: true, tdClass: 'font-bold' },
    { key: 'networkGroupName', label: 'Grupo escolar', sortable: true },
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
    { key: 'actions', label: 'Ações', sortable: false, thStyle: { width: '120px' } },
  ]
})

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => 'Relatório da escola',
    action: data => {
      openReport(data.id)
    },
  },
]

const sortByEnum = {
  institutionName: {
    key: 0,
    value: 'Name',
  },
  networkGroupName: {
    key: 1,
    value: 'NetworkGroupName',
  },
  students: {
    key: 2,
    value: 'Students',
  },
  none: {
    key: 3,
    value: 'None',
  },

  belowBasic: {
    key: 4,
    value: 'BelowBasic',
  },
  basic: {
    key: 5,
    value: 'Basic',
  },
  proficient: {
    key: 6,
    value: 'Proficient',
  },
  advenced: {
    key: 7,
    value: 'Advenced',
  },
}

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('moduleReadingFluencySchools/setParams', {
    Search: searchQuery,
    OrderBy: sortByEnum[sortBy]?.key || '0',
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('moduleReadingFluencySchools/fetchNetwork')
}

const openReport = institutionId => {
  router.push({
    name: 'readingFluencyClasses',
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