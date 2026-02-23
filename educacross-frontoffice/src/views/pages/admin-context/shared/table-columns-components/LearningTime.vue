<template>
  <div
    class="d-flex flex-start w-100"
    :class="content.time === 0 || content.time === 'undefined' ? 'alert-style' : ''"
  >
    <feather-icon class="watch-icon" icon="WatchIcon" />
    {{ formatTime }}
  </div>
</template>

<script setup>
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
  import { formattedTime } from '@/utils/utils'

  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })

  const formatTime = computed(() => {
    return formattedTime(props.content.time, 'Não jogou')
  })
</script>

<style lang="scss" scoped>
  .watch-icon {
    width: 24px;
    height: 24px;
    display: inline;
    margin-left: 1rem;
  }

  .alert-style {
    color: #ea5455;
  }
</style>