<template>
  <div class="fullscreen-overlay" @click.self="handleClose">
    <!-- Image wrapper to capture pan events -->
    <div
      class="image-wrapper"
      @mousedown="startDrag"
      @mousemove="duringDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDrag"
      @touchmove="duringDrag"
      @touchend="endDrag"
    >
      <img
        :src="imageUrl"
        alt="Fullscreen Preview"
        :style="imageStyle"
        class="fullscreen-image"
        @click.stop
        @load="onImageLoad"
      />
    </div>
    <button class="close-fullscreen" @click="handleClose">&times;</button>
    <!-- Zoom controls -->
    <div class="zoom-controls">
      <button class="zoom-button" @click="zoomIn">+</button>
      <button class="zoom-button" @click="zoomOut">-</button>
      <button class="zoom-button" @click="resetZoom">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
})

// Emits
const emit = defineEmits(['close'])

// Reactive state
const zoomLevel = ref(1)
const offsetX = ref(0)
const offsetY = ref(0)
const isDragging = ref(false)
const startDragX = ref(0)
const startDragY = ref(0)
const startOffsetX = ref(0)
const startOffsetY = ref(0)

// Computed: Style for image
const imageStyle = computed(() => ({
  transform: `translate(${offsetX.value}px, ${offsetY.value}px) scale(${zoomLevel.value})`,
  transition: isDragging.value ? 'none' : 'transform 0.3s ease',
  cursor: isDragging.value ? 'grabbing' : 'grab',
}))

// Image load handler: center and fit image
const onImageLoad = e => {
  const img = e.target
  const naturalWidth = img.naturalWidth
  const naturalHeight = img.naturalHeight
  const containerWidth = window.innerWidth
  const containerHeight = window.innerHeight

  let scale = 1
  if (naturalWidth > containerWidth || naturalHeight > containerHeight) {
    scale = Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight)
  }
  zoomLevel.value = scale
  offsetX.value = (containerWidth - naturalWidth * scale) / 2
  offsetY.value = (containerHeight - naturalHeight * scale) / 2
}

// Zoom in, keeping the screen center fixed
const zoomIn = () => {
  const newZoom = Math.min(zoomLevel.value + 0.2, 3)
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2

  const imgCenterX = (cx - offsetX.value) / zoomLevel.value
  const imgCenterY = (cy - offsetY.value) / zoomLevel.value

  zoomLevel.value = newZoom
  offsetX.value = cx - newZoom * imgCenterX
  offsetY.value = cy - newZoom * imgCenterY
}

// Zoom out, keeping the screen center fixed
const zoomOut = () => {
  const newZoom = Math.max(zoomLevel.value - 0.2, 1)
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2

  const imgCenterX = (cx - offsetX.value) / zoomLevel.value
  const imgCenterY = (cy - offsetY.value) / zoomLevel.value

  zoomLevel.value = newZoom
  offsetX.value = cx - newZoom * imgCenterX
  offsetY.value = cy - newZoom * imgCenterY
}

// Reset zoom and center
const resetZoom = () => {
  const img = new window.Image()
  img.src = props.imageUrl
  img.onload = () => {
    const naturalWidth = img.naturalWidth
    const naturalHeight = img.naturalHeight
    const containerWidth = window.innerWidth
    const containerHeight = window.innerHeight

    let scale = 1
    if (naturalWidth > containerWidth || naturalHeight > containerHeight) {
      scale = Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight)
    }
    zoomLevel.value = scale
    offsetX.value = (containerWidth - naturalWidth * scale) / 2
    offsetY.value = (containerHeight - naturalHeight * scale) / 2
  }
}

// Drag start handler
const startDrag = e => {
  e.preventDefault()
  isDragging.value = true
  let clientX
  let clientY

  if (e.type === 'touchstart') {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }
  startDragX.value = clientX
  startDragY.value = clientY
  startOffsetX.value = offsetX.value
  startOffsetY.value = offsetY.value
}

// Drag move handler
const duringDrag = e => {
  if (!isDragging.value) return
  let clientX
  let clientY

  if (e.type === 'touchmove') {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }
  const deltaX = clientX - startDragX.value
  const deltaY = clientY - startDragY.value
  offsetX.value = startOffsetX.value + deltaX
  offsetY.value = startOffsetY.value + deltaY
}

// End drag
const endDrag = () => {
  isDragging.value = false
}

// Close overlay
const handleClose = () => {
  emit('close')
  resetZoom()
}
</script>

<style scoped>
  .fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .fullscreen-image {
    user-select: none;
    pointer-events: all;
    border-radius: 0;
    transform-origin: top left;
  }

  .close-fullscreen {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
  }

  .zoom-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
  }

  .zoom-button {
    background: rgba(255, 255, 255, 0.8);
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
</style>