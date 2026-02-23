<template>
  <div :class="containerClass">
    <b-img src="@/assets/images/educateca/Img.svg" fluid :class="imageClass" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BImg } from 'bootstrap-vue'

// Props
const props = defineProps({
  isFullscreen: {
    type: Boolean,
    default: false,
  },
})

// Computed
const containerClass = computed(() =>
  props.isFullscreen ? 'fullscreen-image-container' : 'album-cover-container'
)
const imageClass = computed(() =>
  props.isFullscreen ? 'fullscreen-image rounded' : 'mb-50 w-100 rounded'
)
</script>

<style scoped>
.album-cover-container {
  position: relative;
  width: 100%;
  height: auto;
  display: block;
}

.fullscreen-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Regular album cover styles */
.mb-50 {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
}

@media (max-width: 768px) {
  .fullscreen-image-container {
    max-height: 30vh;
  }
}

@media (max-width: 480px) {
  .fullscreen-image {
    max-height: 25vh;
  }
}
</style>