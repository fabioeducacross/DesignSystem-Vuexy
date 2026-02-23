<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center">
      <b-link class="text-primary d-flex align-items-center" :to="{ name: backRouteName }">
        <span class="material-symbols-outlined" style="font-size: 14px; margin-right: 4px">
          arrow_back_ios
        </span>
        <span class="underline">Voltar</span>
      </b-link>

      <div class="d-flex align-items-center gap-2">
        <div class="d-flex align-items-center gap-1">
          <div
            v-if="readingFluencyEvaluation.types && readingFluencyEvaluation.types.includes(1)"
            class="d-flex align-items-center justify-content-center"
            style="background: #ffb443; width: 32px; height: 32px; border-radius: 4px"
          >
            <span class="material-symbols-outlined" style="font-size: 24px">
              format_list_numbered
            </span>
          </div>
          <div
            v-if="readingFluencyEvaluation.types && readingFluencyEvaluation.types.includes(2)"
            class="d-flex align-items-center justify-content-center"
            style="background: #8bc728; width: 32px; height: 32px; border-radius: 4px"
          >
            <span class="material-symbols-outlined" style="font-size: 24px"> book_6 </span>
          </div>
        </div>

        <span class="h5 mb-0 font-weight-bold text-body">{{
          readingFluencyEvaluation.evaluationName
        }}</span>

        <b-badge variant="light-primary" pill>{{ readingFluencyEvaluation.serieName }}</b-badge>

        <b-badge :variant="`light-${variant}`" pill>
          {{ text }}
        </b-badge>
      </div>

      <div class="text-right">
        <span class="h4 mb-0 font-weight-bold text-primary">{{
          readingFluencyEvaluation.className
        }}</span>
      </div>
    </div>
  </b-card>
</template>

<script setup>
import { useEvaluationReport } from './useEvaluationReport.js'
import { getVariantByRule } from '@/consts/legends/index.js'
import store from '@/store'
import { computed } from 'vue'

const { readingFluencyEvaluation } = useEvaluationReport()

const variantText = computed(
  () =>
    getVariantByRule(readingFluencyEvaluation.value.status, 'ReadingFluencyV2StatusEnum') ||
    {},
)

const variant = computed(() => variantText.value.variant || 'secondary')
const text = computed(() => variantText.value.text || '')

const backRouteName = computed(() => {
  const role = store.getters.accessRole
  if (role === 'NetworkManager') {
    return 'NetworkManagerFluencyV2Classes'
  }
  if (role === 'Teacher') {
    return 'TeacherFluencyV2Evaluations'
  }
  return 'AdminFluencyV2Classes'
})
</script>

<style scoped>
  .underline {
    text-decoration: underline;
  }
</style>