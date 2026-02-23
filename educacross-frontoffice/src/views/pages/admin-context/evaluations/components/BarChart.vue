<template>
  <vue-apex-charts
    ref="refChart"
    :options="chartOptions"
    :series="chartOptions.series"
    :height="height"
  />
</template>

<script setup>
  import { ref } from 'vue'
  import VueApexCharts from 'vue-apexcharts'

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
    },
  })

  // Refs
  const refChart = ref(null)

  // Helpers for safe defaults
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

  const initialSeries = getSafeSeries(props.data)
  const initialCategories = getSafeCategories(props.data)

  // Chart Options
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
      // offsetY: -2,
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
      enabled: Array.isArray(props.chartYLabels) && props.chartYLabels.length > 0,
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
          return props.chartYLabels?.[dataPointIndex]
        },
      },
      // custom({ series, seriesIndex, dataPointIndex, w }) {
      //   if (props.data?.series?.[seriesIndex]?.dataLabels) {
      //     return `${props.data?.series[seriesIndex].dataLabels[dataPointIndex]} (${series[seriesIndex][dataPointIndex]}%)`
      //   }
      //   return `${series[seriesIndex][dataPointIndex]}%`
      // },
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
</script>