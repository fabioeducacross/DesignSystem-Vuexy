<template>
  <section class="d-flex flex-column flex-md-row gap-2">
    <b-card
      v-for="(item, index) in items"
      :key="index"
      class="flex-1 border-2 position-relative"
      :class="active === index ? activeClass(item) : null"
    >
      <span
        v-if="active === index"
        v-b-tooltip.hover="tooltipActiveText"
        class="material-symbols-outlined position-absolute"
        :class="`text-${item.variant}`"
        style="right: 10px; top: 10px; font-size: 16px"
      >info</span>
      <div class="text-center mb-1">
        <MediaCardIcon :icon="item.icon" :variant="item.variant" class="mb-1" />
        <h6 class="font-weight-bolder text-body">{{ item.title }}</h6>
      </div>
      <slot :name="`content-${index}`" :item="item" />
    </b-card>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'

// Props
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  active: {
    type: Number,
    default: null,
  },
  tooltipActiveText: {
    type: String,
    required: false,
    default: 'Maior percentual de alunos nesta faixa de proficiência.',
  },
})

// Methods
const activeClass = item => {
  return `border-${item.variant} shadow-${item.variant}`
}
</script>