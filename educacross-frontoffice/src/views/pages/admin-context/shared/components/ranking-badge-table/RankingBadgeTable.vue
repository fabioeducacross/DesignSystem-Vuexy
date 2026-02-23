<template>
  <b-card no-body>
    <b-card-body>
      <h3>Ranking de conquistas - Ilhas {{ new Date().getFullYear() }}</h3>
    </b-card-body>
    <div class="overflow-hidden w-100">
      <b-skeleton-table :columns="8" :rows="5" :class="{ 'd-none': !loading }" />
    </div>
    <b-table-simple responsive :class="{ 'd-none': loading }">
      <b-thead>
        <b-tr>
          <b-th colspan="4" class="text-center"> Ranking </b-th>
          <b-th colspan="4" class="text-center"> Insígnias </b-th>
        </b-tr>
        <b-tr>
          <b-th scope="col"> Nome </b-th>
          <b-th scope="col" class="text-center"> Classe </b-th>
          <b-th scope="col" class="text-center"> Escola </b-th>
          <b-th scope="col" class="text-center"> Geral </b-th>
          <b-th scope="col">
            <div class="image-column">
              <img
                src="@/assets/images/badges-icon/gold-badge.png"
                alt="insígnia-ouro"
                class="icon-badge"
              />
              <span class="text-uppercase">Ouro</span>
            </div>
          </b-th>
          <b-th scope="col">
            <div class="image-column">
              <img
                src="@/assets/images/badges-icon/silver-badge.png"
                alt="insígnia-prata"
                class="icon-badge"
              />
              <span class="text-uppercase">Prata</span>
            </div>
          </b-th>
          <b-th scope="col">
            <div class="image-column">
              <img
                src="@/assets/images/badges-icon/bronze-badge.png"
                alt="insígnia-bronze"
                class="icon-badge"
              />
              <span class="text-uppercase">Bronze</span>
            </div>
          </b-th>
          <b-th scope="col">
            <div class="image-column">
              <img
                src="@/assets/images/ranking-icons/coin.png"
                alt="Moedas conquistadas na missão"
                class="icon-badge"
              />
              <span class="text-uppercase">Moedas</span>
            </div>
          </b-th>
        </b-tr>
      </b-thead>
      <b-tbody v-if="badgeRankingByClass.length > 0">
        <b-tr v-for="(badge, index) in getPage(badgeRankingByClass, currentPage)" :key="index">
          <b-td>
            {{ badge.studentName }}
          </b-td>
          <b-td class="text-center">
            {{ badge.classPosition === 0 ? '-' : `${formatNumber(badge.classPosition)}º` }}
          </b-td>
          <b-td class="text-center">
            {{
              badge.institutionPosition === 0 ? '-' : `${formatNumber(badge.institutionPosition)}º`
            }}
          </b-td>
          <b-td class="text-center">
            {{ badge.generalPosition === 0 ? '-' : `${formatNumber(badge.generalPosition)}º` }}
          </b-td>
          <b-td class="text-center">
            {{ badge.gold | formatNumber }}
          </b-td>
          <b-td class="text-center"> {{ badge.silver | formatNumber }} </b-td>
          <b-td class="text-center"> {{ badge.bronze | formatNumber }} </b-td>
          <b-td class="text-center"> {{ badge.coins | formatNumber }} </b-td>
        </b-tr>
      </b-tbody>
      <b-tbody v-else>
        <b-tr>
          <b-td colspan="8" class="text-center"> Nenhum dado encontrado. </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-pagination
      v-model="currentPage"
      first-number
      last-number
      class="pagination"
      hide-goto-end-buttons
      :total-rows="rows"
      :per-page="perPage"
    />
  </b-card>
</template>

<script setup>
import { formatNumber } from '@/filters/filters'

const props = defineProps({
  badgeRankingByClass: { type: Array, required: true },
  teacher: { type: String },
  loading: { type: Boolean, required: true },
})

// Reactive state
import { ref, computed, onMounted } from 'vue'

const currentPage = ref(1)
const perPage = ref(5)
const globalClassId = ref(1)

// Computed rows
const rows = computed(() => props.badgeRankingByClass.length)

const sortByGeneralRanking = (first, second) => {
  if (first.generalPosition === 0) return 1
  if (second.generalPosition === 0) return -1
  return first.generalPosition - second.generalPosition
}

const getPage = (data, page) => {
  if (data.length === 0) {
    return data
  }
  const dataArray = []
  for (let i = page * perPage.value - perPage.value; i < page * perPage.value; i += 1) {
    if (data[i] !== undefined) {
      dataArray.push(data[i])
    }
  }
  return dataArray
}

onMounted(() => {
  props.badgeRankingByClass.sort(sortByGeneralRanking)
})
</script>

<style lang="scss" scoped>
  .image-column {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-badge {
    width: 21px;
    height: 24px;
    margin-right: 0.75rem;
  }

  .hidden-columnMobile {
    @media (max-width: 900px) {
      display: none;
    }
  }
</style>