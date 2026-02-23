<template>
  <div class="w-100 d-flex flex-start">
    <span class="student-name">{{ content.name }}</span>
  </div>
</template>

<script setup>
  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })
</script>

<style lang="scss" scoped>
  .student-name {
    text-align: start;
    font-weight: bold;
  }
</style>