<template>
  <section>
    <SchoolFilters />
    <SchoolCards />
    <SchoolList />
  </section>
</template>

<script setup>
  import store from '@/store'
  import moduleTeacherAccessTabSchool from '@/store/pageModules/reports/module-teacher-access-school.js'
  import SchoolCards from '@/views/reports/teachersAccess/tabs/School/SchoolCards.vue'
  import SchoolFilters from '@/views/reports/teachersAccess/tabs/School/SchoolFilters.vue'
  import SchoolList from '@/views/reports/teachersAccess/tabs/School/SchoolList.vue'
  import { onUnmounted } from 'vue'

  store.registerModule('moduleTeacherAccessTabSchool', moduleTeacherAccessTabSchool)

  onUnmounted(() => {
    store.commit('moduleTeacherAccess/reset')
    store.unregisterModule('moduleTeacherAccessTabSchool')
  })
</script>

<style lang="scss" scoped></style>