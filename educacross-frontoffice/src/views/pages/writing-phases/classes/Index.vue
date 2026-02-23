<template>
  <Tab :current-tab="0" :tab-title="title" :tabs="tabs" tab-title-icon="school">
    <template v-slot:tab-content-0>
      <div>
        <WritingPhaseRegisterInfo />
        <Title :back-func="backFunc" title="Análise das Fases da Escrita">
          <div v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)">
            <div class="d-flex align-items-center justify-content-end gap-2">
              <span class="h4 m-0 text-primary">
                <span class="font-bold">{{ institutionName }}</span>
              </span>
            </div>
          </div>
        </Title>
        <Filters />
        <Cards />
        <List />
        <WritingPhasesLegendEnum />
      </div>
    </template>
  </Tab>
</template>

<script setup>
import Tab from '@/components/tab/Tab.vue'
import { percentileNarrativeComplexityLegend } from '@/consts/legends/percentileNarrativeComplexityEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import store from '@/store'
import moduleWritingPhaseClasses from '@/store/pageModules/writing-phases/module-writing-phase-classes'
import Title from '@/views/pages/test-fluency/narrative-complexity/components/Title.vue'
import Cards from '@/views/pages/writing-phases/classes/Cards.vue'
import Filters from '@/views/pages/writing-phases/classes/Filters.vue'
import List from '@/views/pages/writing-phases/classes/List.vue'
import { useClassesWritingPhase } from '@/views/pages/writing-phases/classes/useClassesWritingPhase'
import WritingPhaseRegisterInfo from '@/views/pages/writing-phases/components/Info.vue'
import WritingPhasesLegendEnum from '@/views/pages/writing-phases/components/WritingPhasesLegendEnum.vue'
import { getCurrentInstance, onUnmounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy
const { institutionName, module_name } = useClassesWritingPhase()

if (!store.hasModule(module_name)) {
  store.registerModule(module_name, moduleWritingPhaseClasses)
}

const tabs = [{ title: 'Visão geral' }]
const title = store.getters.accessUserData.InstitutionName

const backFunc = ref(null)

if (vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
  backFunc.value = () => {
    router.push({ name: 'writingPhasesInstitutions' })
  }

  watch([institutionName], () => {
    vm.$bus.emit('setBreadcrumb', ['', '', institutionName.value])
  })
}

onUnmounted(() => {
  if (store.hasModule(module_name)) {
    store.commit(`${module_name}/reset`)
    store.unregisterModule(module_name)
  }
})

</script>

<style lang="scss" scoped></style>