<template>
  <ListTableLocalSorting
    id="RankingTable"
    ref="listTableRef"
    :table-columns="tableColumnsFiltered"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="Pesquisar por aluno"
    :loading="loadingTable"
    :row-class="rowClass"
    :export-to-excel="exportToExcel"
    :generating-excel="excelLoadingData"
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
    <template #cell(institutionPosition)="{ item }">
      <div class="d-flex align-items-center gap-1">
        <img
          v-if="showStarInPosition(item, 1)"
          class="mr-1"
          src="@/assets/images/stars/gold.svg"
          alt=" Ouro"
        />
        <img
          v-if="showStarInPosition(item, 2)"
          class="mr-1"
          src="@/assets/images/stars/silver.svg"
          alt=" Prata"
        />
        <img
          v-if="showStarInPosition(item, 3)"
          class="mr-1"
          src="@/assets/images/stars/bronze.svg"
          alt=" Bronze"
        />

        <strong>{{ showPosition(item) }}</strong>
      </div>
    </template>
    <template #cell(serieName)="{ item }">
      <b-badge pill variant="light-primary">
        {{ item.serieName }}
      </b-badge>
    </template>
    <template #cell(studentName)="{ value }">
      <b>{{ value }}</b>
    </template>
  </ListTableLocalSorting>
</template>

<script setup>
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { formatNumber } from '@/filters/filters'
import { useEvents } from '@/views/events/useEvents.js'
import NameClasses from '@/views/pages/admin-context/shared/table-columns-components/NameClasses.vue'
import { useMissionPlusRanking } from '@/views/reports/missionPlus/admin-report/classes/ranking/useMissionPlusRanking.js'
import { ref, computed } from 'vue'

const { exportExcel, loadingTable, excelLoading, selectedClass, total, dataTable } =
  useMissionPlusRanking()

const listTableRef = ref(null)

const { rankingOrder, networkGroup } = useEvents()

const excelLoadingData = computed(() => excelLoading.value)

const totalData = computed(() => total.value)

const tableColumns = [
  { key: 'position', label: 'Posição na Turma', sortable: true },
  { key: 'institutionPosition', label: 'Posição na Escola', sortable: true },
  { key: 'studentName', label: 'Aluno', sortable: true, searchable: true },
  { key: 'className', label: 'Turma', sortable: true },
  { key: 'serieName', label: 'Ano Escolar', sortable: true },
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

const validateClassId = computed(() => {
  return selectedClass.value?.id !== null
})

const positionKey = computed(() => {
  return validateClassId.value ? 'classPosition' : 'institutionPosition'
})

const tableColumnsFiltered = computed(() => {
  if (!validateClassId.value) {
    return tableColumns.filter(column => column.key !== 'position')
  }
  return tableColumns
})

const exportToExcel = () => {
  exportExcel()
}

const rowClass = (item, type) => {
  if (!item || type !== 'row') return
  if (item[positionKey.value] === 1) return 'tbody-row bg-light-primary'
  if (item[positionKey.value] === 2) return 'tbody-row bg-light-success'
  if (item[positionKey.value] === 3) return 'tbody-row bg-light-info'
  return 'tbody-row'
}

const showPosition = item => {
  if (!item || !item[positionKey.value]) return '-'
  return `${item[positionKey.value]}°`
}

const showStarInPosition = (item, position) => {
  return item[positionKey.value] === position && selectedClass.value?.id === null
}
</script>

<style lang="scss">
  #RankingTable {
    .tbody-row {
      color: inherit !important;
    }
  }
</style>