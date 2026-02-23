<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-row>
        <b-col cols="12" lg="6">
          <b-card no-body>
            <b-skeleton-table :columns="2" :rows="2"></b-skeleton-table>
          </b-card>
        </b-col>
        <b-col cols="12" lg="6">
          <b-card no-body>
            <b-skeleton-table :columns="2" :rows="2"></b-skeleton-table>
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
            :show-empty="dataStrongTable.length === 0"
            responsive
            thead-tr-class="text-success"
          >
            <template v-slot:empty>
              <div class="d-flex flex-column align-items-center">
                <b-img class="mb-1" src="@/assets/images/belinha/regua.svg" />
                <span v-if="!dataWeakTable.length" class="text-center">
                  Nenhum aluno iniciou a atividade. Volte mais tarde para conferir
                  <span class="font-bold text-danger">os rendimentos.</span>
                </span>
                <span v-else class="text-center">
                  Que pena! Parece que não há
                  <span class="font-bold text-danger">nenhum rendimento acima de 50%.</span>
                </span>
              </div>
            </template>
            <template #head()="{ label, field }">
              <span class="d-flex align-items-center gap-2">
                <span v-if="field.icon" class="material-symbols-outlined">{{ field.icon }}</span>
                <span class="font-semibold">{{ label }}</span>
              </span>
            </template>

            <template #cell(name)="{ item }">
              <span class="d-flex align-items-center gap-2">
                <b-img-lazy
                  :alt="item.name"
                  :src="item.imageUrl ? item.imageUrl : SubjectEnum[subjectId].image"
                  height="40"
                  width="40"
                />
                <span>{{ item.name }}</span>
              </span>
            </template>

            <template #cell(performance)="{ value }">
              <span class="text-success font-bold">{{ $filters.formatNumber(value) }}%</span>
            </template>
          </b-table>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <b-card no-body>
          <b-table
            :fields="fieldsWeakTable"
            :items="dataWeakTable"
            :show-empty="dataWeakTable.length === 0"
            responsive
            thead-tr-class="text-danger"
          >
            <template v-slot:empty>
              <div class="d-flex flex-column align-items-center">
                <b-img class="mb-1" src="@/assets/images/belinha/mochila.svg" />
                <span v-if="!dataStrongTable.length" class="text-center">
                  Nenhum aluno iniciou a atividade. Volte mais tarde para conferir os
                  <span class="font-bold text-success">rendimentos.</span>
                </span>
                <span v-else class="text-center"
                  >Uau!
                  <span class="font-bold text-success"
                    >Todos os desempenhos estão acima de 50%.</span
                  ></span
                >
              </div>
            </template>
            <template #head()="{ label, field }">
              <span class="d-flex align-items-center gap-2">
                <span v-if="field.icon" class="material-symbols-outlined">{{ field.icon }}</span>
                <span class="font-semibold">{{ label }}</span>
              </span>
            </template>

            <template #cell(name)="{ item }">
              <span class="d-flex align-items-center gap-2">
                <b-img-lazy
                  :alt="item.name"
                  :src="item.imageUrl ? item.imageUrl : SubjectEnum[subjectId].image"
                  height="40"
                  width="40"
                />
                <span>{{ item.name }}</span>
              </span>
            </template>

            <template #cell(performance)="{ value }">
              <span class="text-danger font-bold">{{ $filters.formatNumber(value) }}%</span>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import store from '@/store'
import { computed } from 'vue'

const fieldsStrongTable = [
  { key: 'name', label: 'PONTOS ADEQUADOS E FORTES', icon: 'family_star' },
  { key: 'performance', label: 'RENDIMENTO', thStyle: 'width: 130px' },
]

const fieldsWeakTable = [
  { key: 'name', label: 'PONTOS A MELHORAR', icon: 'sentiment_dissatisfied' },
  { key: 'performance', label: 'RENDIMENTO', thStyle: 'width: 130px' },
]

const tableStrongWeak = computed(
  () => store.getters['ReportMissionPlusClasse/tableStrongWeak'],
)

const subjectId = computed(() => store.getters['ReportMissionPlusClasse/subjectId'])

const dataStrongTable = computed(() => tableStrongWeak.value.descriptorsStrong)
const dataWeakTable = computed(() => tableStrongWeak.value.descriptorsToImprove)

const loading = computed(() => store.getters['ReportMissionPlusClasse/loading'])
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