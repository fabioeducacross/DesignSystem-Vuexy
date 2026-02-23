<template>
  <div class="text-center">
    <div class="position-relative">
      <b-progress
        :value="data"
        :max="100"
        :variant="colorProgress(data)"
        height="24px"
      ></b-progress>
      <div
        class="position-absolute d-flex align-items-center justify-content-center w-100"
        :class="{
          'text-white': data >= 70,
        }"
        style="height: 24px; top: 0; left: 0"
      >
        <span>{{ formatNumber(data) }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getVariantByRule } from '@/consts/legends/index.js'
import { formatNumber } from '@/filters/filters'

const props = defineProps({
  data: { type: Number, default: 0 },
  enum: { type: String, default: '' },
})

const colorProgress = (progress) => {
  if (props.enum) return getVariantByRule(progress, props.enum).variant || ''

  if (progress <= 49) return 'applicationSchool'
  if (progress <= 69) return 'orange'
  if (progress <= 89) return 'info'
  return 'math'
}
</script>