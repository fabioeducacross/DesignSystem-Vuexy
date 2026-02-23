<template>
  <section>
    <TeacherFilters />
    <TeacherCards />
    <TeacherList />
  </section>
</template>

<script setup>
  import store from '@/store'
  import moduleTeacherAccessTabTeacher from '@/store/pageModules/reports/module-teacher-access-teacher.js'
  import TeacherCards from '@/views/reports/teachersAccess/tabs/Teacher/TeacherCards.vue'
  import TeacherFilters from '@/views/reports/teachersAccess/tabs/Teacher/TeacherFilters.vue'
  import TeacherList from '@/views/reports/teachersAccess/tabs/Teacher/TeacherList.vue'
  import { onUnmounted } from 'vue'

  store.registerModule('moduleTeacherAccessTabTeacher', moduleTeacherAccessTabTeacher)

  onUnmounted(() => {
    store.commit('moduleTeacherAccess/reset')
    store.unregisterModule('moduleTeacherAccessTabTeacher')
  })
</script>

<style lang="scss" scoped></style>