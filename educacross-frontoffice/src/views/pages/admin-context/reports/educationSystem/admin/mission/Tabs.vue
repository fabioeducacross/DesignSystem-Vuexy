<template>
  <TabRouter :tabs="tabs" :tab-title="tabTitle" tab-title-icon="school">
    <router-view />
  </TabRouter>
</template>
<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { ref, computed, onUnmounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router/composables'

const vm = getCurrentInstance().proxy

const tabTitle = ref(store.getters.accessUserData.InstitutionName)

const tabs = computed(() => [
  { title: 'Livros', route: { name: 'EducationSystemReportMissionBooks' } },
  { title: 'Alunos', route: { name: 'EducationSystemReportMissionClasses' } },
  { title: 'Ranking', route: { name: 'EducationSystemReportMissionRanking' } },
])

vm.$bus.on('setEducationSystemTabTitle', newTabTitle => {
  tabTitle.value = newTabTitle
})

onUnmounted(() => {
  vm.$bus.off('setEducationSystemTabTitle')
})

const { book, mission } = useFilters()
const route = useRoute()
const { bookId, missionId } = route.params

book.value = { id: bookId, name: '' }
mission.value = { id: missionId, name: '' }
</script>