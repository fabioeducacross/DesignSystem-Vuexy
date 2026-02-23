<script setup>
import Tab from '@/components/tab/Tab.vue'
import store from '@/store'
import moduleEducationSystemRanking from '@/store/pageModules/educationSystem/module-educarion-system-ranking'
import EducationSystemStudentsTitle from '@/views/pages/teacher-context/educationSystem/components/Title.vue'
import EducationSystemRankingFilter from '@/views/pages/teacher-context/educationSystem/ranking/Filter.vue'
import EducationSystemRankingList from '@/views/pages/teacher-context/educationSystem/ranking/List.vue'
import { useEducationSystemRanking } from '@/views/pages/teacher-context/educationSystem/ranking/useEducationSystemRanking'
import { getCurrentInstance, onUnmounted, watch } from 'vue'

const vm = getCurrentInstance().proxy
const { moduleName, ranking } = useEducationSystemRanking()

if (!store.hasModule(moduleName)) {
  store.registerModule(moduleName, moduleEducationSystemRanking)
}

onUnmounted(() => {
  if (store.hasModule(moduleName)) {
    store.commit(`${moduleName}/reset`)
    store.unregisterModule(moduleName)
  }
})

watch(
  () => ranking.value.educationSystemName,
  () => {
    vm.$bus.emit('replaceBreadcrumb', [
      {
        text: `${ranking.value.educationSystemName}`,
        active: true,
      },
    ])
    vm.$bus.emit(
      'setEducationSystemTabTitle',
      `RANKING ${ranking.value.educationSystemName}`,
    )
  },
)
</script>

<template>
  <b-row>
    <b-col cols="12">
      <EducationSystemStudentsTitle />
    </b-col>
    <b-col cols="12">
      <EducationSystemRankingFilter />
    </b-col>
    <b-col cols="12">
      <EducationSystemRankingList />
    </b-col>
  </b-row>
</template>