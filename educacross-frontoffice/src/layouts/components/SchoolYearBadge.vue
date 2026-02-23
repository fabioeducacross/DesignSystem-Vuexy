<template>
  <b-badge
    pill
    variant="light-primary"
    class="badge-limit"
    :class="{ 'bg-white text-primary': selected }"
  >
    {{ text }}
  </b-badge>
</template>

<script setup>
  // ⚠️ Do NOT import defineProps (compiler macro, available globally)
  const props = defineProps({
    text: { type: String },
    selected: { type: Boolean, default: false },
  })

  // Destructure for direct use in template
  const { text, selected } = props
</script>

<style scoped>
  .badge-limit {
    max-height: 20px;
  }
</style>