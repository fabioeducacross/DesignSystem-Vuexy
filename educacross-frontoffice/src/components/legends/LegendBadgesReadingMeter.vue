<template>
  <div class="d-flex gap-1">
    <b-badge
      v-for="(item, index) in legend"
      :key="index"
      :variant="getReadingProficiencyEnum(item.type).variant"
      :class="{
        'bg-white': contrastMode,
        ['text-' + getReadingProficiencyEnum(item.type).variant]: contrastMode,
      }"
      class="d-flex align-items-center"
      pill
    >
      <span class="font-10">{{ item.label }}</span>
    </b-badge>
  </div>
</template>

<script setup>
import { getReadingProficiencyEnum } from '@/consts/ReadingMeterEnum'

const props = defineProps({
  legend: {
    type: Array,
    required: true,
  },
  contrastMode: {
    type: Boolean,
    default: false,
  },
})
</script>