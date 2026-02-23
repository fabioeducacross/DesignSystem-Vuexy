<template>
  <section>
    <Header v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" />
    <Filters />
    <Cards />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
  import Cards from './Cards.vue'
  import Filters from './Filters.vue'
  import Header from './Header.vue'
  import List from './List.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import { progressLegend } from '@/consts/progressPerformanceEnum.js'
  import store from '@/store'
  import moduleMissionsPlusReportAdminClassesOverview from '@/store/pageModules/reports/missions-plus-admin/module-missions-plus-report-admin-classes-overview.js'
  import { onUnmounted } from 'vue'

  const moduleName = 'moduleMissionsPlusReportAdminClassesOverview'
  if (!store.hasModule(moduleName)) {
    store.registerModule(moduleName, moduleMissionsPlusReportAdminClassesOverview)
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