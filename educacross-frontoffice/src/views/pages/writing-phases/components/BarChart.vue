<script setup>
import { uuidv4 } from '@/utils/utils'
import SemaphoreStatusV2 from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatusV2.vue'
import { computed, toRef } from 'vue'

const props = defineProps({
  /**
   * Main data for the chart.
   * e.g.:
   * series: [
   *   { label: 'Segment A', value: 10, color: '#7e57c2' },
   *   { label: 'Segment B', value: 30, color: '#29b6f6' },
   * ]
   */
  options: {
    type: Object,
    default: () => ({
      series: [],
    }),
  },
  /**
   * Toggle whether to show tooltips on hover.
   */
  enableTooltips: {
    type: Boolean,
    default: true,
  },
  /**
   * Minimum percentage that any segment should occupy.
   * Helps ensure segments are always visible.
   */
  minSegmentPercentage: {
    type: Number,
    default: 2,
  },
})

const options = toRef(props, 'options')

const computedSeries = computed(() => {
  let data = options.value.series

  data = data.filter(item => item.value !== 0)
  if (data.length === 0) {
    return []
  }

  const totalValue = data.reduce((sum, item) => sum + item.value, 0)
  if (totalValue === 0) {
    return data.map(item => ({ ...item, percentage: 0 }))
  }

  let items = data.map(item => {
    const percentage = (item.value / totalValue) * 100
    return { ...item, percentage }
  })

  for (const i of items) {
    if (i.percentage < props.minSegmentPercentage) {
      i.percentage = props.minSegmentPercentage
    }
  }

  const newSum = items.reduce((s, i) => s + i.percentage, 0)
  if (newSum > 100) {
    const over = newSum - 100
    const canReduce = items.filter(i => i.percentage > props.minSegmentPercentage)
    const canReduceSum = canReduce.reduce(
      (s, i) => s + (i.percentage - props.minSegmentPercentage),
      0,
    )

    for (const i of canReduce) {
      const aboveMin = i.percentage - props.minSegmentPercentage
      if (canReduceSum === 0) break
      const reduceAmount = (aboveMin / canReduceSum) * over
      i.percentage -= reduceAmount
      if (i.percentage < props.minSegmentPercentage) {
        i.percentage = props.minSegmentPercentage
      }
    }
  }

  items = items.map(item => ({
    ...item,
    percentage: parseFloat(item.percentage.toFixed(2)),
    uuid: uuidv4(),
  }))

  const finalSum = items.reduce((s, i) => s + i.percentage, 0)
  if (finalSum > 100) {
    const diff = finalSum - 100
    items[items.length - 1].percentage = parseFloat(
      (items[items.length - 1].percentage - diff).toFixed(2),
    )
  }

  return items
})
</script>

<template>
  <div class="bar-chart">
    <div
      v-for="(segment, index) in computedSeries"
      :id="'popover-target-' + segment.uuid"
      :key="index"
      class="bar-segment"
      :class="`bg-${segment.color}`"
      :style="{ width: segment.percentage + '%' }"
    >
      <b-popover
        v-if="enableTooltips"
        :target="'popover-target-' + segment.uuid"
        triggers="hover focus"
      >
        <SemaphoreStatusV2
          :value="0"
          :status-enum="{ variant: segment.color }"
          :show-percent="false"
          class="d-inline-block align-middle"
        />
        <span class="align-middle">
          {{ segment.label }}: {{ segment.percentage | formatNumber }}%
        </span>
        <span class="whitespace-no-wrap align-middle">
          ({{ segment.value | formatNumber }} {{ segment.value > 1 ? 'alunos' : 'aluno' }})
        </span>
      </b-popover>
    </div>
  </div>
</template>

<style scoped>
  .bar-chart {
    display: flex;
    min-width: 360px;
    height: 64px;
    background-color: #eee;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .bar-segment {
    height: 100%;
    position: relative;
    cursor: pointer;
  }
</style>