<template>
  <p>{{ formattedDate }}</p>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({}),
  },
})

const formattedDate = computed(() => {
  if (!props.content || !props.content.date) return ''
  const date = new Date(props.content.date)
  return date.toLocaleDateString()
})
</script>