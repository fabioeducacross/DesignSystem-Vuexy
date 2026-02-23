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
  import router from '@/router'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue'

  const vm = getCurrentInstance().proxy
  const { institution } = useFilters()
  const { InstitutionName } = store.state.access.userData

  const { institutionId } = router.currentRoute.params
  institution.value = { id: institutionId }
  onUnmounted(() => {
    institution.value.id = null
  })
  const isNetworkManager = store.getters.accessRole === 'NetworkManager'

  const tabs = computed(() => [
    {
      title: 'Visão geral',
      route: {
        name: isNetworkManager
          ? 'missionsPlusInstitutionsClassesOverview'
          : 'missionsPlusClassesOverview',
      },
    },
    {
      title: 'Conteúdo',
      route: {
        name: isNetworkManager
          ? 'missionsPlusInstitutionsClassesContent'
          : 'missionsPlusClassesContent',
      },
    },
    {
      title: 'Ranking',
      route: {
        name: isNetworkManager
          ? 'missionsPlusInstitutionsClassesContentRanking'
          : 'missionsPlusClassesRanking',
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