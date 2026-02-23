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

const props = defineProps({
  reports: {
    type: Object,
    default: null,
  },
})

const chartRef = ref(null)

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
      data: ['Manhã', 'Tarde', 'Noite', 'Madrugada'],
      textStyle: {
        color: '#FFFFFF',
      },
    },
    color: ['#5ce291', '#65b3ff', '#efe275', '#ff9060'],
    series: [
      {
        name: 'Acessos',
        type: 'pie',
        radius: '60%',
        center: ['50%', '55%'],
        label: {
          normal: {
            show: true,
            formatter(val) {
              let stringVal = `${val.value}`
              stringVal = stringVal.replace(/[,.]/g, m => (m === ',' ? '.' : ','))
              return `${stringVal}%`
            },
          },
        },
        labelLine: {
          normal: {
            show: true,
          },
        },
        data: [
          {
            value: formatNumber(props.reports.morning, 0),
            name: 'Manhã',
          },
          {
            value: formatNumber(props.reports.afternoon, 0),
            name: 'Tarde',
          },
          {
            value: formatNumber(props.reports.night, 0),
            name: 'Noite',
          },
          {
            value: formatNumber(props.reports.dawn, 0),
            name: 'Madrugada',
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