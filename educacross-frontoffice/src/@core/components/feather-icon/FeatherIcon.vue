<template>
  <span v-if="badge" class="feather-icon position-relative">
    <component :is="Feather" :size="size" v-bind="listeners" v-on="$listeners" @click="$emit('click', $event)" />
    <span class="badge badge-up badge-pill" :class="badgeClasses">{{ badge }}</span>
  </span>
  <component
    v-else
    :is="Feather"
    :size="size"
    v-bind="listeners"
    v-on="$listeners"
    @click="$emit('click', $event)"
  />
</template>

<script setup>
import * as icons from 'vue-feather-icons'

const props = defineProps({
  icon: {
    required: true,
    type: [String, Object],
  },
  size: {
    type: String,
    default: '14',
  },
  badge: {
    type: [String, Object, Number],
    default: null,
  },
  badgeClasses: {
    type: [String, Object, Array],
    default: 'badge-primary',
  },
})

const emit = defineEmits(['click'])

const listeners = {}

const Feather = typeof props.icon === 'string' ? icons[props.icon] : props.icon
</script>

<style lang="scss">
  svg.feather {
    outline: none;
  }
</style>