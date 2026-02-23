<template>
  <section>
    <GeneralFilter />
    <GeneralDashboard />
    <GeneralList />
  </section>
</template>

<script setup>
  import store from '@/store'
  import moduleReadingFluencyOverview from '@/store/pageModules/readingMeter/module-reading-fluency-overview.js'
  import GeneralDashboard from '@/views/pages/teacher-context/library/general/GeneralDashboard.vue'
  import GeneralFilter from '@/views/pages/teacher-context/library/general/GeneralFilter.vue'
  import GeneralList from '@/views/pages/teacher-context/library/general/GeneralList.vue'
  import { onUnmounted } from 'vue'

  if (!store.hasModule('moduleReadingFluencyOverview')) {
    store.registerModule('moduleReadingFluencyOverview', moduleReadingFluencyOverview)
  }

  onUnmounted(() => {
    if (store.hasModule('moduleReadingFluencyOverview')) {
      store.unregisterModule('moduleReadingFluencyOverview')
    }
  })
</script>

<style lang="scss" scoped></style>