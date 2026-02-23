<template>
  <section class="d-flex flex-column flex-md-row gap-1 mb-50">
    <div
      v-for="(subject, index) in filteredSubjectsIds"
      :key="index"
      class="flex-1 p-50 text-white font-weight-bolder rounded d-flex align-items-center justify-content-center text-center"
      :class="`bg-${subject.variant}`"
    >
      {{ subject.label }}
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { SubjectEnum } from '@/consts/SubjectEnum'

// Props
const props = defineProps({
  subjectsIds: {
    type: Array,
    required: false,
    default: () => [],
  },
})

// Computed
const filteredSubjectsIds = computed(() => {
  return props.subjectsIds.map(id => SubjectEnum[id])
})
</script>