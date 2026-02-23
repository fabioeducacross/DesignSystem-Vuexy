<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="tabTitle">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'

const userRole = store.getters.accessRole
const vm = getCurrentInstance().proxy

const tabTitle = ref(null)

let participationTabRouteName = ''
let abilityTabRouteName = ''

switch (userRole) {
  case 'NetworkManager':
    participationTabRouteName = 'resultsReportNetworkManagerStudentsParticipation'
    abilityTabRouteName = 'resultsReportNetworkManagerStudentsPerformance'
    break
  case 'Teacher':
    participationTabRouteName = 'teacherResultsReportParticipation'
    abilityTabRouteName = 'teacherResultsReportPerformance'
    break
  default:
    participationTabRouteName = 'resultsReportAdminStudentsParticipation'
    abilityTabRouteName = 'resultsReportAdminStudentsPerformance'
    break
}

const tabs = [
  {
    title: 'Participação',
    route: {
      name: participationTabRouteName,
    },
  },
  {
    title: 'Desempenho',
    route: {
      name: abilityTabRouteName,
    },
  },
]

const currentTab = ref(0)

onMounted(() => {
  vm.$bus.on('setTabTitle', title => {
    tabTitle.value = title
  })
})

onUnmounted(() => {
  vm.$bus.off('setTabTitle')
})
</script>

<style lang="scss" scoped></style>