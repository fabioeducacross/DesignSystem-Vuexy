<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import { formattedDate, formattedTime } from '@/filters/filters'
import { computed, ref } from 'vue'

// Props
const props = defineProps({
  studentRound: {
    type: Object,
    required: true,
  },
})

// Image props for avatar
const mainProps = {
  blank: true,
  blankColor: '#bbb',
  width: 100,
  height: 100,
}

// Pagination
const perPage = 5
const currentPage = ref(1)
const changePage = page => {
  currentPage.value = page
}

// Data for table
const internalItems = computed(() => {
  if (!props.studentRound || !props.studentRound.students) {
    return []
  }
  const startIndex = (currentPage.value - 1) * perPage
  const endIndex = startIndex + perPage
  return props.studentRound.students.slice(startIndex, endIndex)
})

const totalData = computed(() => {
  if (!props.studentRound || !props.studentRound.students) {
    return 0
  }
  return props.studentRound.students.length
})

const legends = [accuracyPerformanceLegend]
</script>

<template>
  <div>
    <b-card class="shadow-none border mb-1">
      <b-media class="d-flex align-items-center">
        <template #aside>
          <b-img-lazy :src="props.studentRound.imageUrl" rounded v-bind="mainProps" />
        </template>
        <div class="d-flex justify-content-between align-items-center gap-1">
          <div class="flex-1">
            <h3 class="text-body">{{ props.studentRound.name }}</h3>
          </div>
          <div class="flex-1 text-right">
            Acompanhe a evolução de
            <span class="text-primary font-bold">todos os alunos</span> nesse turno.
          </div>
        </div>
      </b-media>
    </b-card>

    <b-table
      :fields="[
        { key: 'name', label: 'Aluno', sortable: true, tdClass: 'font-bold' },
        { key: 'attempts', label: 'TENTATIVA', sortable: true },
        {
          key: 'lastPlayed',
          label: 'ÚLTIMO ACESSO',
          sortable: true,
          formatter: value => formattedDate(value),
        },
        { key: 'performance', label: 'RENDIMENTO', sortable: true },
        {
          key: 'time',
          label: 'TEMPO INVESTIDO',
          sortable: true,
          formatter: value => formattedTime(value),
        },
      ]"
      :items="internalItems"
      class="rounded border"
      responsive
    >
      <template #cell(performance)="item">
        <PerformanceCell :performance="item.performance" />
      </template>
    </b-table>
    <LegendEnum :legends="legends" border />
    <div>
      <ListTablePagination
        :total-data="totalData"
        :value="currentPage"
        :per-page="perPage"
        :show-entries="false"
        force-resposive
        @input="changePage"
      />
    </div>
  </div>
</template>