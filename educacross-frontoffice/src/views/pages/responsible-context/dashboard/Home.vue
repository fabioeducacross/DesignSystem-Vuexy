<template>
  <section>
    <DashboardFilter v-model="params" @noActivitiesAvailable="handleNoActivitiesAvailable" />
    <section v-if="hasActivitiesAvailable">
      <CardActivityCardText :activity-type="params.type" />

      <b-row class="match-height">
        <b-col cols="12" lg="6">
          <b-skeleton-wrapper :loading="loading" class="h-100 pb-1">
            <template v-slot:loading>
              <div class="h-100">
                <b-row class="match-heigth h-100">
                  <b-col cols="12">
                    <b-skeleton type="card" height="65px" class="w-100 rounded mb-2" />
                  </b-col>
                  <b-col cols="12">
                    <b-skeleton type="card" height="65px" class="w-100 rounded mb-2" />
                  </b-col>
                  <b-col cols="12">
                    <b-skeleton type="card" height="65px" class="w-100 rounded mb-2" />
                  </b-col>
                </b-row>
              </div>
            </template>
            <MediaCard
              title="Progresso"
              tooltip-text="Missões finalizadas"
              icon="timeline"
              variant="light-primary"
              right-align
            >
              <template v-slot:description>
                <ProgressBarHorizontal
                  :value="dashboardData.progress"
                  position-bottom
                  :progress-bar-colors="colorsEnum"
                  sufix-class="h6 float-right relative ProgressBarHorizontalsufix"
                  :sufix="`${formatNumber(dashboardData.activitiesPlayed)}/${formatNumber(
                    dashboardData.totalActivities,
                  )} jogos`"
                />
              </template>
            </MediaCard>
            <MediaCard
              title="Desempenho médio"
              tooltip-text="Missões finalizadas"
              icon="timeline"
              variant="light-primary"
              right-align
            >
              <template v-slot:description>
                <ProgressBarHorizontal
                  :value="dashboardData.performance"
                  position-bottom
                  :progress-bar-colors="colorsEnum"
                />
              </template>
            </MediaCard>
            <MediaCard
              title="Tempo de aprendizagem"
              tooltip-text="Missões finalizadas"
              icon="timelapse"
              variant="light-primary"
              right-align
            >
              <template v-slot:description>
                <p class="text-primary font-bold">{{ dashboardData.totalTime | formattedTime }}</p>
              </template>
            </MediaCard>
          </b-skeleton-wrapper>
        </b-col>
        <b-col cols="12" lg="6">
          <b-skeleton-wrapper :loading="loading" class="h-100 pb-1">
            <template v-slot:loading>
              <div class="h-100">
                <b-row class="match-heigth h-100">
                  <b-col cols="12">
                    <b-skeleton type="card" height="238px" class="w-100 rounded" />
                  </b-col>
                </b-row>
              </div>
            </template>
            <b-card no-body>
              <b-row class="h-full">
                <b-col class="text-black">
                  <div class="px-1 pt-1">
                    <span class="mb-0 text-body h5 font-weight-normal">Progresso por tópico</span>
                  </div>
                  <BarChart
                    :data="dashboardData.chart"
                    :chart-y-labels="chartYLabels"
                    height="350"
                  />
                </b-col>
              </b-row>
            </b-card>
          </b-skeleton-wrapper>
        </b-col>
      </b-row>
      <Legend />
    </section>
    <section v-else>
      <b-card>
        <div class="px-4">
          <div class="d-flex align-items-center justify-content-center mb-1">
            <img :src="warningIcon" alt="Warning" />
          </div>
          <p class="text-center">
            No momento, não há dados a serem exibidos no painel inicial, pois
            <span class="font-bold text-primary">não existem módulos habilitados</span> para o ano
            escolar do seu filho nesta área de conhecimento.
            <span class="font-bold text-primary">Acesse outros relatórios</span> filtrando uma nova
            área ou navegando pelo menu lateral.
          </p>
        </div>
      </b-card>
    </section>
  </section>
</template>

<script setup>
import CardActivityCardText from './CardActivityCardText.vue'
import DashboardFilter from './DashboardFilter.vue'
import Legend from './Legend.vue'
import warningIcon from '@/assets/icons/warning.svg'
import MediaCard from '@/components/card/MediaCard.vue'
import BarChart from '@/components/chart/BarChart.vue'
import ProgressBarHorizontal from '@/components/progessBar/ProgressBarHorizontal.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import { getDashboardDataStudent } from '@/services/responsible-context/dashboard/Dashboard.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { colorsEnum } from '@/utils/dashboard/rangeColors.js'
import { calcPercent, formatDecimalPlace } from '@/utils/number.js'
import sortObjectListByKey from '@/utils/sort.js'
import { ref, watch, computed } from 'vue'

const userClassName = computed(() => store.state.access.userData.ClassName)
const userLevel = computed(() => store.state.access.userData.Level)
const userClassTag = ref('')
const chartYLabels = ref([])
const hasActivitiesAvailable = ref(true)

const { student } = useFilters()

const setClassTag = () => {
  const classNameArray = userClassName.value.split(' ')

  if (userLevel.value === 'INF') {
    userClassTag.value = classNameArray[0]
  } else {
    userClassTag.value = `${classNameArray[0]} ${classNameArray[1]}`
  }
}

setClassTag()

const params = ref({
  Type: undefined,
  SubjectId: undefined,
  MonthI: 1,
  MonthF: new Date().getMonth() + 1,
})
const loading = ref(true)

const name = computed(() => store.state.access.userData.Name)

const profileImages = import.meta.glob(
  '@/assets/images/images-educa/profile-corujinhas/*.png',
  { eager: true, import: 'default' },
)

const studentImage = computed(() => {
  if (student.value.ImageId) {
    const imagePath = `/src/assets/images/images-educa/profile-corujinhas/${student.value.ImageId}.png`
    return profileImages[imagePath] || ''
  }
  return ''
})

const imageBgColor = computed(() => student.value.BackgroundColor)

const abbreviateName = name => {
  if (!name) return '-'
  const names = name.split(' ')
  let abbreviatedLabel = ''
  names.forEach(name => {
    if (name.length > 3) {
      abbreviatedLabel += name.charAt(0).toUpperCase()
    }
  })

  return abbreviatedLabel
}

const generateChartData = value => {
  const serieProgressArray = Object.entries(value).map(([key, value]) => ({
    key,
    percentage: value,
  }))
  if (!serieProgressArray.length) {
    chartYLabels.value = []

    return {
      series: [
        {
          name: 'Jogos finalizados',
          data: [0],
          color: '#00cfe8',
        },
      ],
      chartColumnLabel: [''],
    }
  }

  const newArray = sortObjectListByKey(serieProgressArray, 'serieName')

  const percentage = []
  const chartColumnLabel = []
  chartYLabels.value = []

  newArray.forEach(item => {
    percentage.push(formatDecimalPlace(item.percentage))
    chartColumnLabel.push(abbreviateName(item.key))
    chartYLabels.value.push(item.key)
  })

  return {
    series: [
      {
        name: 'Jogos finalizados',
        data: percentage,
        color: '#00cfe8',
      },
    ],
    chartColumnLabel,
  }
}

const goToStudentFamilyMissions = () => {
  router.push({
    name: 'studentFamilyMissions',
  })
}

const setDefaultData = () => {
  return {
    progress: 0,
    performance: 0,
    totalTime: '',
    activitiesPlayed: 0,
    totalActivities: 0,
    chart: {
      series: [
        {
          name: 'Jogos finalizados',
          data: [0],
          color: '#00cfe8',
        },
      ],
      chartColumnLabel: [''],
      chartYLabels: [''],
    },
  }
}

const dashboardData = ref(setDefaultData())

const fetchData = () => {
  // Only fetch if required parameters are defined
  if (!params.value.Type || !params.value.SubjectId) {
    loading.value = false
    return
  }

  loading.value = true
  getDashboardDataStudent(params.value)
    .then(({ data }) => {
      dashboardData.value.progress = calcPercent(data.activitiesPlayed, data.totalActivities)
      dashboardData.value.performance = data.performance
      dashboardData.value.totalTime = data.totalTime

      dashboardData.value.activitiesPlayed = data.activitiesPlayed
      dashboardData.value.totalActivities = data.totalActivities

      dashboardData.value.chart = generateChartData(data.knowledgeAxis)
    })
    .catch(() => {
      dashboardData.value = setDefaultData()
      loading.value = false
    })
    .finally(() => {
      loading.value = false
    })
}

const handleNoActivitiesAvailable = hasActivities => {
  hasActivitiesAvailable.value = hasActivities
  loading.value = false
}

watch([params, student], () => {
  fetchData()
})
</script>

<style lang="scss">
  .ProgressBarHorizontalsufix {
    top: -18px;
  }
</style>