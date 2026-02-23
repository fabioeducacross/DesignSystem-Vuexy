<template>
  <div>
    <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="tabTitle">
      <router-view />
    </TabRouter>
  </div>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { InstitutionName } = store.state.access.userData

const tabs = computed(() => [
  {
    title: 'Visão geral',
    route: {
      name: `missionsPlusClassesMissionOverview`,
    },
  },
  {
    title: 'Conteúdo',
    route: {
      name: `missionsPlusClassesMissionContent`,
    },
  },
  {
    title: 'Ranking da missão',
    route: {
      name: 'missionsPlusClassesMissionRanking',
    },
  },
])

const currentTab = ref(0)
const tabTitle = ref(InstitutionName)

const setTabTitleHandler = title => {
  tabTitle.value = title
}

onMounted(() => {
  // $bus is attached to Vue prototype. In <script setup>, use getCurrentInstance if needed,
  // but usually the app's eventBus is in src/eventBus.js and should be imported.
  // However, this app uses $bus on vm.
  // So, we use getCurrentInstance().proxy.$bus
  const { proxy } = getCurrentInstance()
  proxy.$bus.on('setTabTitle', setTabTitleHandler)
})

onUnmounted(() => {
  const { proxy } = getCurrentInstance()
  proxy.$bus.off('setTabTitle', setTabTitleHandler)
})
</script>

<style lang="scss" scoped></style>