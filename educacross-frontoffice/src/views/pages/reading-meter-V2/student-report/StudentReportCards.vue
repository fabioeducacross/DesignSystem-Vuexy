<template>
  <section>
    <b-skeleton-wrapper :loading="isLoadingReport || isLoading">
      <template v-slot:loading>
        <b-row class="match-height">
          <b-col v-for="i in 4" :key="i" cols="12" lg="6">
            <b-card>
              <b-skeleton height="80px" />
            </b-card>
          </b-col>
        </b-row>
      </template>

      <b-row class="match-height">
        <b-col cols="12" lg="6">
          <MediaCard
            title="Palavras pronunciadas corretamente"
            tooltip-text="Acurácia da leitura: precisão dos fonemas correspondentes à pronúncia de um falante nativo."
            icon="mic"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <ProgressBarHorizontalV2
                :value="correctWords"
                :max="totalWords"
                :variant-object="proficency"
              >
                <template v-slot="{ item }">
                  <div class="d-flex" :class="item.variant.textClass">
                    {{ item.value | formatNumber }} de {{ item.max | formatNumber }} palavras
                  </div>
                </template>
              </ProgressBarHorizontalV2>
            </template>
          </MediaCard>
        </b-col>

        <b-col cols="12" lg="6">
          <MediaCard
            title="Total de palavras pronunciadas"
            tooltip-text="Todas as palavras do teste pronunciadas pelo aluno."
            icon="record_voice_over"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-primary font-weight-bold h4 mb-0">{{ pronuncedWords }}</span>
              </div>
            </template>
          </MediaCard>
        </b-col>

        <b-col cols="12" lg="6">
          <MediaCard
            title="Palavras omitidas"
            tooltip-text="Palavras não pronunciadas."
            icon="mic_off"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-primary font-weight-bold h4 mb-0">{{ omittedWords }}</span>
              </div>
            </template>
          </MediaCard>
        </b-col>

        <b-col cols="12" lg="6">
          <MediaCard
            title="Velocidade da leitura"
            tooltip-text="Palavras lidas por minuto."
            icon="sprint"
            variant="light-primary"
            right-align
          >
            <template v-slot:description>
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-primary font-weight-bold h4 mb-0">
                  {{ wordsPerMinute }} palavras por minuto
                </span>
              </div>
            </template>
          </MediaCard>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>
  </section>
</template>

<script setup>
import { useStudentReport } from './useStudentReport'
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRuleV2 } from '@/consts/ReadingMeterV2ProficiencyEnum'
import { getVariantByRule } from '@/consts/legends/index.js'
import { computed } from 'vue'

const { readingDetail, isLoadingReport, isLoading } = useStudentReport()

const correctWords = computed(() => {
  return readingDetail.value?.report?.accuracy?.correctWords || 0
})

const totalWords = computed(() => {
  return readingDetail.value?.report?.totalWords || 0
})

const pronuncedWords = computed(() => {
  return readingDetail.value?.report?.accuracy?.pronuncedWords || 0
})

const omittedWords = computed(() => {
  return readingDetail.value?.report?.omittedWords || 0
})

const wordsPerMinute = computed(() => {
  return readingDetail.value?.report?.wordsPerMinutes || 0
})

const proficency = computed(
  () => getVariantByRuleV2(readingDetail.value?.report?.proficiency, 'proficiency') || {},
)
</script>

<style lang="scss" scoped>
  .match-height {
    .col {
      display: flex;

      .card {
        flex: 1;
      }
    }
  }
</style>