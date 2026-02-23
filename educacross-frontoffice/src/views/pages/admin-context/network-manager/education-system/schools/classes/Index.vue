<template>
  <section>
    <Title />
    <Filters />
    <EducationSystemAdminDashboard />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
  import Filters from './Filters.vue'
  import List from './List.vue'
  import Title from './Title.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
  import { progressLegend } from '@/consts/legends/progressEnum.js'
  import router from '@/router'
  import store from '@/store'
  import moduleEducationSystemClasses from '@/store/pageModules/reports/educationSystem/module-education-system-classes.js'
  import { useEducationSystemClasses } from '@/views/pages/admin-context/network-manager/education-system/schools/classes/useEducationSystemClasses.js'
  import EducationSystemAdminDashboard from '@/views/pages/admin-context/reports/educationSystem/components/Dashboard.vue'
  import { onUnmounted, watch, getCurrentInstance } from 'vue'

  const vm = getCurrentInstance().proxy
  const { moduleName, educationSystemName, institutionName } = useEducationSystemClasses()

  const { routeBack } = router.currentRoute.meta

  store.registerModule(moduleName, moduleEducationSystemClasses)

  onUnmounted(() => {
    store.commit(`${moduleName}/reset`)
    store.unregisterModule(moduleName)
  })

  watch(educationSystemName, () => {
    vm.$bus.emit('replaceBreadcrumb', [
      {
        text: 'Sistema de Ensino',
        to: { name: 'educationSystemNetworkList' },
      },
      {
        text: `${educationSystemName.value}`,
        to: { name: routeBack },
      },
      {
        text: `${institutionName.value}`,
        active: true,
      },
    ])
  })

  const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>