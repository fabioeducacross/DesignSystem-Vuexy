<template>
  <ListTable
    id="RankingTable"
    ref="listTableRef"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="Pesquisar por escola"
    :loading="loading"
    :row-class="rowClass"
    @change="changeListTable"
  >
    <template #cell(position)="{ item }">
      <div class="d-flex align-items-center gap-1">
        <img
          v-if="item.position === 1"
          class="mr-1"
          src="@/assets/images/stars/gold.svg"
          alt=" Ouro"
        />
        <img
          v-if="item.position === 2"
          class="mr-1"
          src="@/assets/images/stars/silver.svg"
          alt=" Prata"
        />
        <img
          v-if="item.position === 3"
          class="mr-1"
          src="@/assets/images/stars/bronze.svg"
          alt=" Bronze"
        />

        <strong>{{ item.position }}º</strong>
      </div>
    </template>

    <template #cell(institutionName)="{ item }">
      <div class="text-wrap">
        <span class="align-text-top font-bold">{{ item.institutionName }}</span>
      </div>
    </template>

    <template #head(gold)="item">
      <div class="d-flex flex-no-wrap align-items-center gap-1">
        <img src="@/assets/images/trophy/gold.svg" alt="Troféu Ouro" />
        <span>{{ item.label }}</span>
      </div>
    </template>

    <template #head(silver)="item">
      <div class="d-flex flex-no-wrap align-items-center gap-1">
        <img src="@/assets/images/trophy/silver.svg" alt="Troféu Prata" />
        <span>{{ item.label }}</span>
      </div>
    </template>

    <template #head(bronze)="item">
      <div class="d-flex flex-no-wrap align-items-center gap-1">
        <img src="@/assets/images/trophy/bronze.svg" alt="Troféu Bronze" />
        <span>{{ item.label }}</span>
      </div>
    </template>
  </ListTable>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { formatNumber, formattedTime } from '@/filters/filters'
import router from '@/router'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import { ref, watch, computed, onMounted } from 'vue'

const { eventId } = router.currentRoute.params

const listTableRef = ref(null)

const loading = computed(() => store.getters['eventsRankingSchools/loading'])

const { rankingOrder, networkGroup } = useEvents()

const dataTable = computed(() => store.getters['eventsRankingSchools/data'])
const totalData = computed(() => store.getters['eventsRankingSchools/total'])

const tableColumns = [
  { key: 'position', label: 'Posição', sortable: true },
  { key: 'institutionName', label: 'Escola', sortable: true, searchable: true },
  { key: 'networkGroupName', label: 'Grupo Escolar', sortable: true },
  {
    key: 'students',
    label: 'Total de Alunos',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  { key: 'gold', label: 'Ouro', sortable: true, formatter: value => formatNumber(value) },
  { key: 'silver', label: 'Prata', sortable: true, formatter: value => formatNumber(value) },
  { key: 'bronze', label: 'Bronze', sortable: true, formatter: value => formatNumber(value) },
  {
    key: 'time',
    label: 'Tempo de Conclusão',
    sortable: true,
    formatter: value => formattedTime(value),
  },
]

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('eventsRankingSchools/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  store.dispatch('eventsRankingSchools/fetch')
}

watch([networkGroup, rankingOrder], () => {
  store.commit('eventsRankingSchools/setParams', {
    Page: 1,
  })
  listTableRef.value.resetPage()
  store.dispatch('eventsRankingSchools/fetch')
})

const rowClass = (item, type) => {
  if (!item || type !== 'row') return
  if (item.position === 1) return 'tbody-row bg-light-primary'
  if (item.position === 2) return 'tbody-row bg-light-success'
  if (item.position === 3) return 'tbody-row bg-light-info'
  return 'tbody-row'
}

store.commit('events/setEventId', eventId)

onMounted(() => {
  store.dispatch('eventsRankingSchools/fetch')
})
</script>

<style lang="scss">
  #RankingTable {
    .tbody-row {
      color: inherit !important;
    }
  }
</style>