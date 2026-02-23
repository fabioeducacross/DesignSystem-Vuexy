<template>
  <section>
    <TeacherOverview v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" />
    <AdminOverview v-if="$can(ACTION.READ, PERMISSION.GENERAL.ADMIN)" />
  </section>
</template>

<script setup>
import { ACTION, PERMISSION } from '@/consts/permissions'
import AdminOverview from '@/views/pages/reading-expedition/overview/admin-overview/index.vue'
import TeacherOverview from '@/views/pages/reading-expedition/overview/teacher-overview/index.vue'
</script>

<style lang="scss" scoped></style>