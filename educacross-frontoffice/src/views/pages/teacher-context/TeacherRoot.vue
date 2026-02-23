<template>
  <router-view></router-view>
</template>

<script setup>
  import store from '@/store'

  // Clear all teacher filters on context mount
  store.dispatch('filters/reset')
</script>