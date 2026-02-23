<template>
  <Tab :current-tab="0" :tab-title="title" :tabs="tabs" tab-title-icon="school">
    <template v-slot:tab-content-0>
      <div>
        <AlertMoreInfo />
        <Title :back-func="backFunc">
          <div v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)">
            <div class="d-flex align-items-center justify-content-end gap-2">
              <span class="h4 m-0 text-primary"
                ><span class="font-bold">{{ institutionName }}</span></span
              >
            </div>
          </div>
        </Title>
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
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import store from '@/store'
import narrativeComplexityClasses from '@/store/pageModules/narrativeComplexity/module-narrative-complexity-classes.js'
import Cards from '@/views/pages/test-fluency/narrative-complexity/classes/Cards.vue'
import Filters from '@/views/pages/test-fluency/narrative-complexity/classes/Filters.vue'
import List from '@/views/pages/test-fluency/narrative-complexity/classes/List.vue'
import AlertMoreInfo from '@/views/pages/test-fluency/narrative-complexity/components/AlertMoreInfo.vue'
import Title from '@/views/pages/test-fluency/narrative-complexity/components/Title.vue'
import { onUnmounted, ref, computed, getCurrentInstance, watch } from 'vue'

const vm = getCurrentInstance().proxy

const tabs = [{ title: 'Visão geral' }]
const title = store.getters.accessUserData.InstitutionName

const moduleName = 'narrativeComplexityClasses'
if (!store.hasModule(moduleName)) {
  store.registerModule(moduleName, narrativeComplexityClasses)
}

const applyId = computed(() => store.getters['narrativeComplexityClasses/applyId'])

onUnmounted(() => {
  if (store.hasModule(moduleName)) {
    store.commit(`${moduleName}/reset`)
    store.unregisterModule(moduleName)
  }
})

const institutionName = computed(
  () => store.getters['narrativeComplexityClasses/institutionName'],
)

const backFunc = ref(null)

if (vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
  backFunc.value = () => {
    router.push({ name: 'narrativeComplexityInstitutions' })
  }
}

watch([institutionName], () => {
  vm.$bus.emit('setBreadcrumb', ['', '', institutionName.value])
})

const legends = [percentileNarrativeComplexityLegend]
</script>

<style lang="scss" scoped></style>