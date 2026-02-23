<template>
  <div class="d-flex">
    <div class="d-flex mr-1">
      <img
        v-if="content.subjectId === 3"
        v-b-tooltip.hover.bottom="'Liga das Corujinhas'"
        src="@/assets/icons/mission-icons/missao-liga.svg"
      />

      <img
        v-if="content.subjectId === 1"
        v-b-tooltip.hover.bottom="'Matemática'"
        src="@/assets/icons/mission-icons/missao-math.svg"
      />

      <img
        v-if="content.subjectId === 2"
        v-b-tooltip.hover.bottom="'Língua Portuguesa'"
        src="@/assets/icons/mission-icons/missao-portugues.svg"
      />
    </div>
    <span v-if="content.guideName">{{ content.guideName }}</span>
  </div>
</template>

<script setup>
  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })
</script>

<style lang="scss" scoped>
  span {
    margin-bottom: 6px;
    color: #6e6b7b;
  }

  img {
    margin-right: 6px;
  }
</style>