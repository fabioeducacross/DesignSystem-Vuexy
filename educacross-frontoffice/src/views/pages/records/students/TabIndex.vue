<script setup>
  import Tab from '@/components/tab/Tab.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import store from '@/store'

  const StudentIndex = () =>
    import(
      /* webpackChunkName: "student-index" */ '@/views/pages/records/students/list/StudentsIndex.vue'
    )
  const TransferStudents = () =>
    import(
      /* webpackChunkName: "transfer-students" */ '@/views/pages/records/students/transferStudents/Index.vue'
    )

  const tabs = [{ title: 'Visão Geral', route: { name: 'listStudentAdmin' } }]
  if (getCurrentInstance().proxy.$can(ACTION.READ, PERMISSION.GENERAL.MIGRATE_CLASS_STUDENTS)) {
    tabs.push({ title: 'Migrar Alunos', route: { name: 'changeStudentFromClassAdmin' } })
  }

  const institutionName = store.getters.accessUserData?.InstitutionName
</script>

<template>
  <Tab :tabs="tabs" tab-title-icon="school" :tab-title="institutionName">
    <template v-slot:tab-content-0>
      <StudentIndex />
    </template>
    <template v-slot:tab-content-1>
      <TransferStudents />
    </template>
  </Tab>
</template>