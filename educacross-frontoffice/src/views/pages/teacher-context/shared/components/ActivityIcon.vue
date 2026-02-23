<template>
  <span class="material-symbols-outlined" :style="{ color: getSystemColor, fontSize: size + 'px' }">
    {{ getIcon }}
  </span>
</template>

<script setup>
  // Props
  const props = defineProps({
    type: { type: [Number, String], required: true },
    size: { type: Number, required: false, default: 28 },
    color: { type: String, required: false, default: null },
  })

  // Computed: getIcon
  import { computed } from 'vue'
  const getIcon = computed(() => {
    switch (props.type) {
      case 1:
        return 'person'
      case 2:
        return 'people_alt'
      case 3:
        return 'person_add'
      case 'Individual':
        return 'person'
      case 'Collective':
        return 'people_alt'
      case 'Mixed':
        return 'person_add'
      default:
        return 'person'
    }
  })

  // Computed: getSystemColor
  const getSystemColor = computed(() => {
    if (props.color) {
      return props.color
    }

    switch (props.type) {
      case 1:
        return '#f26f21'
      case 2:
        return '#0d6efd'
      default:
        return '#28c76f'
    }
  })
</script>