<template>
  <LegendEnum :legends="[IndicatorsLegend]" />
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { IndicatorsLegend, ReadingMeterWordStatusEnumLegend } from '@/consts/ReadingExpeditionEnum.js'
</script>
