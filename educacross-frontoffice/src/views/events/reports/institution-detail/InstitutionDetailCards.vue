<template>
  <!-- EVENT DASHBOARD -->
  <section>
    <b-row class="match-height">
      <!-- SCHOOL INFO -->
      <b-col cols="12" lg="8" order="2" order-lg="1">
        <b-row class="match-height h-100">
          <b-skeleton-wrapper :loading="isLoading" class="w-100 px-1 mb-1">
            <template v-slot:loading>
              <div class="h-100">
                <b-row class="match-height h-50">
                  <b-col cols="12" sm="6">
                    <b-skeleton type="card" height="100px" class="w-100 rounded mb-1" />
                  </b-col>
                  <b-col cols="12" sm="6">
                    <b-skeleton type="card" height="100px" class="w-100 rounded mb-1" />
                  </b-col>
                </b-row>
                <b-row class="match-height">
                  <b-col cols="12" sm="6">
                    <b-skeleton type="card" height="100px" class="w-100 rounded mb-1" />
                  </b-col>
                  <b-col cols="12" sm="6">
                    <b-skeleton type="card" height="100px" class="w-100 rounded mb-1" />
                  </b-col>
                </b-row>
              </div>
            </template>
            <b-col cols="12" sm="6">
              <MediaCard title="Turmas" icon="menu_book" variant="light-info" right-align>
                <template v-slot:description>
                  <p class="text-body">
                    <span class="font-extrabold">{{ dashboard.classesStarted | formatNumber }}</span>
                    de {{ dashboard.classes | formatNumber }} iniciaram
                  </p>
                  <h6 class="text-primary font-bold">
                    {{ calcPercent(dashboard.classesStarted, dashboard.classes) | formatNumber }}%
                  </h6>
                </template>
              </MediaCard>
            </b-col>
            <b-col cols="12" sm="6">
              <MediaCard
                title="Tempo de aprendizagem"
                icon="watch"
                variant="light-success"
                right-align
              >
                <template v-slot:description>
                  <h6 class="font-bold text-primary">
                    {{ dashboard.time | Time }}
                  </h6>
                </template>
              </MediaCard>
            </b-col>
            <b-col cols="12" sm="6">
              <MediaCard
                title="Desafios realizados"
                icon="videogame_asset"
                variant="light-warning"
                right-align
              >
                <template v-slot:description>
                  <h6 class="font-bold text-primary">
                    {{ dashboard.challenges | formatNumber }}
                  </h6>
                </template>
              </MediaCard>
            </b-col>

            <b-col cols="12" sm="6">
              <MediaCard
                title="Contagem regressiva"
                title-color="text-white"
                icon="history"
                variant="light-white"
                class-variant="text-white bg-primary"
                bg-variant="primary"
                right-align
              >
                <template v-slot:description>
                  <p class="text-white">
                    <span class="font-extrabold">
                      {{ dataInstitution.endDate | DaysLeft }}
                    </span>
                    para o fim do evento
                  </p>
                </template>
              </MediaCard>
            </b-col>
          </b-skeleton-wrapper>
        </b-row>
      </b-col>
      <b-col cols="12" lg="4" order="1" order-lg="2">
        <b-skeleton-wrapper :loading="isLoading" class="h-100 pb-1">
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
            <b-card-body>
              <b-form-row class="h-100" align-v="stretch">
                <b-col cols="6">
                  <div class="d-flex flex-column justify-content-between h-100 gap-1">
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Alunos</h5>
                      <h4>
                        <span class="font-extrabold text-body">
                          {{ dashboard.students ? dashboard.students : 0 | formatNumber }}
                        </span>
                        <span class="text-body text-lg">no total</span>
                      </h4>
                    </div>
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Iniciaram</h5>
                      <h5 class="font-bold text-body">
                        {{ dashboard.studentsStarted | formatNumber }}
                      </h5>
                    </div>
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Finalizaram</h5>
                      <h5 class="font-bold text-body">
                        {{ dashboard.studentsFinished | formatNumber }}
                      </h5>
                    </div>
                  </div>
                </b-col>
                <b-col cols="6">
                  <div class="h-full text-black d-flex align-items-center chart-container">
                    <RadialBarChart :key="chartSeries[0]" :chart-series="chartSeries" />
                  </div>
                </b-col>
              </b-form-row>
            </b-card-body>
          </b-card>
        </b-skeleton-wrapper>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import RadialBarChart from '@/components/chart/RadialBarChart.vue'
import { calcPercent } from '@/utils/number.js'
import { formattedTime } from '@/utils/utils'
import { BBadge, BAvatar } from 'bootstrap-vue'
import { ref, computed, toRefs } from 'vue'
const VueApexCharts = () => import('vue-apexcharts')
import vSelect from 'vue-select'

// Props
const props = defineProps({
  dashboard: { type: Object, required: true },
  dataInstitution: { type: Object, required: true },
  isLoading: { type: Boolean, required: true },
})

// Local filters
function Time(value) {
  return formattedTime(value, '0s')
}
function DaysLeft(value) {
  if (!value) {
    return ''
  }
  const day = Math.ceil((new Date(value) - new Date()) / 1000 / 60 / 60 / 24)
  if (day < 0 || Number.isNaN(day)) {
    return '0 dias'
  }
  return day === 0 ? `${day} dia` : `${day} dias`
}

// Register filters globally
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
if (instance && instance.appContext && instance.appContext.config && instance.appContext.config.globalProperties) {
  instance.appContext.config.globalProperties.$filters = {
    ...(instance.appContext.config.globalProperties.$filters || {}),
    Time,
    DaysLeft,
  }
}

// Chart series state
const { isLoading } = toRefs(props)
const chartSeries = ref([])

const setChartSeries = (started, finished, total) => {
  let notStarted = total - started
  if (notStarted < 0) {
    notStarted *= -1
  }
  return [calcPercent(started, total), calcPercent(finished, started)]
}

chartSeries.value = setChartSeries(
  props.dashboard.studentsStarted,
  props.dashboard.studentsFinished,
  props.dashboard.students,
)
</script>