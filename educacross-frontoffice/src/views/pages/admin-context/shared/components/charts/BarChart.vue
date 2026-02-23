<template>
  <section>
    <b-card class="mt-1">
      <div class="mb-0 d-flex justify-content-end info">
        <feather-icon
          :id="`info-text-${title.replace(/\s/g, '-')}`"
          icon="AlertCircleIcon"
          size="18"
          class="text-muted cursor-pointer"
        />
      </div>
      <b-tooltip
        :target="`info-text-${title.replace(/\s/g, '-')}`"
        triggers="hover"
        placement="leftbottom"
      >
        <span v-html="info" />
      </b-tooltip>
      <div class="card-header">
        <h4 class="mb-0 card-title">
          {{ title }}
        </h4>
      </div>

      <!-- Chart Container -->
      <div id="chart" class="bar-chart">
        <v-chart
          v-if="hasData"
          class="chart-canvas"
          :option="chartOption"
          autoresize
        />
        <div v-else class="text-center text-muted py-5">
          Carregando ou sem dados...
        </div>
      </div>
    </b-card>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { BCard, BTooltip } from 'bootstrap-vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const props = defineProps({
  info: { type: String, required: false },
  title: { type: String, required: true },
  series: { type: Array, required: true },
  colors: { type: Array, required: true },
  categories: { type: Array, required: true },
  chartName: { type: String, required: true },
})

const hasData = computed(() => {
  return props.series && props.series.length > 0 && props.categories && props.categories.length > 0
})

const chartOption = computed(() => {
  const formattedSeries = props.series.map((s) => ({
    name: s.name,
    type: 'bar',
    data: s.data,
    barMaxWidth: 60,
    itemStyle: {
      borderRadius: [4, 4, 0, 0]
    }
  }))

  return {
    color: props.colors,
    grid: {
      left: '2%',
      right: '2%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      show: true,
      top: 0,
      right: 0,
      icon: 'roundRect',
      itemWidth: 16,
      itemHeight: 4,
      textStyle: {
        fontSize: 14,
        fontFamily: 'Montserrat, Helvetica, Arial, serif',
        padding: [0, 0, 0, 5]
      }
    },
    xAxis: {
      type: 'category',
      data: props.categories,
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: '#e5e5e5'
        }
      },
      axisLabel: {
        color: '#6e6b7b',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#e5e5e5'
        }
      },
      axisLabel: {
        color: '#6e6b7b',
        formatter: (value) => {
          return value % 1 === 0 ? value : value.toFixed(1)
        }
      }
    },
    series: formattedSeries
  }
})
</script>

<style lang="scss" scoped>
.info {
  .feather-alert-circle {
    stroke: #fff;
    circle {
      fill: #979797;
    }
  }
}
.card-header {
  padding: 0 0.5rem 0.8rem 0.5rem;
  .card-title {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 24px;
    color: #2c2c2c;
  }
}

.bar-chart {
  width: 100%;
  height: 350px;
  position: relative;
}

.chart-canvas {
  width: 100%;
  height: 100%;
}
</style>