<template>
  <vue-apex-charts
    ref="refChart"
    :options="chartOptions"
    :series="chartOptions.series"
    :height="height"
  />
</template>

<script setup>
import { ref, computed, toRefs } from 'vue'
import VueApexCharts from 'vue-apexcharts'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  seriesData: {
    type: Object,
    required: false,
  },
})

const refChart = ref(null)

const { seriesData, title } = toRefs(props)

const chartOptions = ref({
  series: [
    {
      name: 'Iniciaram',
      data: seriesData.value ? seriesData.value?.startedArray : [],
      color: '#00CFE8',
    },
    {
      name: 'Finalizaram',
      data: seriesData.value ? seriesData.value?.finishedArray : [],
      color: '#7367F0',
    },
  ],
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
    position: 'top',
    horizontalAlign: 'left',
    markers: {
      radius: 50,
      width: 8,
      height: 8,
    },
    offsetY: -2,
  },
  title: {
    text: title.value,
    style: {
      fontSize: '16px',
      fontWeight: '400',
      color: '#6E6B7B',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['#fff'],
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter(value) {
        return `${value}%`.replace('.', ',')
      },
    },
  },
  xaxis: {
    categories: seriesData.value ? seriesData.value?.chartColumnLabel : [],
    tickAmount: 4,
    min: 0,
    max: 100,
    range: 25,
    labels: {
      formatter: value => {
        if (value) {
          return `${value}%`
        }
      },
    },
  },
  yaxis: {
    position: 'top',
  },
})

const height = computed(() => {
  return Math.max(235, seriesData.value?.chartColumnLabel?.length * 45)
})
</script>