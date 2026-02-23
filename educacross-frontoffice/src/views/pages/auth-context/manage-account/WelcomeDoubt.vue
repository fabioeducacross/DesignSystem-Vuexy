<template>
  <div>
    <div ref="refSwiper" class="swiper mb-1">
      <div class="swiper-wrapper">
        <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <b-img-lazy
            v-bind="mainProps"
            :src="slide.desktop"
            :alt="`Image Desktop ${index}`"
            class="d-none d-md-block"
          ></b-img-lazy>
          <b-img-lazy
            v-bind="mainProps"
            :src="slide.mobile"
            :alt="`Image Mobile ${index}`"
            class="d-md-none"
          ></b-img-lazy>
        </div>
      </div>

      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>

    <div v-if="!isActivatedWelcomeDoubtByUser" class="d-flex justify-between align-items-center">
      <b-form-checkbox v-model="dontShowAgain"> Não mostrar novamente </b-form-checkbox>
      <b-button v-if="isTheLastImage" variant="primary" @click="closeWithDontShowAgainData">
        Ok, entendi
      </b-button>
      <b-button v-else variant="primary" @click="nextSlide()"> Próximo </b-button>
    </div>

    <div v-if="isActivatedWelcomeDoubtByUser" class="d-flex justify-between">
      <b-button v-if="isTheLastImage" variant="primary" @click="closeWithDontShowAgainData">
        Ok, entendi
      </b-button>
      <b-button v-else variant="primary" @click="nextSlide()"> Próximo </b-button>
    </div>
  </div>
</template>

<script setup>
import img1Desktop from '@/assets/images/images-educa/manage-account/welcome-doubt/1-welcome-desktop.png'
import img1Mobile from '@/assets/images/images-educa/manage-account/welcome-doubt/1-welcome-mobile.png'
import img2Desktop from '@/assets/images/images-educa/manage-account/welcome-doubt/2-welcome-desktop.png'
import img2Mobile from '@/assets/images/images-educa/manage-account/welcome-doubt/2-welcome-mobile.png'
import img3Desktop from '@/assets/images/images-educa/manage-account/welcome-doubt/3-welcome-desktop.png'
import img3Mobile from '@/assets/images/images-educa/manage-account/welcome-doubt/3-welcome-mobile.png'
import img4Desktop from '@/assets/images/images-educa/manage-account/welcome-doubt/4-welcome-desktop.png'
import img4Mobile from '@/assets/images/images-educa/manage-account/welcome-doubt/4-welcome-mobile.png'
import img5Desktop from '@/assets/images/images-educa/manage-account/welcome-doubt/5-welcome-desktop.png'
import img5Mobile from '@/assets/images/images-educa/manage-account/welcome-doubt/5-welcome-mobile.png'
import img6Desktop from '@/assets/images/images-educa/manage-account/welcome-doubt/6-welcome-desktop.png'
import img6Mobile from '@/assets/images/images-educa/manage-account/welcome-doubt/6-welcome-mobile.png'
import img7Desktop from '@/assets/images/images-educa/manage-account/welcome-doubt/7-welcome-desktop.png'
import img7Mobile from '@/assets/images/images-educa/manage-account/welcome-doubt/7-welcome-mobile.png'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isActivatedWelcomeDoubtByUser: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close-with-dont-show-prompt-welcome'])

const swiper = ref()
const refSwiper = ref(null)
const activeIndex = ref(0)
const dontShowAgain = ref(false)

const slides = [
  { desktop: img1Desktop, mobile: img1Mobile },
  { desktop: img2Desktop, mobile: img2Mobile },
  { desktop: img3Desktop, mobile: img3Mobile },
  { desktop: img4Desktop, mobile: img4Mobile },
  { desktop: img5Desktop, mobile: img5Mobile },
  { desktop: img6Desktop, mobile: img6Mobile },
  { desktop: img7Desktop, mobile: img7Mobile },
]

const mainProps = {
  blank: true,
  blankColor: '#bbb',
}

const isTheLastImage = computed(() => {
  return activeIndex.value + 1 === slides.length
})

const closeWithDontShowAgainData = () => {
  emit('close-with-dont-show-prompt-welcome', dontShowAgain.value)
}

const nextSlide = () => {
  swiper.value.slideTo(activeIndex.value + 1)
}

const swiperEvent = () => {
  const currentIndex = swiper.value.realIndex
  activeIndex.value = currentIndex
}

onMounted(() => {
  swiper.value = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    modules: [Navigation, Pagination],
  })
  swiper.value.on('slideChange', function () {
    swiperEvent()
  })
})

onUnmounted(() => {
  closeWithDontShowAgainData()
})
</script>