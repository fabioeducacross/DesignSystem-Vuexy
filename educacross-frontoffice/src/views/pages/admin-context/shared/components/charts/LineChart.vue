<template>
  <div class="line-chart-container">
    <v-chart ref="line" class="chart" :option="line" theme="theme-color" autoresize />
  </div>
</template>

<script setup>
  import theme from './theme.json'
  import { use, registerTheme } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { LineChart } from 'echarts/charts'
  import {
    GridComponent,
    LegendComponent,
    ToolboxComponent,
    TooltipComponent,
    TimelineComponent,
  } from 'echarts/components'
  import VChart from 'vue-echarts'
  import store from '@/store'
  import { ref, computed, watch, onMounted, nextTick } from 'vue'

  // Register ECharts modules
  use([
    CanvasRenderer,
    GridComponent,
    ToolboxComponent,
    TooltipComponent,
    LegendComponent,
    LineChart,
    TimelineComponent,
  ])

  // Register custom theme
  registerTheme('theme-color', theme)

  // Props
  const props = defineProps({
    label: { type: Array, default: () => [] },
    date: { type: Array, default: () => [] },
    coordinatorArray: { type: Array, default: () => [] },
    managerArray: { type: Array, default: () => [] },
    studentArray: { type: Array, default: () => [] },
    teacherArray: { type: Array, default: () => [] },
  })

  // Chart option ref
  const line = ref({})

  // Ref for chart
  const lineChartRef = ref(null)

  // Role computed properties
  const isNetworkManager = computed(() => store.getters.accessRole === 'NetworkManager')
  const isSecretariat = computed(() => store.getters.accessRole === 'Secretariat')
  const isCoordinator = computed(() => store.getters.accessRole === 'Coordinator')
  const isManager = computed(() => store.getters.accessRole === 'Manager')

  // Role helpers (to match original computed usage)
  const roleShowCoordinator = computed(
    () => isSecretariat.value || isNetworkManager.value || isManager.value,
  )
  const roleShowManager = computed(() => isSecretariat.value || isNetworkManager.value)

  // Create chart config
  const createChart = () => {
    const series = [
      {
        name: 'Aluno',
        type: 'line',
        data: props.studentArray,
      },
      {
        name: 'Professor',
        type: 'line',
        data: props.teacherArray,
      },
    ]

    if (roleShowCoordinator.value) {
      series.push({
        name: 'Coordenador',
        type: 'line',
        data: props.coordinatorArray,
      })
    }
    if (roleShowManager.value) {
      series.push({
        name: 'Diretor',
        type: 'line',
        data: props.managerArray,
      })
    }

    const newOption = {
      baseOption: {
        grid: {
          left: '7%',
          right: '4%',
          bottom: '7%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: props.label,
        },
        xAxis: {
          type: 'category',
          name: 'PERÍODO',
          nameLocation: 'middle',
          nameGap: 30,
          boundaryGap: false,
          data: props.date,
          nameTextStyle: {
            padding: [0, 0, 0, -30],
          },
        },
        yAxis: {
          type: 'value',
          name: 'ACESSOS',
          nameLocation: 'middle',
          nameGap: 20,
          nameTextStyle: {
            padding: [0, 0, 0, 90],
          },
        },
        series: series,
      },
      media: [
        {
          query: {
            minWidth: 992,
          },
          option: {
            grid: {
              left: '3%',
            },
            yAxis: {
              nameTextStyle: {
                fontSize: 14,
              },
            },
            xAxis: {
              nameTextStyle: {
                fontSize: 14,
              },
            },
          },
        },
        {
          query: {
            minWidth: 1000,
          },
          option: {
            yAxis: {
              nameGap: 25,
            },
          },
        },
      ],
    }

    line.value = newOption
  }

  // Schedule chart update for any change
  const scheduleChartUpdate = () => {
    nextTick(() => {
      createChart()
      nextTick(() => {
        if (lineChartRef.value) {
          lineChartRef.value.resize()
        }
      })
    })
  }

  // Run on prop changes
  watch(
    () => [
      props.label,
      props.date,
      props.coordinatorArray,
      props.managerArray,
      props.studentArray,
      props.teacherArray,
    ],
    scheduleChartUpdate,
    { deep: true },
  )

  // Create chart on mount
  onMounted(() => {
    createChart()
  })
</script>

<script>
  /* The script block below is ignored in <script setup> and is present only
   so global component registration (VChart) works with Vue 2.7.
   If your build uses global registration for vue-echarts, you may remove this script block.
*/
  export default {
    components: {
      VChart,
    },
  }
</script>

<style scoped>
  .line-chart-container {
    width: 100%;
    height: 400px;
    min-height: 400px;
  }

  /* Ensure the v-chart component takes full height of the container */
  .chart {
    height: 100%;
    width: 100%;
  }
</style>
