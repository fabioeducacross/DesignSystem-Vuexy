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
  import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue'

  const vm = getCurrentInstance().proxy
  const { InstitutionName } = store.state.access.userData

  const tabs = computed(() => [
    {
      title: 'Visão geral',
      route: {
        name: `missionsPlusInstitutionsOverview`,
      },
    },
    {
      title: 'Conteúdo',
      route: {
        name: `missionsPlusInstitutionsContent`,
      },
    },
    {
      title: 'Ranking',
      route: {
        name: `missionsPlusInstitutionsRanking`,
      },
    },
  ])

  const currentTab = ref(0)

  const tabTitle = ref(InstitutionName)

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