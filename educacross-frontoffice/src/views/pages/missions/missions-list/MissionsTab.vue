<template>
  <section>
    <TabRouter :tabs="tabs" :current-tab.sync="currentTab">
      <router-view />
    </TabRouter>
  </section>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import { ref } from 'vue'

const currentTab = ref(0)

const tabs = [
  {
    title: 'Ativas',
    route: {
      name: 'activeMissions',
    },
  },
  {
    title: 'Arquivadas',
    route: {
      name: 'archivedMission',
    },
  },
  {
    title: 'Ranking',
    route: {
      name: 'rankingMissions',
    },
  },
]
</script>