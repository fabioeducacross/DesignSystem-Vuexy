<template>
  <b-card id="RankingMissionTable" no-body class="ranking-wrapper">
    <b-card class="shadow-none" bg-variant="light-primary">
      <b-row>
        <b-col>
          <div
            class="d-flex flex-column flex-sm-row align-items-center justify-content-start gap-2"
          >
            <span class="text-primary font-bold">
              Missão com {{ countActivities | formatNumber }} jogos
            </span>
            <span class="point-circle d-none d-sm-block bg-primary" />
            <span class="text-primary">
              Cada aluno pode conquistar até {{ countStars | formatNumber }} estrelas.
            </span>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <ListTableLocalSorting
      id="RankingTable"
      ref="refListTable"
      :table-columns="fields"
      :data-table="dataTable"
      :total-data="5"
      search-placeholder="searchForStudent"
      :row-class="rowClass"
      :export-to-excel="exportToExcel"
      :generating-excel="excelLoading"
      :loading="busy"
    >
      <template #cell(position)="{ item }">
        <div class="d-flex align-items-center gap-1">
          <img
            v-if="item.position === '1º'"
            class="mr-1"
            src="@/assets/images/stars/gold.svg"
            alt=" Ouro"
          />
          <img
            v-if="item.position === '2º'"
            class="mr-1"
            src="@/assets/images/stars/silver.svg"
            alt=" Prata"
          />
          <img
            v-if="item.position === '3º'"
            class="mr-1"
            src="@/assets/images/stars/bronze.svg"
            alt=" Bronze"
          />

          <strong>{{ item.position }}</strong>
        </div>
      </template>
      <template #cell(stars)="{ item }">
        {{ item.stars | formatNumber }}/{{ countStars | formatNumber }}
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
  </b-card>
</template>

<script setup>
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { formatNumber } from '@/filters/filters'
import store from '@/store'
import rankingMissionsModule from '@/store/pageModules/missions/ranking-missions-module.js'
import { useRankingMissionTable } from '@/views/pages/admin-context/shared/components/ranking-mission-table/useRankingMissionTable'
import { BCard, BPagination } from 'bootstrap-vue'
import { ref, onBeforeMount } from 'vue'

// Props
const props = defineProps({
  leaderBoard: {
    type: Array,
    default: () => [],
  },
  busy: {
    type: Boolean,
    default: true,
  },
  rankingTitle: {
    type: String,
    default: 'Ranking de conquistas por turma',
  },
  className: {
    type: String,
    default: '',
  },
})

const {
  MODULE_NAME,
  countStars,
  countActivities,
  exportExcel,
  getRankingData,
  loading,
  excelLoading,
  dataTable,
} = useRankingMissionTable()

if (!store.hasModule(MODULE_NAME)) {
  store.registerModule(MODULE_NAME, rankingMissionsModule)
}

const fields = [
  {
    key: 'position',
    label: 'Posição na Turma',
    sortable: true,
  },
  {
    key: 'studentName',
    label: 'Aluno',
    sortable: true,
    searchable: true,
    tdClass: 'font-bold',
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
    formatter: value => formatNumber(value),
  },
  {
    key: 'coins',
    label: 'Moedas',
    sortable: true,
    formatter: value => formatNumber(value),
  },
]

const rowClass = (item, type) => {
  if (!item || type !== 'row') return
  if (item.position === '1º') return 'tbody-row bg-light-primary'
  if (item.position === '2º') return 'tbody-row bg-light-success'
  if (item.position === '3º') return 'tbody-row bg-light-info'
  return 'tbody-row'
}

const exportToExcel = () => {
  exportExcel()
}

const refListTable = ref(null)

onBeforeMount(() => {
  getRankingData()
})
</script>

<style lang="scss" scoped>
  .ranking-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    color: #2c2c2c;
  }
</style>