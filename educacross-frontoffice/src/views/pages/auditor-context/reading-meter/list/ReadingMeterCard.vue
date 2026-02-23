<template>
  <b-card body-class="d-flex flex-column align-items-center">
    <p v-if="data.startDate && data.endDate" class="text-sm text-body text-center">
      {{ formatDate(data.startDate) }} a
      {{ formatDate(data.endDate) }}
    </p>
    <p v-else class="text-sm text-body text-center">Sem data</p>

    <h5 class="text-body text-center">
      <span class="font-bold"> {{ data.name }}</span>
    </h5>

    <div class="text-center mb-1">
      <b-badge pill variant="light-primary">{{ data.serieName }}</b-badge>
    </div>

    <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
      <div v-if="data.types" class="d-flex gap-1">
        <ExerciseType
          v-for="exerciseId in data.types"
          :key="exerciseId"
          :exercise-id="exerciseId"
          :size="32"
          class="mr-50"
        />
      </div>
    </div>

    <div class="w-100 mb-2">
      <ProgressBarHorizontalV2
        v-if="data.studentsAudited || data.studentsAudited === 0"
        height="12px"
        show-values
        :value="data.studentsAudited"
        :get-variant="getColorsEnum"
        :max="data.students"
        values-divisor=" de "
      >
        <template #description>&nbsp;alunos</template>
      </ProgressBarHorizontalV2>
    </div>

    <div class="d-flex align-items-center justify-content-center gap-2">
      <span
        v-for="(action, index) in tableActions"
        v-show="action.isShow(data)"
        :key="index"
        v-b-tooltip.hover.top="action.tooltip(data, action.isEnabled(data))"
        :class="
          action.isEnabled(data)
            ? `${action.color} cursor-pointer`
            : 'cursor-not-allowed text-muted'
        "
        class="material-symbols-outlined"
        @click.stop="action.isEnabled(data) ? action.action(data) : null"
      >
        {{ action.icon }}
      </span>
    </div>
  </b-card>
</template>

<script setup>
import ExerciseType from '@/components/exercise-type/reading-meter/ExerciseType.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import formatDate from '@/utils/date.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  tableActions: {
    type: Array,
    required: true,
  },
})

const getColorsEnum = value => {
  return getVariantByRule(value, 'progress')
}
</script>