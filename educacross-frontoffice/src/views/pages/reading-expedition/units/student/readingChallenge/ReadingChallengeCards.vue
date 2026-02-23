<template>
  <b-row v-if="details.student.report" class="match-height">
    <b-col cols="12" lg="4">
      <DynamicMediaCard
        :bg-variant="proficency.variant"
        title-color="text-white mb-1"
        title="Proficiência leitora"
        icon-class="text-white"
        :icon="proficency.icon"
        :icon-background="proficency.backgroundColor"
        right-align
        :loading="loading"
        :value="details.student.report.accuracy.pronuncedWords"
      >
        <template v-slot:description>
          <div class="text-white">
            <b-badge pill class="bg-white mb-1" :class="`text-${proficency.variant}`">
              {{ proficency.text }}
            </b-badge>
            <p>{{ details.student.report.accuracy.pronuncedWords }} palavras corretas</p>
            <LegendBadgesReadingMeter :legend="details.student.indicators" contrast-mode />
          </div>
        </template>
      </DynamicMediaCard>
    </b-col>
    <b-col cols="12" lg="8" class="h-100">
      <b-row class="match-height">
        <b-col cols="12" lg="6">
          <MediaCard
            border-variant="gray"
            class="border"
            title="Velocidade da leitura"
            tooltip-text="Palavras lidas por minuto."
            icon="sprint"
            variant="light-primary"
            right-align
            :loading="loading"
          >
            <template v-slot:description>
              <span
                class="font-bold mb-50 d-block"
                :class="`text-${
                  getIndicatorEnum(
                    details.student.indicators,
                    details.student.report.wordsPerMinutes,
                  ).variant
                }`"
              >
                {{ $filters.formatNumber(details.student.report.wordsPerMinutes) }} palavras por
                minuto
              </span>

              <LegendBadgesReadingMeter :legend="details.student.indicators" />
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" lg="6">
          <MediaCard
            border-variant="gray"
            class="border"
            title="Acurácia da leitura"
            tooltip-text="Precisão dos fonemas correspondentes à pronúncia de um falante nativo"
            icon="record_voice_over"
            variant="light-primary"
            right-align
            :loading="loading"
          >
            <template v-slot:description>
              <span
                class="font-bold mb-50 d-block"
                :class="`text-${
                  getIndicatorEnum(
                    details.student.indicators,
                    details.student.report.accuracy.correctWords,
                  ).variant
                }`"
              >
                {{ details.student.report.accuracy.correctWords }} de
                {{ details.student.report.accuracy.pronuncedWords }} palavras corretas
              </span>

              <LegendBadgesReadingMeter :legend="details.student.indicators" />
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" lg="6">
          <MediaCard
            border-variant="gray"
            class="border"
            title="Completude da leitura"
            tooltip-text="Palavras pronunciadas em relação ao texto de referência."
            icon="grading"
            variant="light-primary"
            right-align
            :loading="loading"
          >
            <template v-slot:description>
              <span class="text-primary font-bold"
                >{{ $filters.formatNumber(details.student.report.completeness) }}%</span
              >
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" lg="6">
          <MediaCard
            border-variant="gray"
            class="border"
            title="Palavras omitidas"
            tooltip-text="Palavras não pronunciadas."
            icon="voice_over_off"
            variant="light-primary"
            right-align
            :loading="loading"
          >
            <template v-slot:description>
              <span class="text-primary font-bold">{{
                $filters.formatNumber(details.student.report.omittedWords)
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

const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
})

const loading = computed(
  () => store.getters['readingExpeditionUnitStudentReadingChallengeModule/loading'],
)

const performance = computed(() => {
  const { report } = props.details.student
  if (!report) return {}
  const { correctWords, pronuncedWords } = report.accuracy
  return calcPercent(correctWords, pronuncedWords)
})

const proficency = computed(() => getReadingProficiencyEnum(props.details.level))

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

const mapValueToRange = (indicators, value) => {
  if (!(indicators instanceof Array) || typeof value !== 'number') {
    return 0
  }
  const indicator = getIndicator(indicators, value)
  return getReadingProficiencyEnum(indicator.type).barPercent
}

const getIndicatorEnum = (indicators, value) => {
  const indicator = getIndicator(indicators, value)
  return getReadingProficiencyEnum(indicator.type)
}
</script>