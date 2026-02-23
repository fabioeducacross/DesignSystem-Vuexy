<template>
  <div class="flex-grow-1">
    <template v-if="isEmpty">
      <b-badge v-if="layout === 'badge'" variant="light-primary" class="text-uppercase" pill>
        Não há dados para exibir
      </b-badge>
      <div v-else class="d-flex flex-column align-items-center justify-content-center h-100">
        <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
        <span
          class="text-center font-bold"
          :class="titleColor ? titleColor : 'text-primary'"
          v-html="$t('noInformationFound')"
        ></span>
        <slot name="empty"></slot>
      </div>
    </template>
    <slot v-else></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number, Object, Array, Boolean, Function, null, undefined],
    default: undefined,
  },
  layout: {
    type: String,
  },
  titleColor: {
    type: String,
    default: 'text-primary',
    required: false,
  },
})

const isEmpty = computed(() => {
  const { value } = props

  if (value === undefined || value === null) {
    return true
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    return Object.entries(value).length === 0
  }
  if (typeof value === 'boolean') {
    return !value
  }
  if (typeof value === 'function') {
    return value()
  }
  return false
})
</script>

<style scoped lang="scss">
.badge {
  font-size: 10px;
  font-weight: 700;
}
</style>