<template>
  <b-modal
    ref="Modal"
    :visible="value"
    hide-footer
    centered
    title="Registro do teste"
    size="sm"
    no-close-on-backdrop
    static
    header-bg-variant="light-primary"
    @close="closeModal"
  >
    <div v-if="value">
      <b-card no-body class="card-border px-1 py-50">
        <b-row align-v="center">
          <b-col cols="auto"> Aluno: </b-col>
          <b-col cols>
            <div class="font-bold text-primary">
              {{ data.studentName }}
            </div>
          </b-col>
          <b-col cols="auto">
            <div class="d-flex align-items-center text-primary">
              <span v-if="data.type === 'image'" class="material-symbols-outlined">
                imagesmode
              </span>
              <span v-if="data.type === 'text'" class="material-symbols-outlined"> article </span>
            </div>
          </b-col>
        </b-row>
      </b-card>

      <b-row class="mb-50">
        <b-col cols>
          <h4 class="text-primary mb-0">{{ applications[currentPhaseIndex].applyName }}</h4>
        </b-col>
        <b-col cols="auto">
          <div class="phase-controls d-flex justify-content-end">
            <div v-show="currentPhaseIndex > 0" class="border-primary rounded" @click="prevPhase">
              <span class="material-symbols-outlined font-14 text-primary font-bold"
                >arrow_back_ios</span
              >
            </div>
            <div
              v-show="currentPhaseIndex < qtdPhases - 1"
              class="border-primary rounded"
              @click="nextPhase"
            >
              <span class="material-symbols-outlined font-14 text-primary font-bold"
                >arrow_forward_ios</span
              >
            </div>
          </div>
        </b-col>
      </b-row>

      <b-carousel
        id="testRegisterModalcarousel"
        ref="testRegisterModalcarousel"
        v-model="currentPhaseIndex"
        :interval="0"
        :indicators="applications.length > 1"
      >
        <!-- Text slides with image -->
        <b-carousel-slide v-for="(apply, index) in applications" :key="index">
          <div>
            <div
              v-if="data.type === 'image'"
              class="image-input image-upload mb-1"
              :class="{ 'image-preview': apply.imageData }"
              :style="{ 'background-image': `url(${apply.imageData})` }"
              @click="chooseImage"
              @dragover.prevent="dragOver"
              @dragleave.prevent="dragLeave"
              @drop.prevent="drop($event)"
            >
              <div
                v-if="!apply.imageData"
                class="placeholder text-center text-primary d-flex flex-column align-items-center justify-content-center gap-2 h-100"
              >
                <span class="material-symbols-outlined"> add_a_photo </span>
                Arraste aqui a foto do teste ou clique para fazer upload do arquivo.
              </div>
            </div>

            <div v-if="!apply.imageData && data.type === 'image'" class="mb-1 text-body text-left">
              <span :class="{ 'text-danger': apply.fileSizeError }"
                >Peso máximo permitido: 5mb.</span
              ><br />
              <span :class="{ 'text-danger': apply.fileTipeError }"
                >Extensões permitidas: .png, .jpeg, .jpg</span
              >
            </div>

            <b-alert v-if="apply.fileSizeError" show variant="danger">
              <div class="alert-body font-normal d-flex align-items-center gap-1">
                <span class="material-symbols-outlined" style="font-size: 16px"> info </span>
                <span class="text-left">
                  Arquivo acima do peso permitido. Suba um arquivo de até 5mb.</span
                >
              </div>
            </b-alert>

            <b-alert v-if="apply.fileTipeError" show variant="danger">
              <div class="alert-body font-normal d-flex align-items-center gap-1">
                <span class="material-symbols-outlined" style="font-size: 16px"> info </span>
                <span class="text-left">
                  Extensão não permitida. Suba um arquivo nos formatos .png, .jpg ou .jpeg.</span
                >
              </div>
            </b-alert>

            <div
              v-if="apply.imageData && data.type === 'image'"
              class="d-flex justify-content-between mb-1"
            >
              <span>{{ apply.filename }}</span>

              <b-button
                variant="link"
                class="text-decoration-none d-flex align-items-center p-0 text-danger"
                @click="clearImage"
              >
                <span class="material-symbols-outlined"> delete </span>
                <span class="">Excluir.</span>
              </b-button>
            </div>

            <div v-if="data.type === 'text'" class="mb-1">
              <TestRegisterTextArea v-model="apply.generalNotes" @input="disableSave = false" />
            </div>
          </div>
        </b-carousel-slide>
      </b-carousel>

      <input
        ref="fileInput"
        class="file-input"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        @input="uploadImage($event.target.files[0])"
      />

      <b-alert :show="alertBeforeClose" variant="danger">
        <div class="alert-body font-normal d-flex align-items-center gap-1">
          <span class="material-symbols-outlined" style="font-size: 16px"> info </span>
          <span v-if="applications.length === 1"> Atenção! Suas alterações não foram salvas.</span>
          <span v-else>
            Atenção! Você tem alterações não salvas em uma das aplicações. Use as setas de navegação
            para salvar o conteúdo modificado antes de fechar.</span
          >
        </div>
      </b-alert>

      <div class="d-flex justify-content-center gap-2">
        <b-button v-if="alertBeforeClose" variant="outline-danger" @click="closeModal">
          Sair sem salvar
        </b-button>
        <b-button variant="primary" :disabled="disableSave || loadingSave" @click="save">
          <b-spinner v-if="loadingSave" small />Salvar alterações
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import { putWritingStagesStudentEvaluate } from '@/services/shared/writing-stages/writing-stages.Service.js'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import TestRegisterTextArea from '@/views/pages/writing-phases/components/TestRegisterTextArea.vue'
import { watch, ref, getCurrentInstance, computed } from 'vue'

