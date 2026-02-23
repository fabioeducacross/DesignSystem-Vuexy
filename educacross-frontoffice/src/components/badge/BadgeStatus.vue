<template>
  <b-badge
    v-if="enumObject"
    :pill="pill"
    :variant="`light-${enumObject.variant}`"
    :class="`border-${enumObject.variant} text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1 ${badgeClass}`"
    @click="emit('click')"
  >
    <span
      v-if="!pill"
      :class="`material-symbols-outlined text-${enumObject.variant}`"
      style="font-size: 12px"
    >
      person_edit
    </span>
    {{ enumObject.label }}
  </b-badge>
</template>

<script setup>
import { computed } from 'vue'
import { getVariantByRule } from '@/consts/legends/index.js'

const props = defineProps({
  value: {},
  enum: {
    type: String,
    default: null,
  },
  pill: {
    type: Boolean,
    default: true,
  },
  time: {
    type: Number,
    default: 0,
    required: false,
  },
  action: {
    type: Function,
    required: false,
  },
  badgeClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

const enumObject = computed(() => {
  return getVariantByRule(props.value, props.enum)
})
</script>

<style lang="scss" scoped>
.badge-light-dark-gray,
.badge-light-light-gray {
  background: #fff;
}
.whitespace-normal {
  white-space: normal !important;
}
</style>