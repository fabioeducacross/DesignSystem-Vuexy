<template>
  <TabRouter :tabs="tabs" :tab-title="tabTitle" tab-title-icon="school">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { ref, computed, getCurrentInstance, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy

const title = store.getters.accessUserData.InstitutionName
const tabTitle = ref(title)

const tabs = computed(() => [
  { title: 'Livros', route: { name: 'educationSystemReportMissionsBookReportBooks' } },
  { title: 'Alunos', route: { name: 'educationSystemReportMissionsBookReportStudents' } },
  { title: 'Ranking', route: { name: 'educationSystemReportMissionsBookReportRanking' } },
])

vm.$bus.on('setEducationSystemTabTitle', newTabTitle => {
  tabTitle.value = newTabTitle
})

onUnmounted(() => {
  vm.$bus.off('setEducationSystemTabTitle')
})
</script>