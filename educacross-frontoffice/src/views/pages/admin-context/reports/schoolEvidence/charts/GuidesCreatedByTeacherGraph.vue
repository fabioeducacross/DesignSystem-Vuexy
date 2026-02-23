<template>
  <e-charts
    ref="chartRef"
    class="echarts"
    autoresize
    :option="chartOptions"
  />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { formatNumber } from '@/filters/filters'

// ECharts Imports
import { BarChart } from 'echarts/charts'
import {CanvasRenderer} from 'echarts/renderers'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import ECharts from 'vue-echarts'

// Register ECharts modules
echarts.use([CanvasRenderer, GridComponent, TooltipComponent, LegendComponent, BarChart])

const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
  },
})

const chartOptions = ref({})

const updateChart = () => {
  const period = []
  const guidesCreated = []

  if (props.reports && props.reports.length > 0) {
    props.reports.forEach((element) => {
      period.push(element.period ? element.period.toUpperCase() : '')
      guidesCreated.push(element.amountGuides)
    })
  }

  chartOptions.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    legend: {
      data: ['Missões Criadas'],
      textStyle: {
        color: '#FFFFFF',
      },
    },
    color: ['#71b5ff'],
    xAxis: [
      {
        type: 'category',
        data: period,
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
          interval: 0,
          formatter(val) {
            if (val % 1 === 0) {
              return formatNumber(val)
            }
            return ''
          },
        },
      },
    ],
    series: [
      {
        name: 'Missões Criadas',
        type: 'bar',
        barWidth: '60%',
        data: guidesCreated,
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter(params) {
              const { value } = params
              if (value !== 0) {
                return `${formatNumber(value)} Missões`
              }
              return ''
            },
          },
        },
      },
    ],
  }
}

onMounted(() => {
  updateChart()
})

watch(
  () => props.reports,
  () => {
    updateChart()
  },
  { immediate: false, deep: true }
)
</script>

<style>
.echarts {
  width: 100% !important;
}
</style>