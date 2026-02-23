<template>
  <div class="cancel-mission">
    <div v-if="!cancelled" class="confirm-cancel">
      <div class="d-flex justify-content-center mb-1">
        <img
          src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
          alt="belinha"
        />
      </div>

      <h2 class="mb-1 text-center text-body">Cancelar envio de missão?</h2>
      <p class="warning-cancel-mission mt-1">
        Tem certeza que deseja cancelar a "{{ cancelMission.guideName || cancelMission.name }}"?
      </p>
      <p class="attention-cancel-mission mt-1">
        Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
      </p>
      <div class="d-flex justify-content-center gap-4">
        <b-button variant="outline-danger" type="border" @click="closeModalCancelMission">
          Não quero cancelar
        </b-button>
        <b-button
          variant="danger"
          type="filled"
          :disabled="loadingButton"
          @click="confirmCancelMission"
        >
          <b-spinner v-if="loadingButton" small />
          Quero cancelar
        </b-button>
      </div>
    </div>
    <div v-else class="cancelled" :class="{ 'fade-in': cancelled }">
      <h1 class="title-cancelled mb-6">Missão cancelada!</h1>
      <p class="warning-mission-cancelled mb-6">
        Não é mais possível enviar essa missão para os alunos, caso deseje ocultar a visualização
        dessa missão na listagem você pode arquivar a mesma.
      </p>
      <b-button
        class="button-cancelled"
        variant="primary"
        type="filled"
        size="large"
        @click="closeModalCancelMission"
      >
        Ok
      </b-button>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { cancellationGuide } from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton, BSpinner } from 'bootstrap-vue'

// Props
const props = defineProps({
  cancelMission: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['close-cancel-mission', 'close-cancel-mission-and-refresh'])

// State
const cancelled = ref(false)
const loadingButton = ref(false)

// VM for $toast and $utilTeacherService
const vm = getCurrentInstance().proxy

const { subject } = useFilters()

// Methods
const closeModalCancelMission = () => {
  emit('close-cancel-mission')
}

const confirmCancelMission = () => {
  loadingButton.value = true

  cancellationGuide(props.cancelMission.id, {
    id: props.cancelMission.id,
    subject: subject.value.id,
  })
    .then(() => {
      cancelled.value = true
      emit('close-cancel-mission-and-refresh')
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = vm.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        vm.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
      emit('close-cancel-mission')
    })
    .finally(() => {
      loadingButton.value = false
    })
}
</script>

<style lang="scss" scoped>
.cancel-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  .confirm-cancel {
    display: flex;
    flex-direction: column;
    align-items: center;
    .img-school-doubt {
      width: 311px;
      height: 241px;
    }
    .title-cancel-mission {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      color: #4b4b4b;
    }
    .warning-cancel-mission {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      color: #6e6b7b;
      padding: 0 40px;
    }
    .attention-cancel-mission {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #ea5455;
      padding: 0 40px;
    }
    .boxButton {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      .button-right,
      .button-left {
        width: 18rem;
        height: 48px;
        margin-bottom: 1rem;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.4px;
      }
      .button-left {
        margin-right: 1%;
      }
      .button-right {
        margin-left: 1%;
      }
    }
  }
  .cancelled {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title-cancelled {
      font-style: normal;
      font-weight: 500;
      font-size: 28px;
      line-height: 36px;
      color: #5e5873;
    }
    .warning-mission-cancelled {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #6e6b7b;
      padding: 0 40px;
    }
    .button-cancelled {
      width: 18rem;
      height: 48px;
      margin-bottom: 1rem;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.4px;
    }
  }
  .fade-in {
    animation-duration: 1s;
    animation-name: fadeIn;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>