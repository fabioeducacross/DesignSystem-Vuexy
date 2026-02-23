<template>
  <section>
    <Title />
    <Filters />
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
  import useFilters from '@/store/filters/useFilters'
  import moduleEducationSystemMissions from '@/store/pageModules/educationSystem/module-education-system-missions.js'
  import { useEducationSystemMissions } from '@/views/pages/teacher-context/educationSystem/missions/useEducationSystemMissions.js'
  import { onUnmounted, getCurrentInstance, watch } from 'vue'

  const vm = getCurrentInstance().proxy
  const { moduleName, bookName, educationSystemName } = useEducationSystemMissions()

  const { book, mission, educationSystemId } = useFilters()

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
        text: `${educationSystemName.value}`,
        to: { name: `EducationSystemModules${educationSystemId.value}` },
      },
      {
        text: bookName.value,
        plural: true,
        active: true,
      },
    ])
    vm.$bus.emit('setEducationSystemTabTitle', `MISSÕES DO LIVRO`)
  })

  const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>