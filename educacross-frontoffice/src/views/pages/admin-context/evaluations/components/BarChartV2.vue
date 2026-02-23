<template>
  <VueApexCharts
    ref="refChart"
    type="bar"
    :height="height"
    :options="chartOptions"
    :series="series"
  ></VueApexCharts>
</template>

<script setup>
import { formatNumber } from '@/filters/filters'
import { ref, watch } from 'vue'
import VueApexCharts from 'vue-apexcharts'

const props = defineProps({
  series: {
    type: Array,
    required: true,
    default: () => [{ data: [] }],
  },
  colors: {
    type: Array,
    required: true,
    default: () => [],
  },
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
  height: {
    required: false,
    default: 235,
  },
})

const refChart = ref(null)

const getColorValueFromCssVar = color => {
  const colorValue = getComputedStyle(document.documentElement).getPropertyValue(`--${color}`)
  return colorValue
}

const fillColors = colors => {
  if (!colors) {
    return ['primary']
  }
  // if colors is length not match with series.series length, fill with default color
  if (colors.length < props.series.length) {
    const defaultColor = colors.length > 0 ? colors[colors.length - 1] : '#17a2b8'
    const diff = props.series.length - colors.length
    for (let i = 0; i < diff; i++) {
      colors.push(defaultColor)
    }
  }
  return colors
}

const replaceColors = colors => {
  const regExa = /#[a-fA-F0-9]{6}/
  return colors.map(color => (regExa.test(color) ? color : getColorValueFromCssVar(color)))
}

const updateChart = () => {
  let hexColors = props.colors.slice()
  hexColors = fillColors(hexColors)
  hexColors = replaceColors(hexColors)
  return hexColors
}

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 380,
    toolbar: {
      show: false,
    },
    fontFamily: 'Montserrat',
  },
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      dataLabels: {
        position: 'top',
      },
      borderRadius: 4,
      barHeight: `${props.series.length * (props.categories.length * 10)}%`,
    },
  },
  colors: updateChart(),
  dataLabels: {
    enabled: false,
    textAnchor: 'start',
    style: {
      colors: ['#fff'],
    },
    formatter(val, opt) {
      return `${opt.w.globals.labels[opt.dataPointIndex]}:  ${val}`
    },
    offsetX: 0,
    dropShadow: {
      enabled: true,
    },
  },
  stroke: {
    show: true,
    width: 4,
    colors: ['transparent'],
  },
  xaxis: {
    categories: props.categories,
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
    labels: {
      show: true,
    },
  },
  grid: {
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
    show: false,
    showForSingleSeries: true,
    position: 'top',
    horizontalAlign: 'left',
    markers: {
      radius: 50,
      width: 8,
      height: 8,
    },
  },
  tooltip: {
    enabled: !!(props.series[0] && props.series[0].name),
    shared: false,
    intersect: false,
    y: {
      formatter(value) {
        return `${formatNumber(value)}%`
      },
    },
    x: {
      show: true,
      formatter: value => {
        return value
      },
    },
  },
})

watch(
  () => props.series,
  () => {
    const colors = updateChart()
    if (refChart.value && refChart.value.updateOptions) {
      refChart.value.updateOptions({
        xaxis: {
          categories: props.categories,
        },
        colors,
      })
    }
  }
)

</script>