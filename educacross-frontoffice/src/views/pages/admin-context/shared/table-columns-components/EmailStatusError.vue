<template>
  <div id="email-status">
    <b-badge
      pill
      :variant="getColorToStatus(content.emailStatus)"
      :class="`bg-st-${getColorToStatus(content.emailStatus)} color-${getColorToStatus(
        content.emailStatus,
      )}`"
    >
      {{ getLabelToStatus(content.emailStatus) }}
    </b-badge>
  </div>
</template>

<script setup>
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import userStatus from '@/consts/admin-context/enums/userStatus'
import { BBadge } from 'bootstrap-vue'

// Props
const props = defineProps({
  content: {
    type: Object,
    default: () => {},
  },
})

// Methods
const getColorToStatus = status => {
  switch (status) {
    case true:
      return 'success'
    case false:
      return 'danger'
    default:
      return ''
  }
}

const getLabelToStatus = status => {
  switch (status) {
    case true:
      return 'Finalizado'
    case false:
      return 'Erro no envio'
    default:
      return ''
  }
}
</script>