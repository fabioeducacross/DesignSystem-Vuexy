<template>
  <section>
    <LegendEnum :legends="[ReadingMeterWordStatusEnumLegend, proficiencyLegend]">
      <template v-slot:enum-component="{ value }">
        <b-badge v-if="value.layout === 'badge'" :variant="`light-${value.variant}`">
          {{ value.text }}
        </b-badge>
      </template>
    </LegendEnum>
  </section>
</template>
<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ChangeProficiency from '@/components/proficiency/ChangeProficiency.vue'
import { ReadingMeterWordStatusEnumLegend } from '@/consts/ReadingMeterEnum.js'
import { getVariantByRule } from '@/consts/legends/index.js'
import store from '@/store'
import { computed } from 'vue'

const details = computed(
  () => store.getters['ReadingMeterEvaluationModule/readingEvaluationDetail'],
)

const proficiencyLegend = computed(() => {
  const { indicators } = details.value
  if (indicators) {
    const legend = indicators.map(indicator => {
      const variant = getVariantByRule(indicator.type, 'proficiency')
      const label = indicator.label.replace('-', ' a ')
      return {
        text: `${label} palavras = ${variant.label.toUpperCase()} `,
        variant: variant.variant,
        layout: 'badge',
      }
    })
    return {
      text: 'Régua de proficiência',
      enum: legend || [],
    }
  }

  return {
    text: 'Régua de proficiência',
    enum: [],
  }
})
</script>