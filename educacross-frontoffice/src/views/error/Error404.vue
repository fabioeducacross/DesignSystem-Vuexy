<template>
  <div class="w-full bg-404">
    <div class="container">
      <div v-if="showMeteorRain" class="meteor-container">
        <img
          v-for="n in 15"
          :key="n"
          :src="meteorSrc"
          class="meteoro"
          :style="generateMeteorStyle(n)"
        />
      </div>
      <b-img
        :src="meteorSrc"
        class="constellation img-meteor d-none d-md-block animated-wiggle"
        style="--wiggle-duration: 80s"
        @click="handleClick"
      />

      <b-img
        :src="marsSrc"
        class="constellation img-mars animated-wiggle"
        style="--wiggle-duration: 30s"
      />

      <b-img
        :src="saturnSrc"
        class="constellation img-saturn animated-wiggle"
        style="--wiggle-duration: 50s"
      />

      <b-img
        :src="stationSrc"
        class="constellation img-station animated-wiggle"
        style="--wiggle-duration: 40s"
      />

      <b-img
        :src="cometSrc"
        class="constellation img-comet animated-wiggle"
        style="--wiggle-duration: 40s"
      />

      <div
        class="flex items-center justify-center min-vh-100 flex-col py-1 px-2 lg:w-3/4 xl:w-1/2 mx-auto text-center z-1 position-relative"
      >
        <ErrorLogoLight />

        <ErrorImage :src="image" alt="Página não encontrada" />

        <ErrorTitle title="Ops, corujinha saiu da órbita programada!" />

        <div class="d-flex flex-column flex-lg-row gap-4">
          <b-button
            variant="outline-light"
            class="d-flex align-items-center gap-3 justify-content-center"
            to="/"
          >
            <b-icon icon="arrow-left" />
            Voltar
          </b-button>

          <b-button variant="primary" @click="openChat"> Fale com o suporte </b-button>
        </div>
      </div>

      <!-- <ErrorContact /> -->
    </div>
  </div>
</template>

<script setup>
import ErrorContact from './components/ErrorContact.vue'
import ErrorImage from './components/ErrorImage.vue'
import ErrorLogoLight from './components/ErrorLogoLight.vue'
import ErrorTitle from './components/ErrorTitle.vue'
import { ref, onUnmounted } from 'vue'
import { emitter } from '@/eventBus'

const image = new URL('@/assets/images/pages/404/404.svg', import.meta.url).href
const meteorSrc = new URL('@/assets/images/pages/404/meteor.svg', import.meta.url).href
const marsSrc = new URL('@/assets/images/pages/404/mars.svg', import.meta.url).href
const saturnSrc = new URL('@/assets/images/pages/404/saturn.svg', import.meta.url).href
const stationSrc = new URL('@/assets/images/pages/404/space-station.svg', import.meta.url).href
const cometSrc = new URL('@/assets/images/pages/404/comet.svg', import.meta.url).href

const clickCount = ref(0)
const showMeteorRain = ref(false)
const resetTimer = ref(null)

const handleClick = () => {
  clickCount.value++

  if (clickCount.value >= 10) {
    startMeteorRain()
    clickCount.value = 0
  }

  if (resetTimer.value) clearTimeout(resetTimer.value)
  resetTimer.value = setTimeout(() => {
    clickCount.value = 0
  }, 3000)
}

const startMeteorRain = () => {
  showMeteorRain.value = true
  setTimeout(() => {
    showMeteorRain.value = false
  }, 5000)
}

const generateMeteorStyle = () => {
  const delay = Math.random() * 3
  const left = Math.random() * 100
  const duration = 2 + Math.random() * 2

  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }
}

const openChat = () => {
  emitter.emit('userHelpRequested')
}

onUnmounted(() => {
  if (resetTimer.value) clearTimeout(resetTimer.value)
})
</script>

<style lang="scss" scoped>
  h1 {
    max-width: 410px;
    font-weight: 400;
    font-size: 28px !important;
    line-height: 34px;
    text-align: center;
    color: #fff;
  }
  .constellation {
    position: absolute;
  }
  .img-comet {
    width: 25px;
    top: 15%;
    right: 40px;

    @media (min-width: 768px) {
      width: initial;
      top: 23%;
      right: 80px;
    }
  }
  .img-mars {
    width: 50px;
    bottom: 70px;
    right: 0px;

    @media (min-width: 768px) {
      width: initial;
      top: 55%;
      right: 4%;
    }
  }
  .img-station {
    bottom: 50px;
    left: 0px;

    @media (min-width: 768px) {
      top: 50%;
      left: 80px;

      @media (min-width: 1200px) {
        left: 250px;
      }
    }
  }
  .img-saturn {
    top: 10%;
    left: 50%;
    transform: translateX(-50%);

    @media (min-width: 768px) {
      top: 23%;
      left: 80px;
    }

    @media (min-width: 1200px) {
      left: 300px;
    }
  }
  .img-meteor {
    bottom: 3%;
    left: 80px;

    @media (min-width: 1200px) {
      bottom: 10%;
      left: 300px;
    }
  }
  .bg-404 {
    background-image: url(@/assets/images/pages/404/background.svg);
    background-repeat: no-repeat;
    background-size: cover;
    overflow: auto;
  }
  .meteor-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    overflow: hidden;
  }

  .meteoro {
    position: absolute;
    top: -50px;
    width: 40px;
    transform: rotate(70deg);
    height: auto;
    animation-name: fall;
    animation-timing-function: linear;
  }

  @keyframes fall {
    to {
      transform: translateY(120vh) rotate(70deg);
      opacity: 0;
    }
  }
</style>