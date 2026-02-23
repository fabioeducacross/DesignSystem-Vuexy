<template>
  <router-view></router-view>
</template>

<script setup>
import useDashboardStudents from './useDashboardStudents.js'
import store from '@/store'
import moduleDashboardStudents from '@/store/pageModules/dashboard/module-dashboard-students.js'
import { onUnmounted } from 'vue'

const { module_name } = useDashboardStudents()

if (!store.hasModule(module_name)) {
  store.registerModule(module_name, moduleDashboardStudents)
}

onUnmounted(() => {
  if (store.hasModule(module_name)) {
    store.unregisterModule(module_name)
  }
})
</script>