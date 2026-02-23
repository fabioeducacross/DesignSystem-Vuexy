<template>
  <Tab :tabs="tabs" v-model="currentTab" :tab-title="tabTitle">
    <template v-slot:tab-content-0>
      <EducationSystemMissionPlusIndex v-if="currentTab === 0" />
    </template>
    <template v-slot:tab-content-1>
      <EducationSystemStudentsIndex v-if="currentTab === 1" />
    </template>
    <template v-slot:tab-content-2>
      <EducationSystemRankingIndex v-if="currentTab === 2" />
    </template>
  </Tab>
</template>

<script setup>
import Tab from '@/components/tab/Tab.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import EducationSystemMissionPlusIndex from '@/views/pages/teacher-context/educationSystem/missionplus/index.vue'
import EducationSystemRankingIndex from '@/views/pages/teacher-context/educationSystem/ranking/Index.vue'
import EducationSystemStudentsIndex from '@/views/pages/teacher-context/educationSystem/students/Index.vue'
import { ref, computed, getCurrentInstance, onUnmounted } from 'vue'

const { proxy: vm } = getCurrentInstance()
const tabTitle = ref('')

const currentTab = ref(0)

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

vm.$bus.on('setEducationSystemTabTitle', newTabTitle => {
  tabTitle.value = newTabTitle
})

onUnmounted(() => {
  vm.$bus.off('setEducationSystemTabTitle')
})
</script>