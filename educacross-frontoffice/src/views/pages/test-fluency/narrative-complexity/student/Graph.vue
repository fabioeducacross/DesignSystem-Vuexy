<script setup>
import { getVariantByRule } from '@/consts/legends'
import { ENarrativeComplexityTitle } from '@/consts/narrativeComplexity'
import { getColorHexFromCssVar } from '@/utils/utils'
import { useNarrativeComplexityStudent } from '@/views/pages/test-fluency/narrative-complexity/student/useNarrativeComplexityStudent'
import { LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/lib/echarts'
import { ref, watch } from 'vue'
import ECharts from 'vue-echarts'

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart])

const refChart = ref(null)

const chartOptions = ref({})

const { details, applicationSelectedIndex, loading } = useNarrativeComplexityStudent()

const ApplicationsSequenceEnum = Object.values(ENarrativeComplexityTitle).map(a => ({
  label: a,
}))

const handleChartClick = params => {
  const content = details.value.applications[params.dataIndex]
  if (!content) return
  if (content.complexity === 0) return

  applicationSelectedIndex.value = params.dataIndex

  chartOptions.value = {
    xAxis: {
      type: 'category',
      data: ApplicationsSequenceEnum.map(a => a.label).filter((a, index) => {
        return details.value.applications[index].enabled
      }),
      axisLine: {
        show: true,
        lineStyle: {
          color: '#D8D6DE',
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      splitLine: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: '#D8D6DE',
        },
      },
      axisLabel: {
        show: false,
        color: '#6E6B7B',
        fontWeight: 600,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#D8D6DE',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#D8D6DE',
        },
      },
      axisLabel: {
        color: '#6E6B7B',
        fontWeight: 600,
      },
    },
    series: [
      {
        data: details.value.applications
          .map(a => {
            return {
              value: a.percentilComplexity,
            }
          })
          .filter((a, index) => {
            return details.value.applications[index].enabled
          }),
        type: 'line',
        symbol: 'circle',
        symbolSize: (value, params) => {
          return params.dataIndex === applicationSelectedIndex.value ? 20 : 10
        },
        lineStyle: {
          color: '#7367F0',
          width: 4,
        },
        itemStyle: {
          color: params => {
            if (params.dataIndex === applicationSelectedIndex.value) {
              return getColorHexFromCssVar(
                getVariantByRule(
                  details.value.applications[params.dataIndex].complexity,
                  'percentileNarrativeComplexityWithNotCompleted',
                ).variant,
              )
            }
            return '#7367F0'
          },
        },
        emphasis: {
          itemStyle: {
            borderWidth: 4,
          },
        },
      },
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
  }
}

watch(details, () => {
  details.value.applications.forEach((a, index) => {
    if (a.complexity !== 0) {
      applicationSelectedIndex.value = index
      return
    }
  })

  handleChartClick({ dataIndex: applicationSelectedIndex.value })
})

</script>

<template>
  <b-card>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-skeleton-img class="rounded mb-1" height="500px" />
      </template>
      <h4 class="text-primary">Evolução do aluno em cada aplicação do teste</h4>
      <e-charts
        ref="refChart"
        :options="chartOptions"
        autoresize
        class="w-100 p-0 mb-1"
        @click="handleChartClick"
      />

      <div class="d-flex flex-column flex-md-row justify-content-md-center gap-2 gap-md-5">
        <div
          v-for="(a, index) in details.applications"
          :key="index"
          :class="[
            {
              'border-primary shadow-primary': applicationSelectedIndex === index,
            },
            a.complexity === 0 ? 'cursor-not-allowed' : 'cursor-pointer',
          ]"
          class="text-center card d-flex flex-column align-items-center justify-content-between border"
          style="width: 17rem"
          @click="handleChartClick({ dataIndex: index })"
        >
          <b-card-body>
            <h5 class="text-body">{{ ApplicationsSequenceEnum[index].label }}</h5>
            <h5 v-if="a.complexity !== 0 || a.error" class="text-body">
              {{ a.createdAt | formattedDate }}
            </h5>
            <h5 v-else class="text-body">-</h5>
            <b-badge
              v-if="!a.error"
              :class="`border-${
                getVariantByRule(a.complexity, 'percentileNarrativeComplexityWithNotCompleted')
                  .variant
              }`"
              :variant="`light-${
                getVariantByRule(a.complexity, 'percentileNarrativeComplexityWithNotCompleted')
                  .variant
              }`"
              pill
              class="uppercase"
            >
              {{
                getVariantByRule(a.complexity, 'percentileNarrativeComplexityWithNotCompleted')
                  .label
              }}
            </b-badge>
            <div v-else class="d-flex align-items-center gap-2 flex-nowrap">
              <b-badge variant="light-danger" pill> Problema identificado</b-badge>
              <span
                v-b-tooltip="'Entre em contato com o nosso suporte para solucionar o problema.'"
                class="material-symbols-outlined text-danger"
                style="font-size: 18px"
              >
                info
              </span>
            </div>
          </b-card-body>
        </div>
      </div>
    </b-skeleton-wrapper>
  </b-card>
</template>