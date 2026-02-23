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
    title: 'Visão Geral',
    route: {
      name: 'educationSystemReportInstitutionsListGeneral',
    },
  },
  /*   {
    title: 'Visão por objetivo',
    route: {
      name: isNetworkManager
        ? 'evaluationsTCTInstutionsClassAbility'
        : 'evaluationsTCTClassAbility',
    },
  }, */
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