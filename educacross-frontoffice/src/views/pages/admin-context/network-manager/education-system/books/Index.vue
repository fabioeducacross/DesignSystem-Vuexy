<template>
  <div>
    <b-modal
      ref="refTourModal"
      centered
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
      body-class="p-0 py-1"
      @close="onCloseModal"
    >
      <div class="w-100 stars-bg mb-1">
        <b-img src="@/assets/images/tours/belinha.svg" center></b-img>
      </div>

      <div class="text-center px-1">
        <h6 class="text-primary font-bold">
          Vamos começar seu tour pelo novo fluxo de Sistema de Ensino!
        </h6>
        <p class="font-12">
          Nossa área de mapeamento está de cara nova, que tal conhecer as principais mudanças?
        </p>

        <b-button variant="primary" class="mb-1" @click="startTour">Começar</b-button>

        <div class="text-left d-flex justify-content-center">
          <b-form-checkbox v-model="neverShowTourAgain" :value="true" :unchecked-value="false">
            Não exibir novamente.
          </b-form-checkbox>
        </div>
      </div>
    </b-modal>
    <GeralBooksFilters :loading="loading" @filters="v => (params = v)" />
    <EducationSystemAdminDashboard :only-in-progress="params.OnlyInProgress" />
    <GeralBooksList
      :data-table="dataTable"
      :loading="loadingData"
      :params="params"
      :education-system-name="educationSystemName"
      :institution-name="institutionName"
    />
    <LegendEnum :legends="legends" />
  </div>
</template>

<script setup>
import GeralBooksFilters from './Filter.vue'
import GeralBooksList from './List.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { ETour } from '@/consts/ETour'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import { progressLegend } from '@/consts/legends/progressEnum.js'
import { createVueTourCompatible } from '@/libs/shepherd/useShepherdTour'
import router from '@/router'
import { getTour, postTour } from '@/services/shared/tour/tour.service'
import { getEducationSystemBooks } from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import EducationSystemAdminDashboard from '@/views/pages/admin-context/reports/educationSystem/components/Dashboard.vue'
import { useEducationSystemAdminDashboard } from '@/views/pages/admin-context/reports/educationSystem/components/useEducationSystemAdminDashboard'
import { getCurrentInstance, ref, watch, computed } from 'vue'

const vm = getCurrentInstance().proxy

const { subject } = useFilters()
const { fetchDashboardData } = useEducationSystemAdminDashboard()

const loading = ref(true)
const loadingData = ref(true)

const dashboard = ref({})
const dataTable = ref([])

const refTourModal = ref(null)
const canStartTour = ref(false)
const isFetchingTour = ref(true)
const neverShowTourAgain = ref(false)

const educationSystemId = router.currentRoute.params.educationSystemId
const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const params = ref({
  SerieId: null,
  ClassId: null,
  OnlyInProgress: false,
})

const educationSystemName = ref('')
const institutionName = store.state.access.userData.InstitutionName

const fetchData = () => {
  if (!subject.value.id) {
    loadingData.value = false
    loading.value = false
    return
  }
  loadingData.value = true
  getEducationSystemBooks({
    ...params.value,
    EducationSystemId: educationSystemId,
    SubjectId: subject.value.id,
  })
    .then(({ data }) => {
      dataTable.value = data.books
      educationSystemName.value = data.educationSystemName
      if (isNetworkManager) {
        vm.$bus.emit('setBreadcrumb', [
          '',
          '',
          data.educationSystemName,
          data.institutionName,
        ])
        vm.$bus.emit('setTabTitle', data.institutionName)
      } else {
        vm.$bus.emit('setBreadcrumb', ['', data.educationSystemName])
        vm.$bus.emit('setTabTitle', institutionName)
      }

      openTourModal(dataTable.value)
    })
    .finally(() => {
      loading.value = false
      loadingData.value = false
    })
}

const subjectId = computed(() => subject.value.id)

watch([params, subjectId], () => {
  fetchDashboardData({
    SubjectId: subject.value.id,
    EducationSystemId: educationSystemId,
    ...params.value,
  })
  fetchData()
})

watch(educationSystemName, () => {
  vm.$bus.emit('replaceBreadcrumb', [
    {
      text: 'Sistema de Ensino',
      to: { name: 'educationSystemNetworkList' },
    },
    {
      text: `${educationSystemName.value}`,
      active: true,
    },
  ])
})

const steps = [
  {
    target: '.education-system-card',
    params: {
      highlight: true,
    },
    header: {
      title: 'Livros',
    },
    content: `Os livros ou trilhas, agora estão dispostos em cards e você poderá conferir o progresso e o rendimento de cada um deles de forma rápida.`,
  },
  {
    target: '.education-system-card',
    params: {
      highlight: true,
    },
    header: {
      title: 'Missões',
    },
    content: `Clique na imagem do card ou no botão para conferir as missões pertencentes a este livro. `,
  },
]

// Initialize Shepherd tour with vue-tour compatible API
createVueTourCompatible(vm, 'booksTour', steps)

const openTourModal = async totalData => {
  if (totalData === 0) return
  if (!canStartTour.value) return

  if (isFetchingTour.value) {
    const unWatch = watch(isFetchingTour, value => {
      if (!value) {
        unWatch()
        openTourModal(totalData)
      }
    })
    return
  }

  refTourModal.value.show()
}

const startTour = () => {
  refTourModal.value.hide()
  vm.$tours.booksTour.start()
}

const onCloseModal = () => {
  submitTourShowAgain()
}

const onStopTour = () => {
  submitTourShowAgain()
}

const submitTourShowAgain = async () => {
  if (!neverShowTourAgain.value) return

  await postTour(ETour.educationSystem)

  if (refTourModal.value) refTourModal.value.hide()
}

const fetchTour = async () => {
  const { data } = await getTour(ETour.educationSystem)
  canStartTour.value = !data

  isFetchingTour.value = false
}

fetchTour()
watch(
  () => vm.$route.fullPath,
  () => {
    fetchTour()
  },
)

if (subject.value.id) {
  fetchDashboardData({
    SubjectId: subject.value.id,
    EducationSystemId: educationSystemId,
    ...params.value,
  })
  fetchData()
}

const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style scoped lang="scss">
  .stars-bg {
    background: url('/assets/stars_bg_356x159.svg') center center no-repeat;
    background-size: auto;
  }
</style>
