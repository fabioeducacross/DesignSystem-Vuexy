<template>
  <section>
    <LegendEnum :legends="legendsConditional">
      <template v-slot:enum-component="{ value }">
        <b-badge v-if="value.layout === 'badge'" :variant="`light-${value.variant}`">
          {{ value.text }}
        </b-badge>
      </template>
    </LegendEnum>
  </section>
</template>

<script setup>
import { useStudentReport } from './useStudentReport.js'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ChangeProficiency from '@/components/proficiency/ChangeProficiency.vue'
import { ReadingMeterWordStatusEnumLegend } from '@/consts/ReadingMeterEnum.js'
import { getVariantByRuleV2 } from '@/consts/ReadingMeterV2ProficiencyEnum'
import { getVariantByRule } from '@/consts/legends/index.js'
import router from '@/router'
import { putReadingFluencyStudentChangeLevel } from '@/services/shared/readingMeter/readingMeter.service.js'
import store from '@/store'
import { computed } from 'vue'

const { getReadingFluency } = useStudentReport()

const { testId, classId, studentId } = router.currentRoute.params
const { readingDate } = router.currentRoute.query

const details = computed(() => store.getters['ReadingMeterV2Module/readingDetail'])
const transcription = computed(() => details.value?.report?.transcription)

const proficiencyLegend = computed(() => {
  const indicators = details.value?.indicators
  if (indicators) {
    const legend = indicators.map(indicator => {
      const variant = getVariantByRuleV2(indicator.type, 'proficiency')
      const label = indicator.label.replace('-', ' a ')
      return {
        text: `${label} palavras = ${variant.label.toUpperCase()} `,
        variant: variant.variant,
        layout: 'badge',
      }
    })
    return {
      text: 'Proficiência Leitora',
      enum: legend || [],
    }
  }

  return {
    text: 'Proficiência Leitora',
    enum: [],
  }
})

const legendsConditional = computed(() =>
  transcription?.value?.length
    ? [ReadingMeterWordStatusEnumLegend, proficiencyLegend.value]
    : [proficiencyLegend.value],
)

const currentProficiency = computed(() => {
  return details.value?.report?.proficiency
})

const changeProficiency = computed(() => {
  return details.value?.report?.changeProficiency
})

const saveProficiency = async data => {
  await putReadingFluencyStudentChangeLevel(testId, studentId, {
    classId,
    createdAt: readingDate,
    level: data.level,
    reasonChangeLevel: data.reasonChangeLevel,
  })

  await getReadingFluency()
}
</script>