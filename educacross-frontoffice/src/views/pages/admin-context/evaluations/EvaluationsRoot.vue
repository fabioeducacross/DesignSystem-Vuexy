<template>
  <router-view />
</template>

<script setup>
import store from '@/store'
import evaluationModule from '@/store/evaluation/index.js'
import { onUnmounted } from 'vue'

store.dispatch('filters/reset')

if (!store.hasModule('evaluations')) {
  store.registerModule('evaluations', evaluationModule)
}

onUnmounted(() => {
  if (store.hasModule('evaluations')) {
    store.unregisterModule('evaluations')
  }
})
</script>