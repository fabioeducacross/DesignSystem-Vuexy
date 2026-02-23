<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getLegendStatusEnum } from '@/consts/StatusEnums'
import { getVariantByRule } from '@/consts/legends'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { formattedDate, formatNumber, formattedTime } from '@/filters/filters'
import { computed } from 'vue'

// Props
const props = defineProps({
  studentRound: {
    type: Object,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
})

// Main Props for image
const mainProps = {
  blank: true,
  blankColor: '#bbb',
  width: 100,
  height: 100,
}

// Items for table
const internalItems = computed(() =>
  (props.studentRound.activityAttempt || []).map((item, i) => ({
    ...item,
    attempt: i + 1,
  })),
)

// Table fields
const fields = [
  { key: 'attempt', label: 'TENTATIVA', sortable: true },
  { key: 'date', label: 'ÚLTIMO ACESSO', sortable: true },
  { key: 'hits', label: 'ACERTOS', sortable: true },
  { key: 'errors', label: 'ERROS', sortable: true },
  { key: 'finish', label: 'STATUS ', sortable: true },
  { key: 'performance', label: 'RENDIMENTO NA TENTATIVA', sortable: true },
  { key: 'totalTime', label: 'TEMPO INVESTIDO', sortable: true },
]

// Legends for LegendEnum
const legends = [accuracyPerformanceLegend]
</script>

<template>
  <div>
    <b-card class="shadow-none border mb-1">
      <b-media class="d-flex align-items-center">
        <template #aside>
          <b-img-lazy :src="studentRound.imageUrl" rounded v-bind="mainProps" />
        </template>
        <div class="d-flex justify-content-between align-items-center gap-1">
          <div class="flex-1">
            <h3 class="text-body">{{ studentRound.topicName }}</h3>
            <span class="font-14 text-primary font-medium">
              {{ studentRound.challenges }} desafios realizados
            </span>
            <br />
            <span class="font-14 text-primary font-medium">
              {{ studentRound.attempts }} tentativas
            </span>
          </div>
          <div class="flex-1 text-right">
            Acompanhe a evolução de
            <span class="text-primary font-bold">{{ studentName }}</span> nesse turno.
          </div>
        </div>
      </b-media>
    </b-card>
    <b-table
      :fields="fields"
      :items="internalItems"
      class="rounded border"
      responsive
    >
      <template #cell(attempt)="data">
        <span class="font-bold">{{ data.value }}</span>
      </template>
      <template #cell(date)="data">
        {{ formattedDate(data.value) }}
      </template>
      <template #cell(hits)="data">
        <span class="text-primary">{{ formatNumber(data.value) }}</span>
      </template>
      <template #cell(errors)="data">
        <span class="text-danger">{{ formatNumber(data.value) }}</span>
      </template>
      <template #cell(finish)="data">
        <div>
          <b-badge v-if="data.value" pill variant="light-success">Concluído</b-badge>
          <b-badge v-else pill variant="light-danger">Não concluído</b-badge>
        </div>
      </template>
      <template #cell(performance)="data">
        <SemaphoreStatus :status-enum="getVariantByRule(data.value, 'accuracyPerformance')">
          {{ data.value }}%
        </SemaphoreStatus>
      </template>
      <template #cell(totalTime)="data">
        {{ formattedTime(data.value) }}
      </template>
    </b-table>
    <b-card class="shadow-none border" no-body>
      <LegendEnum :legends="legends" />
    </b-card>
  </div>
</template>