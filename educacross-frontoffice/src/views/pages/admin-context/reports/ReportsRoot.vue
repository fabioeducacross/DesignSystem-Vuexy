<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import store from '@/store'

onMounted(() => {
  store.dispatch('filters/reset')
})
</script>

<style lang="scss" scoped></style>