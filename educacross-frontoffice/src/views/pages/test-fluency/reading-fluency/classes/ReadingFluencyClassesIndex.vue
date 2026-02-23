<template>
  <Tab :tabs="tabs" :current-tab="0" tab-title-icon="school" :tab-title="title">
    <template v-slot:tab-content-0>
      <section>
        <AlertMoreInfo />
        <ReadingFluencyClassesHeader v-if="isNetworkManager" />
        <ReadingFluencyClassesFilter />
        <ReadingFluencyClassesDashboard />
        <ReadingFluencyClassesTable />
      </section>
    </template>
  </Tab>
</template>

<script setup>
import Tab from '@/components/tab/Tab.vue'
import store from '@/store'
import moduleReadingFluencyClasses from '@/store/pageModules/test-fluency/reading-fluency/module-reading-fluency-classes.js'
import ReadingFluencyClassesDashboard from '@/views/pages/test-fluency/reading-fluency/classes/ReadingFluencyClassesDashboard.vue'
import ReadingFluencyClassesFilter from '@/views/pages/test-fluency/reading-fluency/classes/ReadingFluencyClassesFilter.vue'
import ReadingFluencyClassesHeader from '@/views/pages/test-fluency/reading-fluency/classes/ReadingFluencyClassesHeader.vue'
import ReadingFluencyClassesTable from '@/views/pages/test-fluency/reading-fluency/classes/ReadingFluencyClassesTable.vue'
import AlertMoreInfo from '@/views/pages/test-fluency/reading-fluency/components/AlertMoreInfo.vue'
import { onUnmounted } from 'vue'

const tabs = [{ title: 'Visão geral' }]
const title = store.getters.accessUserData.InstitutionName
const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const moduleName = 'moduleReadingFluencyClasses'
if (!store.hasModule(moduleName)) {
  store.registerModule(moduleName, moduleReadingFluencyClasses)
}
onUnmounted(() => {
  if (store.hasModule(moduleName)) {
    store.unregisterModule(moduleName)
  }
})
</script>

<style lang="scss" scoped></style>