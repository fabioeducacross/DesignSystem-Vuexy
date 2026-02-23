<template>
  <div class="d-flex flex-column align-items-center">
    <img
      src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-copy_link.png"
      class="image"
      alt="belinha"
    />
    <h1 class="title">Copiar link da missão</h1>
    <b-form-input ref="input" v-model="missionLink" class="cursor-pointer custom-input" />
    <b-button class="custom-button" variant="primary" type="filled" @click="copyLink">
      Copiar link
    </b-button>
  </div>
</template>

<script setup>
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton, BFormInput } from 'bootstrap-vue'
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  missionLink: {
    type: String,
    required: true,
  },
})

// Emits
const emit = defineEmits(['close-copylink-modal'])

// Local ref for input
const input = ref(null)

// Reactive missionLink (to allow v-model on b-form-input)
const missionLink = ref(props.missionLink)

// Watch for prop changes to update local value
watch(
  () => props.missionLink,
  val => {
    missionLink.value = val
  }
)

// Copy link function
const copyLink = () => {
  try {
    if (input.value && input.value.$el) {
      const el = input.value.$el.querySelector('input') || input.value.$el
      el.select()
      el.setSelectionRange(0, 99999)
    }
    navigator.clipboard.writeText(missionLink.value)
    if (typeof window.$toast === 'function') {
      window.$toast({
        component: Toast,
        props: {
          text: 'Link copiado com sucesso',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
    }
  } catch (error) {
    if (typeof window.$toast === 'function') {
      window.$toast({
        component: Toast,
        props: {
          text: 'Ocorreu um erro ao copiar o link, tente novamente.',
          icon: 'AlertTriangleIcon',
          variant: 'danger',
        },
      })
    }
  }
}
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