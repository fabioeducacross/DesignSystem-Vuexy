<template>
  <div>
    <VueApexCharts
      v-if="chartOptions.series.some(value => value !== 0)"
      ref="refChart"
      :options="chartOptions"
      :series="chartOptions.series"
      :height="height"
    />
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
import { formatNumber } from '@/filters/filters'

const VueApexCharts = () => import('vue-apexcharts')

const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
  height: {
    required: false,
    default: 350,
  },
  tooltipSuffix: {
    type: String,
    required: false,
    default: '',
  },
})

const { data } = toRefs(props)
const refChart = ref(null)

const chartOptions = ref({
  series: data.value?.series || [],
  chart: {
    type: 'donut',
    customScale: 1.2,
  },
  plotOptions: {
    pie: {
      size: 300,
      startAngle: -90,
      endAngle: 90,
      expandOnClick: false,
      donut: {
        size: '40%',
      },
    },
  },
  legend: {
    show: false,
  },
  // Ensure colors is an array to avoid apexcharts `.length` on undefined
  colors: data.value?.colors || [],
  dataLabels: {
    enabled: false,
  },
  labels: data.value?.tooltipLabels || [],
  tooltip: {
    custom: ({ series, seriesIndex, w }) => {
      return `<div class="arrow_box">
        <div class="chart-tooltip-icon rounded-circle" style="border-color: ${w.globals.colors[seriesIndex]};"></div>
        <span class="text-body">
          ${w.globals.labels[seriesIndex]} ${formatNumber(series[seriesIndex])}${props.tooltipSuffix}
        </span>
      </div>`
    },
  },
})

// Reactively update chartOptions if props.data changes
watch(
  data,
  (newData) => {
    chartOptions.value.series = newData?.series || []
    chartOptions.value.colors = newData?.colors
    chartOptions.value.labels = newData?.tooltipLabels || []
  },
  { immediate: true }
)
</script>

<style lang="scss">
.arrow_box {
  font-size: 12px;
  background: #fff;
  border: 1px solid #d8d6de;
  padding: 0 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
}

#chart .apexcharts-tooltip {
  color: #fff;
  background: transparent !important;
  transform: translateX(10px) translateY(10px);
  overflow: visible !important;
  white-space: normal !important;
}

#chart .apexcharts-tooltip span {
  padding: 5px 10px;
  display: inline-block;
}

.chart-tooltip-icon {
  height: 10px;
  width: 10px;
  border: 2px solid;
}
</style>