<template>
  <div class="d-flex gap-2 w-100 align-items-center">
    <span :class="variant.textClass" class="font-extrabold">{{ percent | formatNumber }}%</span>
    <b-progress
      :height="height"
      :value="percent"
      :variant="variant.variant"
      class="w-100"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getVariantByRule, LEGENDS } from '@/consts/legends'
import { calcPercent } from '@/utils/number.js'

// Props
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  max: {
    type: [Number, null],
    default: null,
  },
  height: {
    type: String,
    required: false,
    default: '6px',
  },
  enum: {
    type: String,
    required: false,
    validator(value) {
      return Object.keys(LEGENDS).includes(value)
    },
    default: 'success',
  },
})

// Computed percent
const percent = computed(() => {
  if (props.max) {
    return calcPercent(props.value, props.max)
  }
  return props.value
})

// Computed variant
const variant = computed(() => getVariantByRule(percent.value, props.enum))
</script>