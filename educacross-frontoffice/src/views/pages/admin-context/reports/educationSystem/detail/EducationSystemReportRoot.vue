<template>
  <router-view />
</template>

<script setup>
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import moduleEducationSystem from '@/store/pageModules/reports/module-education-system.js'
import { onUnmounted, onMounted } from 'vue'

store.registerModule('educationSystemReportTabsRoot', moduleEducationSystem)

const { moduleId, educationSystemId, fetchSubjectsWithParams } = useFilters()

onUnmounted(() => {
  store.commit('educationSystemReportTabsRoot/reset')
  store.unregisterModule('educationSystemReportTabsRoot')
})

onMounted(() => {
  fetchSubjectsWithParams({
    moduleId: moduleId.value,
    educationSystemId: educationSystemId.value,
  })
})
</script>