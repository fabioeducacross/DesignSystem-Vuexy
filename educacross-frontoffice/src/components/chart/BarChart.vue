<template>
  <VueApexCharts
    ref="refChart"
    :options="chartOptions"
    :series="chartOptions.series"
    :height="height"
  />
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'

// Lazy-load vue-apexcharts component
const VueApexCharts = () => import('vue-apexcharts')

// Props
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
  height: {
    required: false,
    default: 235,
  },
  chartYLabels: {
    type: Array,
    default: () => [],
  },
})

const { data } = toRefs(props)
const refChart = ref(null)

// Chart Options (Reactive)
const getSafeSeries = d => {
  if (Array.isArray(d?.series) && d.series.length > 0 && Array.isArray(d.series[0]?.data)) {
    return d.series
  }
  return [
    {
      name: 'Sem dados',
      data: [0],
      color: '#D8D6DE',
    },
  ]
}

const getSafeCategories = d => {
  if (Array.isArray(d?.chartColumnLabel) && d.chartColumnLabel.length > 0) {
    return d.chartColumnLabel
  }
  return ['']
}

const initialSeries = getSafeSeries(data.value)
const initialCategories = getSafeCategories(data.value)

const chartOptions = ref({
  series: initialSeries,
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false,
    },
    fontFamily: 'Montserrat',
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top',
      },
      borderRadius: 4,
      barHeight: `${initialSeries.length * (initialCategories.length * 10)}%`,
    },
  },
  grid: {
    show: true,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    position: 'top',
    horizontalAlign: 'left',
    markers: {
      radius: 50,
      width: 8,
      height: 8,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 4,
    colors: ['transparent'],
  },
  tooltip: {
    enabled: props.chartYLabels.length > 0,
    shared: true,
    intersect: false,
    y: {
      formatter(value) {
        return `${value}%`.replace('.', ',')
      },
    },
    x: {
      show: true,
      formatter: (value, { dataPointIndex }) => {
        return props.chartYLabels[dataPointIndex]
      },
    },
  },
  xaxis: {
    categories: initialCategories,
    tickAmount: 4,
    min: 0,
    max: 100,
    range: 25,
    labels: {
      formatter: value => {
        if (value !== undefined && value !== null) {
          return `${value}%`
        }
      },
    },
  },
  yaxis: {
    position: 'top',
  },
})

// Watch for changes in "data" prop and update chartOptions reactively
watch(
  data,
  (newData) => {
    const safeSeries = getSafeSeries(newData)
    const safeCategories = getSafeCategories(newData)
    chartOptions.value.series = safeSeries
    chartOptions.value.xaxis.categories = safeCategories
    chartOptions.value.plotOptions.bar.barHeight =
      `${safeSeries.length * (safeCategories.length * 10)}%`
  },
  { immediate: true, deep: true }
)
</script>