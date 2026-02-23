<template>
  <TabRouter
    :tabs="tabs"
    :current-tab.sync="currentTab"
    :tab-title="tabTitle"
    tab-title-icon="school"
  >
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { ref, getCurrentInstance, onMounted, onUnmounted, computed } from 'vue'

const vm = getCurrentInstance().proxy

const title = store.getters.accessUserData.InstitutionName
const tabTitle = ref(title)

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const tabsAdmin = [
  {
    title: 'Livros',
    route: {
      name: isNetworkManager
        ? 'educationSystemReportInstitutionsClassesBook'
        : 'educationSystemReportBooksList',
    },
  },
  {
    title: 'Alunos',
    route: {
      name: 'educationSystemReportBooksClasses',
    },
  },
  {
    title: 'Ranking',
    route: {
      name: 'educationSystemReportBooksRanking',
    },
  },
]

const tabsNetworkManager = [
  {
    title: 'Visão Geral',
    route: {
      name: 'educationSystemReportInstitutionsClasses',
    },
  },
]

const currentTab = ref(0)

const tabs = computed(() => {
  if (isNetworkManager) {
    return tabsNetworkManager
  }
  return tabsAdmin
})

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