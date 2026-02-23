<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" lg="4" order="2" order-lg="1">
        <b-skeleton-wrapper :loading="isLoading" class="w-100 px-1 mb-1">
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
                  <div class="d-flex flex-column justify-content-center h-100 gap-4">
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Alunos</h5>
                      <h4>
                        <span class="font-extrabold">
                          {{ data.totalStudents | formatNumber }}
                        </span>
                        <span class="text-body text-lg">no total</span>
                      </h4>
                    </div>
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Iniciaram a avaliação</h5>
                      <h5 class="font-bold text-body">
                        {{ data.studentsStarted | formatNumber }}
                      </h5>
                    </div>
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Finalizaram a avaliação</h5>
                      <h5 class="font-bold text-body">
                        {{ data.studentsFinished | formatNumber }}
                      </h5>
                    </div>
                  </div>
                </b-col>
                <b-col cols="6">
                  <div class="h-full text-black d-flex align-items-center chart-container">
                    <RadialBarChart :key="keyCounter" :chart-series="studentsChartSeries" />
                  </div>
                </b-col>
              </b-form-row>
            </b-card-body>
          </b-card>
        </b-skeleton-wrapper>
      </b-col>
      <b-col cols="12" lg="8" order="1" order-lg="2">
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
              <b-row class="h-full">
                <b-col class="text-black">
                  <HorizontalBarChart
                    :key="keyCounter"
                    :series-data="data.horizontalBarChartSeries"
                    title="Progresso geral por prova"
                  />
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-skeleton-wrapper>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import RadialBarChart from '@/components/chart/RadialBarChart.vue'
import { calcPercent } from '@/utils/number.js'
import HorizontalBarChart from '@/views/pages/admin-context/evaluations/components/HorizontalBarChart.vue'
import { ref, toRefs, watch } from 'vue'

// Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
})

// Reactive state
const studentsChartSeries = ref([])
const keyCounter = ref(0)

// toRefs for reactivity
const { data } = toRefs(props)

// Methods
const setStudentsChartSeries = (started, finished, total) => {
  let notStarted = total - started
  if (notStarted < 0) {
    notStarted *= -1
  }
  return [calcPercent(started, total), calcPercent(finished, total)]
}

// Watch for data prop changes
watch([data], () => {
  studentsChartSeries.value = setStudentsChartSeries(
    data.value?.studentsStarted,
    data.value?.studentsFinished,
    data.value?.totalStudents,
  )
  keyCounter.value += 1
})
</script>