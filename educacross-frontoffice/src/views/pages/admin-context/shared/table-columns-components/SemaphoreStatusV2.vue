<template>
  <ConditionalValueDisplay :value="percent" :layout="'badge'">
    <div class="d-flex align-items-center justify-content-start gap-2">
      <div
        v-b-tooltip.hover.top="
          hasTooltip ? (tooltipText !== '' ? tooltipText : variant.label) : false
        "
        class="range-circle"
        :class="`bg-${variant.variant} ${size}`"
      />
      <span v-if="showPercent"> {{ percent | formatNumber }}%</span>
    </div>
  </ConditionalValueDisplay>
</template>
<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import { getVariantByRule } from '@/consts/legends'
import { calcPercent } from '@/utils/number.js'
import { computed } from 'vue'

// Props
const props = defineProps({
  value: {
    type: Number,
    default: null,
  },
  max: {
    type: [Number, null],
    default: null,
  },
  /** @type {import('vue').PropOptions<LegendKeys>} */
  enum: {
    type: String,
    required: false,
  },
  statusEnum: {
    type: Object,
    required: false,
  },
  hasTooltip: {
    type: Boolean,
    required: false,
  },
  size: {
    type: String,
    required: false,
    default: 'default-size',
  },
  tooltipText: {
    type: String,
    required: false,
    default: '',
  },
  showPercent: {
    type: Boolean,
    default: true,
  },
})

// Computed: percent
const percent = computed(() => {
  if (props.value === undefined || props.value === null) {
    return props.value
  }
  if (props.max) {
    return calcPercent(props.value, props.max)
  }
  return props.value
})

// Computed: variant
const variant = computed(() => {
  if (props.statusEnum) {
    return props.statusEnum
  }
  if (props.enum) {
    return getVariantByRule(percent.value, props.enum)
  }
  return props.getVariant(percent.value)
})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .bg-warning-secondary {
    background: $port !important;
  }

  .range-circle {
    border-radius: 50%;
  }

  .default-size {
    height: 14px;
    width: 14px;
  }

  .sm {
    height: 12px;
    width: 12px;
  }
  .small {
    height: 8px;
    width: 8px;
  }

  .pdf {
    height: 10px;
    width: 10px;
  }
</style>