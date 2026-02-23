<template>
  <p class="m-0">
    {{ content.rankingEnabled ? 'Habilitado' : 'Desabilitado' }}
  </p>
</template>

<script setup>
  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })
</script>