// Props and emits
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  value: {
    type: Boolean,
  },
})
const emit = defineEmits(['input', 'reload', 'disable'])

// Instance (for $toast, $forceUpdate)
const vm = getCurrentInstance().proxy

const disableSave = ref(true)
const loadingSave = ref(false)
const testRegisterModalcarousel = ref(null)
const { classe } = useFilters()
const applications = ref([])

const qtdPhases = computed(() => applications.value.length)
const currentPhaseIndex = ref(0)

const prevPhase = () => {
  if (currentPhaseIndex.value === 0) return
  currentPhaseIndex.value -= 1
}
const nextPhase = () => {
  if (currentPhaseIndex.value === qtdPhases.value - 1) return
  currentPhaseIndex.value += 1
}

const mountData = () => {
  applications.value = []
  currentPhaseIndex.value = 0
  if (props.data && props.data.applications) {
    props.data.applications.forEach(item => {
      if (item.enabled) {
        applications.value.push({
          ...item,
          imageData: item.imageUrl,
          filename: item.imageUrl ? item.imageUrl.split('/').pop() : '',
        })
      }
    })
  }
}

watch(
  () => props.value,
  value => {
    if (value) {
      mountData()
    }
  }
)
const alertBeforeClose = ref(false)

const closeModal = $event => {
  if (disableSave.value) {
    emit('input', false)
    return
  }
  if (alertBeforeClose.value) {
    alertBeforeClose.value = false
    disableSave.value = true
    emit('input', false)
    return
  }
  alertBeforeClose.value = true
  if ($event && $event.preventDefault) $event.preventDefault()
}

const save = () => {
  alertBeforeClose.value = false

  if (
    props.data.type === 'text' &&
    applications.value[currentPhaseIndex.value].generalNotes &&
    applications.value[currentPhaseIndex.value].generalNotes.length > 600
  ) {
    return
  }

  const formData = new FormData()

  formData.append('StudentId', props.data.studentId)
  formData.append('ClassId', classe.value.ClassId)

  const index = 0

  formData.append(
    `Applies[${index}].apply`,
    applications.value[currentPhaseIndex.value].apply,
  )
  formData.append(
    `Applies[${index}].writingStagesTestId`,
    applications.value[currentPhaseIndex.value].writingStagesTestId,
  )

  if (props.data.type === 'image') {
    if (!applications.value[currentPhaseIndex.value].deleteImage) {
      formData.append(
        `Applies[${index}].image`,
        applications.value[currentPhaseIndex.value].imageFile,
        applications.value[currentPhaseIndex.value].filename,
      )
    }

    formData.append(
      `Applies[${index}].deleteImage`,
      applications.value[currentPhaseIndex.value].deleteImage,
    )
  } else {
    formData.append(
      `Applies[${index}].GeneralNotes`,
      applications.value[currentPhaseIndex.value].generalNotes,
    )
  }
  loadingSave.value = true
  putWritingStagesStudentEvaluate(formData)
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Alterado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      disableSave.value = true
      emit('reload')
      emit('input', false)
    })
    .finally(() => {
      loadingSave.value = false
    })
}
const fileInput = ref(null)

