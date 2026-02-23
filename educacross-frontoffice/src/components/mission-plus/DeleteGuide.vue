<template>
  <div class="d-flex flex-col align-items-center">
    <b-img-lazy
      v-bind="propsImageBelinhaExclude"
      src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
      alt="belinha"
      class="mb-1"
    />
    <h1>
      Deseja excluir a missão "{{ guideObj.name }}"?
    </h1>
    <div class="d-flex justify-content-center gap-4">
      <b-button
        variant="outline-danger"
        type="border"
        :disabled="loadingButton"
        @click="close"
      >
        Não quero excluir
      </b-button>
      <b-button
        variant="danger"
        type="filled"
        :disabled="loadingButton"
        @click="deleteGuide"
      >
        Quero excluir
        <b-spinner v-show="loadingButton" small variant="white" />
      </b-button>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { deleteGuide as deleteGuideApi } from '@/services/teacher-context/guides/Guides.Service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton } from 'bootstrap-vue'

// Props
const props = defineProps({
  guideObj: {
    type: Object,
    default: () => ({}),
  },
})

// Emits
const emit = defineEmits(['close', 'close-and-update'])

// Reactive state
const loadingButton = ref(false)

const propsImageBelinhaExclude = {
  center: true,
  blank: true,
  blankColor: '#bbb',
  height: 300,
}

// Methods
const deleteGuide = async () => {
  loadingButton.value = true
  try {
    await deleteGuideApi(props.guideObj.id)
    emit('close-and-update')
    const { proxy } = getCurrentInstance()
    proxy.$toast({
      component: Toast,
      props: {
        text: 'Missão excluída com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
  } finally {
    loadingButton.value = false
  }
}

const close = () => {
  emit('close')
}
</script>