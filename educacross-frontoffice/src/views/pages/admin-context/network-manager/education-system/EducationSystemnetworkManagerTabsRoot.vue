<template>
  <TabRouter :tabs="tabs" :tab-title="tabTitle" tab-title-icon="school">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import moduleEducationSystem from '@/store/pageModules/reports/module-education-system.js'
import { computed, onUnmounted, onMounted } from 'vue'

const { moduleId, educationSystemId, fetchSubjectsWithParams } = useFilters()

const tabTitle = computed(() => store.state.access.userData.InstitutionName)

const tabs = [
  {
    title: 'Livros',
    route: {
      name: 'networkManagerEducationSystemBooks',
    },
  },
  {
    title: 'Escolas',
    route: {
      name: 'networkManagerEducationSystemSchools',
    },
  },
  {
    title: 'Ranking',
    route: {
      name: 'networkManagerEducationSystemRanking',
    },
  },
]

store.registerModule('educationSystemReportTabsRoot', moduleEducationSystem)

onUnmounted(() => {
  store.commit('educationSystemReportTabsRoot/reset')
  store.unregisterModule('educationSystemReportTabsRoot')
})

onMounted(() => {
  fetchSubjectsWithParams({
    moduleId: moduleId.value,
    educationSystemId: educationSystemId.value,
  })
})
</script>