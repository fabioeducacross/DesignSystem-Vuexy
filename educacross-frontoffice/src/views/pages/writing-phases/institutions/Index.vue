<template>
  <Tab :current-tab="0" :tab-title="title" :tabs="tabs" tab-title-icon="school">
    <template v-slot:tab-content-0>
      <div>
        <WritingPhaseRegisterInfo />
        <Title />
        <Filters />
        <Cards />
        <div v-if="applyId">
          <List />
          <WritingPhasesLegendEnum />
        </div>
      </div>
    </template>
  </Tab>
</template>

<script setup>
import Tab from '@/components/tab/Tab.vue'
import store from '@/store'
import writingPhasesInstitutions from '@/store/pageModules/writing-phases/module-writing-phases-institutions.js'
import WritingPhaseRegisterInfo from '@/views/pages/writing-phases/components/Info.vue'
import Title from '@/views/pages/writing-phases/components/Title.vue'
import WritingPhasesLegendEnum from '@/views/pages/writing-phases/components/WritingPhasesLegendEnum.vue'
import Cards from '@/views/pages/writing-phases/institutions/Cards.vue'
import Filters from '@/views/pages/writing-phases/institutions/Filters.vue'
import List from '@/views/pages/writing-phases/institutions/List.vue'
import { useWritingStagesInstitutions } from '@/views/pages/writing-phases/institutions/useWritingStagesInstitutions.js'
import { onUnmounted } from 'vue'

const tabs = [{ title: 'Visão geral' }]
const title = store.getters.accessUserData.InstitutionName
const { applyId, moduleName, reset } = useWritingStagesInstitutions()

if (!store.hasModule(moduleName)) {
  store.registerModule(moduleName, writingPhasesInstitutions)
}

onUnmounted(() => {
  if (store.hasModule(moduleName)) {
    reset()
    store.unregisterModule(moduleName)
  }
})
</script>

<style lang="scss" scoped></style>