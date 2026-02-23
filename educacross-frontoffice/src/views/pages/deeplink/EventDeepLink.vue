<template>
  <background-space>
    <NewDeepLink :webgl-params="webglparams" :app-deeplink-params="appDeeplinkParams" />
  </background-space>
</template>

<script setup>
  import BackgroundSpace from '@/components/deeplink/BackgroundSpace.vue'
  import NewDeepLink from '@/components/deeplink/NewDeepLink.vue'
  import { useRoute } from 'vue-router/composables'
  import { ref } from 'vue'

  const route = useRoute()
  const eventId = route.params.eventId
  const URLparams = new URLSearchParams(window.location.search)
  const params = [...URLparams].length ? `?${URLparams.toString()}` : ''

  const webglparams = ref(`${params ? '&' : '?'}events=${eventId}`)
  const appDeeplinkParams = ref(`events/${eventId}${params}`)
</script>