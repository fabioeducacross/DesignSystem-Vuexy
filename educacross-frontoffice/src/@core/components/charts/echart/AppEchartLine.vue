<template>
  <e-charts ref="line" autoresize :options="line" theme="theme-color" auto-resize />
</template>

<script setup>
import theme from './theme.json'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/lib/echarts'
import { LineChart } from 'echarts/charts'
import ECharts from 'vue-echarts'

echarts.registerTheme('theme-color', theme)
echarts.use([GridComponent, TooltipComponent, LegendComponent, LineChart])

const props = defineProps({
  optionData: {
    type: Object,
    default: null,
  },
})

const line = {
  visualMap: [
    {
      show: true,
      type: 'continuous',
      min: 0,
      max: 400,
    },
  ],
  grid: {
    width: '96%',
    left: '30px',
    top: '10px',
    show: false,
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: [
    {
      boundaryGap: false,
      data: props.optionData?.xAxisData,
    },
  ],
  yAxis: {
    type: 'value',
    splitLine: { show: false },
  },
  series: {
    type: 'line',
    showSymbol: false,
    data: props.optionData?.series,
  },
}
</script>

<style>
  .echarts {
    width: 100% !important;
  }
</style>