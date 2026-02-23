<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-row>
        <b-col cols="12" lg="6">
          <b-card no-body>
            <b-skeleton-table :rows="2" :columns="2"></b-skeleton-table>
          </b-card>
        </b-col>
        <b-col cols="12" lg="6">
          <b-card no-body>
            <b-skeleton-table :rows="2" :columns="2"></b-skeleton-table>
          </b-card>
        </b-col>
      </b-row>
    </template>
    <b-row id="strongWeak" class="match-height">
      <b-col cols="12" lg="6">
        <b-card no-body>
          <b-table
            :fields="fieldsStrongTable"
            :items="dataStrongTable"
            :sort-by.sync="sortByStrong"
            :sort-desc.sync="sortDescStrong"
            thead-tr-class="text-success"
            :show-empty="dataStrongTable.length === 0"
            responsive
          >
            <template v-slot:empty>
              <div class="d-flex flex-column align-items-center">
                <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
                <span class="text-center">Nenhum dado encontrado</span>
              </div>
            </template>
            <template #head()="{ label }">
              <span class="font-semibold">{{ label }}</span>
            </template>

            <template #cell(performance)="{ value }">
              <span class="text-success font-bold">{{ value | formatNumber }}%</span>
            </template>
          </b-table>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <b-card no-body>
          <b-table
            :fields="fieldsWeakTable"
            :items="dataWeakTable"
            :sort-by.sync="sortByWeak"
            :sort-desc.sync="sortDescWeak"
            thead-tr-class="text-danger"
            :show-empty="dataWeakTable.length === 0"
            responsive
          >
            <template v-slot:empty>
              <div class="d-flex flex-column align-items-center">
                <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
                <span class="text-center">Nenhum dado encontrado</span>
              </div>
            </template>
            <template #head()="{ label }">
              <span class="font-semibold">{{ label }}</span>
            </template>

            <template #cell(performance)="{ value }">
              <span class="text-danger font-bold">{{ value | formatNumber }}%</span>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import store from '@/store'
import { computed, ref } from 'vue'

const fieldsStrongTable = [
  { key: 'name', label: 'PONTOS ADEQUADOS E FORTES', sortable: true },
  { key: 'performance', label: 'RENDIMENTO', sortable: true },
]

const fieldsWeakTable = [
  { key: 'name', label: 'PONTOS A MELHORAR', sortable: true },
  { key: 'performance', label: 'RENDIMENTO', sortable: true },
]

const tableStrongWeak = computed(
  () => store.getters['EvaluationTCTStudentsDetail/tableStrongWeak'],
)

const dataStrongTable = computed(() => tableStrongWeak.value.descriptorsStrong)
const dataWeakTable = computed(() => tableStrongWeak.value.descriptorsToImprove)

const sortByStrong = ref('')
const sortDescStrong = ref(false)
const sortByWeak = ref('')
const sortDescWeak = ref(false)

const toggleSort = (tableType, key) => {
  if (tableType === 'strong') {
    if (sortByStrong.value === key) {
      sortDescStrong.value = !sortDescStrong.value
    } else {
      sortByStrong.value = key
      sortDescStrong.value = false
    }
  } else if (tableType === 'weak') {
    if (sortByWeak.value === key) {
      sortDescWeak.value = !sortDescWeak.value
    } else {
      sortByWeak.value = key
      sortDescWeak.value = false
    }
  }
}

const loading = computed(() => store.getters['EvaluationTCTStudentsDetail/loading'])
</script>

<style lang="scss">
  #strongWeak {
    .table:not(.table-dark):not(.table-light) {
      thead:not(.thead-dark) th,
      tfoot:not(.thead-dark) th {
        background-color: white;
      }
    }
  }
</style>