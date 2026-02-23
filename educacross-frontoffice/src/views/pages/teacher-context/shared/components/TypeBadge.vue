<template>
  <b-badge
    pill
    :variant="$utilTeacherService.activityType.bgColorForBadge(activityType)"
    class="w-100 d-flex gap1 align-items-center justify-content-center gap-1"
  >
    <activity-icon :type="activityType" color="#fff" :size="13" />
    {{ $t($utilTeacherService.activityType.formatText(activityType)) }}
  </b-badge>
</template>

<script setup>
import ActivityIcon from './ActivityIcon.vue'

const props = defineProps({
  activityType: {
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>