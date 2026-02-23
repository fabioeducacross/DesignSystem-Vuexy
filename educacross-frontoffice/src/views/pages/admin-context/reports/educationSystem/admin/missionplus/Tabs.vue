<template>
  <TabRouter :tabs="tabs" :tab-title="tabTitle" tab-title-icon="school">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { ref, computed, getCurrentInstance, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy

const title = store.getters.accessUserData.InstitutionName
const tabTitle = ref(title)

const tabs = computed(() => [
  { title: 'Livros', route: { name: 'EducationSystemReportMissionPlusBooks' } },
  { title: 'Alunos', route: { name: 'EducationSystemReportMissionPlusClasses' } },
  { title: 'Ranking', route: { name: 'EducationSystemReportMissionPlusRanking' } },
])

vm.$bus.on('setEducationSystemTabTitle', newTabTitle => {
  tabTitle.value = newTabTitle
})

onUnmounted(() => {
  vm.$bus.off('setEducationSystemTabTitle')
})

const { book, mission } = useFilters()
const { bookId, missionId } = router.currentRoute.params

book.value = { id: bookId, name: '' }
mission.value = { id: missionId, name: '' }
</script>