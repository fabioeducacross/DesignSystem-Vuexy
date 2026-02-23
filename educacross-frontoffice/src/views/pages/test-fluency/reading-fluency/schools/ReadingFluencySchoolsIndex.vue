<template>
  <Tab :tabs="tabs" :current-tab="0" tab-title-icon="school" :tab-title="title">
    <template v-slot:tab-content-0>
      <section>
        <AlertMoreInfo />
        <ReadingFluencySchoolsFilter />
        <ReadingFluencySchoolsDashboard />
        <ReadingFluencySchoolsTable />
      </section>
    </template>
  </Tab>
</template>

<script setup>
  import Tab from '@/components/tab/Tab.vue'
  import store from '@/store'
  import moduleReadingFluencySchools from '@/store/pageModules/test-fluency/reading-fluency/module-reading-fluency-schools.js'
  import AlertMoreInfo from '@/views/pages/test-fluency/reading-fluency/components/AlertMoreInfo.vue'
  import ReadingFluencySchoolsDashboard from '@/views/pages/test-fluency/reading-fluency/schools/ReadingFluencySchoolsDashboard.vue'
  import ReadingFluencySchoolsFilter from '@/views/pages/test-fluency/reading-fluency/schools/ReadingFluencySchoolsFilter.vue'
  import ReadingFluencySchoolsTable from '@/views/pages/test-fluency/reading-fluency/schools/ReadingFluencySchoolsTable.vue'
  import { onUnmounted } from 'vue'

  const tabs = [{ title: 'Visão geral' }]
  const title = store.getters.accessUserData.InstitutionName

  const moduleName = 'moduleReadingFluencySchools'
  if (!store.hasModule(moduleName)) {
    store.registerModule(moduleName, moduleReadingFluencySchools)
  }
  onUnmounted(() => {
    if (store.hasModule(moduleName)) {
      store.unregisterModule(moduleName)
    }
  })
</script>

<style lang="scss" scoped></style>