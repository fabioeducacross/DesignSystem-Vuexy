<template>
  <section>
    <Filters />
    <Cards />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
  import Cards from './Cards.vue'
  import Filters from './Filters.vue'
  import List from './List.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
  import { progressLegend } from '@/consts/progressPerformanceEnum.js'
  import store from '@/store'
  import moduleMissionsPlusReportAdminInstitutionsOverview from '@/store/pageModules/reports/missions-plus-admin/module-missions-plus-report-admin-institutions-overview.js'
  import { onUnmounted } from 'vue'

  const moduleName = 'moduleMissionsPlusReportAdminInstitutionsOverview'
  if (!store.hasModule(moduleName)) {
    store.registerModule(moduleName, moduleMissionsPlusReportAdminInstitutionsOverview)
  }
  onUnmounted(() => {
    if (store.hasModule(moduleName)) {
      store.unregisterModule(moduleName)
    }
  })

  const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>