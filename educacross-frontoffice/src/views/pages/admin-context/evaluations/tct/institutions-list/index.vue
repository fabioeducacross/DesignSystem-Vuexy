<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="tabTitle">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'

const vm = getCurrentInstance().proxy
const tabTitle = ref(null)

const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])

const tabs = computed(() => {
  const list = []

  if (evaluationDetails.value) {
    if (evaluationDetails.value.analysisTCT) {
      list.push({ title: 'Análise TCT', route: { name: 'evaluationsTCTInstutionsAnalysis' } })
    }

    if (evaluationDetails.value.analysisTRI) {
      list.push({ title: 'Análise TRI', route: { name: 'evaluationsTRIInstutions' } })
    }
  }

  list.push(
    ...[
      { title: 'Habilidades', route: { name: 'evaluationsTCTInstutionsAbility' } },
      { title: 'Questões', route: { name: 'evaluationsResultInstutionsQuestions' } },
    ],
  )

  return list
})

const currentTab = ref(0)

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