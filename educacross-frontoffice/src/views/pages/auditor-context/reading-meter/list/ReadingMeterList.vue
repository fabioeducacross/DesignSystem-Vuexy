<template>
  <SimpleTab>
    <b-row class="match-height">
      <b-col cols="12">
        <ReadingMeterFilter />
      </b-col>
      <b-col cols="12">
        <ListTable
          ref="refList"
          :table-columns="tableColumns"
          :data-table="readings"
          :total-data="totalData"
          search-placeholder="Pesquisar por avaliação"
          :loading="loading"
          show-view-selection
          :columns="4"
          @change="changePage"
        >
          <template #cell(evaluationName)="{ item }">
            <div class="d-flex align-items-center gap-2">
              <div v-if="item.types" class="d-flex gap-1">
                <ExerciseType
                  v-for="exerciseId in item.types"
                  :key="exerciseId"
                  :exercise-id="exerciseId"
                  :size="32"
                  class="mr-50"
                />
              </div>

              <span class="font-bold">
                {{ item.name }}
              </span>

              <b-badge pill variant="light-primary">{{ item.serieName }}</b-badge>
            </div>
          </template>

          <template #cell(startDate)="{ item }">
            <div>
              <span>{{ formatDate(item.startDate) }}</span>
            </div>
          </template>

          <template #cell(endDate)="{ item }">
            <div>
              <span>{{ formatDate(item.endDate) }}</span>
            </div>
          </template>

          <template #cell(progress)="{ item }">
            <ProgressBarHorizontalV2
              v-if="item.studentsAudited || item.studentsAudited === 0"
              height="12px"
              show-values
              :value="item.studentsAudited"
              :get-variant="getColorsEnum"
              :max="item.students"
              values-divisor=" de "
            >
              <template v-slot:description>&nbsp;alunos</template>
            </ProgressBarHorizontalV2>
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

          <template #card="{ data }">
            <ReadingMeterCard :data="data" :table-actions="tableActions" />
          </template>
        </ListTable>
        <LegendEnum :legends="legends" />
      </b-col>
    </b-row>
  </SimpleTab>
</template>

<script setup>
import ReadingMeterCard from './ReadingMeterCard.vue'
import ReadingMeterFilter from './ReadingMeterFilter.vue'
import ExerciseType from '@/components/exercise-type/reading-meter/ExerciseType.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getReadingMeterStatusEnum } from '@/consts/ReadingMeterEnum.js'
import { getVariantByRule } from '@/consts/legends/index.js'
import { progressLegend } from '@/consts/legends/progressEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import formatDate from '@/utils/date.js'
import { computed, ref, watch } from 'vue'

const { classe } = useFilters()

const refList = ref(null)

const pagination = computed(() => store.getters['ReadingMeterEvaluationModule/pagination'])
const totalData = computed(() => pagination.value.totalData)
const readings = computed(() => store.getters['ReadingMeterEvaluationModule/readings'])
const loading = computed(() => store.getters['ReadingMeterEvaluationModule/loading'])
const exerciseType = computed(
  () => store.getters['ReadingMeterEvaluationModule/exerciseType'],
)

const progressValue = computed(() => store.getters['ReadingMeterEvaluationModule/progress'])

const tableColumns = [
  {
    key: 'evaluationName',
    label: 'Avaliação',
    sortable: true,
  },
  {
    key: 'startDate',
    label: 'Início',
    sortable: true,
  },
  {
    key: 'endDate',
    label: 'Fim',
    sortable: true,
  },
  {
    key: 'progress',
    label: 'Progresso de alunos auditados',
    tooltip: 'Percentual de alunos auditados dividido pela quantidade de alunos.',
    sortable: true,
  },

  {
    key: 'actions',
    label: 'AÇÕES',
    thStyle: { width: '60px' },
  },
]

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Relatórios'
        : 'Esta função não está disponível, pois o teste está desabilitado.'
    },
    isShow: () => true,
    isEnabled: data => data.status !== 1,
    color: 'text-primary',
    action: data => {
      router.push({
        name: 'readingMeterDetailsAuditor',
        params: { evaluationId: data.id },
      })
    },
  },
]

const sortEnum = {
  name: 0,
  startDate: 1,
  endDate: 2,
  progress: 3,
}

const changePage = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('ReadingMeterEvaluationModule/setParams', {
    Search: searchQuery,
    OrderBy: sortEnum[sortBy],
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  store.dispatch('ReadingMeterEvaluationModule/fetchData')
}

store.commit('ReadingMeterEvaluationModule/reset')
store.dispatch('ReadingMeterEvaluationModule/fetchData')

const getColorsEnum = value => {
  return getVariantByRule(value, 'progress')
}

const legends = [progressLegend]

watch([exerciseType, progressValue], () => {
  refList.value.resetPage()
  store.commit('ReadingMeterEvaluationModule/setParams', {
    Search: '',
    OrderBy: null,
    Ascending: true,
    Page: 1,
  })
  store.dispatch('ReadingMeterEvaluationModule/fetchData')
})
</script>