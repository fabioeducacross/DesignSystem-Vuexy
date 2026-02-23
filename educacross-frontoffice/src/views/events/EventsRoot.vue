<template>
  <router-view />
</template>

<script setup>
  import { onMounted } from 'vue'
  import store from '@/store'

  // Reset event filters on mount
  onMounted(() => {
    store.dispatch('filters/reset')
  })
</script>