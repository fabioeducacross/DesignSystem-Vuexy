<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="tabTitle">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'

const tabTitle = ref(null)

const role = store.getters.accessRole

const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])

const isNetworkManager = role === 'NetworkManager'

const tabs = computed(() => {
  const list = []

  if (evaluationDetails.value) {
    if (evaluationDetails.value.analysisTCT) {
      if (role === 'Teacher') {
        list.push({
          title: 'Análise TCT',
          route: {
            name: 'evaluationsTCTStudentsAnalysisTeacher',
          },
        })
      } else {
        list.push({
          title: 'Análise TCT',
          route: {
            name: isNetworkManager
              ? 'evaluationsTCTInstutionsStudentsAnalysis'
              : 'evaluationsTCTStudentsAnalysis',
          },
        })
      }
    }

    if (evaluationDetails.value.analysisTRI) {
      if (role === 'Teacher') {
        list.push({
          title: 'Análise TRI',
          route: {
            name: 'evaluationsTRIStudentsTeacher',
          },
        })
      } else {
        list.push({
          title: 'Análise TRI',
          route: {
            name: isNetworkManager
              ? 'evaluationsTRIInstutionsStudents'
              : 'evaluationsTRIStudents',
          },
        })
      }
    }
  }

  if (role === 'Teacher') {
    list.push(
      ...[
        {
          title: 'Habilidades',
          route: {
            name: 'evaluationsTCTStudentsAbilityTeacher',
          },
        },
        { title: 'Questões', route: { name: 'evaluationsTCTStudentsQuestionsTeacher' } },
      ],
    )
  } else {
    list.push(
      ...[
        {
          title: 'Habilidades',
          route: {
            name: isNetworkManager
              ? 'evaluationsTCTInstutionsStudentsAbility'
              : 'evaluationsTCTStudentsAbility',
          },
        },
        {
          title: 'Questões',
          route: {
            name: isNetworkManager
              ? 'evaluationsTCTInstutionsStudentsQuestions'
              : 'evaluationsTCTStudentsQuestions',
          },
        },
      ],
    )
  }

  return list
})

if (role === 'Teacher') {
  tabTitle.value = 'VISÃO GERAL DA TURMA'
}

const currentTab = ref(0)

const instance = getCurrentInstance()
const proxy = instance?.proxy

onMounted(() => {
  if (!proxy) return

  // $bus is mounted to globalProperties in main.js (legacy event bus)
  proxy.$bus.on('setTabTitle', title => {
    tabTitle.value = title
  })
})
onUnmounted(() => {
  if (!proxy) return
  proxy.$bus.off('setTabTitle')
})
</script>

<style lang="scss" scoped></style>