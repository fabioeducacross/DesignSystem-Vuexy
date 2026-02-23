<template>
  <div>
    <div>
      <!-- Excluir missão -->
      <div v-if="guideObj.actionType === 'delete'" class="d-flex flex-col align-items-center">
        <b-img-lazy
          v-bind="propsImageBelinhaExclude"
          src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
          alt="belinha"
          class="mb-1"
        />
        <h1>Deseja excluir a missão "{{ guideObj.guideName }}"?</h1>
        <div class="d-flex gap-5">
          <b-button
            variant="outline-danger"
            type="border"
            :disabled="loadingButton"
            @click="closeShareOrDeleteGuide()"
          >
            Não quero excluir
          </b-button>
          <b-button variant="danger" type="filled" :disabled="loadingButton" @click="deleteGuide()">
            Quero excluir
            <b-spinner v-show="loadingButton" small variant="primary" />
          </b-button>
        </div>
      </div>
      <!-- Compartilhar Missão -->
      <template v-else-if="guideObj.actionType === 'share'">
        <div class="d-flex align-items-center flex-col">
          <b-img-lazy
            v-bind="propsImageBelinha"
            src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-success2.png"
            alt="belinha"
            class="mb-1"
          />
          <h1>Compartilhar a missão "{{ guideObj.guideName }}"</h1>
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
            <b-button
              variant="outline-primary"
              type="border"
              :disabled="loadingButton"
              @click="closeShareOrDeleteGuide()"
            >
              Cancelar
            </b-button>
            <b-button
              variant="primary"
              type="filled"
              :disabled="loadingButton"
              @click="changeGuideSharing()"
            >
              Compartilhar
              <b-spinner v-if="loadingButton" small variant="primary" />
            </b-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { changeSharedGuide, deleteGuide } from '@/services/teacher-context/guides/Guides.Service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton, BFormGroup, BFormRadio } from 'bootstrap-vue'

// Props
const props = defineProps({
  guideObj: {
    type: Object,
    default: () => {},
  },
})

// Emits
const emit = defineEmits(['close-shareOrDeleteGuideWithAtt', 'close-shareOrDeleteGuide'])

// State
import { ref, onMounted } from 'vue'

const loadingButton = ref(false)
const selectedShareRadioOption = ref(1)

const propsImageBelinha = {
  center: true,
  blank: true,
  blankColor: '#bbb',
  width: 300,
  height: 300,
}

const propsImageBelinhaExclude = {
  center: true,
  blank: true,
  blankColor: '#bbb',
  height: 300,
}

const radioOptions = [
  { text: 'Somente eu', value: 1 },
  { text: 'Minha Escola', value: 2 },
  { text: 'Minha rede escolar', value: 3 },
]

// Init radio selected (mimics created)
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
const deleteGuideFn = () => {
  loadingButton.value = true

  deleteGuide(props.guideObj.guideId)
    .then(() => {
      emit('close-shareOrDeleteGuideWithAtt')
      // $toast is assumed to be available globally via plugin/mixin (Vuexy pattern)
      // You may need to use `getCurrentInstance().proxy.$toast` in strict Vue 3, but for Vue 2.7 script setup, global works.
      window?.vm?.$toast
        ? window.vm.$toast({
            component: Toast,
            props: {
              text: 'Missão excluída com sucesso!',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        : (typeof $toast !== 'undefined' &&
            $toast({
              component: Toast,
              props: {
                text: 'Missão excluída com sucesso!',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            }))
    })
    .finally(() => {
      loadingButton.value = false
    })
}

const changeGuideSharing = () => {
  loadingButton.value = true

  const formData = {
    sharedGuideType: selectedShareRadioOption.value,
  }
  changeSharedGuide(props.guideObj.guideId, formData)
    .then(() => {
      emit('close-shareOrDeleteGuideWithAtt')
      window?.vm?.$toast
        ? window.vm.$toast({
            component: Toast,
            props: {
              text: 'Compartilhamento da missão salvo com sucesso!!',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        : (typeof $toast !== 'undefined' &&
            $toast({
              component: Toast,
              props: {
                text: 'Compartilhamento da missão salvo com sucesso!!',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            }))
    })
    .finally(() => {
      loadingButton.value = false
    })
}

const closeShareOrDeleteGuide = () => {
  emit('close-shareOrDeleteGuide')
}

// Expose to template
const guideObj = props.guideObj
</script>