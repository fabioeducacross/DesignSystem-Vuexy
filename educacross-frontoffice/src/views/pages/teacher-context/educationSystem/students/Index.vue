<template>
  <section>
    <EducationSystemStudentsTitle />
    <Filters />
    <Cards />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
  import Cards from './Cards.vue'
  import Filters from './Filters.vue'
  import List from './List.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
  import { progressLegend } from '@/consts/legends/progressEnum.js'
  import store from '@/store'
  import moduleEducationSystemStudents from '@/store/pageModules/educationSystem/module-education-system-students.js'
  import EducationSystemStudentsTitle from '@/views/pages/teacher-context/educationSystem/components/Title.vue'
  import { useEducationSystemStudents } from '@/views/pages/teacher-context/educationSystem/students/useEducationSystemStudents.js'
  import { onUnmounted, watch, getCurrentInstance } from 'vue'

  const vm = getCurrentInstance().proxy
  const { moduleName, educationSystemName } = useEducationSystemStudents()

  store.registerModule(moduleName, moduleEducationSystemStudents)

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
    vm.$bus.emit('setEducationSystemTabTitle', `ALUNOS ${educationSystemName.value}`)
  })

  const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<style lang="scss" scoped></style>