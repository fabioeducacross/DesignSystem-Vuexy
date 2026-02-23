<template>
  <b-card body-class="p-50 p-md-3" class="max-w-screen-md">
    <b-img :src="whiteLabelLogo" class="brand-logo mb-3" />

    <div
      v-if="currentSystemDeepLinkContext"
      class="d-flex flex-col align-items-center justify-content-center gap-5 mt-1"
    >
      <!-- first button -->
      <div>
        <b-media
          :class="`w-full p-2 rounded-t-md cursor-pointer border-primary mb-0`"
          vertical-align="center"
          @click="openApp"
        >
          <template v-slot:aside>
            <div :class="`media-icon-container bg-primary`">
              <span class="material-symbols-outlined text-white media-icon"> sports_esports </span>
            </div>
          </template>
          <h2 :class="`text-primary`">Abrir {{ whiteLabelName }}</h2>
          <span :class="`text-primary`" class="font-medium" style="font-size: 18px">
            Clique aqui se você já tiver o aplicativo instalado no seu computador.
          </span>
        </b-media>
        <div
          :class="`border-primary`"
          class="text-primary d-flex align-items-center gap-1 rounded-b-md p-50"
          style="border-top: none !important"
        >
          <span class="material-symbols-outlined font-bold" style="font-size: 32px"> info </span>

          <small class="font-bold">
            Se você clicar em “Abrir {{ whiteLabelName }}” e não tiver o aplicativo instalado, nada
            acontecerá. Neste caso, recomendamos que baixe o aplicativo ou jogue na web.
          </small>
        </div>
      </div>

      <b-media
        v-if="currentSystemDeepLinkContext.store_deeplink"
        :class="`w-full p-2 rounded-md cursor-pointer bg-primary border-primary`"
        vertical-align="center"
        @click="() => openDeepLink(currentSystemDeepLinkContext.store_deeplink)"
      >
        <template v-slot:aside>
          <div class="media-icon-container bg-white">
            <span :class="`material-symbols-outlined media-icon text-primary`"> download </span>
          </div>
        </template>
        <h2 class="text-white font-medium">{{ $t('Download app') }}</h2>
        <span class="text-white font-medium" style="font-size: 18px">
          {{ $t('For a faster, more complete and fun experience, install our app!') }}
        </span>
      </b-media>

      <b-button block variant="outline-primary" @click="() => openWeb(webglParams)">
        <span class="material-symbols-outlined" style="vertical-align: middle">
          stadia_controller
        </span>
        <span style="vertical-align: middle">
          {{ $t('To play on the web') }}
        </span>
      </b-button>

      <h4 class="text-center">
        {{ $t('select one of the options below to download') }}
      </h4>

      <b-container class="p-0">
        <b-row align-h="around">
          <b-col v-for="(os, indexOs) of systems" :key="indexOs" cols="12" md="3">
            <b-button
              block
              class="d-flex align-items-center justify-content-center gap-2 mb-2"
              variant="primary"
              @click="() => openStore(os)"
            >
              <img :alt="os.name" :src="os.icon" />
              {{ os.name }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div v-else class="">
      <b-img src="@/assets/images/belinha/redirecting.svg" center />
      <p style="line-height: 60px" class="text-primary text-center font-49">
        Você está sendo redirecionado...
      </p>
      <h4 class="mb-50 text-center text-body font-medium">
        Se o jogo não abrir automaticamente clique no botão para seguir:
      </h4>
      <b-button block variant="primary" class="mb-2" @click="() => openWeb(webglParams)">
        <span class="material-symbols-outlined" style="vertical-align: middle">
          stadia_controller
        </span>
        <span style="vertical-align: middle">
          {{ $t('To play on the web') }}
        </span>
      </b-button>
    </div>
    <div class="d-flex w-full justify-content-center mt-1">
      <a
        v-if="commonQuestionsUrl"
        :href="commonQuestionsUrl"
        class="underline font-medium"
        target="_blank"
        >{{ $t('Need help?') }}</a
      >
    </div>
  </b-card>
</template>

<script setup>
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { useDeeplink } from '@/views/pages/deeplink/useDeeplink.js'
import { onMounted } from 'vue'

// Props
const props = defineProps({
  appDeeplinkParams: {
    type: String,
    default: '',
  },
  webglParams: {
    type: String,
    default: '',
  },
})

const { currentSystemDeepLinkContext, systems, openDeepLink, openWeb, openStore } = useDeeplink()

const whiteLabelName = getWhitelabelConfig('Name')
const whiteLabelLogo = getWhitelabelConfig('SecondaryLogo')
const commonQuestionsUrl = getWhitelabelConfig('commonQuestionsLink')

// Methods
const openApp = () => {
  if (
    currentSystemDeepLinkContext &&
    currentSystemDeepLinkContext.app_deeplink
  ) {
    openDeepLink(
      `${currentSystemDeepLinkContext.app_deeplink}${props.appDeeplinkParams}`,
    )
  }
}

onMounted(() => {
  if (currentSystemDeepLinkContext) {
    openApp()
  } else {
    openWeb(props.webglParams)
  }
})
</script>

<style lang="scss" scoped>
.brand-logo {
  width: auto;
  margin: 0 auto;
  max-width: 40%;
  min-width: 150px;
  height: auto;
}

.media-icon-container {
  width: 80px;
  height: 80px;
  @media (max-width: 767px) {
    width: 45px;
    height: 45px;
  }
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  .media-icon {
    font-size: 48px;
    font-weight: 600;
    @media (max-width: 767px) {
      font-size: 20px;
    }
  }
}
</style>