<template>
  <section>
    <Title />
    <Filters />
    <EducationSystemAdminDashboard 
      :loading-dashboard="loadingDashboard" 
      :dashboard-data="dashboardData" 
    />
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
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import moduleEducationSystemMissions from '@/store/pageModules/reports/educationSystem/module-education-system-missions.js'
import { useEducationSystemMissions } from '@/views/pages/admin-context/reports/educationSystem/admin/missions/useEducationSystemMissions.js'
import EducationSystemAdminDashboard from '@/views/pages/admin-context/reports/educationSystem/components/Dashboard.vue'
import { onUnmounted, getCurrentInstance, watch } from 'vue'

const vm = getCurrentInstance().proxy
const { moduleName, bookName, educationSystemName, loadingDashboard, dashboardData } = useEducationSystemMissions()

const { book, mission } = useFilters()
const { bookId } = router.currentRoute.params

book.value = { id: bookId, name: '' }
mission.value = { id: null, name: 'Todas as missões' }

store.registerModule(moduleName, moduleEducationSystemMissions)

onUnmounted(() => {
  store.commit(`${moduleName}/reset`)
  store.unregisterModule(moduleName)
})

watch(bookName, () => {
  vm.$bus.emit('replaceBreadcrumb', [
    {
      text: 'Sistema de Ensino',
      to: { name: 'reportsEducationSystemList' },
    },
    {
      text: `${educationSystemName.value}`,
      to: { name: `educationSystemReportBooksList` },
    },
    {
      text: bookName.value,
      plural: true,
      active: true,
    },
  ])
})

const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>