<template>
  <div :class="`bg-${variant}`" class="wrapper">
    <div class="toast-content">
      <b-avatar :variant="variant" size="40" class="mr-75 flex-shrink-0">
        <feather-icon :icon="icon" size="32" />
      </b-avatar>
      <div class="d-flex flex-grow-1">
        <div>
          <h5
            v-if="title"
            class="mb-0 font-weight-bolder toastification-title"
            :class="`text-${variant}`"
            v-text="title"
          />
          <small v-if="text" class="d-inline-block text-body toast-text" v-text="text" />
        </div>
        <span
          class="cursor-pointer toastification-close-icon ml-auto"
          @click="emit('close-toast')"
        >
          <feather-icon v-if="!hideClose" icon="XIcon" class="text-body toast-text" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { BAvatar } from 'bootstrap-vue'

  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['close-toast'])
</script>

<style lang="scss" scoped>
  .Vue-Toastification__toast .Vue-Toastification__toast--default {
    background: yellow !important;
  }

  .wrapper {
    padding: 16px;
  }

  .toast-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toastification-close-icon,
  .toastification-title {
    line-height: 26px;
  }

  .toastification-title,
  .toast-text {
    color: inherit;
    color: white !important;
  }
</style>