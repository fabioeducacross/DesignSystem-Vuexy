<template>
  <div>
    <component :is="subjectComponent" :width="size" :height="size" />
  </div>
</template>

<script setup>
import MissionLiga from '@/assets/icons/mission-icons/MissionLiga.vue'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import { computed } from 'vue'

const props = defineProps({
  subjectId: { type: Number, required: true },
  size: { type: Number, required: false, default: 36 },
})

const subjectComponentMap = {
  1: MissionMath,
  2: MissionPort,
  3: MissionLiga,
  4: MissionMathIng,
}

const subjectComponent = computed(() => {
  return subjectComponentMap[props.subjectId] || null
})
</script>