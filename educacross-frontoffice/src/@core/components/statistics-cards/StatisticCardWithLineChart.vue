<template>
  <b-card no-body>
    <b-card-body class="d-flex justify-content-between align-items-center pb-0">
      <div class="truncate">
        <h2 class="font-weight-bolder">
          {{ statistic }}
        </h2>
        <span>{{ statisticTitle }}</span>
      </div>
      <b-avatar :variant="`light-${color}`" size="45">
        <feather-icon size="21" :icon="icon" />
      </b-avatar>
    </b-card-body>

    <vue-apex-charts
      type="line"
      height="100"
      width="100%"
      :options="chartOptionsComputed"
      :series="chartData"
    />
  </b-card>
</template>

<script setup>
import { computed } from 'vue'
import { lineChartOptions } from './chartOptions'
import { $themeColors } from '@themeConfig'
import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'
const VueApexCharts = () => import('vue-apexcharts')

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  statistic: {
    type: [Number, String],
    required: true,
  },
  statisticTitle: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'primary',
  },
  chartData: {
    type: Array,
    default: () => [],
  },
  chartOptions: {
    type: Object,
    default: null,
  },
})

function gradientToColor(color) {
  const gradientToColors = {
    primary: '#A9A2F6',
    success: '#55DD92',
    warning: '#ffc085',
    danger: '#F97794',
    info: '#59E0F0',
    secondary: '#B4B9BF',
    light: '#D0D4DB',
    dark: '#919191',
  }

  return gradientToColors[color]
}

const chartOptionsComputed = computed(() => {
  if (props.chartOptions === null) {
    const options = JSON.parse(JSON.stringify(lineChartOptions))
    options.fill.gradient.gradientToColors = [gradientToColor(props.color)]
    options.colors = [$themeColors[props.color]]
    return options
  }
  return props.chartOptions
})
</script>