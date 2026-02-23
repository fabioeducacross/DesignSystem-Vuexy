<template>
  <ListTable
    ref="listTable"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="Pesquisar por turma"
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
        <span>{{ formatNumber(item.studentsStarted) }}%</span>
      </SemaphoreStatus>
    </template>

    <template #cell(studentsFinished)="{ item }">
      <SemaphoreStatus
        :status-enum="getVariantByRule(item.studentsFinished, 'eventProgress')"
        has-tooltip
      >
        <span>{{ formatNumber(item.studentsFinished) }}%</span>
      </SemaphoreStatus>
    </template>

    <template #cell(time)="{ item }">
      <div class="d-flex align-items-center justify-content-between gap-2">
        <span class="text-capitalize">
          {{ formattedTime(item.time) }}
        </span>
      </div>
    </template>

    <template #cell(actions)="data">
      <div class="text-nowrap d-flex align-items-center gap-3">
        <span
          v-b-tooltip.hover.top="'Detalhes'"
          class="material-symbols-outlined text-primary cursor-pointer"
          @click="handleDetail(data.item.id)"
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
  import { formatNumber, formattedTime } from '@/filters/filters'
  import router from '@/router'
  import { getEventsActiveReportClass } from '@/services/shared/events/Events.Service'
  import store from '@/store'
  import { formatDecimalPlace } from '@/utils/number.js'
  import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
  import { onMounted, ref, watch } from 'vue'

  const props = defineProps({
    serieId: {
      type: Number,
      default: null,
    },
    isLoading: { type: Boolean, required: true },
  })

  const listTable = ref(null)
  const loading = ref(false)

  const tableColumns = [
    { key: 'name', sortable: true, label: 'TURMA' },
    {
      key: 'serieName',
      sortable: true,
      label: 'ANO ESCOLAR',
    },
    {
      key: 'studentsStarted',
      sortable: true,
      label: 'ALUNOS QUE INICIARAM',
    },
    {
      key: 'studentsFinished',
      sortable: true,
      label: 'ALUNOS QUE FINALIZARAM',
    },
    {
      key: 'challenges',
      sortable: true,
      label: 'DESAFIOS',
      formatter: value => formatNumber(value),
    },
    { key: 'time', sortable: true, label: 'TEMPO DE APRENDIZAGEM' },
    { key: 'actions', sortable: false, label: 'AÇÕES' },
  ]

  const { institutionId, eventId } = router.currentRoute.params

  const isNetworkManager = store.getters.accessRole === 'NetworkManager'

  const dataTable = ref([])
  const totalData = ref(0)

  const params = ref({
    Page: 1,
    pageSize: 10,
    OrderBy: 0,
    Ascending: 'true',
    Search: '',
    SerieId: props.serieId,
    institutionId,
  })

  const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
    params.value = {
      Page: currentPage,
      PageSize: perPage,
      OrderBy: `${sortBy}`,
      Ascending: `${!isSortDirDesc}`,
      Search: searchQuery,
      SerieId: props.serieId,
      institutionId,
    }

    fetchData()
  }

  const fetchData = () => {
    loading.value = true
    getEventsActiveReportClass(eventId, params.value)
      .then(({ data }) => {
        dataTable.value = data.data
        totalData.value = data.total
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(() => {
    if (!props.isLoading) {
      fetchData()
    }
  })

  watch([() => props.serieId], () => {
    params.value.SerieId = props.serieId
    params.value.institutionId = institutionId
    params.value.Page = 1
    listTable.value.resetPage()
    fetchData()
  })

  const handleDetail = classId => {
    if (isNetworkManager) {
      router.push({
        name: 'eventClassReportNetwork',
        params: {
          eventId,
          institutionId,
          classId,
        },
      })
    } else {
      router.push({
        name: 'eventClassReport',
        params: {
          eventId,
          classId,
        },
      })
    }
  }
</script>