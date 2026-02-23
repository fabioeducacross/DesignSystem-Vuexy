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
  import moduleEducationSystemMission from '@/store/pageModules/reports/educationSystem/module-education-system-mission.js'
  import Cards from '@/views/pages/admin-context/reports/educationSystem/admin/mission/Cards.vue'
  import Filters from '@/views/pages/admin-context/reports/educationSystem/admin/mission/Filters.vue'
  import Rounds from '@/views/pages/admin-context/reports/educationSystem/admin/mission/Rounds.vue'
  import Title from '@/views/pages/admin-context/reports/educationSystem/admin/mission/Title.vue'
  import WeakStrong from '@/views/pages/admin-context/reports/educationSystem/admin/mission/WeakStrong.vue'
  import { useEducationSystemMission } from '@/views/pages/admin-context/reports/educationSystem/admin/mission/useEducationSystemMission.js'
  import { onUnmounted, getCurrentInstance, watch } from 'vue'

  const vm = getCurrentInstance().proxy
  const { moduleName, educationSystemName, name } = useEducationSystemMission()

  store.registerModule(moduleName, moduleEducationSystemMission)

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