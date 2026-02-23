<template>
  <b-badge
    pill
    :variant="getColorToStatus(content.status)"
    :class="`bg-st-${getColorToStatus(content.status)} color-${getColorToStatus(content.status)}`"
  >
    {{ getLabelToStatus(content.status) }}
  </b-badge>
</template>

<script setup>
  import userStatus from '@/consts/admin-context/enums/userStatus'
  import { BBadge } from 'bootstrap-vue'

  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })

  const getColorToStatus = (status) => {
    switch (status) {
      case 'Processing':
        return 'warning'
      case 'Failed':
        return 'danger'
      case 'Completed':
        return 'primary'
      default:
        return ''
    }
  }

  const getLabelToStatus = (status) => {
    switch (status) {
      case 'Processing':
        return 'Em andamento'
      case 'Completed':
        return 'Finalizada'
      case 'Failed':
        return 'Erro'
      default:
        return ''
    }
  }
</script>