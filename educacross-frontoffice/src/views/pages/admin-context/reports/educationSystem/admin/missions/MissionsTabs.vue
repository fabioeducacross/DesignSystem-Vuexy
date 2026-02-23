<template>
  <TabRouter :tabs="tabs" :tab-title="tabTitle" tab-title-icon="school">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { ref, computed, onUnmounted, getCurrentInstance } from 'vue'

const title = store.getters.accessUserData.InstitutionName
const tabTitle = ref(title)

const tabs = computed(() => [
  { title: 'Livros', route: { name: 'educationSystemReportMissionsBooks' } },
  { title: 'Alunos', route: { name: 'educationSystemReportMissionsClasses' } },
  { title: 'Ranking', route: { name: 'educationSystemReportMissionsRanking' } },
])

const handleSetTabTitle = newTabTitle => {
  tabTitle.value = newTabTitle
}

const { proxy } = getCurrentInstance()

proxy.$bus.on('setEducationSystemTabTitle', handleSetTabTitle)

onUnmounted(() => {
  proxy.$bus.off('setEducationSystemTabTitle', handleSetTabTitle)
})
</script>