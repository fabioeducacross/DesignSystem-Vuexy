<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import Tab from '@/components/tab/Tab.vue'
import { ETour } from '@/consts/ETour'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import { progressLegend } from '@/consts/legends/progressEnum'
import { createVueTourCompatible } from '@/libs/shepherd/useShepherdTour'
import { getTour, postTour } from '@/services/shared/tour/tour.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import moduleEducationSystemBooks from '@/store/pageModules/educationSystem/module-education-system-books'
import EducationSystemBooksFilter from '@/views/pages/teacher-context/educationSystem/books/Filter.vue'
import EducationSystemBooksList from '@/views/pages/teacher-context/educationSystem/books/List.vue'
import {useEducationSystemBooks} from '@/views/pages/teacher-context/educationSystem/books/useEducationSystemBooks'
import { getCurrentInstance, onUnmounted, ref, watch } from 'vue'

// Get Vue instance proxy (for global event bus, $tours, etc.)
const vm = getCurrentInstance().proxy
const { moduleName, educationSystemName } = useEducationSystemBooks()
const { book, mission } = useFilters()

const refTourModal = ref(null)
const canStartTour = ref(false)
const isFetchingTour = ref(true)
const neverShowTourAgain = ref(false)

if (!store.hasModule(moduleName)) {
  store.registerModule(moduleName, moduleEducationSystemBooks)
}

onUnmounted(() => {
  if (store.hasModule(moduleName)) {
    store.unregisterModule(moduleName)
  }
})

book.value = { id: null, name: 'Todos os livros' }
mission.value = { id: null, name: 'Todas as missões' }

watch(educationSystemName, () => {
  vm.$bus.emit('setBreadcrumb', [`${educationSystemName.value}`])
  vm.$bus.emit('setEducationSystemTabTitle', `${educationSystemName.value}`)
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

vm.$bus.on('stopBooksTour', () => {
  if (vm.$tours && vm.$tours.booksTour) {
    vm.$tours.booksTour.stop()
    onStopTour()
  }
})

onUnmounted(() => {
  vm.$bus.off('stopBooksTour')
})

fetchTour()
watch(
  () => vm.$route.fullPath,
  () => {
    fetchTour()
  },
)

// Reactive legends array for LegendEnum
const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<template>
  <b-row>
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
    <b-col cols="12">
      <EducationSystemBooksFilter />
    </b-col>
    <b-col cols="12">
      <EducationSystemBooksList @update:books="openTourModal" />
    </b-col>
    <b-col cols="12">
      <LegendEnum :legends="legends" />
    </b-col>
  </b-row>
</template>

<style scoped lang="scss">
  .stars-bg {
    background: url('/assets/stars_bg_356x159.svg') center center no-repeat;
    background-size: auto;
  }
</style>
