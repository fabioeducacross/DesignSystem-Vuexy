<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="tabTitle">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy

const tabTitle = ref(null)

const tabs = [
  {
    title: 'Participação',
    route: {
      name: 'resultsReportNetworkManagerInstitutionsParticipation',
    },
  },
  {
    title: 'Desempenho',
    route: {
      name: 'resultsReportNetworkManagerInstitutionsPerformance',
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