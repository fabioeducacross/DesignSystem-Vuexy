<template>
  <router-view />
</template>

<script setup>
import readingMeterV2Module from '../../../store/pageModules/readingMeter/readingMeterV2Module'
import { useReadingMeterV2 } from './overview/useReadingMeterV2'
import store from '@/store'
import { onMounted, onUnmounted } from 'vue'

const moduleName = 'ReadingMeterV2Module'

if (!store.hasModule(moduleName)) {
  store.registerModule(moduleName, readingMeterV2Module)
}

const { isTeacher, stopWatch } = useReadingMeterV2()

onMounted(() => {
  isTeacher.value = store.getters.accessRole === 'Teacher'
})

onUnmounted(() => {
  if (stopWatch) {
    stopWatch()
  }
})
</script>