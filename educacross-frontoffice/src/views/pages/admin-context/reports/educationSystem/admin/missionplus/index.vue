<template>
  <div>
    <Title />
    <Filters />
    <Cards />
    <WeakStrong />
    <Rounds />
    <LegendEnum :legends="legends" />
  </div>
</template>

<script setup>
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
  import { progressLegend } from '@/consts/legends/progressEnum.js'
  import router from '@/router'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import moduleEducationSystemMissionPlus from '@/store/pageModules/reports/educationSystem/module-education-system-mission-plus.js'
  import Cards from '@/views/pages/admin-context/reports/educationSystem/admin/missionplus/Cards.vue'
  import Filters from '@/views/pages/admin-context/reports/educationSystem/admin/missionplus/Filters.vue'
  import Rounds from '@/views/pages/admin-context/reports/educationSystem/admin/missionplus/Rounds.vue'
  import Title from '@/views/pages/admin-context/reports/educationSystem/admin/missionplus/Title.vue'
  import WeakStrong from '@/views/pages/admin-context/reports/educationSystem/admin/missionplus/WeakStrong.vue'
  import { useEducationSystemMissionPlus } from '@/views/pages/admin-context/reports/educationSystem/admin/missionplus/useEducationSystemMissionPlus.js'
  import { onUnmounted, getCurrentInstance, watch } from 'vue'

  const vm = getCurrentInstance().proxy
  const { moduleName, educationSystemName, name } = useEducationSystemMissionPlus()

  store.registerModule(moduleName, moduleEducationSystemMissionPlus)

  onUnmounted(() => {
    store.commit(`${moduleName}/reset`)
    store.unregisterModule(moduleName)
  })

  const { book, mission } = useFilters()

  const { bookId, missionId } = router.currentRoute.params

  book.value = { id: bookId, name: '' }
  mission.value = { id: missionId, name: '' }

  watch(name, () => {
    vm.$bus.emit('replaceBreadcrumb', [
      {
        text: 'Sistema de Ensino',
        to: { name: 'reportsEducationSystemList' },
      },
      {
        text: educationSystemName.value,
        to: { name: 'educationSystemReportBooksList' },
      },
      {
        text: book.value.name,
        to: { name: `educationSystemReportMissionsBooks` },
      },
      {
        text: name.value,
        active: true,
      },
    ])
  })

  const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>