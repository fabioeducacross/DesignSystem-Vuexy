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
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import moduleEducationSystemMissionPlus from '@/store/pageModules/educationSystem/module-education-system-mission-plus.js'
import Cards from '@/views/pages/teacher-context/educationSystem/missionplus/Cards.vue'
import Filters from '@/views/pages/teacher-context/educationSystem/missionplus/Filters.vue'
import Rounds from '@/views/pages/teacher-context/educationSystem/missionplus/Rounds.vue'
import Title from '@/views/pages/teacher-context/educationSystem/missionplus/Title.vue'
import WeakStrong from '@/views/pages/teacher-context/educationSystem/missionplus/WeakStrong.vue'
import { useEducationSystemMissionPlus } from '@/views/pages/teacher-context/educationSystem/missionplus/useEducationSystemMissionPlus.js'
import { onUnmounted, getCurrentInstance, watch } from 'vue'
import { useRoute } from 'vue-router/composables'

const vm = getCurrentInstance().proxy
const { moduleName, educationSystemName, name } = useEducationSystemMissionPlus()

store.registerModule(moduleName, moduleEducationSystemMissionPlus)

onUnmounted(() => {
  store.commit(`${moduleName}/reset`)
  store.unregisterModule(moduleName)
})

const { book, mission, educationSystemId } = useFilters()

const route = useRoute()
const { bookId, missionId } = route.params

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