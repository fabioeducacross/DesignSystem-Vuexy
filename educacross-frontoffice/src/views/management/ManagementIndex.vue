<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" tab-title="GESTÃO DE MÓDULOS">
    <router-view />
  </TabRouter>
</template>

<script setup>
  import TabRouter from '@/components/tab/TabRouter.vue'
  import { ref } from 'vue'

  const tabs = [
    {
      title: 'Módulos',
      route: {
        name: 'modulesManagement',
      },
    },
  ]

  const currentTab = ref(0)
</script>

<style lang="scss" scoped></style>