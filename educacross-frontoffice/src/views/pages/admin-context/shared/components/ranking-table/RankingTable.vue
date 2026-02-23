<template>
  <b-card id="RankingTable" no-body class="ranking-wrapper">
    <div class="p-2">
      <span class="ranking-title">
        {{ rankingTitle }}
      </span>
    </div>
    <ListTableLocalSorting
      id="RankingTable"
      ref="refListTable"
      :table-columns="fields"
      :data-table="leaderBoard"
      :total-data="leaderBoard.length"
      :loading="loading"
      search-placeholder="searchForStudent"
    >
      <template #cell(stars)="{ value }">
        <span class="text-body">{{ value }}</span>
      </template>

      <template #cell(pointsXp)="{ value }">
        <span class="text-body">{{ value }}</span>
      </template>

      <template #cell(institutionPosition)="{ item }">
        <span class="text-body">{{ item.institutionPosition }}</span>
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
  import { PERMISSION, ACTION } from '@/consts/permissions'
  import { formatNumber } from '@/filters/filters'
  import { watch, ref, getCurrentInstance } from 'vue'

  const props = defineProps({
    leaderBoard: {
      type: Array,
      default: () => [],
    },
    rankingTitle: {
      type: String,
      default: 'Ranking de conquistas por turma',
    },
    className: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      required: true,
    },
  })

  const vm = getCurrentInstance().proxy

  const fields = [
    {
      key: 'studentName',
      label: 'Aluno',
      sortable: true,
      searchable: true,
      tdClass: 'font-bold',
    },
    {
      key: 'classPosition',
      label: 'Posição na Turma',
      sortable: true,
      formatter: value => formatNumber(value),
    },
    {
      key: 'institutionPosition',
      label: 'Posição na Escola',
      sortable: true,
    },
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

  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.ADMIN)) {
    fields.splice(1, 0, {
      key: 'className',
      label: 'Turma',
      sortable: true,
    })
  }

  const refListTable = ref(null)

  watch(
    () => props.leaderBoard,
    () => {
      if (refListTable.value && typeof refListTable.value.resetPage === 'function') {
        refListTable.value.resetPage()
      }
    }
  )
</script>

<style lang="scss" scoped>
  .ranking-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    color: #202223;
  }
</style>