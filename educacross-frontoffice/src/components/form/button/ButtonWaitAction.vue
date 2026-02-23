<template>
  <b-button
    :disabled="disabled || waitAction"
    class="d-flex align-items-center"
    :variant="variant"
    @click="handleEventClick"
  >
    <b-spinner v-if="waitAction" small />
    {{ label }}
    <slot />
  </b-button>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['click'])

// Local State
const waitAction = ref(false)

// Methods
const handleEventClick = () => {
  waitAction.value = true
  new Promise(resolve => emit('click', resolve)).then(() => {
    waitAction.value = false
  })
}
</script>