<template>
  <div :class="`d-flex gap-2 flex-column${reverse ? '-reverse' : ''}`">
    <b-progress :variant="variant.variant" :value="percent" :height="height"></b-progress>
    <slot
      name="default"
      :item="{ value, max, showValues, variant, percent }"
    >
      <div class="d-flex">
        <span :class="variant.textClass" class="font-bold mr-1">{{ formatNumber(percent) }}%</span>
        <span v-if="showValues" class="ml-auto whitespace-no-wrap">
          <span class="font-weight-bolder">{{ formatNumber(value) }} </span>
          {{ valuesDivisor }}
          {{ formatNumber(max) }}
        </span>
        <slot name="description"></slot>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getVariantByRule } from '@/consts/legends'
import { calcPercent } from '@/utils/number.js'
import { formatNumber } from '@/filters/filters'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  max: {
    type: [Number, null],
    default: null,
  },
  showValues: {
    type: Boolean,
    default: false,
  },
  getVariant: {
    type: Function,
    required: false,
    default: getVariantByRule,
  },
  reverse: {
    type: Boolean,
    required: false,
    default: false,
  },
  height: {
    type: String,
    required: false,
    default: '6px',
  },
  variantObject: {
    type: Object,
    required: false,
  },
  valuesDivisor: {
    type: String,
    required: false,
    default: '/',
  },
  enum: {
    type: String,
    required: false,
  },
})

const percent = computed(() => {
  if (props.max) {
    return calcPercent(props.value, props.max)
  }
  return props.value
})

const variant = computed(() => {
  if (props.variantObject) {
    return props.variantObject
  }
  if (props.enum) {
    return getVariantByRule(percent.value, props.enum)
  }
  return props.getVariant(percent.value)
})

const {
  value,
  max,
  showValues,
  reverse,
  height,
  variantObject,
  valuesDivisor,
  enum: enumProp,
} = props
</script>