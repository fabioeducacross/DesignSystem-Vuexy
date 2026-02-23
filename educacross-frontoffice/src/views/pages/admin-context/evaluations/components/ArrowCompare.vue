<template>
  <div class="d-flex flex-column gap-1" :class="`${classColor}`">
    <span class="triangle-up"> </span>
    <span class="triangle-down"> </span>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    valueInitial: {},
    valueToCompare: {},
  })

  const classColor = computed(() => {
    if (props.valueInitial > props.valueToCompare) {
      return 'up-color'
    }
    if (props.valueInitial < props.valueToCompare) {
      return 'down-color'
    }
    return ''
  })
</script>

<style lang="scss" scoped>
  @import '@core/scss/base/core/colors/palette-variables.scss';

  .triangle-up,
  .triangle-down {
    width: 0;
    height: 0;
    border-style: solid;
  }
  .triangle-down {
    border-width: 5.2px 3px 0 3px;
    border-color: #d0d2d6 transparent transparent transparent;
  }

  .triangle-up {
    border-width: 0 3px 5.2px 3px;
    border-color: transparent transparent #d0d2d6 transparent;
  }

  .up-color {
    .triangle-up {
      border-width: 0 3px 5.2px 3px;
      border-color: transparent transparent $success transparent;
    }
  }
  .down-color {
    .triangle-down {
      border-width: 5.2px 3px 0 3px;
      border-color: $danger transparent transparent transparent;
    }
  }
</style>