<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-row>
        <b-col cols="12" class="mb-1">
          <div class="d-flex align-items-center">
            <b-skeleton type="avatar" size="50px" class="mr-1" />
            <b-skeleton width="50%" />
          </div>
        </b-col>
        <b-col cols="6">
          <b-skeleton />
          <b-skeleton />
        </b-col>
        <b-col cols="6">
          <b-skeleton />
          <b-skeleton />
        </b-col>
        <b-col cols="12">
          <b-skeleton height="200px" />
        </b-col>
      </b-row>
    </template>
    <b-row>
      <b-col cols="12" class="mb-1">
        <div class="d-flex align-items-center">
          <b-avatar class="align-center mr-1" size="50px" variant="light-warning">
            <span class="material-symbols-outlined">videogame_asset</span>
          </b-avatar>
          <h4 class="text-warning mb-0 font-semibold">Atividades jogadas na Ilha</h4>
        </div>
      </b-col>
      <b-col cols="6">
        <h5>Total</h5>
        <span class="h1 font-weight-bolder">{{
          filters.formattedTime(activitiesIsland.total, '0s')
        }}</span>
      </b-col>
      <b-col cols="6">
        <h5>Últimos 7 dias</h5>
        <span class="h1 font-weight-bolder">{{
          filters.formattedTime(activitiesIsland.last7Days, '0s')
        }}</span>
      </b-col>
      <b-col cols="12" class="pl-0">
        <ApexCharts ref="refChart" :options="options" :series="series" />
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance } from 'vue'
import VueApexCharts from 'vue-apexcharts'

const props = defineProps({
  activitiesIsland: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

const refChart = ref(null)

// Accessing filters from component instance context as per Vue 2 plugin
const { proxy } = getCurrentInstance()
const filters = proxy.$options.filters

const categories = computed(() => {
  if (!props.activitiesIsland.chartContent || props.activitiesIsland.chartContent.length === 0) {
    const datas = []
    for (let i = 0; i < 7; i += 1) {
      datas.push('No data')
    }
    return datas
  }
  return props.activitiesIsland.chartContent.map(dataPoint => dataPoint.date)
})

const finishedActivitiesIslandChartContent = computed(() => {
  if (!props.activitiesIsland.chartContent || props.activitiesIsland.chartContent.length === 0) {
    const values = []
    for (let i = 0; i < 7; i += 1) {
      values.push(0)
    }
    return values
  }
  return props.activitiesIsland.chartContent.map(dataPoint => dataPoint.value)
})

const options = ref({
  chart: {
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    y: {
      show: false,
      formatter: value => filters.formatNumber(value),
    },
    x: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
    show: false,
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  colors: ['#FFB443'],
  stroke: {
    curve: 'smooth',
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5,
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    categories: categories.value,
  },
})

const series = ref([
  {
    name: 'Atividades',
    data: finishedActivitiesIslandChartContent.value,
  },
])

watch(
  () => props.activitiesIsland,
  () => {
    series.value[0].data = finishedActivitiesIslandChartContent.value
    options.value.xaxis.categories = categories.value
  },
  { deep: true, immediate: true }
)
</script>