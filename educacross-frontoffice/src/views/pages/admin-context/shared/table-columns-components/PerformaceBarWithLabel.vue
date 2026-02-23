<template>
  <div class="progressbar">
    <div class="progressbar-label">
      <p>{{ displayPerformance }}%</p>
    </div>
    <b-progress
      :value="progressValue"
      :max="100"
      variant="primary"
      height="5px"
    />
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

  const displayPerformance = computed(() => {
    // Performance may be 0, so check for number
    const value = typeof props.content.performance === 'number'
      ? props.content.performance
      : 0
    return formatNumber(value, 0)
  })

  const progressValue = computed(() => {
    return typeof props.content.performance === 'number'
      ? Math.round(props.content.performance)
      : 0
  })
</script>

<style lang="scss" scoped>
  .progressbar {
    padding: 0rem 0.5rem;
  }
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