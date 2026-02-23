<template>
  <e-charts ref="line" autoresize :options="option" theme="theme-color" auto-resize />
</template>

<script setup>
import theme from './theme.json'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/lib/echarts'
import { PieChart } from 'echarts/charts'
import ECharts from 'vue-echarts'

echarts.registerTheme('theme-color', theme)
echarts.use([GridComponent, TooltipComponent, LegendComponent, PieChart])

const props = defineProps({
  series: {
    type: Array,
    default: null,
  },
})

const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    left: 10,
    bottom: '0',
  },
  series: props.series,
}
</script>