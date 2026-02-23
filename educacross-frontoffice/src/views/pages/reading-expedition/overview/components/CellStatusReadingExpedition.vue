<template>
  <div
    v-if="enumObject"
    class="position-absolute h-full w-full inset-0 d-flex align-items-center justify-content-center flex-column gap-1 text-uppercase"
    :class="enumObject.background"
  >
    <div v-if="enumObject.layout === 'badge'">
      <b-badge
        :pill="pill"
        :variant="`light-${enumObject.variant}`"
        :class="`border-${enumObject.variant} text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1 bg-transparent`"
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
    </div>

    <div v-else class="d-flex align-items-center gap-1">
      <span class="material-icons-outlined" :class="`text-${enumObject.variant}`">{{
        enumObject.icon
      }}</span>
      <small class="font-semibold uppercase" :class="`text-${enumObject.variant}`">{{
        enumObject.label
      }}</small>
    </div>

    <div v-if="time" class="d-flex align-items-center gap-1" :class="`text-${enumObject.variant}`">
      <span class="material-symbols-outlined" :style="`font-size: 16px`"> pace </span>
      <span class="font-bold">{{ time | formattedTime }}</span>
    </div>
  </div>
</template>

<script setup>
import {
  ExpeditionStageStatusEnum,
  ProficiencyTestStatusEnum,
} from '@/consts/ReadingExpeditionEnum.js'
import { computed } from 'vue'

// Props
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
})

// Enum mapping
const listOfEnums = {
  ExpeditionStageStatusEnum,
  ProficiencyTestStatusEnum,
}

const currentEnum = computed(() => {
  return listOfEnums[props.enum]
})

const enumObject = computed(() => {
  return currentEnum.value && currentEnum.value.find(e => e.rule(props.value))
})
</script>