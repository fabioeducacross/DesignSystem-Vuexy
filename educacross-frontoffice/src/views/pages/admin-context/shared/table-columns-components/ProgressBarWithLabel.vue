<template>
  <div>
    <div class="progressbar-label">
      <p>{{ content.progress ? formatNumber(content.progress, 0) : 0 }}%</p>
      <span
        v-if="content.progress && content.progress < 50"
        v-b-tooltip.hover.bottom="'O progresso da turma está abaixo de 50%.'"
        class="material-symbols-outlined progressbar-alertIcon"
      >
        warning
      </span>
    </div>
    <BProgress
      :value="content.progress ? formatNumber(content.progress, 0) : 0"
      :max="100"
      variant="success"
      height="5px"
    />
  </div>
</template>

<script setup>
import { formatNumber } from '@/filters/filters'
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
      font-size: 16px;
      color: #ff9f43;
    }
  }
</style>