<!-- Verificar scroll para paginação, estava travando quando é renderizado o loading a cada chamada da requisição -->
<template>
  <ESelect
    v-model="model"
    :label="label"
    :options="options.data"
    :clearable="false"
    :disabled="disabled"
    :loading="loading"
    :paginated="true"
    :page="options.currentPage"
    :total-pages="options.totalPages"
    class="w-full filter-chooser filter-items"
    @input="selectInput"
    @close="onClose"
    @nextPage="handleNextPage"
  >
    <template #noOptions> Nenhum dado encontrado. </template>
  </ESelect>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  label: { type: String, required: true },
  options: {
    type: Object,
    required: true,
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean },
  value: { type: Object, default: null },
})

// Emits
const emit = defineEmits(['input', 'close', 'do-the-get'])

// Refs
const model = ref(props.value)

// Computed
const hasNextPage = computed(() => {
  return props.options.currentPage < props.options.totalPages
})

// Watch value prop (for v-model sync)
watch(
  () => props.value,
  val => {
    model.value = val
  },
)

// Select Input Emit
const selectInput = () => {
  emit('input', model.value)
}

// Handle v-select close
const onClose = () => {
  emit('close')
}

// Handle next page from ESelect pagination
const handleNextPage = payload => {
  // ESelect emits { search, page, totalPages }
  if (payload && typeof payload.page !== 'undefined') {
    emit('do-the-get', payload.page)
  }
}
</script>
