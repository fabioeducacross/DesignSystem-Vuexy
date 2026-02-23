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
import { PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import {CanvasRenderer} from 'echarts/renderers'
import * as echarts from 'echarts/core'
import ECharts from 'vue-echarts'

echarts.use([CanvasRenderer, GridComponent, TooltipComponent, LegendComponent, PieChart])

const props = defineProps({
  reports: {
    type: Object,
    default: null,
  },
})

const chartOptions = ref({})

const updateChart = () => {
  if (!props.reports) return

  chartOptions.value = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {d}%',
    },
    legend: {
      orient: 'horizontal',
      center: 'center',
      data: ['Avançado', 'Adequado', 'Básico', 'Abaixo do Básico'],
      textStyle: {
        color: '#FFFFFF',
      },
    },
    color: ['#5ce291', '#65b3ff', '#efe275', '#fe6580'],
    series: [
      {
        name: 'Desempenho',
        type: 'pie',
        radius: '60%',
        center: ['50%', '55%'],
        label: {
          normal: {
            show: true,
            formatter(val) {
              return `${formatNumber(val.percent)}%`
            },
          },
        },
        labelLine: {
          normal: {
            show: true,
          },
        },
        data: [
          { value: props.reports.advenced, name: 'Avançado' },
          { value: props.reports.suitable, name: 'Adequado' },
          { value: props.reports.basic, name: 'Básico' },
          { value: props.reports.belowBasic, name: 'Abaixo do Básico' },
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
}

watch(
  () => props.reports,
  (newVal) => {
    if (newVal) {
      updateChart()
    }
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  updateChart()
})
</script>

<style>
.echarts {
  width: 100% !important;
}
</style>