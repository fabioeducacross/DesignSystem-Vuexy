<template>
  <b-overlay :show="loading" opacity="1" rounded="md">
    <h1 class="text-primary text-center mb-2">{{ guide.name }}</h1>
    <div class="d-flex justify-content-center mb-2">
      <b-badge variant="light-primary" pill class="d-flex align-items-center gap-1">
        <img :src="customPlusIcon" alt="Missão Plus" />
        Missão Plus
      </b-badge>
    </div>

    <b-row class="match-height">
      <b-col cols="12" lg="6">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Turma:</div>
          <p class="text-primary m-0 font-weight-bold">{{ arrayToString(guide.classes) }}</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Duração:</div>
          <p class="text-primary m-0 font-weight-bold">
            {{ formattedDate(guide.startTime) }} a {{ formattedDate(guide.expirationTime) }}
          </p>
        </b-card>
      </b-col>
      <b-col cols="12">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Alunos:</div>
          <p class="text-primary m-0 font-weight-bold">
            {{ studentsInfo }}
          </p>
        </b-card>
      </b-col>

      <b-col cols="12">
        <div class="cards-round-slide my-2" :class="{'no-arrows': !showNavigation}">
          <div class="swiper-container" ref="swiperContainer">
            <div class="swiper-wrapper">
              <div
                v-for="(item, index) in guide.rounds"
                :key="index"
                class="swiper-slide"
                style="width: 125px"
              >
                <div class="d-flex flex-column align-items-center h-100 mx-auto">
                  <h6 class="text-center uppercase text-body">Turno {{ item.round }}</h6>
                  <b-card
                    body-class="p-75"
                    border-variant="primary"
                    bg-variant="transparent"
                    class="shadow-none flex-grow-1 w-100"
                  >
                    <b-img-lazy
                      :src="item.imageUrl ? item.imageUrl : SubjectEnum[subject.id].image"
                      :alt="item.thematicName"
                      width="100"
                      height="100"
                      class="mb-75 mx-auto"
                    />

                    <b-card-text class="text-center text-body text-wrap">
                      {{ item.thematicName }}
                    </b-card-text>
                  </b-card>
                </div>
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import customPlusIcon from '@/assets/images/teacher-context/new-mission/customplus-icon.svg'
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { EGuideSituation } from '@/consts/missionsEnum.js'
import { arrayToString, formattedDate } from '@/filters/filters.js'
import {
  getAutenticateGuide,
  getGuidePlusDetails,
} from '@/services/teacher-context/guides/Guides.Service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ActivityIcon from '@/views/pages/teacher-context/shared/components/ActivityIcon.vue'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { $themeBreakpoints } from '@themeConfig'
import debounce from 'lodash/debounce'

const props = defineProps({
  guideId: { type: Number, required: true },
})

const loading = ref(true)
const guide = ref({})
const swiperContainer = ref(null)
const showNavigation = ref(true)
let swiperInstance = null

const { classe, subject } = useFilters()

import store from '@/store'
import router from '@/router'

const getMissionDetails = async () => {
  if (!props.guideId) return
  loading.value = true
  try {
    const { data } = await getGuidePlusDetails(props.guideId)
    guide.value = data
    configureSlide()
  } catch (error) {
    const { errors } = error.response.data
    let errorsArray
    if (window.$utilTeacherService && typeof window.$utilTeacherService.handleFormatErrors === 'function') {
      errorsArray = window.$utilTeacherService.handleFormatErrors(errors)
    } else {
      errorsArray = { message: Array.isArray(errors) ? errors : [String(errors)] }
    }
    errorsArray.message.forEach(elementError => {
      if (window.$toast) {
        window.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      }
    })
  } finally {
    loading.value = false
  }
}

getMissionDetails()

const studentsInfo = computed(() => {
  if (!guide.value.students && !guide.value.classes?.length) return ''
  if (
    guide.value.classes &&
    (guide.value.classes?.length > 1 || !guide.value.students?.length)
  )
    return 'Todos os alunos'

  return arrayToString(guide.value.students)
})

const loadingButton = ref(false)
const playGuide = () => {
  loadingButton.value = true

  getAutenticateGuide(props.guideId, classe.value.ClassId)
    .then(({ data }) => {
      if (data.guideLinkUrl) {
        window.open(import.meta.env.VITE_APP_DEEPLINK_URL + data.guideLinkUrl, '_blank')
      }
    })
    .catch(error => {
      const { errors } = error.response.data
      let errorsArray
      if (window.$utilTeacherService && typeof window.$utilTeacherService.handleFormatErrors === 'function') {
        errorsArray = window.$utilTeacherService.handleFormatErrors(errors)
      } else {
        errorsArray = { message: Array.isArray(errors) ? errors : [String(errors)] }
      }
      errorsArray.message.forEach(elementError => {
        if (window.$toast) {
          window.$toast({
            component: Toast,
            props: {
              title: 'Atenção',
              icon: 'AlertTriangleIcon',
              text: elementError,
              variant: 'danger',
            },
          })
        }
      })
    })
    .finally(() => {
      loadingButton.value = false
    })
}

const GET_NAME = getWhitelabelConfig('Name')

const configureSlide = () => {
  initSwiper()
}
const initSwiper = () => {
  if (!swiperContainer.value || !guide.value.rounds?.length) return

  let perPage = 4
  if (window.innerWidth <= $themeBreakpoints.sm) {
    perPage = 1
  } else if (window.innerWidth <= $themeBreakpoints.md) {
    perPage = 2
  } else if (window.innerWidth <= $themeBreakpoints.xl) {
    perPage = 3
  }

  showNavigation.value = perPage < guide.value.rounds.length

  if (swiperInstance) {
    swiperInstance.destroy(true, true)
  }

  swiperInstance = new Swiper(swiperContainer.value, {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 24,
    navigation: showNavigation.value
      ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      : false,
    allowTouchMove: showNavigation.value,
    centeredSlides: !showNavigation.value,
  })
}

const handleResize = debounce(() => {
  initSwiper()
}, 200)

window.addEventListener('resize', handleResize, { passive: true })

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
  }
})
</script>

<style lang="scss" scoped>
.title {
  color: #5e5873;
}
.mission-visualization-container {
  max-width: 480px;
}
</style>

<style lang="scss">
@import '@/assets/scss/variables/_variables.scss';

.cards-round-slide {
  .swiper-container {
    border-radius: 0.5rem;
    padding: 0 50px;
  }

  &.no-arrows .swiper-container {
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background: #fff;
    opacity: 1;
    box-shadow: none;
    color: var(--primary);
    border-radius: 0;
    width: 40px;
    height: 100%;

    &::after {
      color: var(--primary);
    }
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
  }
}
</style>