<template>
  <b-modal
    :id="modalId"
    v-model="isVisible"
    centered
    hide-header
    hide-footer
    content-class="shadow"
    modal-class="evaluation-action-modal"
    size="md"
    static
    no-close-on-backdrop
    @hidden="onModalHidden"
  >
    <div
      v-if="actionType && ['pause', 'resume', 'reapply', 'cancel'].includes(actionType)"
      class="text-center"
    >
      <div class="mb-1 d-flex justify-content-center">
        <div class="icon-wrapper">
          <span class="material-symbols-outlined icon-symbol" :class="handleIcon().color">
            {{ handleIcon().icon }}
          </span>
        </div>
      </div>

      <h5 class="modal-title-custom mb-1">
        {{ handleIcon().title }}
      </h5>

      <div class="description-box mb-1">
        <p
          class="mb-0"
          v-html="
            handleIcon().text +
            ' ' +
            (actionType === 'pause' ? 'Você poderá retomar a qualquer momento.' : '')
          "
        ></p>
      </div>

      <div v-if="actionType === 'pause'" class="alert-info-custom d-flex align-items-center mb-2">
        <span class="material-symbols-outlined alert-icon">info</span>
        <span class="alert-text">Essa ação não altera o período de aplicação da avaliação.</span>
      </div>

      <div class="d-flex justify-content-center buttons-container gap-3">
        <b-button variant="outline-primary" @click="handleCancel"> Cancelar </b-button>
        <b-button :variant="handleIcon().btnVariant" @click="handleConfirm">
          {{ handleIcon().textBtn }}
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import useFilters from '@/store/filters/useFilters.js'
import { computed } from 'vue'

const props = defineProps({
  modalId: {
    type: String,
    default: 'evaluation-action-modal',
  },
  actionType: {
    type: String,
    required: true,
    validator: value => ['pause', 'resume', 'reapply', 'cancel', ''].includes(value),
  },
  evaluationInfo: {
    type: Object,
    default: () => ({
      className: '',
      evaluationName: '',
    }),
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

const { classe } = useFilters()

const isVisible = computed({
  get: () => props.visible,
  set: value => {
    emit('update:visible', value)
  },
})

const className = computed(() => {
  return classe.value.Name
})

const handleIcon = () => {
  switch (props.actionType) {
    case 'pause':
      return {
        icon: 'pause_circle',
        color: 'text-danger',
        title: 'Tem certeza que deseja pausar?',
        textBtn: 'Pausar avaliação',
        btnVariant: 'danger',
        text: `A avaliação ficará temporariamente indisponível para <span class="text-primary font-bold">${className}</span>. Você poderá retomar a qualquer momento.`,
      }
    case 'resume':
      return {
        icon: 'play_circle',
        color: 'text-success',
        title: 'Tem certeza que deseja retomar?',
        textBtn: 'Retomar avaliação',
        btnVariant: 'success',
        text: `A avaliação ficará disponível para <span class="text-primary font-bold">${className}</span>.`,
      }
    case 'reapply':
      return {
        icon: 'info',
        color: 'text-warning',
        title: 'Tem certeza que deseja reaplicar?',
        textBtn: 'Aplicar teste',
        btnVariant: 'primary',
        text: `O teste ficará disponível novamente para <span class="text-primary font-bold">${props.evaluationInfo.className}</span>. Você poderá cancelar a qualquer momento.`,
      }
    case 'cancel':
      return {
        icon: 'info',
        color: 'text-warning',
        title: 'Tem certeza que deseja cancelar?',
        textBtn: 'Cancelar avaliação',
        btnVariant: 'danger',
        text: `O teste será cancelado e não estará mais disponível para <span class="text-primary font-bold">${props.evaluationInfo.className}</span>. `,
      }
    default:
      return {
        icon: 'info',
        color: 'text-info',
        title: '',
        textBtn: '',
        btnVariant: 'info',
        text: '',
      }
  }
}

const handleConfirm = () => {
  emit('confirm', {
    actionType: props.actionType,
    evaluationInfo: props.evaluationInfo,
  })
  isVisible.value = false
}

const handleCancel = () => {
  emit('cancel')
  isVisible.value = false
}

const onModalHidden = () => {
  emit('update:visible', false)
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/base/bootstrap-extended/include';

  .evaluation-action-modal {
    ::v-deep .modal-dialog {
      width: 398px;
    }

    ::v-deep .modal-content {
      border-radius: 6px;
      padding: 20px;
    }

    ::v-deep .modal-body {
      padding: 0;
    }
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon-symbol {
      font-size: 80px;
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 40;
    }
  }

  .modal-title-custom {
    font-size: 1.313rem;
    font-weight: $font-weight-bolder;
    color: $headings-color;
    margin-bottom: 1rem;
  }

  .description-box {
    padding: 16px;
    text-align: center;

    p {
      font-family: Montserrat;
      font-weight: 400;
      font-style: Regular;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0px;
      text-align: center;

      color: $body-color;
    }
  }

  .alert-info-custom {
    background-color: rgba($red, 0.1);
    border: 1px solid rgba($red, 0.2);
    border-radius: 6px;
    padding: 10px 16px;

    .alert-icon {
      color: $red;
      font-size: 20px;
      flex-shrink: 0;
      margin-right: 8px;
    }

    .alert-text {
      font-family: $font-family-monospace;
      font-weight: $font-weight-normal;
      font-style: italic;
      font-size: 12px;
      line-height: 18px;
      color: $red;
      text-align: center;
    }
  }
</style>