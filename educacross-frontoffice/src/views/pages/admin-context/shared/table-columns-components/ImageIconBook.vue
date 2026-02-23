<template>
  <div class="container" :style="styles">
    <div :id="content.bookId" class="figure">
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
    <span v-if="!!content.bookName" class="caption">
      {{ content.bookName }}
    </span>
  </div>
</template>

<script setup>
const colors = {
  1: '#00BDB8',
  2: '#EC6300',
  3: '#56124F',
}

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
})

const getColorBySubjectId = (subjectId) => {
  return colors[subjectId]
}

import { computed } from 'vue'
const styles = computed(() => {
  return {
    '--background-color': getColorBySubjectId(props.content.subjectId),
  }
})
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    align-items: center;
  }

  .figure {
    width: 24px;
    height: 24px;
    background-color: var(--background-color);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image {
    display: block;
    width: 70%;
    height: 70%;
    object-fit: contain;
  }

  .caption {
    margin-left: 8px;
    font-weight: 600;
    color: #6e6b7b;
    font-size: 14px;
    line-height: 1.72;
  }
</style>