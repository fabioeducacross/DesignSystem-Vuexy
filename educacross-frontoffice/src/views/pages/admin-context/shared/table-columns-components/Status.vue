<template>
  <b-badge
    pill
    :variant="getColorToStatus(content.status)"
    :class="`bg-st-${getColorToStatus(content.status)} color-${getColorToStatus(content.status)}`"
  >
    {{ content.status }}
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

const getColorToStatus = status => {
  switch (status) {
    case 'Pendente':
      return 'warning'
    case 'Ativo':
      return 'success'
    case 'Rejeitado':
      return 'danger'
    default:
      return ''
  }
}
</script>