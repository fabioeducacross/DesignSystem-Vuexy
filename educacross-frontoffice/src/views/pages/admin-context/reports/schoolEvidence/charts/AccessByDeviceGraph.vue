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
import { PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { formatNumber } from '@/filters/filters'

// Register ECharts modules
use([GridComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

// Props
const props = defineProps({
  reports: {
    type: Object,
    default: null,
  },
})

// Template Ref
const chartRef = ref(null)

// Computed Options
const options = computed(() => {
  if (!props.reports) {
    return {}
  }

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%',
    },
    legend: {
      orient: 'horizontal',
      center: 'center',
      data: ['Android', 'Windows', 'Apple', 'Linux'],
      textStyle: {
        color: '#FFFFFF',
      },
    },
    color: ['#5ce291', '#65b3ff', '#b5b8bb', '#ff9060'],
    series: [
      {
        name: 'Acessos',
        type: 'pie',
        radius: '60%',
        center: ['50%', '55%'],
        label: {
          normal: {
            show: true,
          },
        },
        data: [
          {
            value: formatNumber(props.reports.android, 0),
            name: 'Android',
          },
          {
            value: formatNumber(props.reports.windows, 0),
            name: 'Windows',
          },
          {
            value: formatNumber(props.reports.apple, 0),
            name: 'Apple',
          },
          {
            value: formatNumber(props.reports.linux, 0),
            name: 'Linux',
          },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
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