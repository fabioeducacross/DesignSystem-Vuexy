<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" tab-title="VISÃO GERAL DA TURMA">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import { ref } from 'vue'

const tabs = [
  {
    title: 'Visão Geral',
    route: {
      name: 'readingMeterClassesOverview',
    },
  },
  {
    title: 'Testes',
    route: {
      name: 'readingMeterList',
    },
  },
  // {
  //   title: 'Livros',
  //   route: {
  //     name: 'readingMetherLibrary',
  //   },
  // },
]
const currentTab = ref(0)
</script>