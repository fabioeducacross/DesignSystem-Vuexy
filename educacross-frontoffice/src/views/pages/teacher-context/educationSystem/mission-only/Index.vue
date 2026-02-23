<template>
  <section>
    <Title />
    <Cards />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
  import Cards from './Cards.vue'
  import List from './List.vue'
  import Title from './Title.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
  import { progressLegend } from '@/consts/legends/progressEnum.js'
  import store from '@/store'
  import moduleEducationSystemOnlyMission from '@/store/pageModules/educationSystem/module-education-system-mission-only.js'
  import { useEducationSystemOnlyMission } from '@/views/pages/teacher-context/educationSystem/mission-only/useEducationSystemOnlyMission.js'
  import { onUnmounted, watch, getCurrentInstance } from 'vue'

  const vm = getCurrentInstance().proxy
  const { moduleName, educationSystemName } = useEducationSystemOnlyMission()

  store.registerModule(moduleName, moduleEducationSystemOnlyMission)

  onUnmounted(() => {
    store.commit(`${moduleName}/reset`)
    store.unregisterModule(moduleName)
  })

  watch(educationSystemName, () => {
    vm.$bus.emit('replaceBreadcrumb', [
      {
        text: `${educationSystemName.value}`,
        active: true,
      },
    ])
    vm.$bus.emit('setEducationSystemTabTitle', `${educationSystemName.value}`)
  })

  const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>