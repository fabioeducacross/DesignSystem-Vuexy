<template>
  <VueApexCharts ref="refChart" :options="chartOptions" :series="series" />
</template>

<script setup>
import { ref, toRefs, computed } from 'vue'
import { $themeColors } from '@themeConfig'

// Lazy import ApexCharts component
const VueApexCharts = () => import('vue-apexcharts')

// Props
const props = defineProps({
  series: {
    type: Array,
    required: true,
  },
  labels: {
    type: Array,
    required: false,
    default: () => ['iniciaram', 'finalizaram', 'não iniciaram'],
  },
  colors: {
    type: Array,
    required: false,
    default: () => ['#28c76f66', $themeColors.success, '#28c76f33'],
  },
})

const refChart = ref(null)

const { series, labels, colors } = toRefs(props)

const studentsDataInfo = computed(() => series.value)

const chartDefaultLabel = ref(studentsDataInfo.value[1])

const chartOptions = ref({
  chart: {
    type: 'donut',
    toolbar: {
      show: false,
    },
    fontFamily: 'Montserrat',
  },
  tooltip: {
    enabled: false,
  },
  dataLabels: {
    enabled: false,
  },
  legend: { show: false },
  comparedResult: [2, -3, 8],
  labels: labels.value,
  stroke: { width: 0 },
  colors: colors.value,
  grid: {
    padding: {
      right: -20,
      bottom: -8,
      left: -20,
    },
  },
  plotOptions: {
    pie: {
      startAngle: 10,
      donut: {
        labels: {
          show: true,
          name: {
            offsetY: 15,
            color: '#6E6B7B',
            fontSize: '2px',
          },
          value: {
            offsetY: -15,
            fontSize: '18px',
            fontWeight: '500',
            color: '#6E6B7B',
            formatter(val) {
              // eslint-disable-next-line radix
              return `${val}%`.replace('.', ',')
            },
          },
          total: {
            show: true,
            offsetY: 15,
            label: 'finalizaram',
            color: '#6E6B7B',
            fontSize: '12px',
            fontWeight: '400',
            formatter() {
              return `${chartDefaultLabel.value}%`.replace('.', ',')
            },
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 1325,
      options: {
        chart: {
          height: 120,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 150,
        },
      },
    },
    {
      breakpoint: 1045,
      options: {
        chart: {
          height: 120,
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 150,
        },
      },
    },
    {
      breakpoint: 370,
      options: {
        chart: {
          height: 120,
        },
      },
    },
  ],
})
</script>