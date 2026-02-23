<template>
  <div>
    <Title />
    <!-- <Exhibition /> -->
    <Filters />
    <WeakStrong />
    <RoundsFilter />
    <Rounds />
    <LegendEnum :legends="legends" />
  </div>
</template>

<script setup>
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
  import router from '@/router'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters.js'
  import ModuleEducationSystemBookReport from '@/store/pageModules/educationSystem/module-education-system-students-book-report.js'
  import Exhibition from '@/views/pages/teacher-context/educationSystem/bookReport/Exhibition.vue'
  import Filters from '@/views/pages/teacher-context/educationSystem/bookReport/Filters.vue'
  import Rounds from '@/views/pages/teacher-context/educationSystem/bookReport/Rounds.vue'
  import RoundsFilter from '@/views/pages/teacher-context/educationSystem/bookReport/RoundsFilter.vue'
  import Title from '@/views/pages/teacher-context/educationSystem/bookReport/Title.vue'
  import WeakStrong from '@/views/pages/teacher-context/educationSystem/bookReport/WeakStrong.vue'
  import { useEducationSystemBookReport } from '@/views/pages/teacher-context/educationSystem/bookReport/useEducationSystemBookReport.js'
  import { onUnmounted } from 'vue'

  const { module_name, fetchDetails } = useEducationSystemBookReport()
  store.registerModule(module_name, ModuleEducationSystemBookReport)

  const { book } = useFilters()
  const { bookId } = router.currentRoute.params

  book.value = { id: bookId, name: '' }

  onUnmounted(() => {
    store.commit(`${module_name}/reset`)
    store.unregisterModule(module_name)
  })

  fetchDetails()

  const legends = [accuracyPerformanceLegend]
</script>