<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" tab-title="RANKING">
    <router-view />
  </TabRouter>
</template>

<script setup>
  import TabRouter from '@/components/tab/TabRouter.vue'
  import { ref } from 'vue'

  const tabs = [
    {
      title: 'Escolas',
      route: {
        name: 'eventRankingInstitutionSchool',
      },
    },
    {
      title: 'Alunos',
      route: {
        name: 'eventRankingInstitutionStudents',
      },
    },
  ]

  const currentTab = ref(0)
</script>

<style lang="scss" scoped></style>