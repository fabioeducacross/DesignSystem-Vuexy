<template>
  <ListTable
    ref="listTable"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="searchForStudent"
    :loading="loading"
    @change="changeListTable"
  >
    <template #head()="item">
      <span class="font-weight-bolder">{{ item.label }}</span>
    </template>

    <template #cell(name)="{ item }">
      <div class="text-wrap">
        <span class="align-text-top font-bold">{{ item.name }}</span>
      </div>
    </template>

    <template #cell(progress)="{ item }">
      <SemaphoreStatus :status-enum="getVariantByRule(item.progress, 'eventProgress')" has-tooltip>
        <span>{{ item.progress | formatNumber }}%</span>
      </SemaphoreStatus>
    </template>

    <template #cell(challenges)="{ item }">
      <span>{{ item.challenges | formatNumber }}</span>
    </template>

    <template #cell(time)="{ item }">
      <span class="text-capitalize">{{ formattedTime(item.time) }}</span>
    </template>

    <template #cell(lastPlayDate)="{ item }">
      <span class="text-capitalize">{{ item.lastPlayDate | formatDate }}</span>
    </template>
  </ListTable>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import router from '@/router'
import { getEventsActiveReportStudent } from '@/services/shared/events/Events.Service'
import useFilters from '@/store/filters/useFilters'
import { formattedTime } from '@/utils/utils.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { onMounted, ref } from 'vue'

const listTable = ref(null)
const loading = ref(false)

const tableColumns = [
  { key: 'name', sortable: true, label: 'ALUNO' },
  { key: 'progress', sortable: true, label: 'PROGRESSO MÉDIO' },
  { key: 'challenges', sortable: true, label: 'DESAFIOS' },
  { key: 'time', sortable: true, label: 'TEMPO DE APRENDIZAGEM' },
  { key: 'lastPlayDate', sortable: false, label: 'ÚLTIMO ACESSO' },
]

const { eventId, institutionId } = router.currentRoute.params

const { classe } = useFilters()

const dataTable = ref([])
const totalData = ref(0)

const params = ref({
  Page: 1,
  pageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
  ClassId: classe.value.ClassId,
  institutionId,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
    ClassId: classe.value.ClassId,
    institutionId,
  }

  fetchData()
}

const fetchData = () => {
  loading.value = true
  getEventsActiveReportStudent(eventId, params.value)
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

const formatDate = date => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR', 'dd/MM/yyyy')
}

</script>