<template>
  <div class="d-flex flex-no-wrap gap-2 align-items-center">
    <div
      class="question-status d-flex align-items-center justify-content-center"
      :class="`bg-${statusEnum.variant}`"
    >
      <span class="material-symbols-outlined" :class="statusEnum.textClass">
        {{ statusEnum.icon }}
      </span>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { getEQuestionAnswerStatusEnum, EQuestionAnswerStatus } from '@/consts/EQuestionAnswerStatus.js'
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: Number,
    default: EQuestionAnswerStatus.Undisplayed,
  },
})

const statusEnum = computed(() => getEQuestionAnswerStatusEnum(props.status))
</script>

<style lang="scss" scoped>
.question-status {
  width: 20px;
  height: 20px;

  border-radius: 50%;

  & > .material-symbols-outlined {
    font-size: 16px;
  }
}
</style>
