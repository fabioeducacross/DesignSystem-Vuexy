<template>
  <background-space>
    <div class="redirectLogin-container">
      <div class="color-patternTwo">
        <img src="@/assets/images/images-educa/images-feedback/belinha-gear.png" alt="corujinha" />
        <div class="logo-container">
          <img :src="secondaryLogo" alt="logo" />
        </div>
        <div v-if="!props.errors">
          <h3>Aguarde um instante</h3>
          <p class="mt-5">
            Você está sendo redirecionado para a experiência {{ name }}. Pode levar alguns segundos.
          </p>
        </div>
        <div v-else>
          <h3 class="error-text">
            {{ props.errors }}
          </h3>
        </div>
      </div>
    </div>
  </background-space>
</template>

<script setup>
  import BackgroundSpace from '@/components/deeplink/BackgroundSpace.vue'
  import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'

  const props = defineProps({
    errors: { type: String, required: false, default: null },
  })

  const secondaryLogo = getWhitelabelConfig('SecondaryLogo')
  const name = getWhitelabelConfig('Name')
</script>

<style lang="scss">
  .redirectLogin-container {
    background-color: white;
    border-radius: 12px;
    width: 670px;
    height: 652px;
    padding: 2.5rem 6rem;
    .logo-container {
      max-width: 100%;
      img {
        height: 100%;
        max-height: 76px;
        max-width: 100%;
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      height: 100%;
      h3 {
        font-weight: 600;
        font-size: 24px;
        line-height: 28px;
      }
      p {
        font-size: 16px;
        line-height: 19px;
      }
      > img:first-child {
        width: 250px;
        height: 275px;
      }
      img:nth-child(2) {
        width: 256px;
        height: 42px;
      }
      @media (max-width: 400px) {
        img:first-child,
        img:nth-child(2) {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  .error-text {
    color: red;
  }

  @media (max-width: 675px) {
    .redirectLogin-container {
      width: 90%;
    }
  }

  @media (max-width: 575px) {
    .redirectLogin-container {
      margin: 1rem 0;
      width: 85%;
      padding: 2rem;
      div {
        h3 {
          font-size: 20px;
        }
      }
    }
  }
</style>