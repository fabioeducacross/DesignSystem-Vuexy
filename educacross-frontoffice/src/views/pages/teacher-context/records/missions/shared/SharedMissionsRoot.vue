<template>
  <div>
    <SharedMissionFilter />
    <SharedMissionsList />
  </div>
</template>

<script setup>
  import store from '@/store'
  import sharedMissionsModule from '@/store/pageModules/missions/shared-missions-module.js'
  import SharedMissionFilter from '@/views/pages/teacher-context/records/missions/shared/SharedMissionsFilter.vue'
  import SharedMissionsList from '@/views/pages/teacher-context/records/missions/shared/SharedMissionsList.vue'
  import { onUnmounted } from 'vue'

  store.registerModule('sharedMissionsModule', sharedMissionsModule)

  onUnmounted(() => {
    store.unregisterModule('sharedMissionsModule')
  })
</script>