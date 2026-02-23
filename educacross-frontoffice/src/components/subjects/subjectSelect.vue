<template>
  <ValidationObserver ref="formRef">
    <b-form @submit.prevent="onSubmit">
      <ValidationProvider v-slot="{ errors }" name="subject" rules="required">
        <b-form-group :label="$t('subject')">
          <b-form-select
            v-model="selectedSubject"
            :options="subjectOptions"
            :state="errors.length > 0 ? false : null"
            :placeholder="$t('selectSubject')"
          />
          <small v-if="errors.length" class="text-danger">
            {{ errors[0] }}
          </small>
        </b-form-group>
      </ValidationProvider>

      <b-button type="submit" variant="primary">
        {{ $t('confirm') }}
      </b-button>
      <b-button type="button" variant="outline-secondary" @click="onCancel">
        {{ $t('cancel') }}
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@/@core/utils/validations/validations'
import store from '@/store'

// Props
const props = defineProps({
  value: { type: [String, Number], default: null },
  options: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})

// Emits
const emit = defineEmits(['update:value', 'submit', 'cancel'])

// Reactive state
const selectedSubject = ref(props.value)
const formRef = ref(null)

// Computed
const subjectOptions = computed(() => {
  return props.options.length
    ? props.options
    : store.getters['subjects/getOptions'] || []
})

// Watch value prop for external changes
watch(
  () => props.value,
  val => {
    selectedSubject.value = val
  }
)
watch(selectedSubject, val => {
  emit('update:value', val)
})

// Methods
const onSubmit = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return
  emit('submit', selectedSubject.value)
}

const onCancel = () => {
  emit('cancel')
}

// Optionally, fetch options if not supplied as prop
onMounted(() => {
  if (!props.options.length && !(store.getters['subjects/getOptions']?.length)) {
    store.dispatch('subjects/fetchOptions')
  }
})
</script>