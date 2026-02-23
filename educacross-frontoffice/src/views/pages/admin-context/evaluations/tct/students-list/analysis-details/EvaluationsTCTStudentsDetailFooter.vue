<template>
  <LegendEnum :legends="legendsConfig">
    <template v-slot:enum-component="{ value }">
      <QuestionStatus v-if="value.layout === 'QuestionStatus'" :status="value.id">
        <span>{{ value.text }}</span>
      </QuestionStatus>
      <SemaphoreStatus v-else :status-enum="value">
        <span>{{ value.text }}</span>
      </SemaphoreStatus>
    </template>
  </LegendEnum>
</template>

<script setup>
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import QuestionStatus from '@/components/question/QuestionStatus.vue'
  import { EQuestionAnswerStatusEnumLegend } from '@/consts/EQuestionAnswerStatus.js'
  import { PerformanceEnum } from '@/consts/evaluationsEnum.js'
  import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'

  const legendsConfig = [
    {
      text: 'Rendimento',
      enum: PerformanceEnum,
    },
    EQuestionAnswerStatusEnumLegend,
  ]
</script>