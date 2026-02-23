<template>
  <b-row class="match-height">
    <b-col cols="12" lg="4">
      <DynamicMediaCard
        :bg-variant="proficency.variant"
        title-color="text-white mb-1"
        title="Proficiência leitora"
        icon-class="text-white"
        border-variant="gray"
        :icon="proficency.icon"
        :icon-background="proficency.backgroundColor"
        right-align
        :loading="loading"
        :value="details.report.correctWordsProficiency"
      >
        <template v-slot:description>
          <div class="text-white">
            <b-badge pill class="bg-white mb-1" :class="`text-${proficency.variant}`">
              {{ proficency.text }}
            </b-badge>
            <p>{{ details.report.correctWordsProficiency }} palavras corretas</p>
            <LegendBadgesReadingMeter :legend="details.indicators" contrast-mode />
          </div>
        </template>
      </DynamicMediaCard>
    </b-col>
    <b-col cols="12" lg="8" class="h-100">
      <b-row class="match-height">
        <b-col cols="12" lg="6">
          <MediaCard
            border-variant="gray"
            title="Velocidade da leitura"
            tooltip-text="Palavras lidas por minuto."
            icon="sprint"
            variant="light-primary"
            right-align
            :loading="loading"
            class-variant="border"
          >
            <template v-slot:description>
              <span
                class="font-bold mb-50 d-block"
                :class="`text-${
                  getIndicatorEnum(details.indicators, details.report.wordsPerMinutes).variant
                }`"
              >
                {{ details.report.wordsPerMinutes | formatNumber }} palavras por minuto
              </span>

              <LegendBadgesReadingMeter :legend="details.indicators" />
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" lg="6">
          <MediaCard
            border-variant="gray"
            title="Acurácia da leitura"
            tooltip-text="Precisão dos fonemas correspondentes à pronúncia de um falante nativo"
            icon="record_voice_over"
            variant="light-primary"
            right-align
            :loading="loading"
            class-variant="border"
          >
            <template v-slot:description>
              <span
                class="font-bold mb-50 d-block"
                :class="`text-${
                  getIndicatorEnum(details.indicators, details.report.accuracy.correctWords).variant
                }`"
              >
                {{ details.report.accuracy.correctWords }} de
                {{ details.report.accuracy.pronuncedWords }} palavras corretas
              </span>

              <LegendBadgesReadingMeter :legend="details.indicators" />
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" lg="6">
          <MediaCard
            border-variant="gray"
            title="Completude da leitura"
            tooltip-text="Palavras pronunciadas em relação ao texto de referência."
            icon="grading"
            variant="light-primary"
            right-align
            :loading="loading"
            class-variant="border"
          >
            <template v-slot:description>
              <span class="text-primary font-bold"
                >{{ details.report.completeness | formatNumber }}%</span
              >
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" lg="6">
          <MediaCard
            border-variant="gray"
            title="Palavras omitidas"
            tooltip-text="Palavras não pronunciadas."
            icon="voice_over_off"
            variant="light-primary"
            right-align
            :loading="loading"
            class-variant="border"
          >
            <template v-slot:description>
              <span class="text-primary font-bold">{{
                details.report.omittedWords | formatNumber
              }}</span>
            </template>
          </MediaCard>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script setup>
import DynamicMediaCard from '@/components/card/DynamicMediaCard.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import LegendBadgesReadingMeter from '@/components/legends/LegendBadgesReadingMeter.vue'
import { getReadingProficiencyEnum } from '@/consts/ReadingExpeditionEnum.js'
import store from '@/store'
import { calcPercent } from '@/utils/number'
import { computed } from 'vue'

const details = computed(
  () => store.getters['readingExpeditionFluencyTestModule/readingDetail'],
)
const loading = computed(() => store.getters['readingExpeditionFluencyTestModule/loading'])
const performance = computed(() => {
  const { report } = details.value
  if (!report) return {}
  const { correctWords, pronuncedWords } = report.accuracy
  return calcPercent(correctWords, pronuncedWords)
})

const status = computed(() => {
  return getReadingProficiencyEnum(details.value.report?.proficiency || '')
})

const proficency = computed(
  () => getReadingProficiencyEnum(details.value.report?.proficiency) || '',
)

/**
 * Retrieves an indicator object from an array of indicators based on a given value.
 *
 * Each indicator object in the array has a structure like:
 * {
 *   type: Number,
 *   label: String,
 *   startValue: Number,
 *   endValue: Number (optional)
 * }
 *
 * The function searches for an indicator where the value falls between startValue and endValue
 * (inclusive of startValue and exclusive of endValue) or is greater than startValue if endValue is not provided.
 *
 * @param {Array<Object>} indicators - An array of indicator objects.
 * @param {Number} value - The numeric value used to find the corresponding indicator.
 * @returns {Object} The indicator object if a matching one is found, otherwise null.
 */
const getIndicator = (indicators, value) => {
  if (!(indicators instanceof Array)) return {}
  return (
    indicators.find(
      indicator =>
        value >= indicator.startValue &&
        (indicator.endValue === undefined || value <= indicator.endValue),
    ) || null
  )
}

/**
 * Maps a given value to a range between 0 and 100 based on the minimum and maximum values
 * found in the indicators array.
 *
 * @param {Array<Object>} indicators - An array of indicator objects, each with a startValue and optionally an endValue.
 * @param {Number} value - The value to be mapped to the 0-100 range.
 * @returns {Number} A number between 0 and 100 representing the mapped value.
 */
const mapValueToRange = (indicators, value) => {
  if (!(indicators instanceof Array) || typeof value !== 'number') {
    return 0
  }
  const indicator = getIndicator(indicators, value)
  if (!indicator) return 0
  return getReadingProficiencyEnum(indicator.type).barPercent
}

const getIndicatorEnum = (indicators, value) => {
  const indicator = getIndicator(indicators, value)
  if (!indicator) return {}
  return getReadingProficiencyEnum(indicator.type)
}
</script>