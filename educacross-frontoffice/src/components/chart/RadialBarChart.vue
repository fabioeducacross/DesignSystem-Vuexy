<template>
  <vue-apex-charts
    type="radialBar"
    :height="heightSize"
    :options="radialBarChart.chartOptions"
    :series="chartSeries"
  />
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { formatNumber } from '@/filters/filters'
import { $themeColors } from '@themeConfig'
import VueApexCharts from 'vue-apexcharts'

// Props
const props = defineProps({
  chartSeries: {
    type: Array,
    required: true,
  },
  seriesColors: {
    type: Array,
    required: false,
    default: () => [$themeColors.info, $themeColors.primary],
  },
  heightSize: {
    type: Number,
    default: 200,
    required: false,
  },
  showTotalLabel: {
    type: Boolean,
    required: false,
    default: true,
  },
  labels: {
    type: Array,
    required: false,
    default: () => ['Iniciaram', 'Finalizaram'],
  },
  labelColor: {
    type: String,
    required: false,
    default: $themeColors.secondary,
  },
  totalLabelColor: {
    type: String,
    required: false,
    default: '#6E6B7B',
  },
})

// Destructure props
const { chartSeries, seriesColors, labels, showTotalLabel, labelColor, totalLabelColor } = toRefs(props)

const radialBarChart = ref({
  chartOptions: {
    colors: seriesColors.value,
    fontFamily: 'Montserrat',
    plotOptions: {
      radialBar: {
        size: 200,
        hollow: {
          margin: 5,
          size: '50%',
          background: 'transparent',
        },
        dataLabels: {
          name: {
            color: labelColor.value,
            offsetY: -8,
          },
          value: {
            fontSize: '18px',
            color: labelColor.value,
            offsetY: -4,
            formatter(val) {
              return `${formatNumber(val)}%`
            },
          },
          total: {
            show: showTotalLabel.value,
            fontSize: '10px',
            fontWeight: '400',
            color: totalLabelColor.value,
            label: labels.value[0],
            formatter() {
              return `${formatNumber(chartSeries.value[0])}%`
            },
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: labels.value,
  },
})
</script>