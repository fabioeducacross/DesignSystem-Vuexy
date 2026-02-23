<template>
  <div class="w-full">
    <div class="rainbow-bar"></div>
    <div class="triangle-rainbow-bar mb-50" :style="styleTriangle"></div>
    <slot name="legend"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  value: {
    type: Number,
    default: 0,
    required: true,
  },
})

// Computed
const styleTriangle = computed(() => {
  let value = props.value
  if (value > 100) value = 100

  let offset = 0

  if (value < 4) {
    offset = 4
  } else if (value > 96) {
    offset = -4
  }

  return {
    clipPath: `polygon(
      calc(${value}% + ${offset}px) 0%,
      calc(${value}% + ${offset - 4}px) 100%,
      calc(${value}% + ${offset + 4}px) 100%
    )`,
  }
})
</script>

<style lang="scss" scoped>
.triangle-rainbow-bar {
  margin-top: 3px;
  position: relative;
  height: 8px;
  background: linear-gradient(
    90deg,
    #ea5455 -1.31%,
    #ffb443 34.59%,
    #28c76f 66.8%,
    #7367f0 100.06%
  );
}
.rainbow-bar {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
    90deg,
    #ea5455 -1.31%,
    #ffb443 34.59%,
    #28c76f 66.8%,
    #7367f0 100.06%
  );
}
</style>