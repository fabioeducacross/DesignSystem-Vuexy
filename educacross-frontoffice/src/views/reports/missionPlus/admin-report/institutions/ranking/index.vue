<template>
  <div>
    <b-row>
      <b-col cols="12">
        <Filters />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12"> <List /> </b-col>
    </b-row>
  </div>
</template>

<script setup>
import store from '@/store'
import rankingMissionPlusReport from '@/store/pageModules/missions/ranking-mission-plus-report-module.js'
import Filters from '@/views/reports/missionPlus/admin-report/institutions/ranking/filters.vue'
import List from '@/views/reports/missionPlus/admin-report/institutions/ranking/list.vue'
import { useMissionPlusRanking } from '@/views/reports/missionPlus/admin-report/institutions/ranking/useReportMissionPlusRanking.js'
import { onUnmounted } from 'vue'

const { MODULE_NAME } = useMissionPlusRanking()

if (!store.hasModule(MODULE_NAME)) {
  store.registerModule(MODULE_NAME, rankingMissionPlusReport)
}

onUnmounted(() => {
  store.unregisterModule(MODULE_NAME)
})
</script>