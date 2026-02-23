<template>
  <e-charts ref="line" autoresize :options="option" theme="theme-color" auto-resize />
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
  optionData: { type: Object, default: null }
})

const option = ref(props.optionData)
</script>