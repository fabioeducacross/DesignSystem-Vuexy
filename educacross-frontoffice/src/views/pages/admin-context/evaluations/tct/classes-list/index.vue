<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="tabTitle">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const tabTitle = ref(null)

const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const isCoordinator = store.getters.accessRole === 'Coordinator'

const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])

const tabs = computed(() => {
  const list = []

  if (evaluationDetails.value) {
    if (evaluationDetails.value.analysisTCT) {
      list.push({
        title: 'Análise TCT',
        route: {
          name: isNetworkManager
            ? 'evaluationsTCTInstutionsClassAnalysis'
            : 'evaluationsTCTClassAnalysis',
        },
      })
    }

    if (evaluationDetails.value.analysisTRI) {
      list.push({
        title: 'Análise TRI',
        route: {
          name: isNetworkManager ? 'evaluationsTRIInstutionsClass' : 'evaluationsTRIClass',
        },
      })
    }
  }

  if (!isCoordinator) {
    list.push({
      title: 'Habilidades',
      route: {
        name: isNetworkManager
          ? 'evaluationsTCTInstutionsClassAbility'
          : 'evaluationsTCTClassAbility',
      },
    })
  }
  list.push({
    title: 'Questões',
    route: {
      name: isNetworkManager
        ? 'evaluationsResultInstutionsClassQuestions'
        : 'evaluationsResultClassQuestions',
    },
  })
  return list
})

const currentTab = ref(0)

onMounted(() => {
  // $bus is available on globalProperties in Vue 2.7, keep as original
  // Use store._vm as original instance proxy, or window.vm if global
  // But in <script setup>, use store._vm.$bus
  store._vm.$bus.on('setTabTitle', title => {
    tabTitle.value = title
  })
})
onUnmounted(() => {
  store._vm.$bus.off('setTabTitle')
})
</script>

<style lang="scss" scoped></style>