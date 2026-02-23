<template>
  <div>
    <b-row>
      <b-col cols="12">
        <ReportMissionPlusRankingTitle />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12"> <ListTableRanking /> </b-col>
    </b-row>
  </div>
</template>

<script setup>
  import ListTableRanking from '@/components/table/ListTableRanking.vue'
  import store from '@/store'
  import rankingMissionsModule from '@/store/pageModules/missions/ranking-missions-module.js'
  import ReportMissionPlusRankingTitle from '@/views/reports/missionPlus/classe-report/ranking/ReportMissionPlusRankingTitle.vue'
  import { useMissionPlusRanking } from '@/views/reports/missionPlus/classe-report/ranking/useMissionPlusRanking.js'
  import { onMounted } from 'vue'

  const { getRoundsData, getRankingData, MODULE_NAME } = useMissionPlusRanking()

  if (!store.hasModule(MODULE_NAME)) {
    store.registerModule(MODULE_NAME, rankingMissionsModule)
  }

  getRoundsData()

  onMounted(() => {
    getRankingData()
  })
</script>