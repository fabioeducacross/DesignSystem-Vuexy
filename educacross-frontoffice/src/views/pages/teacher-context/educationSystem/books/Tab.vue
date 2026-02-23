<script setup>
import Tab from '@/components/tab/Tab.vue'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import { progressLegend } from '@/consts/legends/progressEnum'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import EducationSystemBooksIndex from '@/views/pages/teacher-context/educationSystem/books/Index.vue'
import EducationSystemRankingIndex from '@/views/pages/teacher-context/educationSystem/ranking/Index.vue'
import EducationSystemStudentsIndex from '@/views/pages/teacher-context/educationSystem/students/Index.vue'
import { ref, computed, getCurrentInstance, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy
const tabTitle = ref('')

const tabs = computed(() => {
  const value = [
    {
      title: 'Livros',
    },
    {
      title: 'Alunos',
    },
  ]
  if (vm.$can(ACTION.READ, PERMISSION.MODULE.EDUCATION_SYSTEMS_ACHIEVEMENT_RANKING)) {
    value.push({
      title: 'Ranking',
    })
  }
  return value
})

const currentTab = ref(-1)
const { activeTabIndex } = router.currentRoute.meta

currentTab.value = activeTabIndex || 0

const changeTab = index => {
  currentTab.value = index
}

vm.$bus.on('setEducationSystemTabTitle', newTabTitle => {
  tabTitle.value = newTabTitle
})

onUnmounted(() => {
  vm.$bus.off('setEducationSystemTabTitle')
})

// Return context (all top-level variables are in template scope)
const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<template>
  <div>
    <Tab
      :current-tab="currentTab"
      :tabs="tabs"
      :tab-title="tabTitle"
      @update:currentTab="changeTab"
    >
      <template v-slot:tab-content-0>
        <EducationSystemBooksIndex v-if="currentTab === 0" />
      </template>
      <template v-slot:tab-content-1>
        <EducationSystemStudentsIndex v-if="currentTab === 1" />
      </template>
      <template v-slot:tab-content-2>
        <EducationSystemRankingIndex v-if="currentTab === 2" />
      </template>
    </Tab>
  </div>
</template>