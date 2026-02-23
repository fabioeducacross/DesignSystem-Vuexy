<template>
  <section>
    <Header />
    <Filters />
    <CardInfo />
    <Cards />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
  import CardInfo from './CardInfo.vue'
  import Cards from './Cards.vue'
  import Filters from './Filters.vue'
  import Header from './Header.vue'
  import List from './List.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
  import { progressLegend } from '@/consts/progressPerformanceEnum.js'
  import store from '@/store'
  import moduleMissionsPlusReportAdminMissionsOverview from '@/store/pageModules/reports/missions-plus-admin/module-missions-plus-report-admin-missions-overview.js'
  import { onUnmounted } from 'vue'

  const moduleName = 'moduleMissionsPlusReportAdminMissionsOverview'
  if (!store.hasModule(moduleName)) {
    store.registerModule(moduleName, moduleMissionsPlusReportAdminMissionsOverview)
  }
  onUnmounted(() => {
    if (store.hasModule(moduleName)) {
      store.commit(`${moduleName}/reset`)
      store.unregisterModule(moduleName)
    }
  })

  const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>