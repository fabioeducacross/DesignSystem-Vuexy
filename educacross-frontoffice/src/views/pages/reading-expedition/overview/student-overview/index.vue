<template>
  <b-row>
    <b-col cols="12">
      <OverviewFilter />
    </b-col>
    <b-col v-if="viewMode === 1" cols="12" class="cards-slide mb-50">
      <CardsEngagement />
    </b-col>
    <b-col v-if="viewMode === 2" cols="12">
      <CardsPerformance />
    </b-col>
    <b-col cols="12">
      <OverviewList :view-mode="viewMode" />
    </b-col>
    <b-col v-if="viewMode === 2" cols="12">
      <LegendEnum :legends="[expeditionStudentProgressLegend]" />
    </b-col>
    <b-col v-show="viewMode === 2" cols="12">
      <div class="d-flex justify-content-end">
        <SidebarInfo />
      </div>
    </b-col>
  </b-row>
</template>

<script setup>
  import OverviewFilter from './Filter.vue'
  import OverviewList from './List.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { expeditionStudentProgressLegend } from '@/consts/ReadingExpeditionEnum.js'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import store from '@/store'
  import readingExpeditionModuleOverviewStudentDetails from '@/store/pageModules/readingExpedition/readingExpeditionModuleOverviewStudentDetails.js'
  import SidebarInfo from '@/views/pages/reading-expedition/components/SidebarInfo.vue'
  import CardsEngagement from '@/views/pages/reading-expedition/overview/student-overview/CardsEngagement.vue'
  import CardsPerformance from '@/views/pages/reading-expedition/overview/student-overview/CardsPerformance.vue'
  import { computed, onUnmounted } from 'vue'

  const moduleName = 'readingExpeditionModuleOverviewStudentDetails'
  store.registerModule(moduleName, readingExpeditionModuleOverviewStudentDetails)

  const viewMode = computed(
    () => store.getters['readingExpeditionModuleOverviewStudentDetails/viewMode'],
  )

  onUnmounted(() => {
    store.unregisterModule(moduleName)
  })
</script>