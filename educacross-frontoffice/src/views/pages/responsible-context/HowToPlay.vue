<template>
  <section>
    <div class="d-flex flex-column-reverse flex-md-column align-items-center gap-2 mb-1">
      <div class="w-100" style="max-width: 480px">
        <b-img :src="logo" class="mb-50 belinha-image" fluid-grow center />
      </div>
      <h4 class="font-normal text-body text-center">
        <span class="material-symbols-outlined align-middle font-normal text-primary"
          >browser_updated</span
        >
        <br class="d-md-none" />
        <span class="align-middle"> Baixe o aplicativo do aluno:</span>
      </h4>
    </div>
    <div>
      <b-row align-h="around">
        <b-col v-for="(os, indexOs) of systems" :key="indexOs" cols="12" md="6" lg="3">
          <b-button
            block
            class="d-flex align-items-center justify-content-center gap-2 mb-50"
            variant="primary"
            @click="openStore(os)"
          >
            <img :alt="os.name" :src="os.icon" />
            {{ os.name }}
          </b-button>
        </b-col>
      </b-row>
    </div>

    <hr />

    <h4 class="font-normal text-body text-center">
      <span class="material-symbols-outlined align-middle font-normal text-primary"
        >captive_portal</span
      >
      <br class="d-md-none" />
      <span class="align-middle"> Explore outros ambientes de interação:</span>
    </h4>

    <b-card no-body border-variant="primary" class="shadow-none w-100">
      <b-card-body class="d-flex flex-col justify-content-center align-items-center gap-2">
        <b-img :src="playImage" fluid-grow class="play-card-image" />
        <b-button variant="outline-primary" @click="openWeb('')">
          <span class="material-symbols-outlined align-middle">stadia_controller</span>
          <span class="align-middle"> Jogar no navegador</span>
        </b-button>
      </b-card-body>
    </b-card>
  </section>
</template>

<script setup>
  import { useDeeplink } from '../deeplink/useDeeplink'
  import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'

  const { systems, openStore, openWeb } = useDeeplink()

  const logo = getWhitelabelConfig('MainLogo')
  const playImage = getWhitelabelConfig('images').howToPlay?.play
</script>

<style scoped>
  .play-card-image {
    max-width: 281px;
    max-height: 184px;
  }

  .bg-stars {
    background-image: url('/assets/bg-modal-how-to-play.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  @media screen and (max-width: 768px) {
    .belinha-image {
      max-width: 100px;
    }
  }

  @media screen and (min-width: 768px) {
    .belinha-image {
      max-width: 200px;
    }
  }
</style>

<style></style>