<template>
  <router-view />
</template>

<script setup>
import store from '@/store'
import ReadingExpeditionModule from '@/store/pageModules/readingExpedition/readingExpeditionModule.js'
import { onUnmounted } from 'vue'

const moduleName = 'ReadingExpeditionModule'
store.registerModule(moduleName, ReadingExpeditionModule)

onUnmounted(() => {
  store.unregisterModule(moduleName)
})
</script>