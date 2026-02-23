<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getLegendStatusEnum } from '@/consts/StatusEnums'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import { computed } from 'vue'

/**
 * @typedef {Object} GameStudentRound
 * @property {String} imageUrl
 * @property {String} topicName
 * @property {Number} attempts
 * @property {Number} challenges
 * @property {Array<{startedTime: String, hits: Number, errors: Number, finished: Boolean, performance: Number, totalSeconds: Number}>} activities
 */

// Props
const props = defineProps({
  /** @type {import('vue').PropOptions<GameStudentRound>} */
  studentRound: {
    type: Object,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
})

// Methods
const getLegendStatusEnumMethod = getLegendStatusEnum

const mainProps = {
  blank: true,
  blankColor: '#bbb',
  width: 100,
  height: 100,
}

const internalItems = computed(() =>
  props.studentRound.activities.map((item, i) => {
    return { ...item, try: i + 1 }
  }),
)

const legends = [accuracyPerformanceLegend]
</script>

<template>
  <div>
    <b-card class="shadow-none border mb-1">
      <b-media class="d-flex align-items-center">
        <template v-slot:aside>
          <b-img-lazy :src="studentRound.imageUrl" rounded v-bind="mainProps" />
        </template>
        <div class="d-flex justify-content-between align-items-center gap-1">
          <div class="flex-1">
            <h3 class="text-body">{{ studentRound.topicName }}</h3>
            <span class="font-14 text-primary font-medium"
              >{{ studentRound.challenges }} desafios realizados</span
            >
            <br />
            <span class="font-14 text-primary font-medium"
              >{{ internalItems.length }} acessos ao jogo</span
            >
          </div>
          <div class="flex-1 text-right">
            Acompanhe a evolução de
            <span class="text-primary font-bold">{{ studentName }}</span> nesse turno.
          </div>
        </div>
      </b-media>
    </b-card>
    <h6 class="text-primary font-semibold font-12 text-center">HISTÓRICO</h6>
    <b-table
      :fields="[
        {
          key: 'date',
          label: 'DATA DO ACESSO',
          sortable: true,
        },
        { key: 'hits', label: 'ACERTOS', sortable: true },
        { key: 'errors', label: 'ERROS', sortable: true },
        { key: 'finished', label: 'STATUS ', sortable: true },
        { key: 'performance', label: 'RENDIMENTO', sortable: true },
        { key: 'totalSeconds', label: 'TEMPO INVESTIDO', sortable: true },
      ]"
      :items="internalItems"
      class="rounded border"
      responsive
    >
      <template #cell(date)="{ value }">
        {{ value | formattedDate }}
      </template>
      <template #cell(hits)="{ value }">
        <span class="text-success">{{ value | formatNumber }}</span>
      </template>
      <template #cell(errors)="{ value }">
        <span class="text-danger">{{ value | formatNumber }}</span>
      </template>
      <template #cell(finished)="{ value }">
        <div>
          <b-badge v-if="value" pill variant="light-success">Concluído</b-badge>
          <b-badge v-else pill variant="light-danger">Não concluído</b-badge>
        </div>
      </template>
      <template #cell(performance)="{ item }">
        <PerformanceCell :performance="item.performance" enum="accuracyPerformance" />
      </template>
      <template #cell(totalSeconds)="{ value }">
        {{ value | formattedTime }}
      </template>
    </b-table>

    <LegendEnum :legends="legends" border />
  </div>
</template>