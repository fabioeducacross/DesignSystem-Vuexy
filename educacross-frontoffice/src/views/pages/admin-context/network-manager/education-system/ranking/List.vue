<script setup>
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { formatNumber } from '@/filters/filters'
import { useEducationSystemRankingNetwork } from '@/views/pages/admin-context/network-manager/education-system/ranking/useEducationSystemRankingNetwork.js'
import { computed, ref, watch } from 'vue'

const { ranking, classe, loading, excelLoading, exportExcel } =
  useEducationSystemRankingNetwork()

const rows = computed(() => ranking.value.ranking.length)
const refListTable = ref(null)

/** @param {Number} value */
const formatRankingPositionRow = value => {
  if (value === 0) return '-'
  return `${formatNumber(value)}º`
}

const fields = [
  {
    key: 'institutionPosition',
    label: 'Posição',
    sortable: true,
    formatter: value => formatRankingPositionRow(value),
  },

  {
    key: 'institutionName',
    label: 'Escola',
    sortable: true,
    searchable: true,
    tdClass: 'font-bold',
  },
  {
    key: 'networkGroupName',
    label: 'GRUPO DE ESCOLAS',
    sortable: true,
    tdClass: 'textBody',
  },
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

const setFields = computed(() => {
  if (classe.value != null && classe.value.filter(cs => cs.id).length < 2)
    return fields.filter(f => f.key !== 'networkGroupName')
  return fields
})

const rowClass = (item, type) => {
  if (!item || type !== 'row') return
  if (item.institutionPosition === 1) return 'tbody-row bg-light-primary'
  if (item.institutionPosition === 2) return 'tbody-row bg-light-success'
  if (item.institutionPosition === 3) return 'tbody-row bg-light-info'
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
    :table-columns="setFields"
    :data-table="ranking.ranking"
    :total-data="rows"
    search-placeholder="Pesquisar por escola"
    :loading="loading"
    :row-class="rowClass"
    @exportExcel="exportExcel"
  >
    <template #cell(institutionPosition)="{ value, item }">
      <div class="d-flex align-items-center gap-1">
        <b-img
          v-if="item.institutionPosition === 1"
          class="mr-1"
          src="@/assets/images/stars/gold.svg"
          width="26"
          height="26"
          alt=" Ouro"
        />
        <b-img
          v-if="item.institutionPosition === 2"
          class="mr-1"
          src="@/assets/images/stars/silver.svg"
          width="26"
          height="26"
          alt=" Prata"
        />
        <b-img
          v-if="item.institutionPosition === 3"
          class="mr-1"
          src="@/assets/images/stars/bronze.svg"
          width="26"
          height="26"
          alt=" Bronze"
        />

        <strong class="text-body">{{ value }}</strong>
      </div>
    </template>

    <template #cell(studentName)="{ item }">
      <div class="text-wrap">
        <span class="align-text-top font-bold text-body">{{ item.studentName }}</span>
      </div>
    </template>

    <template #cell(className)="{ item }">
      <span class="text-body">{{ item.className }}</span>
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
        <span class="uppercase">{{ item.label }}</span>
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
        <span class="uppercase">{{ item.label }}</span>
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
        <span class="uppercase">{{ item.label }}</span>
      </div>
    </template>
  </ListTableLocalSorting>
</template>