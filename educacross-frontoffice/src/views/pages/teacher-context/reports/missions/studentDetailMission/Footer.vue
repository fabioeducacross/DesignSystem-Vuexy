<template>
  <LegendEnum :legends="[progressLegend, performanceLegend]" />
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { progressLegend, performanceLegend } from '@/consts/progressPerformanceEnum.js'
</script>