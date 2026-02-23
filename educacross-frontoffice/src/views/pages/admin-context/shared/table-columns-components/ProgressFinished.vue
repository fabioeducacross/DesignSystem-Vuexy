<template>
  <div>
    <p>{{ content.finishedActivities }} de {{ content.totalActivities }} jogos finalizados</p>
    <b-progress
      :value="content.finishedActivities"
      :max="content.totalActivities"
      variant="success"
      height="5px"
    />
  </div>
</template>

<script setup>
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
  import { BProgress } from 'bootstrap-vue'

  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })
</script>

<style lang="scss" scoped>
  .progressbar-label {
    display: flex;
    align-items: center;

    p {
      margin-right: 8px;
      margin-bottom: 0;
    }

    .progressbar-alertIcon {
      height: 16px;
      width: 16px;
      color: #ff9f43;
    }
  }
</style>