<template>
  <router-view />
</template>

<script setup>
import readingMeterEvaluationModule from '../../../store/pageModules/readingMeterEvaluation/readingMeterEvaluationModule'
import store from '@/store'
import { onUnmounted } from 'vue'

const moduleName = 'ReadingMeterEvaluationModule'
store.registerModule(moduleName, readingMeterEvaluationModule)

onUnmounted(() => {
  store.unregisterModule(moduleName)
})
</script>