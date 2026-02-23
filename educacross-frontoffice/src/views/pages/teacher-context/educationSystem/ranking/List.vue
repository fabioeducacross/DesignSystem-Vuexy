<script setup>
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { formatNumber } from '@/filters/filters'
import { useEducationSystemRanking } from '@/views/pages/teacher-context/educationSystem/ranking/useEducationSystemRanking'
import { computed, ref, watch } from 'vue'

const { ranking, loading, excelLoading, exportExcel } = useEducationSystemRanking()
const refListTable = ref(null)

const rows = computed(() => ranking.value.ranking.length)

/** @param {Number} value */
const formatRankingPositionRow = value => {
  if (value === 0) return '-'
  return `${formatNumber(value)}º`
}

const fields = [
  {
    key: 'classPosition',
    label: 'POSIÇÃO NA TURMA',
    sortable: true,
    formatter: value => formatRankingPositionRow(value),
  },
  {
    key: 'institutionPosition',
    label: 'POSIÇÃO NA ESCOLA',
    sortable: true,
    searchable: true,
    formatter: value => formatRankingPositionRow(value),
  },
  { key: 'studentName', label: 'ALUNO', sortable: true, searchable: true },
  {
    key: 'stars',
    label: 'ESTRELAS',
    sortable: true,
  },
  {
    key: 'pointsXp',
    label: 'PONTOS XP',
    sortable: true,
  },
  {
    key: 'coins',
    label: 'MOEDAS',
    sortable: true,
  },
]

const rowClass = (item, type) => {
  if (!item || type !== 'row') return
  if (item.classPosition === 1) return 'tbody-row bg-light-primary'
  if (item.classPosition === 2) return 'tbody-row bg-light-success'
  if (item.classPosition === 3) return 'tbody-row bg-light-info'
  return 'tbody-row'
}

watch(ranking, () => {
  refListTable.value.resetPage()
})
</script>

<template>
  <ListTableLocalSorting
    id="RankingTable"
    ref="refListTable"
    :table-columns="fields"
    :data-table="ranking.ranking"
    :total-data="rows"
    search-placeholder="searchForStudent"
    :loading="loading"
    :row-class="rowClass"
    :export-to-excel="exportExcel"
    :generating-excel="excelLoading"
  >
    <template #cell(classPosition)="{ value, item }">
      <div class="d-flex align-items-center gap-1">
        <b-img
          v-if="item.classPosition === 1"
          class="mr-1"
          src="@/assets/images/stars/gold.svg"
          width="26"
          height="26"
          alt=" Ouro"
        />
        <b-img
          v-if="item.classPosition === 2"
          class="mr-1"
          src="@/assets/images/stars/silver.svg"
          width="26"
          height="26"
          alt=" Prata"
        />
        <b-img
          v-if="item.classPosition === 3"
          class="mr-1"
          src="@/assets/images/stars/bronze.svg"
          width="26"
          height="26"
          alt=" Bronze"
        />
        <strong class="text-body">{{ value }}</strong>
      </div>
    </template>

    <template #cell(institutionPosition)="{ value }">
      <span class="text-body">{{ value }}</span>
    </template>

    <template #cell(studentName)="{ item }">
      <div class="text-wrap">
        <span class="align-text-top font-bold text-body">{{ item.studentName }}</span>
      </div>
    </template>

    <template #cell(stars)="{ value }">
      <span class="text-body">{{ value }}</span>
    </template>

    <template #cell(pointsXp)="{ value }">
      <span class="text-body">{{ value }}</span>
    </template>

    <template #cell(coins)="{ value }">
      <span class="text-body">{{ value }}</span>
    </template>

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
  </ListTableLocalSorting>
</template>