<template>
  <div :class="email && email.length ? '' : 'italic opacity-50'">
    {{ email }}
  </div>
</template>

<script setup>
  // ⚠️ DO NOT change or analyze import section (none in this file)

  // Props
  const props = defineProps({
    content: {
      type: Object,
      default: () => ({ sponsorEmail: null }),
    },
  })

  // Refs/data
  const empty = ref(false)

  // Computed
  const email = computed(() => props.content.sponsorEmail)
</script>