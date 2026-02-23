<template>
  <div>
    <b-card>
      <b-card-title class="text-primary">
        <span class="material-symbols-outlined align-text-bottom">imagesmode</span>
        Registro do teste
      </b-card-title>

      <!-- Hidden file input -->
      <input
        ref="refInput"
        class="d-none"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        @change="handleDrop"
      />

      <template v-if="loading">
        <b-skeleton-img aspect="1" class="rounded" />
      </template>

      <template v-else>
        <!-- Drop zone / preview area -->
        <div
          class="custom-dashed-border"
          :class="{ 'image-loaded mb-1': currentPhase.imageUrl, 'p-1': !currentPhase.imageUrl }"
          @dragover="handleDragOver"
          @drop="handleDrop"
          @click="handleClickDropArea"
        >
          <!-- Instruction area when no image is loaded -->
          <div
            v-if="!currentPhase.imageUrl"
            class="d-flex flex-col align-items-center justify-content-center w-100 h-100 text-center text-primary"
          >
            <span class="material-symbols-outlined" style="font-size: 54px"> add_a_photo </span>
            <h4 class="text-primary">
              Arraste aqui a foto do teste ou clique para fazer upload do arquivo.
            </h4>
          </div>

          <!-- Image preview -->
          <b-img v-else :src="currentPhase.imageUrl" alt="Preview da imagem" fluid-grow />
        </div>

        <!-- Delete image area -->
        <div v-show="currentPhase.imageUrl" class="cursor-pointer" @click="deleteImage">
          <span class="material-symbols-outlined text-danger align-middle"> delete </span>
          <span v-if="fileName" class="align-middle">{{ fileName }}</span>
          <span v-else class="align-middle text-danger">Excluir imagem</span>
        </div>
      </template>
    </b-card>

    <!-- Fullscreen preview overlay -->
    <FullscreenOverlay
      v-if="showFullscreen"
      :image-url="currentPhase.imageUrl"
      @close="closeFullscreen"
    />
  </div>
</template>

<script setup>
  import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
  import FullscreenOverlay from '@/views/pages/writing-phases/components/FullscreenOverlay.vue'
  import { useWritingPhaseRegister } from '@/views/pages/writing-phases/writing-phase-register/useWritingPhaseResgister'
  import { getCurrentInstance, ref } from 'vue'

  const { proxy } = getCurrentInstance()

  const { currentPhase, loading } = useWritingPhaseRegister()
  const fileName = ref('')
  const refInput = ref(null)
  const showFullscreen = ref(false)

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  const maxSize = 5 * 1024 * 1024 // 5MB

  const handleDrop = event => {
    event.preventDefault()
    event.stopPropagation()
    let file = null

    if (event.dataTransfer && event.dataTransfer.files) {
      file = event.dataTransfer.files[0]
    } else if (event.target && event.target.files) {
      file = event.target.files[0]
    }

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        proxy.$toast({
          component: Toast,
          props: {
            title: 'Extensão não permitida.',
            text: 'Suba um arquivo nos formatos .png, .jpg ou .jpeg.',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
        refInput.value.value = null
        return
      }

      if (file.size > maxSize) {
        proxy.$toast({
          component: Toast,
          props: {
            title: 'Arquivo acima do peso permitido.',
            text: 'Suba um arquivo de até 5mb.',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
        refInput.value.value = null
        return
      }

      fileName.value = file.name

      const reader = new FileReader()
      reader.onload = e => {
        currentPhase.value.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = event => {
    event.preventDefault()
  }

  const deleteImage = () => {
    currentPhase.value.imageUrl = null
    refInput.value.value = null
    fileName.value = ''
  }

  const handleClickDropArea = () => {
    if (currentPhase.value.imageUrl) {
      showFullscreen.value = true
    } else {
      if (!refInput.value) return
      refInput.value.click()
    }
  }

  const closeFullscreen = () => {
    showFullscreen.value = false
  }
</script>

<style scoped>
  .custom-dashed-border {
    border: 1px dashed var(--primary);
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 1;
  }

  .custom-dashed-border.image-loaded {
    aspect-ratio: auto;
  }
</style>