<template>
  <div class="d-flex align-items-center flex-col">
    <b-img-lazy
      v-bind="propsImageBelinha"
      src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-success2.png"
      alt="belinha"
      class="mb-1"
    />
    <h1>Compartilhar a missão "{{ guideObj.name }}"</h1>
    <p>Selecione como você deseja compartilhar essa missão:</p>
    <b-form class="mb-1">
      <b-form-radio-group
        v-model="selectedShareRadioOption"
        :options="radioOptions"
        value-field="value"
        text-field="text"
      >
      </b-form-radio-group>
    </b-form>
    <div class="d-flex gap-5">
      <b-button variant="outline-primary" type="border" :disabled="loadingButton" @click="close">
        Cancelar
      </b-button>
      <b-button
        variant="primary"
        type="filled"
        :disabled="loadingButton"
        @click="changeGuideSharing"
      >
        Compartilhar
        <b-spinner v-if="loadingButton" small variant="primary" />
      </b-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { changeSharedGuide } from '@/services/teacher-context/guides/Guides.Service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton, BFormGroup, BFormRadio, BFormRadioGroup, BForm, BImgLazy, BSpinner } from 'bootstrap-vue'

// Props
const props = defineProps({
  guideObj: {
    type: Object,
    default: () => ({}),
  },
})

// Emits
const emit = defineEmits(['close', 'close-and-update'])

// State
const loadingButton = ref(false)
const selectedShareRadioOption = ref(1)
const propsImageBelinha = {
  center: true,
  blank: true,
  blankColor: '#bbb',
  width: 300,
  height: 300,
}
const radioOptions = [
  { text: 'Somente eu', value: 1 },
  { text: 'Minha Escola', value: 2 },
  { text: 'Minha rede escolar', value: 3 },
]

// Lifecycle
onMounted(() => {
  if (
    props.guideObj.shareTypeId === 1 ||
    props.guideObj.shareTypeId === 2 ||
    props.guideObj.shareTypeId === 3
  ) {
    selectedShareRadioOption.value = props.guideObj.shareTypeId
  } else {
    selectedShareRadioOption.value = 1
  }
})

// Methods
const changeGuideSharing = () => {
  loadingButton.value = true
  const formData = {
    sharedGuideType: selectedShareRadioOption.value,
  }
  changeSharedGuide(props.guideObj.id, formData)
    .then(() => {
      emit('close-and-update')
      // eslint-disable-next-line no-undef
      if (typeof $toast === 'function') {
        $toast({
          component: Toast,
          props: {
            text: 'Compartilhamento da missão salvo com sucesso!!',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })
      }
    })
    .finally(() => {
      loadingButton.value = false
    })
}

const close = () => {
  emit('close')
}
</script>