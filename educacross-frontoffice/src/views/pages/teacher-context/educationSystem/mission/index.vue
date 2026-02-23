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
import moduleEducationSystemMission from '@/store/pageModules/educationSystem/module-education-system-mission.js'
import Cards from '@/views/pages/teacher-context/educationSystem/mission/Cards.vue'
import Filters from '@/views/pages/teacher-context/educationSystem/mission/Filters.vue'
import Rounds from '@/views/pages/teacher-context/educationSystem/mission/Rounds.vue'
import Title from '@/views/pages/teacher-context/educationSystem/mission/Title.vue'
import WeakStrong from '@/views/pages/teacher-context/educationSystem/mission/WeakStrong.vue'
import { useEducationSystemMission } from '@/views/pages/teacher-context/educationSystem/mission/useEducationSystemMission.js'
import { onUnmounted, getCurrentInstance, watch } from 'vue'

const vm = getCurrentInstance().proxy
const { moduleName, educationSystemName, name } = useEducationSystemMission()

store.registerModule(moduleName, moduleEducationSystemMission)

onUnmounted(() => {
  store.commit(`${moduleName}/reset`)
  store.unregisterModule(moduleName)
})

const { book, mission, educationSystemId } = useFilters()
const { bookId, missionId } = router.currentRoute.params

book.value = { id: bookId, name: '' }
mission.value = { id: missionId, name: '' }

watch(name, () => {
  vm.$bus.emit('replaceBreadcrumb', [
    {
      text: `${educationSystemName.value}`,
      to: { name: `EducationSystemModules${educationSystemId.value}` },
    },
    {
      text: book.value.name,
      to: { name: `EducationSystemMissions${educationSystemId.value}` },
    },
    {
      text: name.value,
      active: true,
    },
  ])
})

vm.$bus.emit('setEducationSystemTabTitle', `RELATÓRIO DA MISSÃO`)

const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>