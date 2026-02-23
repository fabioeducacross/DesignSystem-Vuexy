<template>
  <div class="d-flex flex-column align-items-center">
    <img
      src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-copy_link.png"
      class="image"
      alt="belinha"
    />
    <h1 class="title">Copiar link da missão</h1>
    <b-form-input ref="input" v-model="missionLinkLocal" class="cursor-pointer custom-input" />
    <b-button class="custom-button" variant="primary" type="filled" @click="copyLink">
      Copiar link
    </b-button>
  </div>
</template>

<script setup>
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton, BFormInput } from 'bootstrap-vue'

// Props
const props = defineProps({
  missionLink: {
    type: String,
    required: true,
  },
})

// Emits
const emit = defineEmits(['close-copylink-modal'])

// Local state for input (to allow v-model)
import { ref, watch, onMounted } from 'vue'
const missionLinkLocal = ref(props.missionLink)
const input = ref(null)

// Keep missionLinkLocal in sync with prop (in case prop changes)
watch(
  () => props.missionLink,
  val => {
    missionLinkLocal.value = val
  }
)

// Copy link method
const copyLink = () => {
  if (!input.value) return
  try {
    input.value.$el.select && input.value.$el.select()
    input.value.$el.setSelectionRange && input.value.$el.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(missionLinkLocal.value)
    // $toast accessed via globalProperties
    // Use __VUE_DEVTOOLS_GLOBAL_HOOK__ or inject (assumed available as this.$toast)
    // In script-setup, you can use getCurrentInstance().proxy.$toast
    // (Or if registered on app.config.globalProperties)
    // We'll use getCurrentInstance().proxy.$toast
    // eslint-disable-next-line no-undef
    getCurrentInstance().proxy.$toast({
      component: Toast,
      props: {
        text: 'Link copiado com sucesso',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
  } catch (error) {
    // eslint-disable-next-line no-undef
    getCurrentInstance().proxy.$toast({
      component: Toast,
      props: {
        text: 'Ocorreu um erro ao copiar o link, tente novamente.',
        icon: 'AlertTriangleIcon',
        variant: 'danger',
      },
    })
  }
}

import { getCurrentInstance } from 'vue'
onMounted(() => {
  // Optionally focus/select input on mount if needed
  // input.value && input.value.$el.select && input.value.$el.select()
})

// Optional: Expose a close method for parent usage (not strictly required here)
// const closeModalCancelMission = () => {
//   emit('close-copylink-modal')
// }
</script>

<style lang="scss" scoped>
  .image {
    margin-bottom: 24px;
  }

  .title {
    color: #5e5873;
    font-size: 24px;
    line-height: 29px;
    font-weight: 500;
    margin-bottom: 24px;
  }
  .custom-button {
    width: 233px;
  }

  .custom-input {
    padding: 12px 38px;
    margin-bottom: 24px;
    pointer-events: none;
    cursor: pointer !important;
  }
</style>