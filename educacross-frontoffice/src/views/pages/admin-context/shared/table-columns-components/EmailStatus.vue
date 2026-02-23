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
    <div v-if="content.emailStatus === 'Failed'" class="resend-email-info">
      <span
        v-b-tooltip.hover.bottom="'Reenviar e-mails'"
        class="material-symbols-outlined resend-email"
        size="24"
        @click.stop="handleEmailError(content.id)"
      >
        send
      </span>
    </div>
  </div>
</template>

<script setup>
import userStatus from '@/consts/admin-context/enums/userStatus.js'
import { BBadge } from 'bootstrap-vue'
import { useRouter } from 'vue-router/composables'

const props = defineProps({
  content: {
    type: Object,
    default: () => {},
  },
})

const router = useRouter()

const getColorToStatus = (status) => {
  switch (status) {
    case 'Processing':
      return 'warning'
    case 'Completed':
      return 'success'
    case 'Failed':
      return 'danger'
  }
}

const getLabelToStatus = (status) => {
  switch (status) {
    case 'Processing':
      return 'Em andamento'
    case 'Completed':
      return 'Finalizado'
    case 'Failed':
      return 'Erro no envio'
  }
}

const handleEmailError = (id) => {
  router.push({
    name: 'listImportStudentsResendEmail',
    params: {
      importId: id,
    },
  })
}
</script>

<style lang="scss">
  #email-status {
    .resend-email {
      color: #7367f0;
      margin-left: 5px;
    }
    .resend-email-info {
      display: inline-block;
    }
  }
</style>