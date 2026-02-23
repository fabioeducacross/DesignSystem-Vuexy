<template>
  <section>
    <TabRouter :tabs="tabs" :current-tab.sync="currentTab">
      <router-view />
    </TabRouter>
  </section>
</template>
<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'

const currentTab = ref(0)

const tabs = [
  {
    title: 'Ativas',
    route: {
      name: 'activeMissionsPlus',
    },
  },
  {
    title: 'Arquivadas',
    route: {
      name: 'archivedMissionPlus',
    },
  },
]
</script>