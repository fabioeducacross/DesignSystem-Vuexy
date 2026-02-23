<script setup>
import store from '@/store'
import EducacrossMissionsModule from '@/store/pageModules/missions/educacross-missions-module.js'
import EducacrossMissionFilter from '@/views/pages/teacher-context/records/missions/educacrossMission/EducacrossMissionFilter.vue'
import EducacrossMissionList from '@/views/pages/teacher-context/records/missions/educacrossMission/EducacrossMissionList.vue'
import { onUnmounted } from 'vue'

store.registerModule('EducacrossMissionsModule', EducacrossMissionsModule)

onUnmounted(() => {
  store.unregisterModule('EducacrossMissionsModule')
})
</script>

<template>
  <b-row>
    <b-col cols="12">
      <EducacrossMissionFilter />
    </b-col>
    <b-col cols="12">
      <EducacrossMissionList />
    </b-col>
  </b-row>
</template>