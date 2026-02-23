<template>
  <div>
    <b-row>
      <b-col cols="12">
        <RankingMissionsFilter />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <RankingMissionsList />
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
  import store from '@/store'
  import rankingMissionsModule from '@/store/pageModules/missions/ranking-missions-module.js'
  import RankingMissionsFilter from '@/views/pages/missions/missions-list/ranking/RankingMissionsFilter.vue'
  import RankingMissionsList from '@/views/pages/missions/missions-list/ranking/RankingMissionsList.vue'
  import { useMissionRanking } from '@/views/pages/missions/missions-list/ranking/useMissionsRanking'
  import { onUnmounted } from 'vue'

  const { MODULE_NAME } = useMissionRanking()

  if (!store.hasModule(MODULE_NAME)) {
    store.registerModule(MODULE_NAME, rankingMissionsModule)
  }

  onUnmounted(() => {
    store.unregisterModule(MODULE_NAME)
  })
</script>