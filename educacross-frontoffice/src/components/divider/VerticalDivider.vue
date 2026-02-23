<template>
  <div :class="['vertical-divider', `bg-${variant}`, 'h-100']"></div>
</template>

<script setup>
  // Props
  const props = defineProps({
    variant: {
      type: String,
    },
  })

  // Variant for class binding
  const variant = props.variant
</script>

<style lang="scss" scoped>
.vertical-divider {
  &::before {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
  }
}
</style>