const chooseImage = () => {
  fileInput.value && fileInput.value.click()
}

const validateFileType = file => {
  return new Promise((resolve, reject) => {
    if (
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg'
    ) {
      applications.value[currentPhaseIndex.value].fileTipeError = false
      resolve()
    } else {
      applications.value[currentPhaseIndex.value].fileTipeError = true
      applications.value[currentPhaseIndex.value].imageData = null
      applications.value[currentPhaseIndex.value].filename = ''
      reject()
    }
  })
}

const drop = e => {
  emit('disable', true)

  const { files } = e.dataTransfer
  if (files.length === 1) {
    const file = files[0]
    uploadImage(file)
  }
}

const uploadImage = file => {
  emit('disable', true)
  if (!file) return

  applications.value[currentPhaseIndex.value].fileTipeError = false
  applications.value[currentPhaseIndex.value].fileSizeError = false

  validateFileType(file)
    .then(() => {
      validateFileSize(file)
        .then(() => {
          const reader = new FileReader()
          reader.onloadend = () => {
            applications.value[currentPhaseIndex.value].filename = file.name
            applications.value[currentPhaseIndex.value].imageData = reader.result
            applications.value[currentPhaseIndex.value].imageFile = file
            applications.value[currentPhaseIndex.value].deleteImage = false
            disableSave.value = false
            alertBeforeClose.value = false
          }
          reader.readAsDataURL(file)
        })
        .catch(() => {
          vm.$forceUpdate()
        })
    })
    .catch(() => {
      vm.$forceUpdate()
    })
}

const validateFileSize = file => {
  return new Promise((resolve, reject) => {
    if (file.size <= 5120000) {
      applications.value[currentPhaseIndex.value].fileSizeError = false
      resolve()
    } else {
      applications.value[currentPhaseIndex.value].fileSizeError = true
      applications.value[currentPhaseIndex.value].imageData = null
      applications.value[currentPhaseIndex.value].filename = ''
      reject()
    }
  })
}

const clearImage = () => {
  disableSave.value = false
  applications.value[currentPhaseIndex.value].imageData = null
  applications.value[currentPhaseIndex.value].filename = ''
  applications.value[currentPhaseIndex.value].fileTipeError = false
  applications.value[currentPhaseIndex.value].fileSizeError = false
  applications.value[currentPhaseIndex.value].deleteImage = true
  if (fileInput.value) fileInput.value.value = null
  alertBeforeClose.value = false
}

// dummy handlers for drag events so no error is raised
const dragOver = () => {}
const dragLeave = () => {}

</script>

<style lang="scss">
  #testRegisterModalcarousel .carousel-caption {
    left: 0;
    right: 0;
    position: relative;
  }
  /*   #testRegisterModalcarousel .carousel-item > img {
    display: none;
  } */
</style>
<style scoped lang="scss">
  .phase-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      padding: 4px;
    }
  }
  .card-border {
    border: 1px solid #d8d6de;
    box-shadow: none;
  }
  .image-input {
    display: block;
    width: 100%;
    height: 450px;

    cursor: pointer;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;

    border: 2px dashed #7666f8;
    border-radius: 10px;
    margin: 0 auto;

    &.image-preview {
      background-color: #d0d2d6;
      border: 1px solid #7666f8;
    }
  }
  .placeholder {
    .material-symbols-outlined {
      font-size: 110px;
    }
  }
  .file-input {
    display: none;
  }
</style>