<template>
  <div :class="`input-feedback ${getClass}`">
    <feather-icon :icon="getIcon" size="16" class="input-feedback-icon" />
    <div class="input-feedback-text">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
})

const getIcon = computed(() => {
  switch (props.type) {
    case 'success':
      return 'UserCheckIcon'
    default:
      return 'UserIcon'
  }
})

const getClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-st-success color-success'
    default:
      return 'bg-st-warning color-warning'
  }
})
</script>

<style lang="scss">
  .input-feedback {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 4px;

    .input-feedback-icon {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.3rem;
      margin-right: 6px;

      &.color-warning {
        color: #a98430;
      }

      &.color-success {
        color: #28c76f;
      }
    }
  }
</style>