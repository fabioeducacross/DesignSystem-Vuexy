<template>
  <div>
    <b-skeleton-wrapper :loading="loading" class="w-100">
      <template v-slot:loading>
        <b-row align-v="center" class="match-height">
          <b-col v-for="i in 3" :key="i" cols="12" lg="4">
            <b-skeleton type="card" height="350px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
        </b-row>
      </template>
      <div>
        <div class="swiper swiper-container" ref="refSwiperContainer" :class="{ 'no-arrows': !showNavigation }">
          <div class="swiper-wrapper">
            <div v-for="(item, index) in cards" :key="index" class="swiper-slide">
              <div class="d-flex flex-column h-100">
                <b-card class="h-100 d-flex flex-column" :border-variant="item.enabled ? 'primary' : ''">
                  <ApplicationCardContent
                    :data="item"
                    not-applied-message="Esta aplicação não foi realizada nesta turma."
                    :loading="loadingModal"
                    @open-orientation-modal="openOrientationModal(item)"
                  />
                </b-card>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>

        <OrientationModal ref="refOrientationModal" @apply="resetAndfetch" />
      </div>
    </b-skeleton-wrapper>
  </div>
</template>

<script setup>
import { ACTION, PERMISSION } from '@/consts/permissions'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import ApplicationCardContent from '@/views/pages/writing-phases/components/ApplicationCardContent.vue'
import OrientationModal from '@/views/pages/writing-phases/components/OrientationModal.vue'
import { useWritingStagesStudents } from '@/views/pages/writing-phases/students/useWritingStagesStudents.js'
import { can } from '@core/libs/acl/utils'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { $themeBreakpoints } from '@themeConfig'
import { debounce } from 'lodash'
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

const { loading } = useTable()
const { classe } = useFilters()
const { cards, resetAndfetch } = useWritingStagesStudents()

const refOrientationModal = ref(null)
const previewPhase = ref(null)
const orientationDetails = ref({})
const loadingModal = ref(false)
const refSwiperContainer = ref(null)
let swiperInstance = null
const showNavigation = ref(false)

const initSwiper = async () => {
  console.log('Initializing Swiper...', refSwiperContainer.value)
  if (!refSwiperContainer.value || !cards.value || !cards.value.length) return

  await nextTick()

  let perPage = 3
  if (window.innerWidth <= $themeBreakpoints.sm) {
    perPage = 1
  } else if (window.innerWidth < $themeBreakpoints.md) {
    perPage = 2
  } else if (window.innerWidth < $themeBreakpoints.xl) {
    perPage = 2
  }
  showNavigation.value = cards.value.length > perPage

  if (swiperInstance) {
    swiperInstance.destroy(true, true)
  }

  swiperInstance = new Swiper(refSwiperContainer.value, {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 12,
    breakpoints: {
      [$themeBreakpoints.md]: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      [$themeBreakpoints.lg]: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
    },
    navigation: showNavigation.value
      ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      : false,
    allowTouchMove: showNavigation.value,
    observeParents: true,
    observer: true,
    resizeObserver: true,
  })
}

const handleResize = debounce(() => {
  initSwiper()
}, 200)

onUnmounted(() => {
  removeEventListener('resize', handleResize)
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
  }
})

onMounted(() => {
  addEventListener('resize', handleResize, { passive: true })
})

watch(
  [() => cards.value, () => loading.value],
  async ([newCards, newLoading]) => {
    if (!newLoading && newCards && newCards.length) {
      await nextTick()
      await initSwiper()
    }
  },
  { deep: true }
)

const openOrientationModal = async data => {
  if (loadingModal.value) return

  loadingModal.value = true

  await refOrientationModal.value.show({
    writingStagesTestId: data.writingStagesTestId,
    apply: data.apply,
    applicationName: data.applyName,
    classId: classe.value.ClassId,
  })

  loadingModal.value = false
}
</script>

<style lang="scss" scoped>
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--primary);
  }
  
  .swiper-container {
    padding: 0 1rem;
  }

  .swiper-container .swiper-wrapper {
    display: flex;
  }

  .swiper-container .swiper-slide {
    flex: 0 0 auto;
  }

  .swiper-container .swiper-wrapper {
    align-items: stretch;
  }

  .swiper-container .swiper-slide {
    display: flex;
    height: auto;
  }

  .swiper-container .swiper-slide > div {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .swiper-container .card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .no-arrows .swiper-wrapper {
    justify-content: center;
  }
  .no-arrows .swiper-slide {
    width: auto !important;
  }
  .no-arrows .swiper-button-prev,
  .no-arrows .swiper-button-next {
    display: none !important;
  }
</style>