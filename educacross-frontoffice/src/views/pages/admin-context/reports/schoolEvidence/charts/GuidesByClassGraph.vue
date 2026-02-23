<template>
  <e-charts
    ref="chartInstance"
    class="echarts"
    autoresize
    :option="chartOptions"
  />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { formatNumber } from '@/filters/filters'
import { BarChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import ECharts from 'vue-echarts'

echarts.use([CanvasRenderer, GridComponent, TooltipComponent, LegendComponent, BarChart])

const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
  },
})

const chartInstance = ref(null)
const chartOptions = ref({})

const updateChart = () => {
  const guides = []
  const className = []

  if (props.reports && props.reports.length > 0) {
    props.reports.forEach(element => {
      guides.push(element.amountGuides)
      className.push(element.className)
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
      data: ['Quantidade de Missões'],
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
            if (val % 1 === 0) {
              return formatNumber(val)
            }
            return ''
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'category',
        data: className,
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
        name: 'Quantidade de Missões',
        type: 'bar',
        data: guides,
        label: {
          normal: {
            show: true,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            fontSize: 14,
          },
        },
      },
    ],
  }
}

onMounted(() => {
  updateChart()
})

watch(() => props.reports, () => {
  updateChart()
})
</script>

<style>
.echarts {
  width: 100% !important;
}
</style>