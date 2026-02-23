<template>
  <iframe
    id="webglIframe"
    :src="urlWebgl"
    style="border: 0px #000000 none; width: 100%; height: 100vh"
    scrolling="no"
    frameborder="1"
    allow="camera; microphone"
  ></iframe>
</template>

<script setup>
  import router from '@/router'
  import { urlString, uuidv4 } from '@/utils/utils'

  const urlWebgl = `${import.meta.env.VITE_APP_BLOB}lite/jogar/index.html?v=${uuidv4()}&${urlString(router.currentRoute.query)}`
</script>