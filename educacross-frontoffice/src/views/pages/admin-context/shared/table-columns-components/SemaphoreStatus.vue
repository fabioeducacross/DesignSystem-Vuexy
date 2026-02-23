<template>
  <div class="d-flex align-items-center justify-content-start gap-2">
    <div
      v-b-tooltip.hover.top="
        hasTooltip ? (tooltipText !== '' ? tooltipText : statusEnum.label) : false
      "
      class="range-circle"
      :class="`bg-${statusEnum.variant} ${size}`"
    />
    <slot />
  </div>
</template>

<script setup>
  // Props - DO NOT import defineProps (compiler macro)
  const props = defineProps({
    statusEnum: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    hasTooltip: {
      type: Boolean,
      required: false,
    },
    size: {
      type: String,
      required: false,
      default: 'default-size',
    },
    tooltipText: {
      type: String,
      required: false,
      default: '',
    },
  })

  // Props accessible directly in template, e.g. statusEnum, size, hasTooltip, tooltipText
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .bg-warning-secondary {
    background: $port !important;
  }

  .range-circle {
    border-radius: 50%;
  }

  .default-size {
    height: 14px;
    width: 14px;
  }

  .sm {
    height: 12px;
    width: 12px;
  }

  .small {
    height: 8px;
    width: 8px;
  }

  .pdf {
    height: 10px;
    width: 10px;
  }
</style>