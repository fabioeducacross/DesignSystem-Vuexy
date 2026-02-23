<template>
  <section>
    <SchoolsEngagementFilter />
    <SchoolsEngagementDashboard />
    <SchoolsEngagementList />
    <LegendEnum :legends="[colorsLegend]" />
  </section>
</template>

<script setup>
  import SchoolsEngagementDashboard from './SchoolsEngagementDashboard.vue'
  import SchoolsEngagementFilter from './SchoolsEngagementFilter.vue'
  import SchoolsEngagementList from './SchoolsEngagementList.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import store from '@/store'
  import moduleDashboardSchoolsEngagement from '@/store/pageModules/dashboard/module-dashboard-schools-engagement.js'
  import { colorsLegend } from '@/utils/report-education-system/rangeColors.js'
  import {useSchoolEngagement} from '@/views/dashboard/schools/engagement/useSchoolEngagement'
  import { onUnmounted } from 'vue'

  const { module_name } = useSchoolEngagement()

  if (!store.hasModule(module_name)) {
    store.registerModule(module_name, moduleDashboardSchoolsEngagement)
  }

  onUnmounted(() => {
    if (store.hasModule(module_name)) {
      store.commit(`${module_name}/reset`)
      store.unregisterModule(module_name)
    }
  })
</script>

<style lang="scss" scoped></style>