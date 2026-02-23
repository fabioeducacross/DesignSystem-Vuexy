<template>
  <div>
    <WordList v-if="exerciseId === 1" :width="size" :height="size" />
    <FullText v-else-if="exerciseId === 2" :width="size" :height="size" />
  </div>
</template>

<script setup>
import FullText from '@/assets/icons/exercises-types/FullText.vue'
import WordList from '@/assets/icons/exercises-types/WordList.vue'

const props = defineProps({
  exerciseId: { type: Number, required: true },
  size: { type: Number, required: false, default: 36 },
})

const { exerciseId, size } = props
</script>