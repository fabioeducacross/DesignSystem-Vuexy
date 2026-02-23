<template>
  <section>
    <LegendEnum :legends="[ReadingMeterWordStatusEnumLegend, proficiencyLegend]">
      <template v-slot:enum-component="{ value }">
        <b-badge v-if="value.layout === 'badge'" :variant="`light-${value.variant}`">
          {{ value.text }}
        </b-badge>
      </template>
    </LegendEnum>
    <ChangeProficiency
      :current-proficiency="currentProficiency"
      :change-proficiency="changeProficiency"
      :callback="saveProficiency"
    />
  </section>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ChangeProficiency from '@/components/proficiency/ChangeProficiency.vue'
import { ReadingMeterWordStatusEnumLegend } from '@/consts/ReadingMeterEnum.js'
import { getVariantByRule } from '@/consts/legends/index.js'
import router from '@/router'
import { putReadingFluencyStudentChangeLevel } from '@/services/shared/readingMeter/readingMeter.service.js'
import store from '@/store'
import { computed } from 'vue'

const { testId, classId, studentId } = router.currentRoute.params
const { readingDate } = router.currentRoute.query

const details = computed(() => store.getters['ReadingMeterModule/readingDetail'])

const currentProficiency = computed(() => {
  return details.value.report.proficiency
})

const changeProficiency = computed(() => {
  return details.value.report.changeProficiency
})

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

const saveProficiency = async data => {
  await putReadingFluencyStudentChangeLevel(testId, studentId, {
    classId,
    createdAt: readingDate,
    level: data.level,
    reasonChangeLevel: data.reasonChangeLevel,
  })

  store.dispatch('ReadingMeterModule/fetchReadingDetails', {
    testId,
    classId,
    studentId,
    readingDate,
  })
}
</script>