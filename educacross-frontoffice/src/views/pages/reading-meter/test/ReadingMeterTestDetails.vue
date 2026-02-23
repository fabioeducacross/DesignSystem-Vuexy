<template>
  <div>
    <b-card class="card-style" body-class="py-1">
      <b-row>
        <b-col cols="12" md>
          <div class="d-flex align-items-center gap-2">
            <span class="text-body h4 mb-0"
              ><span class="font-bold"> {{ dataHistory.testName }}</span></span
            >
            <b-badge variant="light-primary" pill>{{ dataHistory.serieName }}</b-badge>
          </div>
        </b-col>
        <b-col cols="12" md="auto" class="text-right">
          <span class="text-primary h5"
            ><span class="font-bold"> {{ dataHistory.name }}</span>
          </span>
        </b-col>
      </b-row>
    </b-card>
    <ListTableLocalSorting
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataHistory.reports || []"
      :show-search-query-input="false"
      border
    >
      <template #cell(id)="{ value, item }">
        <div class="d-flex gap-2">
          <span class="font-semibold text-nowrap text-body">
            {{ value }}
          </span>
          <div class="d-flex align-items-center">
            <b-badge v-if="item.excluded" variant="light-danger" pill> Cancelado </b-badge>
          </div>
        </div>
      </template>

      <template #[`cell(proficiency)`]="{ value, item }">
        <CellStatus v-if="value" :value="value" enum="proficiency" :pill="item.changeProficiency" />
        <span v-else>-</span>
      </template>

      <template #cell(audioFileUrl)="{ value }">
        <div>
          <audio v-if="value" :src="value" controls></audio>
          <span v-else>-</span>
        </div>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
            v-show="action.isShow(item)"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? `${action.color} cursor-pointer`
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableLocalSorting>
  </div>
</template>

<script setup>
import CellStatus from '@/components/badge/CellStatus.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import router from '@/router'
import { getReadingFluencyHistory } from '@/services/shared/readingMeter/readingMeter.service.js'
import formatDate from '@/utils/date'
import { ref } from 'vue'

const props = defineProps({
  currentItem: {
    type: Object,
    default: () => ({}),
  },
})

const loading = ref(true)

const { testId, classId } = router.currentRoute.params

const dataHistory = ref({})

const tableColumns = [
  {
    key: 'id',
    label: 'Tentativa',
  },
  {
    key: 'readingDate',
    label: 'Data do teste',
    formatter: formatDate,
  },
  {
    key: 'proficiency',
    label: 'NÍVEL DE PROFICIÊNCIA',
    class: 'position-relative',
  },
  {
    key: 'audioFileUrl',
    label: 'Gravação',
  },
  {
    key: 'actions',
    label: 'AÇÕES',
  },
]

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: (data, isEnabled) => {
      return isEnabled ? 'Relatório do aluno' : ''
    },
    isShow: () => true,
    isEnabled: data => data && data.proficiency,
    color: 'text-primary',
    action: data => {
      router.push({
        name: 'readingMetherDetail',
        params: {
          studentId: props.currentItem.id,
          classId,
          testId,
        },
        query: { readingDate: data.readingDate },
      })
    },
  },
]

getReadingFluencyHistory(testId, props.currentItem.id, classId).then(res => {
  dataHistory.value = res.data

  const reports = dataHistory.value.reports

  dataHistory.value.reports = reports.map((obj, index) => ({
    ...obj,
    id: reports.length - index,
  }))

  loading.value = false
})
</script>

<style lang="scss" scoped>
.card-style {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
</style>