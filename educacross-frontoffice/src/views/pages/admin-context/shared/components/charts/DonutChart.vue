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
      <div id="chart" class="donut-chart">
        <v-chart
          v-if="hasData"
          class="chart-canvas"
          :option="chartOption"
          autoresize
        />
        <div v-else class="text-center text-muted py-5">
          Sem dados para exibir
        </div>
      </div>

      <div class="details-link">
        <span>{{ subtitle }}</span>
        <router-link
          v-if="chartName === 'engagementClass'"
          v-slot="{ navigate }"
          :to="{
            name: userRole === 'NetworkManager' ? 'engagementSchoolReport' : 'engagementReport',
          }"
        >
          <b-button variant="primary" @click="navigate"> Ver detalhes </b-button>
        </router-link>
      </div>
    </b-card>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { formatNumber } from '@/filters/filters'
import { BButton, BCard, BTooltip } from 'bootstrap-vue'
import store from '@/store/index.js'

import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

const props = defineProps({
  info: { type: String, required: false },
  title: { type: String, required: true },
  series: { type: Array, required: true },
  labels: { type: Array, required: true },
  colors: { type: Array, required: true },
  chartName: { type: String, required: true },
  subtitle: { type: String, required: false },
})

const userRole = computed(() => store.getters.accessRole)

const hasData = computed(() => {
  return props.series && props.series.length > 0 && props.labels && props.labels.length > 0
})

const chartData = computed(() => {
  if (!hasData.value) return []
  return props.labels.map((label, index) => ({
    name: label,
    value: props.series[index] || 0
  }))
})

const getLabelSuffix = (chartName) => {
  const names = {
    engagementClass: ' Turmas',
    engagementStudent: '% Alunos',
    default: '% Acessos',
  }
  return names[chartName] || names.default
}

const chartOption = computed(() => {
  const suffix = getLabelSuffix(props.chartName)

  return {
    color: props.colors,
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `${params.marker} ${params.name}: <b>${formatNumber(params.value)}</b>`
      }
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: '5%',
      top: 'center',
      itemGap: 15,
      icon: 'circle',
      textStyle: {
        fontFamily: 'Montserrat, Helvetica, Arial, serif',
        fontSize: 14,
        rich: {
          a: {
            fontSize: 14,
            fontWeight: 600,
            color: '#5e5873',
            padding: [0, 0, 4, 0]
          },
          b: {
            fontSize: 14,
            color: '#999',
          }
        }
      },
      formatter: (name) => {
        const item = chartData.value.find(d => d.name === name)
        const val = item ? item.value : 0
        return `{a|${name}}\n{b|${val}${suffix}}`
      }
    },
    series: [
      {
        name: props.title,
        type: 'pie',
        radius: ['45%', '65%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false
          }
        },
        data: chartData.value
      }
    ],
    media: [
      {
        query: { maxWidth: 480 },
        option: {
          series: [
            { center: ['50%', '40%'] }
          ],
          legend: {
            orient: 'horizontal',
            bottom: 0,
            left: 'center',
            right: 'auto',
            top: 'auto'
          }
        }
      }
    ]
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
.details-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-top: 10px;
}

.donut-chart {
  width: 100%;
  height: 300px;
  position: relative;
}

.chart-canvas {
  width: 100%;
  height: 100%;
}
</style>