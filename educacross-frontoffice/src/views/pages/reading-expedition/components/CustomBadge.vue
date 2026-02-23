<template>
  <div
    class="badge border"
    :class="computedClasses"
    style="padding: 2px 5px"
    @click="emit('click')"
  >
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script setup>
  import { computed, toRefs } from 'vue'

  // Props
  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
    },
    borderVariant: {
      type: String,
      default: null,
    },
    backgroundVariant: {
      type: String,
      default: null,
    },
    textVariant: {
      type: String,
      default: null,
    },
    pill: {
      type: Boolean,
      default: false,
    },
  })

  // Emits
  const emit = defineEmits(['click'])

  const { variant, borderVariant, backgroundVariant, textVariant, pill } = toRefs(props)

  const computedClasses = computed(() => {
    const borderVariantValue = borderVariant.value || `border-${variant.value}`
    const textVariantValue = textVariant.value || `text-${variant.value}`
    const backgroundVariantValue = backgroundVariant.value || `bg-light-${variant.value}`

    return {
      badge: true,
      [borderVariantValue]: true,
      [backgroundVariantValue]: true,
      [textVariantValue]: true,
      'badge-pill': pill.value,
    }
  })
</script>

<style scoped>
  .bg-light-orange {
    background: rgba(255, 159, 67, 0.12);
  }

  .border-orange {
    border: 1px solid #ff9f43;
  }
  .border-dark-gray {
    border-color: #6e6b7b !important;
    color: #6e6b7b !important;
  }
</style>