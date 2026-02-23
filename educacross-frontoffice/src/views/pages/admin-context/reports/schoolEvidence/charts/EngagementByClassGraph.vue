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

// Register ECharts modules
use([GridComponent, TooltipComponent, LegendComponent, BarChart, CanvasRenderer])

const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
  },
})

const chartRef = ref(null)

const options = computed(() => {
  if (!props.reports || props.reports.length === 0) {
    return {}
  }

  const classNames = props.reports.map(item => item.className)
  const engagementValues = props.reports.map(item => item.finishedActivities)

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter(params) {
        return `${formatNumber(params[0].value)}%`
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    legend: {
      data: ['Engajamento por Turma'],
      textStyle: {
        color: '#FFFFFF',
      },
    },
    color: ['#71b5ff'],
    xAxis: [
      {
        show: true,
        type: 'value',
        axisLabel: {
          color: '#FFFFFF',
          formatter(val) {
            return `${formatNumber(val)}%`
          },
        },
        max: '100',
      },
    ],
    yAxis: [
      {
        type: 'category',
        data: classNames,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: '#FFFFFF',
        },
      },
    ],
    series: [
      {
        name: 'Engajamento por Turma',
        type: 'bar',
        data: engagementValues,
        label: {
          normal: {
            show: true,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            fontSize: 14,
            formatter(params) {
              return `${formatNumber(params.value)}%`
            },
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