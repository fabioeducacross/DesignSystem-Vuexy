<template>
  <b-badge :style="getColorToStatus(content.percentage)" class="contentPercentage">
    <div class="contentPercentageText">
      <span>{{ content.percentage }}%</span>
    </div>
  </b-badge>
</template>

<script setup>
import { BBadge } from 'bootstrap-vue'

const props = defineProps({
  content: {
    type: Object,
    default: () => {},
  },
})

const getColorToStatus = (percentage) => {
  if (percentage >= 0 && percentage <= 50) {
    return 'background: linear-gradient(180deg, #FE5153 0%, #FF8889 100%); border: none'
  }
  if (percentage >= 51 && percentage <= 75) {
    return 'background: linear-gradient(180deg, #FFB443 0%, #FFC774 100%); border: none'
  }
  if (percentage >= 76 && percentage <= 90) {
    return 'background: linear-gradient(180deg, #8BC728 0%, #AEED48 100%); border: none'
  }
  if (percentage >= 91 && percentage <= 100) {
    return 'background: linear-gradient(180deg, #00BDB8 0%, #37D7D2 100%); border: none'
  }

  return ''
}
</script>
<style lang="scss">
  .contentPercentage {
    border-radius: 100px;
    margin-right: 0.7rem;

    width: 4rem;
    height: 3.5rem;
    .contentPercentageText {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;

      span {
        font: Montserrat, sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        text-transform: uppercase;
      }
    }
  }
</style>