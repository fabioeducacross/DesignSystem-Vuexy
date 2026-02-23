<template>
  <div class="d-flex gap-1 flex-column mb-1">
    <div class="d-flex justify-content-between">
      <span class="font-weight-bold">{{ label }}</span>
      <span
        v-b-tooltip="tooltip"
        class="font-bold"
        :class="`text-${variant}`"
      >
        {{ formatNumber(value) }}%
      </span>
    </div>
    <b-progress :variant="variant" :value="value" :height="height"></b-progress>
  </div>
</template>

<script setup>
import { formatNumber } from '@/filters/filters'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  height: {
    type: String,
    required: false,
    default: '6px',
  },
  variant: {
    type: String,
    required: false,
    default: 'primary',
  },
  label: {
    type: String,
    required: false,
  },
  tooltip: {
    type: String,
    required: false,
  },
})

const { value, height, variant, label, tooltip } = props
</script>