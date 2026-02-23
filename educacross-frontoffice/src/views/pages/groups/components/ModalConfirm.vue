<template>
  <b-modal
    ref="Modal"
    :visible="value"
    hide-footer
    hide-header
    centered
    no-close-on-backdrop
    header-bg-variant="light-primary"
    @close="closeModal"
  >
    <div class="d-flex flex-col align-content-center text-center gap-2 p-2">
      <span :class="`material-symbols-outlined modal-icon text-${iconVariant}`"> {{ icon }} </span>
      <slot />
      <div :class="`d-flex gap-4 justify-center flex-row${reverse ? '-reverse' : ''}`">
        <b-button
          :variant="cancelVariant"
          @click="callbackCancel ? callbackCancel() : closeModal()"
        >
          {{ labelCancel }}
        </b-button>
        <b-button :variant="confirmVariant" :disabled="busy" @click="callbackConfirm">
          <b-spinner v-show="busy" small variant="light" class="mr-50" /> {{ labelConfirm }}
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
  },
  icon: {
    type: String,
    default: 'info',
  },
  iconVariant: {
    type: String,
    default: 'warning',
  },
  labelCancel: {
    type: String,
    required: false,
    default: 'Cancelar',
  },
  labelConfirm: {
    type: String,
    required: false,
    default: 'Confirmar',
  },
  confirmVariant: {
    type: String,
    required: false,
    default: 'primary',
  },
  cancelVariant: {
    type: String,
    required: false,
    default: 'outline-danger',
  },
  callbackCancel: {
    type: Function,
    required: false,
  },
  callbackConfirm: {
    type: Function,
    required: true,
  },
  reverse: {
    type: Boolean,
    required: false,
    default: false,
  },
  busy: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['input'])

const closeModal = () => {
  emit('input', false)
}
</script>

<style lang="scss" scoped>
  .modal-icon {
    font-size: 80px;
  }
</style>