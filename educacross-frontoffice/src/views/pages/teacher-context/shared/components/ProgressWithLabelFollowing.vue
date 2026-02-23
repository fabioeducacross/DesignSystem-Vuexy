<template>
  <div>
    <div v-if="positionLabel === 'top'" class="text-right">
      <span class="color-patternSeven text-progress"> {{ data | formatNumber }}% </span>
    </div>
    <b-progress :value="data" :variant="colorProgress(data)" :max="100" height="10px">
      <b-progress-bar :value="data"> </b-progress-bar>
    </b-progress>
    <div v-if="positionLabel === 'bottom'" class="text-right" :style="`width:${data + 2}%`">
      <span class="color-patternSeven text-progress"> {{ data | formatNumber }}% </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  positionLabel: { type: String, default: 'top' },
  data: { type: Number, required: false, default: 0 },
  color: { type: String, required: false, default: '' },
  activeProgressColor: { type: Boolean, default: false },
})

const colorProgress = (progress) => {
  if (props.activeProgressColor) {
    if (progress <= 49) return 'danger'
    if (progress <= 69) return 'warning'
    if (progress <= 89) return props.color
    return 'success'
  }
  return props.color
}
</script>

<style lang="scss" scoped>
  .text-progress {
    font-size: 12px;
    line-height: 21px;
  }
</style>