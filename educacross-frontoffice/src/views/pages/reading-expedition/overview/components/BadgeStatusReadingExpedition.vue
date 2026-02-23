<template>
  <b-badge
    v-if="enumObject"
    :pill="pill"
    :variant="`light-${enumObject.variant}`"
    :class="`border-${enumObject.variant} text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1`"
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
</template>

<script setup>
  import {
    ExpeditionStageStatusEnum,
    ProficiencyTestStatusEnum,
  } from '@/consts/ReadingExpeditionEnum.js'
  import { computed } from 'vue'

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

  const listOfEnums = {
    ExpeditionStageStatusEnum,
    ProficiencyTestStatusEnum,
  }

  const currentEnum = computed(() => {
    return listOfEnums[props.enum]
  })

  const enumObject = computed(() => {
    return currentEnum.value?.find(e => e.rule(props.value))
  })
</script>

<style lang="scss" scoped>
  .badge-light-dark-gray,
  .badge-light-light-gray {
    background: #fff;
  }
</style>