<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="tabTitle">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import store from '@/store'
import { ref, computed } from 'vue'

const currentTab = ref(0)
const tabTitle = ref('')

const isTeacher = store.getters.accessRole === 'Teacher'

if (!isTeacher) {
  const { InstitutionName } = store.state.access.userData
  tabTitle.value = InstitutionName
}

const tabs = computed(() => {
  const value = [
    {
      title: isTeacher ? 'Turma' : 'Visão geral',
      route: {
        name: `reportMissionsPlusClasse`,
      },
    },
  ]

  if (isTeacher) {
    value.push(
      {
        title: 'Alunos',
        route: {
          name: `reportMissionsPlusStudents`,
        },
      },
      {
        title: 'Ranking da missão',
        route: {
          name: 'reportMissionsPlusRanking',
        },
      },
    )
  } else {
    value.push({
      title: 'Conteudo',
      route: {
        name: `dashboardClassesTabsEngagement`,
      },
    })
  }

  return value
})
</script>