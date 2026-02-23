<template>
  <section>
    <SchoolsPerformanceFilter />
    <SchoolsPerformanceDashboard />
    <SchoolsPerformanceList />
    <LegendEnum :legends="legend" />
  </section>
</template>

<script setup>
  import SchoolsPerformanceDashboard from './SchoolsPerformanceDashboard.vue'
  import SchoolsPerformanceFilter from './SchoolsPerformanceFilter.vue'
  import SchoolsPerformanceList from './SchoolsPerformanceList.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { learningPerformanceLegend } from '@/consts/legends/performanceEnum.js'
  import store from '@/store'
  import moduleDashboardSchoolsPerformance from '@/store/pageModules/dashboard/module-dashboard-schools-performance.js'
  import { onUnmounted } from 'vue'

  if (!store.hasModule('moduleDashboardSchoolsPerformance')) {
    store.registerModule('moduleDashboardSchoolsPerformance', moduleDashboardSchoolsPerformance)
  }

  onUnmounted(() => {
    if (store.hasModule('moduleDashboardSchoolsPerformance')) {
      store.commit('moduleDashboardSchoolsPerformance/reset')
      store.unregisterModule('moduleDashboardSchoolsPerformance')
    }
  })

  const legend = [learningPerformanceLegend]
</script>

<style lang="scss" scoped></style>