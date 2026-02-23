<template>
  <section>
    <Title />
    <Filters />
    <CardInfo />
    <EducationSystemAdminDashboard 
      :loading-dashboard="loadingDashboard" 
      :dashboard-data="dashboardData" 
    />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
  import CardInfo from './CardInfo.vue'
  import Filters from './Filters.vue'
  import List from './List.vue'
  import Title from './Title.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
  import { progressLegend } from '@/consts/legends/progressEnum.js'
  import store from '@/store'
  import moduleEducationSystemClasseStudents from '@/store/pageModules/reports/educationSystem/module-education-system-classe-students.js'
  import EducationSystemAdminDashboard from '@/views/pages/admin-context/reports/educationSystem/components/Dashboard.vue'
  import { useEducationSystemStudents } from '@/views/pages/admin-context/reports/educationSystem/studentsTab/students/useEducationSystemStudents.js'
  import { onUnmounted, watch, getCurrentInstance } from 'vue'

  const vm = getCurrentInstance().proxy
  const { moduleName, educationSystemName, loadingDashboard, dashboardData } = useEducationSystemStudents()

  store.registerModule(moduleName, moduleEducationSystemClasseStudents)

  onUnmounted(() => {
    store.commit(`${moduleName}/reset`)
    store.unregisterModule(moduleName)
  })

  watch(educationSystemName, () => {
    vm.$bus.emit('replaceBreadcrumb', [
      {
        text: 'Sistema de Ensino',
        to: { name: 'reportsEducationSystemList' },
      },
      {
        text: educationSystemName.value,
        active: true,
      },
    ])
  })

  const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>