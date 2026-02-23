<template>
  <div class="d-flex">
    <p
      class="status-chip"
      :class="content.enabled ? 'text-success bg-st-success' : 'text-danger bg-st-danger'"
    >
      {{ content.enabled ? 'Em andamento' : 'Finalizada' }}
    </p>
  </div>
</template>

<script setup>
  // Props
  const props = defineProps({
    content: {
      type: Object,
      default: () => ({
        enabled: false,
      }),
    },
  })

  // Expose prop for template
  const content = props.content
</script>

<style lang="scss" scoped>
  .status-chip {
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    margin: 8px;
    padding: 2px 8px 2px 8px;
    border-radius: 15px;
  }
</style>