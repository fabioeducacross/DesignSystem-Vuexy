<template>
  <div>
    <b-row>
      <b-col cols="12">
        <Title />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12"> <List /> </b-col>
    </b-row>
  </div>
</template>
<script setup>
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import store from '@/store'
  import rankingMissionsModule from '@/store/pageModules/missions/ranking-missions-module.js'
  import List from '@/views/reports/missionPlus/admin-report/mission/ranking/list.vue'
  import Title from '@/views/reports/missionPlus/admin-report/mission/ranking/title.vue'
  import { useMissionPlusRanking } from '@/views/reports/missionPlus/admin-report/mission/ranking/useMissionsPlusClassesRanking.js'
  import { onMounted, getCurrentInstance, watch } from 'vue'

  const { getRoundsData, getRankingData, MODULE_NAME, title } = useMissionPlusRanking()
  const vm = getCurrentInstance().proxy

  if (!store.hasModule(MODULE_NAME)) {
    store.registerModule(MODULE_NAME, rankingMissionsModule)
  }

  onMounted(async () => {
    await getRoundsData()
    await getRankingData()
  })

  watch(title, () => {
    if (vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
      vm.$bus.emit('setBreadcrumb', ['', '', title.value.title])
    } else {
      vm.$bus.emit('setBreadcrumb', ['', '', title.value.className, title.value.title])
    }
  })
</script>