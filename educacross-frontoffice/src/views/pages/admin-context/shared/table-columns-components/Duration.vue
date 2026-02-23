<template>
  <p class="m-0">{{ formatDate(content.start) }} - {{ formatDate(content.expiration) }}</p>
</template>

<script setup>
  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })

  const formatDate = (data) => {
    const date = new Date(data)
    return date.toLocaleDateString()
  }
</script>