<template>
  <h1 class="sm:mx-0 mx-0 mx-md-4 mb-8 text-5xl">{{ title }}</h1>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
  })
</script>

<style lang="scss" scoped>
  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px !important;
    line-height: 29px;
    text-align: center;
    color: #6e6b7b;
  }
</style>