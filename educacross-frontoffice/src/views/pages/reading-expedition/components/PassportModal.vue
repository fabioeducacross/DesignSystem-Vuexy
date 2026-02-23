<template>
  <div>
    <div>
      <b-skeleton-wrapper :loading="loading">
        <template v-slot:loading>
          <b-skeleton-img no-aspect height="50px" class="rounded-md mb-1" />
        </template>
        <div class="d-flex align-items-center justify-content-between border p-1 rounded-md mb-2">
          <div>
            <span
              >Aluno: <span class="text-primary font-bold">{{ data.studentName }}</span></span
            >
          </div>
          <div>
            <span
              >Turma: <span class="text-primary font-bold">{{ data.className }}</span></span
            >
          </div>
        </div>
      </b-skeleton-wrapper>
    </div>
    <div>
      <b-skeleton-wrapper :loading="loading" class="w-100">
        <template v-slot:loading>
          <b-row>
            <b-col cols="12" lg="6" class="mb-1">
              <b-skeleton-img no-aspect height="100px" width="100%" class="rounded-md mb-1" />
            </b-col>
            <b-col cols="12" lg="6" class="mb-1">
              <b-skeleton-img no-aspect height="100px" width="100%" class="rounded-md mb-1" />
            </b-col>
          </b-row>
        </template>
        <b-row>
          <b-col v-for="(fluency, index) in fluencyTests" :key="index" cols="12" lg="6">
            <div
              class="d-flex align-items-center justify-content-between border rounded-md p-1 mb-1"
            >
              <div>
                <h4 class="font-bold text-body text-wrap">{{ fluency.name }}</h4>

                <div class="d-flex justify-content-start mb-50">
                  <div>
                    <BadgeStatusReadingExpedition
                      :value="
                        fluency.status === EExpeditionStageStatus.Finished
                          ? fluency.level
                          : fluency.status
                      "
                      :enum="
                        fluency.status === EExpeditionStageStatus.Finished
                          ? 'ProficiencyTestStatusEnum'
                          : 'ExpeditionStageStatusEnum'
                      "
                      :pill="!fluency.changeLevel"
                    />
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 justify-content-start">
                  <span class="material-symbols-outlined" style="font-size: 16px">pace</span>
                  <span>
                    Tempo investido:
                    <span class="font-semibold">{{ fluency.time | formattedTime }}</span>
                  </span>
                </div>
              </div>
              <div class="d-flex align-items-center p-1 bg-light-primary rounded-md">
                <span class="material-symbols-outlined">dictionary</span>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-skeleton-wrapper>
    </div>
    <div>
      <b-skeleton-table :columns="tableColumns.length" :rows="5" :class="{ 'd-none': !loading }" />
      <b-table
        id="list-table"
        ref="refListTable"
        :class="{ 'd-none': loading }"
        class="position-relative rounded-md"
        thead-tr-class="thead-row"
        :tbody-tr-class="rowClass"
        :fields="tableColumns"
        :items="data.units"
        responsive
        outlined
        show-empty
      >
        <template #cell(name)="{ item }">
          <div class="d-flex align-items-center gap-2 mb-50">
            <span class="font-semibold uppercase">{{ item.name }}</span>
            <BadgeStatusReadingExpedition
              v-if="item.status === EExpeditionStageStatus.Block"
              :value="item.status"
              enum="ExpeditionStageStatusEnum"
            />
          </div>
          <div
            class="d-flex align-items-center gap-2"
            :class="{ 'opacity-50': item.status === EExpeditionStageStatus.Block }"
          >
            <img :src="item.coverImageUrl" alt="" width="41" height="41" />
            <span class="font-semibold">{{ item.bookTitle }}</span>
          </div>
        </template>
        <template #cell()="{ value }">
          <div style="min-width: 165px; min-height: 65px">
            <CellStatusReadingExpedition
              :value="value.status === EExpeditionStageStatus.Finished ? value.level : value.status"
              :enum="
                value.status === EExpeditionStageStatus.Finished
                  ? 'ProficiencyTestStatusEnum'
                  : 'ExpeditionStageStatusEnum'
              "
              :time="value.time"
              :pill="!value.changeLevel"
            />
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import { EExpeditionStageStatus } from '@/consts/ReadingExpeditionEnum.js'
import store from '@/store'
import BadgeStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/BadgeStatusReadingExpedition.vue'
import CellStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/CellStatusReadingExpedition.vue'
import { computed } from 'vue'

const props = defineProps({
  studentId: {
    type: Number || String,
    required: true,
  },
})

const loading = computed(() => store.getters['ReadingExpeditionModule/loadingPassport'])

const data = computed(() => store.getters['ReadingExpeditionModule/passport'])

const fluencyTests = computed(() => {
  const tests = []

  if (data.value.initialReadingFluency) {
    tests.push({ name: 'Teste de Fluência inicial', ...data.value.initialReadingFluency })
  }

  if (data.value.finalReadingFluency) {
    tests.push({ name: 'Teste de Fluência final', ...data.value.finalReadingFluency })
  }

  return tests
})

const tableColumnsEnum = [
  {
    key: 'readingChallenge',
    label: 'Desafio de Leitura',
    sortable: false,
    tdClass: 'p-0',
    class: 'position-relative',
  },
  {
    key: 'writingChallenge',
    label: 'Desafio de Escrita',
    sortable: false,
    tdClass: 'p-0',
    class: 'position-relative',
  },
  {
    key: 'understandingChallenge',
    label: 'Desafio de Compreensão',
    sortable: false,
    tdClass: 'p-0',
    class: 'position-relative',
  },
  {
    key: 'expeditionGuides',
    label: 'Trilhas de Jogos',
    sortable: false,
    tdClass: 'p-0',
    class: 'position-relative',
  },
]

const tableColumns = computed(() => {
  if (data.value.units && data.value.units.length) {
    return [
      { key: 'name', label: 'Unidades', sortable: false },
      ...tableColumnsEnum.filter(column =>
        Object.keys(data.value.units[0]).includes(column.key),
      ),
    ]
  }
  return [{ key: 'name', label: 'Unidades', sortable: false }]
})

const rowClass = item => {
  if (item && item.status === EExpeditionStageStatus.Block) {
    return 'table-blocked'
  }
  return ''
}
</script>

<style>
  .table-blocked {
    background-color: rgba(216, 214, 222, 0.12);
  }
</style>