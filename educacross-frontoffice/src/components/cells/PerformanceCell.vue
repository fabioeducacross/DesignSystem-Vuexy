<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import { getVariantByRule } from '@/consts/legends'
import { computed } from 'vue'
import { formatNumber } from '@/filters/filters'

// Props
const props = defineProps({
  performance: {
    type: [Number, undefined, null],
    default: undefined,
  },
  enum: {
    type: String,
    default: 'accuracyPerformance',
  },
})

// Computed
const variant = computed(() => {
  return getVariantByRule(props.performance, props.enum)
})
</script>

<template>
  <ConditionalValueDisplay :value="performance" :layout="'badge'">
    <div class="d-flex align-items-center gap-1" style="width: fit-content">
      <span
        v-if="performance > 0"
        class="whitespace-no-wrap"
        style="width: 50px"
      >
        {{ formatNumber(performance) }}%
      </span>
      <b-badge :variant="variant.variant" pill class="text-uppercase">
        {{ variant.badgeLabel }}
      </b-badge>
    </div>
  </ConditionalValueDisplay>
</template>