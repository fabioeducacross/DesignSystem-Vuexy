<template>
  <router-view></router-view>
</template>

<script setup>
import store from '@/store'

store.dispatch('filters/reset')
</script>