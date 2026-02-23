<template>
  <div :id="data.id" class="tag d-flex content align-items-center" :style="styles">
    <feather-icon v-if="!!data.icon" size="16px" :icon="data.icon" class="tag-icon" />
    <slot v-else />
    <b-tooltip
      triggers="hover"
      :delay="{ show: 10, hide: 10 }"
      :target="data.id"
      :title="data.text"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BTooltip } from 'bootstrap-vue-next'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const styles = computed(() => ({
  '--tag-background-color': props.data.color,
}))
</script>

<style lang="scss" scoped>
  .tag {
    border-radius: 8px;
    width: 24px;
    height: 24px;
    background-color: var(--tag-background-color);
    .tag-icon {
      color: #fff;
    }
  }
</style>