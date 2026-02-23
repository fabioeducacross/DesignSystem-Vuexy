<template>
  <div>
    <InclusionMissionsFilter />
    <InclusionMissionsList />
  </div>
</template>

<script setup>
import store from '@/store'
import inclusionMissionsModule from '@/store/pageModules/missions/inclusion-missions-module.js'
import InclusionMissionsFilter from '@/views/pages/teacher-context/records/missions/inclusion/InclusionMissionsFilter.vue'
import InclusionMissionsList from '@/views/pages/teacher-context/records/missions/inclusion/InclusionMissionsList.vue'
import { onUnmounted } from 'vue'

store.registerModule('inclusionMissionsModule', inclusionMissionsModule)

onUnmounted(() => {
  store.unregisterModule('inclusionMissionsModule')
})
</script>