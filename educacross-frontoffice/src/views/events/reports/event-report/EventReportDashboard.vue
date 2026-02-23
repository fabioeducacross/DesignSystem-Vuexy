<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" lg="8" order="2" order-lg="1">
        <b-row class="match-height h-full" align-v="stretch">
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
            <b-col cols="12" sm="6" align-self="stretch">
              <MediaCard title="Escolas" icon="school" variant="light-primary" right-align>
                <template v-slot:description>
                  <p class="text-body">
                    <span class="font-extrabold">
                      {{ dashboardData.institutionsStarted | formatNumber }}
                    </span>
                    de
                    {{ dashboardData.institutions | formatNumber }}
                    iniciaram
                  </p>
                  <p class="text-body font-extrabold">
                    {{
                      calcPercent(dashboardData.institutionsStarted, dashboardData.institutions)
                        | formatNumber
                    }}%
                  </p>
                </template>
              </MediaCard>
            </b-col>
            <b-col cols="12" sm="6" align-self="stretch">
              <MediaCard title="Turmas" icon="menu_book" variant="light-info" right-align>
                <template v-slot:description>
                  <p class="text-body">
                    <span class="font-extrabold">
                      {{ dashboardData.classesStarted | formatNumber }}
                    </span>
                    de
                    {{ dashboardData.classes | formatNumber }}
                    iniciaram
                  </p>
                  <p class="text-body font-extrabold">
                    {{
                      calcPercent(dashboardData.classesStarted, dashboardData.classes)
                        | formatNumber
                    }}%
                  </p>
                </template>
              </MediaCard>
            </b-col>
            <b-col cols="12" sm="6" align-self="stretch">
              <MediaCard
                title="Desafios realizados"
                icon="videogame_asset"
                variant="light-warning"
                right-align
              >
                <template v-slot:description>
                  <p class="text-body font-extrabold">
                    {{ dashboardData.challenges | formatNumber }}
                  </p>
                </template>
              </MediaCard>
            </b-col>
            <b-col cols="12" sm="6" align-self="stretch">
              <MediaCard
                title="Tempo de aprendizagem"
                icon="watch"
                variant="light-success"
                right-align
              >
                <template v-slot:description>
                  <p class="text-body font-extrabold">
                    {{ formattedTime(dashboardData.time) }}
                  </p>
                </template>
              </MediaCard>
            </b-col>
          </b-skeleton-wrapper>
        </b-row>
      </b-col>
      <!-- CHART -->
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
                          {{ dashboardData.students | formatNumber }}
                        </span>
                        <span class="text-body text-lg">no total</span>
                      </h4>
                    </div>
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Iniciaram</h5>
                      <h5 class="font-bold text-body">
                        {{ dashboardData.studentsStarted | formatNumber }}
                      </h5>
                    </div>
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Finalizaram</h5>
                      <h5 class="font-bold text-body">
                        {{ dashboardData.studentsFinished | formatNumber }}
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
import { getEventsActiveReportInstitutionDashboard } from '@/services/shared/events/Events.Service'
import { calcPercent } from '@/utils/number.js'
import { formattedTime } from '@/utils/utils.js'
import { BAvatar } from 'bootstrap-vue'
import { ref, watch, getCurrentInstance } from 'vue'

// Props
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({}),
  },
})

// Emits
const emit = defineEmits(['eventLastUpdatedAt'])

// Instance (for route)
const instance = getCurrentInstance()
const eventId = ref(instance.proxy.$route.params.eventId)

const isLoading = ref(false)
const dashboardData = ref({})
const chartSeries = ref([])

const studantHatIcon = ref(
  new URL('@/assets/images/icons/studant-hat.svg', import.meta.url).href,
)
const openBookIcon = ref(
  new URL('@/assets/images/icons/open-book.svg', import.meta.url).href,
)
const retroJoystickIcon = ref(
  new URL('@/assets/images/icons/retro-joystick.svg', import.meta.url).href,
)
const watchIcon = ref(
  new URL('@/assets/images/icons/watch.svg', import.meta.url).href,
)

const setChartSeries = (started, finished, total) => {
  let notStarted = total - started

  if (notStarted < 0) {
    notStarted *= -1
  }

  return [calcPercent(started, total), calcPercent(finished, started)]
}

function fetchReportDashboard() {
  isLoading.value = true

  getEventsActiveReportInstitutionDashboard(eventId.value, props.filters)
    .then(response => {
      if (!response.data) {
        chartSeries.value = setChartSeries(0, 0, 0)
        dashboardData.value = {}
        return
      }

      dashboardData.value = response.data

      chartSeries.value = setChartSeries(
        dashboardData.value.studentsStarted,
        dashboardData.value.studentsFinished,
        dashboardData.value.students,
      )

      let { lastUpdatedAt } = dashboardData.value

      if (!lastUpdatedAt) {
        lastUpdatedAt = ''
      }
      emit('eventLastUpdatedAt', lastUpdatedAt)
    })
    .finally(() => {
      isLoading.value = false
    })
}

fetchReportDashboard()

watch(
  () => props.filters,
  () => {
    fetchReportDashboard()
  },
)

const formatTime = timeInSeconds => formattedTime(timeInSeconds)
</script>