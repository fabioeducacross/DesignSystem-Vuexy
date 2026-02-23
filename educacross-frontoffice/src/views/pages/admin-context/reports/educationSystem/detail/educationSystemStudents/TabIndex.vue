<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="tabTitle">
    <router-view />
  </TabRouter>
</template>

<script setup>
  import TabRouter from '@/components/tab/TabRouter.vue'
  import { ref, onMounted, onUnmounted } from 'vue'
  import { emitter } from '@/eventBus'

  const tabTitle = ref(null)

  const tabs = [
    {
      title: 'Visão Geral',
      route: {
        name: 'educationSystemReportStudentsGeneral',
      },
    },
    // {
    //   title: 'Visão por Livro',
    //   route: {
    //     name: 'educationSystemReportStudentsBooks',
    //   },
    // },
  ]

  const currentTab = ref(0)

  const setTabTitleHandler = title => {
    tabTitle.value = title
  }

  onMounted(() => {
    emitter.on('setTabTitle', setTabTitleHandler)
  })

  onUnmounted(() => {
    emitter.off('setTabTitle', setTabTitleHandler)
  })
</script>

<style lang="scss" scoped></style>