<template>
  <div>
    <span v-if="content.serieName" class="d-flex flex-wrap">
      <span v-if="content.className" class="name-no-tag">
        {{ content.className }}
      </span>
      <span v-else class="name">
        {{ content.name }}
      </span>
      <school-year-badge :text="content.serieName" />
    </span>
    <span v-else-if="content.serie" class="d-flex flex-wrap">
      <span class="name mr-1">{{ content.name }}</span>
      <school-year-badge :text="content.serie.name" />
    </span>
    <span v-else class="d-flex flex-wrap">
      <span class="name">{{ content.className }} </span>
    </span>
  </div>
</template>

<script setup>
import SchoolYearBadge from '@components/SchoolYearBadge'

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
  .name {
    margin-bottom: 5px;
    white-space: nowrap;
  }

  .name-no-tag {
    line-height: 1.5em;
    height: auto;
    overflow: hidden;
  }
</style>