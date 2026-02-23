<template>
  <b-card no-body>
    <b-card-body class="pb-0">
      <b-avatar class="mb-1" :variant="`light-${color}`" size="45">
        <feather-icon size="21" :icon="icon" />
      </b-avatar>
      <div class="truncate">
        <h2 class="mb-25 font-weight-bolder">
          {{ statistic }}
        </h2>
        <span>{{ statisticTitle }}</span>
      </div>
    </b-card-body>

    <vue-apex-charts
      type="area"
      height="100"
      width="100%"
      :options="chartOptionsComputed"
      :series="chartData"
    />
  </b-card>
</template>

<script setup>
import { computed } from 'vue'
import { areaChartOptions } from './chartOptions'
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

const chartOptionsComputed = computed(() => {
  if (props.chartOptions === null) {
    const options = JSON.parse(JSON.stringify(areaChartOptions))
    options.theme.monochrome.color = $themeColors[props.color]
    return options
  }
  return props.chartOptions
})
</script>