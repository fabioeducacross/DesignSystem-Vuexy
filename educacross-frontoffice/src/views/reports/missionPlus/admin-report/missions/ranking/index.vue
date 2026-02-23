<template>
  <div>
    <b-row>
      <b-col cols="12">
        <MissionsRankingFilter />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <List />
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import store from '@/store'
import rankingMissionModule from '@/store/pageModules/missions/ranking-mission-module.js'
import MissionsRankingFilter from '@/views/reports/missionPlus/admin-report/missions/ranking/MissionsRankingFilter.vue'
import List from '@/views/reports/missionPlus/admin-report/missions/ranking/list.vue'
import { MODULE_NAME } from '@/views/reports/missionPlus/admin-report/missions/ranking/useMissionsPlusRanking.js'
import { onUnmounted } from 'vue'

if (!store.hasModule(MODULE_NAME)) {
  store.registerModule(MODULE_NAME, rankingMissionModule)
}

onUnmounted(() => {
  if (store.hasModule(MODULE_NAME)) {
    store.unregisterModule(MODULE_NAME)
  }
})
</script>