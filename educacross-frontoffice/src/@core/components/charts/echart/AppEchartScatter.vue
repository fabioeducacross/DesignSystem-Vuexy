<template>
  <e-charts ref="line" :options="option" theme="theme-color" auto-resize />
</template>

<script setup>
import theme from './theme.json'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/lib/echarts'
import { ScatterChart } from 'echarts/charts'
import ECharts from 'vue-echarts'

echarts.registerTheme('theme-color', theme)
echarts.use([GridComponent, TooltipComponent, LegendComponent, ScatterChart])

const props = defineProps({
  optionData: {
    type: Object,
    default: null,
  },
})

import { computed } from 'vue'

const option = computed(() => ({
  grid: {
    width: '95%',
    left: '30px',
    right: '40px',
    containLabel: false,
  },
  legend: {
    enable: true,
    left: '0',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  xAxis: {
    boundaryGap: false,
    scale: true,
    splitNumber: 10,
    min: 0,
  },
  yAxis: {
    splitLine: { show: false },
    scale: true,
  },
  series: props.optionData ? props.optionData.series : undefined,
}))
</script>