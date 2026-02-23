<template>
  <div class="d-flex bg-login-error justify-content-center align-items-center min-vh-100 w-100">
    <div
      class="login-error-container d-flex flex-column justify-content-center align-items-center w-100 mx-auto p-5 py-lg-8"
    >
      <b-img
        src="@/assets/images/pages/login/Belinha.svg"
        class="img-belinha d-none d-lg-block animated-wiggle"
        style="--wiggle-duration: 50s"
      />
      <b-img
        src="@/assets/images/pages/login/Eugenio.svg"
        class="img-eugenio d-none d-lg-block animated-wiggle"
        style="--wiggle-duration: 80s"
      />
      <LogoLogin />
      <h2 class="text-feedback my-3" v-html="error" />
      <div class="group-buttons flex-column flex-lg-row gap-4">
        <b-button
          v-if="getGoto && getGoto !== ''"
          class="px-3 d-flex align-items-center gap-3 justify-content-center"
          variant="primary"
          @click="goTo"
        >
          <b-icon icon="arrow-left" />
          Voltar
        </b-button>

        <b-button variant="outline-primary" @click="openChat"> Fale com o suporte </b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import LogoLogin from './components/LogoLogin.vue'
import { BButton, BIcon } from 'bootstrap-vue'
import DOMPurify from 'dompurify'
import { mapGetters } from 'vuex'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
import { emitter } from '@/eventBus'

const route = useRoute()
const router = useRouter()

const getters = mapGetters({
  GET_SUPPORT_URL: 'GET_SUPPORT_URL',
  GET_SUPPORT_WHATSAPP: 'GET_SUPPORT_WHATSAPP',
})

// Access getters as computed
import { computed } from 'vue'
const GET_SUPPORT_URL = computed(() => store.getters.GET_SUPPORT_URL)
const GET_SUPPORT_WHATSAPP = computed(() => store.getters.GET_SUPPORT_WHATSAPP)

const error = computed(() => DOMPurify.sanitize(route.query.error || ''))

const getGoto = computed(() => route.query.goTo)

const openChat = () => {
  emitter.emit('userHelpRequested')
}

const goTo = () => {
  const goto = getGoto.value
  try {
    // eslint-disable-next-line no-new
    new URL(goto)
    window.location.href = goto
  } catch {
    router.push({
      name: goto,
    })
  }
}
</script>

<style scoped lang="scss">
  .img-belinha {
    position: absolute;
    top: 0px;
    right: -245px;

    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -webkit-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }

  .img-eugenio {
    position: absolute;
    bottom: -40px;
    left: -190px;

    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -webkit-transform-origin: 50% 0%;
    -ms-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
  }
  .bg-login-error {
    background-image: url(@/assets/images/pages/loginError/background.svg);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .login-error-container {
    position: relative;
    border-radius: 6px;
    background: #fff;
    max-width: 90%;

    @media (min-width: 768px) {
      max-width: 65%;
    }

    @media (min-width: 1536px) {
      max-width: 1092px;
      min-height: 600px;
    }
  }
  .text-feedback {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px !important;
    color: #6e6b7b;
    max-width: 500px;
    text-align: center;
  }

  .group-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    width: 500px;

    button {
      line-height: 17px;
    }

    .button-error {
      flex: 1;
    }

    @media (max-width: 500px) {
      width: auto;

      button {
        width: 100%;
      }
    }
  }
</style>