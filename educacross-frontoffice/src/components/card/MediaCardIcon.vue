<template>
  <div>
    <b-avatar :variant="variant" rounded="sm" size="lg">
      <span class="material-symbols-outlined">{{ icon }}</span>
    </b-avatar>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
  },
})

const icon = props.icon
const variant = props.variant
</script>