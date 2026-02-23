<template>
  <div class="d-flex flex-no-wrap">
    <div class="d-flex flex-no-wrap gap-2">
      <div v-for="(item, index) in limitedArray" :key="item.id" class="relative">
        <b-avatar
          v-b-tooltip.hover.top="item.name"
          :variant="colors[index]"
          :text="getInitials(item.name)"
        />
      </div>
    </div>
    <div v-if="moreArray.length" class="d-flex align-items-center ml-1">
      <b-badge
        :id="`popover-target-${uid}`"
        pill
        :variant="light ? 'light-primary' : 'primary'"
      >
        +{{ moreArray.length }}
      </b-badge>
      <b-popover :target="`popover-target-${uid}`" triggers="hover" placement="bottomright">
        <ul class="mb-0">
          <li v-for="item in moreArray" :key="item.id" class="mb-50">
            {{ item.name }}
          </li>
        </ul>
      </b-popover>
    </div>
  </div>
</template>

<script setup>
import useInitials from '@/@core/mixins/ui/avatar.js'
import { computed, getCurrentInstance } from 'vue'

// Props
const props = defineProps({
  maxIterations: {
    type: Number,
    default: 3,
  },
  data: {
    type: Array,
    default: () => [],
  },
  light: {
    type: Boolean,
    default: true,
    required: false,
  },
})

// UID for popover target
const uid = getCurrentInstance().uid

// Avatar color variants for the first avatars
const colors = ['success', 'info', 'primary']

// Get initials method from useInitials mixin
const { getInitials } = useInitials()

// Computed: display up to maxIterations avatars
const limitedArray = computed(() => {
  return props.data.slice(0, props.maxIterations)
})

// Computed: array of remaining users for the popover
const moreArray = computed(() => {
  return props.data.slice(props.maxIterations)
})

// For use in template
const light = props.light
</script>

<style lang="scss" scoped>
.auxiliar-badge {
  font-size: 11px;
  width: 14px;
  height: 14px;
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: center;
  border-radius: 50%;
  border: 2px solid #fff;
  line-height: 1;
}
</style>