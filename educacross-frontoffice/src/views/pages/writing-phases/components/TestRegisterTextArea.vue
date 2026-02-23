<template>
  <ValidationObserver ref="form">
    <div class="positon-relative textarea-container">
      <ValidationProvider v-slot="{ errors }" rules="max:600">
        <b-form-textarea
          ref="textareaRef"
          :value="value"
          max-rows="16"
          :state="value.length > 600 ? false : null"
          no-resize
          @input="onInput"
          @blur="onFocus = false"
        >
          <span class="material-symbols-outlined">edit</span><br />Digite aqui anotações sobre a
          aplicação do teste.
        </b-form-textarea>
        <p class="text-right text-body">
          <small class="align-middle" :class="errors.length > 0 ? 'text-danger' : ''">
            {{ value ? value.length : 0 }}/600 caracteres
          </small>
        </p>
      </ValidationProvider>

      <div
        v-if="!value && !onFocus"
        class="position-absolute cursor-pointer left-0 right-0 top-0 bottom-0 text-body d-flex flex-column align-items-center justify-content-center gap-2"
        @click="focusEvent"
      >
        <div class="text-center mx-2">
          <span class="material-symbols-outlined text-secondary" style="font-size: 92px"
            >edit_square</span
          ><br />Digite aqui anotações sobre a aplicação do teste.
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script setup>
import { max } from '@/@core/utils/validations/validations'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { ref } from 'vue'

// Props
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})

// Emits
const emit = defineEmits(['input'])

// Refs
const textareaRef = ref(null)
const onFocus = ref(false)

// Methods
const focusEvent = () => {
  onFocus.value = true
  textareaRef.value && textareaRef.value.focus()
}

const onInput = value => {
  onFocus.value = true
  emit('input', value)
}
</script>

<style lang="scss" scoped>
.textarea-container textarea {
  min-height: 415px;
}
</style>