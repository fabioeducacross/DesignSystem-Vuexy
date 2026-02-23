<template>
  <section class="cards-slide">
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-skeleton-img no-aspect height="150px" />
      </template>
      <div class="swiper-container" ref="swiperContainer">
        <div class="swiper-wrapper">
          <div v-for="(d, index) in data" :key="index" class="swiper-slide">
            <b-card
              class="position-relative mb-0 w-100 h-100 cursor-pointer"
              :body-class="[`${activeClass(d)} border-2 rounded d-flex flex-column`]"
              @click="selectStage(d)"
            >
              <div class="text-center mb-auto">
                <MediaCardIcon
                  :icon="d.stage === 1 || d.stage === 6 ? 'dictionary' : 'book_5'"
                  :variant="d.variant"
                  class="mb-1"
                />
                <h6 class="font-weight-bolder text-body">{{ d.name }}</h6>
              </div>
              <span class="text-center font-bold d-block text-primary"
                >{{ $filters.formatNumber(d.percent) }}%</span
              >
              <ProgressBarHorizontalV2
                :value="d.students"
                :max="d.totalStudents"
                :show-values="true"
                :get-variant="() => ({ variant: 'primary' })"
              >
                <template v-slot:default>
                  <span class="text-center"
                    ><strong>{{ d.students }}</strong> de {{ d.totalStudents }} alunos</span
                  >
                </template>
              </ProgressBarHorizontalV2>
            </b-card>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </b-skeleton-wrapper>
  </section>
</template>

<script setup>
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { stageIcons } from '@/consts/ReadingExpeditionEnum.js'
import store from '@/store'
import { $themeBreakpoints } from '@themeConfig'
import debounce from 'lodash/debounce'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { computed, onUnmounted, ref, watch } from 'vue'

const loading = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/loadingDashboard'],
)
const data = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/dashboard'],
)

const selectedStage = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/selectedStage'],
)

const selectStage = stage => {
  if (selectedStage.value && stage.stage === selectedStage.value.stage) {
    store.commit('readingExpeditionModuleOverviewStudentDetails/selectedStage', null)
  } else {
    store.commit('readingExpeditionModuleOverviewStudentDetails/selectedStage', stage)
  }
  store.dispatch('readingExpeditionModuleOverviewStudentDetails/fetch')
}

const swiperContainer = ref(null)
let swiperInstance = null

const initSwiper = () => {
  if (!swiperContainer.value || !data.value.length) return

  let perPage = 6

  if (window.innerWidth <= $themeBreakpoints.sm) {
    perPage = 1
  } else if (window.innerWidth < $themeBreakpoints.md) {
    perPage = 2
  } else if (window.innerWidth < $themeBreakpoints.lg) {
    perPage = 3
  }

  const showNavigation = perPage < data.value.length

  if (swiperInstance) {
    swiperInstance.destroy(true, true)
  }

  swiperInstance = new Swiper(swiperContainer.value, {
    modules: [Navigation],
    slidesPerView: perPage,
    spaceBetween: 12, // 0.7rem
    navigation: showNavigation
      ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      : false,
    allowTouchMove: showNavigation,
  })
}

const activeClass = item => {
  if (selectedStage.value) {
    if (item.stage === selectedStage.value.stage) {
      return `border-color-primary`
    }
    return 'opacity-50'
  }
  return ''
}

const handleResize = debounce(() => {
  initSwiper()
}, 200)

addEventListener('resize', handleResize, { passive: true })

onUnmounted(() => {
  removeEventListener('resize', handleResize)
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
  }
})

watch(
  [data],
  () => {
    initSwiper()
  },
  { immediate: true },
)

</script>
<style lang="scss">
  @import '@/assets/scss/variables/_variables.scss';

  .cards-slide {
    .swiper-container {
      border-radius: 0.5rem;
      padding: 0 50px;
    }

    .swiper-button-prev {
      width: 50px;
      height: 100%;

      border-radius: 0.5rem 0 0 0.5rem;
      left: 0;

      background: transparent;
      opacity: 1;
      background: linear-gradient(to left, #e1e1e3 30%, var(--primary) 350%);

      box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);

      color: var(--primary);

      &::after {
        color: var(--primary);
      }
    }

    .swiper-button-next {
      width: 50px;
      height: 100%;

      border-radius: 0 0.5rem 0.5rem 0;
      right: 0;

      background: transparent;
      opacity: 1;
      background: linear-gradient(to right, #e1e1e3 30%, var(--primary) 350%);

      box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);

      color: var(--primary);

      &::after {
        color: var(--primary);
      }
    }
    .border-color-primary {
      border-color: $primary;
    }
  }
</style>