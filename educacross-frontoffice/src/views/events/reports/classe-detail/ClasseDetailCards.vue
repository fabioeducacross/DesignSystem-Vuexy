<template>
  <section>
    <b-row class="match-height">
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
              <MediaCard
                title="Progresso médio da turma"
                icon="show_chart"
                variant="light-success"
                right-align
              >
                <template v-slot:description>
                  <h6 class="font-bold" :class="progressVariant.textClass">
                    {{ cardsInfo.progress | formatNumber }}%
                  </h6>
                </template>
              </MediaCard>
            </b-col>
            <b-col cols="12" sm="6">
              <MediaCard
                title="Tempo de aprendizagem"
                icon="watch"
                variant="light-primary"
                right-align
              >
                <template v-slot:description>
                  <h6 class="text-primary font-bold">
                    {{ formattedTime(cardsInfo.time) }}
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
                  <h6 class="text-primary font-bold">
                    {{ cardsInfo.challenges | formatNumber }}
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
                      {{ details.endDate | DaysLeft }}
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
                          {{ cardsInfo.students ? cardsInfo.students : 0 | formatNumber }}
                        </span>
                        <span class="text-body text-lg">no total</span>
                      </h4>
                    </div>
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Iniciaram</h5>
                      <h5 class="font-bold text-body">
                        {{ cardsInfo.studentsStarted | formatNumber }}
                      </h5>
                    </div>
                    <div>
                      <h5 class="mb-0 text-body font-weight-normal">Finalizaram</h5>
                      <h5 class="font-bold text-body">
                        {{ cardsInfo.studentsFinished | formatNumber }}
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

<script>
import Chart from '../Chart.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import RadialBarChart from '@/components/chart/RadialBarChart.vue'
import { getVariantByRule } from '@/consts/legends'
import axiosIns from '@/libs/axios'
import router from '@/router'
import useFilters from '@/store/filters/useFilters'
import { calcPercent } from '@/utils/number.js'
import { formattedTime } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { defineComponent, ref, toRefs, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification/composition'

export default defineComponent({
  name: 'ClasseDetailCards',
  components: {
    Chart,
    MediaCard,
    RadialBarChart,
  },
  props: {
    classeDetails: {
      type: Object,
      required: true,
    },
  },
  filters: {
    Time(value) {
      return formattedTime(value, '0s')
    },
    DaysLeft(value) {
      if (!value) {
        return ''
      }
      const day = Math.ceil((new Date(value) - new Date()) / 1000 / 60 / 60 / 24)
      if (day < 0 || Number.isNaN(day)) {
        return '0 dias'
      }
      return day === 0 ? `${day} dia` : `${day} dias`
    },
  },
  setup(props, { emit }) {

const toast = useToast()

const isLoading = ref(true)
const chartSeries = ref([])

const cardsInfo = ref({
  students: 0,
  studentsStarted: 0,
  studentsFinished: 0,
  challenges: 0,
  time: 0,
  progress: 0,
  lastUpdatedAt: '-',
})

const { classeDetails } = toRefs(props)
const details = ref(classeDetails.value)

const { eventId, institutionId } = router.currentRoute.params

const { classe } = useFilters()

const setChartSeries = (started, finished, total) => {
  let notStarted = total - started

  if (notStarted < 0) {
    notStarted *= -1
  }

  return [calcPercent(started, total), calcPercent(finished, started)]
}

const fetchData = () => {
  isLoading.value = true

  axiosIns
    .get(`/v1/events/active/${eventId}/report/student/dashboard`, {
      params: {
        institutionId,
        classId: classe.value.ClassId,
      },
    })
    .then(response => {
      if (response.status === 204) {
        return
      }
      const { data } = response

      cardsInfo.value = data

      chartSeries.value = setChartSeries(
        cardsInfo.value.studentsStarted,
        cardsInfo.value.studentsFinished,
        cardsInfo.value.students,
      )

      emit('lastUpdatedEvent', cardsInfo.value.lastUpdatedAt)
    })
    .catch(() => {
      toast({
        component: Toast,
        props: {
          title: 'Erro',
          icon: 'AlertTriangleIcon',
          variant: 'danger',
          text: 'Erro ao carregar os cards',
        },
      })
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(() => {
  fetchData()
})

const progressVariant = computed(() => getVariantByRule(cardsInfo.value.progress, 'eventProgress'))

return {
  isLoading,
  chartSeries,
  cardsInfo,
  details,
  progressVariant,
  formattedTime,
}
},
})

</script>

<style lang="scss" scoped></style>