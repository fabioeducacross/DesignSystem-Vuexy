<template>
  <div>
    <b-badge
      v-if="missionTypeEnum[content.type]"
      pill
      :variant="missionTypeEnum[content.type].variant"
    >
      <div class="d-flex align-items-center gap-1">
        <span class="material-icons" style="font-size: 16px">
          {{ missionTypeEnum[content.type].icon }}
        </span>
        <span> {{ missionTypeEnum[content.type].label }} </span>
      </div>
    </b-badge>
  </div>
</template>

<script setup>
  import { missionTypeEnum } from '@/consts/missionsEnum.js'

  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })
</script>

<style lang="scss" scoped>
  .bold {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
</style>