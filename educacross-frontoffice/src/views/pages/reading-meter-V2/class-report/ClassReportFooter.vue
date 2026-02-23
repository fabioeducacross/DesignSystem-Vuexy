<template>
  <section>
    <LegendEnum :legends="legends">
      <template v-slot:enum-component="{ value }">
        <b-badge v-if="value.layout === 'badge'" :variant="`light-${value.variant}`" pill>
          {{ value.text }}
        </b-badge>
      </template>
    </LegendEnum>
  </section>
</template>

<script setup>
  import { useClassReport } from './useClassReport.js'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { proficiencyV2WithNotCompleted } from '@/consts/ReadingMeterV2ProficiencyEnum'
  import { computed } from 'vue'

  const { proficiencyIndicators, readingFluencyEvaluation } = useClassReport()

  const proficiencyLegend = computed(() => {
    const evaluation = readingFluencyEvaluation.value

    if (!evaluation?.serieId || !proficiencyIndicators.value?.length) {
      return proficiencyV2WithNotCompleted.filter(item => item.id !== 0)
    }

    const indicatorsForSerie = proficiencyIndicators.value.filter(
      indicator => indicator.serieId === evaluation.serieId,
    )

    const indicators = indicatorsForSerie.length > 0 ? indicatorsForSerie[0].indicators : []

    return proficiencyV2WithNotCompleted
      .filter(item => item.id !== 0)
      .map(proficiencyItem => {
        const indicator = indicators.find(ind => ind.type === proficiencyItem.id)

        if (indicator && indicator.startValue !== undefined) {
          const labelUpperCase = proficiencyItem.label.toUpperCase()
          const formattedLabel

          = `${indicator.label.replace(
            '-',
          ' a ',
            )} palavras = ${labelUpperCase}`


          return {
            ...proficiencyItem,
            label: formattedLabel,
            text: formattedLabel,
          }
        }

        return proficiencyItem
      })
  })

  const legends = computed(() => [
    {
      text: 'Proficiência Leitora',
      enum: proficiencyLegend.value,
    },
  ])
</script>

<style lang="scss" scoped>
  .gap-2 {
    gap: 0.5rem;
  }
</style>
