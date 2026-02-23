<template>
  <span class="d-flex align-items-center chip" :style="styles">
    <small>{{ data.text }} </small>
  </span>
</template>

<script setup>
  // ⚠️ Preserve imports: none in this file

  // Props
  const props = defineProps({
    data: { required: true },
  })

  // Computed
  import { computed } from 'vue'
  const styles = computed(() => ({
    '--chip-color': props.data.color,
    '--chip-background-color': `${props.data.color}33`,
  }))
</script>
<style lang="scss" scoped>
  .chip {
    padding: 2px 8px;
    max-width: fit-content;
    border-radius: 100px;
    color: var(--chip-color);
    background-color: var(--chip-background-color);

    small {
      font-size: 12px;
      line-height: 1.34;
      font-weight: 500;
      letter-spacing: -0.1px;
    }
  }
</style>