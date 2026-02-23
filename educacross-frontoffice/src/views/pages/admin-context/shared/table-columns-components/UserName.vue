<template>
  <div :class="{ 'italic opacity-50': !userName.length }">
    {{ userName }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({ sponsorName: null }),
  },
})

const userName = computed(() => {
  const name = props.content.userName

  if (name) {
    if (name.length === 0) {
      return 'Sem responsável cadastrado'
    }
  } else {
    return 'Sem responsável cadastrado'
  }

  return name
})
</script>