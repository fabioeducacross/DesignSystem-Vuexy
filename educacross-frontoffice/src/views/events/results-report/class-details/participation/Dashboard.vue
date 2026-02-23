<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" lg="4" order="1" order-lg="2">
        <b-skeleton-wrapper :loading="loadingDashboatdData" class="h-100 pb-1">
          <template v-slot:loading>
            <div class="h-100">
              <b-row class="match-heigth h-100">
                <b-col cols="12">
                  <b-skeleton type="card" height="215px" class="w-100 rounded" />
                </b-col>
              </b-row>
            </div>
          </template>
          <DynamicMediaCard
            title="Alunos participantes"
            :title-color="dynamicCardStatusEnum.fontColor"
            has-tooltip-icon
            tooltip-text="Inciaram ao menos 1 missão."
            :icon="dynamicCardStatusEnum.icon"
            variant="light-white"
            :bg-variant="dynamicCardStatusEnum.variant"
            right-align
            :icon-background="`${dynamicCardStatusEnum.backgroundColor}`"
            :value="dashboardData.students"
          >
            <template v-slot:description>
              <p :class="dynamicCardStatusEnum.fontColor">
                <span class="font-extrabold">
                  {{ dashboardData.studentsStarted | formatNumber }}
                </span>
                de
                {{ dashboardData.students | formatNumber }}
                <br />participaram
              </p>
              <h6 :class="`${dynamicCardStatusEnum.fontColor} font-bold`">
                {{
                  calcPercent(dashboardData.studentsStarted, dashboardData.students) | formatNumber
                }}%
              </h6>
            </template>
          </DynamicMediaCard>
        </b-skeleton-wrapper>
      </b-col>
      <b-col cols="12" lg="4" order="1" order-lg="2">
        <b-skeleton-wrapper :loading="loadingDashboatdData" class="h-100 pb-1">
          <template v-slot:loading>
            <div class="h-100">
              <b-row class="match-heigth h-100">
                <b-col cols="12">
                  <b-skeleton type="card" height="215px" class="w-100 rounded" />
                </b-col>
              </b-row>
            </div>
          </template>
          <b-card no-body>
            <b-row class="h-full">
              <b-col class="text-black">
                <div class="px-1 pt-1 d-flex align-items-center justify-content-between">
                  <span class="mb-0 text-body">Participação da Turma</span>
                  <span
                    v-b-tooltip.hover.top="'Iniciaram ao menos 1 missão.'"
                    class="material-icons-outlined text-body ml-50"
                    style="font-size: 16px"
                  >
                    info
                  </span>
                </div>
                <BarChart
                  v-if="dashboardData.participationHorizontalBarChartSeries"
                  :key="keyCounter"
                  :data="dashboardData.participationHorizontalBarChartSeries"
                  :chart-y-labels="dashboardData.participationHorizontalBarChartSeries.chartYLabels"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-skeleton-wrapper>
      </b-col>
      <b-col cols="12" lg="4" order="1" order-lg="2">
        <b-skeleton-wrapper :loading="loadingDashboatdData" class="h-100 pb-1">
          <template v-slot:loading>
            <div class="h-100">
              <b-row class="match-heigth h-100">
                <b-col cols="12">
                  <b-skeleton type="card" height="215px" class="w-100 rounded" />
                </b-col>
              </b-row>
            </div>
          </template>
          <b-card no-body>
            <b-row class="h-full">
              <b-col class="text-black">
                <div class="px-1 pt-1 d-flex align-items-center justify-content-between">
                  <span class="mb-0 text-body">Rendimento da Turma</span>
                  <span
                    v-b-tooltip.hover.top="$t('performanceBasedOnStudentMistakesAndSuccesses')"
                    class="material-icons-outlined text-body ml-50"
                    style="font-size: 16px"
                  >
                    info
                  </span>
                </div>
                <BarChart
                  v-if="dashboardData.performanceHorizontalBarChartSeries"
                  :key="keyCounter"
                  :data="dashboardData.performanceHorizontalBarChartSeries"
                  :chart-y-labels="dashboardData.performanceHorizontalBarChartSeries.chartYLabels"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-skeleton-wrapper>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import DynamicMediaCard from '@/components/card/DynamicMediaCard.vue'
import { getDynamicCardStatusEnum } from '@/consts/eventsEnum.js'
import router from '@/router'
import { getEventResultReportStudentsDashboard } from '@/services/shared/events/Events.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { calcPercent, formatDecimalPlace } from '@/utils/number.js'
import BarChart from '@/views/pages/admin-context/evaluations/components/BarChart.vue'
import { onMounted, ref, watch } from 'vue'

// Get params from router (must migrate: use router currentRoute object for Vue 2.7)
const { eventId, institutionId } = router.currentRoute.params
const { classe } = useFilters()

const chartSeries = ref([])
const keyCounter = ref(0)
const dashboardData = ref({})
const dynamicCardStatusEnum = ref({})
const loadingDashboatdData = ref(true)

const fetchDashboardData = () => {
  dynamicCardStatusEnum.value = getDynamicCardStatusEnum(
    calcPercent(dashboardData.value?.studentsStarted, dashboardData.value?.students),
  )
}

const fetchEventResultReportStudentsDashboard = () => {
  loadingDashboatdData.value = true
  const params = {
    institutionId,
    classId: classe.value.ClassId,
  }

  getEventResultReportStudentsDashboard(eventId, params)
    .then(response => {
      const { data } = response
      dashboardData.value = data

      store.commit('events/setLastUpdate', data.lastUpdated)

      const participationHorizontalBarChartSeries = generateChartData(
        data.dashboardParticipation,
        'Alunos participantes',
        '#00CFE8',
      )

      dashboardData.value = {
        ...dashboardData.value,
        participationHorizontalBarChartSeries,
      }

      const performanceHorizontalBarChartSeries = generateChartData(
        data.dashboardPerformance,
        'Desafios acertados',
        '#7367F0',
      )

      dashboardData.value = {
        ...dashboardData.value,
        performanceHorizontalBarChartSeries,
      }
    })
    .finally(() => {
      loadingDashboatdData.value = false
    })
}

const formatYAxisLabel = label => {
  const labelArray = label.split(' ')
  return labelArray[labelArray.length - 1]
}

const generateChartData = (serieArray, chartName, barColor) => {
  if (!serieArray.length) {
    return {
      series: [
        {
          name: chartName,
          data: [0],
          color: barColor,
        },
      ],
      chartColumnLabel: [''],
      chartYLabels: [''],
    }
  }

  const seriesData = []
  const tooltipLeftValue = []
  const chartColumnLabel = []
  const chartYLabels = []

  serieArray.forEach(item => {
    seriesData.push(formatDecimalPlace(item.value))
    if (item.students >= 0) {
      tooltipLeftValue.push(item.students)
    }
    chartColumnLabel.push(formatYAxisLabel(item.key))
    chartYLabels.push(item.key)
  })

  return {
    series: [
      {
        name: chartName,
        data: seriesData,
        color: barColor,
      },
    ],
    chartColumnLabel,
    chartYLabels,
  }
}

watch([dashboardData], () => {
  fetchDashboardData()
  keyCounter.value += 1
})

onMounted(() => {
  fetchEventResultReportStudentsDashboard()
})
</script>