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

import { BarChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import {CanvasRenderer} from 'echarts/renderers'
import * as echarts from 'echarts/core'
import ECharts from 'vue-echarts'

echarts.use([CanvasRenderer, GridComponent, TooltipComponent, LegendComponent, BarChart])

const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
  },
})

const chartRef = ref(null)
const chartOptions = ref({})

const updateChart = () => {
  const time = []
  const className = []

  if (props.reports && props.reports.length > 0) {
    props.reports.forEach((element) => {
      time.push(element.time)
      className.push(element.className)
    })
  }

  chartOptions.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter(params) {
        let seconds = parseInt(params[0].value, 10)

        const hours = Math.floor(seconds / 3600)
        seconds -= hours * 3600

        const minutes = Math.floor(seconds / 60)
        seconds -= minutes * 60

        if (hours !== 0) {
          return `${hours} H ${minutes} Min`
        }

        if (hours === 0 && minutes !== 0) {
          return `${minutes} Min`
        }

        if (hours === 0 && minutes === 0) {
          return `${seconds} Seg`
        }
        return ''
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    legend: {
      data: ['Tempo Jogado'],
      textStyle: {
        color: '#FFFFFF',
      },
    },
    color: ['#71b5ff'],
    xAxis: [
      {
        type: 'value',
        axisLabel: {
          color: '#FFFFFF',
          formatter(params) {
            let seconds = parseInt(params, 10)

            const hours = Math.floor(seconds / 3600)
            seconds -= hours * 3600

            const minutes = Math.floor(seconds / 60)
            seconds -= minutes * 60

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
        name: 'Tempo Jogado',
        type: 'bar',
        data: time,
        label: {
          normal: {
            show: true,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            fontSize: 14,
            formatter(params) {
              let hours = 0
              let seconds = parseInt(params.value, 10)

              hours = Math.floor(seconds / 3600)
              seconds -= hours * 3600

              const minutes = Math.floor(seconds / 60)
              seconds -= minutes * 60

              if (hours !== 0) {
                return `${hours}h${minutes}min`
              }

              if (hours === 0 && minutes !== 0) {
                return `${minutes}min`
              }

              if (hours === 0 && minutes === 0 && seconds !== 0) {
                return `${seconds}seg`
              }

              if (hours === 0 && minutes === 0 && seconds === 0) {
                return ''
              }
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
  { deep: true }
)
</script>

<style>
.echarts {
  width: 100% !important;
}
</style>