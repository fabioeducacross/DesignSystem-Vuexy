<template>
  <div>
    <div class="progressbar-label">
      <p>{{ content.progress ? content.progress : 0 | formatNumber(0) }}%</p>
    </div>
    <b-progress :value="content.progress" :max="100" variant="success" height="5px" />
  </div>
</template>

<script setup>
import { BProgress } from 'bootstrap-vue'
import { formatNumber } from '@/filters/filters'

const props = defineProps({
  content: {
    type: Object,
    default: () => {},
  },
})
</script>

<style lang="scss" scoped>
  .progressbar-label {
    display: flex;
    align-items: center;

    p {
      margin-right: 8px;
      margin-bottom: 0;
    }

    .progressbar-alertIcon {
      height: 16px;
      width: 16px;
      color: #ff9f43;
    }
  }
</style>