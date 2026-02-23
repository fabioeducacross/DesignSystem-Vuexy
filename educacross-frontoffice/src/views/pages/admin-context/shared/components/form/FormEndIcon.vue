<template>
  <div class="form-end-icon bg-st-success color-success mb-1">
    <feather-icon :icon="icon" size="48" />
  </div>
</template>

<script setup>
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

  const props = defineProps({
    icon: {
      type: String,
      default: 'CheckIcon',
      required: false,
    },
  })
</script>

<style lang="scss" scoped>
  .form-end-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem !important;
    width: fit-content;
    margin: 0 auto;

    border-radius: 0.625rem;
  }
</style>