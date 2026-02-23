<template>
  <TabRouter :tabs="tabs" :current-tab.sync="currentTab" :tab-title="title" tab-title-icon="school">
    <router-view />
  </TabRouter>
</template>

<script setup>
  import TabRouter from '@/components/tab/TabRouter.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import store from '@/store'
  import { getCurrentInstance, ref } from 'vue'

  const vm = getCurrentInstance().proxy
  const tabs = [
    {
      title: 'Visão Geral',
      route: {
        name: 'listStudentAdminOverview',
      },
    },
  ]
  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.MIGRATE_CLASS_STUDENTS)) {
    tabs.push({ title: 'Migrar Alunos', route: { name: 'changeStudentFromClassAdmin' } })
  }

  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)) {
    tabs.push({
      title: 'Lixeira',
      variant: 'danger',
      icon: 'delete',
      route: {
        name: 'listStudentAdminTrash',
      },
    })
  }

  const currentTab = ref(0)
  const title = store.getters.accessUserData.InstitutionName
</script>

<style lang="scss" scoped></style>