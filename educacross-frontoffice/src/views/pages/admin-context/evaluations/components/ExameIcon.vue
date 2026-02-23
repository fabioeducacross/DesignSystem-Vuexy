<template>
  <component :is="name" v-bind="$props" />
</template>

<script setup>
  import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
  import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
  })
</script>