<template>
  <div>
    <Exhibition />
    <Filters />
    <WeakStrong />
    <RoundsFilter />
    <Rounds />
    <LegendEnum :legends="legends" />
  </div>
</template>

<script setup>
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
  import store from '@/store'
  import ModuleReportMissionPlusContent from '@/store/pageModules/reports/missions-plus-admin/module-missions-plus-report-admin-content.js'
  import Exhibition from '@/views/reports/missionPlus/admin-report/classes/content/Exhibition.vue'
  import Filters from '@/views/reports/missionPlus/admin-report/classes/content/Filters.vue'
  import Rounds from '@/views/reports/missionPlus/admin-report/classes/content/Rounds.vue'
  import RoundsFilter from '@/views/reports/missionPlus/admin-report/classes/content/RoundsFilter.vue'
  import WeakStrong from '@/views/reports/missionPlus/admin-report/classes/content/WeakStrong.vue'
  import { useReportMissionPlusContent } from '@/views/reports/missionPlus/admin-report/classes/content/useReportMissionPlusContent.js'
  import { onUnmounted } from 'vue'

  const { module_name } = useReportMissionPlusContent()
  store.registerModule(module_name, ModuleReportMissionPlusContent)

  onUnmounted(() => {
    store.commit(`${module_name}/reset`)
    store.unregisterModule(module_name)
  })

  const legends = [accuracyPerformanceLegend]
</script>