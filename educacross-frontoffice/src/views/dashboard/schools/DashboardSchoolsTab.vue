<template>
  <div>
    <TabRouter
      :tabs="tabs"
      :current-tab.sync="currentTab"
      tab-title-icon="school"
      :tab-title="tabTitle"
    >
      <router-view />
    </TabRouter>
  </div>
</template>

<script setup>
  import TabRouter from '@/components/tab/TabRouter.vue'
  import store from '@/store'
  import { ref } from 'vue'

  const { InstitutionName } = store.state.access.userData

  const tabs = [
    {
      title: 'Engajamento',
      route: {
        name: 'dashboardSchoolTabsEngagement',
      },
    },
    {
      title: 'Desempenho',
      route: {
        name: 'dashboardSchoolTabsPerformance',
      },
    },
  ]

  const currentTab = ref(0)
  const tabTitle = ref(InstitutionName)
</script>

<style lang="scss" scoped></style>