<template>
  <TabRouter
    :tabs="tabs"
    :current-tab.sync="currentTab"
    tab-title-icon="school"
    :tab-title="tabTitle"
  >
    <router-view />
  </TabRouter>
</template>

<script setup>
  import TabRouter from '@/components/tab/TabRouter.vue'
  import store from '@/store'
  import moduleTeacherAccess from '@/store/pageModules/reports/module-teacher-access.js'
  import { ref, onUnmounted } from 'vue'

  store.registerModule('moduleTeacherAccess', moduleTeacherAccess)

  onUnmounted(() => {
    // store.commit('eventsCertificate/reset')
    store.unregisterModule('moduleTeacherAccess')
  })

  const isNetworkManager = store.getters.accessRole === 'NetworkManager'
  const tabs = []

  if (isNetworkManager) {
    tabs.push({
      title: 'Rede',
      route: {
        name: 'teachersAccessNetwork',
      },
    })
  }

  tabs.push(
    {
      title: 'Escola',
      route: {
        name: 'teachersAccessSchool',
      },
    },
    {
      title: 'Professores',
      route: {
        name: 'teachersAccessTeacher',
      },
    },
  )

  const currentTab = ref(0)
  const { InstitutionName } = store.state.access.userData
  const tabTitle = ref(InstitutionName)
</script>

<style lang="scss" scoped></style>