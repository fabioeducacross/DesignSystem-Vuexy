<template>
  <ListTableLocalSorting
    id="RankingTable"
    ref="listTableRef"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="Pesquisar por escola"
    :loading="loadingTable"
    :row-class="rowClass"
    :export-to-excel="exportToExcel"
    :generating-excel="excelLoading"
  >
    <template #head(stars)="item">
      <div class="d-flex flex-no-wrap align-items-center gap-1">
        <b-img
          src="@/assets/images/teacher-context/school-context/ranking-icons/Estrela.svg"
          width="20px"
          height="20px"
          alt="Estrelas"
        />
        <span>{{ item.label }}</span>
      </div>
    </template>
    <template #head(pointsXp)="item">
      <div class="d-flex flex-no-wrap align-items-center gap-1">
        <b-img
          src="@/assets/images/teacher-context/school-context/ranking-icons/Raio.svg"
          width="20px"
          height="20px"
          alt="Experiencia"
        />
        <span>{{ item.label }}</span>
      </div>
    </template>
    <template #head(coins)="item">
      <div class="d-flex flex-no-wrap align-items-center gap-1">
        <b-img
          src="@/assets/images/teacher-context/school-context/ranking-icons/coin.png"
          width="20px"
          height="20px"
          alt="Moedas"
        />
        <span>{{ item.label }}</span>
      </div>
    </template>
    <template #cell(institutionPosition)="{ item }">
      <div class="d-flex align-items-center gap-1">
        <img
          v-if="item.institutionPosition === 1"
          class="mr-1"
          src="@/assets/images/stars/gold.svg"
          alt=" Ouro"
        />
        <img
          v-if="item.institutionPosition === 2"
          class="mr-1"
          src="@/assets/images/stars/silver.svg"
          alt=" Prata"
        />
        <img
          v-if="item.institutionPosition === 3"
          class="mr-1"
          src="@/assets/images/stars/bronze.svg"
          alt=" Bronze"
        />

        <strong>{{ showPosition(item) }}</strong>
      </div>
    </template>
    <template #cell(institutionName)="{ value }">
      <b>{{ value }}</b>
    </template>
  </ListTableLocalSorting>
</template>

<script setup>
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { formatNumber } from '@/filters/filters'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import { useMissionPlusRanking } from '@/views/reports/missionPlus/admin-report/institutions/ranking/useReportMissionPlusRanking.js'
import { ref, computed } from 'vue'

const { MODULE_NAME, exportExcel, loadingTable } = useMissionPlusRanking()

const listTableRef = ref(null)

const loading = computed(() => store.getters[`${MODULE_NAME}/loadingTable`])

const excelLoading = computed(() => store.getters[`${MODULE_NAME}/excelLoading`])

const { rankingOrder, networkGroup } = useEvents()

const dataTable = computed(() => store.getters[`${MODULE_NAME}/dataTable`])
const totalData = 5

const tableColumns = [
  { key: 'institutionPosition', label: 'Posição', sortable: true },
  {
    key: 'institutionName',
    label: 'Escola',
    sortable: true,
    searchable: true,
  },
  { key: 'networkGroupName', label: 'Grupo De escolas', sortable: true },
  {
    key: 'stars',
    label: 'Estrelas',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  {
    key: 'pointsXp',
    label: 'Pontos XP',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  {
    key: 'coins',
    label: 'Moedas',
    sortable: true,
    formatter: value => formatNumber(value),
  },
]

const exportToExcel = () => {
  exportExcel()
}

const rowClass = (item, type) => {
  if (!item || type !== 'row') return
  if (item.institutionPosition === 1) return 'tbody-row bg-light-primary'
  if (item.institutionPosition === 2) return 'tbody-row bg-light-success'
  if (item.institutionPosition === 3) return 'tbody-row bg-light-info'
  return 'tbody-row'
}

const showPosition = item => {
  if (!item || !item.institutionPosition) return '-'
  return `${item.institutionPosition}°`
}
</script>

<style lang="scss">
  #RankingTable {
    .tbody-row {
      color: inherit !important;
    }
  }
</style>