<template>
  <ListInitialsTeacher :data="content.teachers"></ListInitialsTeacher>
</template>

<script setup>
  import ListInitialsTeacher from '@/components/teacher/listInitialsTeacher.vue'

  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })
</script>

<style lang="scss" scoped></style>