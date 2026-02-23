<template>
  <ListTableLocalSorting
    id="RankingTable"
    ref="listTableRef"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="Pesquisar por aluno"
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
    <template #cell(position)="{ item }">
      <div class="d-flex align-items-center gap-1">
        <img
          v-if="item.classPosition === 1"
          class="mr-1"
          src="@/assets/images/stars/gold.svg"
          alt=" Ouro"
        />
        <img
          v-if="item.classPosition === 2"
          class="mr-1"
          src="@/assets/images/stars/silver.svg"
          alt=" Prata"
        />
        <img
          v-if="item.classPosition === 3"
          class="mr-1"
          src="@/assets/images/stars/bronze.svg"
          alt=" Bronze"
        />

        <strong>{{ showPosition(item) }}</strong>
      </div>
    </template>
  </ListTableLocalSorting>
</template>

<script setup>
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { useEvents } from '@/views/events/useEvents.js'
import { useMissionRanking } from '@/views/pages/missions/missions-list/ranking/useMissionsRanking'
import { ref } from 'vue'

const { loadingTable, excelLoading, dataTable, exportExcel } = useMissionRanking()

const listTableRef = ref(null)

const { rankingOrder, networkGroup } = useEvents()

const totalData = 5

const tableColumns = [
  { key: 'position', label: 'Posição na Turma', sortable: true },
  { key: 'institutionPosition', label: 'Posição na Escola', sortable: true },
  { key: 'studentName', label: 'Aluno', sortable: true, searchable: true },
  {
    key: 'stars',
    label: 'Estrelas',
    sortable: true,
  },
  {
    key: 'pointsXp',
    label: 'Pontos XP',
    sortable: true,
  },
  {
    key: 'coins',
    label: 'Moedas',
    sortable: true,
  },
]

const exportToExcel = () => {
  exportExcel()
}

const rowClass = (item, type) => {
  if (!item || type !== 'row') return
  if (item?.classPosition === 1) return 'tbody-row bg-light-primary'
  if (item?.classPosition === 2) return 'tbody-row bg-light-success'
  if (item?.classPosition === 3) return 'tbody-row bg-light-info'
  return 'tbody-row'
}

const showPosition = item => {
  if (!item?.classPosition) return '-'
  return `${item.classPosition}°`
}
</script>

<style lang="scss">
  #RankingTable {
    .tbody-row {
      color: inherit !important;
    }
  }
</style>