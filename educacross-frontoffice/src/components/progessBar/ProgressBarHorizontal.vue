<template>
  <div :class="progressBarContainerClass">
    <b-row class="mb-50">
      <b-col v-if="label">
        <div class="text-left">
          <span class="font-bold" :class="labelClass">
            {{ $t(label) }}
          </span>
          <slot></slot>
        </div>
      </b-col>
      <b-col cols="auto">
        <span
          v-if="!positionBottom"
          class="font-bold"
          :class="getColors(value, progressBarColors).textVariant"
        >
          {{ formatDecimalPlace(value) }}
        </span>
        <slot name="right-content"></slot>
      </b-col>
    </b-row>

    <div class="rounded-lg" :class="getColors(value, progressBarColors).background">
      <b-progress
        v-b-tooltip.hover.top="`${formatDecimalPlace(value)}% ${sufix}`"
        :variant="getColors(value, progressBarColors).variant"
        :value="formatDecimalPlace(value)"
        max="100"
        height="5px"
      />
    </div>
    <h6
      v-if="positionBottom"
      class="font-bold"
      :class="getColors(value, progressBarColors).textVariant"
    >
      {{ formatDecimalPlace(value) }}
    </h6>
    <div :class="sufixClass">
      <span>
        {{ sufix }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { getColors, progressBarEnum } from '@/consts/rangeColors'
import { formatDecimalPlace } from '@/utils/number.js'

const props = defineProps({
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  label: {
    type: String,
    required: false,
  },
  progressBarColors: {
    type: Array,
    required: false,
    default: () => progressBarEnum,
  },
  sufix: {
    type: String,
    required: false,
    default: '',
  },
  sufixClass: {
    type: String,
  },
  positionBottom: {
    type: Boolean,
    required: false,
    default: false,
  },
  progressBarContainerClass: {
    type: String,
    required: false,
    default: 'mb-2',
  },
  labelClass: {
    type: String,
    required: false,
  },
})

// Filters are globally registered in Vue 2.7; no import needed for formatPercentToPtBr
</script>

<style lang="scss" scoped>
.font-size-md {
  font-size: 14px;
}

.bg-progress-bar-danger {
  background: rgba(234, 84, 85, 0.12);
}

.bg-progress-bar-warning {
  background: rgba(250, 184, 74, 0.12);
}

.bg-progress-bar-success {
  background: rgba(40, 199, 111, 0.12);
}
</style>