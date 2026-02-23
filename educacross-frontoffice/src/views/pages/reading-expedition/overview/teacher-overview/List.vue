<template>
  <div>
    <ListByEngagement v-if="viewMode === 1" :key="1" />
    <ListByProficiency v-if="viewMode === 2" :key="2" />
    <div class="d-flex justify-content-end">
      <SidebarInfo />
    </div>
  </div>
</template>

<script setup>
  import store from '@/store'
  import SidebarInfo from '@/views/pages/reading-expedition/components/SidebarInfo.vue'
  import ListByEngagement from '@/views/pages/reading-expedition/overview/teacher-overview/ListByEngagement.vue'
  import ListByProficiency from '@/views/pages/reading-expedition/overview/teacher-overview/ListByProficiency.vue'
  import { computed } from 'vue'

  const viewMode = computed(
    () => store.getters['readingExpeditionModuleOverviewTeacher/viewMode']
  )
</script>

<style scoped></style>