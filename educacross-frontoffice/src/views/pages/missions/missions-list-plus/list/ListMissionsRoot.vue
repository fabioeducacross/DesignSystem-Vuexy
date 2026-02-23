<template>
  <div>
    <ListMissionsFilter />
    <ListMissionsList />
  </div>
</template>

<script setup>
import store from '@/store'
import listMissionsModule from '@/store/pageModules/missions/list-missions-plus-module.js'
import ListMissionsFilter from '@/views/pages/missions/missions-list-plus/list/ListMissionsFilter.vue'
import ListMissionsList from '@/views/pages/missions/missions-list-plus/list/ListMissionsList.vue'
import { onUnmounted } from 'vue'

store.registerModule('listMissionsModule', listMissionsModule)

onUnmounted(() => {
  store.commit('listMissionsModule/reset')
  store.unregisterModule('listMissionsModule')
})
</script>