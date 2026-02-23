<template>
  <e-charts
    ref="chartRef"
    class="echarts"
    :option="options"
    autoresize
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { formatNumber } from '@/filters/filters'

// Register ECharts components
use([GridComponent, TooltipComponent, LegendComponent, BarChart, CanvasRenderer])

const props = defineProps({
  period: {
    type: Array,
    default: () => [],
  },
  engagement: {
    type: Array,
    default: () => [],
  },
})

const chartRef = ref(null)

const options = computed(() => {
  if (!props.period || !props.engagement || props.period.length === 0) {
    return {}
  }

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter(params) {
        return `Engajamento: ${formatNumber(params[0].value)}%`
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    legend: {
      data: ['Engajamento'],
      textStyle: {
        color: '#FFFFFF',
      },
    },
    color: ['#71b5ff'],
    xAxis: [
      {
        type: 'category',
        data: props.period,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: '#FFFFFF',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: '#FFFFFF',
          formatter(val) {
            return `${val}%`
          },
        },
        max: '100',
      },
    ],
    series: [
      {
        name: 'Engajamento',
        type: 'bar',
        barWidth: '60%',
        data: props.engagement,
        label: {
          normal: {
            show: true,
            position: 'insideTop',
            formatter: '',
          },
        },
      },
    ],
  }
})
</script>

<style>
.echarts {
  width: 100% !important;
  min-height: 400px;
}
</style>