<template>
  <div>
    <EvaluationsListFilter v-model="filters" />
    <EvaluationsListTable :filters="filters" />
    <LegendEnum :legends="legends" />
  </div>
</template>

<script setup>
  import EvaluationsListFilter from './EvaluationsListFilter.vue'
  import EvaluationsListTable from './EvaluationsListTable.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { progressLegend } from '@/consts/legends/progressEnum.js'
  import { ref } from 'vue'

  const filters = ref({
    status: null,
  })

  const legends = [progressLegend]
</script>