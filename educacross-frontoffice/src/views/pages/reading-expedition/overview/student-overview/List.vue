<template>
  <div>
    <ListByEngagement v-if="viewMode === 1" :key="1" />
    <ListByProficiency v-if="viewMode === 2" :key="2" />
  </div>
</template>

<script setup>
import store from '@/store'
import PassportModal from '@/views/pages/reading-expedition/components/PassportModal.vue'
import ListByEngagement from '@/views/pages/reading-expedition/overview/student-overview/ListByEngagement.vue'
import ListByProficiency from '@/views/pages/reading-expedition/overview/student-overview/ListByProficiency.vue'
import { computed } from 'vue'

const viewMode = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/viewMode'],
)
</script>