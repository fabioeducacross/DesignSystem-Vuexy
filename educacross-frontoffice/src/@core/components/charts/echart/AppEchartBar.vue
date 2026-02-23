<template>
  <e-charts ref="line" autoresize :options="option" theme="theme-color" auto-resize />
</template>

<script setup>
import theme from './theme.json'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/lib/echarts'
import { BarChart } from 'echarts/charts'
import ECharts from 'vue-echarts'

echarts.registerTheme('theme-color', theme)
echarts.use([GridComponent, TooltipComponent, LegendComponent, BarChart])

const props = defineProps({
  optionData: {
    type: Object,
    default: null,
  },
})

const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    left: 0,
  },
  grid: props.optionData?.grid,
  xAxis: props.optionData?.xAxis,
  yAxis: props.optionData?.yAxis,
  series: props.optionData?.series,
}
</script>