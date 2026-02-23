<template>
  <div
    class="checkbox-container"
    :class="{ disabled: isDisabled }"
    @click="toggleCheckbox"
  >
    <span
      v-if="!isDisabled || (isDisabled && isIndeterminate)"
      class="material-symbols-outlined"
      :class="checkboxClass"
    >
      {{ checkboxIcon }}
    </span>
    <label :class="checkboxClass">{{ label }}</label>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'

// Props
const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  indeterminateClass: {
    type: String,
    default: 'text-gray',
  },
})

// Emits
const emit = defineEmits(['update:checked', 'update:indeterminate'])

// Reactive state
const isChecked = ref(props.checked)
const isIndeterminate = ref(props.indeterminate)
const isDisabled = ref(props.disabled)

watchEffect(() => {
  isChecked.value = props.checked
  isIndeterminate.value = props.indeterminate
  isDisabled.value = props.disabled
})

const checkboxIcon = ref('check_box_outline_blank')
watchEffect(() => {
  if (isIndeterminate.value) {
    checkboxIcon.value = 'indeterminate_check_box'
  } else if (isChecked.value) {
    checkboxIcon.value = 'check_box'
  } else {
    checkboxIcon.value = 'check_box_outline_blank'
  }
})

const toggleCheckbox = () => {
  if (isDisabled.value) return
  if (isIndeterminate.value || !isChecked.value) {
    isChecked.value = true
    isIndeterminate.value = false
  } else {
    isChecked.value = false
  }
  emit('update:checked', isChecked.value)
  emit('update:indeterminate', isIndeterminate.value)
}

const checkboxClass = computed(() => {
  if (isIndeterminate.value) return props.indeterminateClass
  if (isChecked.value) return 'text-primary'
  return ''
})
</script>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 24px;
}

.checkbox-container.disabled {
  cursor: not-allowed;
  color: var(--secondary);
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  box-shadow: none;
}
</style>