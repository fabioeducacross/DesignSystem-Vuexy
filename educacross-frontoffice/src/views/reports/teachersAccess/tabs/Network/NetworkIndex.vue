<template>
  <section>
    <NetworkFilters />
    <NetworkCards />
    <NetworkList />
  </section>
</template>

<script setup>
import store from '@/store'
import moduleTeacherAccessTabNetwork from '@/store/pageModules/reports/module-teacher-access-network.js'
import NetworkCards from '@/views/reports/teachersAccess/tabs/Network/NetworkCards.vue'
import NetworkFilters from '@/views/reports/teachersAccess/tabs/Network/NetworkFilters.vue'
import NetworkList from '@/views/reports/teachersAccess/tabs/Network/NetworkList.vue'
import { onUnmounted } from 'vue'

store.registerModule('moduleTeacherAccessTabNetwork', moduleTeacherAccessTabNetwork)

onUnmounted(() => {
  store.commit('moduleTeacherAccess/reset')
  store.unregisterModule('moduleTeacherAccessTabNetwork')
})
</script>

<style lang="scss" scoped></style>