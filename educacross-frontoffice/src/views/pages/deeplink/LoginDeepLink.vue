<template>
  <background-space>
    <NewDeepLink :app-deeplink-params="appDeeplinkParams" :webgl-params="webglParams" />
  </background-space>
</template>

<script setup>
  import BackgroundSpace from '@/components/deeplink/BackgroundSpace.vue'
  import NewDeepLink from '@/components/deeplink/NewDeepLink.vue'

  // Get URL params
  const params = new URLSearchParams(window.location.search)
  const query = [...params].length ? `token?${params.toString()}` : ''
  const webGlquery = params.toString() ? `?${params.toString()}` : ''

  const appDeeplinkParams = query
  const webglParams = webGlquery
</script>