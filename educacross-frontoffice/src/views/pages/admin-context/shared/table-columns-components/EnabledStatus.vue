<template>
  <b-badge
    pill
    :variant="getColorToStatus(content.enabled)"
    :class="`bg-st-${getColorToStatus(content.enabled)} color-${getColorToStatus(content.enabled)}`"
  >
    {{ getLabelToStatus(content.enabled, content.lang) }}
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

  const getColorToStatus = (status) => {
    switch (status) {
      case true:
        return 'success'
      case false:
        return 'dark'
      default:
        return ''
    }
  }

  const getLabelToStatus = (status, lang) => {
    if (lang === 'en') {
      switch (status) {
        case true:
          return 'Enabled'
        case false:
          return 'Disabled'
        default:
          return ''
      }
    } else {
      switch (status) {
        case true:
          return 'Habilitada'
        case false:
          return 'Desabilitada'
        default:
          return ''
      }
    }
  }
</script>