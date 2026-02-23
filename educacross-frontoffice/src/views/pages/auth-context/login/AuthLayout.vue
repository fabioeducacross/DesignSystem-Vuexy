<template>
  <section
    class="d-flex align-items-center justify-content-center min-vh-100 bg-auth overflow-hidden"
  >
    <b-container fluid="md">
      <b-card no-body class="auth-container mx-auto my-1 relative">
        <b-card-body class="p-lg-4">
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
          <b-row class="gap-6 lg:gap-12">
            <b-col v-if="$slots.image" cols="12" lg="6" align-self="center" class="logo">
              <slot name="image" />
            </b-col>
            <b-col align-self="center">
              <slot />
              <div class="">
                <slot name="rodape"></slot>
              </div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
      <div class="auth-container mx-auto">
        <b-row align-h="between">
          <b-col cols="12" lg="6" class="text-white">
            <!-- <div class="d-inline-block">
               <SelectLocale :right="false" show-full-name label-class="text-white" />
            </div> -->
          </b-col>

          <b-col cols="12" lg="6">
            <p class="d-flex flex-column align-items-end flex-md-row justify-content-md-end gap-4">
              <b-link
                class="nav-link text-white underline font-weight-bolder p-0"
                target="_blank"
                href="https://educalovers.link/termos-de-uso"
              >
                Termos de uso
              </b-link>
              <b-link
                class="nav-link text-white underline font-weight-bolder p-0"
                target="_blank"
                href="https://educalovers.link/politica-de-privacidade"
              >
                Política de privacidade
              </b-link>
            </p>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<script setup>
import SelectLocale from '@/components/locale/SelectLocale.vue'
</script>

<style lang="scss" scoped>
  .auth-container {
    max-width: 75%;

    @media (max-width: 576px) {
      max-width: 100%;
    }
  }

  .bg-auth {
    background-image: url(@/assets/images/pages/login/background.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: auto;
  }

  .logo img {
    @media (max-width: 768px) {
      max-height: 80px;
    }
  }

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
</style>