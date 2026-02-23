<template>
  <div>
    <TabRouter
      :tabs="tabs"
      :current-tab.sync="currentTab"
      :tab-title="tabTitle"
      tab-title-icon="school"
    >
      <router-view />
    </TabRouter>
  </div>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { ref, computed } from 'vue'

const { InstitutionName } = store.state.access.userData

const accessRole = computed(() => {
  const role = store.getters.accessRole

  if (role !== 'NetworkManager') {
    return 'Admin'
  }
  return role
})

const tabs = computed(() => [
  {
    title: 'Engajamento',
    route: {
      name: `dashboardClassesTabsEngagement${accessRole.value}`,
    },
  },
  {
    title: 'Desempenho',
    route: {
      name: `dashboardClassesTabsPerformance${accessRole.value}`,
    },
  },
])

const currentTab = ref(0)

const tabTitle = ref(InstitutionName)
</script>

<style lang="scss" scoped></style>