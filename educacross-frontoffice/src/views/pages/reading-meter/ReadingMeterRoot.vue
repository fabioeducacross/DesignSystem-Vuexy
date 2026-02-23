<template>
  <router-view />
</template>

<script setup>
import readingMeterModule from '../../../store/pageModules/readingMeter/readingMeterModule'
import store from '@/store'
import { onUnmounted } from 'vue'

const moduleName = 'ReadingMeterModule'
store.registerModule(moduleName, readingMeterModule)

onUnmounted(() => {
  store.unregisterModule(moduleName)
})
</script>