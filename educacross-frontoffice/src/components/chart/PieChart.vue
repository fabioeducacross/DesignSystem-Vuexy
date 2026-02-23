<template>
  <div>
    <vue-apex-charts
      v-if="chartOptions.series.some(value => value !== 0)"
      ref="refChart"
      :options="chartOptions"
      :series="chartOptions.series"
      :height="height"
    />
    <div v-else class="d-flex align-items-center justify-content-center mb-1">
      <svg
        width="103"
        height="102"
        viewBox="0 0 103 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="51.5"
          cy="51"
          r="50"
          fill="#BABFC7"
          fill-opacity="0.12"
          stroke="#D8D6DE"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { formatNumber } from '@/filters/filters'
const VueApexCharts = () => import('vue-apexcharts')

const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
  height: {
    required: false,
    default: 150,
  },
  tooltipSuffix: {
    type: String,
    required: false,
    default: '',
  },
})

const refChart = ref(null)
const { data } = toRefs(props)

const chartOptions = ref({
  series: data.value?.series || [],
  chart: {
    type: 'pie',
    height: 130,
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  colors: data.value?.colors,
  // Ensure a valid array to avoid undefined length errors in apexcharts
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
</script>

<style lang="scss" scoped>
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