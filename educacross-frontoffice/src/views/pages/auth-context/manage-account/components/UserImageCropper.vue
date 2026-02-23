<template>
  <div class="relative p-50">
    <div class="edit-user-image-wrapper rounded-circle" @click="clickImageInput">
      <span class="material-symbols-outlined text-white">edit</span>
    </div>
    <!-- Cropper component -->
    <cropper
      ref="refCropper"
      :src="imageData"
      :auto-crop-area="2"
      :aspect-ratio="1"
      :initial-aspect-ratio="1"
      :modal="false"
      :background="false"
      class="mb-50 rounded border"
      :img-style="{
        width: '190px',
        maxWidth: '190px',
        height: 'auto',
        maxHeight: '190px',
        borderRadius: '6px',
      }"
    >
    </cropper>
    <div v-if="fileName" style="max-width: 190px" class="text-wrap break-all">
      <span class="material-symbols-outlined text-danger align-middle" @click="revertChanges"
        >delete</span
      >
      <span class="align-middle">{{ fileName }}</span>
    </div>

    <div class="miniatures-grid-container">
      <div
        v-for="(color, index) in colorsOptions"
        :key="index"
        :class="{
          'border-2 border-primary rounded': color.id === selectedColorOption,
        }"
        class="miniature-grid-item"
      >
        <b-img :src="color.image" @click="selectBoxColor(color)" />
      </div>
    </div>

    <input ref="refImageInput" class="hidden" type="file" accept="image/*" @change="onFileChange" />
  </div>
</template>

<script setup>
import color1 from '@/assets/images/images-educa/manage-account/edit-profile-admin/1.svg'
import color2 from '@/assets/images/images-educa/manage-account/edit-profile-admin/2.svg'
import color3 from '@/assets/images/images-educa/manage-account/edit-profile-admin/3.svg'
import color4 from '@/assets/images/images-educa/manage-account/edit-profile-admin/4.svg'
import color5 from '@/assets/images/images-educa/manage-account/edit-profile-admin/5.svg'
import color6 from '@/assets/images/images-educa/manage-account/edit-profile-admin/6.svg'
import color7 from '@/assets/images/images-educa/manage-account/edit-profile-admin/7.svg'
import color8 from '@/assets/images/images-educa/manage-account/edit-profile-admin/8.svg'
import 'cropperjs/dist/cropper.css'
import { ref, toRef, watch } from 'vue'
import Cropper from 'vue-cropperjs'

// Props
const props = defineProps({
  imageData: {
    type: String,
    required: true,
  },
})

const internalImage = ref(null)
const refCropper = ref(null)
const refImageInput = ref(null)
const imageEdited = ref(false)
const qtdChangesObserved = ref(0)
const fileName = ref(null)
const selectedColorOption = ref(null)

const colorsOptions = [
  { id: 1, image: color1 },
  { id: 2, image: color2 },
  { id: 3, image: color3 },
  { id: 4, image: color4 },
  { id: 5, image: color5 },
  { id: 6, image: color6 },
  { id: 7, image: color7 },
  { id: 8, image: color8 },
]

const imageData = toRef(props, 'imageData')

const clickImageInput = () => {
  if (!refImageInput.value) return

  refImageInput.value.click()
}

const onFileChange = event => {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  fileName.value = file.name

  const reader = new FileReader()
  reader.onload = e => {
    internalImage.value = e.target.result
    replaceCropperImage(e.target.result)
  }
  reader.readAsDataURL(file)

  imageEdited.value = true
}

const replaceCropperImage = image => {
  refCropper.value.replace(image)
}

const getCroppedCanvas = () => {
  return refCropper.value.getCroppedCanvas().toDataURL('image/png', 1)
}

const revertChanges = () => {
  replaceCropperImage(imageData.value)
  fileName.value = null
  refImageInput.value.value = null
}

const selectBoxColor = option => {
  selectedColorOption.value = option.id
  replaceCropperImage(option.image)
}

watch(imageData, () => {
  replaceCropperImage(imageData.value)
  qtdChangesObserved.value++
})

// Register cropper component for script setup (auto-registration in template)
</script>

<style scoped>
  .miniatures-grid-container {
    display: grid;
    grid-template-columns: repeat(4, 44px);
    justify-content: center;
    align-items: center;
  }

  .miniature-grid-item {
    padding: 1.3px;
    width: 44px;
    height: 44px;
  }

  .edit-user-image-wrapper {
    background: #000000a6;
    box-shadow: 0 4px 4px 0 #00000040;
    width: 33px;
    height: 33px;
    cursor: pointer;
    z-index: 9;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 10px;
    top: 5px;

    & > span {
      text-shadow: 0 4px 4px 0 #00000040;
      font-size: 20px;
    }
  }
</style>