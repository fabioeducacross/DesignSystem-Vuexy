<script setup>
import store from '@/store'
import archivedMissionsModule from '@/store/pageModules/missions/archived-missions-module.js'
import ArchivedMissionsFilter from '@/views/pages/missions/missions-list/archived/ArchivedMissionsFilter.vue'
import ArchivedMissionsList from '@/views/pages/missions/missions-list/archived/ArchivedMissionsList.vue'
import { onUnmounted } from 'vue'

store.registerModule('archivedMissionsModule', archivedMissionsModule)

onUnmounted(() => {
  store.commit('archivedMissionsModule/reset')
  store.unregisterModule('archivedMissionsModule')
})
</script>

<template>
  <div>
    <b-row>
      <b-col cols="12">
        <ArchivedMissionsFilter />
      </b-col>
      <b-col cols="12">
        <ArchivedMissionsList />
      </b-col>
    </b-row>
  </div>
</template>