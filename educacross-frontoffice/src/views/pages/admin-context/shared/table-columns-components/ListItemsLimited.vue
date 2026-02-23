<template>
  <div class="d-flex gap-1 flex-wrap">
    <div v-for="(item, index) in list" :key="index">
      <slot name="item" :data="item" />
    </div>
    <div v-if="excess.length" :id="`popover-target-${uid}`">
      <slot name="excess" :data="excess.length" />
    </div>

    <b-popover
      v-if="excess.length"
      :target="`popover-target-${uid}`"
      triggers="hover"
      placement="bottomright"
      variant="white"
    >
      <div class="d-flex flex-col gap-2">
        <div v-for="(item, index) in excess" :key="index">
          <slot name="item" :data="item" />
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: false,
    default: () => [],
  },
  limit: {
    type: Number,
    required: false,
    default: 10,
  },
})

const uid = getCurrentInstance().uid

const list = computed(() => props.data.slice(0, props.limit))
const excess = computed(() =>
  props.data.length > props.limit ? props.data.slice(props.limit) : [],
)
</script>