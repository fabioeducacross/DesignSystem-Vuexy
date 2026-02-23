<script setup>
  import { defineComponent } from 'vue'

  // Props
  const props = defineProps({
    firstLogo: { type: String, required: true },
    secondLogo: { type: String, required: true },
  })
</script>

<template>
  <div class="d-flex align-items-center justify-content-center gap-5">
    <b-img :src="props.firstLogo" class="evaluation-logo" />
    <div class="evaluation-logo-divider" />
    <b-img :src="props.secondLogo" class="evaluation-logo" />
  </div>
</template>

<style scoped lang="scss">
  .evaluation-logo {
    max-height: 44px;
  }

  .evaluation-logo-divider {
    height: 30px;
    border: 2px solid #b4b7bd;
    border-left: none;
  }
</style>