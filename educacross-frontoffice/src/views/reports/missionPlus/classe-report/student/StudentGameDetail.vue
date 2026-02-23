<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getLegendStatusEnum } from '@/consts/StatusEnums'
import { getVariantByRule } from '@/consts/legends'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { computed } from 'vue'

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
              >{{ studentRound.attempts }} tentativas</span
            >
          </div>
          <div class="flex-1 text-right">
            Acompanhe a evolução de
            <span class="text-primary font-bold">{{ studentName }}</span> nesse turno.
          </div>
        </div>
      </b-media>
    </b-card>
    <h6 class="text-primary font-semibold font-12 text-center">HISTÓRICO DE TENTATIVAS</h6>
    <b-table
      :fields="[
        { key: 'try', label: 'TENTATIVA', sortable: true },
        { key: 'startedTime', label: 'ÚLTIMO ACESSO', sortable: true },
        { key: 'hits', label: 'ACERTOS', sortable: true },
        { key: 'errors', label: 'ERROS', sortable: true },
        { key: 'finished', label: 'STATUS ', sortable: true },
        { key: 'performance', label: 'RENDIMENTO NA TENTATIVA', sortable: true },
        { key: 'totalSeconds', label: 'TEMPO INVESTIDO', sortable: true },
      ]"
      :items="internalItems"
      class="rounded border"
      responsive
    >
      <template #cell(try)="{ value }">
        <span class="font-bold">{{ value }}</span>
      </template>
      <template #cell(startedTime)="{ value }">
        {{ value | formattedDate }}
      </template>
      <template #cell(hits)="{ value }">
        <span class="text-primary">{{ $filters.formatNumber(value) }}</span>
      </template>
      <template #cell(errors)="{ value }">
        <span class="text-danger">{{ $filters.formatNumber(value) }}</span>
      </template>
      <template #cell(finished)="{ value }">
        <div>
          <b-badge v-if="value" pill variant="light-success">Concluído</b-badge>
          <b-badge v-else pill variant="light-danger">Não concluído</b-badge>
        </div>
      </template>
      <template #cell(performance)="{ value }">
        <SemaphoreStatus :status-enum="getVariantByRule(value, 'accuracyPerformance')">
          {{ value }}%
        </SemaphoreStatus>
      </template>
      <template #cell(totalSeconds)="{ value }">
        {{ value | formattedTime }}
      </template>
    </b-table>
    <b-card class="shadow-none border" no-body>
      <LegendEnum :legends="legends" />
    </b-card>
  </div>
</template>