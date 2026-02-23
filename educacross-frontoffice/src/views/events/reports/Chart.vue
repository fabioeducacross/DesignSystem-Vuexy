<template>
  <vue-apex-charts :options="chartOptions" :series="series" />
</template>

<script setup>
  import { $themeColors } from '@themeConfig'
  import VueApexCharts from 'vue-apexcharts'

  const $earningsStrokeColor2 = '#28c76f66'
  const $earningsStrokeColor3 = '#28c76f33'

  const props = defineProps({
    series: {
      type: Array,
      required: true,
    },
  })

  const chartDefaultLabel = props.series[0]

  const chartOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ['Iniciaram', 'Finalizaram', 'Não iniciaram'],
    stroke: { width: 0 },
    colors: [$themeColors.success, $earningsStrokeColor2, $earningsStrokeColor3],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20,
      },
    },
    plotOptions: {
      pie: {
        startAngle: chartDefaultLabel ? -10 : 10,
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
              formatter(val) {
                // eslint-disable-next-line radix
                return `${parseInt(val)}%`
              },
            },
            total: {
              show: true,
              offsetY: 15,
              label: 'Iniciaram',
              color: '#6E6B7B',
              fontSize: '12px',
              fontWeight: '400',
              formatter() {
                return `${chartDefaultLabel}%`
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
            height: 150,
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
            height: 150,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  }
</script>