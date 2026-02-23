<template>
  <ListTable
    ref="listTable"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="Pesquisar por escola"
    :loading="loading"
    @change="changeListTable"
  >
    <template #cell(name)="{ item }">
      <div class="text-wrap">
        <span class="align-text-top font-bold">{{ item.name }}</span>
      </div>
    </template>

    <template #head()="item">
      <span class="font-weight-bolder">{{ item.label }}</span>
    </template>

    <template #cell(studentsStarted)="{ item }">
      <SemaphoreStatus
        :status-enum="getVariantByRule(item.studentsStarted, 'eventProgress')"
        has-tooltip
      >
        <span>{{ item.studentsStarted | formatNumber }}%</span>
      </SemaphoreStatus>
    </template>

    <template #cell(studentsFinished)="{ item }">
      <SemaphoreStatus
        :status-enum="getVariantByRule(item.studentsFinished, 'eventProgress')"
        has-tooltip
      >
        <span>{{ item.studentsFinished | formatNumber }}%</span>
      </SemaphoreStatus>
    </template>

    <template #cell(challenges)="{ item }">
      <span>{{ item.challenges | formatNumber }}</span>
    </template>

    <template #cell(time)="{ item }">
      <div class="d-flex align-items-center justify-content-between gap-2">
        <span class="text-capitalize">
          {{ item.time | formattedTime }}
        </span>
      </div>
    </template>

    <template #cell(actions)="data">
      <div class="text-nowrap d-flex align-items-center gap-3">
        <span
          v-b-tooltip.hover.top="'Detalhes'"
          class="material-symbols-outlined text-primary cursor-pointer"
          @click="redirectToEventInstitution(data.item.id)"
        >
          trending_up
        </span>
      </div>
    </template>
  </ListTable>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import { getEventsActiveReportInstitution } from '@/services/shared/events/Events.Service'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { onMounted, ref, watch } from 'vue'

// Props
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({}),
  },
})

// Refs & State
const listTable = ref(null)
const loading = ref(false)
const tableColumns = [
  { key: 'name', sortable: true, label: 'ESCOLA' },
  {
    key: 'students',
    sortable: true,
    label: 'TOTAL DE ALUNOS',
    formatter: value => formatNumber(value),
  },
  { key: 'studentsStarted', sortable: true, label: 'INICIARAM' },
  { key: 'studentsFinished', sortable: true, label: 'FINALIZARAM' },
  { key: 'challenges', sortable: true, label: 'DESAFIOS' },
  { key: 'time', sortable: true, label: 'TEMPO' },
  { key: 'actions', sortable: false, label: 'AÇÕES' },
]

const eventId = ref(router.currentRoute.params.eventId)
const dataTable = ref([])
const totalData = ref(0)

const params = ref({
  Page: 1,
  pageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
  NetworkGroupId: props.filters.NetworkGroupId || null,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
    NetworkGroupId: props.filters.NetworkGroupId || null,
  }

  fetchData()
}

const fetchData = () => {
  loading.value = true
  getEventsActiveReportInstitution(eventId.value, params.value)
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  fetchData()
})

watch(
  () => props.filters,
  () => {
    params.value.NetworkGroupId = props.filters.NetworkGroupId
    fetchData()
  }
)

const redirectToEventInstitution = institutionId => {
  router.push({
    name: 'eventInstitution',
    params: {
      eventId: eventId.value,
      institutionId,
    },
  })
}
</script>