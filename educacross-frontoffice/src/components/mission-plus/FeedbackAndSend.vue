<template>
  <div>
    <div v-if="props.sendGuide" class="text-center">
      <h1 class="mb-2">Deseja enviar missão?</h1>
    </div>
    <div v-else class="text-center">
      <span class="material-symbols-outlined modal-icon text-sucess display-2 text-success">
        task_alt
      </span>
      <h1 class="text-success mb-2">Missão criada com sucesso!</h1>
    </div>

    <hr class="w-full divider w-75 mx-auto my-2 border-gray" />

    <MissionDetails :guide-id="props.id" />

    <hr class="w-full divider w-75 mx-auto my-2 border-gray" />

    <div class="d-flex justify-content-center gap-4 mb-2">
      <b-button
        ref="loadableButtonarchiveMission"
        class="button-left"
        variant="outline-primary"
        type="border"
        :disabled="loadingButton"
        @click="close"
      >
        Sair sem enviar missão
      </b-button>
      <b-button
        variant="primary"
        class="button-right"
        type="filled"
        :disabled="loadingButton"
        @click="enableGuide"
      >
        <b-spinner v-show="loadingButton" small variant="white" />
        Enviar missão agora
      </b-button>
    </div>
    <p class="text-center modal-desc">
      <span class="font-bold">Atenção:</span> Ao enviar a missão agora, ela irá se iniciar em
      <span class="font-bold text-primary">{{ props.start | formattedDate }}</span> e então, não será mais
      possível apagar ou editá-la.
    </p>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { enableGuidePlus } from '@/services/teacher-context/guides/Guides.Service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ActivityIcon from '@/views/pages/teacher-context/shared/components/ActivityIcon.vue'
import ReadOnlyInputWithClipboard from '@/views/pages/teacher-context/shared/components/ReadOnlyInputWithClipboard.vue'
import ActivityDetail from '@/views/pages/teacher-context/shared/modals/ActivityDetail.vue'
import MissionDetails from '@/components/mission-plus/MissionDetailsPlus.vue'
import { formattedDate } from '@/filters/filters'

const props = defineProps({
  id: { type: Number, required: true },
  sendGuide: { type: Boolean, required: false },
  start: { type: String, required: true },
})

const emit = defineEmits(['close', 'close-and-update'])
const loadingButton = ref(false)

const { proxy } = getCurrentInstance()

const close = () => {
  if (props.sendGuide) {
    emit('close')
  } else {
    emit('close-and-update')
  }
}

const enableGuide = () => {
  loadingButton.value = true
  enableGuidePlus(props.id)
    .then(() => {
      emit('close-and-update')
      if (proxy && proxy.$toast) {
        proxy.$toast({
          component: Toast,
          props: {
            text: 'Missão enviada com sucesso!',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })
      }
    })
    .catch(error => {
      const errors = error?.response?.data?.errors
      const errorsArray = proxy?.$utilTeacherService?.handleFormatErrors(errors)
      errorsArray?.message?.forEach(elementError => {
        if (proxy && proxy.$toast) {
          proxy.$toast({
            component: Toast,
            props: {
              title: 'Atenção',
              icon: 'AlertTriangleIcon',
              text: elementError,
              variant: 'danger',
            },
          })
        }
      })
    })
    .finally(() => {
      loadingButton.value = false
    })
}
</script>

<script>
export default {
  filters: {
    formattedDate,
  },
}
</script>