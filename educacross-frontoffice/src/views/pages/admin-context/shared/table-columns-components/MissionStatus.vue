<template>
  <b-badge
    pill
    :variant="getColorToStatus(content.situation)"
    :class="`bg-st-${getColorToStatus(content.situation)} color-${getColorToStatus(
      content.situation,
    )}`"
  >
    {{ getLabelToStatus(content.situation) }}
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
      case 'Started':
        return 'success'
      case 'Cancelled':
        return 'danger'
      case 'Finished':
        return 'primary'
      case 'NotSent':
        return 'warning'
      case 'NotStarted':
        return 'dark'
      default:
        return ''
    }
  }

  const getLabelToStatus = (status) => {
    switch (status) {
      case 'Started':
        return 'Iniciada'
      case 'Finished':
        return 'Finalizada'
      case 'Cancelled':
        return 'Cancelada'
      case 'NotSent':
        return 'Não enviada'
      case 'NotStarted':
        return 'Não iniciada'
      default:
        return ''
    }
  }
</script>