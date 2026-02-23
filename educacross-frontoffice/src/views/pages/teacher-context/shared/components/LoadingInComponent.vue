<template>
  <div>
    <div
      v-if="isLoading"
      :style="`background: ${isBackgroundTransparent ? '' : background};`"
      class="d-flex justify-content-center align-items-center loading-in-component"
    >
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    background: { type: String, default: '#f8f8f8' },
    isBackgroundTransparent: { type: Boolean, default: false },
    id: { type: Number, default: 1 },
  })

  const isLoading = ref(false)

  const startLoading = () => {
    isLoading.value = true
  }

  const finishLoading = () => {
    isLoading.value = false
  }

  defineExpose({
    startLoading,
    finishLoading,
    isLoading,
  })
</script>

<style lang="scss" scoped>
  .loading-in-component {
    z-index: 10;
    min-height: 125px;
  }
</style>