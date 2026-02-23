<template>
  <div>
    <b-row>
      <b-col cols="12">
        <MissionPlusRankingFilter />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12"> <MissionPlusRankingLIst /> </b-col>
    </b-row>
  </div>
</template>

<script setup>
  import store from '@/store'
  import rankingMissionsModule from '@/store/pageModules/missions/ranking-missions-module.js'
  import MissionPlusRankingFilter from '@/views/reports/missionPlus/admin-report/classes/ranking/missionPlusRankingFilter.vue'
  import MissionPlusRankingLIst from '@/views/reports/missionPlus/admin-report/classes/ranking/missionPlusRankingList.vue'
  import { useMissionPlusRanking } from '@/views/reports/missionPlus/admin-report/classes/ranking/useMissionPlusRanking.js'
  import { onUnmounted } from 'vue'

  const { MODULE_NAME } = useMissionPlusRanking()

  if (!store.hasModule(MODULE_NAME)) {
    store.registerModule(MODULE_NAME, rankingMissionsModule)
  }

  onUnmounted(() => {
    store.unregisterModule(MODULE_NAME)
  })
</script>