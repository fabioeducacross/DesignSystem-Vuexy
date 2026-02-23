<template>
  <div class="cancel-mission">
    <div class="confirm-cancel">
      <img
        src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
        alt="belinha"
      />
      <h1 v-if="!mission.enabled" class="title-cancel-mission mt-6">Enable script</h1>
      <h1 v-else class="title-cancel-mission mt-6">Disable script</h1>
      <p v-if="mission.enabled" class="warning-cancel-mission mt-6">
        Are you sure you want to disable the "{{ mission.name }}"?
      </p>
      <p v-else class="warning-cancel-mission mt-6">
        Are you sure you want to enable the "{{ mission.name }}"?
      </p>
      <div class="boxButton mt-6 mb-6">
        <b-button
          class="button-left"
          :variant="!!mission.enabled ? 'outline-danger' : 'outline-success'"
          type="border"
          @click="closeModalCancelMission()"
        >
          {{ !mission.enabled ? 'Não habilitar' : 'Não desabilitar' }}
        </b-button>
        <b-button
          id="button-loading-enableOrDisableHighfive"
          class="button-right"
          :variant="!!mission.enabled ? 'danger' : 'success'"
          type="filled"
          :disabled="loadingButton"
          @click="confirmModal()"
        >
          <b-spinner v-if="loadingButton" small />
          {{ mission.enabled ? 'Desabilitar missão' : 'Habilitar missão' }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { enableHighfiveGuide } from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton } from 'bootstrap-vue'
import { ref, getCurrentInstance } from 'vue'

const props = defineProps({
  mission: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close-cancel-mission', 'close-cancel-mission-and-refresh'])

const vm = getCurrentInstance().proxy
const { classe, subject } = useFilters()
const loadingButton = ref(false)

const confirmModal = () => {
  loadingButton.value = true

  const payload = {
    classId: classe.value.ClassId,
    subjectId: subject.value.id,
  }

  enableHighfiveGuide(props.mission.id, payload)
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          text: `HighFive ${!props.mission.enabled ? 'enabled' : 'disabled'} with success!`,
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })

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
    })
    .finally(() => {
      loadingButton.value = false
    })
}

const closeModalCancelMission = () => {
  emit('close-cancel-mission')
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