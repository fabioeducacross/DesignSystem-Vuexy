<template>
  <div class="flex justify-center items-center backgroundControl">
    <NewDeepLink :app-deeplink-params="appDeeplinkParams" :webgl-params="webglParams" />
  </div>
</template>

<script setup>
  import NewDeepLink from '@/components/deeplink/NewDeepLink.vue'
  import router from '@/router'
  import { ref } from 'vue'

  const token = router.currentRoute.params.token

  const appDeeplinkParams = ref('')
  const webglParams = ref('')

  const params = new URLSearchParams(window.location.search)
  const query = [...params].length ? `&${params.toString()}` : ''
  appDeeplinkParams.value = `guide/${token}${query}`
  webglParams.value = `?guide=${token}`

  if (params.has('accessToken')) {
    webglParams.value = `${webglParams.value}&${params.toString()}`
  }
</script>

<style lang="scss" scoped>
  .backgroundControl {
    background-image: url('@/assets/images/images-educa/deep-link/owls-background.png');
    background-position: bottom;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%;
    width: 100%;
    background-attachment: fixed;
    min-height: 100vh;
  }

  //remove the background image on mobile
  @media (max-width: 768px) {
    .backgroundControl {
      background-image: none !important;
    }
  }
</style>