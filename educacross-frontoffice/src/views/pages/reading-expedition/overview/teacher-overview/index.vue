<template>
  <div>
    <OverviewFilter />
    <OverviewList />
  </div>
</template>

<script setup>
  import OverviewFilter from './TeacherOverviewFilter.vue'
  import OverviewList from './List.vue'
  import store from '@/store'
  import readingExpeditionModuleOverviewTeacher from '@/store/pageModules/readingExpedition/readingExpeditionModuleOverviewTeacher.js'
  import { onUnmounted, getCurrentInstance } from 'vue'

  const moduleName = 'readingExpeditionModuleOverviewTeacher'
  store.registerModule(moduleName, readingExpeditionModuleOverviewTeacher)

  onUnmounted(() => {
    store.unregisterModule(moduleName)
  })

  const vm = getCurrentInstance().proxy
  vm.$bus.emit('setTabTitle', 'VISÃO DA TURMA')
  store.commit('ReadingExpeditionModule/studentName', null)
</script>