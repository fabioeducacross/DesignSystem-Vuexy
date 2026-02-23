<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="tabTitle">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy
const { setInstitutionId } = useEvents()

const tabTitle = ref(null)

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

if (!isNetworkManager) {
  setInstitutionId(store.getters.getInstitutionId)
}

const tabs = [
  {
    title: 'Participação',
    route: {
      name: isNetworkManager
        ? 'resultsReportNetworkManagerClassesParticipation'
        : 'resultsReportAdminClassesParticipation',
    },
  },
  {
    title: 'Desempenho',
    route: {
      name: isNetworkManager
        ? 'resultsReportNetworkManagerClassesPerformance'
        : 'resultsReportAdminClassesPerformance',
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