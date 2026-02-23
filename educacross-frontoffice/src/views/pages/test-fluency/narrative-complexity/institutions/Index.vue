<template>
  <Tab :current-tab="0" :tab-title="title" :tabs="tabs" tab-title-icon="school">
    <template v-slot:tab-content-0>
      <div>
        <AlertMoreInfo />
        <Title />
        <Filters />
        <Cards />
        <div v-if="applyId">
          <List />
          <LegendEnum :legends="legends" />
        </div>
      </div>
    </template>
  </Tab>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import Tab from '@/components/tab/Tab.vue'
import { percentileNarrativeComplexityLegend } from '@/consts/legends/percentileNarrativeComplexityEnum.js'
import store from '@/store'
import narrativeComplexityInstitutions from '@/store/pageModules/narrativeComplexity/module-narrative-complexity-institutions.js'
import Filters from '@/views/pages/test-fluency//narrative-complexity/institutions/Filters.vue'
import List from '@/views/pages/test-fluency//narrative-complexity/institutions/List.vue'
import AlertMoreInfo from '@/views/pages/test-fluency/narrative-complexity/components/AlertMoreInfo.vue'
import Title from '@/views/pages/test-fluency/narrative-complexity/components/Title.vue'
import Cards from '@/views/pages/test-fluency/narrative-complexity/institutions/Cards.vue'
import { onUnmounted, computed } from 'vue'

const tabs = [{ title: 'Visão geral' }]
const title = store.getters.accessUserData.InstitutionName

const moduleName = 'narrativeComplexityInstitutions'
if (!store.hasModule(moduleName)) {
  store.registerModule(moduleName, narrativeComplexityInstitutions)
}

const applyId = computed(() => store.getters['narrativeComplexityInstitutions/applyId'])

onUnmounted(() => {
  if (store.hasModule(moduleName)) {
    store.commit(`${moduleName}/reset`)
    store.unregisterModule(moduleName)
  }
})

const legends = [percentileNarrativeComplexityLegend]
</script>

<style lang="scss" scoped></style>