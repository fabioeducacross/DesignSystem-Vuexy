<template>
  <b-row>
    <b-col cols="12" md="auto">
      <div
        v-show="isEditData"
        class="image-input image-upload"
        :class="{ 'image-preview': imageData }"
        :style="{ 'background-image': `url(${imageData})` }"
        @click="chooseImage"
        @dragover.prevent="dragOver"
        @dragleave.prevent="dragLeave"
        @drop.prevent="drop($event)"
      >
        <div v-if="!imageData" class="placeholder">
          <h1 v-if="!isDragging && !wrongFile" class="ecu-text">
            {{ text }}
          </h1>
        </div>
        <input
          ref="fileInput"
          class="file-input"
          type="file"
          accept="image/png"
          @input="uploadImage($event.target.files[0])"
        />
      </div>
      <div v-show="!isEditData" class="crop-container">
        <vue-cropper
          ref="cropper"
          auto-crop
          :output-size="0.7"
          class="image-input image-cropper"
          :img="imageData"
          alt="Crop Img"
          preview=".preview"
          :auto-crop-height="140"
        />
      </div>
    </b-col>
    <b-col cols="12" md class="d-flex flex-column justify-content-between">
      <div>
        <span :class="{ 'text-danger': fileSizeError }">Peso máximo permitido: 1mb.</span><br />
        <span :class="{ 'text-danger': fileTipeError }">Extensões permitidas: .png.</span>
      </div>
      <div class="d-flex flex-column align-items-start gap-1">
        <b-button
          v-if="!isEditData && imageData"
          size="sm"
          variant="primary"
          class="text-decoration-none d-flex gap-1 align-items-center"
          @click="cropImage"
        >
          <span class="material-symbols-outlined" style="font-size: 20px"> crop </span>
          <span>Recortar</span>
        </b-button>

        <b-button
          v-if="isEditData && imageData"
          size="sm"
          variant="outline-primary"
          class="text-decoration-none d-flex gap-1 align-items-center"
          @click="isEditData = false"
        >
          <span class="material-symbols-outlined" style="font-size: 20px"> crop </span>
          <span>Editar recorte</span>
        </b-button>

        <b-button
          v-if="imageData"
          variant="link"
          class="text-decoration-none d-flex align-items-center p-0"
          @click="clearCrop"
        >
          <span class="material-symbols-outlined text-danger"> delete </span>
          <span class="text-body text-left">{{ filename }}</span>
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script setup>
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import 'cropperjs/dist/cropper.css'
import { ref, reactive, getCurrentInstance } from 'vue'
import VueCropper from 'vue-cropperjs'

const props = defineProps({
  text: { type: String, default: 'Inserir Imagem' },
})

const emit = defineEmits(['input', 'finalImage', 'disable'])

const vm = getCurrentInstance().proxy
const imageData = ref(null)
const isDragging = ref(false)
const wrongFile = ref(false)
const isEditData = ref(true)
const option = reactive({
  outputType: '',
})
const filename = ref('')
const fileSizeError = ref(false)
const fileTipeError = ref(false)
const cropper = ref(null)
const fileInput = ref(null)

const dragOver = () => {
  isDragging.value = true
}

const dragLeave = () => {
  isDragging.value = false
}

const drop = e => {
  emit('disable', true)
  const { files } = e.dataTransfer
  if (files.length === 1) {
    const file = files[0]
    validateFileType(file)
      .then(() => {
        validateFileSize(file)
          .then(() => {
            option.outputType = file.type.split('/').slice(-1).toString()
            filename.value = file.name
            const reader = new FileReader()
            reader.onload = f => {
              imageData.value = f.target.result
              cropper.value.replace(imageData.value)
              isEditData.value = false
              isDragging.value = false
            }
            reader.readAsDataURL(file)
          })
          .catch(() => {
            isDragging.value = false
          })
      })
      .catch(() => {
        isDragging.value = false
      })
  }
}

const chooseImage = () => {
  emit('disable', true)
  fileInput.value.click()
}

const uploadImage = file => {
  emit('disable', true)
  if (!file) return

  validateFileType(file).then(() => {
    validateFileSize(file).then(() => {
      option.outputType = file.type.split('/').pop().toString()
      filename.value = file.name
      const reader = new FileReader()
      reader.onloadend = () => {
        imageData.value = reader.result
        cropper.value.replace(imageData.value)
        isEditData.value = false
      }
      reader.readAsDataURL(file)
      emit('input', file)
    })
  })
}

const cropImage = () => {
  const data = []
  imageData.value = cropper.value
    .getCroppedCanvas({
      maxHeight: 140,
    })
    .toDataURL()
  data.imageData = imageData.value
  data.fileType = option.outputType
  emit('finalImage', data)
  emit('disable', false)
  isEditData.value = true
  vm.$bus.emit('showConfirmExit', true)
}

const clearCrop = () => {
  fileTipeError.value = false
  fileSizeError.value = false
  imageData.value = null
  filename.value = ''
  isEditData.value = true
  cropper.value.destroy()
  isDragging.value = false
  fileInput.value.value = null
  vm.$bus.emit('showConfirmExit', false)
}

const validateFileType = file => {
  return new Promise((resolve, reject) => {
    if (file.type === 'image/png') {
      fileTipeError.value = false
      resolve()
    } else {
      fileTipeError.value = true
      fileSizeError.value = false
      imageData.value = null
      isEditData.value = true
      filename.value = ''
      vm.$toast({
        component: Toast,
        props: {
          title: 'Formato Negado',
          icon: 'AlertTriangleIcon',
          text: 'Suba um arquivo no formato PNG',
          variant: 'danger',
        },
      })
      reject()
    }
  })
}

const validateFileSize = file => {
  return new Promise((resolve, reject) => {
    if (file.size <= 1024000) {
      fileSizeError.value = false
      resolve()
    } else {
      fileSizeError.value = true
      fileTipeError.value = false
      imageData.value = null
      isEditData.value = true
      filename.value = ''

      vm.$toast({
        component: Toast,
        props: {
          title: 'Atenção. O arquivo está acima do peso permitido.',
          icon: 'AlertTriangleIcon',
          text: 'Verifique as configurações da imagem e tente novamente.',
          variant: 'danger',
        },
      })
      reject()
    }
  })
}
</script>

<style scoped lang="scss">
  .image-input {
    display: block;
    width: 528px;
    height: 130px;
    max-width: 100%;
    cursor: pointer;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;

    border: 2px dashed #7666f8;
    border-radius: 10px;
    margin: 0 auto;

    &.image-preview {
      background-color: #d0d2d6;
      border-color: transparent;
    }
  }
  .placeholder {
    width: 528px;
    height: 130px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 18px;
    font-family: 'Montserrat';
    margin: 0 auto;
    border-radius: 10px;

    .ecu-text {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      text-align: center;
      color: #7367f0;
      max-width: 80%;
    }
  }
  .file-input {
    display: none;
  }
  .crop-container {
    width: 528px;
    max-width: 100%;
    .image-input {
      width: 528px;
      max-width: 100%;
      height: 130px;
      border: none;
      margin: 0 auto;
    }

    .image-cropper {
      margin-right: 20px;
    }
  }
</style>